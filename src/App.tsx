// Minimal React app - redirects to static HTML
export default function App() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Loading landing page...</p>
      <p><a href="/index.html">Click here if not redirected automatically</a></p>
    </div>
  );
}
