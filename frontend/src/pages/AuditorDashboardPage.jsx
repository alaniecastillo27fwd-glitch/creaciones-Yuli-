import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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

const REGISTROS_CONSENTIMIENTO_MUESTRA = [
  {
    id_consentimiento: 1,
    id_usuario: 1,
    version_politica: 'v1.0-2026',
    finalidad: 'gestion_pedidos',
    aceptado: 'Sí (Activo)',
    ip_hash: 'e3b0c442...7852b855'
  },
  {
    id_consentimiento: 3,
    id_usuario: 3,
    version_politica: 'v1.0-2026',
    finalidad: 'gestion_pedidos',
    aceptado: 'Sí (Activo)',
    ip_hash: '2c26b46b...6266e7ae'
  }
];

export default function AuditorDashboardPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main className="container" style={{ flex: 1, padding: 'var(--space-lg) var(--space-md)' }}>
        <header style={{ marginBottom: 'var(--space-md)' }}>
          <span className="badge-turquoise" style={{ marginBottom: 'var(--space-xs)' }}>
            Modo Estrictamente de Solo Lectura
          </span>
          <h1>Panel de Auditoría y Gobernanza (Ley N.º 8968 CR)</h1>
          <p>
            Consulta de trazabilidad de consentimientos informados, solicitudes de eliminación ARCO y bitácora anonimizada de agentes de IA.
          </p>
        </header>

        {/* 1. Tabla de Consentimientos Legales (Solo lectura, sin botones de acción) */}
        <section className="card" style={{ marginBottom: 'var(--space-lg)', overflowX: 'auto' }}>
          <h2 style={{ marginBottom: 'var(--space-sm)' }}>
            Registro de Consentimientos Legales (`consentimientos_legales`)
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>ID Registro</th>
                <th style={tableHeaderStyle}>ID Usuario</th>
                <th style={tableHeaderStyle}>Versión Política</th>
                <th style={tableHeaderStyle}>Finalidad Autorizada</th>
                <th style={tableHeaderStyle}>Estado</th>
                <th style={tableHeaderStyle}>Huella SHA-256 (IP)</th>
              </tr>
            </thead>
            <tbody>
              {REGISTROS_CONSENTIMIENTO_MUESTRA.map((reg) => (
                <tr key={reg.id_consentimiento}>
                  <td style={tableCellStyle}>#{reg.id_consentimiento}</td>
                  <td style={tableCellStyle}>Usuario #{reg.id_usuario}</td>
                  <td style={tableCellStyle}>{reg.version_politica}</td>
                  <td style={tableCellStyle}>{reg.finalidad}</td>
                  <td style={tableCellStyle}>{reg.aceptado}</td>
                  <td style={tableCellStyle}>
                    <code>{reg.ip_hash}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 2. Bitácora Anonimizada de Agentes de IA (Solo lectura) */}
        <section className="card-info">
          <h2>Bitácora de Ejecución de Agentes de IA (`bitacora_agentes_ia`)</h2>
          <p>
            Auditoría técnica de tokens consumidos, latencia en milisegundos y hashes SHA-256 de contexto sin almacenamiento de datos personales sensibles (PII).
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
