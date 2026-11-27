import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import FeedbackBanner from '../components/FeedbackBanner';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [nombreCompleto, setNombreCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');

  // Dos casillas obligatorias de gobernanza (Ley N.º 8968 CR)
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const consentimientoCompleto = aceptaPrivacidad && aceptaTerminos;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    if (!consentimientoCompleto) {
      setFeedback({
        tipo: 'aviso',
        titulo: 'Consentimiento informado requerido (Ley N.º 8968)',
        mensaje:
          'Por favor marca ambas casillas de Política de Privacidad y Términos y Condiciones para crear tu cuenta.'
      });
      return;
    }

    setEnviando(true);
    try {
      await register({
        nombre_completo: nombreCompleto.trim(),
        email: email.trim(),
        telefono: telefono.trim(),
        password,
        acepta_privacidad: aceptaPrivacidad,
        acepta_terminos: aceptaTerminos,
        version_politica: 'v1.0-2026'
      });

      setFeedback({
        tipo: 'exito',
        titulo: '¡Bienvenida/o a la familia de Creaciones Yuli!',
        mensaje:
          'Tu cuenta y tu consentimiento legal fueron registrados con éxito. Ahora puedes iniciar sesión.'
      });

      setTimeout(() => navigate('/login'), 1800);
    } catch (error) {
      const listaErrores = error.response?.data?.errores;
      const detalle = Array.isArray(listaErrores)
        ? listaErrores.join(' ')
        : error.response?.data?.mensaje ||
          'Revisa que tu contraseña tenga mínimo 8 caracteres, una mayúscula, una minúscula y un número.';

      setFeedback({
        tipo: 'error',
        titulo: 'Revisemos algunos datos del formulario',
        mensaje: detalle
      });
    } finally {
      setEnviando(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.7rem 0.9rem',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-beige-arena)',
    backgroundColor: 'var(--color-beige-crema)',
    color: 'var(--color-carbon-calido)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-body)',
    marginTop: '0.35rem'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main
        className="container"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-lg) var(--space-md)'
        }}
      >
        <section className="card" style={{ width: '100%', maxWidth: '540px', padding: 'var(--space-lg)' }}>
          <h1 style={{ textAlign: 'center' }}>Crea tu cuenta</h1>
          <p style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
            Únete a Creaciones Yuli para solicitar piñatas, toppers, centros de mesa y maquetas a tu medida.
          </p>

          {feedback && (
            <FeedbackBanner
              tipo={feedback.tipo}
              titulo={feedback.titulo}
              mensaje={feedback.mensaje}
              onClose={() => setFeedback(null)}
            />
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <label htmlFor="reg-nombre" style={{ fontWeight: 'var(--weight-semibold)' }}>
                Nombre completo *
              </label>
              <input
                id="reg-nombre"
                type="text"
                placeholder="Ej. Valeria Solís"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <label htmlFor="reg-email" style={{ fontWeight: 'var(--weight-semibold)' }}>
                Correo electrónico *
              </label>
              <input
                id="reg-email"
                type="email"
                placeholder="tu-correo@ejemplo.cr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <label htmlFor="reg-telefono" style={{ fontWeight: 'var(--weight-semibold)' }}>
                Teléfono / WhatsApp (para coordinar entregas)
              </label>
              <input
                id="reg-telefono"
                type="tel"
                placeholder="+506 8888-8888"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 'var(--space-md)' }}>
              <label htmlFor="reg-password" style={{ fontWeight: 'var(--weight-semibold)' }}>
                Contraseña segura *
              </label>
              <input
                id="reg-password"
                type="password"
                placeholder="Mínimo 8 caracteres, 1 mayúscula y 1 número"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {/* Gobernanza Ley N.º 8968 CR: 2 casillas obligatorias */}
            <div className="card-info" style={{ marginBottom: 'var(--space-md)' }}>
              <p
                className="text-legal"
                style={{
                  fontWeight: 'var(--weight-bold)',
                  color: 'var(--color-turquesa-profundo)',
                  marginBottom: 'var(--space-xs)'
                }}
              >
                Protección de Datos Personales (Ley N.º 8968 de Costa Rica)
              </p>

              <label
                htmlFor="chk-privacidad"
                className="text-legal"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <input
                  id="chk-privacidad"
                  type="checkbox"
                  checked={aceptaPrivacidad}
                  onChange={(e) => setAceptaPrivacidad(e.target.checked)}
                  style={{ marginTop: '0.2rem' }}
                />
                <span>
                  He leído y acepto la{' '}
                  <Link to="/privacidad">Política de Privacidad</Link> y autorizo el tratamiento de mis datos para gestionar mis cotizaciones y pedidos. *
                </span>
              </label>

              <label
                htmlFor="chk-terminos"
                className="text-legal"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <input
                  id="chk-terminos"
                  type="checkbox"
                  checked={aceptaTerminos}
                  onChange={(e) => setAceptaTerminos(e.target.checked)}
                  style={{ marginTop: '0.2rem' }}
                />
                <span>
                  Acepto los{' '}
                  <Link to="/terminos">Términos y Condiciones</Link> de elaboración artesanal y anticipos de Creaciones Yuli. *
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={!consentimientoCompleto || enviando}
            >
              {enviando
                ? 'Registrando tu cuenta...'
                : consentimientoCompleto
                  ? 'Crear mi cuenta'
                  : 'Marca las 2 casillas legales para continuar'}
            </Button>
          </form>

          <hr className="divider" />

          <p style={{ textAlign: 'center', marginBottom: 0 }}>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" style={{ color: 'var(--color-turquesa-principal)' }}>
              Inicia sesión aquí
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
