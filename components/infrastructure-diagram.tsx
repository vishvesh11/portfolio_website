'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { 
  ReactFlow, useNodesState, useEdgesState, 
  MarkerType, Handle, Position, ReactFlowProvider, useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { infraData, InfraNode } from '@/lib/infrastructure-data';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  X, Activity, FileCode, Terminal, ZoomIn, ZoomOut, 
  Maximize, RotateCcw, GripHorizontal, ArrowRight, ArrowLeft 
} from "lucide-react";
import * as LucideIcons from 'lucide-react';

// --- CUSTOM NODES ---
const StandardNode = ({ data }: { data: any }) => {
  const IconComponent = (LucideIcons as any)[data.icon || "Server"] || LucideIcons.Server;
  return (
    <div className={`px-5 py-4 shadow-lg rounded-xl bg-card border-2 border-border w-[240px] h-[100px] transition-all duration-500 ${data.isDimmed ? 'opacity-30 grayscale scale-95' : 'opacity-100 scale-100 hover:border-primary/50'}`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-primary opacity-0" />
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-muted/50 text-foreground">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight truncate w-[130px]">{data.label}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">{data.type}</div>
          </div>
        </div>
        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${data.status === 'operational' ? 'bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]' : 'bg-yellow-500'}`} />
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-primary opacity-0" />
    </div>
  );
};

const GroupNode = ({ data }: { data: any }) => (
  <div className={`w-full h-full rounded-3xl border-2 border-dashed border-primary/40 bg-primary/5 relative transition-all duration-500 ${data.isDimmed ? 'opacity-20' : 'opacity-100'}`}>
    <div className="absolute -top-4 left-8 px-4 py-1.5 bg-background text-primary font-mono text-sm font-bold tracking-widest uppercase rounded-full border-2 border-primary/40 shadow-sm">
      {data.label}
    </div>
  </div>
);

const nodeTypes = {
  custom: StandardNode,
  groupNode: GroupNode,
};

// --- SMART GRID AUTO-LAYOUT ENGINE ---
const generateLayout = () => {
  const nodes: any[] = [];
  const edges: any[] = [];
  
  const NODE_W = 240;
  const NODE_H = 100;
  const GAP_X = 100;
  const GAP_Y = 100;
  const CELL_W = NODE_W + GAP_X;
  const CELL_H = NODE_H + GAP_Y;

  const gridPositions: Record<string, {r: number, c: number}> = {
    "cloudflare": { r: 0, c: 4 },
    "oci-headscale": { r: 1, c: 1 },
    "coolify": { r: 1, c: 3 },
    "oci-k3s-control-plane": { r: 1, c: 5 },
    "pfsense": { r: 2, c: 1 },
    "jellyfin-local": { r: 2, c: 0 },
    "proxmox-1": { r: 3, c: 1 },
    "proxmox-2": { r: 3, c: 4 },
    "traefik-lxc": { r: 3, c: 0 },
    "k3s-workers": { r: 4, c: 1 },
    "traefik-ingress": { r: 4, c: 4 },
    "argocd": { r: 5, c: 1 },
    "authentik": { r: 5, c: 2 },
    "jellyfin-public": { r: 5, c: 4 },
    "monitoring-stack": { r: 5, c: 5 },
  };

  const getGroupBounds = (minR: number, maxR: number, minC: number, maxC: number, paddingLevel: number) => {
    const pad = 35 * paddingLevel;
    return {
      x: (minC * CELL_W) - pad,
      y: (minR * CELL_H) - pad - 20,
      w: ((maxC - minC) * CELL_W) + NODE_W + (pad * 2),
      h: ((maxR - minR) * CELL_H) + NODE_H + (pad * 2) + 20,
    };
  };

  const groupBounds: Record<string, any> = {
    "group-mesh": getGroupBounds(1, 5, 0, 5, 4),
    "group-home": getGroupBounds(2, 5, 0, 5, 3),
    "group-proxmox": getGroupBounds(3, 5, 0, 5, 2),
    "group-k3s": getGroupBounds(4, 5, 1, 5, 1),
  };

  const edgeStyles: Record<string, any> = {
    default: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    mesh: { stroke: '#06b6d4', strokeWidth: 3, strokeDasharray: '8 8' },
    ingress: { stroke: '#8b5cf6', strokeWidth: 4 },
    monitor: { stroke: '#f59e0b', strokeWidth: 2, strokeDasharray: '4 4' },
  };

  infraData.forEach((data) => {
    let position = { x: 0, y: 0 };
    let style = {};

    if (data.type === 'group' && groupBounds[data.id]) {
      const bounds = groupBounds[data.id];
      position = { x: bounds.x, y: bounds.y };
      style = { width: bounds.w, height: bounds.h, zIndex: -5 };
    } else if (gridPositions[data.id]) {
      const pos = gridPositions[data.id];
      position = { x: pos.c * CELL_W, y: pos.r * CELL_H };
      style = { zIndex: 10 };
    }

    nodes.push({
      id: data.id,
      type: data.type === 'group' ? 'groupNode' : 'custom',
      position,
      style,
      data: { label: data.name, isDimmed: false, ...data },
    });

    if (data.connections) {
      data.connections.forEach((conn) => {
        edges.push({
          id: `e-${data.id}-${conn.target}`,
          source: data.id,
          target: conn.target,
          type: 'smoothstep',
          animated: conn.type === 'mesh' || conn.type === 'ingress',
          style: { ...edgeStyles[conn.type], transition: 'stroke-opacity 0.5s', opacity: conn.type === 'monitor' ? 0.3 : 0.8 },
          data: { baseOpacity: conn.type === 'monitor' ? 0.3 : 0.8 },
          markerEnd: { type: MarkerType.ArrowClosed, color: edgeStyles[conn.type].stroke },
        });
      });
    }
  });

  return { initialNodes: nodes, initialEdges: edges };
};

// --- INNER DIAGRAM COMPONENT ---
function DiagramCore() {
  const { initialNodes, initialEdges } = useMemo(() => generateLayout(), []);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const [panelNode, setPanelNode] = useState<InfraNode | null>(null);
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
  
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const constraintsRef = useRef(null);

  useEffect(() => {
    if (!highlightedNodeId) {
      setNodes(nds => nds.map(n => ({ ...n, data: { ...n.data, isDimmed: false } })));
      setEdges(eds => eds.map(e => ({ ...e, style: { ...e.style, opacity: e.data.baseOpacity } })));
      return;
    }

    const connectedIds = new Set<string>();
    connectedIds.add(highlightedNodeId);

    const activeNodeData = infraData.find(n => n.id === highlightedNodeId);
    activeNodeData?.connections?.forEach(c => connectedIds.add(c.target));
    
    infraData.forEach(d => {
      if (d.connections?.some(c => c.target === highlightedNodeId)) {
        connectedIds.add(d.id);
      }
    });

    infraData.forEach(d => {
      if (connectedIds.has(d.id) && d.parentId) {
        let currentParent: string | undefined = d.parentId;
        while(currentParent) {
          connectedIds.add(currentParent);
          const pNode = infraData.find(n => n.id === currentParent);
          currentParent = pNode?.parentId;
        }
      }
    });

    setNodes(nds => nds.map(n => ({
      ...n,
      data: { ...n.data, isDimmed: !connectedIds.has(n.id) }
    })));

    setEdges(eds => eds.map(e => ({
      ...e,
      style: { 
        ...e.style, 
        opacity: (e.source === highlightedNodeId || e.target === highlightedNodeId) ? 1 : 0.05 
      }
    })));
  }, [highlightedNodeId, setNodes, setEdges]);

  const onNodeClick = useCallback((_: any, node: any) => {
    if (node.data.type !== 'group') {
      setHighlightedNodeId(node.id);
      setPanelNode(node.data as InfraNode);
    }
  }, []);

  const resetView = () => {
    setHighlightedNodeId(null);
    setPanelNode(null);
    fitView({ duration: 800, padding: 0.1 });
  };

  return (
    <div className="relative w-full h-[850px] bg-background border rounded-xl overflow-hidden shadow-inner" ref={constraintsRef}>
      
      {/* CSS-based Safari-safe Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* CANVAS */}
      <div className="relative z-10 w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={() => {
            setHighlightedNodeId(null);
            setPanelNode(null);
          }}
          nodesDraggable={false}
          nodesConnectable={false}
          fitView
          fitViewOptions={{ padding: 0.1 }}
          minZoom={0.1}
          maxZoom={1.5}
        />
      </div>

      {/* CUSTOM CONTROLS TOOLBAR */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-40 bg-card/90 backdrop-blur-md p-2 rounded-lg border shadow-lg">
        <Button variant="ghost" size="icon" onClick={() => zoomIn({ duration: 300 })} aria-label="Zoom In">
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => zoomOut({ duration: 300 })} aria-label="Zoom Out">
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => fitView({ duration: 800 })} aria-label="Fit View">
          <Maximize className="h-5 w-5" />
        </Button>
        <div className="h-px bg-border my-1 w-full" />
        <Button variant="ghost" size="icon" onClick={resetView} aria-label="Reset Highlight">
          <RotateCcw className="h-5 w-5 text-primary" />
        </Button>
      </div>

      {/* DRAGGABLE FLOATING OVERLAY PANEL */}
      {panelNode && (
        <motion.div 
          drag 
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          dragMomentum={false}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="absolute top-6 right-6 w-[420px] h-[calc(100%-48px)] z-50 bg-card/95 backdrop-blur-xl rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="p-4 border-b flex justify-between items-start bg-muted/40 cursor-grab active:cursor-grabbing">
            <div className="flex-grow flex items-center gap-2">
              <GripHorizontal className="h-5 w-5 text-muted-foreground opacity-50" />
              <div>
                <h3 className="font-bold text-xl">{panelNode.name}</h3>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="capitalize">{panelNode.type}</Badge>
                  <Badge variant="secondary" className={panelNode.status === 'operational' ? 'bg-green-500/10 text-green-500' : ''}>
                    {panelNode.status}
                  </Badge>
                </div>
              </div>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setPanelNode(null);
              }} 
              className="p-2 hover:bg-background rounded-lg transition-colors border bg-card shadow-sm cursor-pointer"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="p-6 flex-grow overflow-y-auto">
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{panelNode.description}</p>
            
            {/* NEW: DYNAMIC CONNECTIONS REASON LIST */}
            <div className="mb-8">
              {/* Outgoing Connections */}
              {panelNode.connections && panelNode.connections.length > 0 && (
                <div className="mb-4 space-y-2">
                  <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-primary" /> Connects To
                  </h4>
                  {panelNode.connections.map(conn => {
                    const targetNode = infraData.find(n => n.id === conn.target);
                    return (
                      <div key={conn.target} className="bg-background border rounded-md p-3 text-sm shadow-sm hover:border-primary/50 transition-colors">
                        <div className="font-medium text-foreground mb-1">{targetNode?.name || conn.target}</div>
                        <div className="text-xs text-muted-foreground">
                          {conn.reason || `Standard ${conn.type} network route.`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Incoming Connections */}
              {(() => {
                const incoming = infraData.filter(n => n.connections?.some(c => c.target === panelNode.id));
                if (incoming.length === 0) return null;
                return (
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
                      <ArrowLeft className="w-3 h-3 text-muted-foreground" /> Receives Traffic From
                    </h4>
                    {incoming.map(sourceNode => {
                      const conn = sourceNode.connections?.find(c => c.target === panelNode.id);
                      return (
                        <div key={sourceNode.id} className="bg-background border rounded-md p-3 text-sm shadow-sm hover:border-primary/50 transition-colors">
                          <div className="font-medium text-foreground mb-1">{sourceNode.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {conn?.reason || `Standard ${conn?.type} network route.`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
            
            <Tabs defaultValue="yaml" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="yaml"><FileCode className="w-4 h-4 mr-2"/> YAML</TabsTrigger>
                <TabsTrigger value="metrics"><Activity className="w-4 h-4 mr-2"/> Metrics</TabsTrigger>
                <TabsTrigger value="logs"><Terminal className="w-4 h-4 mr-2"/> Logs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="yaml" className="mt-0">
                <Card>
                  <CardContent className="p-0 overflow-hidden rounded-md border-0">
                    <pre className="p-4 bg-zinc-950 text-green-400 text-xs font-mono overflow-x-auto whitespace-pre-wrap rounded-md">
                      {panelNode.yamlSnippet || "# Code block pending GitOps sync...\n# Awaiting configuration."}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="metrics">
                <Card>
                  <CardContent className="p-8 flex flex-col items-center justify-center text-center text-muted-foreground">
                    <Activity className="w-8 h-8 opacity-50 mb-3" />
                    <p className="text-sm">Metrics Dashboard Pending</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="logs">
                 <Card>
                  <CardContent className="p-8 flex flex-col items-center justify-center text-center bg-zinc-950 text-zinc-50 rounded-md">
                    <Terminal className="w-8 h-8 opacity-50 mb-3" />
                    <p className="text-sm">Loki Log Stream Pending</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// --- MAIN EXPORT ---
export default function InfraDiagram() {
  return (
    <ReactFlowProvider>
      <DiagramCore />
    </ReactFlowProvider>
  );
}