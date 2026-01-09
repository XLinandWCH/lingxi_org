
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
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 md:gap-4 group" onClick={closeMenu}>
            <div className="p-0.5 bg-black/40 rounded-lg border border-white/5 group-hover:border-[#00FF88]/30 transition-colors">
              <img src={logo} alt="Logo" className="w-7 h-7 md:w-9 md:h-9 rounded-md object-contain" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter">
              灵析<span className="text-white/40 ml-1 md:ml-1.5 font-bold">LingXi</span>
            </span>
          </Link>

          {/* Desktop Links */}
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

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-6">
              {user ? (
                <div className="flex items-center gap-5">
                  {user.role === UserRole.ADMIN && (
                    <Link to="/admin" className="text-xs font-black uppercase tracking-widest px-6 py-2 rounded-full border border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-all shadow-lg">
                      管理后台
                    </Link>
                  )}
                  <button onClick={onLogout} className="text-xs font-bold text-gray-500 hover:text-red-500 transition-colors">退出</button>
                </div>
              ) : (
                <div className="flex items-center gap-8">
                  <Link to="/login" className="text-sm font-bold text-gray-500 hover:text-white transition-colors">登录</Link>
                  <Link to="/docs" className="bg-[#00FF88] hover:bg-[#10B981] text-[#0A0A0F] px-6 py-2.5 rounded-xl text-sm font-black transition-all transform hover:scale-105">下载</Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-[110]"
            >
              <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] bg-[#0A0A0F] transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col h-full pt-32 px-8 gap-8">
          {navItems.map((item, idx) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={`text-4xl font-black tracking-tighter transition-all delay-[${idx * 50}ms] ${
                isActive(item.path) ? 'text-[#00FF88]' : 'text-white/20 hover:text-white'
              } ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
            >
              {item.label}
            </Link>
          ))}
          
          <div className="mt-auto pb-12 space-y-6">
            {user ? (
              <>
                {user.role === UserRole.ADMIN && (
                  <Link to="/admin" onClick={closeMenu} className="block text-center bg-[#8B5CF6] text-white py-4 rounded-2xl font-black">进入管理后台</Link>
                )}
                <button onClick={() => { onLogout(); closeMenu(); }} className="w-full text-center text-red-500 font-bold">退出登录</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="block text-center text-white/40 font-bold py-4">登录账号</Link>
                <Link to="/docs" onClick={closeMenu} className="block text-center bg-[#00FF88] text-[#0A0A0F] py-4 rounded-2xl font-black shadow-lg shadow-[#00FF88]/20">免费下载客户端</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
