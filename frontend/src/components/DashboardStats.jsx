import { useMemo } from "react";

function DashboardStats({ scans = [] }) {
  const stats = useMemo(() => {
    const total = scans.length;
    const safe = scans.filter((scan) => scan.status === "Safe").length;
    const suspicious = scans.filter((scan) => scan.status === "Suspicious").length;
    const malicious = scans.filter((scan) => scan.status === "Malicious").length;
    const average = total ? Math.round(scans.reduce((sum, scan) => sum + (Number(scan.score) || 0), 0) / total) : 0;
    return { total, safe, suspicious, malicious, average };
  }, [scans]);

  const cards = [
    { title: "Total scans", value: stats.total, description: "Completed assessments", symbol: "↗", className: "" },
    { title: "Safe", value: stats.safe, description: "Strong security signals", symbol: "✓", className: "safe" },
    { title: "Suspicious", value: stats.suspicious, description: "Worth a closer look", symbol: "!", className: "suspicious" },
    { title: "Malicious", value: stats.malicious, description: "High-risk findings", symbol: "×", className: "malicious" },
  ];
  const percent = (value) => stats.total ? `${(value / stats.total) * 100}%` : "0%";

  return <>
    <div className="stats-grid">
      {cards.map((item) => <article className={`stat-card ${item.className}`} key={item.title}>
        <div className="stat-icon" aria-hidden="true">{item.symbol}</div>
        <h3>{item.title}</h3><h1 className="stat-number">{item.value}</h1><small>{item.description}</small>
      </article>)}
      <article className="stat-card average"><div className="stat-icon" aria-hidden="true">◎</div><h3>Average score</h3><h1 className="stat-number">{stats.average}<span style={{fontSize:13,color:"#8fa7bf"}}>/100</span></h1><progress value={stats.average} max="100" className="average-progress"/><small>Across your scan history</small></article>
    </div>
    <section className="card risk-overview" aria-label="Risk distribution">
      <div className="risk-heading"><div><span className="eyebrow">SECURITY POSTURE</span><h2>Risk distribution</h2></div><span className="risk-total">{stats.total} {stats.total === 1 ? "scan" : "scans"}</span></div>
      <div className="risk-track" role="img" aria-label={`${stats.safe} safe, ${stats.suspicious} suspicious, ${stats.malicious} malicious scans`}>
        <span className="risk-segment risk-safe" style={{width:percent(stats.safe)}}/><span className="risk-segment risk-suspicious" style={{width:percent(stats.suspicious)}}/><span className="risk-segment risk-malicious" style={{width:percent(stats.malicious)}}/>
      </div>
      <div className="risk-legend"><span><i className="legend-dot dot-safe"/>Safe <b>{stats.safe}</b></span><span><i className="legend-dot dot-suspicious"/>Suspicious <b>{stats.suspicious}</b></span><span><i className="legend-dot dot-malicious"/>Malicious <b>{stats.malicious}</b></span></div>
    </section>
  </>;
}
export default DashboardStats;
