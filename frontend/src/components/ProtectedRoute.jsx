import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FeedbackBanner from './FeedbackBanner';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { estaAutenticado, rol, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="container" style={{ padding: 'var(--space-lg) 0', textAlign: 'center' }}>
        <p>Preparando tu espacio en el taller de Creaciones Yuli...</p>
      </div>
    );
  }

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(rol)) {
    return (
      <div className="container" style={{ padding: 'var(--space-lg) 0' }}>
        <FeedbackBanner
          tipo="aviso"
          titulo="Espacio reservado del taller"
          mensaje={`Hola, esta sección está habilitada para el perfil [${allowedRoles.join(', ')}]. Tu perfil actual es ${rol}.`}
        />
      </div>
    );
  }

  return children;
}
