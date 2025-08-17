# 任务管理器 (Task Manager)

一个基于 Nx 工作空间的现代化任务管理应用，采用前后端分离架构。

## 🚀 项目概述

这是一个使用 Nx 构建的全栈任务管理应用，包含：

- **后端服务**: NestJS 服务器，提供 RESTful API
- **前端应用**: Next.js 客户端，现代化的用户界面
- **开发工具**: 完整的开发、测试和构建工具链

## 🏗️ 技术栈

### 后端 (nest-server)
- **框架**: NestJS 11
- **语言**: TypeScript
- **运行时**: Node.js
- **测试**: Jest

### 前端 (next-client)
- **框架**: Next.js 15
- **语言**: TypeScript
- **UI库**: React 19
- **样式**: Tailwind CSS
- **测试**: Jest + Testing Library

### 开发工具
- **构建系统**: Nx 21
- **包管理**: pnpm
- **代码质量**: ESLint + Prettier
- **类型检查**: TypeScript 5.8

## 📦 安装依赖

```bash
# 安装所有依赖
pnpm install
```

## 🚀 运行项目

### 启动前端
```bash
pnpm start:frontend
```

### 启动后端
```bash
pnpm start:backend
```

### 同时启动前后端
```bash
pnpm start:all
```

## 🛠️ 开发命令

### 构建项目
```bash
# 构建前端
npx nx build next-client

# 构建后端
npx nx build nest-server
```

### 运行测试
```bash
# 运行所有测试
npx nx test

# 运行特定项目测试
npx nx test next-client
npx nx test nest-server
```

### 代码检查
```bash
# 运行 ESLint
npx nx lint

# 运行 Prettier
npx nx format:write
```

## 📁 项目结构

```
task-manager/
├── nest-server/          # 后端 NestJS 服务
│   ├── src/
│   │   ├── app/         # 应用模块
│   │   └── main.ts      # 应用入口
│   └── project.json     # 项目配置
├── next-client/          # 前端 Next.js 应用
│   ├── src/
│   │   ├── app/         # 页面组件
│   │   └── global.css   # 全局样式
│   └── project.json     # 项目配置
├── package.json          # 根依赖配置
└── nx.json              # Nx 工作空间配置
```

## 🔧 开发指南

### 添加新功能
1. 在 `nest-server` 中添加新的 API 端点
2. 在 `next-client` 中创建对应的 UI 组件
3. 使用 Nx 生成器快速创建代码结构

### 代码规范
- 使用 TypeScript 进行类型安全开发
- 遵循 ESLint 和 Prettier 配置
- 编写单元测试确保代码质量

## 📚 学习资源

- [Nx 官方文档](https://nx.dev)
- [NestJS 官方文档](https://nestjs.com)
- [Next.js 官方文档](https://nextjs.org)
- [Tailwind CSS 官方文档](https://tailwindcss.com)

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 支持

如果您遇到问题或有疑问，请：

1. 查看 [Issues](../../issues) 页面
2. 创建新的 Issue 描述您的问题
3. 联系项目维护者

---

**享受编码！** 🎉
