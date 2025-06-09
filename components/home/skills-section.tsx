"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'; // Imports all icons from lucid-react

// Helper function to get the Lucide icon component by name string
const getLucidIconComponent = (iconName: string) => {
  const IconComponent = (LucideIcons as any)[
    iconName.charAt(0).toUpperCase() + iconName.slice(1)
  ];
  return IconComponent || LucideIcons.HelpCircle; // Fallback icon if not found
};

// Import your revised data structures
import { technologies, technologyCategories } from '@/lib/data' 
import React from 'react';

type TechCategoryProps = {
  title: string
  icon: React.ReactNode // This will now be a ReactNode (the actual Lucid Icon component)
  description: string
  technologies: string[]
  className?: string
}

function TechCategory({ title, icon, description, technologies, className }: TechCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
      className={cn(
        "rounded-lg border bg-card p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon} {/* The icon is directly passed as a ReactNode with its color */}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-md bg-muted px-3 py-1 text-sm font-medium text-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const groupedTechnologies = technologyCategories.map(category => {
    return {
      ...category,
      technologies: technologies
        .filter(tech => tech.category === category.key)
        .map(tech => tech.name)
    };
  });
  
  return (
    <section id="skills" className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">My Technical Stack</h2>
            <p className="text-muted-foreground text-lg">
              As a **DevOps cum Data Science Engineer**, I bridge the gap between insightful data models and robust production systems. Here's a look at the technologies empowering my work.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupedTechnologies.map((category) => {
            const CategoryIconComponent = getLucidIconComponent(category.icon);
            let iconColorClass = 'text-gray-500'; // Default color

            // Apply specific colors based on category key
            switch (category.key) {
              case 'machine-learning':
                iconColorClass = 'text-purple-500';
                break;
              case 'data-engineering':
                iconColorClass = 'text-blue-500';
                break;
              case 'analytics':
                iconColorClass = 'text-green-500';
                break;
              case 'mlops':
                iconColorClass = 'text-red-500';
                break;
              case 'cloud':
                iconColorClass = 'text-sky-500';
                break;
              case 'networking':
                iconColorClass = 'text-orange-500'; // New color for networking
                break;
              case 'security':
                iconColorClass = 'text-indigo-500'; // New color for security
                break;
              case 'observability':
                iconColorClass = 'text-yellow-500'; // New color for observability
                break;
              default:
                iconColorClass = 'text-gray-500'; // Fallback
            }

            return (
              <TechCategory
                key={category.key}
                title={category.name}
                // Render the icon component with dynamic color
                icon={CategoryIconComponent && React.createElement(CategoryIconComponent, { className: cn("h-6 w-6", iconColorClass) })}
                technologies={category.technologies} description={''}              />
            );
          })}
        </div>
      </div>
    </section>
  )
}