// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function Home() {
  
//   // Injecting custom CSS for the 3D hover effects
//   const styleSheet = `
//     .feature-card {
//       background-color: #fff;
//       border-radius: 12px;
//       padding: 30px;
//       text-align: center;
//       box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//       transition: all 0.3s ease;
//       border: 1px solid #e0e0e0;
//       cursor: default;
//     }
//     .feature-card:hover {
//       transform: translateY(-8px);
//       box-shadow: 0 12px 24px rgba(0,0,0,0.15);
//       border-color: #0a66c2;
//     }
//     .hero-container {
//       position: relative;
//       height: 500px;
//       background-image: url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80');
//       background-size: cover;
//       background-position: center;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//     .hero-overlay {
//       position: absolute;
//       top: 0; left: 0; right: 0; bottom: 0;
//       background: rgba(10, 102, 194, 0.4); /* LinkedIn Blue Tint */
//       backdrop-filter: blur(4px); /* The slight blur effect */
//     }
//   `;

//   const styles = {
//     heroContent: {
//       position: 'relative',
//       zIndex: 1,
//       color: '#fff',
//       textAlign: 'center',
//       padding: '0 20px',
//       maxWidth: '800px'
//     },
//     headline: {
//       fontSize: '48px',
//       fontWeight: 'bold',
//       marginBottom: '20px',
//       textShadow: '0 2px 4px rgba(0,0,0,0.3)'
//     },
//     subheadline: {
//       fontSize: '20px',
//       lineHeight: '1.5',
//       marginBottom: '40px',
//       textShadow: '0 1px 2px rgba(0,0,0,0.3)'
//     },
//     ctaButton: {
//       backgroundColor: '#fff',
//       color: '#0a66c2',
//       padding: '14px 32px',
//       borderRadius: '28px',
//       fontSize: '18px',
//       fontWeight: 'bold',
//       textDecoration: 'none',
//       boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
//       transition: 'background-color 0.2s ease'
//     },
//     featuresSection: {
//       maxWidth: '1200px',
//       margin: '-50px auto 50px auto', // Pulls the cards slightly up into the hero image
//       padding: '0 20px',
//       position: 'relative',
//       zIndex: 2,
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//       gap: '24px'
//     },
//     icon: {
//       fontSize: '40px',
//       marginBottom: '15px',
//       display: 'block'
//     }
//   };

//   return (
//     <div>
//       <style>{styleSheet}</style>

//       {/* --- HERO SECTION --- */}
//       <div className="hero-container">
//         <div className="hero-overlay"></div>
//         <div style={styles.heroContent}>
//           <h1 style={styles.headline}>Build Amazing Projects Together.</h1>
//           <p style={styles.subheadline}>
//             TeamFinder is the ultimate platform for students to connect, form powerful teams, 
//             and dominate campus hackathons and club events.
//           </p>
//           <Link to="/signup" style={styles.ctaButton}>
//             Get Started Now
//           </Link>
//         </div>
//       </div>

//       {/* --- 3D FEATURE CARDS SECTION --- */}
//       <div style={styles.featuresSection}>
        
//         <div className="feature-card">
//           <span style={styles.icon}>🔍</span>
//           <h3 style={{ color: '#333', fontSize: '22px', marginBottom: '10px' }}>Find the Perfect Match</h3>
//           <p style={{ color: '#666', lineHeight: '1.5' }}>
//             Search for teammates by specific skills, names, or usernames. Filter through experience tags to find the exact piece missing from your project.
//           </p>
//         </div>

//         <div className="feature-card">
//           <span style={styles.icon}>🤝</span>
//           <h3 style={{ color: '#333', fontSize: '22px', marginBottom: '10px' }}>Form Powerful Teams</h3>
//           <p style={{ color: '#666', lineHeight: '1.5' }}>
//             Post your project requirements on the Feed. Review incoming join requests, accept top talent, and manage your roster seamlessly.
//           </p>
//         </div>

//         <div className="feature-card">
//           <span style={styles.icon}>🏆</span>
//           <h3 style={{ color: '#333', fontSize: '22px', marginBottom: '10px' }}>Official Campus Events</h3>
//           <p style={{ color: '#666', lineHeight: '1.5' }}>
//             Never miss out. Discover verified hackathons, coding competitions, and club events posted directly by Club Presidents.
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Users, Trophy, MessageCircle, UserPlus, Star,
  GraduationCap, Shield, ArrowRight, Sparkles, Zap,
  Heart, TrendingUp, Globe, ChevronRight
} from 'lucide-react';
import heroImage from '../assets/hero-shapes.png'; 
// (Adjust the '../' path depending on where Home.jsx is located relative to assets)

// ─── All custom CSS injected inline ───
const styleSheet = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');

  .tf-body { font-family: 'Inter', system-ui, sans-serif; }
  .tf-display { font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif; }

  .tf-glass {
    background: rgba(255,255,255,0.6);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 8px 32px rgba(0,0,0,0.06);
  }
  .dark .tf-glass {
    background: rgba(30,35,50,0.6);
    border-color: rgba(255,255,255,0.08);
  }

  .tf-glass-hover {
    background: rgba(255,255,255,0.6);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 8px 32px rgba(0,0,0,0.06);
    transition: all 0.5s ease-out;
  }
  .tf-glass-hover:hover {
    box-shadow: 0 20px 60px rgba(0,0,0,0.12);
    border-color: rgba(59,130,246,0.3);
    transform: translateY(-8px);
  }

  .tf-gradient-text {
    background: linear-gradient(135deg, #3b82f6, #f59e0b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .tf-hero-gradient {
    background: linear-gradient(135deg, #2563eb, #1e3a5f);
  }

  .tf-glow-primary {
    box-shadow: 0 0 60px -12px rgba(59,130,246,0.4);
  }

  @keyframes tf-float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  @keyframes tf-float-delayed {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
  @keyframes tf-pulse-glow {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }
  .tf-float { animation: tf-float 6s ease-in-out infinite; }
  .tf-float-delayed { animation: tf-float-delayed 8s ease-in-out infinite; }
  .tf-pulse-glow { animation: tf-pulse-glow 3s ease-in-out infinite; }
`;

// ─── Animation variants ───
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" }
  })
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" }
  })
};

// ─── Static data ───
const features = [
  {
    icon: Search,
    title: "Smart Team Discovery",
    description: "Search for teammates by skills, names, or usernames. Apply powerful filters to find the exact talent your project needs.",
    iconBg: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Users,
    title: "Post Team Requirements",
    description: "Create detailed team posts outlining your project vision, required skills, and open positions. Let the right people come to you.",
    iconBg: "bg-orange-500/10 text-orange-500",
  },
  {
    icon: MessageCircle,
    title: "Instant Team Chat",
    description: "Once a team leader accepts your join request, jump straight into real-time messaging. Coordinate, plan, and build together seamlessly.",
    iconBg: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Trophy,
    title: "Campus Events Hub",
    description: "College officials and club presidents can post verified hackathons, coding competitions, and campus events for everyone to discover.",
    iconBg: "bg-orange-500/10 text-orange-500",
  },
  {
    icon: UserPlus,
    title: "Connect & Network",
    description: "Find talented individuals by searching profiles and send them connection requests. Build your professional campus network.",
    iconBg: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Star,
    title: "Skill Endorsements",
    description: "Endorse your peers' skills to boost their credibility and ranking. The more endorsements, the higher they climb on the leaderboard.",
    iconBg: "bg-orange-500/10 text-orange-500",
  },
];

const profileFeatures = [
  { icon: GraduationCap, label: "Education Details", desc: "University, major, year" },
  { icon: Zap, label: "Skill Levels", desc: "Beginner · Intermediate · Pro" },
  { icon: Heart, label: "Bio & Interests", desc: "Tell your story" },
  { icon: TrendingUp, label: "Endorsement Rank", desc: "Climb the leaderboard" },
];

const steps = [
  { num: "01", title: "Create Your Profile", desc: "Sign up and showcase your skills, education, and experience level." },
  { num: "02", title: "Discover & Connect", desc: "Browse the team feed or search for specific members to collaborate with." },
  { num: "03", title: "Form Your Team", desc: "Post requirements, review requests, and assemble your dream team." },
  { num: "04", title: "Build & Compete", desc: "Chat in real-time, coordinate efforts, and dominate campus events together." },
];

// const stats = [
//   { value: "10K+", label: "Active Students" },
//   { value: "2.5K+", label: "Teams Formed" },
//   { value: "500+", label: "Events Hosted" },
//   { value: "50+", label: "Campuses" },
// ];

const feedPosts = [
  { title: "AI Chatbot for Campus", skills: ["Python", "NLP", "React"], spots: 2, event: "TechHack 2026" },
  { title: "Fitness Tracker App", skills: ["Flutter", "Firebase", "UI/UX"], spots: 1, event: "HealthHack" },
  { title: "Smart Library System", skills: ["Java", "Spring Boot", "AWS"], spots: 3, event: "CodeJam Spring" },
];

const events = [
  { name: "TechHack 2026", org: "CS Club", date: "Apr 15-17", badge: "🏆 Hackathon" },
  { name: "CodeJam Spring", org: "ACM Chapter", date: "May 3", badge: "💻 Competition" },
  { name: "Design Sprint", org: "UX Society", date: "May 20-21", badge: "🎨 Workshop" },
];

const eventBullets = [
  "Verified events from official campus clubs",
  "One-click team registration for events",
  "Event deadlines and real-time updates",
  "Direct communication with event organizers",
];

// ─── Main Component ───
// export default function Index() {
//   return (

export default function Index() {
  return (
    <div className="tf-body min-h-screen w-full overflow-x-hidden bg-slate-50">
      <style>{styleSheet}</style>

      {/* ===== NAVBAR ===== */}
      <div className="px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="tf-glass relative z-40 mx-auto max-w-7xl rounded-[28px] border border-white/10">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="tf-display flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-lg shadow-md">
                T
              </div>
              <span className="tf-display text-xl font-bold text-slate-800">
                Team<span className="text-blue-600">Finder</span>
              </span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/login" className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100">
                Log in
              </Link>
              <Link to="/signup" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5">
                Sign up
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="relative flex min-h-[calc(100svh-80px)] items-center justify-center overflow-hidden pt-6">
        <div className="absolute inset-0 tf-hero-gradient opacity-90" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')" }}
        />

        {/* Floating orbs */}
        <div className="absolute top-20 left-[10%] h-72 w-72 rounded-full bg-orange-400/20 blur-3xl tf-float" />
        <div className="absolute bottom-20 right-[10%] h-96 w-96 rounded-full bg-blue-400/20 blur-3xl tf-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-white/5 blur-3xl tf-pulse-glow" />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          {/* Left content */}
          <motion.div initial="hidden" animate="visible" className="text-center lg:text-left">
            <motion.div custom={0} variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm border border-white/10">
              <Sparkles className="h-4 w-4 text-orange-400" />
              The #1 Campus Team Building Platform
            </motion.div>

            <motion.h1 custom={1} variants={fadeUp} className="tf-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Build Amazing<br />
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 bg-clip-text text-transparent">
                Projects Together
              </span>
            </motion.h1>

            <motion.p custom={2} variants={fadeUp} className="mt-6 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg mx-auto lg:mx-0">
              TeamFinder is the ultimate platform for students to connect, form powerful teams,
              and dominate campus hackathons and club events. Find your people. Build something incredible.
            </motion.p>

            <motion.div custom={3} variants={fadeUp} className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start justify-center">
              <Link to="/signup" className="group flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-base font-bold text-blue-600 shadow-2xl shadow-black/20 transition-all hover:shadow-3xl hover:-translate-y-1">
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/feed" className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                Browse Teams
              </Link>
            </motion.div>

            {/* <motion.div custom={4} variants={fadeUp} className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="tf-display text-2xl font-bold text-white sm:text-3xl">{s.value}</div>
                  <div className="text-xs text-white/50 sm:text-sm">{s.label}</div>
                </div>
              ))}
            </motion.div> */}
          </motion.div>

          {/* Right — floating 3D illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              {/* This keeps the subtle background glow behind the image */}
              <div className="absolute inset-0 rounded-full bg-white/10 blur-3xl scale-75" />
              
              {/* The tf-float class here keeps the up-and-down animation active */}
              <div className="relative w-[420px] h-[420px] tf-float flex items-center justify-center">
                
                {/* Your new image file */}
                <img 
                  src={heroImage}
                  alt="TeamFinder Abstract Shapes" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
                
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-white/40">Scroll to explore</span>
          <div className="h-8 w-5 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="h-1.5 w-1.5 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="relative py-20 sm:py-28 lg:py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.span custom={0} variants={fadeUp} className="inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-600 mb-4">Features</motion.span>
            <motion.h2 custom={1} variants={fadeUp} className="tf-display text-3xl font-bold text-slate-800 sm:text-4xl lg:text-5xl" style={{ textWrap: 'balance' }}>
              Everything You Need to <span className="tf-gradient-text">Build Great Teams</span>
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} className="mt-4 max-w-2xl mx-auto text-slate-500 text-base sm:text-lg">
              From discovering talented peers to managing events — TeamFinder gives you the complete toolkit.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div key={f.title} custom={i} variants={scaleIn} className="group tf-glass-hover rounded-2xl p-6 sm:p-8">
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${f.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="tf-display text-lg font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative py-20 sm:py-28 lg:py-32 bg-slate-100/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.span custom={0} variants={fadeUp} className="inline-block rounded-full bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-500 mb-4">How It Works</motion.span>
            <motion.h2 custom={1} variants={fadeUp} className="tf-display text-3xl font-bold text-slate-800 sm:text-4xl lg:text-5xl">
              Four Steps to Your <span className="tf-gradient-text">Dream Team</span>
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div key={s.num} custom={i} variants={fadeUp} className="relative group">
                <div className="tf-glass-hover rounded-2xl p-6 sm:p-8 h-full">
                  <span className="tf-display text-4xl font-extrabold text-blue-500/15 group-hover:text-blue-500/25 transition-colors">{s.num}</span>
                  <h3 className="mt-3 tf-display text-lg font-bold text-slate-800">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-300" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PROFILE SHOWCASE ===== */}
      <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left — mock profile card */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="order-2 lg:order-1">
              <div className="tf-glass tf-glow-primary rounded-3xl p-6 sm:p-8 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-orange-400 flex items-center justify-center text-white tf-display font-bold text-2xl shadow-lg">A</div>
                  <div>
                    <h4 className="tf-display text-lg font-bold text-slate-800">Alex Johnson</h4>
                    <p className="text-sm text-slate-500">Computer Science · Junior</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                  Full-stack developer passionate about AI/ML and building tools that make campus life better. Always looking for exciting hackathon teams! 🚀
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["React", "Python", "Machine Learning", "UI/UX"].map((skill) => (
                    <span key={skill} className="rounded-lg bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600">{skill}</span>
                  ))}
                  <span className="rounded-lg bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-500">⭐ Pro Level</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-100/80 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-semibold text-slate-700">142 Endorsements</span>
                  </div>
                  <span className="rounded-full bg-orange-500/20 px-3 py-0.5 text-xs font-bold text-orange-500">Rank #12</span>
                </div>
              </div>
            </motion.div>

            {/* Right — description */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="order-1 lg:order-2">
              <motion.span custom={0} variants={fadeUp} className="inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-600 mb-4">Your Profile</motion.span>
              <motion.h2 custom={1} variants={fadeUp} className="tf-display text-3xl font-bold text-slate-800 sm:text-4xl lg:text-5xl mb-6">
                Showcase Your <span className="tf-gradient-text">True Potential</span>
              </motion.h2>
              <motion.p custom={2} variants={fadeUp} className="text-slate-500 text-base sm:text-lg mb-8 leading-relaxed">
                Build a rich profile with your bio, skills, education, and most importantly — your skill level.
                Whether you're a beginner, intermediate, or pro, let teams know exactly what you bring to the table.
              </motion.p>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {profileFeatures.map((pf, i) => (
                  <motion.div key={pf.label} custom={i + 3} variants={fadeUp} className="flex items-start gap-3 rounded-xl bg-slate-100/50 p-4 transition-colors hover:bg-slate-100">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                      <pf.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700 text-sm">{pf.label}</h4>
                      <p className="text-xs text-slate-500">{pf.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TEAM FEED PREVIEW ===== */}
      <section className="relative py-20 sm:py-28 lg:py-32 bg-slate-100/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.span custom={0} variants={fadeUp} className="inline-block rounded-full bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-500 mb-4">Team Feed</motion.span>
            <motion.h2 custom={1} variants={fadeUp} className="tf-display text-3xl font-bold text-slate-800 sm:text-4xl lg:text-5xl">
              Find the Right Team, <span className="tf-gradient-text">Right Now</span>
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} className="mt-4 max-w-2xl mx-auto text-slate-500 text-base sm:text-lg">
              Browse through open team postings, filter by skills or event, and send a join request with one click.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {feedPosts.map((post, i) => (
              <motion.div key={post.title} custom={i} variants={scaleIn} className="tf-glass-hover rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-500">{post.event}</span>
                  <span className="text-xs text-slate-400">{post.spots} spots left</span>
                </div>
                <h3 className="tf-display text-lg font-bold text-slate-800 mb-3">{post.title}</h3>
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.skills.map((sk) => (
                    <span key={sk} className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-600">{sk}</span>
                  ))}
                </div>
                <button className="w-full rounded-xl bg-blue-500/10 py-2.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white">
                  Request to Join
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== EVENTS SECTION ===== */}
      <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
        <div className="absolute top-20 right-0 h-60 w-60 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.span custom={0} variants={fadeUp} className="inline-block rounded-full bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-500 mb-4">Campus Events</motion.span>
              <motion.h2 custom={1} variants={fadeUp} className="tf-display text-3xl font-bold text-slate-800 sm:text-4xl lg:text-5xl mb-6">
                Never Miss an <span className="tf-gradient-text">Opportunity</span>
              </motion.h2>
              <motion.p custom={2} variants={fadeUp} className="text-slate-500 text-base sm:text-lg leading-relaxed mb-6">
                College officials and club presidents post verified hackathons, coding competitions, and events directly on TeamFinder.
              </motion.p>
              <motion.ul custom={3} variants={fadeUp} className="space-y-3">
                {eventBullets.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-500">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
                      <Shield className="h-3.5 w-3.5 text-orange-500" />
                    </div>
                    {item}
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-4">
              {events.map((evt) => (
                <div key={evt.name} className="tf-glass-hover rounded-2xl p-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-orange-500/20 text-2xl">
                    {evt.badge.split(" ")[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="tf-display font-bold text-slate-800 truncate">{evt.name}</h4>
                    <p className="text-xs text-slate-500">{evt.org} · {evt.date}</p>
                  </div>
                  <span className="hidden sm:inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 whitespace-nowrap">
                    {evt.badge.split(" ").slice(1).join(" ")}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl tf-hero-gradient p-8 sm:p-12 lg:p-16 text-center"
          >
            <div className="absolute top-0 right-0 h-60 w-60 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-orange-400/20 blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <Globe className="mx-auto mb-6 h-12 w-12 text-white/60" />
              <h2 className="tf-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-4" style={{ textWrap: 'balance' }}>
                Ready to Find Your Dream Team?
              </h2>
              <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8">
                Join thousands of students already building amazing projects together. Your next hackathon win starts here.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup" className="group flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-blue-600 shadow-2xl transition-all hover:-translate-y-1">
                  Create Free Account
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/events" className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                  Explore Events
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-200 bg-slate-100/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="tf-display flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">T</div>
              <span className="tf-display text-lg font-bold text-slate-800">
                Team<span className="text-blue-600">Finder</span>
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <Link to="/about" className="hover:text-slate-800 transition-colors">About</Link>
              <Link to="/feed" className="hover:text-slate-800 transition-colors">Team Feed</Link>
              <Link to="/events" className="hover:text-slate-800 transition-colors">Events</Link>
              <Link to="/contact" className="hover:text-slate-800 transition-colors">Contact</Link>
            </div>
            <p className="text-xs text-slate-400">© 2026 TeamFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
