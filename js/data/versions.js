const VERSIONS = [
  {
    version: '1.0.0',
    date: '2026-05-30',
    type: 'minor',
    isLatest: true,
    features: [
      '1.引擎第一个版本v1.0.0发布',
      '2.新增2D组件UISprite,UIBMFont,UIMask基础渲染组件',
      '3.新增AssetManager资源管理系统',
      '4.新增AudioManager音频管理系统',
      '5.支持多平台开发(Windows, macOS, Android)'
    ],
    download: 'https://github.com/carlosyzy/Boo-Engine/releases',
    github: 'https://github.com/carlosyzy/Boo-Engine'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = VERSIONS;
}
