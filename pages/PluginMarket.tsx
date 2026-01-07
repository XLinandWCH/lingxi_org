
import React from 'react';

const PluginMarket: React.FC = () => {
  const plugins = [
    { name: 'Browser Connector', desc: 'Allow AI to read and control your active browser tabs.', category: 'Productivity', stars: 1200 },
    { name: 'Python Sandbox', desc: 'Secure local environment for executing AI generated code.', category: 'DevTools', stars: 850 },
    { name: 'Notion Sync', desc: 'Deep integration with your Notion workspace.', category: 'Knowledge', stars: 2100 },
    { name: 'PostgreSQL Explorer', desc: 'Query and analyze your local databases via MCP.', category: 'DevTools', stars: 450 },
    { name: 'Git Master', desc: 'Automate commits, PR descriptions, and code reviews.', category: 'Productivity', stars: 3200 },
    { name: 'MathTeX', desc: 'Render complex formulas and solve mathematical problems.', category: 'Education', stars: 720 },
  ];

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-4">插件市场</h1>
          <p className="text-gray-400">通过社区开发的 MCP 插件，无限扩展灵析的能力。</p>
        </div>
        <div className="flex gap-2">
           <input 
            type="text" 
            placeholder="搜索插件..." 
            className="bg-[#1F2937] border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#00FF88]"
           />
           <button className="bg-[#8B5CF6] text-white px-4 py-2 rounded-lg text-sm font-bold">提交插件</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plugins.map((plugin, i) => (
          <div key={i} className="bg-[#1F2937] border border-white/5 p-6 rounded-2xl hover:border-[#00FF88]/40 transition-all group">
            <div className="flex justify-between items-start mb-4">
               <div className="w-10 h-10 bg-[#0A0A0F] rounded-lg flex items-center justify-center text-xl">🔌</div>
               <span className="text-[10px] uppercase font-bold text-gray-500 bg-white/5 px-2 py-1 rounded">{plugin.category}</span>
            </div>
            <h3 className="text-lg font-bold mb-2 group-hover:text-[#00FF88] transition-colors">{plugin.name}</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">{plugin.desc}</p>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-1 text-xs text-yellow-500/80">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  {plugin.stars}
               </div>
               <button className="text-xs font-bold text-[#00FF88] hover:underline">安装插件</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PluginMarket;
