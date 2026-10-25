import { NextRequest, NextResponse } from 'next/server';

const GRAFANA_URL = process.env.GRAFANA_URL || 'https://grafana.vishvesh.me';
const GRAFANA_API_KEY = process.env.GRAFANA_SERVICE_ACCOUNT_TOKEN; // Generate in Grafana -> Administration -> Service Accounts

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const instance = searchParams.get('instance'); // e.g. "192.168.5.2:9100" or hostname

  if (!instance) {
    return NextResponse.json({ error: 'Instance parameter is required' }, { status: 400 });
  }

  // PromQL queries for CPU and Memory from Node Exporter
  const cpuQuery = `100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle",instance=~".*${instance}.*"}[5m])) * 100)`;
  const memQuery = `(1 - (node_memory_MemAvailable_bytes{instance=~".*${instance}.*"} / node_memory_MemTotal_bytes{instance=~".*${instance}.*"})) * 100`;

  try {
    const fetchPrometheusMetric = async (query: string) => {
      const url = new URL('/api/datasources/proxy/uid/prometheus/api/v1/query', GRAFANA_URL);
      url.searchParams.set('query', query);

      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${GRAFANA_API_KEY}`,
          Accept: 'application/json',
        },
        next: { revalidate: 15 },
      });

      if (!res.ok) return null;
      const data = await res.json();
      const val = data?.data?.result?.[0]?.value?.[1];
      return val ? parseFloat(val).toFixed(1) : 'N/A';
    };

    const [cpu, memory] = await Promise.all([
      fetchPrometheusMetric(cpuQuery),
      fetchPrometheusMetric(memQuery),
    ]);

    return NextResponse.json({
      metrics: {
        cpuUsage: cpu !== 'N/A' ? `${cpu}%` : 'N/A',
        memoryUsage: memory !== 'N/A' ? `${memory}%` : 'N/A',
      },
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch metrics' }, { status: 500 });
  }
}