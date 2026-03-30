import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Crosshair, 
  Settings2, 
  Cpu, 
  MonitorPlay, 
  Activity, 
  CheckCircle2, 
  ChevronRight,
  Shield,
  Wrench,
  Mail,
  MapPin,
  ArrowUpRight
} from "lucide-react";

import cockpitImage1 from "@assets/image_1774893066806.jpeg";
import cockpitImage2 from "@assets/image_1774893088131.jpeg";
import cockpitImage3 from "@assets/image_1774893139004.jpeg";

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const RevealPanel = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`border border-border/50 bg-card/40 backdrop-blur-md relative overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary">
      {/* Navigation - Hud Style */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-border/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crosshair className="w-6 h-6 text-primary animate-pulse duration-[3000ms]" />
            <span className="font-serif font-bold text-lg tracking-tight">LEADING EDGE SIMULATION</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-serif text-sm text-muted-foreground">
            {['home', 'about', 'capabilities', 'expertise', 'team', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`uppercase tracking-wider transition-colors hover:text-primary ${activeSection === item ? 'text-primary' : ''}`}
                data-testid={`nav-link-${item}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="md:hidden flex items-center">
             <button className="text-primary"><Settings2 /></button>
          </div>
        </div>
        {/* Decorative HUD line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[100dvh] flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: y1 }} className="h-full w-full">
            <img 
              src={cockpitImage1} 
              alt="Flight Simulator Cockpit" 
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity grayscale contrast-125"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 tech-grid opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-3 mb-6 font-serif text-primary uppercase tracking-widest text-sm font-bold">
                  <span className="w-8 h-[2px] bg-primary block" />
                  JOSCAR Registered Supplier
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-6 text-white tracking-tight">
                  PRECISION<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                    FLIGHT SIMULATION
                  </span><br/>
                  SERVICES.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl font-light leading-relaxed">
                  Delivering uncompromising quality in FSTD maintenance, performance testing, and support for military and commercial operators worldwide.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => scrollTo('capabilities')}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 font-serif font-bold uppercase tracking-wider text-sm transition-all flex items-center gap-2"
                    data-testid="hero-btn-capabilities"
                  >
                    View Capabilities
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => scrollTo('contact')}
                    className="border border-primary/30 hover:bg-primary/10 text-white px-8 py-4 font-serif font-bold uppercase tracking-wider text-sm transition-all"
                    data-testid="hero-btn-contact"
                  >
                    Contact Operations
                  </button>
                </div>
              </motion.div>
            </div>
            
            {/* Status Panel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="absolute -inset-1 bg-primary/20 blur-2xl rounded-full" />
              <div className="glass-panel p-6 relative border-l-2 border-l-primary">
                <div className="flex justify-between items-center mb-6 border-b border-border/50 pb-4">
                  <span className="font-serif text-xs text-muted-foreground uppercase tracking-widest">System Status</span>
                  <span className="flex items-center gap-2 text-primary font-mono text-sm"><span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> ONLINE</span>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">LOCATION</span>
                    <span className="text-white">NORTHAMPTONSHIRE, UK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">EVALUATION</span>
                    <span className="text-white">AUTHORITY SUPPORT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">COVERAGE</span>
                    <span className="text-white">GLOBAL</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/3] w-full group overflow-hidden">
                  <img 
                    src={cockpitImage2} 
                    alt="Instrument Panel" 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 border border-primary/30 pointer-events-none" />
                  {/* HUD elements over image */}
                  <div className="absolute top-4 left-4 font-mono text-primary text-xs border border-primary/30 px-2 py-1 bg-background/50 backdrop-blur">
                    SYS.CHK.01
                  </div>
                  <div className="absolute bottom-4 right-4 flex gap-1">
                    <div className="w-8 h-1 bg-primary/40" />
                    <div className="w-4 h-1 bg-primary" />
                    <div className="w-2 h-1 bg-primary/40" />
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white uppercase tracking-tight">
                  Mission <span className="text-primary">Profile</span>
                </h2>
                <div className="w-12 h-1 bg-primary mb-8" />
                <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-light">
                  Leading Edge Simulation Ltd specialises in providing high quality simulation services and solutions to a range of UK and international customers engaged in diverse flight training operations. 
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-light">
                  Based in Northamptonshire in the East Midlands, we offer a comprehensive range of services from onsite FSTD maintenance and performance testing, authority evaluation support, remote support by phone or email, to hardware repair at our premises in the UK.
                </p>
                <div className="inline-flex items-center gap-3 border border-border/50 bg-card/30 px-6 py-3 font-serif text-sm uppercase tracking-wider text-white">
                  <Shield className="w-5 h-5 text-primary" />
                  JOSCAR Registered Company
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-24 relative bg-card/20 border-t border-border/50">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-white uppercase tracking-tight">
                Operational <span className="text-primary">Capabilities</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto font-light text-lg">
                With in depth understanding of flight simulation technical challenges and unique insight into realising customer aspirations in the areas of FSTD upgrades, maintenance and support.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Wrench, title: "Maintenance & Support", desc: "Flexible, efficient and affordable solutions to operators for FSTD upgrades and ongoing support." },
              { icon: Activity, title: "Performance Testing", desc: "Rigorous FSTD QTG performance tests ensuring absolute compliance and accuracy." },
              { icon: Settings2, title: "Consultancy", desc: "Expert advice and consultancy on all aspects of flight simulation and training solutions." }
            ].map((cap, i) => (
              <RevealPanel key={i} delay={i * 0.1} className="p-8 group hover:border-primary/50 transition-colors">
                <cap.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-xl font-bold mb-4 text-white uppercase">{cap.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{cap.desc}</p>
              </RevealPanel>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-1/3 h-full">
          <img 
            src={cockpitImage3} 
            alt="Cockpit wide view" 
            className="w-full h-full object-cover opacity-10 grayscale mask-image-to-r"
            style={{ maskImage: 'linear-gradient(to right, black, transparent)', WebkitMaskImage: 'linear-gradient(to right, black, transparent)' }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-12 text-white uppercase tracking-tight">
              Core <span className="text-primary">Expertise</span>
            </h2>
          </FadeIn>

          <div className="grid gap-4 max-w-4xl">
            {[
              { icon: Cpu, text: "Repair & maintenance of Motionbase Plc motion platforms" },
              { icon: MonitorPlay, text: "Support & maintenance of all cueSim Ltd flight simulator devices" },
              { icon: Settings2, text: "Repair & maintenance of 3D Perception projectors" },
              { icon: Crosshair, text: "Configuration & calibration of visual display systems" },
              { icon: CheckCircle2, text: "FSTD QTG performance tests and authority evaluation consultancy and support" }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex items-center gap-6 p-6 glass-panel hover:bg-card/60 transition-colors group cursor-default">
                  <div className="bg-background border border-primary/30 p-3 flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-lg text-white font-light">{item.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Leadership */}
      <section id="team" className="py-24 relative bg-card/20 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-white uppercase tracking-tight">
                  Command <span className="text-primary">Leadership</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl font-light text-lg">
                  Multi skilled domain experts with over 30 years experience in delivering simulation products and services.
                </p>
              </div>
              <div className="font-mono text-sm text-primary border border-primary/30 px-4 py-2 bg-primary/5 uppercase">
                Personnel // CL1
              </div>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            <RevealPanel delay={0.1} className="p-8 md:p-10 border-l-4 border-l-primary">
              <div className="font-mono text-primary text-xs mb-2 uppercase tracking-widest">Technical Director</div>
              <h3 className="text-2xl font-serif font-bold text-white mb-6 uppercase">Jason Chambers</h3>
              <div className="space-y-4 text-muted-foreground font-light">
                <p>
                  Started in flight simulation working on high performance, reconfigurable military flight simulators in 1990.
                </p>
                <p>
                  Moved onto design aspects of commercial helicopter training devices during the last 25 years. Brings a wealth of technical knowledge and invaluable experience to every project.
                </p>
              </div>
            </RevealPanel>

            <RevealPanel delay={0.2} className="p-8 md:p-10 border-l-4 border-l-primary">
              <div className="font-mono text-primary text-xs mb-2 uppercase tracking-widest">Operations Director</div>
              <h3 className="text-2xl font-serif font-bold text-white mb-6 uppercase">Sarah Burton</h3>
              <div className="space-y-4 text-muted-foreground font-light">
                <p>
                  Over 30 years experience in business operations, project management and customer support within the simulation industry.
                </p>
                <p>
                  Ensures uncompromising operational efficiency and continuous seamless support delivery to our global client base.
                </p>
              </div>
            </RevealPanel>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-20" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 text-white uppercase tracking-tight">
              Establish <span className="text-primary">Contact</span>
            </h2>
            <div className="w-16 h-[2px] bg-primary mx-auto mb-12" />
            
            <div className="glass-panel p-8 md:p-12 flex flex-col items-center">
              <Mail className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-serif text-white mb-2 uppercase">Secure Comms Line</h3>
              <p className="text-muted-foreground mb-8">Reach out to our operations centre for inquiries, quotes, or support.</p>
              
              <a 
                href="mailto:contact@leading-edge-simulation.co.uk" 
                className="group relative inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-5 font-mono text-lg font-bold uppercase tracking-wider transition-all"
                data-testid="contact-email-btn"
              >
                contact@leading-edge-simulation.co.uk
                <ArrowUpRight className="w-5 h-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              
              <div className="mt-12 flex items-center justify-center gap-2 text-muted-foreground font-mono text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                BASED IN NORTHAMPTONSHIRE, UK
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 bg-card/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-white">
            <Crosshair className="w-5 h-5 text-primary" />
            <span className="font-serif font-bold uppercase tracking-widest text-sm">Leading Edge Simulation Ltd</span>
          </div>
          <div className="text-muted-foreground font-mono text-xs text-center md:text-right">
            &copy; {new Date().getFullYear()} LEADING EDGE SIMULATION LTD. ALL RIGHTS RESERVED.<br/>
            REGISTERED IN THE UK.
          </div>
        </div>
      </footer>
    </div>
  );
}
