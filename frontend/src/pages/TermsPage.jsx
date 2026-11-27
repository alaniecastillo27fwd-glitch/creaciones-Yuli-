import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main className="container" style={{ flex: 1, padding: 'var(--space-lg) var(--space-md)' }}>
        <article className="card" style={{ maxWidth: '860px', margin: '0 auto', padding: 'var(--space-lg)' }}>
          <span className="badge-festive" style={{ marginBottom: 'var(--space-xs)' }}>
            Condiciones del Servicio Artesanal
          </span>
          <h1>Términos y Condiciones — Creaciones Yuli</h1>
          <p>
            Te damos la bienvenida a <strong>Creaciones Yuli</strong>. Al utilizar nuestra plataforma para cotizar y encargar piñatas, toppers, centros de mesa, decoraciones y maquetas, aceptas las siguientes condiciones de trabajo artesanal:
          </p>

          <hr className="divider" />

          <h2>1. Elaboración artesanal, anticipos y tiempos de entrega</h2>
          <p>
            Cada pieza se confecciona a mano y bajo pedido personalizado. Para confirmar cualquier orden e iniciar su producción en el taller, se requiere un <strong>adelanto mínimo del 50%</strong> (vía SINPE Móvil, transferencia o efectivo). El saldo restante se cancela contra entrega en la fecha comprometida.
          </p>

          <h2>2. Límites de responsabilidad sobre respuestas de Agentes de IA</h2>
          <p>
            Los asistentes de Inteligencia Artificial integrados en la plataforma brindan <strong>estimaciones preliminares de precios, tiempos de elaboración e ideas decorativas</strong> con carácter orientativo. Ninguna sugerencia generada automáticamente por la IA constituye una oferta contractual definitiva hasta que sea revisada, validada y aprobada por las artesanas de Creaciones Yuli.
          </p>

          <h2>3. Cambios y cancelaciones</h2>
          <p>
            Cualquier ajuste en colores, leyenda o temática debe solicitarse antes de que el pedido pase al estado <em>«En Producción»</em>. Una vez cortados y ensamblados los materiales personalizados, el adelanto cubre los insumos adquiridos para tu creación.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
