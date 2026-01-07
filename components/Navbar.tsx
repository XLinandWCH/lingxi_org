
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  logo: string;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, logo }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: '首页', path: '/' },
    { label: '博客', path: '/blog' },
    { label: '定价', path: '/pricing' },
    { label: '插件市场', path: '/plugins' },
    { label: '文档', path: '/docs' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="p-0.5 bg-black/40 rounded-lg border border-white/5 group-hover:border-[#00FF88]/30 transition-colors">
            <img src={logo} alt="Logo" className="w-9 h-9 rounded-md object-contain" />
          </div>
          <span className="text-2xl font-black tracking-tighter">
            灵析<span className="text-white/40 ml-1.5 font-bold">LingXi</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-bold tracking-tight transition-all hover:text-[#00FF88] ${
                isActive(item.path) ? 'text-[#00FF88]' : 'text-gray-500'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-5">
              {user.role === UserRole.ADMIN && (
                <Link to="/admin" className="text-xs font-black uppercase tracking-widest px-6 py-2 rounded-full border border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-all shadow-lg shadow-[#8B5CF6]/10">
                  管理后台
                </Link>
              )}
              <button 
                onClick={onLogout}
                className="text-xs font-bold text-gray-500 hover:text-red-500 transition-colors"
              >
                退出
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <Link to="/login" className="text-sm font-bold text-gray-500 hover:text-white transition-colors">
                登录
              </Link>
              <Link to="/docs" className="bg-[#00FF88] hover:bg-[#10B981] text-[#0A0A0F] px-6 py-2.5 rounded-xl text-sm font-black transition-all transform hover:scale-105 shadow-lg shadow-[#00FF88]/20">
                下载
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
