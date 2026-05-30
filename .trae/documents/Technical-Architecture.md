# Boo Engine 官方网站 - 技术架构文档

## 1. 架构设计

### 1.1 整体架构

```
┌─────────────────────────────────────────────────────┐
│                    客户端浏览器                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │              静态资源层                       │   │
│  │  ┌─────────────────────────────────────┐    │   │
│  │  │  HTML页面（模块化）                    │    │   │
│  │  │  ├─ index.html（首页）              │    │   │
│  │  │  ├─ pages/home.html                 │    │   │
│  │  │  ├─ pages/docs.html                  │    │   │
│  │  │  ├─ pages/history.html               │    │   │
│  │  │  └─ pages/examples.html              │    │   │
│  │  └─────────────────────────────────────┘    │   │
│  │                                             │   │
│  │  ┌─────────────────────────────────────┐    │   │
│  │  │  CSS样式层                           │    │   │
│  │  │  ├─ main.css（全局样式+变量）        │    │   │
│  │  │  ├─ home.css（首页样式）             │    │   │
│  │  │  ├─ docs.css（文档样式）             │    │   │
│  │  │  ├─ history.css（历史样式）          │    │   │
│  │  │  └─ examples.css（示例样式）         │    │   │
│  │  └─────────────────────────────────────┘    │   │
│  │                                             │   │
│  │  ┌─────────────────────────────────────┐    │   │
│  │  │  JavaScript逻辑层                    │    │   │
│  │  │  ├─ app.js（主入口+路由+导航）       │    │   │
│  │  │  ├─ home.js（首页逻辑）              │    │   │
│  │  │  ├─ docs.js（文档加载逻辑）          │    │   │
│  │  │  ├─ history.js（历史版本逻辑）       │    │   │
│  │  │  ├─ examples.js（示例逻辑）         │    │   │
│  │  │  └─ data/（数据配置）                │    │   │
│  │  │     ├─ features.js（特性数据）       │    │   │
│  │  │     ├─ versions.js（版本数据）       │    │   │
│  │  │     └─ examples.js（示例数据）       │    │   │
│  │  └─────────────────────────────────────┘    │   │
│  │                                             │   │
│  │  ┌─────────────────────────────────────┐    │   │
│  │  │  资源文件层                           │    │   │
│  │  │  ├─ images/（图片资源）               │    │   │
│  │  │  ├─ docs/（文档内容HTML）            │    │   │
│  │  │  └─ fonts/（字体文件）              │    │   │
│  │  └─────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 1.2 模块独立性

每个页面模块独立运作，通过URL路由切换：
- `index.html` → 首页（默认）
- `pages/home.html` → 首页
- `pages/docs.html` → 文档
- `pages/history.html` → 历史
- `pages/examples.html` → 示例

## 2. 技术描述

### 2.1 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| **标记语言** | HTML5 | 语义化标签，模块化结构 |
| **样式** | CSS3 | CSS变量、Flexbox、Grid、动画 |
| **逻辑** | Vanilla JavaScript ES6+ | 原生JS，无框架依赖 |
| **外部库** | Marked.js | Markdown渲染（文档模块） |
| **字体** | Google Fonts | Orbitron（标题）、Roboto Mono（代码） |

### 2.2 浏览器支持

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### 2.3 性能目标

- 首屏加载：< 2秒
- 页面切换：< 500ms
- 总资源大小：< 2MB（不含文档）

## 3. 路由定义

### 3.1 页面路由

| 路径 | 页面文件 | 功能描述 |
|------|---------|---------|
| `/` 或 `/index.html` | index.html | 首页，引擎特性展示 |
| `/pages/home.html` | home.html | 首页（独立页面） |
| `/pages/docs.html` | docs.html | 文档中心 |
| `/pages/history.html` | history.html | 版本历史 |
| `/pages/examples.html` | examples.html | 示例展示 |

### 3.2 路由实现

```javascript
// app.js 路由配置
const ROUTES = {
  'home': 'pages/home.html',
  'docs': 'pages/docs.html',
  'history': 'pages/history.html',
  'examples': 'pages/examples.html'
};

// 基于hash的路由
window.addEventListener('hashchange', handleRoute);

function handleRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  loadPage(hash);
}
```

## 4. 数据结构

### 4.1 特性数据（features.js）

```javascript
export const FEATURES = [
  {
    id: 'cpp-core',
    title: 'C++ 高性能核心',
    description: '使用现代C++编写，提供极致性能...',
    icon: 'images/icons/cpp.svg',
    align: 'left' // left: 图标在左，right: 图标在右
  },
  // ...更多特性
];
```

### 4.2 版本数据（versions.js）

```javascript
export const VERSIONS = [
  {
    version: '2.0.0',
    date: '2024-06-01',
    type: 'major', // major, minor, patch
    features: [
      '全新渲染管线',
      '物理引擎升级'
    ],
    download: '#',
    isLatest: true
  },
  // ...更多版本
];
```

### 4.3 示例数据（examples.js）

```javascript
export const EXAMPLES = [
  {
    id: 'demo-1',
    name: '物理小球',
    description: '展示物理引擎的刚体模拟能力',
    thumbnail: 'images/examples/demo1.jpg',
    config: {
      // 示例特定配置
    },
    download: '#'
  },
  // ...更多示例
];
```

## 5. CSS架构

### 5.1 变量定义

```css
:root {
  /* 背景色 */
  --bg-primary: #0a0a0f;
  --bg-secondary: #111111;
  --bg-card: #1a1a2e;

  /* 主色调 */
  --color-red: #ff0040;
  --color-blue: #00d4ff;
  --color-green: #00ff88;

  /* 文字色 */
  --text-primary: #ffffff;
  --text-secondary: #888888;

  /* 间距 */
  --spacing-lg: 60px;
  --spacing-md: 40px;
  --spacing-sm: 20px;

  /* 容器 */
  --container-max: 1400px;

  /* 动画 */
  --transition-fast: 0.2s;
  --transition-normal: 0.3s;
}
```

### 5.2 样式分层

```
main.css
├── 重置样式（reset）
├── 变量定义（variables）
├── 公共组件（common）
│   ├── 按钮（btn）
│   ├── 卡片（card）
│   ├── 弹窗（modal）
│   └── 导航（nav）
└── 页面特定样式
    ├── home.css
    ├── docs.css
    ├── history.css
    └── examples.css
```

## 6. 组件设计

### 6.1 通用组件

| 组件 | 说明 | 状态 |
|------|------|------|
| Header | 顶部导航栏 | default, scrolled, mobile |
| NavLink | 导航链接 | default, hover, active |
| Button | 按钮 | default, hover, active, disabled |
| Card | 卡片 | default, hover |
| Modal | 弹窗 | open, closed |
| FeatureItem | 特性项 | left-align, right-align |
| VersionCard | 版本卡片 | latest, older |
| ExampleCard | 示例卡片 | default, hover |

### 6.2 组件状态

**按钮状态：**
```css
.btn { background: var(--bg-card); }
.btn:hover { background: var(--color-red); }
.btn:active { transform: scale(0.98); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
```

**卡片悬停：**
```css
.card {
  border: 1px solid transparent;
  transition: all var(--transition-normal);
}
.card:hover {
  border-color: var(--color-blue);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  transform: translateY(-5px);
}
```

## 7. 动画效果

### 7.1 入场动画

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-item {
  animation: fadeInUp 0.6s ease-out forwards;
}

.feature-item:nth-child(1) { animation-delay: 0.1s; }
.feature-item:nth-child(2) { animation-delay: 0.2s; }
/* ... */
```

### 7.2 霓虹发光效果

```css
.neon-glow {
  text-shadow:
    0 0 5px var(--color-red),
    0 0 10px var(--color-red),
    0 0 20px var(--color-red);
}

.neon-border {
  box-shadow:
    0 0 5px var(--color-blue),
    inset 0 0 5px rgba(0, 212, 255, 0.1);
}
```

### 7.3 扫描线效果

```css
.scan-line::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-blue), transparent);
  animation: scan 3s linear infinite;
}

@keyframes scan {
  from { top: 0; }
  to { top: 100%; }
}
```

## 8. 响应式断点

```css
/* 桌面优先策略 */
.container {
  max-width: 1400px;
  padding: 0 40px;
}

/* 平板 */
@media (max-width: 1024px) {
  .container { padding: 0 30px; }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
}

/* 手机 */
@media (max-width: 768px) {
  .container { padding: 0 20px; }
  .features-grid { grid-template-columns: 1fr; }
  .header-nav { display: none; } /* 显示汉堡菜单 */
}
```

## 9. 文件清单

```
Boo-Engine-H5/
├── index.html                    # 主入口（首页）
│
├── pages/                         # 页面模块目录
│   ├── home.html                 # 首页
│   ├── docs.html                 # 文档页
│   ├── history.html              # 历史页
│   └── examples.html            # 示例页
│
├── css/                          # 样式目录
│   ├── main.css                 # 全局样式
│   ├── home.css                 # 首页样式
│   ├── docs.css                 # 文档样式
│   ├── history.css              # 历史样式
│   └── examples.css             # 示例样式
│
├── js/                           # 脚本目录
│   ├── app.js                   # 主应用
│   ├── home.js                  # 首页逻辑
│   ├── docs.js                  # 文档逻辑
│   ├── history.js               # 历史逻辑
│   ├── examples.js              # 示例逻辑
│   └── data/                    # 数据配置
│       ├── features.js         # 特性数据
│       ├── versions.js         # 版本数据
│       └── examples.js         # 示例数据
│
├── images/                       # 图片资源
│   ├── icons/                   # 图标
│   │   ├── cpp.svg
│   │   ├── vulkan.svg
│   │   ├── cross-platform.svg
│   │   └── ...
│   └── examples/               # 示例预览
│
└── docs/                         # 文档内容（已存在）
    └── ...
```

## 10. 开发规范

### 10.1 命名规范

- HTML类名：kebab-case（如 `feature-card`）
- CSS变量：kebab-case（如 `--color-primary`）
- JavaScript变量/函数：camelCase（如 `loadPage`）
- 常量：UPPER_SNAKE_CASE（如 `MAX_ITEMS`）

### 10.2 代码质量

- HTML：语义化标签，W3C验证通过
- CSS：避免`!important`，使用BEM命名
- JavaScript：ES6+语法，JSDoc注释

### 10.3 性能优化

- 图片：WebP格式，懒加载
- CSS/JS：压缩合并
- 字体：使用系统字体fallback
