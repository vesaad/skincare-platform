import { useEffect, useState } from 'react';
import { getStats } from '../../services/adminService';

const COLORS = ['#844D63', '#151712', '#b07a8f', '#3d3d2e', '#c9a0b0', '#6b6b55'];

const StatCard = ({ label, value, sub, accent }) => (
  <div style={{
    background: 'white', borderRadius: '16px', padding: '24px 28px',
    border: '1px solid rgba(0,0,0,0.06)', flex: 1, position: 'relative', overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '4px', height: '100%',
      background: accent, borderRadius: '16px 0 0 16px'
    }} />
    <p style={{ fontSize: '11px', color: '#999', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
    <p style={{ fontSize: '36px', fontWeight: '700', margin: '0 0 4px', color: '#151712' }}>{value}</p>
    {sub && <p style={{ fontSize: '12px', color: '#844D63', margin: 0 }}>{sub}</p>}
  </div>
);

const DonutChart = ({ data }) => {
  const total = data.reduce((s, d) => s + d.count, 0);
  let cumulative = 0;
  const r = 70, cx = 90, cy = 90, stroke = 18;
  const circumference = 2 * Math.PI * r;

  const slices = data.map((d, i) => {
    const pct = d.count / total;
    const dash = pct * circumference;
    const offset = circumference - cumulative * circumference;
    cumulative += pct;
    return { ...d, dash, offset, color: COLORS[i % COLORS.length] };
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <svg width="180" height="180" style={{ flexShrink: 0 }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0ebe8" strokeWidth={stroke} />
        {slices.map((s, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={s.color} strokeWidth={stroke}
            strokeDasharray={`${s.dash} ${circumference - s.dash}`}
            strokeDashoffset={s.offset}
            style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px`, transition: 'all 0.6s ease' }}
          />
        ))}
        <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: '22px', fontWeight: '700', fill: '#151712' }}>{total}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" style={{ fontSize: '11px', fill: '#999' }}>produkte</text>
      </svg>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {slices.map(({ category, count, color }) => (
          <div key={category} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, flexShrink: 0 }} />
            <span style={{ fontSize: '13px', color: '#444', flex: 1 }}>{category}</span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#151712' }}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => { getStats().then(res => setStats(res.data)); }, []);

  if (!stats) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <p style={{ color: '#888', fontSize: '14px' }}>Duke ngarkuar...</p>
    </div>
  );

  const activeRate = stats.totalUsers ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0;
  const r = 48, circumference = 2 * Math.PI * r;
  const activeDash = (activeRate / 100) * circumference;

  return (
    <div style={{/* maxWidth: '1100px' */}}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#151712', margin: '0 0 4px' }}>Dashboard</h1>
        <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>Overview i platformës AuraSkin</p>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <StatCard label="Total Users" value={stats.totalUsers} sub="Të regjistruar" accent="#844D63" />
        <StatCard label="Active Users" value={stats.activeUsers} sub={`${activeRate}% aktiv`} accent="#151712" />
        <StatCard label="Total Products" value={stats.totalProducts} sub="Në katalog" accent="#844D63" />
        <StatCard label="Inactive" value={stats.totalUsers - stats.activeUsers} sub="Të bllokuar" accent="#ddd" />
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.06)', padding: '28px', flex: 1 }}>
          <p style={{ fontSize: '11px', color: '#999', margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Products by Category</p>
          <DonutChart data={stats.productsByCategory || []} />
        </div>

        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.06)', padding: '28px', width: '260px', flexShrink: 0 }}>
          <p style={{ fontSize: '11px', color: '#999', margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>User Activity</p>
          <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 24px' }}>
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r={r} fill="none" stroke="#f0ebe8" strokeWidth="12" />
              <circle cx="60" cy="60" r={r} fill="none" stroke="#844D63" strokeWidth="12"
                strokeDasharray={`${activeDash} ${circumference - activeDash}`}
                strokeDashoffset={circumference / 4}
                strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '22px', fontWeight: '700', color: '#151712' }}>{activeRate}%</span>
              <span style={{ fontSize: '10px', color: '#999' }}>aktiv</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Aktiv', value: stats.activeUsers, color: '#844D63' },
              { label: 'Joaktiv', value: stats.totalUsers - stats.activeUsers, color: '#ddd' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                  <span style={{ fontSize: '13px', color: '#555' }}>{label}</span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#151712' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;