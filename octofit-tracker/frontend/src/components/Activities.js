import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost:3000';
      const protocol = process.env.REACT_APP_CODESPACE_NAME ? 'https' : 'http';
      const backendPort = process.env.REACT_APP_CODESPACE_NAME
        ? '8000.app.github.dev'
        : ':8000';
      const apiUrl = `${protocol}://${codespace}-${backendPort}/api/activities/`;

      console.log('Fetching Activities from:', apiUrl);

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Activities data fetched:', data);

      // Handle both paginated responses and plain arrays
      const activitiesList = data.results || data;
      setActivities(Array.isArray(activitiesList) ? activitiesList : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-body text-center">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 mb-0">Loading activities...</p>
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
            background: 'linear-gradient(135deg, #f97316 0%, #d97706 100%)',
            color: 'white',
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">📊 Activities</h4>
            <span className="badge bg-light text-dark">
              {activities.length} total
            </span>
          </div>
        </div>
        <div className="card-body">
          {activities.length === 0 ? (
            <div className="alert alert-info mb-0" role="alert">
              <strong>No activities found</strong> - Currently there are no
              activities in the system.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Activity Type</th>
                    <th scope="col">Duration (minutes)</th>
                    <th scope="col">Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id}>
                      <td>
                        <span className="badge bg-secondary">
                          {activity.id}
                        </span>
                      </td>
                      <td>
                        <strong>{activity.activity_type || 'N/A'}</strong>
                      </td>
                      <td>
                        <span className="badge bg-info text-dark">
                          {activity.duration || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-danger">
                          {activity.calories || 'N/A'}
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

export default Activities;