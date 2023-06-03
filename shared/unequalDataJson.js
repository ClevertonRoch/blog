
// Readme
// eslint-disable-next-line no-irregular-whitespace
// This function takes 2 json, compare all values ​according to keys 
// eslint-disable-next-line no-irregular-whitespace
// and returns a json list with all different values ​​found
// eslint-disable-next-line no-unused-vars
async function compare(json1, json2) {
  const resultado = {}

  for (const chave in json1) {
    // eslint-disable-next-line no-prototype-builtins
    if (json1.hasOwnProperty(chave)) {
      // eslint-disable-next-line no-prototype-builtins
      if (json2.hasOwnProperty(chave) && json1[chave] !== json2[chave]) {
        resultado[chave] = json2[chave]
      }
    }
  }
 
  return resultado
}

module.exports = {
  compare
}