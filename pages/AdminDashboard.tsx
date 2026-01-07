
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
  const [activeTab, setActiveTab] = useState<'branding' | 'content' | 'pricing'>('branding');
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

  const handlePublish = () => {
    if (editingDoc) {
      setQuickStartDoc(currentContent);
      alert('文档已成功同步到官网！');
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
      alert('博客文章已发布！');
    }
  };

  // Fix: Added missing handleUpdatePrice function
  const handleUpdatePrice = (index: number, newPrice: string) => {
    const updatedPlans = [...plans];
    updatedPlans[index] = { ...updatedPlans[index], price: newPrice };
    setPlans(updatedPlans);
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-[#0A0A0F]">
      {/* 侧边导航栏 */}
      <aside className="w-64 border-r border-white/5 bg-[#0D0D12] flex flex-col p-6">
        <div className="font-black text-xl tracking-tighter mb-12 text-white">灵析后台</div>

        <nav className="space-y-4 flex-grow">
          <button 
            onClick={() => setActiveTab('branding')}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all text-sm font-bold ${activeTab === 'branding' ? 'bg-[#00FF88] text-[#0A0A0F]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
            品牌资源
          </button>
          <button 
            onClick={() => { setActiveTab('content'); setEditingDoc(false); }}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all text-sm font-bold ${activeTab === 'content' && !editingDoc ? 'bg-[#00FF88] text-[#0A0A0F]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            内容发布
          </button>
          <button 
            onClick={() => { setActiveTab('content'); setEditingDoc(true); setCurrentContent(quickStartDoc); }}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all text-sm font-bold ${activeTab === 'content' && editingDoc ? 'bg-[#00FF88] text-[#0A0A0F]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            文档管理
          </button>
          <button 
            onClick={() => setActiveTab('pricing')}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all text-sm font-bold ${activeTab === 'pricing' ? 'bg-[#00FF88] text-[#0A0A0F]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            定价策略
          </button>
        </nav>
      </aside>

      {/* 主工作区 */}
      <main className="flex-grow p-12 overflow-y-auto">
        {activeTab === 'branding' && (
          <div className="max-w-5xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <section className="bg-[#1F2937]/20 border border-white/5 rounded-[2.5rem] p-12 shadow-2xl">
               <h2 className="text-3xl font-black mb-10 tracking-tight text-white">官网资源管理</h2>
               <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">软件图标 (支持本地上传)</label>
                     <div className="flex items-center gap-6 bg-black/40 p-6 rounded-3xl border border-white/5">
                        <img src={siteLogo} className="w-20 h-20 rounded-2xl object-contain bg-black border border-white/10" />
                        <label className="cursor-pointer bg-[#00FF88] text-[#0A0A0F] px-6 py-2.5 rounded-xl text-xs font-black hover:bg-[#10B981] transition-all">
                          上传图标
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setSiteLogo)} />
                        </label>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">首页预览图 (支持本地上传)</label>
                     <div className="flex items-center gap-6 bg-black/40 p-6 rounded-3xl border border-white/5">
                        <img src={heroScreenshot} className="w-20 h-20 rounded-2xl object-cover bg-black border border-white/10" />
                        <label className="cursor-pointer bg-[#00FF88] text-[#0A0A0F] px-6 py-2.5 rounded-xl text-xs font-black hover:bg-[#10B981] transition-all">
                          上传大图
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setHeroScreenshot)} />
                        </label>
                     </div>
                  </div>
               </div>

               <div className="mt-12 space-y-8">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-white/5 pb-4">分版本下载地址配置</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] text-gray-600 font-bold tracking-widest">Windows x64</label>
                        <input value={winX64} onChange={e => setWinX64(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-[#00FF88] text-sm text-gray-300" placeholder="链接地址..." />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] text-gray-600 font-bold tracking-widest">Windows ARM64</label>
                        <input value={winArm64} onChange={e => setWinArm64(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-[#00FF88] text-sm text-gray-300" placeholder="链接地址..." />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] text-gray-600 font-bold tracking-widest">macOS Silicon</label>
                        <input value={macOS} onChange={e => setMacOS(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-[#00FF88] text-sm text-gray-300" placeholder="链接地址..." />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] text-gray-600 font-bold tracking-widest">Linux (deb)</label>
                        <input value={linux} onChange={e => setLinux(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-[#00FF88] text-sm text-gray-300" placeholder="链接地址..." />
                     </div>
                  </div>
               </div>
             </section>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-[800px]">
             <div className="flex bg-[#0D0D12] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl h-full">
                {/* 仿Ima编辑器左边栏 */}
                <div className="w-72 border-r border-white/5 p-8 bg-[#0A0A0F]/60 flex flex-col">
                   <div className="flex justify-between items-center mb-10">
                      <h3 className="text-xs font-black text-gray-600 uppercase tracking-widest">最近编辑</h3>
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                   </div>
                   <div className="space-y-4 flex-grow overflow-y-auto">
                      <div className="p-5 bg-[#00FF88]/5 border border-[#00FF88]/20 rounded-2xl cursor-pointer">
                         <div className="text-sm font-bold text-[#00FF88] truncate">{editingDoc ? '快速开始指南' : (currentTitle || '未命名博文')}</div>
                         <div className="text-[10px] text-gray-500 mt-2 font-mono">刚刚 • 正在编辑</div>
                      </div>
                   </div>
                </div>

                {/* 编辑主界面 */}
                <div className="flex-grow flex flex-col bg-black/10">
                   {/* 顶部工具栏 */}
                   <div className="h-20 border-b border-white/5 px-10 flex items-center justify-between bg-[#0D0D12]/40 backdrop-blur-sm">
                      <div className="flex items-center gap-8 text-gray-500">
                         <div className="flex gap-4">
                            <svg className="w-5 h-5 hover:text-white cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l5 5m-5-5l5-5" /></svg>
                            <svg className="w-5 h-5 hover:text-white cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 10h-10a8 8 0 00-8 8v2m18-10l-5 5m5-5l-5-5" /></svg>
                         </div>
                         <div className="w-px h-6 bg-white/5"></div>
                         <div className="flex gap-6 font-bold text-xs uppercase tracking-tighter">
                            <span className="hover:text-white cursor-pointer">B</span>
                            <span className="hover:text-white cursor-pointer italic">I</span>
                            <span className="hover:text-white cursor-pointer underline">U</span>
                            <span className="hover:text-white cursor-pointer line-through">S</span>
                         </div>
                         <div className="w-px h-6 bg-white/5"></div>
                         <div className="flex items-center gap-4">
                            <svg className="w-5 h-5 hover:text-white cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                            <label className="cursor-pointer">
                               <svg className="w-5 h-5 hover:text-white cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                               <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                  // 这里仅演示本地读取Base64，实际中可以在编辑器内插入
                                  const file = e.target.files?.[0];
                                  if(file) alert('图片已就绪，可以在内容中使用 Markdown 格式引用。');
                               }} />
                            </label>
                         </div>
                      </div>
                      <button 
                        onClick={handlePublish}
                        className="bg-[#00FF88] text-[#0A0A0F] px-12 py-2.5 rounded-2xl text-xs font-black hover:scale-105 transition-all shadow-xl shadow-[#00FF88]/10"
                      >
                         发布
                      </button>
                   </div>

                   {/* 输入区 */}
                   <div className="flex-grow p-20 overflow-y-auto">
                      {!editingDoc && (
                         <input 
                           value={currentTitle}
                           onChange={e => setCurrentTitle(e.target.value)}
                           className="w-full bg-transparent border-none outline-none text-5xl font-black mb-12 placeholder:text-gray-800 tracking-tighter text-white"
                           placeholder="请输入标题"
                         />
                      )}
                      <textarea 
                         value={currentContent}
                         onChange={e => setCurrentContent(e.target.value)}
                         className="w-full bg-transparent border-none outline-none text-xl leading-relaxed text-gray-300 placeholder:text-gray-800 resize-none min-h-[500px] font-medium"
                         placeholder="在此输入内容，支持 Markdown 渲染..."
                      />
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'pricing' && (
           <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <section className="bg-[#1F2937]/20 border border-white/5 rounded-[2.5rem] p-12 shadow-2xl">
                 <h2 className="text-3xl font-black mb-12 tracking-tight text-white">定价管理</h2>
                 <div className="space-y-12">
                    {plans.map((p, i) => (
                       <div key={i} className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/5 last:border-0 last:pb-0">
                          <div className="flex items-center gap-6">
                             <div className="w-3 h-3 rounded-full bg-[#00FF88]"></div>
                             <div className="font-bold text-xl text-white">{p.name}</div>
                          </div>
                          <div className="flex items-center gap-4">
                             <input 
                               type="text" 
                               placeholder={p.price} 
                               className="bg-black/50 border border-white/10 rounded-xl px-6 py-3 text-sm text-white outline-none focus:border-[#00FF88]"
                               onBlur={e => handleUpdatePrice(i, e.target.value || p.price)}
                             />
                             <button onClick={() => handleUpdatePrice(i, '暂无计划')} className="px-5 py-3 bg-red-500/10 text-red-500 text-xs font-black rounded-xl hover:bg-red-500 hover:text-white transition-all">置为暂无计划</button>
                          </div>
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
