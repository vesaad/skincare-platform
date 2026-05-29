import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f3f0' }}>
      {/* Sidebar */}
      <aside style={{
        width: '220px', background: '#151712', color: 'white',
        display: 'flex', flexDirection: 'column', flexShrink: 0
      }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#844D63', textTransform: 'uppercase', margin: '0 0 4px' }}>AuraSkin</p>
          <p style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Admin Panel</p>
        </div>
        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { to: '/admin', label: 'Dashboard', end: true },
            { to: '/admin/users', label: 'Users' },
            { to: '/admin/products', label: 'Products' },
          ].map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} style={({ isActive }) => ({
              display: 'block', padding: '10px 14px', borderRadius: '8px',
              fontSize: '14px', fontWeight: '500', textDecoration: 'none',
              background: isActive ? '#844D63' : 'transparent',
              color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
              transition: 'all 0.15s'
            })}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={() => navigate('/')} style={{
            width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)',
            background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: '13px', cursor: 'pointer'
          }}>
            ← Kthehu te faqja
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '32px', overflowY: 'auto', background: '#f5f3f0' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;