import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import FeedbackBanner from '../components/FeedbackBanner';
import { useAuth } from '../context/AuthContext';

export default function ProfileDeleteAccountPage() {
  const { usuario } = useAuth();

  const [motivo, setMotivo] = useState('');
  const [passwordConfirmacion, setPasswordConfirmacion] = useState('');
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSolicitarEliminacion = (e) => {
    e.preventDefault();
    setFeedback(null);

    if (!passwordConfirmacion || passwordConfirmacion.trim().length < 4) {
      setFeedback({
        tipo: 'aviso',
        titulo: 'Reconfirma tu contraseña por seguridad',
        mensaje:
          'Para proteger tu cuenta antes de registrar una solicitud de eliminación (Ley N.º 8968), debes ingresar tu contraseña actual.'
      });
      return;
    }

    setSolicitudEnviada(true);
    setPasswordConfirmacion('');
    setFeedback({
      tipo: 'exito',
      titulo: 'Solicitud de eliminación registrada (Derechos ARCO - Ley N.º 8968)',
      mensaje:
        'Hemos recibido tu solicitud de supresión/anonimización de datos personales. Nuestro equipo la procesará dentro del plazo legal de 5 días hábiles.'
    });
  };

  const inputStyle = {
    width: '100%',
    padding: '0.7rem 0.9rem',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-beige-arena)',
    backgroundColor: 'var(--color-beige-crema)',
    color: 'var(--color-carbon-calido)',
    fontFamily: 'var(--font-body)',
    marginTop: '0.35rem'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main className="container" style={{ flex: 1, padding: 'var(--space-lg) var(--space-md)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <h1>Mi Perfil y Autodeterminación Informativa</h1>
          <p>
            Consulta tus datos registrados y gestiona tus derechos de privacidad conforme a la Ley N.º 8968.
          </p>

          {feedback && (
            <FeedbackBanner
              tipo={feedback.tipo}
              titulo={feedback.titulo}
              mensaje={feedback.mensaje}
              onClose={() => setFeedback(null)}
            />
          )}

          {/* 1. Resumen del Perfil */}
          <section className="card" style={{ marginBottom: 'var(--space-lg)' }}>
            <h2>Datos de tu cuenta</h2>
            <p>
              <strong>Nombre completo:</strong> {usuario?.nombre_completo || 'Usuario autenticado'}
            </p>
            <p>
              <strong>Correo electrónico:</strong> {usuario?.email || 'No especificado'}
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong>Rol asignado:</strong>{' '}
              <span className="badge-turquoise">{usuario?.rol || 'Cliente'}</span>
            </p>
          </section>

          {/* 2. Flujo de Solicitud de Eliminación de Cuenta con reconfirmación de contraseña */}
          <section className="card">
            <span className="badge-festive" style={{ marginBottom: 'var(--space-xs)' }}>
              Derecho al Olvido / Supresión (Ley N.º 8968)
            </span>
            <h2>Solicitar eliminación de mi cuenta</h2>
            <p>
              Si deseas dar de baja tu cuenta y anonimizar tus datos personales en nuestra base de datos (`solicitudes_eliminacion`), completa el siguiente formulario reconfirmando tu contraseña actual.
            </p>

            <form onSubmit={handleSolicitarEliminacion}>
              <div style={{ marginBottom: 'var(--space-sm)' }}>
                <label htmlFor="del-motivo" style={{ fontWeight: 'var(--weight-semibold)' }}>
                  Motivo de la solicitud (opcional)
                </label>
                <textarea
                  id="del-motivo"
                  rows="3"
                  placeholder="Cuéntanos si deseas dejar algún comentario..."
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: 'var(--space-md)' }}>
                <label htmlFor="del-password" style={{ fontWeight: 'var(--weight-semibold)' }}>
                  Reconfirma tu contraseña actual para autorizar la solicitud *
                </label>
                <input
                  id="del-password"
                  type="password"
                  placeholder="Escribe tu contraseña actual"
                  value={passwordConfirmacion}
                  onChange={(e) => setPasswordConfirmacion(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={!passwordConfirmacion.trim() || solicitudEnviada}
              >
                {solicitudEnviada
                  ? 'Solicitud en revisión por el taller'
                  : 'Confirmar solicitud de eliminación de cuenta'}
              </Button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
