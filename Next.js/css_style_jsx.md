

# css_style_jsx

next不支持importcss文件，需要直接在组件js文件中使用style jsx

```javascript
function Testcss(){
    return (
        <div>
            <div>test css with style jsx</div>

            <style jsx>
            {`
                div{color:red;}
            `}
            </style>
        </div>
    )
}

export default Testcss
```
- 需要在return的第一次标签内，签入style标签，花括号里面需要一对`，`{\` origin css styles \`}`
