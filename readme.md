# Boo Engine 静态文档网站

本目录包含 Boo Engine 引擎的静态文档网站。

## 目录结构

```
static/
├── index.html    # 主入口页面
├── styles.css   # 样式文件
├── app.js       # 应用程序逻辑
└── readme.md    # 本文件
```

## 使用方式

本网站需要通过 Web 服务器访问，不能直接通过文件系统打开。

### 本地开发

使用 Python 启动简易服务器：

```bash
# 在 static 目录的父目录运行
cd file
python -m http.server 8080
```

然后访问 http://localhost:8080/static/

### 生产部署

将 `static` 目录部署到任何 Web 服务器（如 Nginx、Apache）或静态网站托管服务。

## 技术特性

- **响应式设计**：支持桌面端和移动端
- **SPA 架构**：单页面应用，无需刷新页面
- **Markdown 渲染**：直接从 `.md` 文件加载内容
- **URL 路由**：基于哈希的路由，支持书签和分享

## 内容来源

文档内容存储在 `../guides/` 目录下，本网站通过 JavaScript 动态加载这些 Markdown 文件并渲染为 HTML。
