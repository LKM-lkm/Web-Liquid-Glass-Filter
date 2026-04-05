# Liquid Glass Refraction Engine 🔮

<div align="center">
  <p>一个打破 Web 次元壁的下一代液态玻璃渲染系统。</p>
  <p>基于底层的物理光学与 Web SVG 硬件加速管线，实现了物理级别的厚度感、边缘折射与光泽感，为下一代 Spatial UI (空间界面) 而生。</p>
</div>

---

## ⚡ 核心特性 (Features)

- **物理真实的折射视差 (Snell's Law)**
  不使用简单的 CSS `backdrop-filter: blur` 敷衍。我们通过原生 Canvas 绘制复杂的曲率位移贴图并将其喂给 SVG 的 `feDisplacementMap`，从根本上模拟真实世界由于玻璃厚度带来的光线偏振。
  
- **极致的渲染性能 (60FPS+)**
  完全依靠浏览器原生的 SVG 滤镜管线（Hardware Accelerated），摒弃了沉重的 Three.js/WebGL 依赖，能够在普通的 Web 页面中以极低的开销渲染复杂的流体玻璃。

- **动态尺寸同频 (Zero Ghosting)**
  彻底攻克了 SVG 滤镜在 DOM 缩放拉伸时的“伽马颜色偏移”与“坐标重影”顽疾。无论组件如何形变，边缘的物理高光流线及折射层都能达到像素级（Pixel-perfect）对齐。

- **多维光学参数调节 (Parametric Optics)**
  支持实时、无缝调节玻璃的各项物理参数，包含但不限于：
  - 模糊度 (Blur)
  - 玻璃厚度 (Thickness)
  - 折射率 (Index of Refraction)
  - 高光硬度 (Specular Hardness)

- **高级组件实验室 (Playground)**
  系统自带可物理交互的实验室视图，支持通过拖拽测试不同形状（胶囊、正圆、圆角矩形）组件在各个物理光照参数下的边缘表现质量。

---

## 💻 快速开始 (Getting Started)

本项目使用 **React** + **Vite** + **Tailwind CSS** + **Framer Motion** 构建。

### 安装依赖

```bash
# 推荐使用 npm 或 pnpm
npm install
```

### 本地启动

```bash
npm run dev
```

启动后进入默认端口（通常为 `http://localhost:5173/`），即可体验主页的纯净排版，点击 **"Launch Workspace"** 沉浸式体验调试控制台。

---

## 🧩 如何提取并复用 (Usage)

本系统已被设计为**高度模块化**。要在您自己的代码库中使用这个绝美的折射效果，只需要复制以下两个核心文件：

1. **`src/components/GlassFilter.tsx`**
   *SVG 滤镜定义中心，负责维护基于 sRGB 的物理颜色空间。*
2. **`src/App.tsx` 中的 `<GlassComponent>` 组件**
   *封装了 ResizeObserver 的响应式容器，完美处理了位移贴图的偏移与渲染帧的同步机制。*

**使用示例：**

```tsx
import { GlassComponent } from './components/GlassComponent';

export default function MyPremiumCard() {
  return (
    // sceneUrl 必须为您当前容器下方的实际背景图片地址，以供提取折射像素
    <GlassComponent 
      id="my-premium-card" 
      width={400} 
      height={250} 
      sceneUrl="https://your-background-image.jpg"
      params={{ 
        radius: 32, 
        blur: 15, 
        glassThickness: 60, 
        bezelWidth: 20,
        refractiveIndex: 1.25
      }}
    >
      <div className="p-8 text-white">
        <h2>Next-Gen Card</h2>
        <p>This UI breaks the boundary between digital and physical.</p>
      </div>
    </GlassComponent>
  );
}
```

---

## 🔬 核心算法浅析 (Algorithm)

若想要深入了解这套折射的原理（如如何结合 `userSpaceOnUse` 处理拖拽不掉帧、如何结合 `sRGB` 颜色空间消除 Gamma 曲线造成的坐标系位移等），请参阅我们编写的详细工程文档：

👉 [**查看 核心算法(ALGORITHM.md) 文档**](./ALGORITHM.md)

---

## 📄 许可证 (License)

本项目采用 [MIT License](LICENSE) 协议发布，您可以自由地将其应用于个人实验乃至商业级的项目中去创造极致的交互艺术。
