
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import BlogPage from './pages/BlogPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import PluginMarket from './pages/PluginMarket';
import DocsPage from './pages/DocsPage';
import { User, UserRole, BlogPost, PricingPlan } from './types';
import { INITIAL_PLANS, DEFAULT_LOGO } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('lingxi_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [siteLogo, setSiteLogo] = useState(() => localStorage.getItem('lingxi_logo') || DEFAULT_LOGO);
  const [heroScreenshot, setHeroScreenshot] = useState(() => localStorage.getItem('lingxi_hero_img') || "https://picsum.photos/seed/lingxi-main/1600/900");
  const [videoLink, setVideoLink] = useState(() => localStorage.getItem('lingxi_video_url') || "#");
  
  // Platform specific links
  const [winX64, setWinX64] = useState(() => localStorage.getItem('lx_win_x64') || "#");
  const [winArm64, setWinArm64] = useState(() => localStorage.getItem('lx_win_arm64') || "#");
  const [macOS, setMacOS] = useState(() => localStorage.getItem('lx_mac') || "#");
  const [linux, setLinux] = useState(() => localStorage.getItem('lx_linux') || "#");

  const [quickStartDoc, setQuickStartDoc] = useState(() => localStorage.getItem('lingxi_doc_qs') || "欢迎来到灵析 (LingXi) 的世界。通过本指南，您将学会在 5 分钟内搭建属于您的私有化 AI 工作站。");

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('lingxi_blogs');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        title: '灵析 v1.0 正式发布：您的下一代智能工作站',
        excerpt: '经过半年的迭代，灵析终于迎来了里程碑式的版本更新。',
        content: '今天我们非常激动地宣布灵析正式版本发布。灵析不仅是一个对话机器人，它是集智库、工坊、连接于一体的智能体工作站...',
        author: '灵析团队',
        date: '2024-05-20',
        tags: ['版本更新', '公告'],
        type: 'markdown'
      }
    ];
  });

  const [plans, setPlans] = useState<PricingPlan[]>(() => {
    const saved = localStorage.getItem('lingxi_plans');
    return saved ? JSON.parse(saved) : INITIAL_PLANS;
  });

  useEffect(() => {
    localStorage.setItem('lingxi_blogs', JSON.stringify(blogs));
    localStorage.setItem('lingxi_plans', JSON.stringify(plans));
    localStorage.setItem('lingxi_logo', siteLogo);
    localStorage.setItem('lingxi_hero_img', heroScreenshot);
    localStorage.setItem('lingxi_video_url', videoLink);
    localStorage.setItem('lingxi_doc_qs', quickStartDoc);
    localStorage.setItem('lx_win_x64', winX64);
    localStorage.setItem('lx_win_arm64', winArm64);
    localStorage.setItem('lx_mac', macOS);
    localStorage.setItem('lx_linux', linux);
  }, [blogs, plans, siteLogo, heroScreenshot, videoLink, quickStartDoc, winX64, winArm64, macOS, linux]);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('lingxi_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('lingxi_user');
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} onLogout={handleLogout} logo={siteLogo} />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<LandingPage videoLink={videoLink} heroScreenshot={heroScreenshot} />} />
            <Route path="/blog" element={<BlogPage blogs={blogs} />} />
            <Route path="/pricing" element={<PricingPage plans={plans} />} />
            <Route path="/plugins" element={<PluginMarket />} />
            <Route path="/docs" element={<DocsPage 
              quickStartContent={quickStartDoc} 
              winX64={winX64}
              winArm64={winArm64}
              macOS={macOS}
              linux={linux}
            />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} logo={siteLogo} />} 
            />
            <Route 
              path="/admin" 
              element={
                user?.role === UserRole.ADMIN 
                ? <AdminDashboard 
                    blogs={blogs} setBlogs={setBlogs} 
                    plans={plans} setPlans={setPlans} 
                    siteLogo={siteLogo} setSiteLogo={setSiteLogo}
                    heroScreenshot={heroScreenshot} setHeroScreenshot={setHeroScreenshot}
                    videoLink={videoLink} setVideoLink={setVideoLink}
                    quickStartDoc={quickStartDoc} setQuickStartDoc={setQuickStartDoc}
                    winX64={winX64} setWinX64={setWinX64}
                    winArm64={winArm64} setWinArm64={setWinArm64}
                    macOS={macOS} setMacOS={setMacOS}
                    linux={linux} setLinux={setLinux}
                  /> 
                : <Navigate to="/login" />
              } 
            />
          </Routes>
        </main>
        <Footer logo={siteLogo} />
      </div>
    </Router>
  );
};

export default App;
