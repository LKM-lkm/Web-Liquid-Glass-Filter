# Nuxt 3 集成指南 (Liquid Glass for Vue/Nuxt)

由于核心引擎脱离了沉重的 WebGL 框架，高度依赖于原生的 DOM SVG 滤镜流水线，因此将其从 React 迁移到 Nuxt 3 (Vue 3) 环境是非常优雅和顺畅的。

本文档将指导您如何在 Nuxt 3 项目中复用这一整套高级液态玻璃渲染系统。

## 1. 全局滤镜容器 (`app.vue`)

首先，我们需要在应用的根部插入 SVG `<filter>` 定义层。
在您的 `app.vue` (或 `layouts/default.vue`) 的底部加入滤镜挂载点：

```vue
<template>
  <div>
    <NuxtPage />

    <!-- SVG Filter Defs (无形元素，建议放在文档结构末尾) -->
    <svg style="width:0; height:0; position:absolute; pointer-events:none;" aria-hidden="true">
      <defs id="liquid-glass-defs">
        <!-- 动态生成的子组件滤镜将被挂载到此节点内部 -->
      </defs>
    </svg>
  </div>
</template>
```

## 2. 封装 `LiquidGlass.vue` 组件

接下来，我们将使用 Vue 的 Composition API（组合式 API）来实现 `ResizeObserver` 与 `Canvas` 法线烘焙体系。

创建核心组件文件：`components/LiquidGlass.vue`

```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  sceneUrl: { type: String, required: true },
  width: { type: [Number, String], default: 'auto' },
  height: { type: [Number, String], default: 'auto' },
  params: {
    type: Object,
    default: () => ({ blur: 15, thickness: 80, refractiveIndex: 1.25, bezelWidth: 20, radius: 48 })
  }
})

const containerRef = ref<HTMLElement | null>(null)
const dimensions = ref({ w: 0, h: 0 })
const offset = ref({ x: 0, y: 0 })
const bumpTexture = ref<string>('')

// 1. 渲染位移贴图 (Normal Map Generator)
const renderBumpMap = (w: number, h: number) => {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return ''

  // 底色填充 RGB (128, 128, 0) 代表 0 偏移
  ctx.fillStyle = 'rgb(128, 128, 0)'
  ctx.fillRect(0, 0, w, h)

  // (此部分请直接复制 React 工程 GlassFilter.tsx 中极坐标法线生成的 Canvas 计算片段)
  // ... 此处省略大量 fillRect 数学绘制代码 ...
  
  return canvas.toDataURL()
}

// 2. 触发空间同步刷新
const updateLayout = () => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  
  const w = Math.round(rect.width)
  const h = Math.round(rect.height)
  
  if (w !== dimensions.value.w || h !== dimensions.value.h) {
    dimensions.value = { w, h }
    bumpTexture.value = renderBumpMap(w, h)
  }
  
  offset.value = { x: -rect.left, y: -rect.top }
}

let observer: ResizeObserver

// 3. 挂载物理观测器
onMounted(() => {
  updateLayout()
  observer = new ResizeObserver(() => requestAnimationFrame(updateLayout))
  if (containerRef.value) observer.observe(containerRef.value)
  window.addEventListener('resize', updateLayout)
  window.addEventListener('scroll', updateLayout)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  window.removeEventListener('resize', updateLayout)
  window.removeEventListener('scroll', updateLayout)
})
</script>

<template>
  <div 
    ref="containerRef" 
    class="relative inline-block group"
    :style="{ width: props.width, height: props.height }"
  >
    <!-- Vue 魔法：将生成的滤镜节点传送 (Teleport) 到全局定义区 -->
    <Teleport to="#liquid-glass-defs" v-if="dimensions.w > 0">
      <filter 
        :id="props.id" 
        filterUnits="userSpaceOnUse" 
        primitiveUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
        x="0" y="0" :width="dimensions.w" :height="dimensions.h"
      >
        <feImage :href="bumpTexture" result="DISP_MAP" x="0" y="0" :width="dimensions.w" :height="dimensions.h" preserveAspectRatio="none" />
        
        <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="SRGB_SRC" />
        <feDisplacementMap 
          in="SRGB_SRC" in2="DISP_MAP" 
          xChannelSelector="R" yChannelSelector="G" 
          :scale="props.params.thickness" result="REFRACTION" 
        />
        <feGaussianBlur in="REFRACTION" :stdDeviation="props.params.blur" result="BLURRED_REFRACTION" />

        <feMerge>
          <feMergeNode in="BLURRED_REFRACTION" />
        </feMerge>
      </filter>
    </Teleport>

    <!-- 背景映射捕捉层 -->
    <div 
      class="absolute inset-0 overflow-hidden pointer-events-none z-0"
      :style="{ filter: dimensions.w > 0 ? `url(#${props.id})` : 'none', borderRadius: `${props.params.radius}px` }"
    >
      <img 
        :src="props.sceneUrl" 
        class="absolute w-[100vw] h-[100vh] object-cover max-w-none"
        :style="{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }" 
      />
    </div>

    <!-- 真实内容注入区域槽位 Slot -->
    <div class="relative z-10 w-full h-full">
      <slot />
    </div>
  </div>
</template>
```

## 3. 在页面中的复用示范

设置完成组件后！体验与 React 项目里同等的极致效果。
在任意 `pages/index.vue` 单页面组件中：

```vue
<template>
  <div class="page-wrapper min-h-screen relative flex items-center justify-center p-20 bg-gray-900">
    <LiquidGlass 
      id="nuxt-premium-card"
      width="450px" 
      height="300px"
      sceneUrl="https://images.unsplash.com/your-bg.jpg"
      :params="{ blur: 20, thickness: 120 }"
    >
      <div class="p-10 flex flex-col items-center justify-center h-full">
        <h1 class="text-white text-3xl font-bold tracking-widest uppercase">Nuxt Power</h1>
        <p class="text-white/40 mt-2">Zero-WebGL spatial refraction built on core SVG engine.</p>
      </div>
    </LiquidGlass>
  </div>
</template>
```

## 4. Nuxt 开发避坑提示

1. **Teleport 的必要性**
   在 Safari 与早期的 iOS 引擎下，局部定义的 SVG 往往会发生“引用丢失(`url(#id)`)”问题导致黑屏。因此我们采用了 Vue3 独有的 `<Teleport>`，将散布在虚拟光效组件内的 `<filter>` 直接弹射至页面顶层的 `defs` 空间，以此达到最佳的全局渲染稳态。

2. **响应式的本质替换**
   由于核心架构是 Vanilla 驱动，将 `useEffect` 改为 `onMounted`/`watch` 足以承载我们的物理位移观测逻辑。引擎中无需修改复杂的数学管线。
