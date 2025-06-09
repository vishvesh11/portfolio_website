

import GuideDetailClient from './GuideDetailClient'; 
import { notFound } from 'next/navigation'; 


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

// This function must remain in the Server Component page file
export async function generateStaticParams() {
  return Object.keys(guideData).map((slug) => ({
    slug: slug,
  }));
}

// Define props for your page component
interface GuidePageProps {
  params: {
    slug: string;
  };
}

export default function GuidePage({ params }: GuidePageProps) {

  const slug = params.slug;


  return <GuideDetailClient />;
}