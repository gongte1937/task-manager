**项目名称**：Task Manager - React (Next.js) + NestJS 全栈应用

**技术栈更新**：

- 前端：Next.js + TypeScript + TailwindCSS + i18n（国际化）+ Redux Toolkit Query（RTK Query）
- 后端：NestJS + TypeScript + PostgreSQL + TypeORM
- 工具链：Nx monorepo + pnpm + GitHub Actions + Docker

**目标**：
构建一个基于 Nx monorepo 的全栈任务管理应用，使用 Next.js 作为前端框架，NestJS 作为后端框架，逐步扩展功能以覆盖常见的全栈开发实践，形成结构清晰、易于维护和部署的现代 Web 应用。

## 前端推荐结构

apps/frontend/web
├── pages/ # Next.js 页面（可选：使用 app/）
│ ├── index.tsx # 首页 - 任务列表
│ ├── login.tsx # 登录页
│ └── \_app.tsx # 全局入口（Provider、i18n、Layout）
├── features/ # 功能模块化拆分（核心）
│ ├── auth/ # 登录注册相关
│ │ ├── components/ # UI 组件（AuthForm, LoginPage）
│ │ ├── api.ts # RTK Query API Slice
│ │ ├── hooks.ts # auth 状态逻辑
│ │ └── types.ts
│ ├── tasks/ # 任务功能模块
│ │ ├── components/ # UI 组件（TaskItem, TaskList, TaskForm）
│ │ ├── api.ts # RTK Query API Slice
│ │ ├── hooks.ts # 自定义 hooks
│ │ └── types.ts
├── shared/ # 通用组件和工具
│ ├── components/ # Layout, Header, Button 等
│ ├── hooks/ # useAuth, useTranslation 等
│ ├── utils/ # 工具函数（如时间格式化）
│ └── types/ # 通用类型定义
├── locales/ # i18n 语言包
│ ├── en.json
│ └── zh.json
├── store/ # Redux Store 配置
│ └── index.ts
├── styles/ # 全局样式、Tailwind 配置
└── public/ # 静态资源

## 后端推荐结构

apps/backend/api
├── src/
│ ├── main.ts # 应用启动入口
│ ├── app.module.ts # 根模块
│ ├── config/ # 配置模块（env、数据库连接等）
│ ├── database/ # TypeORM 配置、数据库初始化
│ ├── common/ # 通用模块（拦截器、异常过滤器、守卫）
│ │ ├── decorators/ # 统一装饰器（如 @CurrentUser）
│ │ ├── filters/ # 异常过滤器
│ │ ├── guards/ # 鉴权守卫
│ │ ├── interceptors/ # 响应/日志拦截器
│ │ └── middleware/ # 中间件
│ ├── auth/ # 认证模块（JWT、注册登录）
│ │ ├── auth.controller.ts
│ │ ├── auth.service.ts
│ │ ├── jwt.strategy.ts
│ │ ├── dto/
│ │ └── guards/
│ ├── users/ # 用户模块
│ │ ├── users.controller.ts
│ │ ├── users.service.ts
│ │ ├── user.entity.ts
│ │ └── dto/
│ ├── tasks/ # 任务模块
│ │ ├── tasks.controller.ts
│ │ ├── tasks.service.ts
│ │ ├── task.entity.ts
│ │ └── dto/
│ └── app.controller.ts # 根控制器（健康检查等）
├── test/ # e2e 测试
└── project.json

### 第一阶段：基础结构搭建

**目标**：使用 Nx 建立 monorepo 并分别初始化前后端应用。

- 使用 `pnpm` 作为包管理工具
- 使用 `Nx` 创建空的 monorepo 项目
- 在 `apps/frontend/web` 中添加 Next.js 应用
- 在 `apps/backend/api` 中添加 NestJS 应用
- 验证本地并行启动：前端 (`localhost:4200`)，后端 (`localhost:3000`)
- 添加统一命令：`start:all`

---

### 第二阶段：前后端打通与最小可用产品

**目标**：构建第一个前后端联通功能：任务列表展示。

- 后端实现 GET `/api/tasks` 接口，返回静态任务列表
- 启用 NestJS CORS 设置，允许前端访问
- 前端页面通过 RTK Query 请求 `/api/tasks` 数据并渲染
- 使用 TailwindCSS 渲染任务项，并展示完成状态

---

### 第三阶段：数据库接入与任务管理功能

**目标**：使用 PostgreSQL 管理任务数据，完成增删改查功能。

- 配置 TypeORM 与 PostgreSQL 连接
- 建立 Task 实体（Entity）与迁移文件
- 后端实现 Task 模块完整 CRUD 接口（controller + service）
- 使用 DTO + class-validator 完善请求验证
- 前端使用 RTK Query 创建 API slice 实现任务管理功能
- 使用 React Hook Form 实现任务创建与编辑表单

---

### 第四阶段：用户系统与认证

**目标**：实现完整的注册、登录与鉴权流程。

- 后端实现用户模块（User Entity + Service + Controller）
- 使用 @nestjs/jwt 实现 Access Token / Refresh Token 策略
- 登录后通过 HttpOnly Cookie 存储 Refresh Token
- 前端集成登录注册页面 + Token 自动刷新逻辑
- 后端设置鉴权守卫（JWT Guard + Roles Guard）
- 实现前端用户状态管理（已登录用户显示个人任务）

---

### 第五阶段：结构优化与模块拆分

**目标**：提升整体可维护性、解耦程度与团队协作效率。

- 拆分 NestJS 功能模块为独立 feature module（auth, tasks, users）
- 使用 Nx libs 拆分通用代码（如：shared/types, backend/guards, frontend/ui）
- 管理环境变量（env 文件 + @nestjs/config + publicRuntimeConfig）
- 抽离前端布局与通用组件（Layout, Header, AuthGuard 等）

---

### 第六阶段：UI 完善与用户体验提升

**目标**：增强交互性与国际化支持，提升最终用户体验。

- 使用 RTK Query 缓存任务数据 + 自动刷新功能
- 添加分页、搜索、筛选功能
- 使用 i18n 多语言切换（中英文）
- 使用 TailwindCSS + 动效组件提升页面观感
- 针对移动端适配响应式样式

---

### 第七阶段：测试与部署准备

**目标**：为系统上线做好准备，提升稳定性与持续交付能力。

- 后端编写单元测试（Jest）和 e2e 测试
- 前端编写组件测试（React Testing Library）与页面级测试
- 添加 Cypress e2e 测试模拟用户行为
- 使用 GitHub Actions 实现自动构建 + 测试 + Lint
- Docker 化前后端服务，支持一键部署到任意云平台

---

### 可选扩展阶段

- 文件上传（集成 AWS S3 或 MinIO）
- 实时功能：任务状态变更推送（WebSocket / Socket.IO）
- 权限控制：RBAC 管理后台（不同角色任务权限）
- 日志与监控：集成 Winston 日志、Prometheus 监控
- 动态国际化：语言包分离 + 按需加载

---

**最终目标**：打造一个真实可部署、具备多用户多角色权限控制、响应迅速、支持国际化的现代化任务管理平台，适合作为学习、作品集展示或小型团队实际使用系统。
