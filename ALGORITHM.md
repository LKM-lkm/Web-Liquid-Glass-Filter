# Liquid Glass Refraction Engine (v1.2.5) 核心算法文档

本文档详细介绍了本项目基于物理光学的液态玻璃渲染算法及其实现细节。该方案通过模拟真实世界中光线经过透明介质时的偏转现象，在 Web 端实现了高保真、实时且响应式的液态玻璃视觉效果。

---

## 1. 物理模型与光学逻辑 (Snell's Law)

本引擎的核心逻辑基于物理光学的**斯内尔定律 (Snell's Law)**。光线从空气进入玻璃介质时，会发生偏折。

### 1.1 法线贴图烘焙 (Normal Map Generation)

为了模拟真实的厚度感，我们首先在 Canvas 中生成一张置换贴图 (Displacement Map)。

- **中心区域**：保持平整，RGB 值为 `(128, 128, 0)`（代表偏移量为 0）。
- **边缘区域**：根据**圆角半径 (Radius)** 和**边框宽度 (Bezel Width)**，计算出边缘的曲率梯度。
- **计算公式**：我们将分片（矩形的四个圆角与四条直边）映射到全局坐标系，利用极坐标方程计算每个像素点相对于最近边缘的距离 $d$。当 $d < \text{BezelWidth}$ 时，像素的 R 和 G 通道会根据该点的法线向量进行偏移。

### 1.2 高光路径 (Specular Calculation)

利用生成的法线贴图，通过 SVG 的 `<feSpecularLighting>` 节点模拟环境光源（通常为点光源或平行光）在玻璃倒角处的反射。

---

## 2. SVG 渲染管线 (Pipeline)

为了确保 60FPS 的渲染性能，我们利用浏览器硬件加速的 SVG 滤镜流水线：

1. **背景提取 (SourceGraphic)**：通过 `GlassComponent` 提取背景图层。
2. **置换应用 (feDisplacementMap)**：
   - **关键修复**：由于浏览器默认在 linearRGB 空间处理滤镜，会导致坐标偏移。我们强制设置 `colorInterpolationFilters="sRGB"`，确保 `128 (0.5)` 的偏移量精准对齐组件中心。
   - **坐标对齐**：使用 `filterUnits="userSpaceOnUse"` 配合自定义的计算偏移，解决了窗口缩放时的采样重影（Ghosting）问题。
3. **光泽合成**：将生成的 `feSpecularLighting` 层以 `screen` 模式叠加在折射层之上，形成真实的玻璃倒角光亮。

---

## 3. 核心优势与复用

### 3.1 响应式布局同步 (Responsive Sync)

通过 `ResizeObserver` 实时监听 DOM 尺寸变化，动态更新 SVG 的 `viewBox` 与 Canvas 贴图尺寸，实现了组件随窗口大小改变而实时重绘的能力。

### 3.2 复用指南

若要在新项目中使用，只需复制 `src/components/GlassFilter.tsx` 和 `src/App.tsx` 中的 `GlassComponent` 即可。

### 3.3 推荐发布平台

- **代码托管**：GitHub (推荐建立独立 Repo 并编写 README)。
  - 使用 **Vite** 的模板可以快速获得最佳开发体验。
- **在线演示**：Vercel / Netlify / Cloudflare Pages。
  - 支持一键从 GitHub 同步并开启 HTTPS 预览。
- **生态分发**：NPM / JSR。
  - 可以将 `GlassComponent` 封装为独立的 React/Vue 包进行发布。

---

## 4. 作者与版权

Liquid Glass Filter Engine 由 Antigravity 架构师设计，致力于推动 Web 空间计算视觉体验。
