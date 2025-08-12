/**
 * Laravel の Model クラスの PHP ソースコードから、関数ごとに関数名と関数内のリレーションメソッド呼び出しを抽出する
 *
 * リレーションメソッド：hasOne(), hasMany(), belongsTo(), belongsToMany()
 *
 * @param {string} phpCode Model クラスの PHP ソースコード文字列
 * @returns {Array<{functionName: string, relationType: string}>} 関数名と、その関数内のリレーションメソッドを格納した配列
 */
function extractFunctionsWithRelations(phpCode) {
  const funcNameRegex = /function\s+([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{/g;
  const relationMethods = ['hasOne', 'hasMany', 'belongsTo', 'belongsToMany'];
  const results = [];

  let match;
  while ((match = funcNameRegex.exec(phpCode)) !== null) {
    const funcName = match[1];
    const bodyStart = funcNameRegex.lastIndex; // { の直後

    // 中括弧（「{」と「}」）の対応をカウントして関数本体の終わりを探す
    let depth = 1;
    let pos = bodyStart;
    while (pos < phpCode.length && depth > 0) {
      if (phpCode[pos] === '{') depth++;
      else if (phpCode[pos] === '}') depth--;
      pos++;
    }

    const funcBody = phpCode.slice(bodyStart, pos - 1);

    // 関数本体に含まれるリレーションメソッドを検出
    let foundRelation = '';
    for (const rel of relationMethods) {
      const relRegex = new RegExp(rel + '\\s*\\(', 'g');
      if (relRegex.test(funcBody)) {
        foundRelation = rel;
        break;
      }
    }

    results.push({ functionName: funcName, relationType: foundRelation });
  }

  return results;
}

module.exports = { extractFunctionsWithRelations };
