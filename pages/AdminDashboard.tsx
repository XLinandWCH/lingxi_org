import React, { useState } from 'react';
import { BlogPost, PricingPlan } from '../types';
// Import GLOBAL_CONFIG and TESTIMONIALS from constants to fix the missing reference error
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

// Fix: Use imported TESTIMONIALS instead of undefined GLOBAL_CONFIG reference
export const TESTIMONIALS = ${JSON.stringify(TESTIMONIALS, null, 2)};
    `.trim();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateDeployCode());
    alert('部署代码已复制！');
  };

  const handlePublish = () => {
    if (editingDoc) {
      setQuickStartDoc(currentContent);
      alert('文档已更新！');
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
      alert('已添加到预览库！');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-[#0A0A0F]">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0D0D12] border-b border-white/5">
        <span className="font-bold text-white">后台管理</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-[#0D0D12] p-6 transition-transform md:translate-x-0 md:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-12">
          <div className="font-black text-xl tracking-tighter text-white">灵析控制台</div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500">✕</button>
        </div>

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
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-12 overflow-y-auto w-full">
        {activeTab === 'deploy' && (
           <div className="max-w-4xl">
             <div className="bg-[#1F2937]/20 border border-white/5 rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl">
               <h2 className="text-2xl md:text-3xl font-black mb-6 tracking-tight text-white">全球发布</h2>
               <p className="text-sm md:text-base text-gray-400 mb-8 leading-relaxed">请将生成的配置覆盖到源码的 <code className="text-white">constants.tsx</code> 并提交 GitHub。</p>
               <div className="relative">
                  <pre className="bg-black/60 p-6 rounded-2xl border border-white/10 text-[9px] text-gray-400 overflow-x-auto h-64 font-mono">{generateDeployCode()}</pre>
                  <button onClick={copyToClipboard} className="mt-4 w-full bg-[#00FF88] text-[#0A0A0F] py-3 rounded-xl text-sm font-black">复制配置代码</button>
               </div>
             </div>
           </div>
        )}

        {activeTab === 'content' && (
          <div className="flex flex-col h-full bg-[#0D0D12] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row h-full">
               <div className="hidden md:flex w-80 border-r border-white/5 p-8 bg-[#0A0A0F]/60 flex-col gap-8">
                  <h3 className="text-xs font-black text-gray-600 uppercase tracking-widest">{editingDoc ? '文档设置' : '博文详情'}</h3>
                  {!editingDoc && (
                    <div className="space-y-4">
                      <div className="aspect-video bg-black/40 rounded-2xl border border-white/5 overflow-hidden flex flex-col items-center justify-center">
                        {currentCoverImage ? <img src={currentCoverImage} className="w-full h-full object-cover" /> : <span className="text-[10px] text-gray-600">无封面图</span>}
                        <label className="cursor-pointer text-xs font-bold text-[#00FF88] mt-2 underline">
                          点击上传封面
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setCurrentCoverImage)} />
                        </label>
                      </div>
                    </div>
                  )}
                  <label className="w-full h-12 rounded-xl border border-dashed border-white/10 bg-white/5 flex items-center justify-center cursor-pointer text-xs text-gray-400 font-bold hover:bg-white/10">
                    导入 MD 文件
                    <input type="file" className="hidden" accept=".md" onChange={handleMarkdownFileUpload} />
                  </label>
               </div>

               <div className="flex-grow flex flex-col min-h-[500px]">
                  <div className="h-16 border-b border-white/5 px-6 flex items-center justify-between bg-black/20">
                     <span className="text-xs font-bold text-gray-500 uppercase">{editingDoc ? '编辑文档' : '编写博文'}</span>
                     <button onClick={handlePublish} className="bg-[#00FF88] text-[#0A0A0F] px-6 py-2 rounded-xl text-xs font-black">发布预览</button>
                  </div>
                  <div className="p-6 md:p-12 overflow-y-auto flex-grow flex flex-col">
                     {!editingDoc && <input value={currentTitle} onChange={e => setCurrentTitle(e.target.value)} className="w-full bg-transparent text-2xl md:text-4xl font-black mb-6 text-white outline-none" placeholder="文章标题..." />}
                     <textarea value={currentContent} onChange={e => setCurrentContent(e.target.value)} className="w-full flex-grow bg-transparent text-sm md:text-lg leading-relaxed text-gray-400 resize-none font-mono outline-none" placeholder="输入 Markdown 内容..." />
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Branding Tab */}
        {activeTab === 'branding' && (
          <div className="max-w-4xl space-y-6">
             <div className="bg-[#1F2937]/20 border border-white/5 rounded-3xl p-6 md:p-12">
               <h2 className="text-2xl font-black mb-8 text-white tracking-tight">品牌资产</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="bg-black/40 p-6 rounded-2xl border border-white/5 flex flex-col items-center gap-4">
                     <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Logo</span>
                     <img src={siteLogo} className="w-16 h-16 rounded-xl object-contain bg-black border border-white/5" />
                     <label className="cursor-pointer bg-[#00FF88] text-[#0A0A0F] px-4 py-2 rounded-lg text-xs font-black">
                        更换 Logo
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setSiteLogo)} />
                     </label>
                  </div>
                  <div className="bg-black/40 p-6 rounded-2xl border border-white/5 flex flex-col items-center gap-4">
                     <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Hero 截图</span>
                     <img src={heroScreenshot} className="w-full aspect-video rounded-xl object-cover bg-black border border-white/5" />
                     <label className="cursor-pointer bg-[#00FF88] text-[#0A0A0F] px-4 py-2 rounded-lg text-xs font-black">
                        更换截图
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setHeroScreenshot)} />
                     </label>
                  </div>
               </div>
             </div>
          </div>
        )}

        {activeTab === 'pricing' && (
           <div className="max-w-4xl bg-[#1F2937]/20 border border-white/5 rounded-3xl p-6 md:p-12">
              <h2 className="text-2xl font-black mb-8 text-white tracking-tight">定价管理</h2>
              <div className="space-y-6">
                 {plans.map((p, i) => (
                    <div key={i} className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-black/40 rounded-2xl">
                       <div className="font-bold text-white">{p.name}</div>
                       <input 
                         type="text" 
                         value={p.price} 
                         onChange={e => {
                           const newPlans = [...plans];
                           newPlans[i] = { ...newPlans[i], price: e.target.value };
                           setPlans(newPlans);
                         }}
                         className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-[#00FF88] outline-none w-full sm:w-auto text-center"
                       />
                    </div>
                 ))}
              </div>
           </div>
        )}
      </main>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
    </div>
  );
};

export default AdminDashboard;