'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

// import { signOut } from '@/utils/auth'; // anything in the src dir, you can use the @ instead of relative paths
import { useAuth } from '@/utils/context/authContext';
import WeatherForm from '../components/forms/WeatherForm';

function Home() {
  const { user } = useAuth();

  return (
    <div id="main-app" style={{ width: '100%', minHeight: '860px' }}>
      <div
        style={{
          maxWidth: '400px',
          margin: '0px auto',
          paddingTop: '20px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h2>Hello, {user.displayName}! </h2>
        <h5>Welcome to Fetch Weather</h5>
        <div style={{ marginTop: '20px' }}>
          <WeatherForm />
        </div>
      </div>
    </div>
  );
}

export default Home;
