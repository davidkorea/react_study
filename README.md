# react_study









-----

- VSCode Plugin： [ES7 React/Redux/GraphQL/React-Native snippets - dsznajder](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
  - `imrse`: import React, { useState, useEffect } from 'react'
  - `imrcp`: import React, { Component } from 'react'


- create react app + Ant Design + tailwindcss
  - 1.go to target path, `create-react-app myDemo`, before `yarn start`, install antd
  - 2.`yarn add antd`, `cnpm install antd --save` faster
    - ```javascript
      import 'antd/dist/antd.css'
      import {Button} from 'antd'
      ```
  - 3.cp `tailwind.min.css` to myDemo project src folder
    - import tailwind to js file by `import './tailwind.min.css'
  - 4.code
    ```javascript
    import React, { Component } from 'react'
    import './tailwind.min.css'
    import 'antd/dist/antd.css'
    import {Button} from 'antd'
    
    function Ex1(){
        return (
            <div>
                <Button className="m-4" type="primary" shape="round">Click</Button>
            </div>
        )
    }
    ```
  - 有关antd元素组件的样式，使用antd css，如type shape属性等，可以参考官网
  - 有关原生html标签div布局的样式，元素间布局，组件间布局，使用tailwindcss

