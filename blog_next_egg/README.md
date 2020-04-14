
# Blog Next + Egg

- frontend，博客页面展示
- middle，数据查询接口
- backend，博客发布后台




# frontend

1. 创建nextapp项目`npx create-next-app blog1`, `cd blog1`, `yarn dev`
2. 清理无用代码 pages/index.js，
```javascript
import Head from 'next/head'

const Home = () => (
    <Head>
      <title>Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
)
export default Home
```

3. 安装支持import css的包，next默认不支持导入css样式文件 
  1. `cnpm install --save @zeit/next-css`
  2. 项目根目录下，创建配置文件`next.config.js`
  ```javascript
  const withCss = require('@zeit/next-css')

  if(typeof require !== 'undefined'){
      require.extensions['.css']=file=>{}
  }

  module.exports = withCss({})
  ```

4. 安装ant design `cnpm install --save antd`

5. 设置按需加载 
  1. `cnpm install --save babel-plugin-import`
  2. 项目根目录建立`.babelrc`文件
  ```JavaScript
  {
      "presets":["next/babel"],  //Next.js的总配置文件，相当于继承了它本身的所有配置
      "plugins":[     //增加新的插件，这个插件就是让antd可以按需引入，包括CSS
          [
              "import",
              {
                  "libraryName":"antd"
              }
          ]
      ]
  }
  ```

































