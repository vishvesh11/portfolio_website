'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Brain, Database, LineChart, Cloud, Server, Box, Terminal, Github, Linkedin, Mail, Download } from 'lucide-react';
import Link from 'next/link';

const techIcons = [
  { icon: <Brain className="h-8 w-8" />, name: 'Machine Learning', color: 'text-purple-400' },
  { icon: <Database className="h-8 w-8" />, name: 'Data Engineering', color: 'text-blue-500' },
  { icon: <LineChart className="h-8 w-8" />, name: 'Analytics', color: 'text-green-400' },
  { icon: <Cloud className="h-8 w-8" />, name: 'Cloud', color: 'text-sky-400' },
  { icon: <Server className="h-8 w-8" />, name: 'MLOps', color: 'text-red-400' },
  { icon: <Box className="h-8 w-8" />, name: 'DevOps', color: 'text-orange-400' },
];

export default function HeroSection() {
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTechIndex((prevIndex) => (prevIndex + 1) % techIcons.length);
    }, 3000);
    // 2. Format today's date safely on the client
    const today = new Date();
    const formatted = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setDateStr(formatted);
    return () => clearInterval(interval);
    
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/60 z-10" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="container relative z-20 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                Systems Operational
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Systems Architect <span className="text-primary">&</span> Data Scientist
              </h1>
              <p className="mt-4 text-xl font-mono text-muted-foreground">
                <span className="text-primary">~ $</span> ./deploy_infrastructure.sh --scale=global
              </p>
              
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Graduate of IIT Madras (B.Tech AI & BS Data Science) bridging the gap between high-parameter inference and bare-metal reality. I build, scale, and maintain geo-distributed infrastructure across on-prem nodes and cloud environments (OCI/AWS), turning complex data pipelines into resilient, automated systems.
              </p>
            </motion.div>

            <motion.div
              className="pt-4 flex flex-wrap gap-4 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Quirky Resume Download */}
              <Button size="lg" className="font-mono group" asChild>
                <a href="/Vishvesh Singh Pal.pdf" download={`Vishvesh Singh Pal ${dateStr}.pdf`}>
                  <Terminal className="mr-2 h-4 w-4 group-hover:text-green-400 transition-colors" />
                  cat resume.pdf <Download className="ml-2 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </Button>

              <div className="flex items-center gap-2 ml-2">
                <Button size="icon" variant="ghost" asChild>
                  <a href="https://github.com/vishvesh11" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" asChild>
                  <a href="https://www.linkedin.com/in/vishvesh11" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" asChild>
                  <a href="mailto:vishveshspal@gmail.com" aria-label="Email">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-5 hidden md:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative h-[300px] md:h-[400px] bg-background/40 backdrop-blur-sm rounded-lg p-8 border border-primary/20 shadow-[0_0_30px_-15px_rgba(var(--primary),0.3)]"
            >
              <div className="flex flex-col h-full justify-center items-center">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  {techIcons.map((tech, i) => (
                    <div
                      key={i}
                      className="absolute transition-opacity duration-1000"
                      style={{ opacity: i === currentTechIndex ? 0.7 : 0 }}
                    >
                      {tech.icon}
                    </div>
                  ))}
                </div>

                <motion.div
                  key={currentTechIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col items-center justify-center ${techIcons[currentTechIndex].color}`}
                >
                  <div className="text-6xl mb-4 drop-shadow-md">
                    {techIcons[currentTechIndex].icon}
                  </div>
                  <p className="text-xl font-mono font-medium bg-background/80 px-4 py-1 rounded-full border">
                    {techIcons[currentTechIndex].name}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}