## React 后台项目开发

#### 1. git 创建仓库

- 使用

```js
create-react-app admin_management // 脚手架 创建 文件
git commit -m "first commit"
git branch -M master
git remote add origin git@github.com:cloudy-g/admin_manament.git
git push -u origin master
```

- 分支操作

```js
git checkout -b dev // 创建并切换到 dev 分支
git checkout dev // 切换分支
git pull origin dev // 拉取 origin的master分支 并合并到 dev分支

git checkout master
git merge dev // 合并前要先切回要并入的分支,然后合并dev分支的内容到 master 上 

git push -u origin master // 将master推送到 origin远程仓库
```

#### 2. Antd

- 4.x版本默认支持 tree-shaking 按需加载，无需配置
- 3.x版本根据官网配置按需加载文件

#### 3. npm 命令

- 下载的包使用 `npm install`命令 

#### 4. 脚手架配置文件修改

```js
npm i react-app-rewired customize-cra -D
// 添加文件 config-overrides.js
```

#### 5. Login页面 

- 路由设置 /login
- 页面开发
  - 样式重置 reset.css https://github.com/filipelinhares/ress/blob/master/ress.css
- 主要两个功能
  - 1. 获取用户名和密码进行标准性验证
       - 用户名4-12位
       - 密码4-8位，
       - 都只允许包含字母，数字，下划线
  - 2. 验证无误后传给后台，进行验证用户名和密码正确性
       - 验证成功 ->>  返回用户相关数据，进行路由跳转
       - 验证失败 ->>  提示用户信息
- 几个点
  - 用户验证时以及验证成功的提示信息，使用 `useReducer`hook实现
  - 设置1s后进行路由跳转，使用`replace`方法，并在`useEffect`中进行定时器清除工作
  - 用户信息使用`localStorage`进行存储
  - 表单使用`antd`的样式