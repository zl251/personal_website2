import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Image,
  Music,
  Code2,
  Box,
  Calculator,
  Palette,
  Terminal,
  Layers,
  PenTool,
  Activity,
  Car,
  Ruler,
  Microchip,
  Cog,
} from 'lucide-react';
import { withBase } from "@/utils/asset";
import type { Language } from '@/types/language';

gsap.registerPlugin(ScrollTrigger);

// ---- 技能数据类型 ----
interface Skill {
  key: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  group: 'algorithm' | 'mechanical' | 'design_edit' | 'arts_sports';
  level: number;
  icon: React.ElementType;
  color: string;
  images?: string[];
}

// ---- 统一技能数据 ----
const skillsData: Skill[] = [
  // ========== 算法编程（纵向单行，共2个） ==========
  {
    key: 'vscode_pycharm',
    name: 'VScode/PyCharm',
    nameEn: 'VS Code / PyCharm',
    description: 'Python开发',
    descriptionEn: 'Python development',
    group: 'algorithm',
    level: 95,
    icon: Code2,
    color: 'from-blue-500 to-indigo-500',
    images: [withBase("./images/VSCode.png")]
  },
  {
    key: 'cpp_qt',
    name: 'C++与Qt设计',
    nameEn: 'C++ / Qt Design',
    description: '软件开发',
    descriptionEn: 'Software development',
    group: 'algorithm',
    level: 90,
    icon: Microchip,
    color: 'from-cyan-500 to-emerald-500',
    images: [withBase("./images/QT.jpg")]
  },

  // ========== 机械设计（卡片网格） ==========
  {
    key: 'cad',
    name: 'CAD',
    nameEn: 'CAD',
    description: 'CAD制图',
    descriptionEn: 'CAD Drafting',
    group: 'mechanical',
    level: 85,
    icon: Ruler,
    color: 'from-orange-400 to-yellow-500',
    images: [withBase("./images/CAD.jpg")]
  },
  {
    key: 'solidworks',
    name: 'SolidWorks',
    nameEn: 'SolidWorks',
    description: '3D建模与设计',
    descriptionEn: '3D modeling and design',
    group: 'mechanical',
    level: 88,
    icon: Box,
    color: 'from-red-500 to-rose-500',
    images: [withBase("./images/sw.png")]
  },
  {
    key: 'ansys',
    name: 'ANSYS',
    nameEn: 'ANSYS',
    description: '有限元仿真分析',
    descriptionEn: 'Finite Element Simulation',
    group: 'mechanical',
    level: 75,
    icon: Layers,
    color: 'from-purple-500 to-violet-500',
    images: [withBase("./images/ansys2.png")]
  },
  {
    key: 'matlab',
    name: 'MATLAB',
    nameEn: 'MATLAB',
    description: '科学计算与仿真',
    descriptionEn: 'Scientific computing and simulation',
    group: 'mechanical',
    level: 92,
    icon: Calculator,
    color: 'from-orange-500 to-red-500',
    images: [withBase("./images/matlab.png")]
  },

  // ========== 设计与剪辑（卡片网格） ==========
  {
    key: 'photoshop',
    name: 'Photoshop',
    nameEn: 'Photoshop',
    description: '图像处理与设计',
    descriptionEn: 'Image editing and graphic design',
    group: 'design_edit',
    level: 85,
    icon: Image,
    color: 'from-blue-400 to-purple-500',
    images: [withBase("./images/I.jpg"), withBase("./images/firework.jpg"), withBase("./images/afternoon_tea.jpg")]
  },
  {
    key: 'premiere_capcut',
    name: 'Premiere与剪映',
    nameEn: 'Premiere & CapCut',
    description: '视频剪辑与后期',
    descriptionEn: 'Video editing and post-production',
    group: 'design_edit',
    level: 80,
    icon: Terminal,
    color: 'from-purple-500 to-pink-500',
    images: [withBase("./images/PR.png")]
  },
  {
    key: 'keyshot',
    name: 'Keyshot',
    nameEn: 'Keyshot',
    description: '产品渲染与材质表现',
    descriptionEn: 'Product rendering & material presentation',
    group: 'design_edit',
    level: 70,
    icon: Palette,
    color: 'from-rose-400 to-pink-400',
    images: [withBase("./images/keyshot.png")]
  },

  // ========== 文艺与体育（卡片网格） ==========
  {
    key: 'calligraphy',
    name: '书法',
    nameEn: 'Calligraphy',
    description: '书法艺术',
    descriptionEn: 'Calligraphy Art',
    group: 'arts_sports',
    level: 70,
    icon: PenTool,
    color: 'from-stone-500 to-amber-500',
    images: [withBase("./images/shufa1.jpg"), withBase("./images/shufa2.jpg")]
  },
  {
    key: 'marathon',
    name: '马拉松',
    nameEn: 'Marathon',
    description: '马拉松长跑',
    descriptionEn: 'Marathon Running',
    group: 'arts_sports',
    level: 75,
    icon: Activity,
    color: 'from-emerald-400 to-green-500',
    images: [withBase("./images/malason1.jpg"), withBase("./images/malason2.jpg")]
  },
  {
    key: 'racing',
    name: '赛车驾驶',
    nameEn: 'Racing Driving',
    description: '赛车驾驶体验',
    descriptionEn: 'Racing Driving Experience',
    group: 'arts_sports',
    level: 65,
    icon: Car,
    color: 'from-red-500 to-orange-500',
    images: [withBase("./images/racecar_driver.jpg")]
  },
];

// ---- 分组名称映射 ----
const groupNames: Record<Skill['group'], { zh: string; en: string }> = {
  algorithm: { zh: '算法编程', en: 'Algorithm Programming' },
  mechanical: { zh: '机械设计', en: 'Mechanical Design' },
  design_edit: { zh: '设计与剪辑', en: 'Design & Editing' },
  arts_sports: { zh: '文艺与体育', en: 'Arts & Sports' },
};

const groupOrder: Skill['group'][] = ['algorithm', 'mechanical', 'design_edit', 'arts_sports'];

interface SkillsProps {
  language: Language;
}

export default function Skills({ language }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const isEnglish = language === 'en';

  const getSkillDisplay = (skill: Skill) => ({
    name: isEnglish ? skill.nameEn : skill.name,
    description: isEnglish ? skill.descriptionEn : skill.description,
  });

  const currentSkill = skillsData.find((s) => s.key === (hoveredSkill || activeSkill));
  // 👇 提取当前技能的图片数组，解决 TypeScript 类型收窄问题
  const currentImages = currentSkill?.images;

  const groupedSkills = groupOrder.map((groupKey) => ({
    key: groupKey,
    name: isEnglish ? groupNames[groupKey].en : groupNames[groupKey].zh,
    skills: skillsData.filter((s) => s.group === groupKey),
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-title',
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
        '.skill-group',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skills-list',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.skill-progress',
        { width: '0%' },
        {
          width: (_, target) => target.dataset.level + '%',
          duration: 1.2,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.skills-list',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg" />
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-neon-purple/5 blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-neon-green/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="skills-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {isEnglish ? (
              <>
                Related <span className="text-gradient">Skills</span>
              </>
            ) : (
              <>
                相关<span className="text-gradient">技能</span>
              </>
            )}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            {isEnglish ? 'A showcase of programming, design, and creative skills' : '编程、设计与创意技能展示'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* 左侧：技能列表 */}
          <div className="skills-list space-y-8">
            {groupedSkills.map((group) => {
              if (group.skills.length === 0) return null;

              return (
                <div key={group.key} className="skill-group">
                  <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4 pl-1">
                    {group.name}
                  </h3>

                  {/* 算法编程：纵向单行；其他分组：卡片网格 */}
                  {group.key === 'algorithm' ? (
                    <div className="space-y-3">
                      {group.skills.map((skill) => {
                        const display = getSkillDisplay(skill);
                        return (
                          <div
                            key={skill.key}
                            className="skill-item group/card glass rounded-xl p-4 hover:border-white/20 transition-all duration-300 cursor-pointer"
                            onMouseEnter={() => setHoveredSkill(skill.key)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            onClick={() =>
                              setActiveSkill(activeSkill === skill.key ? null : skill.key)
                            }
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg`}
                              >
                                <skill.icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-white font-semibold group-hover/card:text-gradient transition-colors">
                                    {display.name}
                                  </h4>
                                  <span className="text-white/50 text-sm">{skill.level}%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className={`skill-progress h-full rounded-full bg-gradient-to-r ${skill.color}`}
                                    data-level={skill.level}
                                    style={{ width: '0%' }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {group.skills.map((skill) => {
                        const display = getSkillDisplay(skill);
                        return (
                          <div
                            key={skill.key}
                            className="skill-item group/card glass rounded-xl p-4 hover:border-white/20 transition-all duration-300 cursor-pointer"
                            onMouseEnter={() => setHoveredSkill(skill.key)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            onClick={() =>
                              setActiveSkill(activeSkill === skill.key ? null : skill.key)
                            }
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg`}
                              >
                                <skill.icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <h4 className="text-white font-semibold text-sm truncate group-hover/card:text-gradient transition-colors">
                                    {display.name}
                                  </h4>
                                  <span className="text-white/50 text-xs flex-shrink-0">{skill.level}%</span>
                                </div>
                                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mt-1.5">
                                  <div
                                    className={`skill-progress h-full rounded-full bg-gradient-to-r ${skill.color}`}
                                    data-level={skill.level}
                                    style={{ width: '0%' }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 右侧预览区 */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="glass rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
              {currentSkill ? (
                <div className="text-center w-full">
                  <div
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${currentSkill.color} flex items-center justify-center shadow-xl`}
                  >
                    <currentSkill.icon className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    {isEnglish ? currentSkill.nameEn : currentSkill.name}
                  </h3>
                  <p className="text-white/60 mb-6">
                    {isEnglish ? currentSkill.descriptionEn : currentSkill.description}
                  </p>

                  {/* 有图片：展示图片 - 使用 currentImages 变量 */}
                  {currentImages && currentImages.length > 0 && (
                    <div className={`grid ${
                      currentImages.length === 1 ? 'grid-cols-1' :
                      currentImages.length === 2 ? 'grid-cols-2' :
                      'grid-cols-3'
                    } gap-3`}>
                      {currentImages.slice(0, 3).map((src, i) => (
                        <div
                          key={i}
                          className={`${
                            currentImages.length === 1 ? 'aspect-video' : 'aspect-square'
                          } rounded-lg bg-white/5 overflow-hidden`}
                        >
                          <img
                            src={src}
                            alt={`${currentSkill.name}-${i}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 无图片时的占位 */}
                  {!currentImages && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="aspect-square rounded-lg bg-white/5 flex items-center justify-center">
                        <Code2 className="w-10 h-10 text-white/20" />
                      </div>
                      <div className="aspect-square rounded-lg bg-white/5 flex items-center justify-center">
                        <Layers className="w-10 h-10 text-white/20" />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 flex items-center justify-center">
                    <Palette className="w-12 h-12 text-white/30" />
                  </div>
                  <p className="text-white/40 text-lg">
                    {isEnglish ? 'Hover or click a skill to view details' : '悬停或点击技能查看详情'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {[
            {
              key: 'algorithm',
              name: isEnglish ? 'Algorithm' : '编程',
              icon: Terminal,
              count: skillsData.filter(s => s.group === 'algorithm').length
            },
            {
              key: 'mechanical',
              name: isEnglish ? 'Mechanical' : '机械',
              icon: Cog,
              count: skillsData.filter(s => s.group === 'mechanical').length
            },
            {
              key: 'design_edit',
              name: isEnglish ? 'Design & Edit' : '设计',
              icon: Palette,
              count: skillsData.filter(s => s.group === 'design_edit').length
            },
            {
              key: 'arts_sports',
              name: isEnglish ? 'Arts & Sports' : '文体',
              icon: Music,
              count: skillsData.filter(s => s.group === 'arts_sports').length
            },
          ].map((category, index) => (
            <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full glass">
              <category.icon className="w-4 h-4 text-neon-green" />
              <span className="text-white/80 text-sm">{category.name}</span>
              <span className="text-white/40 text-sm">({category.count})</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}