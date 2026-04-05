import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ChevronRight, Github } from 'lucide-react';

interface HomeUIProps {
  onStart?: () => void;
}

export function HomeUI({ onStart }: HomeUIProps) {
  return (
    <div className="p-10 h-full flex flex-col justify-center gap-6">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 font-sans">
          <Sparkles className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Liquid Glass 滤镜演示</h3>
          <p className="text-white/40 text-sm font-medium">基于物理折射逻辑的 SVG 实时渲染引擎</p>
        </div>
      </div>
      
      <p className="text-white/70 leading-relaxed text-[15px]">
        本项目展示了一种高级的“液态玻璃”视觉效果。通过自定义的 SVG 滤镜和物理折射算法，
        我们能够在网页上模拟出具有真实厚度、倒角和折射率的玻璃材质。
      </p>

      <div className="grid grid-cols-3 gap-4 mt-2">
        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
          <div className="text-blue-400 font-bold text-lg">1.2+</div>
          <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">折射率</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
          <div className="text-purple-400 font-bold text-lg">150px</div>
          <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">最大厚度</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 border border-white/10">
          <div className="text-orange-400 font-bold text-lg">60fps</div>
          <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">实时渲染</div>
        </div>
      </div>

      <div className="flex gap-4 mt-4 pointer-events-auto">
        <button 
          onClick={onStart}
          className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg active:scale-95"
        >
          开始体验 <ChevronRight className="w-4 h-4" />
        </button>
        <button className="px-6 py-2.5 rounded-full bg-white/10 text-white text-sm font-bold flex items-center gap-2 hover:bg-white/20 transition-all active:scale-95">
          <Github className="w-4 h-4" /> 源代码
        </button>
      </div>
    </div>
  );
}
