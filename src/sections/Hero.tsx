import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import ThreeBackground from './ThreeBackground';
import { withBase } from "@/utils/asset";
import type { Language } from '@/types/language';

interface HeroProps {
  language: Language;
}

export default function Hero({ language }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showWechatModal, setShowWechatModal] = useState(false);
  const isEnglish = language === 'en';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - 3D character flip
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, rotateX: 90, y: 50 },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 1.2,
          delay: 0.5,
          ease: 'expo.out',
        }
      );

      // Subtitle typewriter effect
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, width: 0 },
        {
          opacity: 1,
          width: '100%',
          duration: 1,
          delay: 1.2,
          ease: 'steps(30)',
        }
      );

      // Description fade in
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 1.8,
          ease: 'expo.out',
        }
      );

      // Background scale animation
      gsap.fromTo(
        '.hero-bg',
        { scale: 1.2 },
        {
          scale: 1,
          duration: 2.5,
          ease: 'power2.out',
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copy = isEnglish
    ? {
        subtitle: 'AI Research / Computer Vision Researcher',
        description: 'Exploring the boundaries of intelligent vision and drone technology',
        wechatTitle: 'Contact via WeChat',
        wechatDesc: 'Scan the QR code below to add me on WeChat',
        wechatHint: 'Save screenshot and scan it in WeChat',
      }
    : {
        subtitle: '人工智能课题 / 机器视觉研究者',
        description: '探索智能视觉与无人机技术的边界',
        wechatTitle: '微信联系我',
        wechatDesc: '扫描下方二维码添加微信',
        wechatHint: '截图保存，打开微信扫一扫',
      };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js Background */}
      <ThreeBackground />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* Animated gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 perspective-1000">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 preserve-3d"
          style={{
            transform: `rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <span className="text-gradient">{isEnglish ? 'ChongEn Huang' : '黄崇恩'}</span>
        </h1>

        <div className="overflow-hidden">
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light tracking-wider whitespace-nowrap mx-auto"
          >
            {copy.subtitle}
          </p>
        </div>

        <p
          ref={descRef}
          className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
        >
          {copy.description}
        </p>

        {/* Social Links */}
        <div className="mt-10 flex justify-center gap-6">
          {[
            { name: 'GitHub', icon: 'github', href: 'https://github.com/zl251' },
            { name: 'WeChat', icon: 'wechat', href: '#' },
            { name: 'Email', icon: 'email', href: 'https://mail.163.com/js6/main.jsp?func=write&to=你的163邮箱@163.com' },
          ].map((social) => {
            const isWechat = social.icon === 'wechat';
            const Tag = isWechat ? 'button' : 'a';
            const linkProps = isWechat
              ? { onClick: () => setShowWechatModal(true) }
              : { href: social.href, target: '_blank', rel: 'noopener noreferrer' };

            return (
              <Tag
                key={social.name}
                {...(linkProps as any)}
                className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-neon-green/20 hover:border-neon-green/50 transition-all duration-300 cursor-pointer"
              >
                <span className="text-white/70 group-hover:text-neon-green transition-colors">
                  {social.icon === 'github' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                  {social.icon === 'wechat' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
                    </svg>
                  )}
                  {social.icon === 'email' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                </span>
                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 text-xs text-white bg-black/80 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {social.name}
                </span>
              </Tag>
            );
          })}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </button>

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

            {/* WeChat icon */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
                </svg>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">{copy.wechatTitle}</h3>
            <p className="text-white/50 text-sm mb-6">{copy.wechatDesc}</p>

            {/* QR Code placeholder - 替换为你的真实二维码图片 */}
            <div className="bg-white rounded-xl p-4 inline-block mb-4">
              {/* TODO: 将下面的 placeholder 替换为你的微信二维码图片 */}
              <img src={withBase("./images/QR_code.jpg")} alt="WeChat QR Code" className="w-48 h-48" />
              {/* <div className="w-48 h-48 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-300 rounded-lg">
                <span>请替换为二维码图片</span>
              </div> */}
            </div>

            <p className="text-white/40 text-xs">{copy.wechatHint}</p>
          </div>
        </div>
      )}

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
    </section>
  );
}