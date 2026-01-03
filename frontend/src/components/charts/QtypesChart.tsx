import Plot from "react-plotly.js";
import {PlotCard} from "../PlotCard";

type QtypeCount = {
  qtype: number;
  count: number;
};

type Props = {
  data: QtypeCount[];
};

export function QtypeBreakdownChart({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.count - a.count);

  return (
    <PlotCard>
    <Plot
      data={[
        {
          x: sorted.map(d => d.count),
          y: sorted.map(d => `QTYPE ${d.qtype}`),
          type: "bar",
          orientation: "h",
          marker: {
            color: "#00cc96", // different but consistent
          },
        },
      ]}
      layout={{
        title: { text: "Query Type Breakdown" },
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
