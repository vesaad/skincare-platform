import { useEffect, useState } from 'react';
import { getUsers, toggleUserStatus, deleteUser, exportUsers } from '../../services/adminService';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => getUsers().then(res => setUsers(res.data));
  useEffect(() => { fetchUsers(); }, []);

  const handleToggle = async (id) => { await toggleUserStatus(id); fetchUsers(); };
  const handleDelete = async (id) => {
    if (window.confirm('Je i sigurt?')) { await deleteUser(id); fetchUsers(); }
  };
  const handleExport = async () => {
    const res = await exportUsers();
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement('a');
    a.href = url; a.setAttribute('download', 'users.csv');
    document.body.appendChild(a); a.click(); a.remove();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#151712', margin: 0 }}>Users</h1>
        <button onClick={handleExport} style={{
          padding: '10px 18px', background: '#151712', color: 'white',
          border: 'none', borderRadius: '8px', fontSize: '13px', cursor: 'pointer'
        }}>Export CSV</button>
      </div>
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              {['ID', 'Emri', 'Email', 'Roli', 'Statusi', 'Veprime'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '500' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.id} style={{ borderBottom: i < users.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
                <td style={{ padding: '14px 16px', color: '#888' }}>{user.id}</td>
                <td style={{ padding: '14px 16px', fontWeight: '500' }}>{user.firstName} {user.lastName}</td>
                <td style={{ padding: '14px 16px', color: '#555' }}>{user.email}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '500',
                    background: user.userRoles?.[0]?.role?.name === 'Admin' ? '#151712' : '#f0ebe8',
                    color: user.userRoles?.[0]?.role?.name === 'Admin' ? 'white' : '#844D63'
                  }}>
                    {user.userRoles?.[0]?.role?.name || 'User'}
                  </span>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '500',
                    background: user.isActive ? '#eaf3de' : '#fce8e8',
                    color: user.isActive ? '#3B6D11' : '#A32D2D'
                  }}>
                    {user.isActive ? 'Aktiv' : 'Joaktiv'}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleToggle(user.id)} style={{
                    padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)',
                    background: 'white', fontSize: '12px', cursor: 'pointer', color: '#555'
                  }}>
                    {user.isActive ? 'Çaktivizo' : 'Aktivizo'}
                  </button>
                  <button onClick={() => handleDelete(user.id)} style={{
                    padding: '6px 12px', borderRadius: '6px', border: 'none',
                    background: '#fce8e8', color: '#A32D2D', fontSize: '12px', cursor: 'pointer'
                  }}>Fshi</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;