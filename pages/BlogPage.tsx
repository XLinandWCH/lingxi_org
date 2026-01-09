
import React, { useState } from 'react';
import { BlogPost } from '../types';

interface BlogPageProps {
  blogs: BlogPost[];
}

const BlogPage: React.FC<BlogPageProps> = ({ blogs }) => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  if (selectedBlog) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4">
        <button 
          onClick={() => setSelectedBlog(null)}
          className="mb-8 text-[#00FF88] flex items-center gap-2 hover:underline"
        >
          ← 返回列表
        </button>
        {selectedBlog.coverImage && (
          <img src={selectedBlog.coverImage} className="w-full aspect-video rounded-[2rem] object-cover mb-12 border border-white/5 shadow-2xl" alt="Cover" />
        )}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">{selectedBlog.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{selectedBlog.author}</span>
            <span>•</span>
            <span>{selectedBlog.date}</span>
            <div className="flex gap-2">
              {selectedBlog.tags.map(tag => (
                <span key={tag} className="bg-white/5 px-2 py-0.5 rounded border border-white/5">{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="prose prose-invert max-w-none leading-relaxed text-gray-300">
          {selectedBlog.content.split('\n').map((p, i) => (
            <p key={i} className="mb-4">{p}</p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">灵析开发者博客</h1>
        <p className="text-gray-400">分享私有化 AI 与工作站扩展的最新技术进展</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map(blog => (
          <article 
            key={blog.id} 
            className="bg-[#1F2937] border border-white/5 rounded-2xl overflow-hidden hover:border-[#00FF88]/30 transition-all cursor-pointer group flex flex-col"
            onClick={() => setSelectedBlog(blog)}
          >
            <div className="aspect-video bg-[#0A0A0F] relative overflow-hidden">
               <img 
                 src={blog.coverImage || `https://picsum.photos/seed/${blog.id}/600/338`} 
                 alt={blog.title} 
                 className="object-cover w-full h-full opacity-80 group-hover:scale-110 transition-transform duration-500" 
               />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex gap-2 mb-3">
                {blog.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider bg-[#00FF88]/10 text-[#00FF88] px-2 py-0.5 rounded-full border border-[#00FF88]/20">{tag}</span>
                ))}
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-[#00FF88] transition-colors">{blog.title}</h2>
              <p className="text-gray-400 text-sm line-clamp-3 mb-4">{blog.excerpt}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-xs text-gray-500">{blog.author} • {blog.date}</span>
                <span className="text-xs font-bold text-[#00FF88]">阅读更多 →</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
