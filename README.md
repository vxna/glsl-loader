# @vxna/glsl-loader
Bundle your shaders without whitespace & comments

## Usage

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(frag|vert|glsl)$/,
        loader: '@vxna/glsl-loader'
      }
    ]
  }
}
```

## License
MIT (http://www.opensource.org/licenses/mit-license.php)