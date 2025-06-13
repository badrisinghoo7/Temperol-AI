import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState, useRef } from 'react';
import './Profile.css';

const ProfilePage = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    pincode: '',
  });
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch user profile from backend on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          const res = await fetch(`http://localhost:5000/api/users/${user.sub}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setForm({
              firstName: data.firstName || user.given_name || '',
              lastName: data.lastName || user.family_name || '',
              email: data.email || user.email || '',
              phone: data.phone || '',
              city: data.city || '',
              pincode: data.pincode || '',
            });
          } else {
            // fallback to Auth0 data if backend fails
            setForm({
              firstName: user.given_name || '',
              lastName: user.family_name || '',
              email: user.email || '',
              phone: '',
              city: '',
              pincode: '',
            });
          }
        } catch (err) {
          // fallback to Auth0 data if error
          setForm({
            firstName: user.given_name || '',
            lastName: user.family_name || '',
            email: user.email || '',
            phone: '',
            city: '',
            pincode: '',
          });
        }
      }
    };
    fetchProfile();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditing(true);

  const handleCancel = () => {
    if (user) {
      setForm({
        firstName: user.given_name || '',
        lastName: user.family_name || '',
        email: user.email || '',
        phone: '',
        city: '',
        pincode: '',
      });
    }
    setEditing(false);
    setStatus('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Saving...');
    try {
      const token = await getAccessTokenSilently();
      const payload = {
        authId: user?.sub,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        city: form.city,
        pincode: form.pincode,
      };
      const res = await fetch(`http://localhost:5000/api/users/${user?.sub}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('Profile updated!');
        setEditing(false);
      } else {
        setStatus('Failed to update profile.');
      }
    } catch (err) {
      setStatus('Error updating profile.');
    }
  };

  const handleAvatarClick = () => {
    if (editing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return <p>You're not logged in</p>;

  return (
    <div className="profile-bg">
      <div className="profile-card">
        <div className="profile-greeting">
          👋 Welcome back, <strong>{form.firstName || user?.name?.split(' ')[0]}</strong>!
        </div>
        <div className="profile-avatar-wrap">
          <div className="profile-avatar" onClick={handleAvatarClick}>
            <img src={user?.picture} alt={user?.name} />
            {editing && (
              <>
                <div className="profile-avatar-edit">
                  <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm17.71-10.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  disabled
                />
              </>
            )}
          </div>
          <h2 className="profile-title">{form.firstName} {form.lastName}</h2>
          <p className="profile-email">{form.email}</p>
        </div>
        <hr className="profile-divider" />
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-form-row">
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>
          <div className="profile-form-row">
            <div>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>
            <div>
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>
          </div>
          {!editing ? (
            <button type="button" className="profile-btn" onClick={handleEdit}>
              Edit Profile
            </button>
          ) : (
            <div className="profile-form-btns">
              <button type="submit" className="profile-btn save">Save</button>
              <button type="button" className="profile-btn cancel" onClick={handleCancel}>Cancel</button>
            </div>
          )}
          {status && (
            <p className={`profile-status ${status.includes('error') || status.includes('Failed') ? 'error' : 'success'}`}>
              {status}
            </p>
          )}
        </form>
        <div className="profile-extra">
          <div>
            <strong>Account Info:</strong>
          </div>
          <div>
            <span>Email Verified:</span> {user?.email_verified ? '✅ Yes' : '❌ No'}
          </div>
          <div>
            <span>Nickname:</span> {user?.nickname}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
