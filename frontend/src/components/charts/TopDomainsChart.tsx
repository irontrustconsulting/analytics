// src/components/charts/TopDomainsChart.tsx
import Plot from "react-plotly.js";

export function TopDomainsChart({ data }) {
  const labels = data.map(row => row.qname);
  const counts = data.map(row => row.query_count);

  return (
    <Plot
      data={[
        {
          x: labels,
          y: counts,
          type: "bar",
          marker: { color: "rgba(255, 127, 14, 0.7)" }
        }
      ]}
      layout={{
        title: "Top Queried Domains",
        xaxis: { title: "Domain", tickangle: -45 },
        yaxis: { title: "Query Count" },
        margin: { b: 150 }
      }}
      style={{ width: "100%", height: "600px" }}
    />
  );
}
