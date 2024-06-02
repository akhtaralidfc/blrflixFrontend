import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.text}>Oops! The page you are looking for does not exist.</p>
      <Link to="/" style={styles.link}>Go back to Home Page</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20%',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  link: {
    fontSize: '1rem',
    color: 'blue',
    textDecoration: 'underline',
  },
};

export default ErrorPage;
