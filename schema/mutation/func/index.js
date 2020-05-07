// hash_id生成
exports.getUniqueStr = (strong = 10000000) => {
  return new Date().getTime().toString(16) + Math.floor(strong * Math.random()).toString(16)
}
