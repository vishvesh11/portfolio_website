import { NextRequest, NextResponse } from 'next/server';

const LOKI_URL = process.env.LOKI_URL || 'https://loki.vishvesh.me';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const node = searchParams.get('node');
  const limit = searchParams.get('limit') || '25';

  if (!node) {
    return NextResponse.json({ error: 'Node parameter is required' }, { status: 400 });
  }

  // Target logs by instance, hostname, or job depending on Promtail/Vector labels
  const logql = `{instance=~".*${node}.*"} |= ""`;
  const end = Date.now() * 1_000_000; // Loki expects nanoseconds
  const start = end - 60 * 60 * 1_000_000_000; // Past 1 hour

  try {
    const url = new URL('/loki/api/v1/query_range', LOKI_URL);
    url.searchParams.set('query', logql);
    url.searchParams.set('limit', limit);
    url.searchParams.set('start', start.toString());
    url.searchParams.set('end', end.toString());
    url.searchParams.set('direction', 'backward');

    const res = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 10 }, // Cache briefly
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Loki returned status ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    const streams = data?.data?.result || [];

    // Flatten and parse log streams: [nanosecond_timestamp, line]
    const logs = streams.flatMap((stream: any) =>
      stream.values.map(([ts, line]: [string, string]) => ({
        timestamp: new Date(Number(BigInt(ts) / BigInt(1_000_000))).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        message: line,
      }))
    ).sort((a: any, b: any) => (a.timestamp < b.timestamp ? 1 : -1));

    return NextResponse.json({
      logs: logs.slice(0, Number(limit)),
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch logs' }, { status: 500 });
  }
}