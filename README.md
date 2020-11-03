# 安装 react-create-app

`npm install --global react-create-app`
`yarn add global react-create-app`

# 创建项目

`react-create-app 项目名`

# vscode 配置 js 文件可以 tab 生成标签

`"emmet.includeLanguages": { "javascript": "javascriptreact" }`

# 使用 React 路由

`npm install react-router-dom`

# 安装 classnames

`npm install classnames`

# 安装 redux

`npm install redux`
`npm install react-redux`
`npm install redux-thunk`

1. `import { createStore, applyMiddleware } from 'redux';`
2. `const store = createStore(reducer方法, 初始状态, 中间件);`
3. `import { Provider } from 'react-redux';`
4. `<Provider store={store}>...</Provider>`
5. `import { combineReducers } from 'redux';`
