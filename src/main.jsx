import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  Menu,
  MessageCircle,
  Monitor,
  Search,
  ShoppingBag,
  X
} from "lucide-react";
import "./styles.css";

const WHATSAPP = "https://wa.me/918589915869";
const EMAIL = "mailto:info.umarulfarook@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/farook7/";

/* PROJECT DATA
   Each website has one category.
   Only HUGG Sleep is currently classified as confirmed e-commerce.
*/
const projects = [
  { name: "Brightness", url: "https://brightness.ae/", category: "Logistics & Transportation", type: "Business website", letter: "B", tone: "peach", summary: "Freight, transport and logistics services." },
  { name: "Truck Pickup Rental", url: "https://truckpickuprental.com/", category: "Logistics & Transportation", type: "Service website", letter: "T", tone: "blue", summary: "Truck rental and transport services." },
  { name: "HLS", url: "https://hls.ae/", category: "Logistics & Transportation", type: "Business website", letter: "H", tone: "lavender", summary: "Logistics and transport business website." },

  { name: "Castlekey Realty", url: "https://castlekeyreality.ae/", category: "Real Estate & Property", type: "Real estate website", letter: "C", tone: "sand", summary: "Real estate services and property enquiries." },
  { name: "Think Properties", url: "https://thinkproperties.ae/", category: "Real Estate & Property", type: "Real estate website", letter: "T", tone: "lilac", summary: "Property-focused real estate website." },
  { name: "So Living Properties", url: "https://solivingproperties.com/", category: "Real Estate & Property", type: "Real estate website", letter: "S", tone: "mint", summary: "Real estate brand and property services." },
  { name: "Penguin Estate", url: "https://penguinestate.com/", category: "Real Estate & Property", type: "Real estate website", letter: "P", tone: "blue", summary: "Property discovery and real estate services." },
  { name: "Horizon Hills Real Estate", url: "https://horizonhillsrealestate.com/", category: "Real Estate & Property", type: "Real estate website", letter: "H", tone: "green", summary: "Real estate business website." },
  { name: "AVCI Real Estate", url: "https://avcirealestate.com/", category: "Real Estate & Property", type: "Real estate website", letter: "A", tone: "rose", summary: "Real estate services and property enquiries." },

  { name: "Slitis Rental", url: "https://slitisrental.com/", category: "Equipment Rental & Industrial Services", type: "Service website", letter: "S", tone: "blue", summary: "Equipment rental and related industrial services." },
  { name: "Nature's Nook", url: "https://naturesnook.ae/", category: "Nature & Terrarium Design", type: "Business website", letter: "N", tone: "green", summary: "Terrarium and nature-inspired display products." },
  { name: "Aliyah Bunkering", url: "https://aliyahbunkering.com/", category: "Energy & Marine Services", type: "Business website", letter: "A", tone: "sand", summary: "Marine fuel and bunkering services." },
  { name: "Multiwood UAE", url: "https://multiwooduae.ae/", category: "Furniture & Interiors", type: "Product website", letter: "M", tone: "peach", summary: "Furniture and interior product website." },
  { name: "Wonder Valley Munnar", url: "https://wondervalleymunnar.com/", category: "Travel & Hospitality", type: "Hospitality website", letter: "W", tone: "mint", summary: "Hospitality and destination experience website." },
  { name: "Pelican Migration", url: "https://pelicanmigration.com/", category: "Migration & Consultancy", type: "Consultancy website", letter: "P", tone: "lavender", summary: "Migration consultancy information and enquiry website." },
  { name: "HUGG Sleep", url: "https://huggsleep.com/", category: "E-commerce", type: "Shopify store", letter: "H", tone: "blue", summary: "Online store for sleep and lifestyle products." },

  { name: "PA Graphics", url: "https://pagraphics.com/", category: "Creative & Business Services", type: "Business website", letter: "P", tone: "rose", summary: "Creative and business services website." },
  { name: "Arada Logistics", url: "https://aradalogistics.com/", category: "Logistics & Transportation", type: "Business website", letter: "A", tone: "sand", summary: "Logistics business website." },
  { name: "Oscar Middle East", url: "https://oscarmiddleast.com/", category: "Business & Professional Services", type: "Business website", letter: "O", tone: "lilac", summary: "Corporate website for a regional business." },
  { name: "Flyfit", url: "https://flyfit.ae/", category: "Fitness & Wellness", type: "Wellness website", letter: "F", tone: "mint", summary: "Fitness and wellness brand website." },
  { name: "J7 Salon", url: "https://j7salon.com/", category: "Beauty & Personal Care", type: "Salon website", letter: "J", tone: "rose", summary: "Salon services and customer enquiries." },

  { name: "Illuminance Lighting", url: "https://illuminancelighting.com/", category: "Lighting & Electrical Solutions", type: "Business website", letter: "I", tone: "peach", summary: "Lighting products and lighting solutions." },
  { name: "Yamuna Builders", url: "https://yamunabuilders.com/", category: "Construction & Engineering", type: "Construction website", letter: "Y", tone: "sand", summary: "Construction and building business." },
  { name: "Electrical Network", url: "https://electrical-network.com/", category: "Lighting & Electrical Solutions", type: "Business website", letter: "E", tone: "blue", summary: "Electrical services and solutions." },
  { name: "KMX", url: "https://kmx.ae/", category: "Logistics & Transportation", type: "Business website", letter: "K", tone: "blue", summary: "Logistics, warehousing and distribution services." },
  { name: "Riviera Supermarket", url: "https://rivierasupermarket.ae/", category: "Retail & Wholesale", type: "Retail website", letter: "R", tone: "green", summary: "Supermarket and grocery supply business." },
  { name: "Royal Trade Container", url: "https://royaltradecontainer.com/", category: "Container Trading & Logistics", type: "Business website", letter: "R", tone: "sand", summary: "Container trading and related services." },
  { name: "TIESCSP", url: "https://tiescsp.com/", category: "Business & Professional Services", type: "Business website", letter: "T", tone: "lavender", summary: "Business website; specific service category needs verification." },
  { name: "Falcon Vision Consulting", url: "http://falconvision-consulting.com/", category: "Business & Professional Services", type: "Consultancy website", letter: "F", tone: "blue", summary: "Consultancy business website." },
  { name: "AJA", url: "https://aja.ae/", category: "Legal & Professional Services", type: "Business website", letter: "A", tone: "rose", summary: "Legal and professional services website." },
  { name: "Integrated Business", url: "https://integratedbusiness.ae/", category: "Business & Professional Services", type: "Business website", letter: "I", tone: "mint", summary: "Business process and outsourced services." },
  { name: "Positive Moves", url: "https://www.positivemoves.com/", category: "Recruitment & Executive Search", type: "Business website", letter: "P", tone: "lilac", summary: "Executive search and leadership recruitment." },

  { name: "Kate Interiors", url: "https://kateinteriors.in/", category: "Architecture & Interiors", type: "Interior design website", letter: "K", tone: "peach", summary: "Interior design business website." },
  { name: "Pearl Decor", url: "https://pearldecor.ae/", category: "Architecture & Interiors", type: "Interior design website", letter: "P", tone: "rose", summary: "Décor and interiors business website." },
  { name: "Watix", url: "https://watix.ae/", category: "Architecture & Interiors", type: "Business website", letter: "W", tone: "blue", summary: "Business website; precise service category needs verification." },
  { name: "DK Home Refurbishment", url: "https://dkhomerefurbishment.co.uk/", category: "Architecture & Interiors", type: "Service website", letter: "D", tone: "sand", summary: "Home refurbishment services." },
  { name: "Vigilant Kitchens", url: "https://vigilantkitchens.com/", category: "Architecture & Interiors", type: "Business website", letter: "V", tone: "green", summary: "Kitchen design and related services." },
  { name: "JAC Interior Fitout", url: "https://jacinteriorfitout.com/", category: "Architecture & Interiors", type: "Business website", letter: "J", tone: "lilac", summary: "Interior fit-out services." },
  { name: "Cardoso", url: "https://cardoso.ae/", category: "Architecture & Interiors", type: "Business website", letter: "C", tone: "blue", summary: "Design and interiors business website." },

  { name: "ABC Broast", url: "https://abcbroast.com/", category: "Food & Beverage", type: "Restaurant website", letter: "A", tone: "peach", summary: "Restaurant and food services website." },
  { name: "Aladdin Shawarma", url: "https://aladdinshawarma.in/", category: "Food & Beverage", type: "Restaurant website", letter: "A", tone: "rose", summary: "Shawarma and food business website." },
  { name: "Khaleez", url: "https://khaleez.com/", category: "Food & Beverage", type: "Restaurant website", letter: "K", tone: "sand", summary: "Food and catering business website." },

  { name: "Almond Blossom", url: "https://almondblossom.live/", category: "Healthcare & Wellness", type: "Wellness website", letter: "A", tone: "mint", summary: "Wellness and care services website." },
  { name: "Fluent Center", url: "https://fluentcenter.ae/", category: "Healthcare & Wellness", type: "Service website", letter: "F", tone: "blue", summary: "Therapy and professional support services." },
  { name: "WellB Align", url: "https://wellbalign.ae/", category: "Healthcare & Wellness", type: "Wellness website", letter: "W", tone: "green", summary: "Wellness-focused business website." },
  { name: "Dr Ayat Mekki", url: "https://drayatmekki.com/", category: "Healthcare & Wellness", type: "Professional website", letter: "D", tone: "lilac", summary: "Professional healthcare information and services." },
  { name: "Lloyd & Co", url: "https://lloyd.ae/", category: "Insurance & Risk Advisory", type: "Business website", letter: "L", tone: "sand", summary: "Insurance brokerage and risk advisory." },
  { name: "Almond Blossoms Care", url: "https://almondblossoms.care/", category: "Healthcare & Wellness", type: "Care website", letter: "A", tone: "rose", summary: "Care and wellness services website." },

  { name: "ESHcol", url: "https://eshcol.ae/", category: "Construction & Engineering", type: "Business website", letter: "E", tone: "blue", summary: "Engineering business website; specific service details need verification." },
  { name: "The Liv Landscape", url: "https://thelivlandscape.com/", category: "Landscaping & Outdoor Living", type: "Service website", letter: "L", tone: "green", summary: "Landscaping and outdoor living services." },
  { name: "EDDE", url: "https://eddeuae.com/", category: "Carpentry, Furniture & Fit-Out", type: "Business website", letter: "E", tone: "mint", summary: "Carpentry, joinery and interior fit-out services." },
  { name: "APTCH Holiday Homes", url: "https://aptcholidayhomes.com/", category: "Travel & Hospitality", type: "Hospitality website", letter: "A", tone: "lilac", summary: "Holiday home accommodation and guest enquiries." },
  { name: "MKM Strategies", url: "https://mkmstrategies.ae/", category: "Investment & Finance", type: "Business website", letter: "M", tone: "sand", summary: "Investment and financial strategy services; verify specific offering." },
  { name: "Popular DXB", url: "https://populardxb.com/", category: "Automotive & Auto Parts", type: "Automotive website", letter: "P", tone: "blue", summary: "Automotive parts and related products; online checkout not confirmed." },
  { name: "Paris Dakar", url: "https://parisdakarwb.com/", category: "Automotive & Auto Parts", type: "Business website", letter: "P", tone: "peach", summary: "Vehicle-related business website; specific offering needs verification." },

  // These are different URLs from the similar real-estate entries above.
  { name: "Castlkey Realty", url: "https://castlkeyrealty.com/", category: "Real Estate & Property", type: "Real estate website", letter: "C", tone: "sand", summary: "Real estate website; verify whether this is a separate project." },
  { name: "Horizon Hills", url: "https://horizonhills.ae/", category: "Real Estate & Property", type: "Real estate website", letter: "H", tone: "green", summary: "Real estate website; verify whether this is a separate project." },
  { name: "AVCI Real Estate", url: "https://avci.ae/", category: "Real Estate & Property", type: "Real estate website", letter: "A", tone: "rose", summary: "Real estate website; verify whether this is a separate project." }
];

const categories = [
  "All",
  ...new Set(projects.map((project) => project.category))
];

const experience = [
  {
    number: "01",
    date: "Feb 2026 – Present",
    role: "WordPress & Shopify Developer | Technical SEO",
    company: "Mantra IT Solutions",
    details: "Developing and maintaining client websites, building custom sections, supporting e-commerce experiences, handling migrations and implementing technical SEO improvements."
  },
  {
    number: "02",
    date: "Jan 2025 – Feb 2026",
    role: "WordPress Developer",
    company: "Previous experience",
    details: "Worked on responsive WordPress websites, page-builder layouts, website maintenance, content updates and on-page SEO tasks."
  }
];

const skills = [
  "WordPress",
  "Shopify",
  "Elementor",
  "WP-Bakery",
  "WooCommerce",
  "Technical SEO",
  "Responsive Design",
  "Website Migration",
  "Google Analytics 4",
  "Google Tag Manager",
  "Search Console",
  "HTML & CSS",
  "JavaScript"
];

function Reveal({ children, className = "", delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const id = useMemo(
    () => `reveal-${Math.random().toString(36).slice(2)}`,
    []
  );

  useEffect(() => {
    const node = document.querySelector(`[data-reveal-id="${id}"]`);
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(node);
      }
    }, { threshold: 0.12 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [id]);

  return (
    <div
      data-reveal-id={id}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#home" onClick={close}>
        FRK<span>.</span>
      </a>

      <button
        className="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav className={open ? "nav-links nav-open" : "nav-links"}>
        <a href="#work" onClick={close}>Work</a>
        <a href="#about" onClick={close}>About</a>
        <a href="#experience" onClick={close}>Experience</a>
        <a href="#skills" onClick={close}>Skills</a>
      </nav>

      <a
        className="button button-dark header-cta"
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
      >
        Let’s Talk <ArrowUpRight size={15} />
      </a>
    </header>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Reveal className="project-reveal" delay={(index % 3) * 70}>
      <article className="project-card">
        <a
          className="project-art-link"
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.name} website`}
        >
          <div className={`project-art tone-${project.tone}`}>
            <div className="art-topline">
              <span>{String(index + 1).padStart(2, "0")} / PROJECT</span>
              <ExternalLink size={16} />
            </div>

            <div className="art-orb">
              <span>{project.letter}</span>
            </div>

            <div className="art-bottomline">
              <span>{project.type}</span>
              <ArrowUpRight size={17} />
            </div>
          </div>
        </a>

        <div className="project-info">
          <div>
            <h3>{project.name}</h3>
            <p>{project.category}</p>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${project.name}`}
            className="project-arrow"
          >
            <ArrowUpRight size={19} />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;

    return (
      project.category.trim().toLowerCase() ===
      activeCategory.trim().toLowerCase()
    );
  });

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 12);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="page-shell">
      <Header />

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-glow hero-glow-green"></div>
          <div className="hero-glow hero-glow-blue"></div>

          <div className="hero-topline">
            <span className="availability">
              <i></i> Available for freelance & full-time
            </span>
            <span className="hero-index">
              INDEPENDENT DIGITAL BUILDER · KERALA, INDIA
            </span>
          </div>

          <div className="hero-content">
            <p className="eyebrow">
              <Code2 size={15} /> WORDPRESS · SHOPIFY · DIGITAL MARKETING
            </p>

            <h1>
              Websites that move<br className="desktop-break" />
              businesses <span>forward.</span>
            </h1>

            <p className="hero-copy">
              I build responsive websites and solve digital problems that help
              businesses turn their online presence into a useful business tool.
            </p>

            <div className="hero-actions">
              <a className="button button-dark" href="#work">
                Explore My Work <ArrowUpRight size={16} />
              </a>
              <a
                className="button button-light"
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
              >
                Let’s Connect <MessageCircle size={16} />
              </a>
            </div>
          </div>

          <div className="hero-showcase" aria-label="Website design preview illustration">
            <div className="showcase-card showcase-left">
              <div className="browser-bar">
                <i></i><i></i><i></i><span>Corporate website ↗</span>
              </div>
              <div className="showcase-inner">
                <small>DESIGNED FOR GROWTH / FRK 01</small>
                <h3>Find your<br />next chapter.</h3>
                <p>Spaces made for the way you live.</p>
                <div className="mini-line"></div>
                <div className="mini-shape shape-green"></div>
              </div>
            </div>

            <div className="showcase-card showcase-center">
              <div className="browser-bar">
                <i></i><i></i><i></i><span>Online store ↗</span>
              </div>
              <div className="showcase-inner">
                <small>THOUGHTFUL DIGITAL EXPERIENCES / FRK 02</small>
                <h3>Less clutter.<br />More living.</h3>
                <p>Thoughtful products for everyday life.</p>
                <div className="mini-line"></div>
                <div className="mini-shape shape-mint"><b>E</b></div>
              </div>
            </div>

            <div className="showcase-card showcase-right">
              <div className="browser-bar">
                <i></i><i></i><i></i><span>Business website ↗</span>
              </div>
              <div className="showcase-inner">
                <small>BUILT AROUND PEOPLE / FRK 03</small>
                <h3>Make your<br />next move.</h3>
                <p>Clear ideas, made useful online.</p>
                <div className="mini-line"></div>
                <div className="mini-shape shape-blue"><b>B</b></div>
              </div>
            </div>
          </div>

          <div className="hero-bottomline">
            <span>DESIGN WITH INTENTION</span>
            <a href="#work">Scroll to explore <ArrowDown size={15} /></a>
          </div>
        </section>

        <section className="intro-strip">
          <p><strong>30+</strong> websites worked on</p>
          <span></span>
          <p><strong>WordPress</strong> development</p>
          <span></span>
          <p><strong>Technical SEO</strong> & performance</p>
          <span></span>
          <p><strong>Shopify</strong> e-commerce</p>
        </section>

        <section className="section section-work" id="work">
          <Reveal className="section-heading">
            <div>
              <p className="section-kicker">SELECTED WORK</p>
              <h2>Digital work with<br />a clear purpose<span>.</span></h2>
            </div>
            <p className="section-description">
              A selection of websites I’ve contributed to across different
              industries. Choose a category to explore the work.
            </p>
          </Reveal>

          <div className="filter-row" aria-label="Filter projects">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setShowAll(false);
                }}
                className={
                  activeCategory === category
                    ? "filter-chip active"
                    : "filter-chip"
                }
              >
                {category}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.url}
                project={project}
                index={projects.indexOf(project)}
              />
            ))}
          </div>

          {filteredProjects.length > 12 && (
            <div className="show-all-wrap">
              <button
                className="button button-light"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show fewer websites" : "Show all websites"}
                <ArrowUpRight size={16} />
              </button>
            </div>
          )}

          <p className="section-note">
            Project links open the live websites. Some work was completed as
            part of a team or client engagement.
          </p>
        </section>

        <section className="about-section" id="about">
          <div className="about-backdrop"></div>

          <div className="section about-grid">
            <Reveal>
              <p className="section-kicker">ABOUT FRK</p>
              <h2>Good websites do more than look good<span>.</span></h2>
            </Reveal>

            <Reveal delay={100} className="about-copy">
              <p>
                I’m Umarul Farook, a WordPress developer and digital marketer
                based in Kerala, India. I work on websites that need clear
                structure, responsive layouts, reliable functionality and
                stronger technical foundations.
              </p>
              <p>
                My approach is practical: understand the business goal, remove
                friction for visitors, and build a website that is easier to
                use, maintain and improve.
              </p>
              <a className="text-link" href={LINKEDIN} target="_blank" rel="noreferrer">
                Connect on LinkedIn <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>

          <div className="service-grid">
            <Reveal>
              <article className="service-card">
                <span className="service-icon"><Monitor size={20} /></span>
                <p className="service-number">01 / BUILD</p>
                <h3>Websites that work</h3>
                <p>Responsive WordPress websites, custom sections, landing pages and website maintenance.</p>
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className="service-card">
                <span className="service-icon"><ShoppingBag size={20} /></span>
                <p className="service-number">02 / SELL</p>
                <h3>E-commerce experiences</h3>
                <p>Shopify and WooCommerce storefronts designed to make products and next steps clear.</p>
              </article>
            </Reveal>

            <Reveal delay={160}>
              <article className="service-card">
                <span className="service-icon"><Search size={20} /></span>
                <p className="service-number">03 / IMPROVE</p>
                <h3>Technical SEO</h3>
                <p>Technical checks, performance improvements, structured content and crawlability fixes.</p>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <Reveal className="section-heading">
            <div>
              <p className="section-kicker">WHERE I’VE CONTRIBUTED</p>
              <h2>Experience<span>.</span></h2>
            </div>
            <p className="section-description">
              Hands-on work across website development, e-commerce and technical SEO.
            </p>
          </Reveal>

          <div className="experience-list">
            {experience.map((item) => (
              <Reveal key={item.number}>
                <article className="experience-row">
                  <span className="experience-number">{item.number}</span>
                  <span className="experience-date">{item.date}</span>
                  <div className="experience-detail">
                    <h3>{item.role}</h3>
                    <p className="experience-company">{item.company}</p>
                    <p>{item.details}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="skills-section" id="skills">
          <div className="section skills-inner">
            <Reveal>
              <p className="section-kicker">MY TOOLKIT</p>
              <h2>The right tools for<br />the right problem<span>.</span></h2>
            </Reveal>

            <Reveal delay={100} className="skills-content">
              <p>I use practical tools to build, measure, maintain and improve digital experiences.</p>
              <div className="skills-list">
                {skills.map((skill) => (
                  <span key={skill}><Check size={14} />{skill}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-glow"></div>

          <Reveal className="contact-content">
            <p className="section-kicker">HAVE A PROJECT IN MIND?</p>
            <h2>Let’s make your<br />next move count<span>.</span></h2>
            <p>
              Need a website, help with an existing WordPress site, or a second
              pair of eyes on technical SEO? Let’s talk about the problem you
              need to solve.
            </p>
            <a className="button button-dark" href={WHATSAPP} target="_blank" rel="noreferrer">
              <MessageCircle size={17} /> Let’s Talk on WhatsApp <ArrowUpRight size={16} />
            </a>
            <div className="contact-links">
              <a href={EMAIL}>info.umarulfarook@gmail.com</a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#home">FRK<span>.</span></a>
        <p>Independent digital builder · Kerala, India</p>
        <span>© {new Date().getFullYear()} Umarul Farook</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);