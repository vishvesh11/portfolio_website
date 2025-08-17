"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Search,
  Globe,
  Shield,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type ServiceStatus = 'online' | 'offline' | 'maintenance'

type Service = {
  id: string
  name: string
  description: string
  url: string
  category: 'productivity' | 'development' | 'media' | 'utility' | 'monitoring'
  icon: string
  status: ServiceStatus
  lastChecked: string
  features: string[]
}

const services: Service[] = [
  {
    id: 'excalidraw',
    name: 'Excalidraw',
    description: 'Coming soon: A virtual whiteboard for sketching hand-drawn like diagrams.',
    url: 'https://draw.vishvesh.me',
    category: 'productivity',
    icon: '✏️',
    status: 'online',
    lastChecked: '1 minute ago',
    features: ['Collaborative drawing']
  },
  {
    id: 'reactive-resume',
    name: 'Reactive Resume',
    description: 'Free and open-source resume builder',
    url: 'https://resumebuilder.vishvesh.me/auth/login?redirect=/dashboard',
    category: 'productivity',
    icon: '📄',
    status: 'online',
    lastChecked: '1 minute ago',
    features: ['Multiple templates', 'PDF export', 'Real-time preview']
  },
  {
    id: 'nextcloud',
    name: 'Nextcloud',
    description: 'Coming soon: Self-hosted file sync and collaboration platform.',
    url: 'https://next.vishvesh.me',
    category: 'productivity',
    icon: '☁️',
    status: 'online',
    lastChecked: '1 minute ago',
    features: ['File sync', 'Collaboration tools', 'Calendar', 'Contacts']
  },
  {
    id: 'grafana',
    name: 'Grafana',
    description: 'Coming soon: Monitoring and observability dashboards.',
    url: "https://kube.vishvesh.me",
    category: 'monitoring',
    icon: '📊',
    status: 'online',
    lastChecked: '1 minute ago',
    features: ['monitoring', 'dashboards', 'visualization']
  },
  {
    id: 'code-server',
    name: 'Code Server',
    description: 'Coming soon: VS Code in the browser for remote development.',
    url: '#coming-soon',
    category: 'development',
    icon: '💻',
    status: 'maintenance',
    lastChecked: 'N/A',
    features: ['Coming Soon']
  },
  {
    id: 'gitea',
    name: 'Gitea',
    description: 'Coming soon: Self-hosted Git service with web interface.',
    url: '#coming-soon',
    category: 'development',
    icon: '🔧',
    status: 'maintenance',
    lastChecked: 'N/A',
    features: ['Coming Soon']
  },
  
  {
    id: 'jellyfin',
    name: 'Jellyfin',
    description: 'Coming soon: Media server for streaming movies, TV shows, and music.',
    url: '#coming-soon',
    category: 'media',
    icon: '🎬',
    status: 'maintenance',
    lastChecked: 'N/A',
    features: ['Coming Soon']
  },
  {
    id: 'uptime-kuma',
    name: 'Uptime Kuma',
    description: 'Coming soon: Self-hosted monitoring tool for uptime tracking.',
    url: '#coming-soon',
    category: 'monitoring',
    icon: '⏱️',
    status: 'maintenance',
    lastChecked: 'N/A',
    features: ['Coming Soon']
  },
  {
    id: 'vaultwarden',
    name: 'Vaultwarden',
    description: 'Coming soon: Self-hosted Bitwarden compatible password manager.',
    url: '#coming-soon',
    category: 'utility',
    icon: '🔐',
    status: 'maintenance',
    lastChecked: 'N/A',
    features: ['Coming Soon']
  },
  {
    id: 'portainer',
    name: 'Portainer',
    description: 'Coming soon: Container management platform.',
    url: '#coming-soon',
    category: 'development',
    icon: '🐳',
    status: 'maintenance',
    lastChecked: 'N/A',
    features: ['Coming Soon']
  }
]
const categoryColors = {
  productivity: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  development: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  media: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  utility: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  monitoring: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

const statusIcons = {
  online: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  offline: <XCircle className="h-4 w-4 text-red-500" />,
  maintenance: <Clock className="h-4 w-4 text-yellow-500" />
}

const statusColors = {
  online: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  offline: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  maintenance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
}

export default function SelfHostedToolsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [onlineCount, setOnlineCount] = useState(0)
  
  useEffect(() => {
    setOnlineCount(services.filter(service => service.status === 'online').length)
  }, [])
  
  const categories = ['all', ...Array.from(new Set(services.map(service => service.category)))]
  
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  
  return (
    <div className="container py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Self-Hosted Tools & Services
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          A collection of open-source tools and services running on my homelab infrastructure. 
          All services are self-hosted for privacy, control, and learning purposes.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900 px-4 py-2 rounded-lg">
            <Globe className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">{onlineCount} Services Online</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-lg">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium">SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900 px-4 py-2 rounded-lg">
            <Zap className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium">99.9% Uptime</span>
          </div>
        </div>
      </motion.div>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-md transition-all duration-200 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{service.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={categoryColors[service.category]} variant="secondary">
                          {service.category}
                        </Badge>
                        <Badge className={statusColors[service.status]} variant="secondary">
                          <div className="flex items-center gap-1">
                            {statusIcons[service.status]}
                            {service.status}
                          </div>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Features</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Last checked: {service.lastChecked}
                    </span>
                    <Button 
                      asChild 
                      size="sm" 
                      disabled={service.status === 'offline'}
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      <a 
                        href={service.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {service.status === 'offline' ? 'Offline' : 'Open'}
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No services found matching your criteria.</p>
        </div>
      )}
      
      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">About These Services</h3>
            <p className="text-sm text-muted-foreground">
              All services are running on my homelab infrastructure with proper SSL certificates, 
              monitoring, and backup strategies. Access may be restricted for certain services. 
              If you're interested in setting up similar services, check out my infrastructure guides.
            </p>
            <Button asChild variant="outline" className="mt-4">
              <a href="/infrastructure">
                View Setup Guides
              </a>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}