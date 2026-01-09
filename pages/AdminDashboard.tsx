
import React, { useState } from 'react';
import { BlogPost, PricingPlan } from '../types';

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

  // Blog Editor State
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentContent, setCurrentContent] = useState('');
  const [currentCoverImage, setCurrentCoverImage] = useState('');
  const [tags, setTags] = useState<string[]>(['公告']);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMarkdownFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          setCurrentContent(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const generateDeployCode = () => {
    // 关键：将当前所有的 blogs 数据序列化到代码中
    const code = `
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

export const TESTIMONIALS = [
  { name: "张明", role: "全栈工程师", text: "灵析的本地 RAG 速度快得惊人，完全解决了我对隐私的顾虑。" },
  { name: "夏敏", role: "AI 研究员", text: "Artifacts 协议的实现非常超前，现在我的所有原型设计都在这里完成。" },
  { name: "赵明泽", role: "企业 CTO", text: "私有化部署的首选方案，安全审计和权限控制做得很到位。" },
  { name: "Wu Xing", role: "开源贡献者", text: "The MCP implementation is the cleanest I've ever seen. Highly extensible." },
  { name: "Sarah Jenkins", role: "Lead Dev @ TechFlow", text: "终于有一款尊重开发者工作流和数据主权的 AI 工作站了。" },
  { name: "Hiroshi Tanaka", role: "软件架构师", text: "本地推理延迟几乎为零，灵析改变了我的开发习惯。" },
  { name: "Elena Rossi", role: "UI 设计师", text: "这种设计感与技术实力的结合，简直是数字时代的艺术品。" },
];
    `.trim();
    return code;
  };

  const copyToClipboard = () => {
    const code = generateDeployCode();
    navigator.clipboard.writeText(code);
    alert('部署代码已复制！此代码已包含您刚刚上传的所有图片Base64和博客内容。请将其粘贴到 constants.tsx 并提交 GitHub 即可全球发布。');
  };

  const handlePublish = () => {
    if (editingDoc) {
      setQuickStartDoc(currentContent);
      alert('文档预览已更新！');
    } else {
      if (!currentTitle || !currentContent) {
        alert('请至少填写标题和内容');
        return;
      }
      const newBlog: BlogPost = {
        id: Date.now().toString(),
        title: currentTitle,
        excerpt: currentContent.substring(0, 100).replace(/[#*`]/g, '') + '...',
        content: currentContent,
        author: '管理员',
        date: new Date().toISOString().split('T')[0],
        tags: tags,
        type: 'markdown',
        coverImage: currentCoverImage // 存储 Base64
      };
      setBlogs([newBlog, ...blogs]);
      setCurrentTitle('');
      setCurrentContent('');
      setCurrentCoverImage('');
      alert('博文已添加到“预览库”！如需全球可见，请去“全球发布”页复制总配置。');
    }
  };

  const handleUpdatePrice = (index: number, newPrice: string) => {
    const updatedPlans = [...plans];
    updatedPlans[index] = { ...updatedPlans[index], price: newPrice };
    setPlans(updatedPlans);
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-[#0A0A0F]">
      <aside className="w-64 border-r border-white/5 bg-[#0D0D12] flex flex-col p-6">
        <div className="font-black text-xl tracking-tighter mb-12 text-white">灵析控制台</div>

        <nav className="space-y-4 flex-grow">
          <button 
            onClick={() => setActiveTab('branding')}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all text-sm font-bold ${activeTab === 'branding' ? 'bg-[#00FF88] text-[#0A0A0F]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            品牌资源
          </button>
          <button 
            onClick={() => { setActiveTab('content'); setEditingDoc(false); setCurrentContent(''); }}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all text-sm font-bold ${activeTab === 'content' && !editingDoc ? 'bg-[#00FF88] text-[#0A0A0F]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            博文发布 (MD)
          </button>
          <button 
            onClick={() => { setActiveTab('content'); setEditingDoc(true); setCurrentContent(quickStartDoc); }}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all text-sm font-bold ${activeTab === 'content' && editingDoc ? 'bg-[#00FF88] text-[#0A0A0F]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            文档管理
          </button>
          <button 
            onClick={() => setActiveTab('pricing')}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all text-sm font-bold ${activeTab === 'pricing' ? 'bg-[#00FF88] text-[#0A0A0F]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            定价策略
          </button>
          <button 
            onClick={() => setActiveTab('deploy')}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all text-sm font-bold ${activeTab === 'deploy' ? 'bg-white text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            全球发布
          </button>
        </nav>
      </aside>

      <main className="flex-grow p-12 overflow-y-auto">
        {activeTab === 'deploy' && (
           <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-[#1F2937]/20 border border-white/5 rounded-[2.5rem] p-12 shadow-2xl">
               <h2 className="text-3xl font-black mb-6 tracking-tight text-white">全球发布中心</h2>
               <p className="text-gray-400 mb-10 leading-relaxed">
                 由于本站点目前采用静态构建，请复制下方生成的完整配置代码。将代码粘贴并替换到项目源码中的 <code className="text-white">constants.tsx</code> 文件。提交至 GitHub 后，您的博客文章、文档、封面图都将全球实时更新。
               </p>
               
               <div className="relative group">
                  <pre className="bg-black/60 p-8 rounded-3xl border border-white/10 text-[10px] text-gray-400 overflow-x-auto h-80 font-mono leading-loose">
                    {generateDeployCode()}
                  </pre>
                  <button 
                    onClick={copyToClipboard}
                    className="absolute top-4 right-4 bg-[#00FF88] text-[#0A0A0F] px-6 py-2 rounded-xl text-xs font-black shadow-lg hover:scale-105 transition-all"
                  >
                    复制并发布到生产环境
                  </button>
               </div>
             </div>
           </div>
        )}

        {activeTab === 'content' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[800px]">
             <div className="flex bg-[#0D0D12] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[800px]">
                <div className="w-80 border-r border-white/5 p-8 bg-[#0A0A0F]/60 flex flex-col gap-8">
                   <h3 className="text-xs font-black text-gray-600 uppercase tracking-widest">{editingDoc ? '文档设置' : '博文发布详情'}</h3>
                   
                   {!editingDoc && (
                     <div className="space-y-4">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">文章封面 (自动持久化)</label>
                        <div className="aspect-video bg-black/40 rounded-2xl border border-white/5 overflow-hidden flex flex-col items-center justify-center relative">
                          {currentCoverImage ? (
                            <img src={currentCoverImage} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] text-gray-600">未选择封面</span>
                          )}
                          <label className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 bg-black/60 transition-opacity">
                            <span className="text-xs font-bold text-white">选择本地图片</span>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setCurrentCoverImage)} />
                          </label>
                        </div>
                        <p className="text-[9px] text-gray-600">图片将以 Base64 嵌入源码，发布后全国可见，永不掉图。</p>
                      </div>
                   )}

                   <div className="space-y-4">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        {editingDoc ? '上传文档 .md' : '导入正文 .md'}
                      </label>
                      <label className="flex items-center justify-center w-full h-12 rounded-xl border border-dashed border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-all">
                         <span className="text-xs font-bold text-gray-400">选择 Markdown 文件</span>
                         <input type="file" className="hidden" accept=".md" onChange={handleMarkdownFileUpload} />
                      </label>
                   </div>

                   {!editingDoc && (
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">标签</label>
                        <input 
                          type="text" 
                          placeholder="例如: 技术, 发布" 
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none"
                          onChange={(e) => setTags(e.target.value.split(',').map(s => s.trim()))}
                        />
                      </div>
                   )}
                </div>

                <div className="flex-grow flex flex-col bg-black/10">
                   <div className="h-20 border-b border-white/5 px-10 flex items-center justify-between bg-black/20">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{editingDoc ? '正在编辑：快速开始文档' : '编写博文'}</span>
                      <button 
                        onClick={handlePublish}
                        className="bg-[#00FF88] text-[#0A0A0F] px-10 py-2.5 rounded-2xl text-xs font-black shadow-xl hover:scale-105 transition-all"
                      >
                         {editingDoc ? '更新文档内容' : '添加到预览库'}
                      </button>
                   </div>
                   <div className="flex-grow p-12 overflow-y-auto">
                      {!editingDoc && (
                         <input 
                           value={currentTitle}
                           onChange={e => setCurrentTitle(e.target.value)}
                           className="w-full bg-transparent border-none outline-none text-4xl font-black mb-8 placeholder:text-gray-800 text-white"
                           placeholder="输入文章标题..."
                         />
                      )}
                      <textarea 
                         value={currentContent}
                         onChange={e => setCurrentContent(e.target.value)}
                         className="w-full bg-transparent border-none outline-none text-lg leading-relaxed text-gray-400 resize-none min-h-[600px] font-mono"
                         placeholder="支持 Markdown 语法。如果您在本地插入了图片，请确保发布时手动将 Markdown 中的路径替换为线上地址，或者使用顶部的封面上传功能。"
                      />
                   </div>
                </div>
             </div>
          </div>
        )}
        
        {/* 其他 Tab 保持原有结构... */}
        {activeTab === 'branding' && (
          <div className="max-w-5xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <section className="bg-[#1F2937]/20 border border-white/5 rounded-[2.5rem] p-12 shadow-2xl">
               <h2 className="text-3xl font-black mb-10 tracking-tight text-white">品牌视觉资产</h2>
               <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Logo (Base64)</label>
                     <div className="flex items-center gap-6 bg-black/40 p-6 rounded-3xl border border-white/5">
                        <img src={siteLogo} className="w-20 h-20 rounded-2xl object-contain bg-black border border-white/10" />
                        <label className="cursor-pointer bg-[#00FF88] text-[#0A0A0F] px-6 py-2.5 rounded-xl text-xs font-black hover:bg-[#10B981] transition-all">
                          上传新 Logo
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setSiteLogo)} />
                        </label>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Hero 展示图</label>
                     <div className="flex items-center gap-6 bg-black/40 p-6 rounded-3xl border border-white/5">
                        <img src={heroScreenshot} className="w-20 h-20 rounded-2xl object-cover bg-black border border-white/10" />
                        <label className="cursor-pointer bg-[#00FF88] text-[#0A0A0F] px-6 py-2.5 rounded-xl text-xs font-black hover:bg-[#10B981] transition-all">
                          上传新截图
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setHeroScreenshot)} />
                        </label>
                     </div>
                  </div>
               </div>
             </section>
          </div>
        )}

        {activeTab === 'pricing' && (
           <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="bg-[#1F2937]/20 border border-white/5 rounded-[2.5rem] p-12 shadow-2xl">
                 <h2 className="text-3xl font-black mb-12 tracking-tight text-white">定价预览管理</h2>
                 <div className="space-y-12">
                    {plans.map((p, i) => (
                       <div key={i} className="flex items-center justify-between border-b border-white/5 pb-10">
                          <div className="font-bold text-xl text-white">{p.name}</div>
                          <input 
                            type="text" 
                            value={p.price} 
                            onChange={e => handleUpdatePrice(i, e.target.value)}
                            className="bg-black/50 border border-white/10 rounded-xl px-6 py-3 text-sm text-white focus:border-[#00FF88] outline-none"
                          />
                       </div>
                    ))}
                 </div>
              </section>
           </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
