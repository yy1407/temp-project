const fs = require('fs');
const path = require('path');

/**
 * 指定ディレクトリからPHPファイルを同期的に読み込み、
 * ファイル名と中身をオブジェクトの配列として返す関数。
 *
 * @param {string} dirPath 読み込むディレクトリのパス
 * @returns {Array<{filename: string, content: string}>} ファイル名と中身を持つオブジェクトの配列
 */
function readPhpFilesSync(dirPath) {
  const files = fs.readdirSync(dirPath, 'utf8');
  const phpFiles = files.filter((file) => path.extname(file) === '.php').sort();

  return phpFiles.map((file) => {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    return { filename: file, content };
  });
}

module.exports = { readPhpFilesSync };
