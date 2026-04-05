import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ChevronRight, Github, Zap, ShieldCheck, Cpu } from 'lucide-react';
import { GlassComponent } from '../App';

interface HomeUIProps {
  onStart?: () => void;
  activeScene?: string;
  sceneUrl?: string;
}

export function HomeUI({ onStart, sceneUrl }: HomeUIProps) {
  const features = [
    { icon: <Zap className="w-5 h-5 text-blue-400" />, title: "极致渲染", desc: "60FPS 硬件加速 SVG 滤镜管线", glassId: "f-render" },
    { icon: <ShieldCheck className="w-5 h-5 text-green-400" />, title: "物理精确", desc: "基于 Snell 定理的实时折射算法", glassId: "f-physics" },
    { icon: <Cpu className="w-5 h-5 text-purple-400" />, title: "多维参数", desc: "支持厚度、折射率、倒角实时调节", glassId: "f-params" }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center py-24 px-10 text-center gap-16 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="space-y-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white/50">Next-Gen Spatial UI Engine</span>
        </motion.div>
        
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <h1 className="text-[140px] font-black tracking-[-0.06em] leading-[0.8] mb-12 mix-blend-plus-lighter">
              LIQUID <br />
              <span className="text-white/15 decoration-white/5 underline underline-offset-10">REFRACTION</span>
            </h1>
            <p className="text-2xl text-white/40 font-medium max-w-3xl mx-auto leading-relaxed mt-10">
              打破 Web 开发的次元壁。基于真实物理光学的液态玻璃渲染系统，为你的应用注入光影与厚度之魂。
            </p>
          </motion.div>
          
          {/* Large Floating Glass Decorative Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-60">
             <GlassComponent 
               id="hero-glass-blob" width={800} height={400} sceneUrl={sceneUrl}
               params={{ blur: 15, glassThickness: 120, radius: 200, refractiveIndex: 1.2, specularOpacity: 0.2 }}
             >
                <div className="w-full h-full" />
             </GlassComponent>
          </div>
        </div>
      </div>
      
      {/* Feature Section - Using Liquid Glass Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full"
      >
        {features.map((f) => (
          <GlassComponent 
            key={f.glassId} id={f.glassId} width="100%" height={260} sceneUrl={sceneUrl}
            params={{ radius: 48, blur: 5, glassThickness: 60, bezelWidth: 32 }}
          >
            <div className="p-10 text-left h-full flex flex-col justify-between group cursor-help">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 tracking-widest">{f.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{f.title}</h3>
                <p className="text-[15px] text-white/40 font-medium leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </GlassComponent>
        ))}
      </motion.div>

      {/* Button Action Block */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="flex flex-col gap-12 mt-12 items-center"
      >
        <GlassComponent 
          id="cta-button-glass" width={320} height={84} sceneUrl={sceneUrl}
          params={{ radius: 42, blur: 2, glassThickness: 20, bezelWidth: 15 }}
        >
          <button 
            onClick={onStart}
            className="w-full h-full flex items-center justify-center gap-4 text-white font-black text-xl bg-white/5 hover:bg-white/10 transition-all group"
          >
            进入实验舞台 <ChevronRight className="w-6 h-6 stroke-[3] group-hover:translate-x-1 transition-transform" />
          </button>
        </GlassComponent>
        
        <div className="flex items-center gap-16">
          <div className="flex items-center gap-4 text-white/20 hover:text-white transition-colors cursor-pointer group">
            <Github className="w-6 h-6 opacity-30 group-hover:opacity-100" />
            <span className="text-sm font-bold uppercase tracking-[0.3em]">Documentation</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/5" />
          <div className="flex items-center gap-4 text-white/20 hover:text-white transition-colors cursor-pointer group">
            <span className="text-sm font-bold uppercase tracking-[0.3em]">Vite / React READY</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
