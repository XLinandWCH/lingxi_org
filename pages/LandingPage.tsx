
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TESTIMONIALS } from '../constants';

interface LandingPageProps {
  videoLink: string;
  heroScreenshot: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ videoLink, heroScreenshot }) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden flex flex-col">
      <style>{`
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-right {
          animation: scrollRight 40s linear infinite;
        }
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-48 pb-20 md:pb-32 text-center relative">
        {/* 巧思背景光晕 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#00FF88]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#8B5CF6]/5 blur-[100px] rounded-full pointer-events-none"></div>

        <h1 className="text-4xl md:text-8xl font-black mb-8 tracking-tight leading-[1.2] animate-in fade-in slide-in-from-top-4 duration-1000">
          <div>身无彩凤双飞翼</div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] via-[#00FF88] to-[#8B5CF6]">
            心有灵析一点通
          </span>
        </h1>
        <p className="text-base md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed font-medium">
          您的下一代私有化、可扩展的桌面 AI 智能体工作站。<br className="hidden md:block" />
          集智库、工坊、连接于一体，重塑生产力边界。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button 
            onClick={() => navigate('/docs')}
            className="w-full sm:w-auto bg-[#00FF88] text-[#0A0A0F] px-12 py-5 rounded-2xl text-base font-black shadow-2xl shadow-[#00FF88]/20 hover:scale-105 active:scale-95 transition-all"
          >
            免费获取灵析
          </button>
          <a href={videoLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-12 py-5 rounded-2xl text-base font-black border border-white/5 text-gray-400 hover:bg-white/5 hover:text-white transition-all text-center">
            了解如何工作
          </a>
        </div>
      </section>

      {/* Feature Grids */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <FeatureCard 
            title="灵析·智库" 
            desc="本地 RAG 系统，让 AI 深度理解您的私有文档，秒级索引，极速响应。"
            color="green"
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
          />
          <FeatureCard 
            title="灵析·工坊" 
            desc="独家 Artifacts 协议支持，代码实时预览与项目脚手架一键生成。"
            color="purple"
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
          />
          <FeatureCard 
            title="灵析·连接" 
            desc="开放的 MCP 插件生态，连接您的数据库、终端、浏览器及本地工具。"
            color="green"
            icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          />
        </div>
      </section>

      {/* Stats - 移动端 2x2 网格 */}
      <section className="bg-[#0D0D12] border-y border-white/5 py-20 w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <StatItem value="100%" label="私有化部署" />
          <StatItem value="500+" label="开源插件" />
          <StatItem value="200k+" label="社区用户" />
          <StatItem value="< 10ms" label="推理延迟" />
        </div>
      </section>

      {/* Screenshot Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 w-full">
         <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00FF88]/20 to-[#8B5CF6]/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-all duration-1000"></div>
            <div className="relative bg-[#1F2937]/30 border border-white/10 p-2 md:p-4 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-xl">
               <img src={heroScreenshot} alt="Interface Preview" className="rounded-[1.5rem] md:rounded-[2rem] opacity-90 w-full object-cover aspect-video shadow-inner" />
            </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 overflow-hidden relative border-t border-white/5">
        <h2 className="text-center text-3xl font-black mb-16 tracking-tight">聆听开发者的声音</h2>
        <div className="flex animate-scroll-right whitespace-nowrap">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="inline-block mx-4 min-w-[320px] max-w-[400px] bg-[#1F2937]/30 border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl">
              <p className="text-gray-400 italic mb-8 whitespace-normal leading-relaxed text-sm">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00FF88] to-[#8B5CF6] flex items-center justify-center font-black text-lg shadow-lg">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-base font-black text-white">{t.name}</div>
                  <div className="text-[10px] text-gray-600 font-black tracking-widest uppercase">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const StatItem: React.FC<{ value: string, label: string }> = ({ value, label }) => (
  <div>
    <div className="text-3xl md:text-5xl font-black text-white mb-2">{value}</div>
    <div className="text-gray-600 text-[10px] tracking-[0.2em] uppercase font-black">{label}</div>
  </div>
);

const FeatureCard: React.FC<{title: string, desc: string, color: 'green' | 'purple', icon: React.ReactNode}> = ({ title, desc, color, icon }) => {
  return (
    <div className="p-10 rounded-[2.5rem] border border-white/5 bg-[#1F2937]/20 hover:bg-[#1F2937]/40 hover:border-[#00FF88]/30 transition-all duration-500 group relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-full h-1 ${color === 'green' ? 'bg-[#00FF88]' : 'bg-[#8B5CF6]'} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
      <div className={`mb-8 transform group-hover:scale-110 transition-transform duration-500 ${color === 'green' ? 'text-[#00FF88]' : 'text-[#8B5CF6]'}`}>{icon}</div>
      <h3 className="text-2xl font-black mb-4 tracking-tight">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-sm font-medium">{desc}</p>
    </div>
  );
};

export default LandingPage;
