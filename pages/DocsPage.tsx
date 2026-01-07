
import React from 'react';

interface DocsPageProps {
  quickStartContent: string;
  winX64: string;
  winArm64: string;
  macOS: string;
  linux: string;
}

const DocsPage: React.FC<DocsPageProps> = ({ quickStartContent, winX64, winArm64, macOS, linux }) => {
  return (
    <div className="max-w-7xl mx-auto py-24 px-4 flex flex-col lg:flex-row gap-16">
      <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-32 h-fit">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">入门指南</h3>
        <ul className="space-y-6 text-sm">
          <li className="text-[#00FF88] font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]"></span>
            快速开始
          </li>
          <li className="text-gray-400 hover:text-white transition-colors cursor-pointer pl-3.5">核心概念</li>
          <li className="text-gray-400 hover:text-white transition-colors cursor-pointer pl-3.5">安装部署</li>
        </ul>
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-12 mb-8">核心体系</h3>
        <ul className="space-y-6 text-sm">
          <li className="text-gray-400 hover:text-white transition-colors cursor-pointer pl-3.5">灵析·智库 (RAG)</li>
          <li className="text-gray-400 hover:text-white transition-colors cursor-pointer pl-3.5">灵析·工坊 (Artifacts)</li>
          <li className="text-gray-400 hover:text-white transition-colors cursor-pointer pl-3.5">灵析·连接 (MCP)</li>
        </ul>
      </aside>

      <div className="flex-grow max-w-4xl">
        <div className="prose prose-invert prose-lg max-w-none">
          <h1 className="text-5xl font-black mb-10 tracking-tight">快速开始</h1>
          
          <div className="bg-[#1F2937]/30 border-l-4 border-[#00FF88] p-8 rounded-r-3xl mb-12 text-gray-300 leading-relaxed whitespace-pre-wrap">
            {quickStartContent}
          </div>

          <div className="space-y-16">
            <section>
              <h2 className="text-3xl font-bold mb-8 tracking-tight">1. 下载客户端</h2>
              <p className="text-gray-400 mb-10 text-base leading-relaxed">
                请根据您的硬件架构选择对应的版本进行下载。
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <a href={winX64} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 bg-[#1F2937]/40 border border-white/5 p-8 rounded-3xl hover:border-[#00FF88] transition-all group no-underline">
                  <span className="font-bold text-white group-hover:text-[#00FF88]">Windows x64</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Setup.exe</span>
                </a>
                <a href={winArm64} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 bg-[#1F2937]/40 border border-white/5 p-8 rounded-3xl hover:border-[#00FF88] transition-all group no-underline">
                  <span className="font-bold text-white group-hover:text-[#00FF88]">Windows ARM64</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Setup.exe</span>
                </a>
                <a href={macOS} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 bg-[#1F2937]/40 border border-white/5 p-8 rounded-3xl hover:border-[#00FF88] transition-all group no-underline">
                  <span className="font-bold text-white group-hover:text-[#00FF88]">macOS Silicon</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">LingXi.dmg</span>
                </a>
                <a href={linux} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 bg-[#1F2937]/40 border border-white/5 p-8 rounded-3xl hover:border-[#00FF88] transition-all group no-underline">
                  <span className="font-bold text-white group-hover:text-[#00FF88]">Linux (deb)</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Universal</span>
                </a>
              </div>
            </section>
            
            <section className="pt-8 border-t border-white/5">
               <p className="text-sm text-gray-600">灵析是一款尊重数据隐私的工作站，安装过程中如遇系统拦截请选择“仍要运行”。</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
