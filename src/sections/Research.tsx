import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Lightbulb, ExternalLink, Github } from 'lucide-react';
import type { Language } from '@/types/language';

gsap.registerPlugin(ScrollTrigger);

// 扩展 Paper 接口，增加可选的 images 字段
interface Paper {
  title: string;
  authors: string;
  journal: string;
  year: string;
  abstract: string;
  link?: string;
  github?: string;
  type: 'paper';
  images?: { src: string; caption: string; captionEn: string }[];
}

interface Patent {
  title: string;
  inventors: string;
  number: string;
  date: string;
  abstract: string;
  link?: string;
  type: 'patent';
  images?: { src: string; caption: string; captionEn: string }[];
}

type ResearchItem = Paper | Patent;

// 论文数据（中英文共用，期刊和摘要随语言变化）
const papers: Omit<Paper, 'journal' | 'abstract'> & {
  journal: Record<Language, string>;
  abstract: Record<Language, string>;
} = {
  title: 'Joint Geometric Partition and Efficient Matching Cross-Modal Registration Framework',
  authors: 'ChongEn Huang, XiuXun Xie, YiTao Cao, ZhiXiang Xue, Ying Shen',
  journal: {
    zh: '二区在投……',
    en: 'Under Review (JCR Q2)',
  },
  year: '2025',
  abstract: {
    zh: '提出几何分区与高效匹配联合的跨模态配准框架（JGP-EM），通过场景平面分割与特征匹配，解决复杂深度场景下全局单应性失效问题，配准精度达90.15%。',
    en: 'We propose a Joint Geometric Partition and Efficient Matching (JGP-EM) cross-modal registration framework. Through scene plane segmentation and feature matching, it addresses the failure of global homography in complex depth scenes, achieving a registration accuracy of 90.15%.',
  },
  link: 'https://doi.org/10.1117/12.3078191',
  type: 'paper' as const,
  images: [
    {
      src: './images/lunwenjishuluxian.png',
      caption: '几何分区与高效匹配联合的跨模态配准框架整体结构',
      captionEn: 'Overall architecture of the JGP-EM cross-modal registration framework',
    },
    {
      src: './images/lunwentu.png',
      caption: '不同配准方法在道路场景下的可视化对比结果',
      captionEn: 'Visual comparison of different registration methods on road scenes',
    },
  ],
};

// 专利数据（中英文分别定义，保持内容一致）
const patents: Record<Language, Patent[]> = {
  zh: [
    {
      title: '一种低空机载双光谱图像分区配准方法',
      inventors: '沈英，黄崇恩，黄峰，陈丽琼，裘兆炳',
      number: 'CN121437579A',
      date: '2025',
      abstract:
        '本发明公开一种低空机载双光谱图像分区配准方法，提出双光谱图像分区配准方法，利用深度估计与法向量生成掩膜，通过区域合并与角点插值计算单应性矩阵，实现高精度配准。',
      type: 'patent',
      images: [
        { src: './images/zhuanli1.png', caption: '发明专利申请', captionEn: 'Invention patent application' },
        { src: './images/zhuanli2.png', caption: '专利材料', captionEn: 'Patent documentation' },
      ],
    },
  ],
  en: [
    {
      title: 'A Partition-Based Registration Method for Low-Altitude Airborne Dual-Spectral Images',
      inventors: 'Ying Shen, ChongEn Huang, Feng Huang, Liqiong Chen, Zhaobing Qiu',
      number: 'CN121437579A',
      date: '2025',
      abstract:
        'The present invention discloses a partition-based registration method for low-altitude airborne dual-spectral images. It employs depth estimation and normal vector generation to create masks, and computes homography matrices through region merging and corner interpolation to achieve high-precision registration.',
      type: 'patent',
      images: [
        { src: './images/zhuanli1.png', caption: '发明专利申请', captionEn: 'Invention patent application' },
        { src: './images/zhuanli2.png', caption: '专利材料', captionEn: 'Patent documentation' },
      ],
    },
  ],
};

function isPaper(item: ResearchItem): item is Paper {
  return item.type === 'paper';
}

interface ResearchProps {
  language: Language;
}

export default function Research({ language }: ResearchProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'papers' | 'patents'>('papers');
  const isEnglish = language === 'en';

  // 构建论文数据（根据语言动态设置 journal 和 abstract）
  const papersWithLang: Paper = {
    ...papers,
    journal: papers.journal[language],
    abstract: papers.abstract[language],
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.research-title',
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

      gsap.fromTo(
        '.research-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.research-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentItems: ResearchItem[] = activeTab === 'papers' ? [papersWithLang] : patents[language];

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg" />
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-neon-cyan/5 blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="research-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {isEnglish ? (
              <>
                Research <span className="text-gradient">Outputs</span>
              </>
            ) : (
              <>
                科研<span className="text-gradient">成果</span>
              </>
            )}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            {isEnglish ? 'Published papers and filed patents' : '发表的学术论文与申请的专利'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('papers')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'papers'
                ? 'bg-neon-green text-dark-bg shadow-glow'
                : 'glass text-white/70 hover:text-white hover:border-white/20'
            }`}
          >
            <FileText className="w-4 h-4" />
            {isEnglish ? 'Papers' : '学术论文'}
          </button>
          <button
            onClick={() => setActiveTab('patents')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'patents'
                ? 'bg-neon-purple text-white shadow-glow-purple'
                : 'glass text-white/70 hover:text-white hover:border-white/20'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            {isEnglish ? 'Patents' : '专利'}
          </button>
        </div>

        {/* Content Grid */}
        <div className="research-grid grid gap-6">
          {currentItems.map((item, index) => (
            <div
              key={index}
              className="research-card group glass rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-gradient transition-colors mb-3">
                    {item.title}
                  </h3>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-neon-cyan text-sm">
                      {isPaper(item) ? item.journal : item.number}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/50 text-sm">
                      {isPaper(item) ? item.year : item.date}
                    </span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/50 text-sm">
                      {isPaper(item) ? item.authors : item.inventors}
                    </span>
                  </div>

                  {/* Abstract */}
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                    {item.abstract}
                  </p>

                  {/* Images（如果有） */}
                  {item.images && item.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {item.images.map((img, imgIdx) => (
                        <div key={imgIdx} className="rounded-xl overflow-hidden bg-dark-bg/50 border border-white/5">
                          <div className="aspect-[16/10] overflow-hidden">
                            <img
                              src={img.src}
                              alt={isEnglish ? img.captionEn : img.caption}
                              className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <p className="text-white/50 text-xs text-center py-1.5">
                            {isEnglish ? img.captionEn : img.caption}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {isPaper(item) && item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full glass text-white/70 hover:text-white hover:border-neon-green/50 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">{isEnglish ? 'Code' : '代码'}</span>
                    </a>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">{isEnglish ? 'View' : '查看'}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 flex justify-center gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">1</p>
            <p className="text-white/50 text-sm mt-1">{isEnglish ? 'Paper' : '学术论文'}</p>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient">1</p>
            <p className="text-white/50 text-sm mt-1">{isEnglish ? 'Patent' : '专利'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}