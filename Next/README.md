# Next.js

- all React and Vue app are SPA, single page application
  - because the all Components are binded to `index.js`
  - this will lead load page slow
  - all web content will be imported into index.html with js file
    - not for SEO
    
- SSR, server side render
  - this will help to SEO search engine optimize
  - better for load first page

## Next.js

1. create project folder, run `cnpm init`
2. `cnpm install --save react react-dom next`
3. modify `package.json`
```javascript
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "next",
        "build": "next build",
        "start": "next start"
    },
```
4. create `pages` folder in the root path of project folder, and create `index.js` under pages folder
```javascript
function Index(){       // no need to import react, next will handle all of this
    return (
        <div>
            hello world
        </div>
    )
}
export default Index
```
  - **放在pages文件夹下的文件会自动被next设置路由，进行服务器端渲染，并同步数据**

5. `yarn dev`, `npm run dev` to start localhost server 

## 脚手架

```
sudo cnpm install -g create-next-app
```




















