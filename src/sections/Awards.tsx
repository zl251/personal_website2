import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Medal, Trophy, Building2, School, Users } from 'lucide-react';
import ScrollGallery from "./ScrollGallery";
import "./ScrollGallery.css";
import { withBase } from "@/utils/asset";
import type { Language } from '@/types/language';

gsap.registerPlugin(ScrollTrigger);

// 级别 → 图标映射
const levelIconMap: Record<string, typeof Trophy> = {
  '国家级': Trophy,
  'National': Trophy,
  '企业': Building2,
  'Corporate': Building2,
  '校级': School,
  'University': School,
  '院级': Users,
  'School': Users,
};

// 级别 → 图标颜色映射（用于图标背景的渐变色）
const levelColorMap: Record<string, string> = {
  '国家级': 'from-yellow-400 to-amber-500',
  'National': 'from-yellow-400 to-amber-500',
  '企业': 'from-blue-400 to-cyan-500',
  'Corporate': 'from-blue-400 to-cyan-500',
  '校级': 'from-emerald-400 to-green-500',
  'University': 'from-emerald-400 to-green-500',
  '院级': 'from-purple-400 to-violet-500',
  'School': 'from-purple-400 to-violet-500',
};

// 获取级别的显示名称（用于图标 tooltip）


const awards: Record<
  Language,
  Array<{ title: string; level: string; period: string; description: string; color: string }>
> = {
  zh: [
    {
      title: '福州大学先进技术创新研究院',
      level: '校级',
      period: '2024-2027',
      description: '从事机器视觉（主要包括可见-红外图像的目标检测与图像配准）、无人机低空遥感等方向研究，发表过论文与专利',
      color: 'from-emerald-400 to-green-500',
    },
    {
      title: '福建辰光启明科技有限公司——软件研发实习工程师',
      level: '企业',
      period: '2025-2026',
      description: '该公司为中国兵器装备集团子公司。本人担任实习工程师期间，曾深度参与多项某安全部门的国家级重点研发项目',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      title: '福州大学研究生助研奖学金',
      level: '校级',
      period: '2025',
      description: '导师作为国家级重点项目的第一负责人，由导师推荐，校级部门评估获得',
      color: 'from-emerald-400 to-green-500',
    },
    {
      title: '福州大学机械学院车辆工程专硕班班长',
      level: '院级',
      period: '2024-2027',
      description: '负责班级日常事务管理与协调，组织班级活动，服务同学',
      color: 'from-purple-400 to-violet-500',
    },
    {
      title: '福州大学2024届本科毕业生升学先进个人',
      level: '校级',
      period: '2024年6月',
      description: '以5/60的考研总成绩录取本校研究生，获评福州大学2024届本科毕业生升学先进个人称号',
      color: 'from-emerald-400 to-green-500',
    },
    {
      title: '2022中国大学生电动方程式大赛全国一等奖',
      level: '国家级',
      period: '2022年',
      description: '作为福州大学K-night赛车队核心队员参赛，担任传动组组长（赛车传动系统与冷却系统设计）、新闻官（运营公众号，拍摄与剪辑）、电动赛车手',
      color: 'from-yellow-400 to-amber-500',
    },
    {
      title: '福州大学丑石听潮书画社社长',
      level: '校级',
      period: '2022-2023',
      description: '社团曾获校级优秀社团，个人曾获2022年校级书法比赛三等奖',
      color: 'from-emerald-400 to-green-500',
    },
    {
      title: '福州大学机械学院辩论队',
      level: '院级',
      period: '2020-2023',
      description: '作为辩论队核心队员，多次参与校级比赛，具备丰富带队经验',
      color: 'from-purple-400 to-violet-500',
    },
  ],
  en: [
    {
      title: 'Advanced Technology Innovation Institute, Fuzhou University',
      level: 'University',
      period: '2024-2027',
      description: 'Conducting research in machine vision (visible-infrared object detection and image registration) and low-altitude drone remote sensing, with published papers and patents.',
      color: 'from-emerald-400 to-green-500',
    },
    {
      title: 'Fujian Chenguang Qiming Technology Co., Ltd. — Software R&D Intern Engineer',
      level: 'Corporate',
      period: '2025-2026',
      description: 'A subsidiary of China South Industries Group Corporation. As an intern engineer, participated in multiple national-level key R&D projects for a national security department.',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      title: 'Graduate Research Assistantship Scholarship, Fuzhou University',
      level: 'University',
      period: '2025',
      description: 'Recommended by the supervising professor (principal investigator of a national key project), and awarded after evaluation by the university-level department.',
      color: 'from-emerald-400 to-green-500',
    },
    {
      title: 'Class Monitor, Vehicle Engineering Master\'s Program, Fuzhou University',
      level: 'School',
      period: '2024-2027',
      description: 'Responsible for daily class affairs coordination, organizing class activities, and serving fellow students.',
      color: 'from-purple-400 to-violet-500',
    },
    {
      title: 'Outstanding Graduate Advancement Award, Fuzhou University (Class of 2024)',
      level: 'University',
      period: 'Jun 2024',
      description: 'Ranked 5th out of 60 in the postgraduate entrance examination and recognized as an outstanding undergraduate advancing to graduate studies.',
      color: 'from-emerald-400 to-green-500',
    },
    {
      title: 'Formula Student Electric Vehicle China 2022 — National First Prize',
      level: 'National',
      period: '2022',
      description: 'Core member of Fuzhou University K-night Racing Team; served as Drivetrain Team Leader (transmission and cooling system design), Press Officer (social media operation, filming and editing), and Electric Race Car Driver.',
      color: 'from-yellow-400 to-amber-500',
    },
    {
      title: 'President, Choushi Tingchao Calligraphy and Painting Society, Fuzhou University',
      level: 'University',
      period: '2022-2023',
      description: 'The society was recognized as an outstanding university club; personally won third prize in the 2022 university-level calligraphy competition.',
      color: 'from-emerald-400 to-green-500',
    },
    {
      title: 'Debate Team, School of Mechanical Engineering, Fuzhou University',
      level: 'School',
      period: '2020-2023',
      description: 'Core member of the debate team, participated in multiple university-level competitions and gained extensive experience in team leadership.',
      color: 'from-purple-400 to-violet-500',
    },
  ],
};

const galleryItems = [
  { src: withBase("./images/first_price.png"), label: "" },
  { src: withBase("./images/join_certification.png"), label: "" },
  { src: withBase("./images/outstanding_postgraduate.png"), label: "" },
  { src: withBase("./images/letter_of_appointment.png"), label: "" },
  { src: withBase("./images/shufa.png"), label: "" },
];

interface AwardsProps {
  language: Language;
}

export default function Awards({ language }: AwardsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isEnglish = language === 'en';
  const awardItems = awards[language];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.awards-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.award-card',
        { y: 60, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 获取当前条目对应的图标
  const getIconForLevel = (level: string) => {
    const IconComponent = levelIconMap[level];
    return IconComponent || Medal; // fallback
  };

  // 获取当前条目对应的图标颜色
  const getColorForLevel = (level: string) => {
    return levelColorMap[level] || 'from-gray-400 to-gray-500';
  };

  return (
    <section
      id="awards"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-x-clip"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-bg" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-neon-green/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="awards-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {isEnglish ? (
              <>
                Experience <span className="text-gradient">Highlights</span>
              </>
            ) : (
              <>
                个人<span className="text-gradient">经历</span>
              </>
            )}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            {isEnglish
              ? 'Key experiences and honors from undergraduate and graduate studies'
              : '本科与硕士期间的主要经历与荣誉'}
          </p>
        </div>

        {/* Awards Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6 perspective-1000"
        >
          {awardItems.map((award, index) => {
            const IconComponent = getIconForLevel(award.level);
            const iconColor = getColorForLevel(award.level);
            // 条目的装饰边框颜色使用条目自身的 color（保留多样性）
            const cardColor = award.color;

            return (
              <div
                key={index}
                className="award-card group relative glass rounded-2xl p-6 hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Spotlight effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
                </div>

                {/* Glow border - 使用条目自身的颜色 */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${cardColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
                />

                <div className="relative flex items-start gap-5">
                  {/* Icon - 根据级别统一 */}
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${iconColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-colors">
                        {award.title}
                      </h3>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r ${cardColor} text-white flex-shrink-0`}
                      >
                        {award.level}
                      </span>
                    </div>
                    <p className="text-neon-green text-sm font-medium mb-2">
                      {award.period}
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>

                {/* Decorative corner - 使用条目自身的颜色 */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                  <div
                    className={`w-full h-full bg-gradient-to-bl ${cardColor}`}
                    style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '1', label: isEnglish ? 'Corporate' : '企业' },
            { value: '1', label: isEnglish ? 'National' : '国家级' },
            { value: '4', label: isEnglish ? 'University' : '校级' },
            { value: '2', label: isEnglish ? 'School' : '院级' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center glass rounded-xl p-4 hover:border-neon-green/30 transition-colors"
            >
              <p className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                {stat.value}
              </p>
              <p className="text-white/50 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Certificates Gallery */}
        <div className="mt-8">
          <ScrollGallery items={galleryItems} language={language} />
        </div>
        
      </div>
    </section>
  );
}