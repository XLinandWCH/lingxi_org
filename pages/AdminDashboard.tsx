
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

  // Editor State
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentContent, setCurrentContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);

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

  const generateDeployCode = () => {
    const code = `
import React from 'react';

export const GLOBAL_CONFIG = {
  siteName: "灵析",
  siteSubName: "LingXi",
  logo: "${siteLogo}",
  heroImage: "${heroScreenshot}",
  videoLink: "${videoLink}",
  downloadLinks: {
    winX64: "${winX64}",
    winArm64: "${winArm64}",
    macOS: "${macOS}",
    linux: "${linux}"
  },
  quickStartDoc: \`${quickStartDoc}\`,
  plans: ${JSON.stringify(plans, null, 2)}
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
  { name: "Sarah Jenkins", role: "Lead Dev @ TechFlow", text: "终于有一款尊重开发者工作流 and 数据主权的 AI 工作站了。" },
  { name: "Hiroshi Tanaka", role: "软件架构师", text: "本地推理延迟几乎为零，灵析改变了我的开发习惯。" },
  { name: "Elena Rossi", role: "UI 设计师", text: "这种设计感与技术实力的结合，简直是数字时代的艺术品。" },
];
    `.trim();
    return code;
  };

  const copyToClipboard = () => {
    const code = generateDeployCode();
    navigator.clipboard.writeText(code);
    alert('代码已复制！请粘贴到 constants.tsx 文件并提交 GitHub 即可全球发布。');
  };

  const handlePublish = () => {
    if (editingDoc) {
      setQuickStartDoc(currentContent);
      alert('文档预览已更新！');
    } else {
      if (!currentTitle || !currentContent) {
        alert('请完整填写标题和内容');
        return;
      }
      const newBlog: BlogPost = {
        id: Date.now().toString(),
        title: currentTitle,
        excerpt: currentContent.substring(0, 100) + '...',
        content: currentContent,
        author: '管理员',
        date: new Date().toISOString().split('T')[0],
        tags: tags,
        type: 'markdown'
      };
      setBlogs([newBlog, ...blogs]);
      setCurrentTitle('');
      setCurrentContent('');
      alert('博客预览已更新！');
    }
  };

  const handleUpdatePrice = (index: number, newPrice: string) => {
    const updatedPlans = [...plans];
    updatedPlans[index] = { ...updatedPlans[index], price: newPrice };
    setPlans(updatedPlans);
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-[#0A0A0F]">
      {/* 侧边导航栏 */}
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
            onClick={() => { setActiveTab('content'); setEditingDoc(false); }}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all text-sm font-bold ${activeTab === 'content' && !editingDoc ? 'bg-[#00FF88] text-[#0A0A0F]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            博文管理
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
            🚀 全球发布
          </button>
        </nav>
      </aside>

      {/* 主工作区 */}
      <main className="flex-grow p-12 overflow-y-auto">
        {activeTab === 'deploy' && (
           <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-[#1F2937]/20 border border-white/5 rounded-[2.5rem] p-12 shadow-2xl">
               <h2 className="text-3xl font-black mb-6 tracking-tight text-white">全球发布中心</h2>
               <p className="text-gray-400 mb-10 leading-relaxed">
                 因为您使用的是静态部署 (Cloudflare Pages)，实时修改仅对您当前浏览器生效。
                 如需更新全球所有用户的访问内容，请点击下方按钮复制配置，并覆盖项目中的 <code className="text-[#00FF88]">constants.tsx</code> 文件。
               </p>
               
               <div className="relative group">
                  <pre className="bg-black/60 p-8 rounded-3xl border border-white/10 text-xs text-gray-400 overflow-x-auto h-64 font-mono leading-loose">
                    {generateDeployCode()}
                  </pre>
                  <button 
                    onClick={copyToClipboard}
                    className="absolute top-4 right-4 bg-[#00FF88] text-[#0A0A0F] px-6 py-2 rounded-xl text-xs font-black shadow-lg hover:scale-105 transition-all"
                  >
                    一键复制部署代码
                  </button>
               </div>

               <div className="mt-12 space-y-6">
                 <h3 className="text-white font-bold text-lg">发布步骤：</h3>
                 <ol className="text-sm text-gray-400 space-y-4 list-decimal pl-5">
                   <li>点击上方按钮复制生成的代码。</li>
                   <li>打开您本地项目根目录下的 <code className="text-white font-mono">constants.tsx</code>。</li>
                   <li>全选原来的内容并删除，粘贴刚复制的代码。</li>
                   <li>保存文件，<code className="text-white font-mono">git commit</code> 并 <code className="text-white font-mono">git push</code> 到 GitHub。</li>
                   <li>Cloudflare 会在 2 分钟内自动重构并更新全球网站。</li>
                 </ol>
               </div>
             </div>
           </div>
        )}

        {activeTab === 'branding' && (
          <div className="max-w-5xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <section className="bg-[#1F2937]/20 border border-white/5 rounded-[2.5rem] p-12 shadow-2xl">
               <h2 className="text-3xl font-black mb-10 tracking-tight text-white">外观与下载配置</h2>
               <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Logo (支持上传预览)</label>
                     <div className="flex items-center gap-6 bg-black/40 p-6 rounded-3xl border border-white/5">
                        <img src={siteLogo} className="w-20 h-20 rounded-2xl object-contain bg-black border border-white/10" />
                        <label className="cursor-pointer bg-[#00FF88] text-[#0A0A0F] px-6 py-2.5 rounded-xl text-xs font-black hover:bg-[#10B981] transition-all">
                          预览新 Logo
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setSiteLogo)} />
                        </label>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">预览图 (支持上传预览)</label>
                     <div className="flex items-center gap-6 bg-black/40 p-6 rounded-3xl border border-white/5">
                        <img src={heroScreenshot} className="w-20 h-20 rounded-2xl object-cover bg-black border border-white/10" />
                        <label className="cursor-pointer bg-[#00FF88] text-[#0A0A0F] px-6 py-2.5 rounded-xl text-xs font-black hover:bg-[#10B981] transition-all">
                          预览大图
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setHeroScreenshot)} />
                        </label>
                     </div>
                  </div>
               </div>

               <div className="mt-12 space-y-8">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-white/5 pb-4">客户端下载地址</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] text-gray-600 font-bold tracking-widest">Windows x64 URL</label>
                        <input value={winX64} onChange={e => setWinX64(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-[#00FF88] text-sm text-gray-300" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] text-gray-600 font-bold tracking-widest">macOS Silicon URL</label>
                        <input value={macOS} onChange={e => setMacOS(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-[#00FF88] text-sm text-gray-300" />
                     </div>
                  </div>
               </div>
             </section>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[800px]">
             <div className="flex bg-[#0D0D12] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl h-full">
                <div className="w-72 border-r border-white/5 p-8 bg-[#0A0A0F]/60 flex flex-col">
                   <h3 className="text-xs font-black text-gray-600 uppercase tracking-widest mb-10">编辑项</h3>
                   <div className="space-y-4">
                      <div className="p-5 bg-[#00FF88]/5 border border-[#00FF88]/20 rounded-2xl">
                         <div className="text-sm font-bold text-[#00FF88] truncate">{editingDoc ? '快速开始指南' : (currentTitle || '新博文')}</div>
                      </div>
                   </div>
                </div>

                <div className="flex-grow flex flex-col bg-black/10">
                   <div className="h-20 border-b border-white/5 px-10 flex items-center justify-between">
                      <button 
                        onClick={handlePublish}
                        className="bg-[#00FF88] text-[#0A0A0F] px-12 py-2.5 rounded-2xl text-xs font-black shadow-xl"
                      >
                         保存预览
                      </button>
                   </div>
                   <div className="flex-grow p-20 overflow-y-auto">
                      {!editingDoc && (
                         <input 
                           value={currentTitle}
                           onChange={e => setCurrentTitle(e.target.value)}
                           className="w-full bg-transparent border-none outline-none text-5xl font-black mb-12 placeholder:text-gray-800 text-white"
                           placeholder="标题"
                         />
                      )}
                      <textarea 
                         value={currentContent}
                         onChange={e => setCurrentContent(e.target.value)}
                         className="w-full bg-transparent border-none outline-none text-xl leading-relaxed text-gray-300 resize-none min-h-[500px]"
                         placeholder="内容..."
                      />
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'pricing' && (
           <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="bg-[#1F2937]/20 border border-white/5 rounded-[2.5rem] p-12 shadow-2xl">
                 <h2 className="text-3xl font-black mb-12 tracking-tight text-white">价格预览管理</h2>
                 <div className="space-y-12">
                    {plans.map((p, i) => (
                       <div key={i} className="flex items-center justify-between border-b border-white/5 pb-10">
                          <div className="font-bold text-xl text-white">{p.name}</div>
                          <input 
                            type="text" 
                            value={p.price} 
                            onChange={e => handleUpdatePrice(i, e.target.value)}
                            className="bg-black/50 border border-white/10 rounded-xl px-6 py-3 text-sm text-white"
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
