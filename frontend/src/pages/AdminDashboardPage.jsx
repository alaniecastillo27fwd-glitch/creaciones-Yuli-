import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

export default function AdminDashboardPage() {
  const [pedidos, setPedidos] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [aviso, setAviso] = useState(null);

  useEffect(() => {
    Promise.allSettled([
      api.get('/pedidos'),
      api.get('/inventario'),
      api.get('/productos')
    ]).then(([resPedidos, resInventario, resProductos]) => {
      if (resPedidos.status === 'fulfilled') {
        setPedidos(resPedidos.value.data?.data || []);
      }
      if (resInventario.status === 'fulfilled') {
        setInsumos(resInventario.value.data?.data || []);
      }
      if (resProductos.status === 'fulfilled') {
        setProductos(resProductos.value.data?.data || []);
      }
    });
  }, []);

  const insumosCriticos = insumos.filter((i) => i.alerta_stock_bajo);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main className="container" style={{ flex: 1, padding: 'var(--space-lg) var(--space-md)' }}>
        <header style={{ marginBottom: 'var(--space-md)' }}>
          <h1>Panel Administrativo — Creaciones Yuli</h1>
          <p>
            Resumen general de operación, catálogo, pedidos personalizados e inventario del taller.
          </p>
        </header>

        {aviso && (
          <FeedbackBanner
            tipo={aviso.tipo}
            titulo={aviso.titulo}
            mensaje={aviso.mensaje}
            onClose={() => setAviso(null)}
          />
        )}

        {/* 1. Tarjetas de Resumen General y Accesos Rápidos */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-lg)'
          }}
        >
          <article className="card">
            <span className="text-metadata">Catálogo Activo</span>
            <h2>{productos.length} Productos</h2>
            <p className="text-legal">Piñatas, toppers, centros de mesa y maquetas disponibles.</p>
            <Link to="/catalogo">
              <Button variant="secondary" fullWidth>
                Ir al Catálogo
              </Button>
            </Link>
          </article>

          <article className="card">
            <span className="text-metadata">Órdenes del Taller</span>
            <h2>{pedidos.length} Pedidos</h2>
            <p className="text-legal">Solicitudes personalizadas y entregas comprometidas.</p>
            <Link to="/colaborador">
              <Button variant="secondary" fullWidth>
                Gestionar Pedidos
              </Button>
            </Link>
          </article>

          <article className="card">
            <span className="text-metadata">Materia Prima</span>
            <h2>{insumos.length} Insumos ({insumosCriticos.length} en alerta)</h2>
            <p className="text-legal">Control de cartulina, papel crepé, silicón y pinturas.</p>
            <Link to="/colaborador">
              <Button variant="secondary" fullWidth>
                Ver Inventario
              </Button>
            </Link>
          </article>
        </section>

        {/* 2. Secciones Reservadas para Fase 4: Centro de Agentes de IA y Tipo de Cambio BCCR */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-lg)'
          }}
        >
          <article className="card-info">
            <span className="badge-turquoise">Integración Fase 4</span>
            <h2 style={{ marginTop: 'var(--space-xs)' }}>Centro de Agentes de IA</h2>
            <p>
              Espacio reservado para los 8 agentes asistentes del taller (cotizador artesanal, cálculo de insumos, recomendaciones de diseño y finanzas).
            </p>
            <p className="subtitle-emphasis" style={{ marginBottom: 0 }}>
              Próximamente: Módulo de IA
            </p>
          </article>

          <article className="card">
            <span className="badge-festive">Integración BCCR / APIs Externas</span>
            <h2 style={{ marginTop: 'var(--space-xs)' }}>Tipo de Cambio BCCR</h2>
            <p>
              Sincronización diaria de compra y venta (CRC / USD) para cotizaciones y registro de facturas de gastos.
            </p>
            <p className="subtitle-emphasis" style={{ marginBottom: 0 }}>
              Próximamente: Módulo de IA
            </p>
          </article>
        </section>

        {/* 3. Tabla Limpia de Últimos Pedidos Personalizados */}
        <section className="card" style={{ overflowX: 'auto' }}>
          <h2 style={{ marginBottom: 'var(--space-sm)' }}>Últimos Pedidos y Cotizaciones</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Cliente</th>
                <th style={tableHeaderStyle}>Entrega Comprometida</th>
                <th style={tableHeaderStyle}>Estado</th>
                <th style={tableHeaderStyle}>Método de Pago</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ ...tableCellStyle, textAlign: 'center' }}>
                    No hay pedidos registrados o conecta el servidor backend para visualizarlos.
                  </td>
                </tr>
              ) : (
                pedidos.map((p) => (
                  <tr key={p.id_pedido}>
                    <td style={tableCellStyle}>#{p.id_pedido}</td>
                    <td style={tableCellStyle}>{p.cliente?.nombre_completo || `Usuario #${p.id_usuario}`}</td>
                    <td style={tableCellStyle}>{p.fecha_entrega_comprometida}</td>
                    <td style={tableCellStyle}>
                      <span className="badge-turquoise">{p.estado_legible || p.estado_pedido}</span>
                    </td>
                    <td style={tableCellStyle}>{p.metodo_pago}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>

      <Footer />
    </div>
  );
}
