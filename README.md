# report-assistant-2-mobi

> ReportAssistant2-mobi

## 安装步骤

``` bash
# 安装依赖
npm install

# 启动服务 localhost:8080
npm run dev

# 生产环境最小化建构
npm run build
```

## 更新记录
### Unreleased
#### Added

### 0.3.0 - 2016-12-12
#### Added
- 增加从搜索按返回键返回到主页的功能
- 增加分类功能
- 增加部分过渡效果

#### Changed
- 删除字体中的主页按钮图标，增加显示更多/更少的图标

### 0.2.0 - 2016-12-12
####　Added
- 使用 vue-router 进行至详情页的切换
- 增加更完善的返回位置纪录
- 完成详情页 ReportDetail 组件
- 增加全屏和下载按钮的交互
- 完成报告预览的逻辑

#### Fixed
- 修复路由切换逻辑
- 修复与 flexible 配置不相容的 bug
- 修复某些情况下下拉不再加载数据的 bug

### 0.1.0 - 2016-12-05
#### Added
- 完成首页的 Header 的功能及样式
- 完成 ReportList 模块及其下属模块 ListItem 的功能及样式
- 使用 vm._bus(is an instance of Vue) 进行非父子组件信息传输，该组件第一次注册位置在 App.vue
- 添加一些动画

#### Changed
- 更改了 eslint 的配置，关闭了部分警告

### 0.0.1 - 2016-12-05
#### Added
- 搭建 vue 开发环境
- 初步添加首页模块的样式
- 添加基础 scss
