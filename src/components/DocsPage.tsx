import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, BookOpen, ChevronRight, LayoutTemplate, Layers, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReadMeContent from '../../README.md?raw';
import AlgoContent from '../../ALGORITHM.md?raw';
import NuxtContent from '../../NUXT_INTEGRATION.md?raw';

export function DocsPage() {
  const navigate = useNavigate();
  const [activeDoc, setActiveDoc] = React.useState<'readme' | 'algo' | 'nuxt'>('readme');

  const contentMap = {
    readme: ReadMeContent,
    algo: AlgoContent,
    nuxt: NuxtContent
  };
  return (
    <div className="fixed inset-0 z-[2000] min-h-screen w-full bg-[#050505] text-white overflow-y-auto font-sans">
      {/* Minimalist Tech Background Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-center bg-[#050505]">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, white 10%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, white 10%, transparent 80%)'
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row">
        
        {/* Left Sidebar (Nuxt Content Style) */}
        <aside className="w-full md:w-72 lg:w-80 shrink-0 border-r border-white/5 md:min-h-screen px-6 py-10 sticky top-0 md:h-screen overflow-y-auto">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 返回 LiquidGlass
          </button>
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
              <BookOpen className="w-4 h-4 text-white/70" />
            </div>
            <span className="font-bold tracking-widest text-sm text-white/90">官方技术文档</span>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveDoc('readme')}
              className={`w-full px-4 py-3 rounded-xl text-[13px] font-semibold flex items-center justify-between transition-colors border ${activeDoc === 'readme' ? 'bg-white/10 border-white/10 text-white shadow-lg' : 'border-transparent text-white/40 hover:bg-white/5 hover:text-white/80'}`}
            >
              <span className="flex items-center gap-2.5"><Zap className="w-3.5 h-3.5" /> 项目概览白皮书</span>
              {activeDoc === 'readme' && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
            </button>
            <button 
              onClick={() => setActiveDoc('algo')}
              className={`w-full px-4 py-3 rounded-xl text-[13px] font-semibold flex items-center justify-between transition-colors border ${activeDoc === 'algo' ? 'bg-white/10 border-white/10 text-white shadow-lg' : 'border-transparent text-white/40 hover:bg-white/5 hover:text-white/80'}`}
            >
              <span className="flex items-center gap-2.5"><Layers className="w-3.5 h-3.5" /> 核心光学算法原理</span>
              {activeDoc === 'algo' && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
            </button>
            <button 
              onClick={() => setActiveDoc('nuxt')}
              className={`w-full px-4 py-3 rounded-xl text-[13px] font-semibold flex items-center justify-between transition-colors border ${activeDoc === 'nuxt' ? 'bg-white/10 border-white/10 text-white shadow-lg' : 'border-transparent text-white/40 hover:bg-white/5 hover:text-white/80'}`}
            >
              <span className="flex items-center gap-2.5"><LayoutTemplate className="w-3.5 h-3.5" /> 框架集成指南</span>
              {activeDoc === 'nuxt' && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
            </button>
          </nav>
        </aside>

        {/* Markdown Content Area */}
        <main className="flex-1 w-full px-8 py-12 md:py-20 md:px-16 overflow-x-hidden">
          <div className="max-w-3xl">
            <ReactMarkdown 
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl md:text-4xl font-semibold mb-10 text-white/90 tracking-tight leading-tight" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl md:text-2xl font-semibold mb-6 mt-16 pb-3 border-b border-white/10 tracking-tight text-white/80" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-semibold mb-4 mt-10 text-white/80" {...props} />,
                p: ({node, ...props}) => <p className="mb-6 leading-relaxed text-white/60 text-[15px]" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 text-white/60 leading-relaxed" {...props} />,
                li: ({node, ...props}) => <li className="mb-2" {...props} />,
                a: ({node, ...props}) => <a className="text-white/80 font-medium border-b border-white/30 hover:border-white transition-all pb-0.5" {...props} />,
                code: ({node, className, ...props}: any) => {
                  const match = /language-(\w+)/.exec(className || '');
                  if (match) {
                    return (
                      <div className="bg-[#0b0b0b] border border-white/5 rounded-xl overflow-hidden my-8 shadow-2xl">
                        <div className="bg-[#111] border-b border-white/5 py-2 px-4 flex justify-between items-center">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                          </div>
                          <span className="text-[10px] text-white/30 uppercase font-mono tracking-widest">{match[1]}</span>
                        </div>
                        <div className="p-5 overflow-x-auto">
                          <code className={`text-[13px] font-mono leading-loose text-white/80 bg-transparent p-0 ${className}`} {...props} />
                        </div>
                      </div>
                    );
                  }
                  return <code className="bg-white/10 rounded px-1.5 py-0.5 font-mono text-[13px] text-white/90 mx-0.5" {...props} />;
                },
                pre: ({node, ...props}) => <pre className="m-0 p-0" {...props} />,
                hr: ({node, ...props}) => <hr className="border-white/10 my-16" {...props} />,
                img: ({node, ...props}) => <img className="rounded-xl filter grayscale contrast-125 opacity-90 my-12 max-w-full border border-white/10" {...props} />,
                table: ({node, ...props}) => <div className="overflow-x-auto mb-8"><table className="w-full text-left border-collapse text-sm text-white/60" {...props} /></div>,
                th: ({node, ...props}) => <th className="border-b border-white/10 py-4 px-4 font-semibold text-white/80" {...props} />,
                td: ({node, ...props}) => <td className="border-b border-white/5 py-4 px-4" {...props} />,
              }}
            >
              {contentMap[activeDoc]}
            </ReactMarkdown>
          </div>
        </main>
      </div>
    </div>
  );
}
