
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  logo: string;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, logo }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: '首页', path: '/' },
    { label: '博客', path: '/blog' },
    { label: '定价', path: '/pricing' },
    { label: '插件市场', path: '/plugins' },
    { label: '文档', path: '/docs' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0A0A0F]/70 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group" onClick={closeMenu}>
            <div className="p-1 bg-black/40 rounded-xl border border-white/10 group-hover:border-[#00FF88]/40 transition-all duration-500 shadow-2xl">
              <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-2xl font-black tracking-tighter transition-all">
              灵析<span className="text-white/40 ml-1.5 font-bold">LingXi</span>
            </span>
          </Link>

          {/* 桌面端导航 */}
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

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-8">
              {user ? (
                <div className="flex items-center gap-6">
                  {user.role === UserRole.ADMIN && (
                    <Link to="/admin" className="text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full border border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-all">
                      管理中心
                    </Link>
                  )}
                  <button onClick={onLogout} className="text-xs font-bold text-gray-500 hover:text-red-500 transition-colors">退出</button>
                </div>
              ) : (
                <div className="flex items-center gap-10">
                  <Link to="/login" className="text-sm font-bold text-gray-500 hover:text-white transition-colors">登录</Link>
                  <Link to="/docs" className="bg-white text-black px-6 py-2.5 rounded-xl text-xs font-black transition-all hover:scale-105 active:scale-95 shadow-xl">下载灵析</Link>
                </div>
              )}
            </div>

            {/* 手机端汉堡按钮 */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 relative z-[110] bg-white/5 rounded-2xl active:scale-90 transition-all border border-white/5"
            >
              <span className={`w-5 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[4px]' : ''}`}></span>
              <span className={`w-5 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-5 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* 手机端全屏菜单 */}
      <div className={`fixed inset-0 z-[90] transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl" onClick={closeMenu}></div>
        <div className={`absolute right-0 top-0 bottom-0 w-[80%] bg-[#0D0D12] border-l border-white/10 p-10 flex flex-col transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col gap-8 mt-20">
            {navItems.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`text-4xl font-black tracking-tighter transition-all ${
                  isActive(item.path) ? 'text-[#00FF88]' : 'text-white/20 hover:text-white'
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pb-10 space-y-6">
            {user ? (
              <>
                {user.role === UserRole.ADMIN && (
                  <Link to="/admin" onClick={closeMenu} className="block text-center bg-[#8B5CF6] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">进入管理后台</Link>
                )}
                <button onClick={() => { onLogout(); closeMenu(); }} className="w-full text-center text-red-500 font-black text-xs uppercase tracking-[0.2em]">退出工作站</button>
              </>
            ) : (
              <div className="space-y-4">
                <Link to="/login" onClick={closeMenu} className="block text-center text-white/40 font-bold py-4 hover:text-white transition-colors">登录账号</Link>
                <Link to="/docs" onClick={closeMenu} className="block text-center bg-[#00FF88] text-[#0A0A0F] py-4 rounded-2xl font-black text-sm shadow-2xl active:scale-95 transition-all">立即获取灵析</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
