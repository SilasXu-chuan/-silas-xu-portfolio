import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowUpRight,
  Menu,
  Pause,
  Play,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const experiences = [
  {
    date: "2026.02 - NOW",
    company: "星梦科技有限公司",
    role: "AIGC 短剧制作人",
    detail: "参与五人制作小组，覆盖剧本二创、分镜、AI 素材、剪辑、配乐与成片交付。",
  },
  {
    date: "2021.03 - 2026.03",
    company: "到家了网络科技有限公司",
    role: "店长 / 销售管理",
    detail: "从一线销售晋升至店长，负责门店运营、团队管理与业绩目标。",
  },
  {
    date: "2020.01 - 2021.02",
    company: "鹏冲科技有限公司",
    role: "副导演",
    detail: "负责内容制作、画面指导、脚本撰写与风格把控，全流程参与项目制作。",
  },
];

const capabilities = [
  {
    number: "01",
    title: "AI 影像全流程",
    text: "从文本理解、视觉设定、分镜拆解，到生成、筛选、剪辑与配乐，独立完成 AIGC 内容闭环。",
    tools: "可灵 / 即梦 / 里布TV / Luxreal / 剪映",
  },
  {
    number: "02",
    title: "内容策划与叙事",
    text: "把模糊想法拆成可执行的内容结构，兼顾平台节奏、叙事逻辑和视觉表达。",
    tools: "剧本二创 / 直播脚本 / 短视频",
  },
  {
    number: "03",
    title: "系统化与自动化",
    text: "善用 AI 助手和工作流减少重复劳动，让内容生产更快、更稳定、更可复用。",
    tools: "QClaw / Codex / Claude Code / 提示词",
  },
  {
    number: "04",
    title: "团队执行与交付",
    text: "五年销售及管理经验，理解目标、协作与结果之间的关系，能在紧周期中推进交付。",
    tools: "团队管理 / 项目推进 / 客户沟通",
  },
];

function useEnergyCards() {
  useEffect(() => {
    const selector = [
      ".panel",
      ".hero-metric",
      ".featured-card",
      ".stack-card",
      ".primary-button",
      ".ghost-button",
      ".contact-button",
    ].join(",");
    const cards = [...document.querySelectorAll(selector)];

    const updateGlow = (event) => {
      const card = event.currentTarget;
      const bounds = card.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const edgeDistance = Math.min(x, y, bounds.width - x, bounds.height - y);

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
      card.style.setProperty(
        "--edge-energy",
        String(Math.max(0.35, 1 - edgeDistance / 150)),
      );
    };

    const enter = (event) => {
      event.currentTarget.dataset.energyActive = "true";
      updateGlow(event);
    };

    const leave = (event) => {
      event.currentTarget.dataset.energyActive = "false";
      event.currentTarget.style.setProperty("--edge-energy", "0");
    };

    cards.forEach((card) => {
      card.classList.add("energy-card");
      if (!card.matches("a, button, .hero-metric")) {
        const spark = document.createElement("span");
        spark.className = "energy-spark";
        spark.setAttribute("aria-hidden", "true");
        spark.textContent = "✦";
        card.appendChild(spark);
      }
      card.addEventListener("pointerenter", enter);
      card.addEventListener("pointermove", updateGlow);
      card.addEventListener("pointerleave", leave);
    });

    return () => {
      cards.forEach((card) => {
        card.querySelector(":scope > .energy-spark")?.remove();
        card.removeEventListener("pointerenter", enter);
        card.removeEventListener("pointermove", updateGlow);
        card.removeEventListener("pointerleave", leave);
      });
    };
  }, []);
}

function usePortfolioMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    document.documentElement.classList.add("opening-active");
    const sectionObservers = [];

    const context = gsap.context(() => {
      gsap.defaults({ ease: "power4.out" });

      const opening = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          document.documentElement.classList.remove("opening-active");
          gsap.set(".opening-screen", { display: "none" });
          ScrollTrigger.refresh();
        },
      });

      opening
        .fromTo(
          ".opening-brand",
          { opacity: 0, y: 22, letterSpacing: "0.45em" },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.18em",
            duration: 0.8,
          },
        )
        .fromTo(
          ".opening-progress i",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.05, ease: "power2.inOut" },
          0.12,
        )
        .to(
          ".opening-brand",
          { opacity: 0, y: -16, duration: 0.38, ease: "power2.in" },
          1.05,
        )
        .to(
          ".opening-screen",
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.15,
            ease: "power4.inOut",
          },
          1.15,
        )
        .fromTo(
          ".hero-image, .hero-video",
          { scale: 1.16, filter: "brightness(0.28) saturate(0.6)" },
          {
            scale: 1.01,
            filter: "brightness(1) saturate(1)",
            duration: 2.2,
            ease: "power3.out",
          },
          1.05,
        )
        .fromTo(
          ".micro-badge",
          { opacity: 0, x: -45 },
          { opacity: 1, x: 0, duration: 0.75 },
          1.48,
        )
        .fromTo(
          ".hero-title-line > span",
          { yPercent: 125, scaleX: 0.72, skewY: 4 },
          {
            yPercent: 0,
            scaleX: 1,
            skewY: 0,
            duration: 1.35,
            stagger: 0.14,
            ease: "expo.out",
          },
          1.42,
        )
        .fromTo(
          ".hero-copy > p",
          { opacity: 0, y: 38 },
          { opacity: 1, y: 0, duration: 0.8 },
          2.05,
        )
        .fromTo(
          ".hero-actions > *",
          { opacity: 0, y: 34, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1 },
          2.15,
        )
        .fromTo(
          ".hero-metrics .hero-metric",
          { opacity: 0, y: 70, scaleY: 0.72, transformOrigin: "bottom" },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.95,
            stagger: 0.12,
            ease: "expo.out",
          },
          2.2,
        )
        .fromTo(
          ".hero-side > *",
          { opacity: 0, x: 95, rotateY: -12 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1.1,
            stagger: 0.14,
          },
          2.05,
        )
        .fromTo(
          ".hero-signature, .hero-scroll",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          2.55,
        );

      const revealSection = ({
        section,
        heading,
        cards,
        image,
        extras,
      }) => {
        const label = `${section} .section-label`;
        gsap.set(label, { opacity: 0, x: -60 });
        gsap.set(heading, {
          opacity: 0,
          y: 145,
          scaleY: 0.7,
          skewY: 3,
          transformOrigin: "left bottom",
        });
        if (cards) {
          gsap.set(cards, {
            opacity: 0,
            y: 110,
            scale: 0.94,
            rotateX: 7,
            transformOrigin: "center bottom",
          });
        }
        if (extras) gsap.set(extras, { opacity: 0, y: 70 });

        if (image) {
          gsap.fromTo(
            image,
            { yPercent: -7, scale: 1.08 },
            {
              yPercent: 7,
              scale: 1.02,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        }

        const target = document.querySelector(section);
        const observer = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            const timeline = gsap.timeline();
            timeline
              .to(label, { opacity: 1, x: 0, duration: 0.75 })
              .to(
                heading,
                {
                  opacity: 1,
                  y: 0,
                  scaleY: 1,
                  skewY: 0,
                  duration: 1.35,
                  ease: "expo.out",
                },
                0.08,
              );

            if (cards) {
              timeline.to(
                cards,
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  duration: 1.15,
                  stagger: 0.16,
                  ease: "power4.out",
                },
                0.48,
              );
            }

            if (extras) {
              timeline.to(
                extras,
                { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
                0.72,
              );
            }
            observer.disconnect();
          }
        }, {
          rootMargin: "0px 0px -18% 0px",
          threshold: 0.08,
        });
        if (target) observer.observe(target);
        sectionObservers.push(observer);
      };

      revealSection({
        section: "#about",
        heading: ".about-statement",
        cards: ".about-panels > .panel",
        extras: ".experience-panel, .experience-item",
        image: ".portrait-panel > img",
      });

      revealSection({
        section: "#work",
        heading: ".work-heading h2",
        cards: ".projects-grid > .project-card",
        extras: ".work-heading > p",
        image: ".sample-video-art video, .poster-art img, .short-drama-art .device, .lab-art",
      });

      revealSection({
        section: "#capabilities",
        heading: ".capability-intro h2",
        cards: ".capability-grid > .capability-card",
        extras: ".capability-intro > span",
      });

      gsap.set("#contact .section-label", { opacity: 0, x: -60 });
      gsap.set(".contact-content > span", { opacity: 0, x: -60 });
      gsap.set(".contact-content h2", {
        opacity: 0,
        y: 170,
        scaleX: 0.75,
        transformOrigin: "left",
      });
      gsap.set(".contact-bottom > *", { opacity: 0, y: 90 });

      const contactTarget = document.querySelector("#contact");
      const contactObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          gsap.timeline()
            .to("#contact .section-label", {
              opacity: 1,
              x: 0,
              duration: 0.7,
            })
            .to(
              ".contact-content > span",
              { opacity: 1, x: 0, duration: 0.7 },
              0.05,
            )
            .to(
              ".contact-content h2",
              {
                opacity: 1,
                y: 0,
                scaleX: 1,
                duration: 1.45,
                ease: "expo.out",
              },
              0.12,
            )
            .to(
              ".contact-bottom > *",
              { opacity: 1, y: 0, duration: 1.05, stagger: 0.18 },
              0.68,
            );
          contactObserver.disconnect();
        }
      }, {
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.08,
      });
      if (contactTarget) contactObserver.observe(contactTarget);
      sectionObservers.push(contactObserver);

      gsap.to(".hero-image", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, root);

    return () => {
      sectionObservers.forEach((observer) => observer.disconnect());
      context.revert();
      document.documentElement.classList.remove("opening-active");
    };
  }, [rootRef]);
}

function Logo() {
  return (
    <span className="logo">
      <span className="logo-symbol" aria-hidden="true">
        <i />
        <i />
      </span>
      <span className="logo-type">
        <b>SILAS XU</b>
        <small>PORTFOLIO</small>
      </span>
    </span>
  );
}

function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <i />
      <span>{number}</span>
      <span>/</span>
      <strong>{children}</strong>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    const sections = [...document.querySelectorAll("main section, footer")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateHeader = () => {
      const about = document.querySelector("#about");
      const threshold = about
        ? about.offsetTop - 90
        : window.innerHeight * 0.9;
      setFloating(window.scrollY >= threshold);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  const links = [
    ["home", "HOME"],
    ["about", "ABOUT"],
    ["work", "WORK"],
    ["capabilities", "CAPABILITIES"],
  ];

  return (
    <header className={`floating-header ${floating ? "is-floating" : ""}`}>
      <a href="#home" className="header-logo" onClick={() => setOpen(false)}>
        <Logo />
      </a>

      <nav className={`pill-nav ${open ? "is-open" : ""}`} aria-label="主导航">
        {links.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? "is-active" : ""}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>

      <a className="contact-button" href="#contact">
        CONTACT <ArrowUpRight size={15} />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "关闭导航" : "打开导航"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function HeroMetric({ value, suffix, label }) {
  return (
    <div className="hero-metric">
      <div>
        <strong>{value}</strong>
        <em>{suffix}</em>
      </div>
      <span>{label}</span>
    </div>
  );
}

function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlayback = () => {
      video.play().catch(() => {});
    };

    startPlayback();
    video.addEventListener("canplay", startPlayback);
    return () => video.removeEventListener("canplay", startPlayback);
  }, []);

  return (
    <section className="hero section-frame" id="home">
      <div className="hero-image" />
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={asset("assets/hero-bg.mp4")} type="video/mp4" />
      </video>
      <div className="hero-overlay" />
      <div className="grain" />

      <div className="hero-layout">
        <div className="hero-copy" data-reveal>
          <div className="micro-badge">
            <i /> AIGC / VISUAL STORYTELLING
          </div>
          <h1>
            <span className="hero-title-line"><span>AI Native</span></span>
            <span className="hero-title-line"><span>Visual Story</span></span>
            <span className="hero-title-line red"><span>On Demand.</span></span>
          </h1>
          <p>
            从脚本、分镜到 AI 生成与后期交付，
            <br />
            我把内容想法快速推进为可观看、可发布的真实作品。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#work">
              VIEW PROJECTS <ArrowUpRight size={16} />
            </a>
            <a className="ghost-button" href="#about">
              ABOUT SILAS
            </a>
          </div>

          <div className="hero-metrics">
            <HeroMetric value="80" suffix="+" label="AI 剧集上线" />
            <HeroMetric value="4" suffix="D" label="集中完成交付" />
            <HeroMetric value="5" suffix="Y" label="管理实战经验" />
          </div>
        </div>

        <aside className="hero-side" data-reveal>
          <div className="featured-card">
            <div className="card-micro">
              <span>FEATURED FRAME</span>
              <span>00:04</span>
            </div>
            <div className="featured-image">
              <img src={asset("assets/project-film.jpg")} alt="" />
            </div>
            <strong>80<em>+</em></strong>
            <p>AI 短剧成片上线</p>
          </div>

          <div className="stack-card">
            <span>CREATIVE SYSTEM</span>
            <strong>
              FULL
              <br />
              STACK
            </strong>
            <div className="stack-labels">
              <i>IDEA</i>
              <i>FRAME</i>
              <i>VIDEO</i>
              <i>EDIT</i>
            </div>
            <a href="#contact">START A PROJECT</a>
          </div>
        </aside>

        <div className="hero-signature">
          <span>SILAS XU</span>
          <strong>AI-NATIVE<br />CREATOR</strong>
        </div>
        <a className="hero-scroll" href="#about" aria-label="向下浏览">
          <ArrowDown size={17} />
        </a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="content-section about-section" id="about">
      <div className="content-shell">
        <SectionLabel number="01">ABOUT SILAS</SectionLabel>

        <h2 className="about-statement" data-reveal>
          我用 <span>AI 设计并生产内容</span>，
          <br />
          但核心始终是人的感受与真实结果。
        </h2>

        <div className="about-panels">
          <article className="portrait-panel panel" data-reveal>
            <img src={asset("assets/about-portrait-v2.jpg")} alt="许川 AI 视觉创作形象" />
            <div className="portrait-shade" />
            <div className="portrait-bottom">
              <span>AVAILABLE FOR SELECTED PROJECTS</span>
              <strong>
                Based in
                <br />
                Huizhou / Shenzhen
              </strong>
              <a href="#contact">START A PROJECT</a>
            </div>
          </article>

          <article className="bio-panel panel" data-reveal>
            <div className="bio-name">
              <h3>许川</h3>
              <span>SILAS XU</span>
            </div>
            <div className="bio-role">AIGC CREATOR / CONTENT MAKER</div>
            <h4>
              不只是使用工具，
              <br />
              而是建立新的创作方式。
            </h4>
            <p>
              我从销售与团队管理转向 AIGC 内容创作，真实业务经验让我更关注结果，
              而 AI 让我能以更短的路径，把概念推进到可观看、可发布、可交付的作品。
            </p>

            <div className="bio-stats">
              <HeroMetric value="80" suffix="集" label="AI 短剧成片上线" />
              <HeroMetric value="4" suffix="天" label="五人小组集中交付" />
              <HeroMetric value="5" suffix="年" label="销售与团队管理经验" />
            </div>

            <div className="bio-contact">
              <a href="tel:19132601721">T. 191 3260 1721</a>
              <span>ID. chengwen-16</span>
              <span>BASE. 惠州 / 深圳 / 重庆</span>
            </div>
          </article>
        </div>

        <div className="experience-panel panel" data-reveal>
          <div className="experience-head">
            <span>EXPERIENCE</span>
            <span>03 ROLES / 06 YEARS</span>
          </div>
          {experiences.map((item, index) => (
            <article
              className={`experience-item ${index === 1 ? "is-highlighted" : ""}`}
              key={item.company}
            >
              <time>{item.date}</time>
              <div>
                <h3>{item.company}</h3>
                <span>{item.role}</span>
              </div>
              <p>{item.detail}</p>
              <ArrowUpRight size={18} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShortDramaArtwork() {
  return (
    <div className="short-drama-art artwork">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="device device-large">
        <img src={asset("assets/project-short-drama.jpg")} alt="" />
        <span>SCENE 032</span>
      </div>
      <div className="device device-small">
        <img src={asset("assets/project-short-drama.jpg")} alt="" />
        <span>80 / 80</span>
      </div>
      <p>A FILM MADE WITH MACHINES<br />AND HUMAN INTENT.</p>
    </div>
  );
}

function AutomationArtwork() {
  return (
    <div className="automation-art artwork">
      <div className="automation-title">
        AUTOMATION
        <br />
        IS RUNNING
      </div>
      <div className="flow-line flow-one" />
      <div className="flow-line flow-two" />
      <div className="flow-node node-one"><b>01</b><span>TOPIC</span></div>
      <div className="flow-node node-two"><b>02</b><span>COPY</span></div>
      <div className="flow-node node-three"><b>03</b><span>POST</span></div>
      <div className="flow-glow" />
    </div>
  );
}

function LabArtwork() {
  return (
    <div className="lab-art artwork">
      <span className="lab-plus">+</span>
      <strong>MAKE</strong>
      <strong>MORE</strong>
      <small>IDEA → SYSTEM → OUTPUT</small>
      <div className="lab-rings" />
    </div>
  );
}

function SampleVideoArtwork() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sample-video-art artwork">
      <video
        ref={videoRef}
        src={asset("assets/ai-short-sample.mp4")}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls
      />
      <div className="sample-video-overlay">
        <span>AI SHORT SAMPLE</span>
        <strong>REAL FOOTAGE / PORTFOLIO CUT</strong>
      </div>
    </div>
  );
}

function PosterArtwork() {
  return (
    <div className="poster-art artwork">
      <img src={asset("assets/ai-short-drama-poster-silas-v2.png")} alt="AI 短剧样片制作报价海报" />
      <div className="poster-art-label">
        <span>SERVICE VISUAL</span>
        <strong>POSTER / RATE CARD</strong>
      </div>
    </div>
  );
}

function ProjectCard({ index, title, subtitle, meta, tags, children, wide = false }) {
  return (
    <article className={`project-card panel ${wide ? "is-wide" : ""}`} data-reveal>
      {children}
      <div className="project-info">
        <div className="project-meta">
          <span>{index}</span>
          <span>{meta}</span>
        </div>
        <div className="project-title-row">
          <div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
          <a href="#contact" aria-label={`了解${title}`}>
            <ArrowUpRight size={20} />
          </a>
        </div>
        <div className="project-tags">
          {tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section className="content-section work-section" id="work">
      <div className="content-shell">
        <SectionLabel number="02">SELECTED WORK</SectionLabel>

        <div className="work-heading" data-reveal>
          <h2>
            WORK THAT
            <br />
            <span>MOVES.</span>
          </h2>
          <p>
            当前作品重点聚焦 AI 短剧、内容自动化与 AI 辅助创作。
            从样片、分镜到成片交付，用视觉结果证明创作能力。
          </p>
        </div>

        <div className="projects-grid">
          <ProjectCard
            index="01"
            title="AI 短剧样片"
            subtitle="视觉风格、镜头节奏与成片质感展示"
            meta="AIGC SAMPLE / 2026"
            tags={["AI VIDEO", "样片展示", "镜头语言", "成片交付"]}
            wide
          >
            <SampleVideoArtwork />
          </ProjectCard>

          <ProjectCard
            index="02"
            title="AI 短剧服务视觉"
            subtitle="用于私域转化的高端服务报价主视觉"
            meta="SERVICE POSTER / 2026"
            tags={["视觉海报", "报价单", "商业转化", "AI BRANDING"]}
          >
            <PosterArtwork />
          </ProjectCard>

          <ProjectCard
            index="03"
            title="80 集 AI 短剧"
            subtitle="从剧本到上线的完整内容生产链路"
            meta="AIGC SERIES / 2026"
            tags={["剧本二创", "分镜设计", "AI VIDEO", "后期制作"]}
          >
            <ShortDramaArtwork />
          </ProjectCard>

          <ProjectCard
            index="04"
            title="小红书自动运营"
            subtitle="用 QClaw 串联选题、文案与发布流程"
            meta="AUTOMATION / 2025"
            tags={["QCLAW", "内容营销", "自动化", "SOCIAL"]}
          >
            <AutomationArtwork />
          </ProjectCard>

          <ProjectCard
            index="05"
            title="AI 内容实验室"
            subtitle="PPT 批量生成、直播脚本与短视频内容设计"
            meta="CONTENT SYSTEM / ONGOING"
            tags={["PPT DESIGN", "直播脚本", "剪辑", "AI WORKFLOW"]}
            wide
          >
            <LabArtwork />
          </ProjectCard>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="content-section capabilities-section" id="capabilities">
      <div className="content-shell">
        <SectionLabel number="03">CAPABILITIES</SectionLabel>

        <div className="capability-intro" data-reveal>
          <span>WHAT I BRING TO THE TABLE</span>
          <h2>
            从一个想法，
            <br />
            到一套<span>可交付系统。</span>
          </h2>
        </div>

        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability-card panel" key={item.number} data-reveal>
              <div className="capability-top">
                <span>{item.number}</span>
                <i>✳</i>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <small>{item.tools}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contact-section section-frame" id="contact">
      <div className="contact-noise grain" />
      <div className="contact-shell">
        <SectionLabel number="04">CONTACT</SectionLabel>
        <div className="contact-content" data-reveal>
          <span>HAVE A PROJECT OR AN IDEA?</span>
          <h2>
            LET'S MAKE
            <br />
            <strong>IT REAL.</strong>
          </h2>
        </div>
        <div className="contact-bottom">
          <p>
            正在寻找 AIGC 视频创作、AI 内容生产与创意协作机会。
            欢迎带着一个想法来找我。
          </p>
          <a className="phone-card panel" href="tel:19132601721">
            <span>CALL ME</span>
            <strong>191 3260 1721</strong>
            <ArrowUpRight size={24} />
          </a>
        </div>
        <div className="contact-meta">
          <span>WECHAT / chengwen-16</span>
          <span>HUIZHOU · SHENZHEN · CHONGQING</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}

function MotionWidget() {
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.38;
    const unlockEvents = [
      "mousedown",
      "pointerdown",
      "click",
      "pointerup",
      "touchend",
      "keydown",
    ];

    const startAudio = async () => {
      try {
        await audio.play();
        setPlaying(true);
        setBlocked(false);
        unlockEvents.forEach((eventName) => {
          window.removeEventListener(eventName, unlockAudio);
        });
      } catch {
        setBlocked(true);
      }
    };

    const unlockAudio = () => {
      if (!audio.paused) return;
      startAudio();
    };

    startAudio();
    unlockEvents.forEach((eventName) => {
      window.addEventListener(eventName, unlockAudio, { passive: true });
    });

    return () => {
      unlockEvents.forEach((eventName) => {
        window.removeEventListener(eventName, unlockAudio);
      });
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    audio.play().then(() => {
      setPlaying(true);
      setBlocked(false);
    }).catch(() => setBlocked(true));
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={asset("assets/Slippin-PK.mp3")}
        autoPlay
        preload="auto"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        className={`motion-widget ${playing ? "is-playing" : ""}`}
        type="button"
        onClick={toggle}
        aria-label={playing ? "暂停背景音乐" : "播放背景音乐"}
      >
        <span className="sound-bars" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
        <span>
          <strong>SLIPPIN · PK</strong>
          <small>
            {playing ? "PLAYING / LOOP" : blocked ? "TAP TO PLAY" : "PAUSED"}
          </small>
        </span>
        <b>{playing ? <Pause size={12} /> : <Play size={12} />}</b>
      </button>
      {blocked && !playing && (
        <button
          className="audio-unlock"
          type="button"
          onClick={toggle}
          aria-label="点击开启网站背景音乐"
        >
          <span>♪</span>
          点击开启音乐
        </button>
      )}
    </>
  );
}

function App() {
  const appRef = useRef(null);
  useEnergyCards();
  usePortfolioMotion(appRef);

  return (
    <div ref={appRef}>
      <div className="opening-screen" aria-hidden="true">
        <div className="opening-brand">SILAS XU / AI NATIVE CREATOR</div>
        <div className="opening-progress"><i /></div>
      </div>
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Capabilities />
      </main>
      <Contact />
      <MotionWidget />
    </div>
  );
}

export default App;
