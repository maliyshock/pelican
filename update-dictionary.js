import fs from "fs";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const nodesFolder = path.join(__dirname, "src/constants/nodes");
const dictionaryFile = path.join(__dirname, "src/constants/dictionary.ts");
const typesFile = path.join(__dirname, "src/types/index.ts");

function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function getFileContent(filePath) {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, "utf8");
  }

  return "";
}

function updateDictionary(dictionaryContent, newConstants) {
  newConstants.forEach(constant => {
    if (!dictionaryContent.includes(`export const ${constant}`)) {
      dictionaryContent += `export const ${constant} = "${constant.toLowerCase()}";\n`;
    }
  });
  fs.writeFileSync(dictionaryFile, dictionaryContent, "utf8");
}

function parseNodeFile(fileContent) {
  const rootRegex = /root:\s*(\w+)/;
  const typeRegex = /type:\s*(\w+)/;
  const rolesRegex = /roles:\s*\[(\w+)\]/;

  const rootMatch = fileContent.match(rootRegex);
  const typeMatch = fileContent.match(typeRegex);
  const rolesMatch = fileContent.match(rolesRegex);

  const newConstants = [];
  let role = null;

  if (rootMatch) newConstants.push(rootMatch[1]);
  if (typeMatch) newConstants.push(typeMatch[1]);
  if (rolesMatch) role = rolesMatch[1];

  return { newConstants, role };
}

function updateTypesFile(typesContent, role, constant) {
  const roleMapping = {
    RESOURCE_DEPOSIT: "ResourceDeposit",
    RESOURCE: "Resource",
    CREATURE: "Creature",
  };

  const typeName = roleMapping[role];

  if (!typeName) return typesContent;

  const typeRegex = new RegExp(`export type ${typeName} = ([^;]+);`);
  const match = typesContent.match(typeRegex);

  if (match && !match[1].includes(`typeof ${constant}`)) {
    const updatedType = `${match[1]} | typeof ${constant}`;

    return typesContent.replace(typeRegex, `export type ${typeName} = ${updatedType};`);
  }

  return typesContent;
}

function updateNodeFile(filePath, newConstants) {
  let fileContent = fs.readFileSync(filePath, "utf8");
  const importRegex = /import\s*{\s*([^}]+)\s*}\s*from\s*["']~\/constants\/dictionary\.ts["'];?/;
  const importMatch = fileContent.match(importRegex);

  if (importMatch) {
    const existingConstants = importMatch[1].split(",").map(item => item.trim());
    const constantsToAdd = newConstants.filter(constant => !existingConstants.includes(constant));

    if (constantsToAdd.length > 0) {
      const updatedConstants = [...existingConstants, ...constantsToAdd].join(", ");

      fileContent = fileContent.replace(importRegex, `import { ${updatedConstants} } from "~/constants/dictionary.ts";`);
    }
  } else {
    const importStatement = `import { ${newConstants.join(", ")} } from "~/constants/dictionary.ts";\n`;
    const exportRegex = /^(export\sconst\s)/m;
    const match = fileContent.match(exportRegex);

    if (match) {
      const position = match.index;

      fileContent = fileContent.slice(0, position) + importStatement + fileContent.slice(position);
    }
  }

  fs.writeFileSync(filePath, fileContent, "utf8");
}

const allFiles = findFiles(nodesFolder);
let dictionaryContent = getFileContent(dictionaryFile);
let typesContent = getFileContent(typesFile);
const newConstants = [];
const roles = [];

allFiles.forEach(file => {
  if (file.endsWith(".ts")) {
    const fileContent = fs.readFileSync(file, "utf8");
    const { newConstants: constants, role } = parseNodeFile(fileContent);

    if (constants.length > 0) {
      updateNodeFile(file, constants);
    }

    newConstants.push(...constants);
    if (role) roles.push({ role, constant: constants[0] });
  }
});

updateDictionary(dictionaryContent, newConstants);

roles.forEach(({ role, constant }) => {
  typesContent = updateTypesFile(typesContent, role, constant);
});

fs.writeFileSync(typesFile, typesContent, "utf8");
