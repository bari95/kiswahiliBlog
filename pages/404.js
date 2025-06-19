const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      color: '#333'
    }}>
      <h1 style={{
        fontSize: '6rem',
        margin: '0',
        color: '#e74c3c'
      }}>
        404
      </h1>
      
      <h2 style={{
        fontSize: '2rem',
        margin: '1rem 0',
        fontWeight: 'normal'
      }}>
        Page Not Found
      </h2>
      
      <p style={{
        fontSize: '1.2rem',
        marginBottom: '2rem',
        textAlign: 'center',
        maxWidth: '500px',
        color: '#666'
      }}>
        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
      </p>
      
      <button
        onClick={() => window.history.back()}
        style={{
          padding: '12px 24px',
          fontSize: '1rem',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginRight: '10px'
        }}
      >
        Go Back
      </button>
      
      <button
        onClick={() => window.location.href = '/'}
        style={{
          padding: '12px 24px',  
          fontSize: '1rem',
          backgroundColor: '#2ecc71',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;