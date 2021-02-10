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
git branch -b dev // 创建分支
git checkout dev // 切换分支
git pull origin dev // 拉取 origin的master分支 并合并到 dev分支

git checkout master
git merge dev // 合并前要先切回要并入的分支,然后合并dev分支的内容到 master 上 

git push -u origin master // 将master推送到 origin远程仓库
```



