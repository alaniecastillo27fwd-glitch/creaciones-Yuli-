import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import FeedbackBanner from '../components/FeedbackBanner';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const tableHeaderStyle = {
  backgroundColor: 'var(--color-turquesa-profundo)',
  color: 'var(--color-beige-crema)',
  textAlign: 'left',
  padding: '0.75rem 1rem'
};

const tableCellStyle = {
  padding: '0.75rem 1rem',
  borderBottom: '1px solid var(--color-beige-arena)'
};

export default function ClientDashboardPage() {
  const { usuario } = useAuth();
  const [searchParams] = useSearchParams();

  const productoPreseleccionado = searchParams.get('nombre') || '';
  const idProductoPreseleccionado = searchParams.get('producto') || null;

  const [pedidos, setPedidos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(Boolean(productoPreseleccionado));
  const [tematica, setTematica] = useState(productoPreseleccionado);
  const [especificaciones, setEspecificaciones] = useState('');
  const [fechaDeseada, setFechaDeseada] = useState('');
  const [metodoPago, setMetodoPago] = useState('sinpe_movil');
  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const cargarMisPedidos = () => {
    api
      .get('/pedidos')
      .then((res) => setPedidos(res.data?.data || []))
      .catch(() => {});
  };

  useEffect(() => {
    cargarMisPedidos();
  }, []);

  const handleCrearPedido = async (e) => {
    e.preventDefault();
    setFeedback(null);

    if (!tematica.trim() || !especificaciones.trim() || !fechaDeseada) {
      setFeedback({
        tipo: 'aviso',
        titulo: 'Cuéntanos todos los detalles de tu idea',
        mensaje: 'Por favor completa la temática, las especificaciones y la fecha en que necesitas tu creación.'
      });
      return;
    }

    setEnviando(true);
    try {
      await api.post('/pedidos', {
        id_producto: idProductoPreseleccionado,
        tematica: tematica.trim(),
        especificaciones: especificaciones.trim(),
        fecha_deseada: fechaDeseada,
        metodo_pago: metodoPago
      });

      setFeedback({
        tipo: 'exito',
        titulo: '¡Recibimos tu solicitud con mucho cariño!',
        mensaje:
          'Tu pedido quedó en estado "Pendiente de cotización". Muy pronto revisaremos tus detalles.'
      });
      setTematica('');
      setEspecificaciones('');
      setFechaDeseada('');
      setMostrarFormulario(false);
      cargarMisPedidos();
    } catch (error) {
      setFeedback({
        tipo: 'error',
        titulo: 'No pudimos guardar tu solicitud',
        mensaje:
          error.response?.data?.mensaje ||
          'Revisa la fecha seleccionada y vuelve a intentarlo.'
      });
    } finally {
      setEnviando(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.65rem 0.85rem',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-beige-arena)',
    backgroundColor: 'var(--color-beige-crema)',
    color: 'var(--color-carbon-calido)',
    fontFamily: 'var(--font-body)',
    marginTop: '0.3rem'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main className="container" style={{ flex: 1, padding: 'var(--space-lg) var(--space-md)' }}>
        <header
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            marginBottom: 'var(--space-md)'
          }}
        >
          <div>
            <h1>¡Hola, {usuario?.nombre_completo || 'Cliente'}!</h1>
            <p style={{ marginBottom: 0 }}>
              Aquí puedes revisar tus pedidos personalizados y solicitar nuevas creaciones hechas con amor.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
            <Button
              variant="primary"
              onClick={() => setMostrarFormulario((prev) => !prev)}
            >
              {mostrarFormulario ? 'Ocultar formulario' : 'Solicitar pedido personalizado'}
            </Button>
            <Link to="/perfil">
              <Button variant="secondary">Mi Perfil y Privacidad</Button>
            </Link>
          </div>
        </header>

        {feedback && (
          <FeedbackBanner
            tipo={feedback.tipo}
            titulo={feedback.titulo}
            mensaje={feedback.mensaje}
            onClose={() => setFeedback(null)}
          />
        )}

        {/* Formulario para solicitar pedido personalizado */}
        {mostrarFormulario && (
          <section className="card" style={{ marginBottom: 'var(--space-lg)' }}>
            <h2>Nueva solicitud de pedido o cotización a medida</h2>
            <form onSubmit={handleCrearPedido}>
              <div style={{ marginBottom: 'var(--space-sm)' }}>
                <label htmlFor="ped-tematica" style={{ fontWeight: 'var(--weight-semibold)' }}>
                  Temática o producto deseado *
                </label>
                <input
                  id="ped-tematica"
                  type="text"
                  placeholder="Ej. Piñata 3D Sirena Ariel / Maqueta Sistema Solar"
                  value={tematica}
                  onChange={(e) => setTematica(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: 'var(--space-sm)' }}>
                <label htmlFor="ped-especificaciones" style={{ fontWeight: 'var(--weight-semibold)' }}>
                  Especificaciones (nombre del festejado, colores, medidas) *
                </label>
                <textarea
                  id="ped-especificaciones"
                  rows="3"
                  placeholder="Ej. Colores turquesa y fucsia, nombre 'Lucía', edad 6 años..."
                  value={especificaciones}
                  onChange={(e) => setEspecificaciones(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 'var(--space-sm)',
                  marginBottom: 'var(--space-md)'
                }}
              >
                <div>
                  <label htmlFor="ped-fecha" style={{ fontWeight: 'var(--weight-semibold)' }}>
                    Fecha deseada de entrega *
                  </label>
                  <input
                    id="ped-fecha"
                    type="date"
                    value={fechaDeseada}
                    onChange={(e) => setFechaDeseada(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="ped-pago" style={{ fontWeight: 'var(--weight-semibold)' }}>
                    Método de pago preferido
                  </label>
                  <select
                    id="ped-pago"
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="sinpe_movil">SINPE Móvil</option>
                    <option value="transferencia">Transferencia Bancaria</option>
                    <option value="efectivo">Efectivo en el taller</option>
                  </select>
                </div>
              </div>

              <Button type="submit" variant="primary" disabled={enviando}>
                {enviando ? 'Enviando al taller...' : 'Enviar solicitud personalizada'}
              </Button>
            </form>
          </section>
        )}

        {/* Listado de Pedidos Propios del Cliente */}
        <section className="card" style={{ marginBottom: 'var(--space-lg)', overflowX: 'auto' }}>
          <h2 style={{ marginBottom: 'var(--space-sm)' }}>Mis Pedidos y Cotizaciones</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>N.º Pedido</th>
                <th style={tableHeaderStyle}>Especificaciones</th>
                <th style={tableHeaderStyle}>Fecha Entrega</th>
                <th style={tableHeaderStyle}>Estado</th>
                <th style={tableHeaderStyle}>Adelanto</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ ...tableCellStyle, textAlign: 'center' }}>
                    Aún no tienes pedidos registrados. ¡Haz clic en «Solicitar pedido personalizado» para empezar!
                  </td>
                </tr>
              ) : (
                pedidos.map((p) => (
                  <tr key={p.id_pedido}>
                    <td style={tableCellStyle}>#{p.id_pedido}</td>
                    <td style={tableCellStyle}>
                      {p.cotizacion?.especificaciones_personalizadas || 'Pedido personalizado'}
                    </td>
                    <td style={tableCellStyle}>{p.fecha_entrega_comprometida}</td>
                    <td style={tableCellStyle}>
                      <span className="badge-turquoise">
                        {p.estado_legible || p.estado_pedido}
                      </span>
                    </td>
                    <td style={tableCellStyle}>{p.porcentaje_adelanto}%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* Espacio Reservado Fase 4 */}
        <section className="card-info">
          <h3>Asistente Creativo de Fiestas y Maquetas</h3>
          <p style={{ marginBottom: '0.25rem' }}>
            Pronto podrás conversar con nuestro asistente para combinar temáticas, colores y calcular presupuestos al instante.
          </p>
          <p className="subtitle-emphasis" style={{ marginBottom: 0 }}>
            Próximamente: Módulo de IA
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
