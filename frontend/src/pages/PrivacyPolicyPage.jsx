import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main className="container" style={{ flex: 1, padding: 'var(--space-lg) var(--space-md)' }}>
        <article className="card" style={{ maxWidth: '860px', margin: '0 auto', padding: 'var(--space-lg)' }}>
          <span className="badge-turquoise" style={{ marginBottom: 'var(--space-xs)' }}>
            Versión v1.0-2026 • Ley N.º 8968 de Costa Rica
          </span>
          <h1>Política de Privacidad y Protección de Datos</h1>
          <p>
            En <strong>Creaciones Yuli</strong> valoramos tu confianza y protegemos tu información personal en estricto cumplimiento de la <strong>Ley N.º 8968</strong> (Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales de la República de Costa Rica).
          </p>

          <hr className="divider" />

          <h2>1. Datos que recolectamos y finalidad</h2>
          <p>
            Recolectamos únicamente los datos indispensables que nos proporcionas con tu consentimiento expreso al registrarte o solicitar una cotización: nombre completo, correo electrónico, teléfono de contacto y las especificaciones creativas de tus pedidos (temática, fecha del evento y preferencias de diseño).
          </p>

          <h2>2. Uso de Proveedores de IA y APIs Externas</h2>
          <p>
            Nuestra plataforma integra servicios externos (como consulta oficial del tipo de cambio del BCCR) y asistentes de Inteligencia Artificial para agilizar presupuestos y sugerencias de diseño. <strong>Nunca enviamos datos personales sensibles (PII)</strong> como tu nombre real, teléfono, correo o dirección exacta a modelos externos de IA; toda consulta procesada por los agentes se anonimiza previamente y se registra mediante un hash criptográfico en nuestra bitácora de auditoría.
          </p>

          <h2>3. Conservación de datos y Derechos ARCO</h2>
          <p>
            Conservamos tus datos mientras mantengas tu cuenta activa o exista una obligación contable/tributaria vigente. Como titular, puedes ejercer en cualquier momento tus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong> o solicitar la eliminación de tu cuenta directamente desde tu perfil o escribiendo a nuestro canal oficial WhatsApp <strong>5714-7889</strong>.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
