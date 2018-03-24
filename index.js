const tokenize = require('glsl-tokenizer/string')

function stripComments(tokens) {
  let output = []

  tokens.forEach(token => {
    if (
      token.type !== 'block-comment' &&
      token.type !== 'line-comment' &&
      token.type !== 'eof'
    )
      output.push(token.data)
  })

  return output.join('')
}

module.exports = function(source) {
  const callback = this.async()

  this.cacheable()

  const tokens = tokenize(source)
  const result = stripComments(tokens)

  callback(null, `module.exports = ${JSON.stringify(result)}`)
}
