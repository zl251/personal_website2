import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Cpu, Target, Briefcase } from 'lucide-react';
import { withBase } from "@/utils/asset";
import type { Language } from '@/types/language';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: '双模态伪装目标检测系统研发(某国家重点研发项目，100w)',
    category: '硕士项目',
    description:
      '依托可见-红外双模态车载与机载平台，构建特种伪装目标检测及跟踪系统，实现对野外伪装目标的判别与定位。本项目测精度达 88.24%，检测帧率≥50FPS，系统硬件较现有相关设备成本降低约36%。跟随某安全部门在多地进行实战，取得显著成效。',
    technologies: ['PyTorch', 'OpenCV', 'C/C++', 'Qt'],
    icon: Target,
    color: 'from-neon-green to-emerald-500',
    images: [withBase("./images/chezai.gif")],
  },
  {
    title: '低空无人机反制系统研发（某国防科研项目，87w）',
    category: '硕士项目',
    description:
      '依托可见-红外球机平台与网捕无人机，搭建低空无人机反制系统，实现对"黑飞"无人机的检测、跟踪与反制。项目实现全天候检测精度82.37%，构建"发现-锁定-追击-捕获"的全链路处理能力，系统端到端延迟控制在40ms以内。',
    technologies: ['深度学习', '深度学习', 'TCP通信'],
    icon: Target,
    color: 'from-neon-green to-emerald-500',
    images: [withBase("./images/fw_4.gif")],
  },
  {
    title: '福建省低空经济保障体系发展战略研究',
    category: '硕士项目',
    description:
      '本项目向福建省委省政府建议构建"基础设施、智能控制、法规标准、应用服务"四位一体的低空安全保障体系，并提出系统性政策建议。研究成果获院士专家顾问组一致认可，为福建低空经济安全发展提供了战略性决策支撑。',
    technologies: ['市场调研', '政策提议'],
    icon: Target,
    color: 'from-neon-green to-emerald-500',
    images: [withBase("./images/lowsky.jpg")],
  },
  {
    title: '面向城市道路目标的机载双光谱配准与检测方法研究',
    category: '硕士毕业课题',
    description:
      '针对机载视角下因模态差异与场景深度复杂导致的图像配准困难，以及视角多变引发的目标特征提取不稳定的问题，提出高效跨模态特征点匹配的空间平面分区配准，设计动态上下文感知的双模态新型决策级融合检测模型等创新理念与技术。',
    technologies: ['图像配准', '目标检测', '人工智能', '无人机技术'],
    icon: Briefcase,
    color: 'from-orange-400 to-red-500',
    images: [withBase("./images/suoshi.png")],
  },
  {
    title: '2022中国大学生电动方程式大赛全国一等奖',
    category: '学科竞赛',
    description:
      '于2021年-2023年，加入福州大学K-night赛车队，于2022年中国大学生电动方程式大赛上，作为车队核心队员斩获全国一等奖。本人在车队中担任传动组长，负责赛车传动系统和冷却系统的设计、制造、装配，以及担任车队新闻官和电车赛车手。',
    technologies: ['传动系统', '冷却系统', '仿真分析', '机械装配'],
    icon: Cpu,
    color: 'from-neon-cyan to-blue-500',
    images: [withBase("./images/race_car.jpg")],
  },
  {
    title: '道路监控中远距离车辆车牌超分辨率重建与检测研究',
    category: '本科毕业设计',
    description:
      '跟随当下机械技术发展的需要，于本科毕业设计开始接触机器视觉与计算机视觉相关内容的研究。初步进行车牌超分研究，进行数据集设计与制作，网络训练，模型修改，图像分析等学习与工作，为研究生从事相关领域的研究打下良好基础。',
    technologies: ['图像超分', 'PyTorch', '深度学习', '文字识别'],
    icon: Code2,
    color: 'from-neon-purple to-violet-500',
    images: [withBase("./images/super_resolution.png")],
  },
  {
    title: '传统机械类课程设计',
    category: '毕业设计辅导',
    description:
      '在本科阶段，拥有良好机械工程人员的基本素质。曾经在机械类的课程设计中，设计过赛车传动与冷却结构、减速器、膜片弹簧离合器等机械结构，包括参数校准与设计，零件图与装配图绘制（CAD制图与手绘），三维建模等。',
    technologies: ['CAD', 'SolidWorks', 'Matlab', '机械制图'],
    icon: Code2,
    color: 'from-neon-purple to-violet-500',
    images: [withBase("./images/jixie.png"), withBase("./images/linjiantu.png"), withBase("./images/Intelligent_fire_alarm_system_effect.png")],
  },
  {
    title: '志愿者服务',
    category: '学生活动',
    description:
      '在本科及硕士阶段积极参与志愿服务，主动投身校园及社会公益实践，多次参加校园活动保障、社区服务及公益宣传等工作。服务过程中认真负责，积极配合团队完成任务，展现出良好的社会责任感和奉献精神。',
    technologies: [],
    icon: Cpu,
    color: 'from-neon-cyan to-blue-500',
    images: [withBase("./images/volunteer.jpg")],
  },
];

// 英文翻译，与 projects 数组一一对应
const projectTranslationsEn: Array<{
  title: string;
  category: string;
  description: string;
  technologies: string[];
}> = [
  {
    title: 'Dual-Modal Special Camouflage Target Detection',
    category: "Master's Project",
    description:
      'Participated in the 6th World Photonics Conference 2025 in Beijing, presented one EI-indexed paper on camouflage target detection, and engaged in academic exchanges with researchers in optics and photonics.',
    technologies: ['Venue: Beijing National Convention Center', '1 EI paper presented'],
  },
  {
    title: 'Anti-UAV Visual Detection & Tracking',
    category: "Master's Project",
    description:
      'Conducted vision-based detection and tracking research for UAV targets, exploring recognition and localization techniques for low-slow-small targets in complex airspace environments.',
    technologies: ['Object Detection', 'Visual Tracking', 'Low-Slow-Small Targets'],
  },
  {
    title: 'Strategic Research on Low-Altitude Economy Security System for Fujian Province',
    category: "Master's Project",
    description:
      'Proposed a four-pillar low-altitude security system covering infrastructure, intelligent control, regulatory standards, and application services. The research received unanimous approval from the Expert Advisory Panel and provided strategic support for Fujian\'s low-altitude economy development.',
    technologies: ['Market Research', 'Policy Proposal'],
  },
  {
    title: 'Airborne Dual-Spectral Registration & Detection for Urban Road Targets',
    category: "Master's Thesis",
    description:
      'Addressed registration challenges caused by modal differences and complex scene depths in aerial views, along with unstable feature extraction due to varying perspectives. Proposed an efficient cross-modal spatial partitioning registration method and a context-aware dual-modal decision-level fusion detection model.',
    technologies: ['Image Registration', 'Object Detection', 'AI', 'UAV Technology'],
  },
  {
    title: 'Formula Student Electric Vehicle China 2022 — National First Prize',
    category: 'Competition',
    description:
      'Joined Fuzhou University K-night Racing Team (2021–2023) and won the National First Prize at Formula Student Electric Vehicle China 2022. Served as Drivetrain Team Leader, responsible for design, manufacturing, and assembly of the transmission and cooling systems, also acted as team press officer and electric race car driver.',
    technologies: ['Transmission System', 'Cooling System', 'Simulation', 'Mechanical Assembly'],
  },
  {
    title: 'Super-Resolution & Detection for Long-Range Vehicle License Plates',
    category: "Undergraduate Thesis",
    description:
      'Pioneered research in machine vision and computer vision for undergraduate thesis. Conducted license plate super-resolution study covering dataset design, network training, model tuning, and image analysis, laying a solid foundation for graduate research in related fields.',
    technologies: ['Image Super-Resolution', 'PyTorch', 'Deep Learning', 'OCR'],
  },
  {
    title: 'Mechanical Engineering Course Designs',
    category: 'Thesis Mentorship',
    description:
      'Demonstrated strong mechanical engineering fundamentals through multiple course projects, including racing transmission and cooling structures, gear reducers, and diaphragm spring clutches — covering parameter calibration, part and assembly drawing (both CAD and hand-drawn), and 3D modeling.',
    technologies: ['CAD', 'SolidWorks', 'Matlab', 'Mechanical Drawing'],
  },
  {
    title: 'Volunteer Service',
    category: 'Student Activities',
    description:
      'Actively participated in volunteer activities throughout undergraduate and graduate studies, engaging in campus event support, community service, and public welfare outreach. Demonstrated strong sense of social responsibility and dedication.',
    technologies: [],
  },
];

interface ProjectsProps {
  language: Language;
}

export default function Projects({ language }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeMedia, setActiveMedia] = useState<Record<number, number>>({});
  const isEnglish = language === 'en';
  const projectItems = isEnglish
    ? projects.map((project, index) => ({
        ...project,
        ...projectTranslationsEn[index],
      }))
    : projects;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-title',
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
        '.project-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.projects-grid',
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
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-bg" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-green/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neon-cyan/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="projects-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {isEnglish ? (
              <>
                Project <span className="text-gradient">Experience</span>
              </>
            ) : (
              <>
                项目<span className="text-gradient">经历</span>
              </>
            )}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            {isEnglish
              ? 'Engineering projects, competitions, course designs, and graduation works'
              : '工程项目、竞赛、课程设计与毕业设计'}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid md:grid-cols-2 gap-6">
          {projectItems.map((project, index) => {
            const images = project.images || [];
            const hasMultipleImages = images.length > 1;
            const currentImageIndex = activeMedia[index] || 0;

            return (
              <div
                key={index}
                className="project-card group relative glass rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
              >
                {/* Media area */}
                <div className="relative aspect-video overflow-hidden">
                  {images.length > 0 ? (
                    <>
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={images[currentImageIndex]}
                        alt={project.title}
                        loading="lazy"
                      />
                      {/* 多图指示器 */}
                      {hasMultipleImages && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                          {images.map((_, i) => (
                            <button
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMedia((prev) => ({ ...prev, [index]: i }));
                              }}
                              className={`w-2 h-2 rounded-full transition-all ${
                                i === currentImageIndex
                                  ? 'bg-white w-4'
                                  : 'bg-white/40 hover:bg-white/70'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    // 无图片时的占位
                    <>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <project.icon
                            className={`w-16 h-16 mx-auto mb-2 bg-gradient-to-br ${project.color} bg-clip-text`}
                            style={{
                              color: 'transparent',
                              backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                            }}
                          />
                          <p className="text-white/30 text-sm">
                            {isEnglish ? 'Project Preview' : '项目图片'}
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-sm text-white/80 border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-colors mb-3">
                    {project.title}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs rounded-md bg-white/5 text-white/60 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl -z-10`}
                />
              </div>
            );
          })}
        </div>

        {/* Summary stats */}
        <div className="mt-16 glass rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '3', label: isEnglish ? 'Project Entries' : '项目经历' },
              { value: '3', label: isEnglish ? 'Thesis Projects' : '毕业设计' },
              { value: '1', label: isEnglish ? 'Competition Project' : '竞赛项目' },
              { value: '1', label: isEnglish ? 'Core Toolsets' : '志愿服务' },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}