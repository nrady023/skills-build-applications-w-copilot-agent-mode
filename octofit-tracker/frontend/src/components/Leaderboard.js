import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost:3000';
      const protocol = process.env.REACT_APP_CODESPACE_NAME ? 'https' : 'http';
      const backendPort = process.env.REACT_APP_CODESPACE_NAME ? '8000.app.github.dev' : ':8000';
      const apiUrl = `${protocol}://${codespace}-${backendPort}/api/leaderboard/`;

      console.log('Fetching Leaderboard from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Leaderboard data fetched:', data);
      
      // Handle both paginated responses and plain arrays
      const leaderboardList = data.results || data;
      setLeaderboard(Array.isArray(leaderboardList) ? leaderboardList : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-body text-center">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 mb-0">Loading leaderboard...</p>
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

  const getRankBadge = (rank) => {
    if (rank === 1) return 'bg-warning';
    if (rank === 2) return 'bg-secondary';
    if (rank === 3) return 'bg-danger';
    return 'bg-dark';
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div className="card-header" style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white'}}>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">🏆 Leaderboard</h4>
            <span className="badge bg-light text-dark">{leaderboard.length} total</span>
          </div>
        </div>
        <div className="card-body">
          {leaderboard.length === 0 ? (
            <div className="alert alert-info mb-0" role="alert">
              <strong>No leaderboard data found</strong> - Currently there are no entries.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" style={{width: '80px'}}>Rank</th>
                    <th scope="col">User</th>
                    <th scope="col" style={{width: '120px'}}>Score</th>
                    <th scope="col" style={{width: '120px'}}>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    return (
                      <tr key={entry.id} className={rank <= 3 ? 'table-highlighted' : ''}>
                        <td>
                          <span className={`badge ${getRankBadge(rank)}`}>
                            {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : ''} #{rank}
                          </span>
                        </td>
                        <td>
                          <strong>{entry.user || entry.username || 'N/A'}</strong>
                        </td>
                        <td>
                          <span className="badge bg-info text-dark">{entry.score || 'N/A'}</span>
                        </td>
                        <td>
                          <span className="badge bg-success">{entry.points || 'N/A'}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
    </div>
  );
};

export default Leaderboard;
