import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import FeedbackBanner from '../components/FeedbackBanner';
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

export default function CollaboratorDashboardPage() {
  const [pedidos, setPedidos] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const cargarDatosTaller = () => {
    api
      .get('/pedidos')
      .then((res) => setPedidos(res.data?.data || []))
      .catch(() => {});

    api
      .get('/inventario')
      .then((res) => setInsumos(res.data?.data || []))
      .catch(() => {});
  };

  useEffect(() => {
    cargarDatosTaller();
  }, []);

  const cambiarEstadoPedido = async (idPedido, nuevoEstado) => {
    try {
      await api.patch(`/pedidos/${idPedido}/estado`, { estado_pedido: nuevoEstado });
      setFeedback({
        tipo: 'exito',
        titulo: 'Estado del pedido actualizado',
        mensaje: `El pedido #${idPedido} pasó a estado "${nuevoEstado}".`
      });
      cargarDatosTaller();
    } catch {
      setFeedback({
        tipo: 'error',
        titulo: 'No pudimos actualizar el estado',
        mensaje: 'Revisa tu conexión con el servidor e inténtalo de nuevo.'
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main className="container" style={{ flex: 1, padding: 'var(--space-lg) var(--space-md)' }}>
        <header style={{ marginBottom: 'var(--space-md)' }}>
          <h1>Mesa Operativa de Colaborador — Taller Creaciones Yuli</h1>
          <p>
            Control de la cola de producción de pedidos personalizados y existencias de materiales.
          </p>
        </header>

        {feedback && (
          <FeedbackBanner
            tipo={feedback.tipo}
            titulo={feedback.titulo}
            mensaje={feedback.mensaje}
            onClose={() => setFeedback(null)}
          />
        )}

        {/* 1. Cola de Pedidos Personalizados en Producción */}
        <section className="card" style={{ marginBottom: 'var(--space-lg)', overflowX: 'auto' }}>
          <h2 style={{ marginBottom: 'var(--space-sm)' }}>Cola de Pedidos Personalizados</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Pedido</th>
                <th style={tableHeaderStyle}>Especificaciones / Temática</th>
                <th style={tableHeaderStyle}>Fecha Entrega</th>
                <th style={tableHeaderStyle}>Estado Actual</th>
                <th style={tableHeaderStyle}>Avanzar Etapa</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ ...tableCellStyle, textAlign: 'center' }}>
                    Sin pedidos en cola en este momento.
                  </td>
                </tr>
              ) : (
                pedidos.map((p) => (
                  <tr key={p.id_pedido}>
                    <td style={tableCellStyle}>#{p.id_pedido}</td>
                    <td style={tableCellStyle}>
                      {p.cotizacion?.especificaciones_personalizadas || 'Pedido de catálogo'}
                    </td>
                    <td style={tableCellStyle}>{p.fecha_entrega_comprometida}</td>
                    <td style={tableCellStyle}>
                      <span className="badge-turquoise">{p.estado_legible || p.estado_pedido}</span>
                    </td>
                    <td style={{ ...tableCellStyle, display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <Button
                        variant="secondary"
                        onClick={() => cambiarEstadoPedido(p.id_pedido, 'en_produccion')}
                      >
                        En Producción
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => cambiarEstadoPedido(p.id_pedido, 'listo_entrega')}
                      >
                        Listo Entrega
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* 2. Inventario de Insumos del Taller */}
        <section className="card" style={{ marginBottom: 'var(--space-lg)', overflowX: 'auto' }}>
          <h2 style={{ marginBottom: 'var(--space-sm)' }}>Inventario de Insumos y Alertas de Stock</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Insumo</th>
                <th style={tableHeaderStyle}>Unidad</th>
                <th style={tableHeaderStyle}>Stock Actual</th>
                <th style={tableHeaderStyle}>Stock Mínimo</th>
                <th style={tableHeaderStyle}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {insumos.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ ...tableCellStyle, textAlign: 'center' }}>
                    Sin insumos cargados.
                  </td>
                </tr>
              ) : (
                insumos.map((item) => (
                  <tr key={item.id_insumo}>
                    <td style={tableCellStyle}>{item.nombre_insumo}</td>
                    <td style={tableCellStyle}>{item.unidad_medida}</td>
                    <td style={tableCellStyle}>{item.stock_actual}</td>
                    <td style={tableCellStyle}>{item.stock_minimo}</td>
                    <td style={tableCellStyle}>
                      {item.alerta_stock_bajo ? (
                        <span className="badge-festive">Reabastecer pronto</span>
                      ) : (
                        <span className="badge-turquoise">Óptimo</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* 3. Espacio reservado Fase 4 */}
        <section className="card-info">
          <h3>Asistente de Materiales y Tiempos de Confección</h3>
          <p style={{ marginBottom: '0.25rem' }}>
            Cálculo asistido de pliegos de cartulina, papel crepé y barras de silicón por pedido.
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
