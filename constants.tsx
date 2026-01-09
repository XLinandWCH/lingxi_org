
import React from 'react';
import { BlogPost } from './types';

// --- 系统全局配置 (由管理员通过后台生成后替换此处) ---
export const GLOBAL_CONFIG = {
  siteName: "灵析",
  siteSubName: "LingXi",
  logo: "https://api.dicebear.com/7.x/shapes/svg?seed=lingxi&backgroundColor=00FF88",
  heroImage: "https://picsum.photos/seed/lingxi-main/1600/900",
  videoLink: "#",
  githubRepo: "https://github.com/XLinandWCH/lingxi_org",
  
  // 下载链接
  downloadLinks: {
    winX64: "#",
    winArm64: "#",
    macOS: "#",
    linux: "#"
  },

  // 文档
  quickStartDoc: "欢迎来到灵析 (LingXi) 的世界。通过本指南，您将学会在 5 分钟内搭建属于您的私有化 AI 工作站。",

  // 定价计划
  plans: [
    {
      name: "社区版",
      price: "免费",
      description: "适合个人开发者和极客探索 AI 潜力",
      features: [
        "自带 API Key 灵活接入",
        "全量智库功能 (RAG)",
        "工坊 Artifacts 预览",
        "社区 MCP 插件支持",
        "本地私有化部署"
      ],
      cta: "立即体验",
      type: 'community'
    },
    {
      name: "专业版",
      price: "暂无计划",
      description: "为高效创作者量身定制的增强体验",
      features: [
        "包含主流模型额度 (无需私有 Key)",
        "多设备同步与云端备份",
        "优先体验 Beta 功能",
        "专属技术支持",
        "无限 MCP 连接并发"
      ],
      cta: "开启订阅",
      type: 'pro'
    },
    {
      name: "企业版",
      price: "暂无计划",
      description: "完全私有化、定制化的团队智能中枢",
      features: [
        "企业级内网穿透与安全审计",
        "多租户权限管理",
        "私有模型微调接口",
        "定制化插件开发支持",
        "SLA 运维保障"
      ],
      cta: "获取方案",
      type: 'enterprise'
    }
  ],

  // 博客数据 (由全球发布功能自动填充)
  blogs: [
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
  ] as BlogPost[]
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
