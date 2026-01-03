import { useEffect, useState } from "react";
import { QnameEntropyHistogram } from "./QnameEntropyHistogram";
import { TopQnamesChart } from "../components/charts/TopQnamesChart";
import { SubdomainEntropyHistogram } from "../components/charts/SubdomainEntropyHistogramChart";
import { ChartCard } from "../components/layout/ChartCard";
import { DashboardRow } from "../components/layout/DashboardLayout";
import { DashboardHeader } from "../components/layout/DashboardHeader";
import {KPIGrid} from "../components/layout/KPIGridChart";
import {RcodeBreakdownChart} from "../components/charts/RCodeChart";
import {QtypeBreakdownChart} from "../components/charts/QtypesChart";
import {TopDomainsChart} from "../components/charts/v2/TopDomainsChart";
import type {top_domains} from "../components/charts/v2/TopDomainsChart";
/* ---------- types ---------- */

type HistogramBin = {
  bin: string;
  count: number;
};

type TopQName = {
  qname: string;
  query_count: number;
};
type RcodeCount = {
  rcode: number;
  count: number;
};

type QtypeCount = {
  qtype: number;
  count: number;
};

type AnalyticsResponse = {
  tenant_id: string;
  event_date: string;
  total_queries: number;
  qname_entropy_histogram: HistogramBin[];
  subdomain_entropy_histogram: HistogramBin[];
  top_qnames: TopQName[];
  rcode_breakdown: RcodeCount[];
  qtype_breakdown: QtypeCount[];
  top_root_domains: top_domains
};

type Props = {
  tenantId: string;
  eventDate: string;
};

export default function AnalyticsDashboard({ tenantId, eventDate }: Props) {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `http://localhost:8000/v2/analytics?tenant_id=${tenantId}&event_date=${eventDate}`
    )
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message));
  }, [tenantId, eventDate]);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading analytics…</div>;

  return (
    <div style={{ padding: "1.5rem",
                  width: "100%",
                  maxWidth: "min(1800px, 100vw)",
                  margin: "0 auto",}}
    >
      {/* Dashboard Header */}
      <DashboardHeader
        tenant_id={data.tenant_id}
        eventDate={data.event_date}
      />

      {/* KPI Grid */}
      <KPIGrid
        total_queries={data.total_queries}
        unique_qnames={data.unique_qnames}
        unique_root_domains={data.unique_root_domains}
        unique_src_ips={data.unique_src_ips}
      />
      
      {/* === DISTRIBUTIONS === */}
      <DashboardRow columns={3}>
        <ChartCard title="QNAME Entropy Distribution">
          <QnameEntropyHistogram data={data.qname_entropy_histogram} />
        </ChartCard>

        <ChartCard title="Subdomain Entropy Distribution">
          <SubdomainEntropyHistogram data={data.subdomain_entropy_histogram} />
        </ChartCard>

         <ChartCard title="Frequently accessed sites">
          <TopQnamesChart data={data.top_qnames} />
        </ChartCard>
      </DashboardRow>

      {/* === BREAKDOWNS (placeholder for now) === */}
      <DashboardRow columns={3}>
        <ChartCard title="Rcode Breakdown"><RcodeBreakdownChart data={data.rcode_breakdown}/></ChartCard>
        <ChartCard title="Qtype Breakdown"><QtypeBreakdownChart data={data.qtype_breakdown}/></ChartCard>
        <ChartCard title="Top Queried Domains"><TopDomainsChart data={data.top_root_domains} /></ChartCard>
      </DashboardRow>
     </div>
  );
}
