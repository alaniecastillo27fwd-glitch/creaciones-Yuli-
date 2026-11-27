import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-container-low text-on-surface border-t-2 border-secondary-fixed-dim/50 mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Columna 1: Identidad Boutique y Eslogan */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <BrandLogo size="header" />
              <div>
                <span className="font-headline-md text-xl font-bold text-primary block">
                  Creaciones Yuli
                </span>
                <span className="text-xs font-bold text-secondary">
                  «Hecho con amor...»
                </span>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Estudio artesanal especializado en piñatas artísticas, toppers, centros de mesa, maquetas y decoración festiva personalizada diseñada con amor y dedicación.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-secondary text-xs font-bold bg-secondary-fixed px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-sm">favorite</span>
                100% Hecho a Mano
              </span>
            </div>
          </div>

          {/* Columna 2: Horario de Atención */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-headline-sm text-base font-bold text-primary">
              Horario de Atención
            </h3>
            <ul className="text-sm text-on-surface-variant space-y-1.5 list-none">
              <li>
                <span className="font-semibold text-on-surface">Lunes a Viernes:</span> 8:30 AM – 6:30 PM
              </li>
              <li>
                <span className="font-semibold text-on-surface">Sábados:</span> 9:00 AM – 3:00 PM
              </li>
              <li>
                <span className="font-semibold text-on-surface">Domingos:</span> Entregas programadas para eventos
              </li>
            </ul>
            <p className="text-xs text-tertiary mt-1 flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-sm">schedule</span>
              Pedidos personalizados con 5 a 10 días de anticipación
            </p>
          </div>

          {/* Columna 3: Cobertura, Envíos y Gobernanza Legal */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-headline-sm text-base font-bold text-primary">
              Cobertura &amp; Gobernanza
            </h3>
            <ul className="text-sm text-on-surface-variant space-y-1.5 list-none">
              <li className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">local_shipping</span>
                <span>Entregas seguras y punto de retiro en taller artesanal</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">shield_lock</span>
                <Link to="/privacidad" className="text-primary hover:underline font-semibold">
                  Política de Privacidad (Ley N.º 8968)
                </Link>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">gavel</span>
                <Link to="/terminos" className="text-primary hover:underline font-semibold">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto Festivo Oficial */}
          <div className="flex flex-col gap-2.5">
            <h3 className="font-headline-sm text-base font-bold text-primary">
              Contacto Festivo
            </h3>
            <ul className="text-sm text-on-surface-variant space-y-2 list-none">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-lg">chat</span>
                <a
                  className="hover:text-primary transition-colors font-bold text-on-surface"
                  href="https://wa.me/50657147889"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: 5714-7889
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">thumb_up</span>
                <a
                  className="hover:text-primary transition-colors font-semibold text-on-surface"
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook: Creaciones Yuli
                </a>
              </li>
            </ul>
            <div className="mt-2">
              <a
                className="inline-flex items-center justify-center w-full gap-1.5 px-4 py-2.5 rounded-full bg-secondary text-on-secondary hover:bg-[#A3125B] transition-all text-sm font-bold shadow-md"
                href="https://wa.me/50657147889?text=Hola%20Creaciones%20Yuli,%20deseo%20cotizar%20mi%20evento"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-base">celebration</span>
                <span>Cotizar Piñata Soñada</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-outline-variant/60 flex flex-col md:flex-row items-center justify-between gap-4 text-on-surface-variant text-xs">
          <p className="mb-0">
            © {anioActual} Creaciones Yuli. Arte Festivo &amp; Piñatas Boutique. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-primary font-bold">
              <span className="material-symbols-outlined text-sm text-secondary">volunteer_activism</span>
              Diseñado con cariño artesanal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
