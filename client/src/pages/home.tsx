import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {
  ArrowRight,
  User,
  Activity,
  TrendingDown,
  XCircle,
  CheckCircle2,
  Laptop,
  MapPin,
  Lock,
  Heart,
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Instagram,
  Star,
  Quote
} from "lucide-react";
import logo from "@/assets/logo-kb.svg";
import nutriHero from "@/assets/nutri-karoline-batista1.webp";
import nutriAbout from "@/assets/nutri-karoline-batista2.webp";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 40;

    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      opacity: number = 0;
      angle: number = 0;
      distance: number = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.angle = Math.random() * Math.PI * 2;
        this.distance = Math.random() * 500 + 100;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.angle += 0.002;
        this.x = mouseRef.current.x + Math.cos(this.angle) * this.distance;
        this.y = mouseRef.current.y + Math.sin(this.angle) * this.distance;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 184, 166, ${this.opacity})`; // Teal color
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const navLinks = [
    { href: "#inicio", label: "Início" },
    { href: "#historia", label: "Minha História" },
    { href: "#metodo", label: "Como Funciona" },
    { href: "#servicos", label: "Serviços" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none pt-4 lg:pt-6"
    >
      <nav
        className={`pointer-events-auto transition-all duration-500 ease-in-out px-4 flex items-center justify-between ${scrolled
          ? "w-[95%] lg:w-[85%] max-w-5xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl shadow-teal-900/10 rounded-full h-14 lg:h-16"
          : "w-full max-w-7xl h-16 lg:h-20"
          } ${scrolled ? "" : "sm:px-6 lg:px-8"}`}
      >
        <a href="#inicio" className="flex items-center group flex-shrink-0" data-testid="logo">
          <motion.img
            src={logo}
            alt="Nutri Karol Batista"
            className="h-8 lg:h-10 w-auto"
            animate={{
              scale: scrolled ? 0.9 : 1,
              x: scrolled ? 10 : 0
            }}
          />
        </a>

        <div className={`hidden lg:flex items-center gap-8 transition-all duration-300 ${scrolled ? "bg-transparent px-0 py-0 border-0 shadow-none" : "bg-gray-50/50 px-8 py-3 rounded-full border border-gray-100/50 backdrop-blur-sm"
          }`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors cursor-pointer ${scrolled ? "text-gray-600 hover:text-teal-700 hover:scale-105" : "text-gray-700 hover:text-teal-800"
                }`}
              data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block flex-shrink-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <a
                href="https://wa.me/5513988255224?text=Olá%20Nutri%20Karol!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className={`rounded-full px-6 transition-all duration-300 cursor-pointer ${scrolled
                    ? "bg-teal-700 hover:bg-teal-800 text-white shadow-md shadow-teal-700/20 py-1 h-10"
                    : "bg-white text-teal-700 hover:bg-gray-50 shadow-sm border border-gray-100 py-6"
                    }`}
                  data-testid="button-agendar-header"
                >
                  Agendar
                </Button>
              </a>
            </motion.div>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className={scrolled ? "rounded-full" : ""} data-testid="button-menu-mobile">
                <Menu className="h-6 w-6 text-teal-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-gray-700 hover:text-teal-700 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="https://wa.me/5513988255224?text=Olá%20Nutri%20Karol!%20Vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    className="rounded-full bg-teal-700 hover:bg-teal-800 text-white mt-4 w-full cursor-pointer"
                    data-testid="button-agendar-mobile"
                  >
                    Agendar Consulta
                  </Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}

function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16 lg:pt-20">
      {/* Background Blobs for depth */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[30%] aspect-square bg-teal-50 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[40%] aspect-square bg-green-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        {/* Mobile Bento Grid - Above Headline */}
        <div className="lg:hidden mb-12 grid grid-cols-4 grid-rows-2 gap-3 h-[320px] w-full">
          <motion.div
            className="col-span-2 row-span-2 rounded-[2.5rem] overflow-hidden shadow-lg border border-teal-50"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <img src={nutriHero} alt="Karol Batista" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            className="col-span-2 row-span-1 rounded-[1.8rem] overflow-hidden shadow-md border border-green-50"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <img src="/images/healthy_meal_plate_1768081272452.png" alt="Refeição" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            className="col-span-1 row-span-1 rounded-[1.2rem] overflow-hidden shadow-sm border border-orange-50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <img src="/images/healthy_active_senior_1768081314342.png" alt="Sênior" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            className="col-span-1 row-span-1 rounded-[1.2rem] overflow-hidden shadow-sm border border-teal-50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <img src="/images/happy_family_eating_1768081336418.png" alt="Família" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        <div className="relative w-full">
          {/* Central Content */}
          <motion.div
            className="text-center max-w-4xl mx-auto relative z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-gray-900 mb-6 lg:mb-8">
              Baixe sua Glicada e viva sem{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-teal-700">medo</span>
                <motion.svg
                  viewBox="0 0 200 20"
                  className="absolute -bottom-2 left-0 w-full h-3 text-orange-400 opacity-60"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <path d="M5 15C50 5 150 5 195 15" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                </motion.svg>
              </span>
              {" "}do Diabetes.
            </h1>

            <p className="text-lg md:text-2xl text-gray-500 max-w-2xl mx-auto mb-8 lg:mb-10 leading-relaxed">
              Chega de dietas restritivas que não funcionam. Aprenda a controlar sua glicemia
              com prazer e liberdade, respeitando seu estilo de vida.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <a
                  href="https://wa.me/5513988255224?text=Olá%20Nutri%20Karol!%20Gostaria%20de%20saber%20mais%20sobre%20o%20método%20para%20baixar%20minha%20glicada%20e%20viver%20sem%20medo%20do%20diabetes."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    size="lg"
                    className="rounded-full bg-teal-700 hover:bg-teal-800 text-white px-10 py-7 lg:py-7 text-lg shadow-xl shadow-teal-700/20 group w-full cursor-pointer"
                    data-testid="button-cta-hero"
                  >
                    Agendar Consulta Agora
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <a href="#metodo" className="w-full">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-2 border-gray-100 hover:bg-gray-50 px-10 py-7 lg:py-7 text-lg w-full cursor-pointer"
                  >
                    Como Funciona
                  </Button>
                </a>
              </motion.div>
            </div>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5 text-xs sm:text-sm">
                <CheckCircle2 className="h-4 w-4 text-teal-600 flex-shrink-0" /> Atendimento Especializado
              </span>
              <span className="flex items-center gap-1.5 text-xs sm:text-sm">
                <CheckCircle2 className="h-4 w-4 text-teal-600 flex-shrink-0" /> Método Comprovado
              </span>
            </div>
          </motion.div>

          {/* Floating Images Support - Asymmetric layout inspired by the screenshot */}
          <div className="hidden lg:block">
            {/* Top Left */}
            <motion.div
              className="absolute top-[-10%] left-[-15%] w-60 overflow-hidden rounded-[3rem] shadow-2xl shadow-gray-200/50 -rotate-3 z-10"
              initial={{ opacity: 0, x: -50, y: -50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              <img src={nutriHero} alt="Karol Batista" className="w-full h-auto" />
            </motion.div>

            {/* Top Right */}
            <motion.div
              className="absolute top-[-15%] right-[-15%] w-64 overflow-hidden rounded-[3.5rem] shadow-2xl shadow-gray-200/50 rotate-6 z-10"
              initial={{ opacity: 0, x: 50, y: -50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              <img src="/images/healthy_active_senior_1768081314342.png" alt="Vida Saudável" className="w-full h-auto" />
            </motion.div>

            {/* Bottom Left */}
            <motion.div
              className="absolute bottom-[-10%] left-[-10%] w-72 overflow-hidden rounded-[4rem] shadow-2xl shadow-gray-200/50 rotate-3 z-10"
              initial={{ opacity: 0, x: -50, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              <img src="/images/healthy_meal_plate_1768081272452.png" alt="Cardápio Personalizado" className="w-full h-auto" />
            </motion.div>

            {/* Bottom Right */}
            <motion.div
              className="absolute bottom-[-15%] right-[-10%] w-80 overflow-hidden rounded-[3rem] shadow-2xl shadow-gray-200/50 -rotate-2 z-10"
              initial={{ opacity: 0, x: 50, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
            >
              <img src="/images/happy_family_eating_1768081336418.png" alt="Qualidade de Vida" className="w-full h-auto" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const highlights = [
    { icon: User, label: "Nutricionista", sublabel: "CRN-X XXX" },
    { icon: Activity, label: "DM1 há 20+ anos", sublabel: "Vivência Real" },
    { icon: TrendingDown, label: "Glicada < 7%", sublabel: "Foco em Resultados" },
  ];

  return (
    <section id="historia" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-teal-50/30 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-green-50/30 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            className="lg:col-span-7"
            {...fadeInUp}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold mb-6">
              <Heart className="h-4 w-4" />
              Minha História
            </div>

            <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.25rem] font-black text-gray-900 mb-8 leading-[1.15] tracking-tight">
              Eu não apenas <span className="md:whitespace-nowrap">trato o Diabetes,</span> <br className="hidden md:block" />
              <span className="text-teal-700 italic">eu convivo com&nbsp;ele.</span>
            </h2>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl">
              <p>
                Olá, sou <span className="font-semibold text-gray-900">Karol Batista</span>. Minha jornada com o Diabetes Tipo 1 começou há mais de duas décadas. Sei exatamente como é a frustração de uma glicemia que não baixa e o peso das restrições&nbsp;alimentares.
              </p>
              <p>
                Minha missão é mostrar que o controle glicêmico não precisa ser um fardo. Através da <span className="text-teal-700 font-medium">Nutrição de Precisão</span> aliada à minha experiência pessoal, desenvolvi um método onde você aprende a comer o que gosta, mantendo sua saúde&nbsp;em&nbsp;dia.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="p-5 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-300">
                    <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-700 mb-4 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <p className="font-heading font-bold text-gray-900 mb-1">{item.label}</p>
                    <p className="text-sm text-gray-500 leading-tight">{item.sublabel}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 relative pl-4"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Image Container with decorations */}
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-100/50 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-100/50 rounded-full blur-3xl -z-10" />

              <div className="relative rounded-[3.5rem] overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] skew-y-1 hover:skew-y-0 transition-transform duration-700">
                <img
                  src={nutriAbout}
                  alt="Karol Batista"
                  className="w-full h-auto object-cover scale-110 hover:scale-105 transition-transform duration-1000"
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -bottom-6 -right-6 md:-right-10 bg-white p-6 rounded-3xl shadow-2xl border border-gray-50 z-20 max-w-[200px]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-bold text-teal-700 leading-none">20+</span>
                  <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Anos de Experiência</span>
                  <div className="h-1 w-10 bg-orange-400 rounded-full mt-1" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MethodSection() {
  const traditional = [
    "Dietas restritivas que ninguém aguenta seguir",
    "Listas intermináveis de alimentos proibidos",
    "Foco apenas na glicose, ignorando sua vida",
    "Acompanhamento genérico sem personalização",
    "Culpa por cada 'escorregada' alimentar",
  ];

  const karolMethod = [
    "Alimentação prazerosa e sustentável",
    "Aprenda a fazer substituições inteligentes",
    "Integração com sua rotina e preferências",
    "Acompanhamento personalizado e próximo",
    "Educação nutricional que empodera",
  ];

  return (
    <section id="metodo" className="py-24 lg:py-32 bg-gray-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-700 text-sm font-semibold mb-6">
            <TrendingDown className="h-4 w-4" />
            Por que é diferente?
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Liberdade é a nossa <span className="text-teal-700">prioridade.</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Esqueça tudo o que te disseram sobre "proibido". O meu método foca no que você <span className="text-teal-800 font-medium">pode</span> e <span className="text-teal-800 font-medium">deve</span> fazer para viver bem.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch relative">
          {/* Traditional Way */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8 lg:p-12 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-[3rem] h-full shadow-sm hover:shadow-md transition-all grayscale-[0.5] hover:grayscale-0">
              <h3 className="font-heading text-2xl font-bold text-gray-400 mb-8 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <X className="h-5 w-5" />
                </span>
                O Caminho Antigo
              </h3>
              <ul className="space-y-6">
                {traditional.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="mt-1 bg-red-50 p-1 rounded-full">
                      <XCircle className="h-4 w-4 text-red-300 flex-shrink-0" />
                    </div>
                    <span className="text-gray-400 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Karol Method */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-green-500 rounded-[3.1rem] blur opacity-20 -z-10" />
            <Card className="p-8 lg:p-12 bg-white border-2 border-teal-100 rounded-[3rem] h-full shadow-2xl shadow-teal-900/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6">
                <div className="bg-teal-700 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                  O Novo Padrão
                </div>
              </div>

              <h3 className="font-heading text-2xl font-bold text-teal-700 mb-8 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-700">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                Método Karol Batista
              </h3>
              <ul className="space-y-6">
                {karolMethod.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="mt-1 bg-teal-50 p-1.5 rounded-full text-teal-600">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                    </div>
                    <span className="text-gray-700 text-lg font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-12 pt-8 border-t border-teal-50">
                <p className="text-teal-800 font-heading font-semibold text-center italic">
                  "A nutrição que liberta, não a que aprisiona."
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      icon: Laptop,
      title: "Atendimento Online",
      tagline: "Em qualquer lugar do mundo",
      description: "Consultas por videochamada com a mesma profundidade e entrega do presencial. Tecnologia a serviço da sua saúde.",
      features: [
        "Plataforma de vídeo segura",
        "App exclusivo para pacientes",
        "Suporte direto via WhatsApp",
        "Ideal para expatriados e rotinas corridas"
      ],
      button: "Quero Atendimento Online",
      message: "Olá Nutri Karol! Tenho interesse na Consulta Online e gostaria de saber como funciona o agendamento.",
      theme: "teal"
    },
    {
      icon: MapPin,
      title: "Atendimento Presencial",
      tagline: "Experiência acolhedora em consultório",
      description: "Para quem valoriza o contato olho no olho e um ambiente pensado para o seu conforto durante a jornada.",
      features: [
        "Avaliação física completa",
        "Bioimpedância (opcional)",
        "Espaço acolhedor e seguro",
        "Localização de fácil acesso"
      ],
      button: "Agendar Presencial",
      message: "Olá Nutri Karol! Gostaria de agendar uma Consulta Presencial com você.",
      theme: "orange"
    },
  ];

  return (
    <section id="servicos" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-teal-50 rounded-full blur-[100px] opacity-60" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-orange-50 rounded-full blur-[100px] opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div {...fadeInUp} className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold mb-6">
            <Heart className="h-4 w-4" />
            Nossas Modalidades
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Como posso te ajudar <br className="hidden md:block" />
            <span className="text-teal-700 italic">hoje?</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Ofereço duas formas de começarmos a sua transformação, mantendo o mesmo padrão de excelência em ambas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="h-full"
            >
              <Card className="group relative p-8 lg:p-12 bg-white border border-gray-100 rounded-[3rem] h-full transition-all duration-500 hover:shadow-2xl hover:shadow-teal-900/10 overflow-hidden flex flex-col">
                {/* Decorative Gradient Corner */}
                <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 transition-opacity group-hover:opacity-20 translate-x-8 -translate-y-8 rounded-full ${service.theme === 'teal' ? 'bg-teal-400' : 'bg-orange-400'
                  }`} />

                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 ${service.theme === 'teal' ? 'bg-teal-50 text-teal-700' : 'bg-orange-50 text-orange-700'
                  }`}>
                  <service.icon className="h-8 w-8" />
                </div>

                <div className="mb-8">
                  <span className={`text-xs font-bold uppercase tracking-widest mb-2 block ${service.theme === 'teal' ? 'text-teal-600' : 'text-orange-600'
                    }`}>
                    {service.tagline}
                  </span>
                  <h3 className="font-heading text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-lg text-gray-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mb-10 flex-grow">
                  <p className="font-heading font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">O que está incluso:</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3 text-gray-600">
                        <div className={`w-1.5 h-1.5 rounded-full ${service.theme === 'teal' ? 'bg-teal-500' : 'bg-orange-500'
                          }`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a
                    href={`https://wa.me/5513988255224?text=${encodeURIComponent(service.message || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      className={`rounded-full w-full py-7 text-lg font-semibold transition-all duration-300 cursor-pointer ${service.theme === 'teal'
                        ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-lg shadow-teal-700/20'
                        : 'bg-white text-orange-700 border-2 border-orange-100 hover:bg-orange-50 hover:border-orange-200'
                        }`}
                      data-testid={`button-${service.title.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {service.button}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Diabetes Tipo 2",
      content: "Em 3 meses, minha glicada baixou de 9.2% para 6.8%. A Karol me ensinou que comer bem não precisa ser sacrifício. Liberdade define.",
      rating: 5,
      verified: true
    },
    {
      name: "João Santos",
      role: "Diabetes Tipo 1",
      content: "Finalmente encontrei uma profissional que entende a realidade de quem vive com diabetes. O método dela é vida real, sem neuras.",
      rating: 5,
      verified: true
    },
    {
      name: "Ana Costa",
      role: "Pré-diabética",
      content: "Consegui reverter meu quadro em 4 meses. A orientação personalizada e o suporte constante fizeram toda a diferença na minha saúde.",
      rating: 5,
      verified: true
    },
  ];

  return (
    <section id="depoimentos" className="py-24 lg:py-32 bg-gray-50/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-teal-100/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-orange-100/20 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div {...fadeInUp} className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-700 text-sm font-semibold mb-6">
            <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
            Depoimentos Reais
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Vidas transformadas pelo <br className="hidden md:block" />
            <span className="text-teal-700">conhecimento.</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Nada me deixa mais feliz do que ver meus pacientes conquistando a tão sonhada liberdade com saúde.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <Card className="group p-8 lg:p-10 bg-white border border-gray-100 rounded-[3rem] h-full shadow-sm hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-500 relative">
                <div className="absolute top-8 right-8 text-teal-50 group-hover:text-teal-100 transition-colors duration-500 transform group-hover:-rotate-12">
                  <Quote className="h-12 w-12 fill-current" />
                </div>

                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>

                <p className="text-lg text-gray-600 mb-10 leading-relaxed relative z-10 italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4 mt-auto border-t border-gray-50 pt-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl flex items-center justify-center border border-teal-200 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <span className="font-heading font-bold text-teal-700 text-xl uppercase">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-heading font-bold text-gray-900">{testimonial.name}</p>
                      {testimonial.verified && (
                        <CheckCircle2 className="h-4 w-4 text-teal-600" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-teal-700/70">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2 font-medium">
            <Lock className="h-3 w-3" /> Resultados verídicos baseados na jornada individual de cada paciente.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "Como funciona o acompanhamento nutricional para diabetes?",
      answer: "O acompanhamento é personalizado e inclui avaliação completa do seu histórico, análise de exames, montagem de cardápio individualizado, educação sobre contagem de carboidratos e consultas de retorno para ajustes. Tudo adaptado à sua realidade."
    },
    {
      question: "Preciso fazer dietas muito restritivas?",
      answer: "Não! O objetivo é criar uma alimentação sustentável e prazerosa. Você vai aprender a fazer escolhas inteligentes e substituições que permitem comer bem enquanto mantém a glicemia controlada."
    },
    {
      question: "O atendimento online é tão eficaz quanto o presencial?",
      answer: "Sim! Utilizamos plataformas seguras para videochamada, compartilhamento de documentos e acompanhamento contínuo. Muitos pacientes preferem a praticidade do online sem perder a qualidade do atendimento."
    },
    {
      question: "Com que frequência são as consultas de retorno?",
      answer: "Geralmente começamos com retornos quinzenais ou mensais, dependendo da sua necessidade. Conforme você ganha autonomia, os intervalos podem aumentar. Você também tem acesso a suporte entre consultas."
    },
    {
      question: "Vocês trabalham com planos de saúde?",
      answer: "Trabalhamos com atendimento particular. Porém, fornecemos recibo e toda documentação necessária para você solicitar reembolso do seu plano, caso tenha essa cobertura."
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-500">
            Tire suas dúvidas sobre o acompanhamento nutricional.
          </p>
        </motion.div>

        <motion.div {...fadeInUp}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-100 rounded-2xl px-6 data-[state=open]:bg-gray-50 transition-colors"
              >
                <AccordionTrigger className="text-left font-heading font-medium text-gray-900 hover:no-underline py-5 cursor-pointer" data-testid={`faq-trigger-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-teal-950">
      {/* Dynamic Background Light */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square bg-teal-800 rounded-full blur-[120px] opacity-30" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square bg-green-800 rounded-full blur-[100px] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="relative overflow-hidden bg-white p-8 md:p-16 lg:p-20 rounded-[3rem] text-center shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] border-0">
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-teal-50 rounded-full translate-x-20 -translate-y-20" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 text-xs md:text-sm font-bold mb-8 uppercase tracking-wider">
                <Activity className="h-4 w-4" />
                Sua saúde não pode esperar
              </div>

              <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                Recupere o controle e <br className="hidden md:block" />
                <span className="text-teal-700">viva sem medo</span> do Diabetes.
              </h2>

              <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
                Não deixe para amanhã a vida plena que você merece ter hoje. O seu novo capítulo começa com uma conversa sem compromisso.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <a
                    href="https://wa.me/5513988255224?text=Olá%20Nutri%20Karol!%20Quero%20dar%20o%20primeiro%20passo%20hoje%20para%20transformar%20minha%20saúde%20com%20o%20seu%20acompanhamento."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      size="lg"
                      className="rounded-full bg-teal-700 hover:bg-teal-800 text-white px-12 py-8 text-xl font-bold shadow-2xl shadow-teal-700/30 group w-full cursor-pointer"
                      data-testid="button-cta-final"
                    >
                      Quero Agendar Minha Consulta
                      <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </motion.div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mt-16 pt-12 border-t border-gray-100 text-gray-400 text-sm font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-teal-600" />
                  Suporte WhatsApp
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-teal-600" />
                  Foco em Glicada {"<"} 7%
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-teal-600" />
                  Método Comprovado
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="pt-24 pb-12 bg-white border-t border-gray-100 overflow-hidden relative">
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-50/50 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="text-center md:text-left">
            <a href="#inicio" className="inline-block mb-6">
              <img src={logo} alt="Nutri Karol Batista" className="h-12 w-auto" />
            </a>
            <p className="text-gray-500 leading-relaxed max-w-xs mb-8 mx-auto md:mx-0">
              Nutrição especializada para quem vive com Diabetes. Transformando restrição em liberdade através do conhecimento.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com/karolbatista_nutri", testid: "link-instagram" },
                { icon: Phone, href: "https://wa.me/5513988255224", testid: "link-phone" },
                { icon: Mail, href: "mailto:contato@karolbatista.com.br", testid: "link-email" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target={social.href.startsWith('http') ? "_blank" : undefined}
                  rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 bg-teal-50 text-teal-700 rounded-xl flex items-center justify-center hover:bg-teal-700 hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
                  data-testid={social.testid}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-heading font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Navegação</h4>
            <ul className="space-y-4">
              {[
                { label: "Início", href: "#inicio" },
                { label: "Minha História", href: "#historia" },
                { label: "Como Funciona", href: "#metodo" },
                { label: "Serviços", href: "#servicos" }
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-500 hover:text-teal-700 transition-colors flex items-center justify-center md:justify-start gap-2 group cursor-pointer">
                    <div className="w-1 h-1 bg-teal-200 rounded-full group-hover:w-2 group-hover:bg-teal-600 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="font-heading font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Contato</h4>
            <ul className="space-y-4 text-gray-500">
              <li className="flex items-start justify-center md:justify-start gap-3">
                <MapPin className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
                <span>Atendimento Presencial e <br /> Online em todo o mundo.</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="h-5 w-5 text-teal-600 flex-shrink-0" />
                <a href="https://wa.me/5513988255224" className="hover:text-teal-700 transition-colors cursor-pointer">(13) 98825-5224</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="h-5 w-5 text-teal-600 flex-shrink-0" />
                <span>contato@karolbatista.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
            <p className="text-sm text-gray-400 font-medium">
              © {new Date().getFullYear()} Nutri Karol Batista. CRM-X XXXX. Todos os direitos reservados.
            </p>

            <motion.a
              href="https://lumostudio.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-gray-400 font-medium hover:text-gray-600 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              Feito com
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <Heart className="h-3 w-3 text-red-400 fill-red-400" />
              </motion.div>
              pela <span className="font-bold text-gray-900 border-b-2 border-teal-100 group-hover:border-teal-400 transition-colors">Lumo Studio</span>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative">
      <ParticleBackground />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <MethodSection />
      <ServicesSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
