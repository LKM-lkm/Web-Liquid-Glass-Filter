# Liquid Glass Refraction Engine 核心算法原理

本文档详细介绍了本项目基于物理光学的液态玻璃渲染算法及其实现细节。该方案通过模拟真实世界中光线经过透明介质时的偏转现象，在 Web 端实现了高保真、实时且响应式的液态玻璃视觉效果。

---

## 1. 物理模型与光学逻辑 (Scientific Basis)

本引擎的核心逻辑基于物理光学的 **斯内尔定律 (Snell's Law)**。光线从空气进入玻璃等高密度介质时，会发生因介质厚度与曲率引起的路径偏折。

### 1.1 法线贴图驱动 (Normal Drift Mapping)

为了模拟真实的物理厚度感，我们利用 Canvas 运行时生成高频位移贴图 (Displacement Map)：

- **零位定义**：背景中性 R/G 值为 `128 (0.5)`，代表无偏移对齐。
- **曲率模拟**：根据 **边缘宽度 (Bezel Width)** 与 **倒角半径 (Radius)**，计算各像素点的空间梯度。
- **计算逻辑**：算法利用极坐标方程捕获像素相对于最近几何边界的距离 $d$。当 $d$ 处于倒角控制区间时，会根据法线向量对 R/G 通道进行加权偏移，从而为 SVG 渲染器提供精确的位移索引。

### 1.2 高光层合成 (Specular Pipeline)

基于生成的法线数据，利用 SVG `<feSpecularLighting>` 节点对环境光进行模拟。通过调整 **高光硬度 (Specular Hardness)** 数值，可以控制倒角处反射光斑的弥散范围与强度，增强材质的“冷硬”科技感。

---

## 2. 渲染管线优化 (Rendering Pipeline)

1. **背景提取 (Pixel Sampling)**：通过 `GlassComponent` 实时捕捉组件背后的图层纹理。
2. **硬件驱动置换 (feDisplacementMap)**：
   - **关键修复**：强制锁定 `colorInterpolationFilters="sRGB"`，解决了常规浏览器在 Linear 空间下处理 Alpha 预乘造成的坐标漂移。
   - **零丢帧同步**：使用 `filterUnits="userSpaceOnUse"` 解决窗口滚动时的采样撕裂现象。
3. **色彩动力学**：引入折射饱和度补偿，模拟光线在玻璃内部发生全反射时产生的色散增强效果。

---

## 3. 分发与建议 (Distribution)

本引擎由于其高度解耦的特性，非常适合作为独立的 UI 库发布至 **NPM**：

- **React 封装**：本项目已完成 React 组件层封装。
- **Nuxt/Vue 支持**：参照 `NUXT_INTEGRATION.md` 进行组件迁移。
- **打包建议**：建议使用 Vite 库模式打包，并开启 `SourceMap` 以供开发者调试底层光学常数。

---

## 4. 版权说明

Liquid Glass Filter Engine 由专为极致视觉体验设计的 Antigravity 团队研发。
