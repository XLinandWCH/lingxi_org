
import React from 'react';

interface FooterProps {
  logo: string;
}

const Footer: React.FC<FooterProps> = ({ logo }) => {
  return (
    <footer className="bg-[#0A0A0F] border-t border-white/5 py-24 mt-0">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-16">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-4 mb-8">
            <img src={logo} className="w-10 h-10 rounded-xl object-contain bg-black/40 border border-white/10" />
            <span className="text-2xl font-black tracking-tight">灵析 <span className="text-white/40">LingXi</span></span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-xs">
            致力打造最懂开发者的私有化 AI 智能体工作站。<br/>
            隐私无忧，扩展无限。
          </p>
          <div className="flex gap-6">
             <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#00FF88]/20 transition-all cursor-pointer font-bold text-gray-400">GH</div>
             <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#8B5CF6]/20 transition-all cursor-pointer font-bold text-gray-400">DC</div>
          </div>
        </div>

        <div>
          <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-white">产品生态</h4>
          <ul className="space-y-5 text-sm font-medium text-gray-500">
            <li className="hover:text-[#00FF88] transition-colors cursor-pointer">桌面客户端</li>
            <li className="hover:text-[#00FF88] transition-colors cursor-pointer">MCP 开放协议</li>
            <li className="hover:text-[#00FF88] transition-colors cursor-pointer">Artifacts 预览</li>
            <li className="hover:text-[#00FF88] transition-colors cursor-pointer">路线图</li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-white">开发者资源</h4>
          <ul className="space-y-5 text-sm font-medium text-gray-500">
            <li className="hover:text-[#00FF88] transition-colors cursor-pointer">文档中心</li>
            <li className="hover:text-[#00FF88] transition-colors cursor-pointer">API Reference</li>
            <li className="hover:text-[#00FF88] transition-colors cursor-pointer">插件开发指南</li>
            <li className="hover:text-[#00FF88] transition-colors cursor-pointer">GitHub Discussions</li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-white">安全与合规</h4>
          <ul className="space-y-5 text-sm font-medium text-gray-500">
            <li className="hover:text-[#00FF88] transition-colors cursor-pointer">隐私政策</li>
            <li className="hover:text-[#00FF88] transition-colors cursor-pointer">服务条款</li>
            <li className="hover:text-[#00FF88] transition-colors cursor-pointer">数据脱敏规范</li>
            <li className="hover:text-[#00FF88] transition-colors cursor-pointer">开源许可声明</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
        <p>© 2024 LINGXI WORKSTATION (OPENLINGXI TEAM). NO RIGHTS RESERVED ON YOUR DATA.</p>
        <p>POWERED BY PRIVACY-FIRST TECHNOLOGY</p>
      </div>
    </footer>
  );
};

export default Footer;
