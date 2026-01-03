type Props = {
  tenantId: string;
  eventDate: string;
};

export function DashboardHeader({ tenantId, eventDate }: Props) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h1 style={{ marginBottom: "0.25rem" }}>Analytics Dashboard (v2)</h1>
      <div style={{ color: "#666" }}>
        Tenant: <strong>{tenantId}</strong> | Date: <strong>{eventDate}</strong>
      </div>
    </div>
  );
}
