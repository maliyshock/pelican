const fs = require("fs");
const path = require("path");

function addPropertyToGameNodeData(directory, newProperty, defaultValue) {
  const files = fs.readdirSync(directory);

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      addPropertyToGameNodeData(filePath, newProperty, defaultValue);
    } else if (path.extname(file) === ".ts") {
      let content = fs.readFileSync(filePath, "utf-8");

      // Регулярное выражение для поиска объектов GameNodeData
      const regex = /export const \w+:\s*GameNodeData\s*=\s*{[\s\S]+?};/g;

      content = content.replace(regex, match => {
        // Проверяем, не содержит ли объект уже новое свойство
        if (!match.includes(`${newProperty}:`)) {
          // Добавляем новое свойство перед последней закрывающей скобкой
          return match.replace(/(\s*)\};/, `$1  ${newProperty}: ${JSON.stringify(defaultValue)},$1};`);
        }

        return match;
      });

      fs.writeFileSync(filePath, content);
      console.log(`Updated: ${filePath}`);
    }
  });
}

// Фиксированный путь к корневой директории
const ROOT_DIRECTORY = "./src/nodes";

// Получаем аргументы командной строки
const [, , newProperty, defaultValue] = process.argv;

// Проверяем, все ли необходимые аргументы предоставлены
if (!newProperty || defaultValue === undefined) {
  console.error("Usage: node script.js <newProperty> <defaultValue>");
  process.exit(1);
}

// Преобразуем defaultValue в соответствующий тип данных
let parsedDefaultValue;

try {
  parsedDefaultValue = JSON.parse(defaultValue);
} catch (e) {
  parsedDefaultValue = defaultValue; // Если не удалось распарсить как JSON, оставляем как строку
}

addPropertyToGameNodeData(ROOT_DIRECTORY, newProperty, parsedDefaultValue);
