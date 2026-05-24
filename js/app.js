/**
 * Boo Engine Documentation - Main Application
 */

// 文档导航数据
const DOCS_DATA = [
    {
        title: '入门指南',
        level: 1,
        children: [
            { name: '首页', id: 'home', level: 2, type: 'content' }
        ]
    },
    {
        title: '场景系统',
        level: 1,
        children: [
            { name: 'Scene 场景', id: 'core/scene/scene', level: 2, type: 'content' },
            { name: 'Node2D 2D节点', id: 'core/scene/node-2d', level: 2, type: 'content' },
            { name: 'Node3D 3D节点', id: 'core/scene/node-3d', level: 2, type: 'content' }
        ]
    },
    {
        title: '组件系统',
        level: 1,
        children: [
            { name: 'Component 组件基类', id: 'core/component/component', level: 2, type: 'content' },
            { name: 'Camera 相机组件', id: 'core/renderer/camera', level: 2, type: 'content' },
            {
                title: '渲染组件',
                level: 2,
                type: 'category',
                children: [
                    {
                        title: 'UI',
                        id: 'render-ui',
                        level: 3,
                        type: 'expandable',
                        expanded: false,
                        children: [
                            { name: 'UISprite UI精灵', id: 'core/renderer/ui/ui-sprite', level: 4, type: 'content' },
                            { name: 'UIMask UI遮罩', id: 'core/renderer/ui/ui-mask', level: 4, type: 'content' },
                            { name: 'UIBMFontText BMFont文本', id: 'core/renderer/ui/ui-bmfont-text', level: 4, type: 'content' }
                        ]
                    },
                    {
                        title: '3D',
                        id: 'render-3d',
                        level: 3,
                        type: 'expandable',
                        expanded: false,
                        children: [
                            { name: 'MeshRenderer 网格渲染', id: 'core/renderer/3d/mesh-renderer', level: 4, type: 'content' }
                        ]
                    }
                ]
            },
            {
                title: '其他组件',
                level: 2,
                type: 'category',
                children: [
                    {
                        title: '3D',
                        id: 'other-3d',
                        level: 3,
                        type: 'expandable',
                        expanded: false,
                        children: [
                            { name: 'GLTFComponent GLTF组件', id: 'core/components/3d/gltf-component', level: 4, type: 'content' }
                        ]
                    },
                    {
                        title: 'Tool',
                        id: 'other-tool',
                        level: 3,
                        type: 'expandable',
                        expanded: false,
                        children: [
                            { name: 'EditorCamera 编辑器相机', id: 'core/components/tool/editor-camera', level: 4, type: 'content' },
                            { name: 'GroundGrid 地面网格', id: 'core/components/tool/ground-grid', level: 4, type: 'content' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: '资源系统',
        level: 1,
        children: [
            { name: 'AssetManager 资产管理器', id: 'core/asset/asset-manager', level: 2, type: 'content' },
            { name: 'MeshAsset 网格资产', id: 'core/asset/mesh-asset', level: 2, type: 'content' },
            { name: 'MaterialAsset 材质资产', id: 'core/asset/material-asset', level: 2, type: 'content' },
            { name: 'ShaderAsset 着色器资产', id: 'core/asset/shader-asset', level: 2, type: 'content' },
            { name: 'TextureAsset 纹理资产', id: 'core/asset/texture-asset', level: 2, type: 'content' },
            { name: 'GLTFAsset GLTF资产', id: 'core/asset/gltf-asset', level: 2, type: 'content' },
            { name: 'AudioAsset 音频资产', id: 'core/asset/audio-asset', level: 2, type: 'content' }
        ]
    },
    {
        title: '声音系统',
        level: 1,
        children: [
            { name: 'AudioManager 音频管理器', id: 'core/audio/audio-manager', level: 2, type: 'content' },
            { name: 'Audio 音频实例', id: 'core/audio/audio', level: 2, type: 'content' }
        ]
    },
    {
        title: '跨平台',
        level: 1,
        children: [
            { name: 'Windows 适配', id: 'platforms/windows', level: 2, type: 'content' },
            { name: 'macOS 适配', id: 'platforms/macos', level: 2, type: 'content' },
            { name: 'Android 适配', id: 'platforms/android', level: 2, type: 'content' }
        ]
    }
];

class BooDocsApp {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.navMenu = document.getElementById('navMenu');
        this.contentArea = document.getElementById('contentArea');
        this.currentId = 'home';
        this.expandedItems = new Set();

        this.init();
    }

    init() {
        this.renderNav();
        this.bindEvents();
        this.navigate('home');
    }

    // 渲染导航菜单
    renderNav() {
        let html = '';
        DOCS_DATA.forEach(group => {
            html += `<div class="nav-group">`;
            html += `<div class="nav-level-${group.level || 1}">${group.title}</div>`;

            if (group.children) {
                html += this.renderLevel(group.children);
            }
            html += `</div>`;
        });

        this.navMenu.innerHTML = html;
    }

    // 递归渲染指定级别的菜单项
    renderLevel(items) {
        let html = '';
        items.forEach(item => {
            if (item.type === 'content') {
                const isActive = item.id === this.currentId ? 'active' : '';
                html += `<a class="nav-level-${item.level} nav-content ${isActive}" data-id="${item.id}">${item.name}</a>`;
            } else if (item.type === 'category') {
                html += `<div class="nav-level-${item.level} nav-category">${item.title}</div>`;
                if (item.children) {
                    html += this.renderLevel(item.children);
                }
            } else if (item.type === 'expandable') {
                const expandKey = item.id || item.title;
                const isExpanded = item.expanded || this.expandedItems.has(expandKey);
                html += `<div class="nav-level-${item.level} nav-expandable${isExpanded ? ' expanded' : ''}" data-expand="${expandKey}">${item.title}</div>`;
                if (isExpanded && item.children) {
                    html += this.renderLevel(item.children);
                }
            } else if (item.children) {
                html += `<div class="nav-level-${item.level}-group">`;
                if (item.title) {
                    html += `<div class="nav-level-${item.level}">${item.title}</div>`;
                }
                html += this.renderLevel(item.children);
                html += `</div>`;
            }
        });
        return html;
    }

    // 绑定事件
    bindEvents() {
        // 导航点击
        this.navMenu.addEventListener('click', (e) => {
            // 处理可展开项点击
            const expandable = e.target.closest('.nav-expandable');
            if (expandable) {
                const expandKey = expandable.dataset.expand;
                if (this.expandedItems.has(expandKey)) {
                    this.expandedItems.delete(expandKey);
                } else {
                    this.expandedItems.add(expandKey);
                }
                this.renderNav();
                return;
            }

            // 处理内容项点击
            const navItem = e.target.closest('.nav-content');
            if (navItem && navItem.dataset.id) {
                const id = navItem.dataset.id;
                this.navigate(id);
            }
        });

        // 搜索功能
        this.searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
    }

    // 导航到指定页面
    navigate(id) {
        this.currentId = id;

        // 更新导航状态
        document.querySelectorAll('[class^="nav-level-"]').forEach(item => {
            item.classList.toggle('active', item.dataset.id === id);
        });

        // 通过 iframe 加载对应的 HTML 文件
        const contentPath = `docs/${id}.html`;
        this.contentArea.innerHTML = `<iframe src="${contentPath}" frameborder="0" style="width: 100%; height: 100%; min-height: 500px; display: block;"></iframe>`;

        // 清空搜索
        this.searchInput.value = '';
    }

    // 搜索功能
    handleSearch(query) {
        if (!query.trim()) {
            this.renderNav();
            return;
        }

        query = query.toLowerCase();
        let html = '';

        DOCS_DATA.forEach(group => {
            const matchedItems = [];
            const searchItems = (items) => {
                items.forEach(item => {
                    if (item.id && (item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query))) {
                        matchedItems.push(item);
                    }
                    if (item.children) {
                        searchItems(item.children);
                    }
                });
            };
            if (group.children) {
                searchItems(group.children);
            }

            if (matchedItems.length > 0) {
                html += `<div class="nav-group">`;
                html += `<div class="nav-level-1">${group.title}</div>`;
                matchedItems.forEach(item => {
                    const isActive = item.id === this.currentId ? 'active' : '';
                    html += `<a class="nav-level-${item.level || 2} ${isActive}" data-id="${item.id}">${item.name}</a>`;
                });
                html += `</div>`;
            }
        });

        if (!html) {
            html = '<div style="padding: 20px; color: var(--text-muted); text-align: center;">未找到匹配的文档</div>';
        }

        this.navMenu.innerHTML = html;
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BooDocsApp();
});
