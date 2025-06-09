"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  Github, 
  ExternalLink 
} from 'lucide-react'
import { projects } from '@/lib/data'

function ProjectCard({ project, index }: { project: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
    >
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={project.imageSrc}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold tracking-tight mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{project.shortDescription}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech: string) => (
            <span 
              key={tech}
              className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/projects/${project.slug}`}>
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <Button asChild variant="ghost" size="icon">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button asChild variant="ghost" size="icon">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectHighlights() {
  // Show only featured projects (limited to 3)
  const featuredProjects = projects.slice(0, 3)
  
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-3">Featured Projects</h2>
            <p className="text-muted-foreground">
              A selection of my recent DevOps and self-hosting projects, showcasing my skills and experience.
            </p>
          </motion.div>
          
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link href="/projects">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}