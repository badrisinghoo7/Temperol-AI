import {  Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ProfilePage from './pages/Profile';

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <div
              style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Inter, Arial, sans-serif',
                position: 'relative',
              }}
            >
              {/* Logout Button Top Right */}
              {isAuthenticated && (
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  style={{
                    position: 'absolute',
                    top: 32,
                    right: 40,
                    background: '#e53935',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 22px',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px #e5393520',
                    zIndex: 10,
                  }}
                >
                  Logout
                </button>
              )}

              {/* Greeting and Login */}
              {!isAuthenticated && !isLoading && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 28,
                  }}
                >
                  <h1 style={{ fontWeight: 700, fontSize: 38, color: '#1976d2', marginBottom: 0 }}>
                    Welcome to Temporal AI
                  </h1>
                  <p
                    style={{
                      fontSize: 20,
                      color: '#555',
                      margin: 0,
                      textAlign: 'center',
                      maxWidth: 420,
                      lineHeight: 1.6,
                    }}
                  >
                    Your personal AI-powered dashboard.<br />
                    <span style={{ color: '#1976d2', fontWeight: 600 }}>Sign in</span> to explore your profile and smart features!
                  </p>
                  <button
                    onClick={() => loginWithRedirect()}
                    style={{
                      padding: '14px 38px',
                      borderRadius: 8,
                      background: '#1976d2',
                      color: '#fff',
                      border: 'none',
                      fontWeight: 600,
                      fontSize: 20,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px #1976d220',
                      marginTop: 12,
                    }}
                  >
                    Login
                  </button>
                </div>
              )}

              {/* After Login Greeting */}
              {isAuthenticated && user && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 60,
                  }}
                >
                  <img
                    src={user.picture}
                    alt={user.name}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      marginBottom: 18,
                      border: '3px solid #1976d2',
                      boxShadow: '0 2px 12px #1976d220',
                    }}
                  />
                  <h2 style={{ fontWeight: 700, fontSize: 28, color: '#1976d2', margin: 0 }}>
                    Hello, {user.given_name || user.name}!
                  </h2>
                  <p style={{ fontSize: 17, color: '#555', margin: '8px 0 24px 0' }}>
                    Glad to see you back. <br />
                    <Link
                      to="/profile"
                      style={{
                        color: '#1976d2',
                        fontWeight: 600,
                        textDecoration: 'underline',
                        fontSize: 17,
                      }}
                    >
                      Go to your profile
                    </Link>
                  </p>
                </div>
              )}
            </div>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;