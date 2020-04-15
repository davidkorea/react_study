
# antd

- https://ant.design/components/icon-cn/



- icon
```diff
- import {Icon} from 'antd
- <Icon type="smile" />

+ import {WechatFilled,QqCircleFilled, GithubFilled} from '@ant-design/icons'
+ <GithubFilled className="account"></GithubFilled>
```
```html
.account {
    margin: 1rem;
    font-size: xx-large;
    color: gray;
}
```
