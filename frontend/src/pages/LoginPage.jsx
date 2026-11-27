import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import FeedbackBanner from '../components/FeedbackBanner';
import { useAuth } from '../context/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [mostrarRecuperacion, setMostrarRecuperacion] = useState(false);

  const validarFormulario = () => {
    if (!EMAIL_REGEX.test(email.trim())) {
      setFeedback({
        tipo: 'aviso',
        titulo: 'Revisa tu correo electrónico',
        mensaje: 'Por favor escribe un correo válido (por ejemplo: tu-nombre@correo.cr).'
      });
      return false;
    }

    if (!password || password.trim().length < 4) {
      setFeedback({
        tipo: 'aviso',
        titulo: 'Falta tu contraseña',
        mensaje: 'Escribe tu contraseña para entrar a tu cuenta de Creaciones Yuli.'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    if (!validarFormulario()) return;

    setEnviando(true);
    try {
      const usuarioAutenticado = await login(email.trim(), password);

      if (usuarioAutenticado.rol === 'Administrador') {
        navigate('/admin');
      } else if (usuarioAutenticado.rol === 'Colaborador') {
        navigate('/colaborador');
      } else if (usuarioAutenticado.rol === 'Auditor') {
        navigate('/auditor');
      } else {
        navigate('/cliente');
      }
    } catch (error) {
      const msgServidor =
        error.response?.data?.mensaje ||
        'No pudimos iniciar sesión con esos datos. Verifica tu correo y contraseña.';
      setFeedback({
        tipo: 'error',
        titulo: 'No logramos abrir tu cuenta',
        mensaje: msgServidor
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
        <section className="card" style={{ width: '100%', maxWidth: '480px', padding: 'var(--space-lg)' }}>
          <h1 style={{ textAlign: 'center' }}>¡Qué gusto verte de nuevo!</h1>
          <p style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
            Ingresa a tu espacio en Creaciones Yuli para revisar tus cotizaciones y pedidos.
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
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <label htmlFor="login-email" style={{ fontWeight: 'var(--weight-semibold)' }}>
                Correo electrónico
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="ejemplo@correo.cr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <label htmlFor="login-password" style={{ fontWeight: 'var(--weight-semibold)' }}>
                Contraseña
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {/* Enlace a recuperación de contraseña */}
            <div style={{ textAlign: 'right', marginBottom: 'var(--space-md)' }}>
              <button
                type="button"
                onClick={() => setMostrarRecuperacion((prev) => !prev)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-turquesa-principal)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-legal)',
                  fontWeight: 'var(--weight-semibold)',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {mostrarRecuperacion && (
              <FeedbackBanner
                tipo="info"
                titulo="Recuperación asistida de cuenta"
                mensaje="Para proteger tu cuenta, escríbenos desde tu número registrado al WhatsApp oficial 5714-7889 indicando tu correo y te enviaremos un enlace seguro de restablecimiento."
                onClose={() => setMostrarRecuperacion(false)}
              />
            )}

            <Button type="submit" variant="primary" fullWidth disabled={enviando}>
              {enviando ? 'Ingresando al taller...' : 'Iniciar sesión'}
            </Button>
          </form>

          <hr className="divider" />

          <p style={{ textAlign: 'center', marginBottom: 0 }}>
            ¿Aún no tienes cuenta?{' '}
            <Link to="/registro" style={{ color: 'var(--color-fucsia-vibrante)' }}>
              Regístrate aquí con amor
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
