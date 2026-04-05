import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  ExternalLink,
  Plane as Airplane
} from 'lucide-react';
import { GlassFilter } from './components/GlassFilter';
import { HomeUI } from './components/HomeUI';

const SCENES = [
  { id: 1, url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000", name: "优美山谷" },
  { id: 2, url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2000", name: "迷雾山脉" },
  { id: 3, url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000", name: "深邃森林" },
  { id: 4, url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000", name: "高山湖泊" },
];

const UI_SCENARIOS = [
  { id: 'player', name: '音乐播放', icon: <Play className="w-3.5 h-3.5" /> },
  { id: 'control', name: '控制中心', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
  { id: 'search', name: '全局搜索', icon: <Search className="w-3.5 h-3.5" /> },
  { id: 'notification', name: '通知堆栈', icon: <Bell className="w-3.5 h-3.5" /> },
  { id: 'playground', name: '实验室', icon: <Sparkles className="w-3.5 h-3.5" /> },
];

export default function App() {
  const [activeScene, setActiveScene] = useState(0);
  const [isDemoStarted, setIsDemoStarted] = useState(false);
  const navigate = useNavigate();
  const [activeUI, setActiveUI] = useState('player');
  // 核心光学参数状态管理：您可以在此调整默认初始化的物理数值
  // 任何后续修改都会单向同步渲染向 GlassComponent 模型
  const [params, setParams] = useState({
    glassThickness: 60,           // 空间厚度，控制光线衰减阈值
    bezelWidth: 25,               // 倒角宽/曲率平滑半径 (上限 30 以避免反向扭曲)
    refractiveIndex: 1.52,        // 物理精确折射率 (n值，参考真实玻璃)
    blur: 4,                      // 底层散景/弥散光高斯模糊强度
    specularOpacity: 0.4,         // 高光层不透明度（明暗强度）
    specularHardness: 2,          // 高光硬度边界（数值越大越锐利锋利）
    refractionSaturation: 1.2,    // 穿透镜片的色彩折射饱和度增强
    scaleRatio: 1,                // 放大形变倍率参数
    radius: 32,                   // 外倒角 CSS 控制半径
    magnifyingScale: 0,           // 微距放大偏差（实验室专用）
    pgWidth: 300,                 // 调试用宽度
    pgHeight: 200,                // 调试用高度
    pgCircleSize: 200             // 测试圆球尺寸
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
      {/* Background Layer: Dark premium gradient for landing, scene photo for demo */}
      {!isDemoStarted ? (
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#0a0a0b]">
          {/* Subtle Abstract Highlights */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

          {/* Crisp, Correct Matrix Grid */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(circle at center, white 0%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle at center, white 0%, transparent 70%)'
            }}
          />
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            key={SCENES[activeScene].url}
            initial={{ filter: 'blur(10px)', opacity: 0.1, scale: 1.02 }}
            animate={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
            exit={{ filter: 'blur(20px)', opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
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
      )}

      {/* Top Navigation Bar */}
      <header className="relative z-50 w-full px-8 py-6 flex justify-between items-center bg-transparent">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setIsDemoStarted(false)}>
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-3xl border border-white/10 shadow-2xl group-hover:bg-white/20 transition-all">
              <Droplets className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xl font-bold tracking-tight">LiquidGlass</span>
          </div>

          {/* === 顶部导航状态栏与选项卡切换 (Nav Pill) === */}
          {/* 当点击进入空间后显示 */}
          {isDemoStarted && (
            <GlassComponent
              id="nav-pill"
              width="auto"
              height={44}
              params={{
                blur: 1,
                glassThickness: 60,
                bezelWidth: 20,
                refractiveIndex: 1.2,
                refractionSaturation: 1.8,
                scaleRatio: 1.5,
                radius: 22
              }}
              sceneUrl={SCENES[activeScene].url}
            >
              {/* 这里是选项卡的实际滑动渲染与交互区域 */}
              {/* 修改这里可以定制选项卡的宽度、排版和 hover 材质 */}
              <nav className="flex items-center px-1 py-1 h-full">
                {UI_SCENARIOS.map((ui) => (
                  <button
                    key={ui.id}
                    onClick={() => setActiveUI(ui.id)}
                    className={`flex items-center gap-2 px-6 h-full rounded-full text-[13px] font-bold transition-all duration-300 ${activeUI === ui.id ? 'bg-white/50 text-white scale-100' : 'text-white/80 hover:text-white hover:bg-white/20'
                      }`}
                  >
                    <span className={activeUI === ui.id ? 'text-white' : 'text-white/60'}>{ui.icon}</span>
                    <span className={activeUI === ui.id ? 'text-white' : 'text-white/60'}>{ui.name}</span>
                  </button>
                ))}
              </nav>
            </GlassComponent>
          )}
        </div>

        <div className="flex items-center gap-8">
          {isDemoStarted && (
            <>
              <div className="flex items-center gap-5 text-white/40 font-medium text-sm">
                <Signal className="w-4 h-4" />
                <Wifi className="w-4 h-4" />
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5">
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
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          {!isDemoStarted ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full flex items-center justify-center"
            >
              <HomeUI
                onStart={() => setIsDemoStarted(true)}
                onOpenDocs={() => navigate('/docs')}
                sceneUrl={SCENES[activeScene].url}
                globalParams={params}
              />
            </motion.div>
          ) : (
            <motion.div
              key="demo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col items-center justify-center"
            >
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
                  {activeUI === 'player' && (
                    <motion.div
                      key="player-ui"
                      initial={{ scale: 0.9, opacity: 0, y: 30 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.9, opacity: 0, y: 30 }}
                      transition={{ type: "spring", damping: 28, stiffness: 350 }}
                      className="w-full flex justify-center px-8"
                    >
                      <GlassComponent
                        id="player-glass"
                        width="100%"
                        maxWidth={880}
                        height={76}
                        params={{
                          ...params,
                          radius: 38,
                          bezelWidth: 28,
                          glassThickness: 80,
                          refractiveIndex: 1.3
                        }}
                        sceneUrl={SCENES[activeScene].url}
                      >
                        <div className="flex items-center px-8 h-full justify-between gap-12">
                          {/* Left Group */}
                          <div className="flex items-center gap-6">
                            <button className="text-white/20 hover:text-white transition-colors"><Shuffle className="w-4 h-4" /></button>
                            <button className="text-white/70 hover:text-white hover:scale-110 transition-all"><SkipBack className="w-5 h-5 fill-current" /></button>
                            <button
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/5"
                            >
                              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                            </button>
                            <button className="text-white/70 hover:text-white hover:scale-110 transition-all"><SkipForward className="w-5 h-5 fill-current" /></button>
                            <button className="text-white/20 hover:text-white transition-colors"><Repeat className="w-4 h-4" /></button>
                          </div>

                          {/* Center Info & Progress */}
                          <div className="flex-1 flex items-center gap-6 min-w-0">
                            <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden border border-white/10 shadow-lg flex-shrink-0">
                              <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col gap-2">
                              <div className="flex justify-between items-end">
                                <div className="truncate pr-4">
                                  <span className="text-[14px] font-bold text-white mr-2">Midnight City</span>
                                  <span className="text-[10px] text-white/30 font-medium">M83</span>
                                </div>
                                <span className="text-[9px] font-mono text-white/20 tabular-nums">02:44 / 04:03</span>
                              </div>
                              <div className="h-[3px] bg-white/5 rounded-full overflow-hidden relative">
                                <div className="absolute inset-y-0 left-0 bg-white/40 w-[63%] rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                              </div>
                            </div>
                          </div>

                          {/* Right Group */}
                          <div className="flex items-center gap-6">
                            <button className="text-white/20 hover:text-white hover:scale-110 transition-all"><MoreHorizontal className="w-5 h-5" /></button>
                            <button className="text-white/20 hover:text-white hover:scale-110 transition-all"><ListMusic className="w-5 h-5" /></button>
                            <button className="text-white/20 hover:text-white hover:scale-110 transition-all"><Airplay className="w-4 h-4" /></button>
                            <button className="text-white/20 hover:text-white hover:scale-110 transition-all"><Volume2 className="w-5 h-5" /></button>
                          </div>
                        </div>
                      </GlassComponent>
                    </motion.div>
                  )}

                  {activeUI === 'control' && (
                    <motion.div
                      key="control-ui"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="grid grid-cols-4 grid-rows-4 gap-8 w-[520px] h-[520px] items-center justify-center pointer-events-auto"
                    >
                      {/* Connectivity Tile */}
                      <div className="col-span-2 row-span-2 flex items-center justify-center">
                        <GlassComponent
                          id="ctrl-conn" width={240} height={240} sceneUrl={SCENES[activeScene].url}
                          params={{ ...params, radius: 48, bezelWidth: 32 }}
                        >
                          <div className="p-7 grid grid-cols-2 gap-5 h-full">
                            <div className="w-full aspect-square rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"><Airplane className="w-6 h-6" /></div>
                            <div className="w-full aspect-square rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"><Wifi className="w-6 h-6" /></div>
                            <div className="w-full aspect-square rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"><Bluetooth className="w-6 h-6" /></div>
                            <div className="w-full aspect-square rounded-full bg-white/10 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"><Settings2 className="w-6 h-6" /></div>
                          </div>
                        </GlassComponent>
                      </div>

                      {/* Media Tile */}
                      <div className="col-span-2 row-span-2 flex items-center justify-center">
                        <GlassComponent
                          id="ctrl-media" width={240} height={240} sceneUrl={SCENES[activeScene].url}
                          params={{ ...params, radius: 48, bezelWidth: 32 }}
                        >
                          <div className="p-7 h-full flex flex-col justify-between">
                            <div className="flex gap-5">
                              <div className="w-14 h-14 rounded-xl bg-white/10 overflow-hidden shadow-lg"><img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" /></div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[14px] font-bold truncate">Midnight City</div>
                                <div className="text-[11px] text-white/30 truncate">M83</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center gap-8">
                              <SkipBack className="w-6 h-6 fill-current opacity-40 hover:opacity-100 transition-opacity" />
                              <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-xl"><Play className="w-6 h-6 fill-current ml-1" /></div>
                              <SkipForward className="w-6 h-6 fill-current opacity-40 hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="h-[4px] bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-white/40 w-1/3" />
                            </div>
                          </div>
                        </GlassComponent>
                      </div>

                      {/* Sliders - Capsule Shape */}
                      <div className="col-span-1 row-span-2 flex justify-center items-center">
                        <GlassComponent
                          id="ctrl-brightness" width={100} height={240} sceneUrl={SCENES[activeScene].url}
                          params={{ ...params, radius: 50, bezelWidth: 32 }}
                        >
                          <div className="h-full w-full relative flex flex-col justify-end p-5">
                            <div className="absolute inset-x-0 bottom-0 top-[30%] bg-white/10 rounded-full" />
                            <div className="relative z-10 w-full flex justify-center pb-6"><Sun className="w-6 h-6 text-yellow-400" /></div>
                          </div>
                        </GlassComponent>
                      </div>
                      <div className="col-span-1 row-span-2 flex justify-center items-center">
                        <GlassComponent
                          id="ctrl-volume" width={100} height={240} sceneUrl={SCENES[activeScene].url}
                          params={{ ...params, radius: 50, bezelWidth: 32 }}
                        >
                          <div className="h-full w-full relative flex flex-col justify-end p-5">
                            <div className="absolute inset-x-0 bottom-0 top-[60%] bg-white/20 rounded-full" />
                            <div className="relative z-10 w-full flex justify-center pb-6"><Volume2 className="w-6 h-6 text-white/80" /></div>
                          </div>
                        </GlassComponent>
                      </div>

                      {/* Small Action Icons */}
                      <div className="col-span-2 row-span-1 flex gap-5 h-full items-center justify-between">
                        {[Bell, Moon, Droplets, Clock].map((Icon, idx) => (
                          <GlassComponent
                            key={idx} id={`ctrl-btn-${idx}`} width={56} height={102} sceneUrl={SCENES[activeScene].url}
                            params={{ ...params, radius: 28, bezelWidth: 20 }}
                          >
                            <div className="h-full w-full flex items-center justify-center"><Icon className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity" /></div>
                          </GlassComponent>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeUI === 'playground' && (
                    <motion.div
                      key="playground-ui"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full h-[600px] flex items-center justify-center pointer-events-none"
                    >
                      <div className="absolute inset-0 flex items-center justify-center gap-12 overflow-visible">
                        <motion.div
                          drag
                          dragMomentum={false}
                          className="pointer-events-auto cursor-move active:cursor-grabbing"
                          onDrag={() => {
                            // Manual update trigger for refraction offset during CSS transform drag
                            window.dispatchEvent(new Event('scroll'));
                          }}
                        >
                          <GlassComponent
                            id="pg-dynamic"
                            width={params.pgWidth}
                            height={params.pgHeight}
                            sceneUrl={SCENES[activeScene].url}
                            params={{ ...params }}
                          >
                            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                              <Sparkles className="w-8 h-8 text-blue-400 mb-3" />
                              <div className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-1">液态交互实验室</div>
                              <div className="text-[10px] text-white/20">拖动组件 & 调整右侧尺寸</div>
                            </div>
                          </GlassComponent>
                        </motion.div>

                        <motion.div
                          drag
                          dragMomentum={false}
                          className="pointer-events-auto cursor-move active:cursor-grabbing translate-y-20"
                          onDrag={() => {
                            window.dispatchEvent(new Event('scroll'));
                          }}
                        >
                          <GlassComponent
                            id="pg-circle-dyn"
                            width={params.pgCircleSize}
                            height={params.pgCircleSize}
                            sceneUrl={SCENES[activeScene].url}
                            params={{ ...params, radius: params.pgCircleSize / 2 }}
                          >
                            <div className="h-full flex items-center justify-center text-white/40 font-bold uppercase tracking-widest text-[9px] drop-shadow-md">物理球体</div>
                          </GlassComponent>
                        </motion.div>

                        {/* 新增的胶囊形式组件 */}
                        <motion.div
                          drag
                          dragMomentum={false}
                          className="pointer-events-auto cursor-move active:cursor-grabbing translate-x-32 -translate-y-32"
                          onDrag={() => {
                            window.dispatchEvent(new Event('scroll'));
                          }}
                        >
                          <GlassComponent
                            id="pg-capsule-dyn"
                            width={220}
                            height={60}
                            sceneUrl={SCENES[activeScene].url}
                            params={{ ...params, radius: 30 }}
                          >
                            <div className="h-full flex items-center justify-center text-white/50 font-bold uppercase tracking-[0.2em] text-[10px] gap-2">
                              交互胶囊按钮
                            </div>
                          </GlassComponent>
                        </motion.div>
                      </div>
                      <div className="absolute bottom-0 text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">Drag to discover • Precise Refraction</div>
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
                          <Search className="w-6 h-6 text-white/60" />
                          <input
                            type="text"
                            placeholder="搜索应用、文件或更多内容..."
                            className="bg-transparent border-none outline-none text-xl w-full placeholder:text-white/40 font-semibold tracking-tight"
                            autoFocus
                          />
                          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/20 text-[11px] font-bold text-white/80 border border-white/20 shadow-sm">
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
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Controls Panel */}
      <AnimatePresence>
        {isControlsOpen && (
          <motion.div
            initial={{ x: 360 }}
            animate={{ x: 0 }}
            exit={{ x: 360 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-[200]"
          >
            <div className="w-[300px] bg-[#0a0a0b]/80 backdrop-blur-3xl rounded-[32px] border border-white/10 p-6 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#0a0a0b]/90 backdrop-blur-3xl pb-2 z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">光学引擎参数控制</span>
                <button onClick={() => setIsControlsOpen(false)} className="w-6 h-6 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                </button>
              </div>

              <div className="space-y-4">
                <ControlSlider label="厚度 (Thickness)" icon={<Layers className="w-3.5 h-3.5 opacity-50" />} value={params.glassThickness} min={1} max={150} onChange={(v: number) => handleParamChange('glassThickness', v)} />
                <ControlSlider label="倒角参数 (Bezel Width)" icon={<Maximize2 className="w-3.5 h-3.5 opacity-50" />} value={params.bezelWidth} min={1} max={30} onChange={(v: number) => handleParamChange('bezelWidth', v)} />
                <ControlSlider label="边缘曲率 (Radius)" icon={<Sun className="w-3.5 h-3.5 opacity-50" />} value={params.radius} min={0} max={80} onChange={(v: number) => handleParamChange('radius', v)} />
                <ControlSlider label="折射率 (Refraction)" icon={<Droplets className="w-3.5 h-3.5 opacity-50" />} value={params.refractiveIndex} min={1} max={3} step={0.1} onChange={(v: number) => handleParamChange('refractiveIndex', v)} />
                <ControlSlider label="折射比 (Scale)" icon={<Maximize2 className="w-3.5 h-3.5 opacity-50" />} value={params.scaleRatio} min={0.1} max={3} step={0.1} onChange={(v: number) => handleParamChange('scaleRatio', v)} />
                <ControlSlider label="引擎弥散 (Blur)" icon={<Sun className="w-3.5 h-3.5 opacity-50" />} value={params.blur} min={0} max={40} onChange={(v: number) => handleParamChange('blur', v)} />
                <ControlSlider label="高光硬度 (Hardness)" icon={<Sparkles className="w-3.5 h-3.5 opacity-50" />} value={params.specularHardness} min={0.5} max={10} step={0.1} onChange={(v: number) => handleParamChange('specularHardness', v)} />
                <ControlSlider label="高光层亮度 (Specular)" icon={<Sparkles className="w-3.5 h-3.5 opacity-50" />} value={params.specularOpacity} min={0} max={1} step={0.05} onChange={(v: number) => handleParamChange('specularOpacity', v)} />
                <ControlSlider label="光影饱和度 (Saturation)" icon={<Droplets className="w-3.5 h-3.5 opacity-50" />} value={params.refractionSaturation} min={0} max={5} step={0.1} onChange={(v: number) => handleParamChange('refractionSaturation', v)} />
                {activeUI === 'playground' && (
                  <>
                    <div className="h-px bg-white/10 my-2" />
                    <ControlSlider label="组件宽度" icon={<Maximize2 className="w-3.5 h-3.5" />} value={params.pgWidth} min={100} max={800} onChange={(v: number) => handleParamChange('pgWidth', v)} />
                    <ControlSlider label="组件高度" icon={<Maximize2 className="w-3.5 h-3.5" />} value={params.pgHeight} min={100} max={600} onChange={(v: number) => handleParamChange('pgHeight', v)} />
                    <ControlSlider label="圆球尺寸" icon={<Droplets className="w-3.5 h-3.5" />} value={params.pgCircleSize} min={50} max={400} onChange={(v: number) => handleParamChange('pgCircleSize', v)} />
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative w-full border-t border-white/5 bg-[#0a0a0b]/80 backdrop-blur-3xl px-12 py-8 flex flex-col md:flex-row justify-between items-center text-[12px] font-medium text-white/40 mt-auto z-[60]">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <span className="tracking-[0.1em] uppercase text-white/60">LiquidGlass Engine ™</span>
        </div>
        <div className="flex gap-8 mt-4 md:mt-0 uppercase tracking-widest text-[10px]">
          <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          <span className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" /> System Status
          </span>
        </div>
      </footer>

    </div>
  );
}

/**
 * A reusable Glass Component that separates the filtered refraction layer from the sharp UI layer.
 */
export function GlassComponent({ id, width, height, maxWidth, params, sceneUrl, children }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Use integral values to prevent subpixel rendering artifacts in SVG
        const w = Math.round(rect.width);
        const h = Math.round(rect.height);

        if (w !== dimensions.w || h !== dimensions.h) {
          setDimensions({ w, h });
        }

        setOffset({
          x: -rect.left,
          y: -rect.top
        });
      }
    };

    update();
    const observer = new ResizeObserver(() => {
      requestAnimationFrame(update);
    });

    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    };
  }, [dimensions.w, dimensions.h]);

  return (
    <div
      ref={containerRef}
      className="relative group inline-block"
      style={{
        width: width || 'auto',
        height: height || 'auto',
        maxWidth: maxWidth || 'none'
      }}
    >
      {/* 1. Filter Definition */}
      {dimensions.w > 0 && dimensions.h > 0 && (
        <GlassFilter
          id={id}
          width={dimensions.w}
          height={dimensions.h}
          {...params}
        />
      )}

      {/* 2. Refraction Layer (Background) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{
          borderRadius: params.radius,
          filter: dimensions.w > 0 ? `url(#${id})` : 'none',
          willChange: 'filter'
        }}
      >
        <img
          src={sceneUrl}
          className="absolute w-[100vw] h-[100vh] object-cover opacity-100 max-w-none"
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
            pointerEvents: 'none'
          }}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* 3. Sharp UI Layer (This defines the size if width/height is auto) */}
      <div
        className="relative z-10 overflow-hidden"
        style={{
          borderRadius: params.radius,
          height: !height || height === 'auto' ? undefined : height,
          minHeight: !height || height === 'auto' ? undefined : height,
          width: !width || width === 'auto' ? undefined : width,
        }}
      >
        <div style={{ height: !height || height === 'auto' ? 'auto' : '100%' }}>
          {children}
        </div>
      </div>

      {/* 4. Subtle Outer Glow */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-black/40 translate-y-4 pointer-events-none"
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
