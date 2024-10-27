面试助手web版

前端:React+Antd+@extremelyjs/store+@extremelyjs/fetch-interface

@extremelyjs/fetch-interface: https://github.com/extremelyjs/fetch-interface
@extremelyjs/store: https://github.com/extremelyjs/store

样式方案：@emotion

## 开发规范

1. 分支开发

```bash
    git checkout -b feature/xxx
    git add .
    git commit -m 'xxx'
    git push origin feature/xxx
```

2. 安装依赖

```bash
pnpm install
```

3. 启动项目

```bash
pnpm dev // 本地开发（需要启动后段）
```

```bash
pnpm start // 不需要启动后端

4. 打包发布

```bash
npm run build
```

5. 项目结构

- src
    - api: 接口
    - assets: 静态资源
    - components: 公共组件
    - store: 状态管理
    - pages: 页面
    - router: 路由
    - utils: 工具
    - contstants: 常量
    - hooks: 自定义hooks
