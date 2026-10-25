// app/api/telemetry/route.ts
import { NextRequest, NextResponse } from 'next/server';

const LOKI_URL = process.env.LOKI_URL || 'http://loki.monitoring.svc.cluster.local:3100';
const GRAFANA_URL = process.env.GRAFANA_URL || 'http://kube-prometheus-stack-grafana.monitoring.svc.cluster.local:80';
const GRAFANA_TOKEN = process.env.GRAFANA_SERVICE_ACCOUNT_TOKEN;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get('target');
  const logql = searchParams.get('logql');

  const now = new Date();
  const lastUpdated = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  let metrics = null;
  let logs: { timestamp: string; message: string }[] = [];

  // 1. Query Prometheus via Grafana Proxy
  if (target && GRAFANA_TOKEN) {
    try {
      const cpuQuery = `100 - (avg(rate(node_cpu_seconds_total{mode="idle",instance=~".*${target}.*"}[5m])) * 100)`;
      const memQuery = `(1 - (node_memory_MemAvailable_bytes{instance=~".*${target}.*"} / node_memory_MemTotal_bytes{instance=~".*${target}.*"})) * 100`;

      const fetchMetric = async (query: string) => {
        const url = new URL('/api/datasources/proxy/uid/prometheus/api/v1/query', GRAFANA_URL);
        url.searchParams.set('query', query);

        const res = await fetch(url.toString(), {
          headers: { Authorization: `Bearer ${GRAFANA_TOKEN}` },
          cache: 'no-store',
        });

        if (!res.ok) return 'N/A';
        const data = await res.json();
        const val = data?.data?.result?.[0]?.value?.[1];
        return val ? `${parseFloat(val).toFixed(1)}%` : 'N/A';
      };

      const [cpu, memory] = await Promise.all([fetchMetric(cpuQuery), fetchMetric(memQuery)]);
      metrics = { cpu, memory };
    } catch {
      metrics = { cpu: 'N/A', memory: 'N/A' };
    }
  }

  // 2. Query Loki Logs
  if (logql) {
    try {
      const end = Date.now() * 1_000_000;
      const start = end - 60 * 60 * 1_000_000_000; // Past 1 hour

      const url = new URL('/loki/api/v1/query_range', LOKI_URL);
      url.searchParams.set('query', logql);
      url.searchParams.set('limit', '30');
      url.searchParams.set('start', start.toString());
      url.searchParams.set('end', end.toString());
      url.searchParams.set('direction', 'backward');

      const res = await fetch(url.toString(), { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const streams = data?.data?.result || [];
        logs = streams
          .flatMap((s: any) =>
            s.values.map(([ts, line]: [string, string]) => ({
              timestamp: new Date(Number(BigInt(ts) / BigInt(1_000_000))).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }),
              message: line,
            }))
          )
          .sort((a: any, b: any) => (a.timestamp < b.timestamp ? 1 : -1));
      }
    } catch {
      logs = [];
    }
  }

  return NextResponse.json({ metrics, logs, lastUpdated });
}