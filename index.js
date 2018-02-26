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

function trimWhitespace(tokens) {
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type !== 'whitespace') continue
    if (
      (tokens[i + 1] && tokens[i + 1].type === 'preprocessor') ||
      (tokens[i - 1] && tokens[i - 1].type === 'preprocessor')
    ) {
      tokens[i].data = tokens[i].data.replace(/\s+/g, '\n')
    } else {
      tokens[i].data = tokens[i].data.replace(/\s+/g, ' ')

      switch (tokens[i + 1] && tokens[i + 1].data) {
        case '(':
        case ';':
        case ')':
        case '{':
        case '=':
        case '}':
        case ',':
          tokens[i].data = tokens[i].data.replace(/\s+/g, '')
      }

      switch (tokens[i - 1] && tokens[i - 1].data) {
        case '(':
        case ';':
        case ')':
        case '{':
        case '=':
        case '}':
        case ',':
          tokens[i].data = tokens[i].data.replace(/\s+/g, '')
      }
    }
  }

  return stripComments(tokens)
}

module.exports = function(source) {
  this.cacheable && this.cacheable()

  const tokens = tokenize(source)
  const result = trimWhitespace(tokens)

  return `module.exports = ${JSON.stringify(result)}`
}
