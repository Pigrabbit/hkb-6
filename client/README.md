# Client Application Boilerplate

Index

- <a href="#babel-config">babel config</a>
- <a href="#webpack-config">webpack config</a>
  - <a href="#common">common</a>
  - <a href="#deve">development</a>
  - <a href="#prod">production</a>
- <a href="#jest-config">jest config</a>

# <h1 id='babel-config'> Babel configuration </h1>

`@babel/core`: babel을 사용하기 위한 필수 패키지

`@babel/cli`: cli 환경에서 babel을 실행하기 위해 필요한 패키지

`@babel/preset-env`: 가장 범용적으로 사용되는 preset

`api.cache(true)` 를통해 `babel.config.js` 파일을 한 번만 실행하도록 설정.
`targets` 속성을 통해 트랜스파일 할 level을 결정.

Javascript class를 이용할 때 class 안에서 propertie를 사용할 경우 [babel-plugin-transform-class-properties](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/) 로 트랜스파일.

# <h1 id='webpack-config'> Webpack configuration </h1>

<img src="https://miro.medium.com/max/3268/1*Qo4yWofQHQKSOtLtTD54Wg.png" width='600'>

## <h2 id="common"> Common </h2>

- `sass-loader`, `css-loader`, `MiniCssExtractPlugin.loader` are used for style
- `file-loader` is used to put file into JS
- `babel-loader` is used for transpiling

## <h2 id="dev"> Development </h2>

- set mode as `development`
- `devServer` is used to quickly develop an application
- use environment variables in `.env.dev`

## <h2 id="prod"> Production </h2>

- set mode as `production`
- use environment variables in `.env.dev`

# <h1 id='jest-config'> Jest configuration </h1>
