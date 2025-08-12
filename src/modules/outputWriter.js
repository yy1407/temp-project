const fs = require('fs');
const path = require('path');

/**
 * 指定した内容をファイルに出力する
 * @param {string} relativePath 出力先ファイルの相対パス
 * @param {string} content 出力する文字列
 */
function writeOutput(relativePath, content) {
  const outputPath = path.join(__dirname, '..', relativePath);
  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`出力完了: ${outputPath}`);
}

module.exports = { writeOutput };
