/**
 * FeedbackBanner - Avisos con tono cercano, cálido y artesanal
 * Evita tecnicismos fríos como "Error fatal del sistema".
 */
export default function FeedbackBanner({
  tipo = 'info',
  titulo,
  mensaje,
  onClose
}) {
  if (!mensaje) return null;

  const esAvisoFucsia = tipo === 'aviso' || tipo === 'error' || tipo === 'promo';

  const TituloPorDefecto =
    tipo === 'exito'
      ? '¡Qué alegría! Todo quedó listo'
      : tipo === 'error'
        ? '¡Ups! Revisemos este detallito juntos'
        : 'Nota del taller de Yuli';

  return (
    <div
      role="status"
      className={esAvisoFucsia ? 'card-promo' : 'card-info'}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 'var(--space-sm)',
        marginBottom: 'var(--space-md)',
        borderRadius: 'var(--radius-md)'
      }}
    >
      <div>
        <strong
          style={{
            display: 'block',
            color: esAvisoFucsia
              ? 'var(--color-fucsia-frambuesa)'
              : 'var(--color-turquesa-profundo)',
            marginBottom: '0.25rem'
          }}
        >
          {titulo || TituloPorDefecto}
        </strong>
        <p style={{ marginBottom: 0, color: 'var(--color-carbon-calido)' }}>
          {mensaje}
        </p>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar aviso"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-carbon-calido)',
            fontWeight: 'var(--weight-bold)',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
