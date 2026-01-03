import Plot from "react-plotly.js";
import {PlotCard} from "../components/PlotCard"

type HistogramBin = {
  bin: string;
  count: number;
};

type Props = {
  data: HistogramBin[];
};

const BIN_ORDER = [
  "0.0–0.5",
  "0.5–1.0",
  "1.0–1.5",
  "1.5–2.0",
  "2.0–2.5",
  "2.5–3.0",
  "3.0–4.0",
  "4.0+",
];



export function QnameEntropyHistogram({ data }: Props) {

  const orderedData = BIN_ORDER
  .map(bin => data.find(d => d.bin === bin))
  .filter(Boolean) as HistogramBin[];
  
  return (
    <PlotCard>
    <Plot
      data={[
        {
          x: orderedData.map(d => d.bin),
          y: orderedData.map(d => d.count),
          type: "bar",
        },
      ]}
      layout={{
        autosize: true,
       // title: {
       //   text: "QNAME Entropy Distribution",
        //},
        bargap: 0.2,
        margin: { t: 60, l: 60, r: 20, b: 80 },
        xaxis: {
          title: {
            text: "Entropy Bin",
          },
          categoryorder: "array",
          categoryarray: data.map(d => d.bin),
        },
        yaxis: {
          title: {
            text: "Query Count",
          },
          tickformat: ",",
        },
        //margin: { t: 60, b: 80 },
        height: 400,
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
