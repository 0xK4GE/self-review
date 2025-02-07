"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import {
  Layers, Users, ChevronDown, Award, Brain, Briefcase, Target,
  Trophy, AlertTriangle, Lightbulb, Gem, Star, BookOpen, Globe,
  Wrench, Clock, ArrowUp, CheckCircle, Zap, Compass, MessageCircle,
  Shield, Presentation, FileText, ShieldCheck, ShieldAlert, TrendingUp
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const Card3D = ({ children }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [perspective, setPerspective] = useState(1000);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    
    const angleX = (deltaY / centerY) * 25;
    const angleY = -(deltaX / centerX) * 25;
    const angleZ = Math.sqrt(Math.pow(angleX, 2) + Math.pow(angleY, 2)) * 0.05;
    
    setRotation({
      x: angleX,
      y: angleY,
      z: angleZ
    });
    
    setGlowPosition({
      x: (mouseX / rect.width) * 100,
      y: (mouseY / rect.height) * 100
    });
    
    setPerspective(1200);
    setScale(1.02);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0, z: 0 });
    setGlowPosition({ x: 50, y: 50 });
    setPerspective(1000);
    setScale(1);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-lg p-6 bg-gradient-to-br from-white to-gray-50"
      style={{
        transformStyle: "preserve-3d",
        perspective: `${perspective}px`,
        transform: `
          rotateX(${rotation.x}deg) 
          rotateY(${rotation.y}deg) 
          rotateZ(${rotation.z}deg)
          scale(${scale})
        `,
        transition: "transform 0.1s ease-out, perspective 0.3s ease"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10">
        {children}
      </div>
      <div 
        className="absolute inset-0 rounded-lg opacity-60 pointer-events-none"
        style={{
          background: `radial-gradient(
            circle at ${glowPosition.x}% ${glowPosition.y}%, 
            rgba(139, 92, 246, 0.3), 
            transparent 50%
          )`,
          transition: "background 0.2s ease"
        }}
      />
      <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div 
        className="absolute inset-0 rounded-lg shadow-lg"
        style={{
          transform: "translateZ(-10px)",
          background: "linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))"
        }}
      />
    </motion.div>
  );
};
const ParallaxSection = ({ children, speed = 0.5 }) => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  
  return (
    <motion.div ref={scrollRef} style={{ y }}>
      {children}
    </motion.div>
  );
};

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="inline-block"
    >
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-purple-600"
      >
        |
      </motion.span>
    </motion.span>
  );
};

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const springProps = useSpring({
    from: { number: 0 },
    to: { number: end },
    config: { duration }
  });

  return (
    <animated.span>
      {springProps.number.to(n => Math.floor(n))}
    </animated.span>
  );
};

const Section = ({ title, icon: Icon, children, isOpen, onToggle }) => (
  <Card3D>
    <motion.button
      onClick={onToggle}
      className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white rounded-t-lg transform-gpu"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="flex items-center space-x-3"
        initial={false}
        animate={{ rotateZ: isOpen ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="h-6 w-6" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </motion.div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className="h-5 w-5" />
      </motion.div>
    </motion.button>
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ 
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  </Card3D>
);

const FloatingElement = ({ children }) => (
  <motion.div
    animate={{ 
      y: [0, -10, 0],
      scale: [1, 1.02, 1]
    }}
    transition={{ 
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }}
  >
    {children}
  </motion.div>
);
const globalStyles = `
  .card-3d {
    transform-style: preserve-3d;
    perspective: 1000px;
  }
  
  .card-3d:hover {
    animation: glow 2s ease-in-out infinite;
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 5px rgba(147, 51, 234, 0.5); }
    50% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.8); }
  }
  
  .floating {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
`;
const Skills = ({ title, skills }) => (
  <motion.div 
    className="mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <motion.span
          key={index}
          className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 rounded-full text-sm"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0px 5px 15px rgba(147, 51, 234, 0.3)"
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const Progress = ({ label, value }) => {
  const springProps = useSpring({
    width: `${value}%`,
    from: { width: '0%' },
    config: { duration: 1000 }
  });

  return (
    <motion.div 
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">
          <AnimatedCounter end={value} />%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <animated.div
          style={springProps}
          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
        />
      </div>
    </motion.div>
  );
};

const Achievement = ({ icon: Icon, title, description }) => (
  <motion.div
    className="flex items-start space-x-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg"
    whileHover={{ 
      scale: 1.03,
      boxShadow: "0px 10px 20px rgba(147, 51, 234, 0.2)"
    }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <motion.div
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="h-6 w-6 text-purple-600 flex-shrink-0" />
    </motion.div>
    <div>
      <motion.h3 
        className="font-semibold text-gray-800"
        whileHover={{ color: "#7C3AED" }}
      >
        {title}
      </motion.h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);


const SelfReview = () => {
  const [openSections, setOpenSections] = useState({
    softSkills: true,
    hardSkills: false,
    transferableSkills: false,
    responsibilities: false,
    accomplishments: false,
    challenges: false,
    opportunities: false,
    goals: false,
    education: false,
    languages: false,
    transfer:false,
    respo:false,
    challengess:false,
    Opportunities:false,
    certifications: false,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-8"
  >
    <motion.div 
      className="max-w-4xl mx-auto"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="mb-8 text-center"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
          <TypewriterText text="Professional Self-Review" />
        </h1>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Haithem Bendjaballah - Aircraft Technician & Software Developer & CTF player & Ethical hacker 
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Alert className="mb-6 animate-pulse">
          <AlertTitle className="text-purple-700">Current Professional Status</AlertTitle>
          <AlertDescription>
            Software Development Student at 42 Abu Dhabi | LeetSec Cybersecurity Club President | 
            Former Aircraft Technician
          </AlertDescription>
        </Alert>
      </motion.div>

        <Section
          title="Soft Skills"
          icon={Brain}
          isOpen={openSections.softSkills}
          onToggle={() => toggleSection('softSkills')}
        >
          <Skills
            title="Leadership & Communication"
            skills={[
              "Team Leadership",
              "Workshop Organization",
              "Technical Communication",
              "Mentoring",
              "Cross-functional Collaboration",
              "Problem Solving",
              "Adaptability",
              "Time Management"
            ]}
          />
          <Progress label="Leadership Effectiveness" value={90} />
          <Progress label="Communication Skills" value={85} />
          <Progress label="Problem Solving" value={95} />
        </Section>

        <Section
          title="Hard Skills"
          icon={Wrench}
          isOpen={openSections.hardSkills}
          onToggle={() => toggleSection('hardSkills')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Skills
                title="Programming & Development"
                skills={[
                  "C/C++",
                  "Python",
                  "JavaScript",
                  "PHP",
                  "Web Development",
                  "React",
                  "Next.js",
                  "Node.js"
                ]}
              />
              <Progress label="Programming Proficiency" value={85} />
            </div>
            <div>
              <Skills
                title="Technical Expertise"
                skills={[
                  "Aircraft Maintenance",
                  "Cybersecurity",
                  "Ethical Hacking",
                  "System Administration",
                  "Network Security",
                  "Penetration Testing"
                ]}
              />
              <Progress label="Technical Expertise" value={90} />
            </div>
          </div>
        </Section>

        <Section
          title="Languages"
          icon={Globe}
          isOpen={openSections.languages}
          onToggle={() => toggleSection('languages')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Progress label="Arabic (Native)" value={100} />
            <Progress label="English (Full Professional)" value={90} />
            <Progress label="French (Limited Working)" value={60} />
          </div>
        </Section>

        <Section
          title="Education & Certifications"
          icon={BookOpen}
          isOpen={openSections.education}
          onToggle={() => toggleSection('education')}
        >
          <div className="space-y-4">
            <Achievement
              icon={Star}
              title="42 Abu Dhabi"
              description="Software Development Diploma (2023-2025)"
            />
            <Achievement
              icon={Star}
              title="Institute Abdel Kader matouk"
              description="Higher National Diploma in Electromechanical & maintenance industry (2017-2020)"
            />
            <Achievement
              icon={CheckCircle}
              title="Certifications"
              description="Cybersecurity Workshop, Microsoft Access 2013, Responsive Web Design, Electromechanical & maintenance industry"
            />
          </div>
        </Section>

        <Section
          title="Professional Achievements"
          icon={Trophy}
          isOpen={openSections.accomplishments}
          onToggle={() => toggleSection('accomplishments')}
        >
          <div className="space-y-4">
            <Achievement
              icon={Award}
              title="Cybersecurity Leadership"
              description="Led team to top rankings in global cybersecurity competitions"
            />
            <Achievement
              icon={Award}
              title="Educational Impact"
              description="Developed and implemented Generative AI curriculum for ADEK"
            />
            <Achievement
              icon={Award}
              title="Technical Excellence"
              description="Received 'The Best Trainee' and 'The Best Student' awards"
            />
          </div>
        </Section>
        <Section
  title="Transferable Skills"
  icon={ArrowUp}
  isOpen={openSections.transfer}
  onToggle={() => toggleSection('transfer')}
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h3 className="font-semibold mb-3 text-purple-700">Cross-Industry Skills</h3>
      <ul className="space-y-2">
        <li className="flex items-center space-x-2 group">
          <Lightbulb className="h-4 w-4 text-purple-600 group-hover:animate-pulse" />
          <span className="group-hover:text-purple-600 transition-colors">
            Problem-Solving Methodologies
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          <FileText className="h-4 w-4 text-purple-600 group-hover:animate-pulse" />
          <span className="group-hover:text-purple-600 transition-colors">
            Technical Documentation
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          <ShieldAlert className="h-4 w-4 text-purple-600 group-hover:animate-pulse" />
          <span className="group-hover:text-purple-600 transition-colors">
            Risk Assessment
          </span>
        </li>
      </ul>
    </div>
    <div>
      <h3 className="font-semibold mb-3 text-blue-700">Universal Competencies</h3>
      <ul className="space-y-2">
        <li className="flex items-center space-x-2 group">
          <Briefcase className="h-4 w-4 text-blue-600 group-hover:animate-pulse" />
          <span className="group-hover:text-blue-600 transition-colors">
            Project Management
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          <Users className="h-4 w-4 text-blue-600 group-hover:animate-pulse" />
          <span className="group-hover:text-blue-600 transition-colors">
            Team Leadership
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          <TrendingUp className="h-4 w-4 text-blue-600 group-hover:animate-pulse" />
          <span className="group-hover:text-blue-600 transition-colors">
            Process Optimization
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          <Target className="h-4 w-4 text-blue-600 group-hover:animate-pulse" />
          <span className="group-hover:text-blue-600 transition-colors">
            Strategic Planning
          </span>
        </li>
      </ul>
    </div>
  </div>
</Section>
        <Section
  title="Key Responsibilities"
  icon={Briefcase}
  isOpen={openSections.respo}
  onToggle={() => toggleSection('respo')}
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h3 className="font-semibold mb-3 text-purple-700">Current Role - 42 Abu Dhabi</h3>
      <ul className="space-y-2">
        <li className="flex items-center space-x-2 group">
          <Shield className="h-4 w-4 text-purple-600 group-hover:animate-pulse" />
          <span className="group-hover:text-purple-600 transition-colors">
            Leading leetSec cybersecurity club initiatives
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          <Presentation className="h-4 w-4 text-purple-600 group-hover:animate-pulse" />
          <span className="group-hover:text-purple-600 transition-colors">
            Organizing technical workshops and training sessions
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          <Trophy className="h-4 w-4 text-purple-600 group-hover:animate-pulse" />
          <span className="group-hover:text-purple-600 transition-colors">
            Managing team competitions and hackathons
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          <BookOpen className="h-4 w-4 text-purple-600 group-hover:animate-pulse" />
          <span className="group-hover:text-purple-600 transition-colors">
            Developing educational content and resources
          </span>
        </li>
      </ul>
    </div>
    <div>
      <h3 className="font-semibold mb-3 text-blue-700">Previous Role - Aircraft Technician</h3>
      <ul className="space-y-2">
        <li className="flex items-center space-x-2 group">
          <Wrench className="h-4 w-4 text-blue-600 group-hover:animate-pulse" />
          <span className="group-hover:text-blue-600 transition-colors">
            Performing complex maintenance procedures
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          < ShieldCheck className="h-4 w-4 text-blue-600 group-hover:animate-pulse" />
          <span className="group-hover:text-blue-600 transition-colors">
            Ensuring compliance with safety regulations
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          <FileText className="h-4 w-4 text-blue-600 group-hover:animate-pulse" />
          <span className="group-hover:text-blue-600 transition-colors">
            Managing technical documentation
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          <Users className="h-4 w-4 text-blue-600 group-hover:animate-pulse" />
          <span className="group-hover:text-blue-600 transition-colors">
            Collaborating with engineering teams
          </span>
        </li>
      </ul>
    </div>
  </div>
</Section>





<Section
  title="Challenges"
  icon={Lightbulb}
  isOpen={openSections.challengess}
  onToggle={() => toggleSection('challengess')}
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h3 className="font-semibold mb-3 text-purple-700">Key Challenges</h3>
      <ul className="space-y-2">
        <li className="flex items-center space-x-2 group">
          <Compass className="h-4 w-4 text-purple-600 group-hover:animate-pulse" />
          <span className="group-hover:text-purple-600 transition-colors">
            Career transition complexity
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          <Layers className="h-4 w-4 text-orange-500 group-hover:animate-pulse" />
          <span className="group-hover:text-orange-600 transition-colors">
            Technical skill acquisition
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          <Users className="h-4 w-4 text-blue-500 group-hover:animate-pulse" />
          <span className="group-hover:text-blue-600 transition-colors">
            Leadership development
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          <MessageCircle className="h-4 w-4 text-green-500 group-hover:animate-pulse" />
          <span className="group-hover:text-green-600 transition-colors">
            Cross-cultural communication
          </span>
        </li>
      </ul>
    </div>
    <div>
      <h3 className="font-semibold mb-3 text-blue-700">Solutions Implemented</h3>
      <ul className="space-y-2">
        <li className="flex items-center space-x-2 group">
          <BookOpen className="h-4 w-4 text-blue-600 group-hover:animate-pulse" />
          <span className="group-hover:text-blue-600 transition-colors">
            Intensive self-study programs
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          <Zap className="h-4 w-4 text-yellow-500 group-hover:animate-pulse" />
          <span className="group-hover:text-yellow-600 transition-colors">
            Mentorship relationships
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          <AlertTriangle className="h-4 w-4 text-red-500 group-hover:animate-pulse" />
          <span className="group-hover:text-red-600 transition-colors">
            Practical project experience
          </span>
        </li>
        <li className="flex items-center space-x-2 group">
          <Globe className="h-4 w-4 text-indigo-500 group-hover:animate-pulse" />
          <span className="group-hover:text-indigo-600 transition-colors">
            Continuous feedback integration
          </span>
        </li>
      </ul>
    </div>
  </div>
</Section>
        <Section
          title="Growth Opportunities"
          icon={Gem}
          isOpen={openSections.Opportunities}
          onToggle={() => toggleSection('Opportunities')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-purple-700">Areas for Development</h3>
              <ul className="space-y-2">
              <li className="flex items-center space-x-2 group">
  <AlertTriangle className="h-4 w-4 text-red-500 group-hover:animate-pulse" />
  <span className="group-hover:text-red-600 transition-colors">
    Career transition complexity
  </span>
</li>
<li className="flex items-center space-x-2 group">
  <Layers className="h-4 w-4 text-orange-500 group-hover:animate-pulse" />
  <span className="group-hover:text-orange-600 transition-colors">
    Technical skill acquisition
  </span>
</li>
<li className="flex items-center space-x-2 group">
  <Users className="h-4 w-4 text-blue-500 group-hover:animate-pulse" />
  <span className="group-hover:text-blue-600 transition-colors">
    Leadership development
  </span>
</li>
<li className="flex items-center space-x-2 group">
  <Globe className="h-4 w-4 text-green-500 group-hover:animate-pulse" />
  <span className="group-hover:text-green-600 transition-colors">
    Cross-cultural communication
  </span>
</li>
              </ul>
            </div>
            </div>
        </Section>
        <Section
          title="Goals & Vision"
          icon={Gem}
          isOpen={openSections.goals}
          onToggle={() => toggleSection('goals')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-purple-700">Short Term Goals</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 group">
                  <Target className="h-4 w-4 text-purple-600 group-hover:animate-spin" />
                  <span className="group-hover:text-purple-600 transition-colors">
                    Complete Software Development Diploma
                  </span>
                </li>
                <li className="flex items-center space-x-2 group">
                  <Target className="h-4 w-4 text-purple-600 group-hover:animate-spin" />
                  <span className="group-hover:text-purple-600 transition-colors">
                    Expand leetSec cybersecurity club impact
                  </span>
                </li>
                <li className="flex items-center space-x-2 group">
                  <Target className="h-4 w-4 text-purple-600 group-hover:animate-spin" />
                  <span className="group-hover:text-purple-600 transition-colors">
                    Master advanced AI technologies
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-blue-700">Long Term Goals</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 group">
                  <Target className="h-4 w-4 text-blue-600 group-hover:animate-spin" />
                  <span className="group-hover:text-blue-600 transition-colors">
                    Become a leading expert in cybersecurity
                  </span>
                </li>
                <li className="flex items-center space-x-2 group">
                  <Target className="h-4 w-4 text-blue-600 group-hover:animate-spin" />
                  <span className="group-hover:text-blue-600 transition-colors">
                    Develop innovative educational tech programs
                  </span>
                </li>
                <li className="flex items-center space-x-2 group">
                  <Target className="h-4 w-4 text-blue-600 group-hover:animate-spin" />
                  <span className="group-hover:text-blue-600 transition-colors">
                    Create impact in UAE's tech education sector
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Section>
        </motion.div>

<style jsx global>{`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
     html {
    scroll-behavior: smooth;
  }
  .bg-size-200 { background-size: 200% 100%; }
  .bg-pos-0 { background-position: 0% 0%; }
  .bg-pos-100 { background-position: 100% 0%; }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  @keyframes glow {
    0% { box-shadow: 0 0 5px rgba(147, 51, 234, 0.5); }
    50% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.8); }
    100% { box-shadow: 0 0 5px rgba(147, 51, 234, 0.5); }
  }

  .float-animation { animation: float 3s ease-in-out infinite; }
  .glow-animation { animation: glow 2s ease-in-out infinite; }
`}</style>
</motion.div>
  );
};

export default SelfReview;