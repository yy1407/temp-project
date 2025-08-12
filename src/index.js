const path = require('path');
const _ = require('lodash');

const { readPhpFilesSync } = require('./modules/fileReader');
const { extractFunctionsWithRelations } = require('./modules/functionExtractor');
const { generateRelationDescription } = require('./modules/relationDescriptions');
const { writeOutput } = require('./modules/outputWriter');
const { pluralizeSnakeCase } = require('./modules/snakeCasePluralizer');

const modelsDir = path.join('//wsl.localhost/Ubuntu/home/yyokota/api-web/app/Models');

const phpFiles = readPhpFilesSync(modelsDir);

let output = '';

phpFiles.forEach(({ filename, content }) => {
  const functionInfos = extractFunctionsWithRelations(content);
  const snakeCaseFilename = pluralizeSnakeCase(filename);

  output += `==== ${filename} ====\n`;

  functionInfos.forEach((info) => {
    const snakeCaseFunctionName = pluralizeSnakeCase(info.functionName);
    output +=
      generateRelationDescription(info.relationType, snakeCaseFilename, snakeCaseFunctionName) +
      '\n';
  });

  output += '\n';
});

// ../output.txt に書き出し
writeOutput('../output.txt', output);
