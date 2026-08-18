import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Heart, Phone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { withBase } from '@/utils/asset';
import type { Language } from '@/types/language';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/zl251',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'WeChat',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'https://mail.163.com/js6/main.jsp?func=write&to=13950611039@163.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [showWechatModal, setShowWechatModal] = useState(false);
  const isEnglish = language === 'en';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-content',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background with repeating name */}
      <div className="absolute inset-0 bg-dark-bg">
        <div className="absolute inset-0 opacity-[0.02] overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="whitespace-nowrap text-[20vw] font-bold text-white leading-none"
              style={{ transform: `translateX(-${i * 10}%)` }}
            >
              {isEnglish ? 'ChongEn Huang ChongEn Huang ChongEn Huang' : '黄崇恩 黄崇恩 黄崇恩'}
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="footer-content">
          {/* Main content: 左右两栏布局，整体居中，GIF 在右侧 */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 mb-16">
            {/* 左侧：联系内容 */}
            <div className="flex-shrink-0 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {isEnglish ? (
                  <>
                    Let&apos;s <span className="text-gradient">Connect</span>
                  </>
                ) : (
                  <>
                    让我们<span className="text-gradient">联系</span>
                  </>
                )}
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
                {isEnglish
                  ? 'If you are interested in my research or projects, feel free to reach out.'
                  : '如果您对我的研究或项目感兴趣，欢迎随时与我交流'}
              </p>

              {/* Contact info - 新增电话 */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <a
                  href="https://mail.163.com/js6/main.jsp?func=write&to=13950611039@163.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-2.5 glass rounded-full hover:border-neon-green/50 transition-colors"
                >
                  <Mail className="w-4 h-4 text-neon-green" />
                  <span className="text-white/80 text-sm">13950611039@163.com</span>
                </a>
                <a
                  href="tel:+8613950611039"
                  className="flex items-center gap-3 px-5 py-2.5 glass rounded-full hover:border-neon-green/50 transition-colors"
                >
                  <Phone className="w-4 h-4 text-neon-cyan" />
                  <span className="text-white/80 text-sm">
                    {isEnglish ? '+86 13950611039' : '13950611039'}
                  </span>
                </a>
                <div className="flex items-center gap-3 px-5 py-2.5 glass rounded-full">
                  <MapPin className="w-4 h-4 text-neon-cyan" />
                  <span className="text-white/80 text-sm">{isEnglish ? 'Fuzhou, Fujian' : '福建福州'}</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex justify-center gap-3 mb-8">
                {socialLinks.map((social) => {
                  const isWechat = social.name === 'WeChat';
                  const content = (
                    <>
                      <span className="text-white/60 group-hover:text-neon-green transition-colors">
                        {social.icon}
                      </span>
                      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 text-xs text-white bg-black/80 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {social.name}
                      </span>
                    </>
                  );

                  if (isWechat) {
                    return (
                      <button
                        key={social.name}
                        type="button"
                        onClick={() => setShowWechatModal(true)}
                        className="group relative flex items-center justify-center w-12 h-12 rounded-full glass hover:bg-neon-green/10 hover:border-neon-green/50 transition-all duration-300 cursor-pointer"
                      >
                        {content}
                      </button>
                    );
                  }

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-center w-12 h-12 rounded-full glass hover:bg-neon-green/10 hover:border-neon-green/50 transition-all duration-300"
                    >
                      {content}
                    </a>
                  );
                })}
              </div>

              {/* QR code area */}
              <div className="flex justify-center">
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/5">
                  <div className="bg-white p-2 rounded-xl shadow-lg shadow-neon-green/5">
                    <QRCodeSVG
                      value="https://zl251.github.io/personal_website2/"
                      size={72}
                      bgColor="#ffffff"
                      fgColor="#1a1a2e"
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-white/60 text-xs font-medium">
                      {isEnglish ? 'Scan to visit' : '扫码访问'}
                    </p>
                    <p className="text-white/30 text-[10px]">
                      {isEnglish ? 'My homepage' : '个人主页'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧：GIF 卡通形象 */}
            <div className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-neon-green/10 to-neon-cyan/10 p-1 shadow-2xl shadow-neon-green/5">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-dark-card/50 backdrop-blur-sm flex items-center justify-center">
                <img
                  src={withBase("./images/carton.gif")}
                  alt={isEnglish ? 'Waving Avatar' : '挥手卡通形象'}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                </div>
              </div>
              {/* Decorative label */}
              <div className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-full glass text-xs text-white/70 border border-white/10">
                👋 {isEnglish ? 'Say Hi!' : '打个招呼！'}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/40 text-sm">
                © 2025 {isEnglish ? 'ChongEn Huang' : '黄崇恩'}. All rights reserved.
              </p>
              <p className="text-white/40 text-sm flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in Fuzhou
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WeChat QR Code Modal */}
      {showWechatModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowWechatModal(false)}
        >
          <div
            className="relative bg-gray-900/90 border border-white/10 rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowWechatModal(false)}
              className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
                </svg>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">
              {isEnglish ? 'Contact via WeChat' : '微信联系我'}
            </h3>
            <p className="text-white/50 text-sm mb-6">
              {isEnglish ? 'Scan the QR code below to add me on WeChat' : '扫描下方二维码添加微信'}
            </p>

            <div className="bg-white rounded-xl p-4 inline-block mb-4">
              <img src={withBase("./images/QR_code.jpg")} alt="WeChat QR Code" className="w-48 h-48" />
            </div>

            <p className="text-white/40 text-xs">
              {isEnglish ? 'Save screenshot and scan it in WeChat' : '截图保存，打开微信扫一扫'}
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}