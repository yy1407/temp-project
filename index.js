const fs = require('fs');
const path = require('path');

const modelsDir = path.join(
  '//wsl.localhost/Ubuntu/home/yyokota/api-web/app/Models',
);

const regex = /function\s+([a-zA-Z0-9_]+)\s*\(/g;

fs.readdir(modelsDir, 'utf8', (err, files) => {
  if (err) {
    console.error('Modelsディレクトリの読み込みエラー：', err);
    return;
  }

  const phpFiles = files.filter((file) => path.extname(file) === '.php').sort();

  phpFiles.forEach((file) => {
    const filePath = path.join(modelsDir, file);
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(`${file} の読み込みエラー：`, err);
        return;
      }
      const functionNames = [];
      let match;
      while ((match = regex.exec(data)) !== null) {
        functionNames.push(match[1]);
      }
      console.log(`==== ${file} の関数名 ====\n`, functionNames, '\n');
    });
  });
});
