import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost:3000';
      const protocol = process.env.REACT_APP_CODESPACE_NAME ? 'https' : 'http';
      const backendPort = process.env.REACT_APP_CODESPACE_NAME ? '8000.app.github.dev' : ':8000';
      const apiUrl = `${protocol}://${codespace}-${backendPort}/api/users/`;

      console.log('Fetching Users from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Users data fetched:', data);
      
      // Handle both paginated responses and plain arrays
      const usersList = data.results || data;
      setUsers(Array.isArray(usersList) ? usersList : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-body text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 mb-0">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
          <button type="button" className="btn-close" onClick={() => window.location.reload()}></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Users</h4>
            <span className="badge bg-light text-dark">{users.length} total</span>
          </div>
        </div>
        <div className="card-body">
          {users.length === 0 ? (
            <div className="alert alert-info mb-0" role="alert">
              <strong>No users found</strong> - Currently there are no users in the system.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <span className="badge bg-secondary">{user.id}</span>
                      </td>
                      <td>
                        <strong>{user.username}</strong>
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`} className="text-decoration-none">
                          {user.email}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
