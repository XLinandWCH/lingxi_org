
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
  logo: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, logo }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin && email === 'openlingxi@open.com' && password === '@openLingXi') {
      onLogin({ email, role: UserRole.ADMIN });
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('两次密码输入不一致');
      return;
    }

    if (email && password) {
       onLogin({ email, role: UserRole.USER });
    } else {
       setError('请填写所有必填字段');
    }
  };

  return (
    <div className="max-w-md mx-auto py-24 px-4">
      <div className="bg-[#1F2937]/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00FF88] to-[#8B5CF6]"></div>
        <div className="flex justify-center mb-10">
          <img src={logo} alt="Logo" className="w-20 h-20 rounded-3xl object-contain shadow-2xl p-2 bg-black/60 border border-white/5" />
        </div>
        <h2 className="text-3xl font-black text-center mb-2 tracking-tight">
          {isLogin ? '欢迎回来' : '灵析工作站注册'}
        </h2>
        <p className="text-gray-500 text-center text-sm mb-12">
          {isLogin ? '请输入您的凭据访问核心智能体中心' : '开启您的私有 AI 体验'}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-5 rounded-2xl mb-10 flex items-center gap-3">
             <span className="text-xl">⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest">邮箱地址</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 focus:border-[#00FF88] transition-colors outline-none text-sm text-white"
              placeholder="admin@lingxi.ai"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest">访问密码</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 focus:border-[#00FF88] transition-colors outline-none text-sm text-white"
              placeholder="••••••••"
              required
            />
          </div>
          {!isLogin && (
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-600 uppercase tracking-widest">确认密码</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 focus:border-[#00FF88] transition-colors outline-none text-sm text-white"
                placeholder="••••••••"
                required
              />
            </div>
          )}
          
          <button 
            type="submit"
            className="w-full bg-[#00FF88] hover:bg-[#10B981] text-[#0A0A0F] font-black py-4 rounded-2xl transition-all shadow-xl shadow-[#00FF88]/20 mt-6 active:scale-[0.98]"
          >
            {isLogin ? '进入工作站' : '完成注册'}
          </button>
        </form>

        <div className="mt-12 pt-10 border-t border-white/5 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-gray-500 hover:text-[#00FF88] transition-colors"
          >
            {isLogin ? '还没有账号？创建您的空间' : '已有账号？返回登录'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
