"use client"

import { useParams, notFound } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  Github, 
  ExternalLink,
  FileText,
  Loader2,
  Download,
  Terminal,
  Settings
} from 'lucide-react'

const guideData = {
  'proxmox-setup': {
    title: 'Proxmox VE Setup & Configuration',
    description: 'Complete guide to setting up Proxmox Virtual Environment for homelab use',
    githubPath: 'proxmox',
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hours',
    prerequisites: ['Basic Linux knowledge', 'Hardware with virtualization support', 'Network configuration basics']
  },
  'kubernetes-cluster': {
    title: 'Kubernetes Cluster Deployment',
    description: 'Building a production-ready Kubernetes cluster with k3s',
    githubPath: 'kubernetes',
    difficulty: 'Advanced',
    estimatedTime: '4-6 hours',
    prerequisites: ['Docker experience', 'Linux administration', 'Network understanding']
  },
  'network-setup': {
    title: 'Network Infrastructure & Security',
    description: 'pfSense configuration, VLANs, and network segmentation',
    githubPath: 'networking',
    difficulty: 'Advanced',
    estimatedTime: '3-4 hours',
    prerequisites: ['Network fundamentals', 'Firewall concepts', 'VLAN knowledge']
  },
  'monitoring-stack': {
    title: 'Monitoring & Observability Stack',
    description: 'Prometheus, Grafana, and alerting setup',
    githubPath: 'monitoring',
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hours',
    prerequisites: ['Docker/containers', 'Basic monitoring concepts', 'YAML configuration']
  },
  'storage-setup': {
    title: 'Storage Solutions & Backup',
    description: 'NAS setup, distributed storage, and backup strategies',
    githubPath: 'storage',
    difficulty: 'Intermediate',
    estimatedTime: '3-4 hours',
    prerequisites: ['Storage concepts', 'RAID understanding', 'Backup principles']
  },
  'security-setup': {
    title: 'Security & Access Control',
    description: 'VPN, authentication, and security hardening',
    githubPath: 'security',
    difficulty: 'Advanced',
    estimatedTime: '4-5 hours',
    prerequisites: ['Security fundamentals', 'Certificate management', 'Authentication concepts']
  }
}

export default function GuideDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [guideContent, setGuideContent] = useState<string>('')
  const [loading, setLoading] = useState(false)
  
  const guide = guideData[slug as keyof typeof guideData]
  
  useEffect(() => {
    if (guide) {
      fetchGuideContent()
    }
  }, [guide])
  
  const fetchGuideContent = async () => {
    setLoading(true)
    try {
      // This would fetch from your GitHub repository
      // For now, we'll show a placeholder
      setGuideContent(`# ${guide.title}

## Overview
This comprehensive guide will walk you through setting up ${guide.title.toLowerCase()} in your homelab environment.

## Prerequisites
${guide.prerequisites.map(req => `- ${req}`).join('\n')}

## Estimated Time
${guide.estimatedTime}

## Difficulty Level
${guide.difficulty}

## Step-by-Step Instructions

### Step 1: Initial Setup
Detailed instructions for the initial setup process...

### Step 2: Configuration
Configuration steps and best practices...

### Step 3: Testing & Validation
How to test your setup and validate it's working correctly...

### Step 4: Troubleshooting
Common issues and their solutions...

## Configuration Files
All configuration files are available in the GitHub repository.

## Next Steps
What to do after completing this setup...

---

*This guide is part of the complete homelab setup documentation. For the full guide with all configuration files and scripts, visit the GitHub repository.*`)
    } catch (error) {
      console.error('Failed to fetch guide content:', error)
      setGuideContent('Guide content could not be loaded.')
    } finally {
      setLoading(false)
    }
  }
  
  if (!guide) {
    notFound()
  }
  
  return (
    <div className="container py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/infrastructure">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Infrastructure
        </Link>
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{guide.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{guide.description}</p>
            
            <Tabs defaultValue="guide" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="guide">
                  <FileText className="h-4 w-4 mr-2" />
                  Guide
                </TabsTrigger>
                <TabsTrigger value="configs">
                  <Settings className="h-4 w-4 mr-2" />
                  Configs
                </TabsTrigger>
                <TabsTrigger value="scripts">
                  <Terminal className="h-4 w-4 mr-2" />
                  Scripts
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="guide">
                <Card>
                  <CardContent className="p-6">
                    {loading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        <span>Loading guide content...</span>
                      </div>
                    ) : (
                      <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <pre className="whitespace-pre-wrap text-sm">{guideContent}</pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="configs">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuration Files</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      All configuration files for this setup are available in the GitHub repository.
                    </p>
                    <Button asChild>
                      <a 
                        href={`https://github.com/vishvesh11/self-hosting-guides/tree/main/${guide.githubPath}/configs`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Configs
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="scripts">
                <Card>
                  <CardHeader>
                    <CardTitle>Automation Scripts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Automation scripts to help with installation and configuration.
                    </p>
                    <Button asChild>
                      <a 
                        href={`https://github.com/vishvesh11/self-hosting-guides/tree/main/${guide.githubPath}/scripts`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Scripts
                      </a>
                    </Button>
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
            className="sticky top-24 space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Guide Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Difficulty</h4>
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                    guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    guide.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {guide.difficulty}
                  </span>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Estimated Time</h4>
                  <p className="text-sm text-muted-foreground">{guide.estimatedTime}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Prerequisites</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {guide.prerequisites.map((req, index) => (
                      <li key={index}>• {req}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <a 
                    href={`https://github.com/vishvesh11/self-hosting-guides/tree/main/${guide.githubPath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
                
                <Button asChild variant="outline" className="w-full justify-start">
                  <a 
                    href={`https://github.com/vishvesh11/self-hosting-guides/issues`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Report Issues
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}