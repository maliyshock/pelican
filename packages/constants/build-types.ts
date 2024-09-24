import * as fs from "fs";
import * as path from "path";
import camelCase from "lodash/camelCase";
import upperFirst from "lodash/upperFirst";
import snakeCase from "lodash/snakeCase";

const nodesDir = "./src/nodes"; // путь к папке nodes
const typesDir = "./src/types/build"; // путь к папке types

// Создание папки types, если она не существует
if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir);
}

// Функция для рекурсивного обхода всех файлов в директории
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach(function (file: string) {
    const fullPath = path.join(dirPath, "/", file);

    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith(".ts")) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// Функция для динамического импорта файла
async function importFile(filePath: string) {
  const modulePath = path.resolve(filePath);

  return import(modulePath);
}

// Функция для обработки каждого файла и обновления файлов ролей
async function processFiles(files: string[]) {
  const rolesMap: { [key: string]: Set<string> } = {};

  for (const file of files) {
    const module = await importFile(file);

    for (const key in module) {
      if (module[key] && module[key].roles) {
        const nodeData = module[key];
        const { type } = nodeData;

        nodeData.roles.forEach((role: string) => {
          if (!rolesMap[role]) {
            rolesMap[role] = new Set();
          }

          rolesMap[role].add(type);
        });
      }
    }
  }

  const rolesBank: Array<{ snake: string; camel: string; name: string }> = [];

  for (const role in rolesMap) {
    const roleFileName = `${role}.ts`;
    const roleFilePath = path.join(typesDir, roleFileName); // сохранение в папке types
    const typesArray = Array.from(rolesMap[role]);
    const roleSnake = snakeCase(role).toUpperCase();
    const roleCamel = upperFirst(camelCase(role));
    const fileContent = `export const ${roleSnake} = [${typesArray.map(type => `"${type}"`).join(", ")}] as const;\nexport type ${roleCamel}Kind = (typeof ${roleSnake})[number];`;

    rolesBank.push({ snake: roleSnake, camel: roleCamel, name: role });
    fs.writeFileSync(roleFilePath, fileContent, "utf8");
  }

  const importPaths = rolesBank.reduce((acc, item) => {
    const newPath = `import {${item.camel}Kind} from "./${item.name}"\n`;

    return acc + newPath;
  }, "");
  const fileContent = `${importPaths}\nexport type TypeKind = ${rolesBank.map(role => role.camel + "Kind").join(" | ")};`;

  fs.writeFileSync(path.join(typesDir, "type-kind.ts"), fileContent, "utf8");
}

const allFiles = getAllFiles(nodesDir);

processFiles(allFiles)
  .then(() => {
    console.log("Processing complete.");
  })
  .catch(error => {
    console.error("Error processing files:", error);
  });
