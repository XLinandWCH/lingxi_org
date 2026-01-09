
import React, { useState } from 'react';
import { BlogPost, PricingPlan } from '../types';
import { GLOBAL_CONFIG, TESTIMONIALS } from '../constants';

interface AdminDashboardProps {
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  plans: PricingPlan[];
  setPlans: React.Dispatch<React.SetStateAction<PricingPlan[]>>;
  siteLogo: string;
  setSiteLogo: (url: string) => void;
  heroScreenshot: string;
  setHeroScreenshot: (url: string) => void;
  videoLink: string;
  setVideoLink: (url: string) => void;
  quickStartDoc: string;
  setQuickStartDoc: (val: string) => void;
  winX64: string; setWinX64: (v: string) => void;
  winArm64: string; setWinArm64: (v: string) => void;
  macOS: string; setMacOS: (v: string) => void;
  linux: string; setLinux: (v: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  blogs, setBlogs, plans, setPlans, 
  siteLogo, setSiteLogo, heroScreenshot, setHeroScreenshot,
  videoLink, setVideoLink, quickStartDoc, setQuickStartDoc,
  winX64, setWinX64, winArm64, setWinArm64, macOS, setMacOS, linux, setLinux
}) => {
  const [activeTab, setActiveTab] = useState<'branding' | 'content' | 'pricing' | 'deploy'>('branding');
  const [editingDoc, setEditingDoc] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Blog Editor State
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentContent, setCurrentContent] = useState('');
  const [currentCoverImage, setCurrentCoverImage] = useState('');
  const [tags, setTags] = useState<string[]>(['公告']);

  const tabs = [
    { id: 'branding', label: '品牌资源' },
    { id: 'blog', label: '博文发布', isBlog: true },
    { id: 'doc', label: '文档管理', isDoc: true },
    { id: 'pricing', label: '定价策略' },
    { id: 'deploy', label: '全球发布' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleMarkdownFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') setCurrentContent(text);
      };
      reader.readAsText(file);
    }
  };

  const clearPreviewCache = () => {
    if (confirm('确定要清除预览缓存吗？清除后，本页面将恢复到您 GitHub 上目前已发布的状态。')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const generateDeployCode = () => {
    return `
import React from 'react';
import { BlogPost } from './types';

export const GLOBAL_CONFIG = {
  siteName: "灵析",
  siteSubName: "LingXi",
  logo: "${siteLogo}",
  heroImage: "${heroScreenshot}",
  videoLink: "${videoLink}",
  githubRepo: "https://github.com/XLinandWCH/lingxi_org",
  downloadLinks: {
    winX64: "${winX64}",
    winArm64: "${winArm64}",
    macOS: "${macOS}",
    linux: "${linux}"
  },
  quickStartDoc: \`${quickStartDoc.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
  plans: ${JSON.stringify(plans, null, 2)},
  blogs: ${JSON.stringify(blogs, null, 2)} as BlogPost[]
};

export const COLORS = {
  bg: '#0A0A0F',
  primary: '#00FF88',
  primaryHover: '#10B981',
  secondary: '#8B5CF6',
  surface: '#1F2937',
  border: 'rgba(255, 255, 255, 0.05)',
  textMain: '#FFFFFF',
  textSecondary: '#D1D5DB',
  textMuted: 'rgba(255, 255, 255, 0.4)',
};

export const TESTIMONIALS = ${JSON.stringify(TESTIMONIALS, null, 2)};
    `.trim();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateDeployCode());
    alert('部署代码已复制！请到 GitHub 仓库替换 constants.tsx 文件。');
  };

  const handlePublish = () => {
    if (editingDoc) {
      setQuickStartDoc(currentContent);
      alert('文档预览已更新！请去“全球发布”同步至 GitHub 才会永久生效。');
    } else {
      if (!currentTitle || !currentContent) { alert('请填写标题和内容'); return; }
      const newBlog: BlogPost = {
        id: Date.now().toString(),
        title: currentTitle,
        excerpt: currentContent.substring(0, 100).replace(/[#*`]/g, '') + '...',
        content: currentContent,
        author: '管理员',
        date: new Date().toISOString().split('T')[0],
        tags: tags,
        type: 'markdown',
        coverImage: currentCoverImage
      };
      setBlogs([newBlog, ...blogs]);
      alert('已添加到本地预览库！请去“全球发布”同步至 GitHub 才会永久生效。');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-[#0A0A0F]">
      {/* 手机端顶部条 */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0D0D12] border-b border-white/5 sticky top-0 z-[60]">
        <span className="font-black text-[#00FF88] tracking-tighter">灵析控制台</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white">
           {isSidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* 侧边导航 */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-[#0D0D12] p-6 transition-transform duration-300 md:translate-x-0 md:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="hidden md:block font-black text-xl tracking-tighter text-white mb-12">灵析控制台</div>

        <nav className="space-y-4">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => {
                if (tab.isBlog) { setActiveTab('content'); setEditingDoc(false); setCurrentContent(''); }
                else if (tab.isDoc) { setActiveTab('content'); setEditingDoc(true); setCurrentContent(quickStartDoc); }
                else { setActiveTab(tab.id as any); }
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center px-5 py-3.5 rounded-2xl transition-all text-sm font-bold ${
                (activeTab === tab.id || (tab.isBlog && activeTab === 'content' && !editingDoc) || (tab.isDoc && activeTab === 'content' && editingDoc)) 
                ? (tab.id === 'deploy' ? 'bg-white text-black' : 'bg-[#00FF88] text-[#0A0A0F]') 
                : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-10 border-t border-white/5 space-y-4">
           <button onClick={clearPreviewCache} className="w-full text-left px-5 text-[10px] font-black text-red-500/50 uppercase tracking-widest hover:text-red-500 transition-colors">
             清除预览缓存
           </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto w-full">
        {activeTab === 'deploy' && (
           <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4">
             <div className="bg-[#1F2937]/20 border border-white/5 rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-white"></div>
               <h2 className="text-3xl font-black mb-6 tracking-tight text-white">全球发布</h2>
               <p className="text-sm md:text-base text-gray-400 mb-10 leading-relaxed">
                 当前站点运行在“预览模式”。手机端或其他访客看不到您的本地修改。<br/>
                 要使更改全球生效，请复制下方代码，替换项目源码中的 <code className="text-[#00FF88] font-mono">constants.tsx</code> 并推送到 GitHub。
               </p>
               <div className="relative group">
                  <pre className="bg-black/60 p-6 rounded-2xl border border-white/10 text-[9px] text-gray-400 overflow-x-auto h-80 font-mono leading-loose">
                    {generateDeployCode()}
                  </pre>
                  <button 
                    onClick={copyToClipboard} 
                    className="absolute top-4 right-4 bg-white text-black px-6 py-2 rounded-xl text-[10px] font-black hover:scale-105 transition-all shadow-2xl"
                  >
                    复制配置代码
                  </button>
               </div>
               <div className="mt-8 bg-[#00FF88]/5 border border-[#00FF88]/20 p-6 rounded-2xl">
                 <h4 className="text-[#00FF88] font-black text-xs uppercase tracking-widest mb-2">部署提示</h4>
                 <p className="text-[10px] text-gray-500">如果替换后手机端仍未更新，请尝试在手机浏览器中强制刷新页面，或等待 1-2 分钟 CDN 全球同步。</p>
               </div>
             </div>
           </div>
        )}

        {activeTab === 'content' && (
          <div className="flex flex-col h-full bg-[#0D0D12] border border-white/5 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex flex-col md:flex-row h-full">
               <div className="hidden md:flex w-80 border-r border-white/5 p-8 bg-[#0A0A0F]/60 flex-col gap-8">
                  <h3 className="text-xs font-black text-gray-600 uppercase tracking-widest">{editingDoc ? '文档设置' : '博文详情'}</h3>
                  {!editingDoc && (
                    <div className="space-y-4">
                      <div className="aspect-video bg-black/40 rounded-2xl border border-white/5 overflow-hidden flex flex-col items-center justify-center group relative">
                        {currentCoverImage ? <img src={currentCoverImage} className="w-full h-full object-cover" /> : <span className="text-[10px] text-gray-600">无封面图</span>}
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                          <span className="text-xs font-bold text-[#00FF88]">更换封面</span>
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setCurrentCoverImage)} />
                        </label>
                      </div>
                    </div>
                  )}
                  <label className="w-full h-12 rounded-xl border border-dashed border-white/10 bg-white/5 flex items-center justify-center cursor-pointer text-xs text-gray-400 font-bold hover:bg-white/10 transition-colors">
                    导入 MD 正文
                    <input type="file" className="hidden" accept=".md" onChange={handleMarkdownFileUpload} />
                  </label>
               </div>

               <div className="flex-grow flex flex-col min-h-[600px]">
                  <div className="h-16 border-b border-white/5 px-6 flex items-center justify-between bg-black/20">
                     <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{editingDoc ? '编辑：快速开始文档' : '草稿编辑'}</span>
                     <button onClick={handlePublish} className="bg-[#00FF88] text-[#0A0A0F] px-8 py-2 rounded-xl text-[10px] font-black shadow-lg">更新预览库</button>
                  </div>
                  <div className="p-6 md:p-12 overflow-y-auto flex-grow flex flex-col">
                     {!editingDoc && <input value={currentTitle} onChange={e => setCurrentTitle(e.target.value)} className="w-full bg-transparent text-3xl md:text-5xl font-black mb-8 text-white outline-none placeholder:text-white/5" placeholder="在此输入文章标题..." />}
                     <textarea value={currentContent} onChange={e => setCurrentContent(e.target.value)} className="w-full flex-grow bg-transparent text-sm md:text-lg leading-relaxed text-gray-400 resize-none font-mono outline-none" placeholder="支持 Markdown 语法..." />
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'branding' && (
          <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4">
             <div className="bg-[#1F2937]/20 border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl">
               <h2 className="text-2xl md:text-3xl font-black mb-10 text-white tracking-tight">品牌资产与视觉</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 flex flex-col items-center gap-6">
                     <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">网站 Logo (Header)</span>
                     <img src={siteLogo} className="w-24 h-24 rounded-2xl object-contain bg-black border border-white/10 p-2" />
                     <label className="cursor-pointer bg-[#00FF88] text-[#0A0A0F] px-6 py-2.5 rounded-xl text-[10px] font-black hover:scale-105 transition-all">
                        上传新 Logo
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setSiteLogo)} />
                     </label>
                  </div>
                  <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 flex flex-col items-center gap-6">
                     <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Hero 核心产品图</span>
                     <img src={heroScreenshot} className="w-full aspect-video rounded-2xl object-cover bg-black border border-white/10" />
                     <label className="cursor-pointer bg-[#00FF88] text-[#0A0A0F] px-6 py-2.5 rounded-xl text-[10px] font-black hover:scale-105 transition-all">
                        更换产品图
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setHeroScreenshot)} />
                     </label>
                  </div>
               </div>
             </div>
          </div>
        )}

        {activeTab === 'pricing' && (
           <div className="max-w-4xl bg-[#1F2937]/20 border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl md:text-3xl font-black mb-10 text-white tracking-tight">定价管理</h2>
              <div className="space-y-4">
                 {plans.map((p, i) => (
                    <div key={i} className="flex items-center justify-between gap-6 p-6 bg-black/40 rounded-[1.5rem] border border-white/5">
                       <div className="font-bold text-white text-lg">{p.name}</div>
                       <input 
                         type="text" 
                         value={p.price} 
                         onChange={e => {
                           const newPlans = [...plans];
                           newPlans[i] = { ...newPlans[i], price: e.target.value };
                           setPlans(newPlans);
                         }}
                         className="bg-black/50 border border-white/10 rounded-xl px-6 py-3 text-sm text-white focus:border-[#00FF88] outline-none text-right font-bold"
                       />
                    </div>
                 ))}
              </div>
           </div>
        )}
      </main>

      {/* 手机端侧边栏蒙层 */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
    </div>
  );
};

export default AdminDashboard;
