import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost:3000';
      const protocol = process.env.REACT_APP_CODESPACE_NAME ? 'https' : 'http';
      const backendPort = process.env.REACT_APP_CODESPACE_NAME ? '8000.app.github.dev' : ':8000';
      const apiUrl = `${protocol}://${codespace}-${backendPort}/api/teams/`;

      console.log('Fetching Teams from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Teams data fetched:', data);
      
      // Handle both paginated responses and plain arrays
      const teamsList = data.results || data;
      setTeams(Array.isArray(teamsList) ? teamsList : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-body text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 mb-0">Loading teams...</p>
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
        <div className="card-header" style={{background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: 'white'}}>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">👫 Teams</h4>
            <span className="badge bg-light text-dark">{teams.length} total</span>
          </div>
        </div>
        <div className="card-body">
          {teams.length === 0 ? (
            <div className="alert alert-info mb-0" role="alert">
              <strong>No teams found</strong> - Currently there are no teams in the system.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Team Name</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id}>
                      <td>
                        <span className="badge bg-secondary">{team.id}</span>
                      </td>
                      <td>
                        <strong>{team.name || team.team_name}</strong>
                      </td>
                      <td>
                        <span className="text-muted">{team.description || <em>No description</em>}</span>
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

export default Teams;
