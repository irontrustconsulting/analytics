// TopQnamesChart.tsx
import Plot from "react-plotly.js";
import {PlotCard} from "../../PlotCard"

type TopDomains = {
  root_domain: string;
  query_count: number;
};

export type top_domains = {
  data: TopDomains[];
};

export function TopDomainsChart({ data }: top_domains) {
  if (data.length === 0) return <div>No top Domains to display</div>;

  // --- Compute colors based on query_count ---
  const counts = data.map(d => d.query_count);
  const maxCount = Math.max(...counts);
  const minCount = Math.min(...counts);

  const lightBlue = [173, 216, 230]; // #add8e6
  const darkBlue = [0, 51, 102];     // #003366

  function interpolateColor(color1: number[], color2: number[], factor: number) {
    return color1.map((c, i) => Math.round(c + factor * (color2[i] - c)));
  }

  function rgbToHex(rgb: number[]) {
    return (
      "#" +
      rgb
        .map(x => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }

  const colors = counts.map(count => {
    const factor = (count - minCount) / (maxCount - minCount || 1); // avoid divide by zero
    return rgbToHex(interpolateColor(lightBlue, darkBlue, factor));
  });

  return (
    <PlotCard>
    <Plot
      data={[
        {
          x: data.map(d => d.query_count),
          y: data.map(d => d.root_domain),
          type: "bar",
          orientation: "h",
          marker: {
            color: colors,
          },
        },
      ]}
      layout={{
   
        autosize: true,
        margin: { t: 60, l: 200, r: 20, b: 60 },
        xaxis: {
          title: { text: "Query Count" },
          tickformat: ",",
          automargin: true,   // ensures axis labels fit nicely
        },
        yaxis: {
          title: { text: "Root Domain", standoff: 20},
          automargin: true,
          autorange: "reversed" // highest count on top
        },
        height: Math.max(400, data.length * 40),
      }}
      useResizeHandler // ✅ critical
      style={{
        width: "100%",
        height: "100%",
      }}
      config={{ responsive: true }}
    />
   </PlotCard>
  );
}

