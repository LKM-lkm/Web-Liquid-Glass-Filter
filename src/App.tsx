import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search,
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  MoreHorizontal, 
  ListMusic, 
  Radio, 
  Volume2,
  Settings2,
  Droplets,
  Maximize2,
  Sun,
  Layers,
  ChevronRight,
  ChevronLeft,
  Wifi,
  Battery,
  Signal,
  Bell,
  Moon,
  Airplay,
  Bluetooth,
  LayoutGrid,
  Command,
  Clock,
  Calendar,
  Info,
  Sparkles,
  Github,
  ExternalLink
} from 'lucide-react';
import { GlassFilter } from './components/GlassFilter';
import { HomeUI } from './components/HomeUI';

const SCENES = [
  { id: 1, url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000", name: "优胜美地山谷" },
  { id: 2, url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2000", name: "迷雾山脉" },
  { id: 3, url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000", name: "深邃森林" },
  { id: 4, url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000", name: "高山湖泊" },
];

const UI_SCENARIOS = [
  { id: 'home', name: '项目介绍', icon: <Info className="w-3.5 h-3.5" /> },
  { id: 'player', name: '音乐播放', icon: <Play className="w-3.5 h-3.5" /> },
  { id: 'control', name: '控制中心', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
  { id: 'search', name: '全局搜索', icon: <Search className="w-3.5 h-3.5" /> },
  { id: 'notification', name: '通知堆栈', icon: <Bell className="w-3.5 h-3.5" /> },
];

export default function App() {
  const [activeScene, setActiveScene] = useState(0);
  const [activeUI, setActiveUI] = useState('home');
  const [params, setParams] = useState({
    glassThickness: 60,
    bezelWidth: 25,
    refractiveIndex: 1.2,
    blur: 8,
    specularOpacity: 0.4,
    specularHardness: 2,
    refractionSaturation: 1.2,
    scaleRatio: 1,
    radius: 32,
    magnifyingScale: 0
  });

  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextScene = () => setActiveScene((prev) => (prev + 1) % SCENES.length);
  const prevScene = () => setActiveScene((prev) => (prev - 1 + SCENES.length) % SCENES.length);

  const handleParamChange = (key: keyof typeof params, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20 overflow-hidden flex flex-col font-sans antialiased">
      {/* Background Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={SCENES[activeScene].url} 
            alt="Background"
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        </motion.div>
      </AnimatePresence>

      {/* Top Navigation Bar */}
      <header className="relative z-[100] px-12 py-10 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveUI('home')}>
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-3xl border border-white/10 shadow-2xl group-hover:bg-white/20 transition-all">
              <Droplets className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xl font-bold tracking-tight">LiquidGlass</span>
          </div>
          
          <nav className="hidden md:flex items-center bg-white/5 backdrop-blur-3xl rounded-full px-1 py-1 border border-white/10 shadow-xl">
            {UI_SCENARIOS.map((ui) => (
              <button
                key={ui.id}
                onClick={() => setActiveUI(ui.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                  activeUI === ui.id ? 'bg-white text-black shadow-xl scale-100' : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                }`}
              >
                {ui.icon}
                {ui.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-5 text-white/40 font-medium text-sm">
            <Signal className="w-4 h-4" />
            <Wifi className="w-4 h-4" />
            <div className="flex items-center gap-1.5">
              <span className="text-[11px]">88%</span>
              <Battery className="w-5 h-5" />
            </div>
          </div>
          <button 
            onClick={() => setIsControlsOpen(!isControlsOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all shadow-lg"
          >
            <Settings2 className="w-4 h-4 text-white/60" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-8">
        {/* Scene Title with Navigation */}
        <div className="flex items-center gap-8 mb-16">
           <button onClick={prevScene} className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all group shadow-xl">
             <ChevronLeft className="w-5 h-5 text-white/30 group-hover:text-white" />
           </button>
           <div className="text-center">
             <motion.h2 
               key={SCENES[activeScene].name}
               initial={{ y: 10, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="text-5xl font-bold tracking-tight mb-3"
             >
               {SCENES[activeScene].name}
             </motion.h2>
             <p className="text-white/30 uppercase tracking-[0.4em] text-[9px] font-bold">折射引擎 v1.2</p>
           </div>
           <button onClick={nextScene} className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all group shadow-xl">
             <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white" />
           </button>
        </div>

        {/* Dynamic UI Components */}
        <div className="relative w-full flex items-center justify-center min-h-[450px]">
          <AnimatePresence mode="wait">
            {activeUI === 'home' && (
              <motion.div 
                key="home-ui"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="max-w-2xl w-full"
              >
                <GlassComponent 
                  id="home-glass"
                  width="100%"
                  height={320}
                  params={{ ...params, radius: 40 }}
                  sceneUrl={SCENES[activeScene].url}
                >
                  <HomeUI onStart={() => setIsControlsOpen(true)} />
                </GlassComponent>
              </motion.div>
            )}

            {activeUI === 'player' && (
              <motion.div 
                key="player-ui"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <GlassComponent 
                  id="player-glass"
                  width={680}
                  height={90}
                  params={{ ...params, radius: 45 }} // Capsule shape: height/2
                  sceneUrl={SCENES[activeScene].url}
                >
                  <div className="flex items-center px-10 h-full justify-between gap-8">
                    <div className="flex items-center gap-5">
                      <button className="text-white/30 hover:text-white transition-colors"><Shuffle className="w-4 h-4" /></button>
                      <button className="text-white/80 hover:text-white hover:scale-110 transition-all"><SkipBack className="w-5 h-5 fill-current" /></button>
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl"
                      >
                        {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                      </button>
                      <button className="text-white/80 hover:text-white hover:scale-110 transition-all"><SkipForward className="w-5 h-5 fill-current" /></button>
                      <button className="text-white/30 hover:text-white transition-colors"><Repeat className="w-4 h-4" /></button>
                    </div>
                    
                    <div className="flex items-center gap-5 flex-1 max-w-sm">
                      <div className="w-14 h-14 rounded-xl bg-white/10 overflow-hidden border border-white/10 shadow-2xl flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] font-bold truncate tracking-tight text-white">Midnight City</div>
                        <div className="text-[11px] text-white/40 truncate font-medium mt-0.5">M83 — Hurry Up, We're Dreaming</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <Airplay className="w-4 h-4 text-white/30 hover:text-white cursor-pointer transition-colors" />
                      <div className="flex items-center gap-3">
                        <Volume2 className="w-4 h-4 text-white/30" />
                        <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white/60 w-2/3 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassComponent>
              </motion.div>
            )}

            {activeUI === 'control' && (
              <motion.div 
                key="control-ui"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <GlassComponent 
                  id="control-glass"
                  width={340}
                  height={340}
                  params={{ ...params, radius: 44 }}
                  sceneUrl={SCENES[activeScene].url}
                >
                  <div className="p-7 h-full flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-[24px] p-4 flex flex-col gap-3 border border-white/10 shadow-inner">
                        <div className="flex justify-between">
                          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg"><Wifi className="w-4 h-4" /></div>
                          <div className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center"><Bluetooth className="w-4 h-4" /></div>
                        </div>
                        <div className="mt-1">
                          <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">网络连接</div>
                          <div className="text-[13px] font-bold">Apple Fiber</div>
                        </div>
                      </div>
                      <div className="bg-white/10 rounded-[24px] p-4 flex flex-col gap-3 border border-white/10 shadow-inner">
                        <div className="flex justify-between">
                          <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg"><Airplay className="w-4 h-4" /></div>
                          <div className="w-9 h-9 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-lg"><Moon className="w-4 h-4" /></div>
                        </div>
                        <div className="mt-1">
                          <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">专注模式</div>
                          <div className="text-[13px] font-bold">深度工作</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 bg-white/10 rounded-[24px] p-5 border border-white/10 shadow-inner flex flex-col justify-around">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shadow-lg"><Sun className="w-5 h-5 text-yellow-400" /></div>
                        <div className="flex-1">
                          <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">亮度</div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-white w-4/5 rounded-full" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shadow-lg"><Volume2 className="w-5 h-5 text-white/80" /></div>
                        <div className="flex-1">
                          <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">音量</div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-white w-1/2 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassComponent>
              </motion.div>
            )}

            {activeUI === 'search' && (
              <motion.div 
                key="search-ui"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <GlassComponent 
                  id="search-glass"
                  width={640}
                  height={64}
                  params={{ ...params, radius: 32 }} // Perfect capsule: height/2
                  sceneUrl={SCENES[activeScene].url}
                >
                  <div className="flex items-center px-6 h-full gap-5">
                    <Search className="w-6 h-6 text-white/30" />
                    <input 
                      type="text" 
                      placeholder="搜索应用、文件或更多内容..." 
                      className="bg-transparent border-none outline-none text-xl w-full placeholder:text-white/20 font-semibold tracking-tight"
                      autoFocus
                    />
                    <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/10 text-[11px] font-bold text-white/40 border border-white/10 shadow-sm">
                      <Command className="w-3 h-3" />
                      <span>K</span>
                    </div>
                  </div>
                </GlassComponent>
              </motion.div>
            )}

            {activeUI === 'notification' && (
              <motion.div 
                key="notification-ui"
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 60, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <GlassComponent 
                  id="notif-glass"
                  width={340}
                  height={140}
                  params={{ ...params, radius: 28 }}
                  sceneUrl={SCENES[activeScene].url}
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg"><Clock className="w-4 h-4" /></div>
                        <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest">待办事项</span>
                      </div>
                      <span className="text-[11px] font-medium text-white/20">10分钟前</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold tracking-tight">产品设计评审</div>
                      <div className="text-[13px] text-white/50 font-medium mt-0.5">Liquid Glass 折射引擎 v1.2</div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-blue-400/80">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>15分钟后开始</span>
                    </div>
                  </div>
                </GlassComponent>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Controls Panel */}
      <AnimatePresence>
        {isControlsOpen && (
          <motion.div 
            initial={{ x: 360 }}
            animate={{ x: 0 }}
            exit={{ x: 360 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute right-10 top-1/2 -translate-y-1/2 z-[200]"
          >
            <div className="w-[320px] bg-black/40 backdrop-blur-3xl rounded-[48px] border border-white/10 p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between mb-10">
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">光学引擎参数</span>
                <button onClick={() => setIsControlsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </button>
              </div>

              <div className="space-y-9">
                <ControlSlider label="厚度 (Thickness)" icon={<Layers className="w-3.5 h-3.5" />} value={params.glassThickness} min={1} max={150} onChange={(v: number) => handleParamChange('glassThickness', v)} />
                <ControlSlider label="倒角 (Bezel)" icon={<Maximize2 className="w-3.5 h-3.5" />} value={params.bezelWidth} min={1} max={100} onChange={(v: number) => handleParamChange('bezelWidth', v)} />
                <ControlSlider label="折射率 (Refraction)" icon={<Droplets className="w-3.5 h-3.5" />} value={params.refractiveIndex} min={1} max={3} step={0.1} onChange={(v: number) => handleParamChange('refractiveIndex', v)} />
                <ControlSlider label="模糊 (Blur)" icon={<Sun className="w-3.5 h-3.5" />} value={params.blur} min={0} max={40} onChange={(v: number) => handleParamChange('blur', v)} />
                <ControlSlider label="高光硬度" icon={<Sparkles className="w-3.5 h-3.5" />} value={params.specularHardness} min={0.5} max={10} step={0.1} onChange={(v: number) => handleParamChange('specularHardness', v)} />
                <ControlSlider label="折射饱和度" icon={<Droplets className="w-3.5 h-3.5" />} value={params.refractionSaturation} min={0} max={5} step={0.1} onChange={(v: number) => handleParamChange('refractionSaturation', v)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-50 px-12 py-10 flex justify-between items-center text-[10px] text-white/20 uppercase tracking-[0.5em] font-bold">
        <div className="flex gap-16">
          <span>© 2026 LiquidGlass 实验室</span>
          <span>Apple 设计理念</span>
        </div>
        <div className="flex gap-10">
          <span>SVG 折射引擎 v1.2</span>
          <span>Public Sans 字体</span>
        </div>
      </footer>
    </div>
  );
}

/**
 * A reusable Glass Component that separates the filtered refraction layer from the sharp UI layer.
 */
function GlassComponent({ id, width, height, params, sceneUrl, children }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ w: rect.width, h: rect.height });
        setOffset({
          x: -rect.left,
          y: -rect.top
        });
      }
    };

    update();
    const observer = new ResizeObserver(update);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', update);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative group" style={{ width, height }}>
      {/* 1. Filter Definition (Invisible) */}
      {dimensions.w > 0 && (
        <GlassFilter 
          id={id + "-filter"}
          width={dimensions.w}
          height={dimensions.h}
          {...params}
        />
      )}

      {/* 2. Refraction Layer (Filtered) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ 
          borderRadius: params.radius,
          filter: dimensions.w > 0 ? `url(#${id}-filter)` : 'none',
          // Removed background and boxShadow to prevent "double layer" perception
          // The SVG filter already handles the glass look and bezel
        }}
      >
        {/* Duplicate Background for Refraction */}
        <div className="absolute inset-0">
           <img 
             src={sceneUrl} 
             className="absolute w-[100vw] h-[100vh] object-cover opacity-100" 
             style={{ 
               transform: `translate(${offset.x}px, ${offset.y}px)`,
               filter: 'blur(1px)',
               maxWidth: 'none'
             }}
             referrerPolicy="no-referrer" 
           />
        </div>
      </div>

      {/* 3. Sharp UI Layer (Not Filtered) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="h-full pointer-events-auto">
          {children}
        </div>
      </div>

      {/* 4. Subtle Outer Glow & Shadow - Refined to be more subtle */}
      <div 
        className="absolute inset-0 -z-10 blur-2xl opacity-10 bg-black/60 translate-y-2" 
        style={{ borderRadius: params.radius }}
      />
    </div>
  );
}

function ControlSlider({ label, value, min, max, step = 1, onChange, icon }: any) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5 text-[10px] font-bold text-white/30 uppercase tracking-widest">
          {icon}
          <span>{label}</span>
        </div>
        <span className="text-[10px] font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">{value}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-white hover:accent-blue-400 transition-all"
      />
    </div>
  );
}
