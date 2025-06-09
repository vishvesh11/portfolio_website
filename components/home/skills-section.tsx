"use client"

import { motion } from 'framer-motion'
import { 
  Brain,
  Database,
  BarChart,
  GitBranch,
  Cloud,
  Code
} from 'lucide-react'
import { technologies } from '@/lib/data'
import { cn } from '@/lib/utils'

type TechCategoryProps = {
  title: string
  icon: React.ReactNode
  technologies: string[]
  className?: string
}

function TechCategory({ title, icon, technologies, className }: TechCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "rounded-lg border bg-card p-6 shadow-sm", 
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span 
            key={tech}
            className="inline-flex items-center rounded-md bg-muted px-3 py-1 text-sm font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

const getIconForCategory = (category: string) => {
  switch(category) {
    case 'machine-learning':
      return <Brain className="h-5 w-5 text-purple-500" />
    case 'data-engineering':
      return <Database className="h-5 w-5 text-blue-500" />
    case 'analytics':
      return <BarChart className="h-5 w-5 text-green-500" />
    case 'mlops':
      return <GitBranch className="h-5 w-5 text-red-500" />
    case 'cloud':
      return <Cloud className="h-5 w-5 text-sky-500" />
    default:
      return <Code className="h-5 w-5" />
  }
}

const getCategoryTitle = (category: string) => {
  switch(category) {
    case 'machine-learning':
      return 'Machine Learning'
    case 'data-engineering':
      return 'Data Engineering'
    case 'analytics':
      return 'Analytics & Visualization'
    case 'mlops':
      return 'MLOps & DevOps'
    case 'cloud':
      return 'Cloud & Infrastructure'
    default:
      return category
  }
}

export default function SkillsSection() {
  const categories = [...new Set(technologies.map(tech => tech.category))]
  
  const technologiesByCategory = categories.reduce((acc, category) => {
    acc[category] = technologies
      .filter(tech => tech.category === category)
      .map(tech => tech.name)
    return acc
  }, {} as Record<string, string[]>)
  
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">Technical Skills</h2>
            <p className="text-muted-foreground">
              A comprehensive set of technologies and tools I use for data science, machine learning, and deploying models to production.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <TechCategory 
              key={category}
              title={getCategoryTitle(category)}
              icon={getIconForCategory(category)}
              technologies={technologiesByCategory[category]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}