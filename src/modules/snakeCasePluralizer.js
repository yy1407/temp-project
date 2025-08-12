const _ = require('lodash');
const pluralize = require('pluralize');

/**
 * パスカルケースのファイル名や関数名（例: 'MCustomer.php'）から
 * 拡張子を取り除き、スネークケースに変換し、
 * 最後の単語だけ複数形に変換する関数
 *
 * @param {string} word パスカルケースのファイル名や関数名（例: 'MCustomer.php'）
 * @returns {string} 拡張子を取り除き、複数形に変換されたスネークケース文字列（例: 'm_customers'）
 */
function pluralizeSnakeCase(word) {
  const snakeCaseWord = _.snakeCase(word.replace(/\.php$/i, ''));
  const parts = snakeCaseWord.split('_');
  const last = parts.pop();
  const pluralLast = pluralize(last);
  parts.push(pluralLast);
  return parts.join('_');
}

module.exports = { pluralizeSnakeCase };
