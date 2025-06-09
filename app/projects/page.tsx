"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  ArrowRight, 
  Github, 
  ExternalLink,
  Search
} from 'lucide-react'
import { projects } from '@/lib/data'

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.technologies.some(tech => 
      tech.toLowerCase().includes(searchQuery.toLowerCase())
    ) ||
    project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <div className="container py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">My Projects</h1>
        <p className="text-xl text-muted-foreground mb-8">
          A collection of data science, DevOps, infrastructure, and self-hosting projects I've worked on.
        </p>
        
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search projects by name or technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    <Button asChild variant="ghost\" size="icon">
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
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}