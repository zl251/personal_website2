import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Award, Users, BookOpen, Mail, Phone } from 'lucide-react';
import { withBase } from "@/utils/asset";
import type { Language } from '@/types/language';

gsap.registerPlugin(ScrollTrigger);

const education: Record<
  Language,
  Array<{ period: string; school: string; major: string; details?: string; icon: typeof GraduationCap }>
> = {
  zh: [
    {
      period: '2024 - 2027',
      school: '福州大学 211硕士',
      major: '车辆工程专业',
      icon: GraduationCap,
    },
    {
      period: '2020 - 2024',
      school: '福州大学 211本科',
      major: '车辆工程专业',
      details: '以5/60的考研总成绩录取本校研究生',
      icon: GraduationCap,
    },
  ],
  en: [
    {
      period: '2024 - 2027',
      school: 'Fuzhou University (Project 211), M.Eng.',
      major: 'Vehicle Engineering',
      icon: GraduationCap,
    },
    {
      period: '2020 - 2024',
      school: 'Fuzhou University (Project 211), B.Eng.',
      major: 'Vehicle Engineering',
      details: 'Ranked 5th out of 60 in the postgraduate entrance examination',
      icon: GraduationCap,
    },
  ],
};

const memberships: Record<Language, Array<{ name: string; icon: typeof Users }>> = {
  zh: [
    { name: 'IEEE学生会员', icon: Users },
    { name: '中国汽车工程学会会员', icon: Users },
  ],
  en: [
    { name: 'IEEE Student Member', icon: Users },
    { name: 'Member of the China Society of Automotive Engineering', icon: Users },
  ],
};

const researchAreas: Record<Language, string[]> = {
  zh: ['机器视觉', '低空无人机遥感', '可见-红外小目标检测', '多模态图像配准', '人工智能与多源数据感知结合'],
  en: [
    'Machine vision',
    'Low-altitude drone remote sensing',
    'Visible-infrared small target detection',
    'Multimodal image registration',
    'AI and Multi-source Data Perception',
  ],
};

const contactInfo: Record<Language, { email: string; phone: string }> = {
  zh: {
    email: '13950611039@163.com',
    phone: '13950611039',
  },
  en: {
    email: '13950611039@163.com',
    phone: '+86 13950611039',
  },
};

interface AboutProps {
  language: Language;
}

export default function About({ language }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isEnglish = language === 'en';
  const educationItems = education[language];
  const membershipItems = memberships[language];
  const areaItems = researchAreas[language];
  const contact = contactInfo[language];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
        {
          clipPath: 'circle(100% at 50% 50%)',
          opacity: 1,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animations
      gsap.fromTo(
        '.about-title',
        { x: -50, opacity: 0, rotate: -5 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.about-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-neon-purple/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-neon-cyan/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="about-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16">
          {isEnglish ? (
            <>
              About <span className="text-gradient">Me</span>
            </>
          ) : (
            <>
              关于<span className="text-gradient">我</span>
            </>
          )}
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Visual */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  {/* 个人照片 */}
                  <img 
                    src={withBase("./images/personal_photo3.jpg")}
                    alt={isEnglish ? 'ChongEn Huang' : '黄崇恩'}
                    className="w-full h-full object-cover"
                  />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent" />
            </div>

          </div>

          {/* Right Column - Content */}
          <div ref={contentRef} className="space-y-8">
            {/* Education */}
            <div className="about-item">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-neon-green" />
                {isEnglish ? 'Education' : '教育背景'}
              </h3>
              <div className="space-y-4">
                {educationItems.map((edu, index) => (
                  <div
                    key={index}
                    className="glass rounded-xl p-4 hover:border-neon-green/30 transition-colors"
                  >
                    <p className="text-neon-green text-sm font-medium">{edu.period}</p>
                    <p className="text-white font-semibold mt-1">{edu.school}</p>
                    <p className="text-white/70">{edu.major}</p>
                    {edu.details && (
                      <p className="text-neon-cyan text-sm mt-1">{edu.details}</p>
                    )}
                    {/* CET-6 Badge - only for undergraduate */}
                    {index === 1 && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-medium">
                          <Award className="w-3.5 h-3.5" />
                          {isEnglish ? 'CET-6 English Certificate' : 'CET-6 英语六级'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Memberships */}
            <div className="about-item">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-neon-purple" />
                {isEnglish ? 'Memberships' : '学术会员'}
              </h3>
              <div className="flex flex-wrap gap-3">
                {membershipItems.map((member, index) => (
                  <div
                    key={index}
                    className="glass rounded-full px-4 py-2 flex items-center gap-2"
                  >
                    <member.icon className="w-4 h-4 text-neon-purple" />
                    <span className="text-white/80 text-sm">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Areas */}
            <div className="about-item">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-neon-cyan" />
                {isEnglish ? 'Research Interests' : '研究方向'}
              </h3>
              <div className="flex flex-wrap gap-3">
                {areaItems.map((area, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm hover:bg-neon-cyan/20 transition-colors"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="about-item">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-400" />
                {isEnglish ? 'Contact' : '联系方式'}
              </h3>
              <div className="glass rounded-xl p-4 space-y-3 hover:border-orange-400/30 transition-colors">
                {/* Email */}
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-white/50" />
                  <a 
                    href={`mailto:${contact.email}`} 
                    className="text-white/80 hover:text-orange-400 transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
                {/* Phone */}
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-white/50" />
                  <span className="text-white/80">{contact.phone}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}