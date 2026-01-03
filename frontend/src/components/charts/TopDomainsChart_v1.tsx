
// src/components/charts/TopDomainsChart.tsx
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import type { TopDomainsItem } from "../../types";

const truncate = (s: string, max = 40) => (s.length <= max ? s : s.slice(0, max - 1) + "…");

export function TopDomainsChart({ data }: { data: TopDomainsItem[] }) {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="qname" width={220} tickFormatter={truncate} />
        <Tooltip formatter={(value, name) => (name === "query_count" ? Number(value) : value)} />
        <Legend />
        <Bar dataKey="query_count" name="Query Count" fill="#b36f5b" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
