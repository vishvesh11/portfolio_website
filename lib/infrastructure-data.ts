export type ConnectionType = 'default' | 'mesh' | 'monitor' | 'ingress';

export type InfraConnection = {
  target: string;
  type: ConnectionType;
};

export type InfraNode = {
  id: string;
  name: string;
  type: 'hardware' | 'network' | 'kubernetes' | 'service' | 'external' | 'group';
  status?: 'operational' | 'degraded' | 'offline';
  description?: string;
  connections?: InfraConnection[];
  icon?: string;
  parentId?: string; // Used for the "Big Bubbles"
  yamlSnippet?: string;
  metricsUrl?: string;
  logsUrl?: string;
  reason?: string;
};

export const infraData: InfraNode[] = [
  // --- TIER 0: EDGE ---
  {
    id: "cloudflare",
    name: "Cloudflare Edge",
    type: "external",
    status: "operational",
    description: "DNS, Proxy, and SSL (DNS01 challenge).",
    connections: [{ target: "traefik-ingress", type: "ingress" }],
    icon: "Cloud",
  },
  
  // --- THE BIG BUBBLES (GROUPS) ---
  {
    id: "group-mesh",
    name: "Headscale Mesh Overlay",
    type: "group",
  },
  {
    id: "group-home",
    name: "Home Network (Indore LAN)",
    type: "group",
    parentId: "group-mesh",
  },
  {
    id: "group-proxmox",
    name: "Proxmox Virtualization",
    type: "group",
    parentId: "group-home",
  },
  {
    id: "group-k3s",
    name: "K3s Distributed Cluster",
    type: "group",
    parentId: "group-proxmox", // Visually rests inside Proxmox
  },

  // --- TIER 1: CLOUD & MESH (Inside Mesh) ---
  {
    id: "oci-headscale",
    name: "Headscale (OCI)",
    type: "network",
    status: "operational",
    description: "Mesh VPN routing. Encompasses all nodes.",
    connections: [
      { target: "pfsense", type: "mesh" },
      { target: "oci-k3s-control-plane", type: "mesh" },
      { target: "coolify", type: "mesh" }
    ],
    icon: "Network",
    parentId: "group-mesh",
  },
  {
    id: "oci-k3s-control-plane",
    name: "K3s Control Plane",
    type: "kubernetes",
    status: "operational",
    description: "Primary K3s master node in Oracle Cloud.",
    connections: [{ target: "k3s-workers", type: "default" }],
    icon: "Cpu",
    parentId: "group-mesh",
  },
  {
    id: "coolify",
    name: "Coolify",
    type: "service",
    status: "operational",
    description: "coolify.vishvesh.me -> Tailscale IP (Mesh only).",
    icon: "Box",
    parentId: "group-mesh",
  },

  // --- TIER 2: HOME LAN (Inside Home) ---
  {
    id: "pfsense",
    name: "pfSense Firewall",
    type: "network",
    status: "operational",
    description: "Core home router. Linked to OCI Headscale.",
    connections: [
      { target: "proxmox-1", type: "default" },
      { target: "proxmox-2", type: "default" }
    ],
    icon: "Shield",
    parentId: "group-home",
  },

  // --- TIER 3: BARE METAL (Inside Proxmox) ---
  {
    id: "proxmox-1",
    name: "Proxmox Node 01",
    type: "hardware",
    status: "operational",
    icon: "Server",
    parentId: "group-proxmox",
  },
  {
    id: "proxmox-2",
    name: "Proxmox Node 02",
    type: "hardware",
    status: "operational",
    icon: "Server",
    parentId: "group-proxmox",
  },

  // --- TIER 4: KUBERNETES & INGRESS (Inside K3s) ---
  {
    id: "k3s-workers",
    name: "K3s Worker Fleet",
    type: "kubernetes",
    status: "operational",
    description: "Distributed compute pool running across Proxmox.",
    icon: "Layers",
    parentId: "group-k3s",
  },
  {
    id: "traefik-ingress",
    name: "Traefik Ingress",
    type: "kubernetes",
    status: "operational",
    description: "K3s Ingress Controller using External Services.",
    connections: [
      { target: "jellyfin-public", type: "ingress" },
      { target: "authentik", type: "ingress" },
      { target: "argocd", type: "ingress" }
    ],
    icon: "Route",
    parentId: "group-k3s",
  },

  // --- TIER 5: SERVICES (Inside K3s) ---
  {
    id: "argocd",
    name: "ArgoCD",
    type: "service",
    status: "operational",
    icon: "GitMerge",
    parentId: "group-k3s",
  },
  {
    id: "authentik",
    name: "Authentik",
    type: "service",
    status: "operational",
    icon: "Lock",
    parentId: "group-k3s",
  },
  {
    id: "jellyfin-public",
    name: "Jellyfin (Public)",
    type: "service",
    status: "operational",
    description: "Protected by Authentik. Proxied by CF.",
    icon: "MonitorPlay",
    parentId: "group-k3s",
  },
  {
    id: "monitoring-stack",
    name: "Monitoring Stack",
    type: "service",
    status: "operational",
    description: "Grafana, Loki, Prometheus, and Uptime Kuma pings all.",
    // Drawing the massive web of monitoring lines
    connections: [
      { target: "cloudflare", type: "monitor" },
      { target: "oci-headscale", type: "monitor" },
      { target: "pfsense", type: "monitor" },
      { target: "proxmox-1", type: "monitor" },
      { target: "proxmox-2", type: "monitor" },
      { target: "k3s-workers", type: "monitor" },
      { target: "traefik-ingress", type: "monitor" }
    ],
    icon: "Activity",
    parentId: "group-k3s",
  }
];