
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
import { GLOBAL_CONFIG } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('lingxi_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [siteLogo, setSiteLogo] = useState(() => localStorage.getItem('lingxi_logo_preview') || GLOBAL_CONFIG.logo);
  const [heroScreenshot, setHeroScreenshot] = useState(() => localStorage.getItem('lingxi_hero_preview') || GLOBAL_CONFIG.heroImage);
  const [videoLink, setVideoLink] = useState(() => localStorage.getItem('lingxi_video_preview') || GLOBAL_CONFIG.videoLink);
  
  const [winX64, setWinX64] = useState(() => localStorage.getItem('lx_win_x64_preview') || GLOBAL_CONFIG.downloadLinks.winX64);
  const [winArm64, setWinArm64] = useState(() => localStorage.getItem('lx_win_arm64_preview') || GLOBAL_CONFIG.downloadLinks.winArm64);
  const [macOS, setMacOS] = useState(() => localStorage.getItem('lx_mac_preview') || GLOBAL_CONFIG.downloadLinks.macOS);
  const [linux, setLinux] = useState(() => localStorage.getItem('lx_linux_preview') || GLOBAL_CONFIG.downloadLinks.linux);

  const [quickStartDoc, setQuickStartDoc] = useState(() => localStorage.getItem('lingxi_doc_qs_preview') || GLOBAL_CONFIG.quickStartDoc);

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('lingxi_blogs');
    // 如果本地有预览库数据则加载预览，否则加载全局正式发布的博客
    return saved ? JSON.parse(saved) : GLOBAL_CONFIG.blogs;
  });

  const [plans, setPlans] = useState<PricingPlan[]>(() => {
    const saved = localStorage.getItem('lingxi_plans_preview');
    return saved ? JSON.parse(saved) : GLOBAL_CONFIG.plans;
  });

  useEffect(() => {
    localStorage.setItem('lingxi_blogs', JSON.stringify(blogs));
    localStorage.setItem('lingxi_plans_preview', JSON.stringify(plans));
    localStorage.setItem('lingxi_logo_preview', siteLogo);
    localStorage.setItem('lingxi_hero_preview', heroScreenshot);
    localStorage.setItem('lingxi_video_preview', videoLink);
    localStorage.setItem('lingxi_doc_qs_preview', quickStartDoc);
    localStorage.setItem('lx_win_x64_preview', winX64);
    localStorage.setItem('lx_win_arm64_preview', winArm64);
    localStorage.setItem('lx_mac_preview', macOS);
    localStorage.setItem('lx_linux_preview', linux);
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
