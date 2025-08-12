/**
 * Eloquentリレーションの種類に応じた説明文を生成する関数
 *
 * @param {string} relationType リレーション種別 ('hasMany', 'hasOne', 'belongsTo', 'belongsToMany')
 * @param {string} fromTable 親テーブル名または現在のテーブル名
 * @param {string} toTable 関連先テーブル名
 * @returns {string} 説明文
 */
function generateRelationDescription(relationType, fromTable, toTable) {
  switch (relationType) {
    case 'hasMany':
      return `${fromTable} テーブルの 1 件のレコードは、${toTable} テーブルの複数のレコードを持つことができます。`;
    case 'hasOne':
      return `${fromTable} テーブルの 1 件のレコードは、${toTable} テーブルの 1 件のレコードを持ちます。`;
    case 'belongsTo':
      return `${fromTable} テーブルの 1 件のレコードは、${toTable} テーブルの特定の 1 件のレコードに属します（外部キーは ${fromTable} 側にあります）。`;
    case 'belongsToMany':
      return `${fromTable} テーブルの 1 件のレコードは、${toTable} テーブルの複数のレコードと多対多の関係を持ちます（中間テーブルを介します）。`;
    default:
      return '不明なリレーション種別です。';
  }
}

module.exports = { generateRelationDescription };
