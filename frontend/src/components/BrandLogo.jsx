import logoOficial from '../assets/logo-creaciones-yuli.png';

/**
 * BrandLogo - Logotipo Oficial de Creaciones Yuli
 * Respeta las reglas del Libro de Marca y el showcase de Stitch:
 * - Relación de aspecto 1:1 bloqueada (object-fit: contain).
 * - Margen libre protector del 10%.
 * - Sin rotación, recorte ni filtros que alteren el arte original.
 */
export default function BrandLogo({ size = 'recommended', className = '' }) {
  const dimension =
    size === 'header'
      ? 'clamp(56px, 7vw, 68px)'
      : size === 'min'
        ? 'clamp(110px, 14vw, 140px)'
        : 'clamp(130px, 18vw, 180px)';

  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl bg-inverse-surface/95 shadow-sm ${className}`}
      style={{
        width: dimension,
        height: dimension,
        aspectRatio: '1 / 1',
        padding: '8%',
        flexShrink: 0
      }}
    >
      <img
        src={logoOficial}
        alt="Logotipo Oficial Creaciones Yuli - Hecho con amor"
        style={{
          width: '100%',
          height: '100%',
          aspectRatio: '1 / 1',
          objectFit: 'contain',
          transform: 'none',
          filter: 'none'
        }}
      />
    </div>
  );
}
