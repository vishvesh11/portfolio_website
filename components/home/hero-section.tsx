'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Brain, Database, LineChart, Cloud, Server, Box } from 'lucide-react';
import Link from 'next/link';

const techIcons = [
  {
    icon: <Brain className="h-8 w-8" />,
    name: 'Machine Learning',
    color: 'text-purple-400',
  },
  {
    icon: <Database className="h-8 w-8" />,
    name: 'Data Engineering',
    color: 'text-blue-500',
  },
  {
    icon: <LineChart className="h-8 w-8" />,
    name: 'Analytics',
    color: 'text-green-400',
  },
  { icon: <Cloud className="h-8 w-8" />, name: 'Cloud', color: 'text-sky-400' },
  {
    icon: <Server className="h-8 w-8" />,
    name: 'MLOps',
    color: 'text-red-400',
  },
  {
    icon: <Box className="h-8 w-8" />,
    name: 'DevOps',
    color: 'text-orange-400',
  },
];

export default function HeroSection() {
  const [currentTechIndex, setCurrentTechIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTechIndex((prevIndex) => (prevIndex + 1) % techIcons.length);
    }, 3000);

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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                DevOps & Data Science Engineer  <span className="text-primary">|</span> Bridging Models to Production
              </h1>
              <p className="mt-4 text-xl text-muted-foreground">
                Empowered by DevOps Principles for Scalable Deployments
              </p>
              <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
                As a Data Scientist by education, I'm passionate about
                extracting meaningful insights from complex data and building
                predictive models. My hands-on experience in DevOps and
                self-hosting allows me to bridge the gap between model
                development and production, ensuring data-driven solutions are
                efficiently deployed, monitored, and maintained.
              </p>
            </motion.div>

            <motion.div
              className="pt-4 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" asChild>
                <Link href="/projects">Explore My Data Science Projects</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/homelab">View My DevOps Infrastructure</Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect on LinkedIn
                </a>
              </Button>
            </motion.div>
          </div>

          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative h-[300px] md:h-[400px] bg-background/40 backdrop-blur-sm rounded-lg p-8 border"
            >
              <div className="flex flex-col h-full justify-center items-center">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  {techIcons.map((tech, i) => (
                    <div
                      key={i}
                      className="absolute"
                      style={{ opacity: i === currentTechIndex ? 0.7 : 0.1 }}
                    >
                      {tech.icon}
                    </div>
                  ))}
                </div>

                <motion.div
                  key={currentTechIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col items-center justify-center ${techIcons[currentTechIndex].color}`}
                >
                  <div className="text-4xl mb-4">
                    {techIcons[currentTechIndex].icon}
                  </div>
                  <p className="text-xl font-medium">
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
