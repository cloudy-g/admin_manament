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
// 修改 package.json文件
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
- 逻辑注意点（根据b站账号登录页自动填充功能）
  - 登录页面的账户信息存储在`localStorage`里面，若是在当前已经登录的登录页刷新，则自动填充账号信息
- 登录页大致完成

#### 6. Admin 页面

- 登录页跳转到路由'/'，转到'/admin'路由页，自动重定向到'/home'界面，保持Tab框选中

- 使用编程式导航的方式，点击侧边栏实现路由跳转，加载对应的组件
- 整体布局搭建完成，主要包括侧边栏，顶部通栏，对应Tab栏的标题和日期显示

- 库
  - `antd`的布局组件，加载中组件以及若干图标
  - 格式化日期 https://github.com/date-fns/date-fns

- 几个注意点
  - 当使用url直接访问某个路径，会判断当前用户是否已经登录，若登陆则允许进行不登录则会自动返回到登录页面
  - 在当前页刷新的时候，保持用户数据不会丢失，以及当前页面的信息不会因为刷新而有所改变，可以使用路由作为标志
- 对当前组件进行拆分
  - 侧边栏`leftSider`
  - 主要内容区`contentMain`

#### 7. Home 首页

- 简单完成

#### 8. category 分类页

- 分类页

  - 使用`Card`布局，`Table Modal `和分页技术
  - 保持表格的数据源唯一，就可以达到动态切换显示数据的目的
  - 总数据进行缓存处理
  - 一级菜单列表和二级菜单列表进行切换
  - 修改当前分类名称
  - 进入当前分类的子分类
    - 修改子分类之后要求数据统一，通过改变缓存的整体数据达到统一

  - 使用`axios get`获取后台数据，使用`post`将整体修改完成的数据进行统一提交