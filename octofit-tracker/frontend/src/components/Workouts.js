import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const codespace =
        process.env.REACT_APP_CODESPACE_NAME || 'localhost:3000';
      const protocol = process.env.REACT_APP_CODESPACE_NAME
        ? 'https'
        : 'http';
      const backendPort = process.env.REACT_APP_CODESPACE_NAME
        ? '8000.app.github.dev'
        : ':8000';
      const apiUrl = `${protocol}://${codespace}-${backendPort}/api/workouts/`;

      console.log('Fetching Workouts from:', apiUrl);

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Workouts data fetched:', data);

      const workoutsList = data.results || data;
      setWorkouts(Array.isArray(workoutsList) ? workoutsList : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const getIntensityBadge = (intensity) => {
    if (!intensity) return 'bg-secondary';
    const lower = intensity.toLowerCase();
    if (lower.includes('high') || lower.includes('intense')) return 'bg-danger';
    if (lower.includes('medium') || lower.includes('moderate'))
      return 'bg-warning text-dark';
    if (lower.includes('low') || lower.includes('light'))
      return 'bg-info text-dark';
    return 'bg-secondary';
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-body text-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 mb-0">Loading workouts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>Error:</strong> {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => window.location.reload()}
          ></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div
          className="card-header"
          style={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
            color: 'white',
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">💪 Workouts</h4>
            <span className="badge bg-light text-dark">
              {workouts.length} total
            </span>
          </div>
        </div>
        <div className="card-body">
          {workouts.length === 0 ? (
            <div className="alert alert-info mb-0" role="alert">
              <strong>No workouts found</strong> - Currently there are no
              workouts in the system.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Workout Type</th>
                    <th scope="col">Duration (minutes)</th>
                    <th scope="col">Intensity</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout) => (
                    <tr key={workout.id}>
                      <td>
                        <span className="badge bg-secondary">
                          {workout.id}
                        </span>
                      </td>
                      <td>
                        <strong>
                          {workout.workout_type || 'N/A'}
                        </strong>
                      </td>
                      <td>
                        <span className="badge bg-primary">
                          {workout.duration || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${getIntensityBadge(
                            workout.intensity
                          )}`}
                        >
                          {workout.intensity || 'N/A'}
                        </span>
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

export default Workouts;