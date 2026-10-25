// lib/telemetry-map.ts

export interface TelemetryConfig {
  prometheusTarget?: string; // Substring matched against Prometheus 'instance'
  lokiQuery?: string;        // LogQL query matched against Promtail stream labels
}

export const TELEMETRY_MAPPINGS: Record<string, TelemetryConfig> = {
  // Proxmox 1 (Master)
  "proxmox-1": {
    prometheusTarget: "proxmox-master",
    lokiQuery: '{host="proxmox-node-1"} |= ""',
  },

  // Proxmox 2 (Worker)
  "proxmox-2": {
    prometheusTarget: "proxmox-worker",
    lokiQuery: '{host="proxmox-node-2"} |= ""',
  },

  // PaaS / Coolify
  "coolify": {
    lokiQuery: '{host="coolify_node"} |= ""',
  },

  // OCI Watchtower Node
  "oci-headscale": {
    prometheusTarget: "100.64.0.2:9100",
    lokiQuery: '{host="oci_node"} |= ""',
  },

  // K3s Nodes
  "k3s-workers": {
    prometheusTarget: "192.168.5.30:9100",
  },
  "oci-k3s-control-plane": {
    prometheusTarget: "100.64.0.2:9100",
  },

  // In-Cluster Monitoring Stack
  "monitoring-stack": {
    lokiQuery: '{job="systemd-journal"} |= ""',
  },
};