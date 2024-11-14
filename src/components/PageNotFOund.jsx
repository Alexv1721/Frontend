import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.text}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>Go back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: '5rem',
    color: 'red',
    margin: '0 0 20px 0',
  },
  text: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '20px',
  },
  link: {
    fontSize: '1rem',
    color: '#007bff',
    textDecoration: 'none',
    border: '1px solid #007bff',
    padding: '10px 20px',
    borderRadius: '4px',
  },
};

export default PageNotFound;
