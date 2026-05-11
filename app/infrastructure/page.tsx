import InfraDiagram from '@/components/infrastructure-diagram';

export const metadata = {
  title: 'Infrastructure | Vishvesh Singh Pal',
  description: 'Interactive map of my geo-distributed hybrid-cloud architecture.',
};

export default function InfrastructurePage() {
  return (
    <div className="container py-12 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight mb-4">What My Home Runs On</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          An interactive map of my hybrid-cloud infrastructure. This geo-distributed setup 
          bridges local bare-metal Proxmox nodes with Oracle Cloud (OCI) instances via a 
          Headscale mesh VPN, running a distributed Kubernetes (K3s) fleet.
        </p>
        <p className="text-sm text-muted-foreground mt-4 font-mono bg-muted/50 inline-block p-2 rounded-md border">
          <span className="text-primary animate-pulse mr-2">●</span>
          Click on any node in the topology map below to inspect its configuration, metrics, and logs.
        </p>
      </div>

      {/* Interactive Diagram Section */}
      <div className="w-full shadow-xl rounded-xl border border-primary/10 bg-card overflow-hidden relative">
        {/* We mount the client component here */}
        <InfraDiagram />
      </div>
    </div>
  );
}