
"use client" 

import { useParams, notFound } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  Lightbulb,
  PuzzleIcon,
  FileText,
  Loader2
} from 'lucide-react'
import { projects } from '@/lib/data' 

export default function ProjectClientPage() { 
  const params = useParams()
  const slug = params?.slug as string
  const [readme, setReadme] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const project = projects.find(p => p.slug === slug)

  useEffect(() => {
    if (project?.githubUrl) {
      fetchReadme()
    }
  }, [project])

  const fetchReadme = async () => {
    if (!project?.githubUrl) return

    setLoading(true)
    try {

      const urlParts = project.githubUrl.split('/')
      const owner = urlParts[urlParts.length - 2]
      const repo = urlParts[urlParts.length - 1]

      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`)
      if (response.ok) {
        const data = await response.json()
        const content = atob(data.content)
        setReadme(content)
      } else {
        setReadme(`Failed to load README. Status: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to fetch README:', error)
      setReadme('README content could not be loaded due to a network error.')
    } finally {
      setLoading(false)
    }
  }

  if (!project) {
    notFound()
  }

  return (
    <div className="container py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
              <Image
                src={project.imageSrc}
                alt={project.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{project.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="overview">Project Overview</TabsTrigger>
                <TabsTrigger value="readme">
                  <FileText className="h-4 w-4 mr-2" />
                  README
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="text-lg">{project.longDescription}</p>

                  <Separator className="my-8" />

                  <h2 className="text-2xl font-semibold mb-4">Problem Statement</h2>
                  <p>{project.problem}</p>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">Solution</h2>
                  <p>{project.solution}</p>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">Architecture</h2>
                  <Card className="bg-muted/50 border-dashed">
                    <CardContent className="p-6">
                      <div className="font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                        {project.architecture}
                      </div>
                    </CardContent>
                  </Card>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">Key Challenges</h2>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <PuzzleIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">Outcomes & Impact</h2>
                  <ul className="space-y-2">
                    {project.outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="readme">
                <Card>
                  <CardContent className="p-6">
                    {loading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        <span>Loading README...</span>
                      </div>
                    ) : readme ? (
                      <div className="prose prose-neutral dark:prose-invert max-w-none">
                        {/* You might want a Markdown renderer here if you intend to display formatted MD */}
                        <pre className="whitespace-pre-wrap text-sm">{readme}</pre>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No README available for this project or failed to load.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticky top-24"
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Project Links</h3>

                <div className="space-y-4">
                  {project.githubUrl && (
                    <Button asChild variant="outline" className="w-full justify-start">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View Source Code
                      </a>
                    </Button>
                  )}

                  {project.liveUrl && (
                    <Button asChild variant="outline" className="w-full justify-start">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>

                <Separator className="my-6" />

                <h3 className="text-lg font-semibold mb-4">Key Learnings</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Implementing proper monitoring is crucial for maintaining system reliability.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Automation reduces human error and improves deployment consistency.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Documentation is as important as the implementation itself.
                    </p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-center">
                  <Button asChild>
                    <Link href="/projects">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}