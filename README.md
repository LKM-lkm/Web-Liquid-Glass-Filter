# Liquid Glass Refraction Engine

<div align="center">
  <p>基于硬件加速管线的下一代 Web 液态玻璃渲染系统</p>
  <p>利用物理光学原理与 SVG 滤镜管线，实现工业级的折射视差、边缘倒角与物理高光感，专为高级 Spatial UI 设计语言打造。</p>
</div>

---

## 核心技术特性 (Technical Features)

- **物理真实的折射视差 (Physically Based Refraction)**
  拒绝传统的 `backdrop-filter: blur` 简单叠加。本引擎通过动态生成精密法线贴图 (Normal Map) 并驱动 SVG `feDisplacementMap` 原语，从底层模拟光线穿透厚介质时的偏振与位移。
  
- **极致的硬件加速性能 (Hardware Accelerated)**
  完全基于浏览器原生 SVG 滤镜流水线，摒弃了沉重的 WebGL/Three.js 依赖。在保持极低 CPU 加载的同时，提供流畅的 60FPS+ 渲染表现，适用于各种复杂的 DOM 环境。

- **像素级坐标对齐 (Pixel-Perfect Alignment)**
  攻克了 SVG 滤镜在 DOM 容器动态位移或缩放时的“采样重影”与“颜色空间偏移”难题。无论组件如何形变，物理高光流线及底层折射层始终保持绝对的视觉对齐。

- **多维光学参数控制 (Optical Parameters)**
  提供丰富的物理参数接口，支持实时精细化调节：
  - **折射率 (IOR)**：模拟不同介质的光学密度。
  - **玻璃厚度 (Thickness)**：控制光线偏移的物理距离。
  - **高光硬度 (Specular Hardness)**：调节倒角反射的锐利度。
  - **折射饱和度 (Saturation)**：由于光散效应造成的色彩增强。
  - **形变比例 (Scale Ratio)**：控制光学透视畸变的倍率。

- **交互式实验室 (Playground)**
  系统集成实时调试沙盒，支持测试不同几何形状（正圆、胶囊、多边形容器）在各种物理参数下的视觉极限表现。

---

## 快速开始 (Getting Started)

### 环境依赖
- React 18+
- Vite
- Framer Motion (用于交互动效)
- Tailwind CSS

### 部署与运行
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

---

## 组件复用与集成 (Integration)

本项目采用高度解耦的架构设计。若要在您的生产环境中使用该效果，建议提取以下核心逻辑：

1. **`src/components/GlassFilter.tsx`**: 核心滤镜定义与管线算法。
2. **`src/App.tsx` 中的 `GlassComponent`**: 封装了 `ResizeObserver` 与像素校准逻辑的响应式容器。

**代码示例：**

```tsx
<GlassComponent 
  id="unique-glass-id" 
  sceneUrl={currentBackgroundUrl}
  params={{ 
    radius: 32, 
    blur: 5, 
    glassThickness: 60, 
    bezelWidth: 20,
    refractiveIndex: 1.52,
    refractionSaturation: 1.2
  }}
>
  {/* 您的业务 UI */}
</GlassComponent>
```

---

## 关于分发至 NPM (Publishing to NPM)

本项目的核心逻辑完全具备发布为独立 NPM UI 组件库的条件。
**建议流程：**
- 使用 Vite 的 `Library Mode` 进行打包。
- 将 `src/lib/glass-logic.ts` 与 `GlassFilter` 封装为通用的 React/Vue Wrapper。
- 导出类型定义文件 (*.d.ts)。

---

## 核心算法文档 (Documentation)

详细的数学模型、坐标系转换算法以及 SVG 管线优化细节，请参阅：
[**核心算法原理 (ALGORITHM.md)**](./ALGORITHM.md)

---

## 许可证 (License)

本项目基于 **MIT License** 发布。您可以自由用于个人实验、开源项目或商业级产品的视觉构建。
