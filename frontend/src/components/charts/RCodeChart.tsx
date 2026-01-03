import Plot from "react-plotly.js";
import {PlotCard} from "../PlotCard";

type RcodeCount = {
  rcode: number;
  count: number;
};

type Props = {
  data: RcodeCount[];
};

export function RcodeBreakdownChart({ data }: Props) {
  // sort descending by count
  const sorted = [...data].sort((a, b) => b.count - a.count);

  return (
    <PlotCard>
    <Plot
      data={[
        {
          x: sorted.map(d => d.count),
          y: sorted.map(d => `RCODE ${d.rcode}`),
          type: "bar",
          orientation: "h",
          marker: {
            color: "#636efa", // neutral blue
          },
        },
      ]}
      layout={{
        title: { text: "RCODE Breakdown" },
        margin: { t: 50, l: 120, r: 30, b: 40 },
        xaxis: {
          title: { text: "Query Count" },
          tickformat: ",",
          autorange: true,
        },
        yaxis: {
          automargin: true,
        },
        height: 350,
      }}
      config={{ responsive: true }}
      style={{ width: "100%" }}
    />
    </PlotCard>
  );
}
