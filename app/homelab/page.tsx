"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  Server, 
  Shield, 
  Cpu, 
  Network, 
  Monitor, 
  HardDrive, 
  WifiIcon,
  Github,
  Home,
  GitBranch
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function HomelabPage() {
  return (
    <div className="container py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center mb-8"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          My Homelab: The Foundation for Resilient Self-Hosted Data Science & DevOps
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          My homelab serves as a dynamic environment for experimenting with scalable infrastructure, 
          and ensuring robust system reliability. It's where theoretical knowledge meets hands-on implementation, 
          bridging the gap between data science model development and their production deployment.
        </p>
        
        <Button asChild size="lg" className="gap-2">
          <a 
            href="https://github.com/vishvesh11/self-hosting-guides" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
            Explore My Full Homelab Setup & Guides
          </a>
        </Button>
      </motion.div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="hardware">Hardware</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="aspect-square relative rounded-lg overflow-hidden border">
                <Image 
                  src="https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Homelab Server Rack"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-2xl font-bold tracking-tight mb-4">Homelab Overview</h2>
              <p className="text-muted-foreground mb-6">
                My homelab is a self-hosted infrastructure setup that allows me to experiment with DevOps practices, 
                learn new technologies, and host various services for personal use. It's built with a focus on 
                reliability, security, and automation.
              </p>
              <p className="text-muted-foreground">
                The setup includes a mix of physical and virtual servers, network equipment, and storage solutions, 
                all managed using infrastructure as code principles. This environment serves as both a learning platform 
                and a production environment for various applications.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  Computing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Proxmox cluster with 3 nodes, 32 cores total, and 128GB RAM, running various VM workloads and LXC containers.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  pfSense firewall, Cloudflare tunnels, Wireguard VPN, and network segmentation with VLANs.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-primary" />
                  Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Prometheus and Grafana for metrics collection and visualization, with alerting for critical services.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="hardware">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    Primary Server
                  </CardTitle>
                  <CardDescription>Proxmox Host 1</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Dell PowerEdge R720</li>
                    <li>• 2x Intel Xeon E5-2680 v2 (20 cores total)</li>
                    <li>• 64GB ECC DDR3 RAM</li>
                    <li>• 2x 240GB SSD (ZFS mirror for OS)</li>
                    <li>• 4x 4TB HDD (ZFS RAIDZ1 for storage)</li>
                    <li>• 10Gbit SFP+ networking</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-primary" />
                    Secondary Server
                  </CardTitle>
                  <CardDescription>Proxmox Host 2</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Dell PowerEdge R620</li>
                    <li>• 2x Intel Xeon E5-2650 v2 (16 cores total)</li>
                    <li>• 48GB ECC DDR3 RAM</li>
                    <li>• 2x 240GB SSD (ZFS mirror for OS)</li>
                    <li>• 2x 2TB HDD (ZFS mirror for storage)</li>
                    <li>• 1Gbit networking</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-primary" />
                    Networking
                  </CardTitle>
                  <CardDescription>Core Network Infrastructure</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• pfSense firewall/router (virtualized)</li>
                    <li>• Ubiquiti EdgeSwitch 24 (24-port managed switch)</li>
                    <li>• Ubiquiti UniFi AP AC Pro (wireless access point)</li>
                    <li>• Mikrotik CRS305-1G-4S+IN (10GbE switch)</li>
                    <li>• VLANs for network segmentation</li>
                    <li>• Wireguard VPN for remote access</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardDrive className="h-5 w-5 text-primary" />
                    Storage
                  </CardTitle>
                  <CardDescription>Network Attached Storage</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Synology DS1618+ NAS</li>
                    <li>• 6x 8TB WD Red Pro drives (RAID6)</li>
                    <li>• 32GB RAM</li>
                    <li>• 10Gbit SFP+ network card</li>
                    <li>• Cloud backup for critical data</li>
                    <li>• iSCSI targets for VM storage</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-primary" />
                    Edge Device
                  </CardTitle>
                  <CardDescription>IoT Controller</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Raspberry Pi 4 (8GB model)</li>
                    <li>• 128GB SSD via USB adapter</li>
                    <li>• ConBee II Zigbee gateway</li>
                    <li>• Z-Wave USB stick</li>
                    <li>• Running Home Assistant OS</li>
                    <li>• Various sensors and smart devices</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <WifiIcon className="h-5 w-5 text-primary" />
                    Connectivity
                  </CardTitle>
                  <CardDescription>Internet & Internal Network</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 1Gbps fiber internet connection</li>
                    <li>• Static IP address</li>
                    <li>• Cloudflare DNS with DoH</li>
                    <li>• Cloudflare Tunnels for secure remote access</li>
                    <li>• Internal DNS via Pi-hole</li>
                    <li>• Multiple VLANs (IoT, Server, Media, Guest)</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="services">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Infrastructure & Virtualization</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-primary" />
                    <span>Proxmox VE (Virtualization Platform)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-primary" />
                    <span>TrueNAS Scale (Storage Server)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-primary" />
                    <span>pfSense (Firewall/Router)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-primary" />
                    <span>Pi-hole (DNS & Ad Blocking)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-primary" />
                    <span>Nginx Proxy Manager</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Containerization & Orchestration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-primary" />
                    <span>Kubernetes Cluster (k3s)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-primary" />
                    <span>Portainer (Container Management)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-primary" />
                    <span>Longhorn (Distributed Storage)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-primary" />
                    <span>Traefik (Ingress Controller)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-primary" />
                    <span>Rancher (Kubernetes Management)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Monitoring & Logging</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-primary" />
                    <span>Prometheus (Metrics Collection)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-primary" />
                    <span>Grafana (Visualization)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-primary" />
                    <span>Alertmanager (Alerting)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-primary" />
                    <span>Loki (Log Aggregation)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-primary" />
                    <span>UptimeKuma (Uptime Monitoring)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Home Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-primary" />
                    <span>Home Assistant (Smart Home Hub)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-primary" />
                    <span>Frigate (AI Camera NVR)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-primary" />
                    <span>ESPHome (Custom IoT Devices)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-primary" />
                    <span>Mosquitto MQTT Broker</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Security & Access</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Vaultwarden (Password Manager)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Authelia (SSO & 2FA)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Wireguard VPN</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Cloudflare Tunnels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Crowdsec (Security Automation)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">DevOps & CI/CD</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-primary" />
                    <span>Gitea (Git Server)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-primary" />
                    <span>Drone CI (Continuous Integration)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-primary" />
                    <span>ArgoCD (GitOps Deployment)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-primary" />
                    <span>Harbor (Container Registry)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-primary" />
                    <span>Minio (S3-compatible Storage)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}