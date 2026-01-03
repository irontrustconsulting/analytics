type KPIProps = {
  total_queries: number;
  unique_qnames: number;
  unique_root_domains: number;
  unique_src_ips: number;
};

export function KPIGrid(props: KPIProps) {
  const items = [
    { label: "Total Queries", value: props.total_queries },
    { label: "Unique Qnames", value: props.unique_qnames },
    { label: "Root Domains", value: props.unique_root_domains },
    { label: "Source IPs", value: props.unique_src_ips },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        marginBottom: "2rem",
      }}
    >
      {items.map(i => (
        <div
          key={i.label}
          style={{
            padding: "1rem",
            border: "1px solid #e0e0e0",
            borderRadius: 6,
            background: "#fafafa",
          }}
        >
          <div style={{ fontSize: "0.85rem", color: "#666" }}>{i.label}</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 600 }}>
            {i.value.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
