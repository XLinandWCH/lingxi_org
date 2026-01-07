
import React from 'react';
import { PricingPlan } from '../types';

interface PricingPageProps {
  plans: PricingPlan[];
}

const PricingPage: React.FC<PricingPageProps> = ({ plans }) => {
  return (
    <div className="max-w-7xl mx-auto py-24 px-4">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">简单透明的定价方案</h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-base">
          无论您是个人极客还是大型企业，灵析都能提供契合您需求的版本。<br/>
          社区版始终免费，支持自带 API Key。
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 items-stretch">
        {plans.map((plan, idx) => (
          <div 
            key={idx} 
            className="relative flex flex-col p-10 rounded-[2.5rem] border border-white/5 transition-all duration-300 transform hover:-translate-y-2 bg-[#0A0A0F] hover:border-[#00FF88] group"
          >
            <h3 className="text-3xl font-bold mb-4 tracking-tight">{plan.name}</h3>
            <div className="mb-8">
              <span className={`text-5xl font-bold ${plan.price === '暂无计划' ? 'text-gray-700' : 'text-white'}`}>
                {plan.price}
              </span>
              {plan.price.includes('¥') && <span className="text-gray-500 ml-2 font-medium">/ 月</span>}
            </div>
            <p className="text-gray-400 text-sm mb-10 leading-relaxed min-h-[40px]">{plan.description}</p>
            
            <ul className="space-y-5 mb-12 flex-grow">
              {plan.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-gray-300">
                  <div className="mt-1 flex-shrink-0 text-[#00FF88]">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1.5 1.5 0 00-2.121-2.121L9 9.172 7.707 7.879a1.5 1.5 0 10-2.121 2.121l2.25 2.25a1.5 1.5 0 002.121 0l4.5-4.5z" clipRule="evenodd" /></svg>
                  </div>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-4 rounded-2xl font-bold transition-all bg-[#1F2937] text-white hover:bg-[#00FF88] hover:text-[#0A0A0F] active:scale-95 shadow-lg">
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
