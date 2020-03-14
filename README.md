# react_study


- VSCode Plugin： [ES7 React/Redux/GraphQL/React-Native snippets - dsznajder](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
  - `imrse`: import React, { useState, useEffect } from 'react'
  - `imrcp`: import React, { Component } from 'react'


- create react app + Ant Design + tailwindcss
  - go to target path, `create-react-app myDemo`, before `yarn start`, install antd
  - `yarn add antd`, `cnpm install antd --save` faster
    - ```javascript
      import 'antd/dist/antd.css'
      import {Button} from 'antd'


      ```
  - cp `tailwind.min.css` to myDemo project src folder
    - import tailwind to js file by `import './tailwind.min.css'
