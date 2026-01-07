
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COLORS, TESTIMONIALS } from '../constants';

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
      <section className="max-w-7xl mx-auto px-4 pt-32 pb-20 text-center relative">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#00FF88]/10 to-transparent blur-[120px] -z-10"></div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter">
          身无彩凤双飞翼<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] via-[#00FF88] to-[#8B5CF6]">
            心有灵析一点通
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          您的下一代私有化、可扩展的桌面 AI 智能体工作站。<br />
          集智库、工坊、连接于一体，重塑生产力边界。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/docs')}
            className="bg-[#00FF88] text-[#0A0A0F] px-12 py-4 rounded-xl text-lg font-bold shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:scale-105 transition-all"
          >
            免费下载
          </button>
          <a href={videoLink} target="_blank" rel="noopener noreferrer" className="px-12 py-4 rounded-xl text-lg font-bold border border-[#8B5CF6]/30 text-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-all">
            观看演示视频
          </a>
        </div>
      </section>

      {/* Feature Grids */}
      <section className="max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="grid md:grid-cols-3 gap-8">
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

      {/* Stats */}
      <section className="bg-white/5 border-y border-white/5 py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-5xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-500 text-sm tracking-widest uppercase font-bold">私有化部署</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-500 text-sm tracking-widest uppercase font-bold">开源插件</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-white mb-2">200k+</div>
            <div className="text-gray-500 text-sm tracking-widest uppercase font-bold">社区用户</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-white mb-2">&lt; 10ms</div>
            <div className="text-gray-500 text-sm tracking-widest uppercase font-bold">本地推理延迟</div>
          </div>
        </div>
      </section>

      {/* Dynamic Screenshot Section */}
      <section className="max-w-6xl mx-auto px-4 py-24 w-full">
         <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00FF88]/20 to-[#8B5CF6]/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-[#1F2937]/30 border border-white/10 p-2 rounded-3xl overflow-hidden shadow-2xl">
               <img src={heroScreenshot} alt="Interface Preview" className="rounded-2xl opacity-90 w-full object-cover aspect-video" />
            </div>
         </div>
      </section>

      {/* Testimonials at the bottom */}
      <section className="py-24 overflow-hidden relative border-t border-white/5 bg-[#0A0A0F]">
        <h2 className="text-center text-3xl font-bold mb-16 tracking-tight">全球用户的真实评价</h2>
        <div className="flex animate-scroll-right whitespace-nowrap">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="inline-block mx-4 min-w-[320px] max-w-[400px] bg-[#1F2937]/40 border border-white/5 p-8 rounded-3xl backdrop-blur-md">
              <p className="text-gray-300 italic mb-6 whitespace-normal leading-relaxed text-sm">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00FF88] to-[#8B5CF6] flex items-center justify-center font-bold text-lg shadow-lg">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-base font-bold">{t.name}</div>
                  <div className="text-xs text-gray-500 font-mono tracking-tighter uppercase">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{title: string, desc: string, color: 'green' | 'purple', icon: React.ReactNode}> = ({ title, desc, color, icon }) => {
  return (
    <div className={`p-10 rounded-3xl border border-white/5 bg-[#1F2937]/30 hover:bg-[#1F2937]/50 hover:border-white/10 transition-all group relative overflow-hidden`}>
      <div className={`absolute top-0 left-0 w-1 h-full ${color === 'green' ? 'bg-[#00FF88]' : 'bg-[#8B5CF6]'} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
      <div className={`mb-6 transform group-hover:scale-110 transition-transform ${color === 'green' ? 'text-[#00FF88]' : 'text-[#8B5CF6]'}`}>{icon}</div>
      <h3 className="text-2xl font-bold mb-4 tracking-tight">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
    </div>
  );
};

export default LandingPage;
