"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Server, 
  Shield, 
  Network, 
  Monitor, 
  HardDrive, 
  Cloud,
  ArrowRight,
  Github,
  BookOpen
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const infrastructureComponents = [
  {
    id: 'proxmox',
    title: 'Proxmox Virtualization',
    description: 'Enterprise-grade virtualization platform',
    icon: <Server className="h-6 w-6" />,
    color: 'text-blue-500',
    slug: 'proxmox-setup'
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes Cluster',
    description: 'Container orchestration and management',
    icon: <Cloud className="h-6 w-6" />,
    color: 'text-purple-500',
    slug: 'kubernetes-cluster'
  },
  {
    id: 'networking',
    title: 'Network Infrastructure',
    description: 'pfSense, VLANs, and security',
    icon: <Network className="h-6 w-6" />,
    color: 'text-green-500',
    slug: 'network-setup'
  },
  {
    id: 'monitoring',
    title: 'Monitoring Stack',
    description: 'Prometheus, Grafana, and alerting',
    icon: <Monitor className="h-6 w-6" />,
    color: 'text-orange-500',
    slug: 'monitoring-stack'
  },
  {
    id: 'storage',
    title: 'Storage Solutions',
    description: 'NAS, backup, and distributed storage',
    icon: <HardDrive className="h-6 w-6" />,
    color: 'text-cyan-500',
    slug: 'storage-setup'
  },
  {
    id: 'security',
    title: 'Security & Access',
    description: 'VPN, authentication, and hardening',
    icon: <Shield className="h-6 w-6" />,
    color: 'text-red-500',
    slug: 'security-setup'
  }
]

export default function InfrastructurePage() {
  return (
    <div className="container py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Infrastructure Architecture & Setup Guides
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Comprehensive guides and documentation for building a production-ready homelab infrastructure.
          From virtualization to monitoring, security to storage - everything you need to replicate my setup.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <a 
              href="https://github.com/vishvesh11/self-hosting-guides" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              Complete Setup Repository
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href="/homelab">
              <Server className="h-5 w-5" />
              View My Current Setup
            </Link>
          </Button>
        </div>
      </motion.div>
      
      {/* Infrastructure Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-16"
      >
        <Card className="overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Infrastructure Overview</CardTitle>
            <CardDescription>
              High-level architecture diagram of the complete homelab setup
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative aspect-video bg-muted/50">
              <Image 
                src="https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Infrastructure Diagram"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-sm text-muted-foreground bg-background/80 backdrop-blur-sm rounded p-3">
                  This diagram shows the complete infrastructure layout including physical servers, 
                  network topology, virtualization layers, and service deployments. Each component 
                  is designed for high availability and scalability.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Setup Guides Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Setup Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infrastructureComponents.map((component, index) => (
            <motion.div
              key={component.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                <Link href={`/infrastructure/guides/${component.slug}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`${component.color}`}>
                        {component.icon}
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {component.title}
                      </CardTitle>
                    </div>
                    <CardDescription>{component.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Step-by-step guide
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center"
      >
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <BookOpen className="h-5 w-5" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Each guide includes detailed configuration files, troubleshooting tips, 
              and best practices learned from real-world deployment experience.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="outline">
                <a 
                  href="https://github.com/vishvesh11/self-hosting-guides/tree/main/configs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Configuration Files
                </a>
              </Button>
              <Button asChild variant="outline">
                <a 
                  href="https://github.com/vishvesh11/self-hosting-guides/tree/main/scripts" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Automation Scripts
                </a>
              </Button>
              <Button asChild variant="outline">
                <a 
                  href="https://github.com/vishvesh11/self-hosting-guides/wiki" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Troubleshooting Wiki
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}