
# antd

- https://ant.design/components/icon-cn/



- icon，引入方式已经改版
```diff
- import {Icon} from 'antd
- <Icon type="smile" />

+ import { GithubFilled } from '@ant-design/icons'
+ <GithubFilled className="account"></GithubFilled>
```
```css
.account {
    margin: 1rem;
    font-size: xx-large;
    color: gray;
}
```
