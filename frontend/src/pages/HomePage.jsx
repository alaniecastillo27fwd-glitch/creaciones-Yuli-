import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';

export default function HomePage() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get('/productos')
      .then((res) => setProductos(res.data.data || []))
      .catch(() => setError('Backend aún sin conexión activa a la tabla productos.'));
  }, []);

  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '960px', margin: '0 auto' }}>
        <h1 style={{ color: 'var(--color-fucsia)', marginBottom: '0.5rem' }}>
          Catálogo de Creaciones Yuli
        </h1>
        <p style={{ marginBottom: '1.5rem' }}>
          Decoraciones personalizadas, centros de mesa, manualidades y maquetas.
        </p>

        {error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {productos.map((prod) => (
              <li key={prod.id}>
                {prod.nombre} — {prod.categoria} (${prod.precio})
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
