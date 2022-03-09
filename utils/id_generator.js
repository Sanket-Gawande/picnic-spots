function keygen() {
  let key = "";
  key += Math.random().toString(36).substring(2);
  key += "-" + Math.random().toString(36).substring(2);
  key += "-" + Math.random().toString(36).substring(2);
  return key;
}

module.exports = keygen