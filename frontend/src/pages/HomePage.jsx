import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BuntingGarland from '../components/BuntingGarland';
import Footer from '../components/Footer';
import BrandLogo from '../components/BrandLogo';

const ESPECIALIDADES = [
  {
    id_categoria: 1,
    badge: 'Más Popular',
    badgeClass: 'bg-secondary text-on-secondary',
    icono: 'toys',
    subtitulo: 'Piñatas de Tambor & 3D',
    titulo: 'Piñatas Temáticas',
    descripcion:
      'Figuras gigantes, siluetas temáticas, números florales rellenos de color y personajes favoritos de niños y adultos.',
    pie: 'A la Medida',
    imagen:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCM9eXdQgdvZorWlWrnfQYPjA0ZPp2nDJOIQsJbwHvYVa-WLutgB5lMamTDSL-RQImH47vJSVjEc8-HbkiBh1DdkN1g968Eg0HUp_qx1rR1Z2EULNrBYaqcZ845mL-qNNqtTWlHNcr2gTTDaygdAuV4kwqQZAOw5bNh4gHp5rS_lIUSxolz-ZyW0wGRtMTqhLlkqBFMi9hHeUANHQ9K-dGaQljenvo_PuXpPM20YLA9'
  },
  {
    id_categoria: 4,
    badge: 'Papelería Creativa',
    badgeClass: 'bg-primary text-on-primary',
    icono: 'flag',
    subtitulo: 'Cartulina, Foil & Tela',
    titulo: 'Banderines & Decoración',
    descripcion:
      'Banderines festivos con nombres, números, letras 3D, marcos selfie y combinaciones de patrones en alta calidad.',
    pie: 'Diseño Exclusivo',
    imagen:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLTJBHJj2tNBtIYyV_qnLq99ImsSELYFHvOgraD5AgS7oyx91GYzEap02X7fBEn-ptuFxpElps1i5NNi0kvCbHfPDb1YVT6BUWAJXUbAq_VuMHC4YRWliXrM0goE-7EB1fpf-FO0jRqBmlvfY0y8N1jJTYej44cfJwjpXfp65wwv9hVrvBfXss_LbXVT9yu_JXS_ZzO6NQRx4G9TUgUkVys3iGqciQksJHvbzt0G18'
  },
  {
    id_categoria: 3,
    badge: 'Mesa de Postres',
    badgeClass: 'bg-tertiary text-on-tertiary',
    icono: 'cake',
    subtitulo: 'Toppers & Cajitas',
    titulo: 'Centros de Mesa & Toppers',
    descripcion:
      'Cake toppers shaker con luz LED, cajitas dulceras, recuerdos decorativos y bases temáticas para tus mesas.',
    pie: 'Sets Completos',
    imagen:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjLbK0AuAZMlVZUFI6CCQwA-O4xj_yHNpanzn9YtJXa7QdofECQmwsSkmfwfQVaYlXzEo9yBa3BWmU4bFdnB-llXj7ha-bKROf28DDZQptLN8_FLWTONlOfA4s7FU_aSFWTRQBsFgsaIyb4AC7FMpneMtn8kc4W6-KOnf6nK2hYRErp3ZBTJFqSu5i2G8IkdtrnUq_Z3bKpzfwOololz1QJ3S6fCfXHw7LOfV7jT3P'
  },
  {
    id_categoria: 5,
    badge: 'Detalles con Amor',
    badgeClass: 'bg-secondary-container text-on-secondary-container',
    icono: 'redeem',
    subtitulo: 'Escolar & Regalos',
    titulo: 'Maquetas & Arreglos',
    descripcion:
      'Maquetas escolares y universitarias a escala, flores gigantes de papel, bandejas sorpresa y detalles para el hogar.',
    pie: 'Para Sorprender',
    imagen:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAwnQ08Q7CuRkejs2GF3CRfKzIhdAz35FGphALAsBiRPQ6bl3vZmKZwcuLRcs1NIgiYUTaDWEvOtOvSWgw9KgoPOz-z8aIk0LlJ2arHEB4S-PuSv61UN8exYurPK6NJb4gwhV7z538plXfee82atKhmeU0p78TPqh3hJ6m-b88Blc-ibj7zDpb15xDy4P6PEPwQ2XC5YGTutiGwDf4gLij0zj4t8eKTNUKnkyNGCqHq'
  }
];

const TEMATICAS_TENDENCIA = [
  { id: null, label: 'Todos los Diseños' },
  { id: 1, label: 'Princesas & Fantasía' },
  { id: 2, label: 'Cake Toppers Shaker' },
  { id: 3, label: 'Baby Shower & Centros' },
  { id: 4, label: 'Banderines & Kits Fiesta' },
  { id: 5, label: 'Maquetas a Escala' }
];

export default function HomePage() {
  const navigate = useNavigate();
  const [tematicaActiva, setTematicaActiva] = useState(null);

  const irACatalogo = (idCat) => {
    setTematicaActiva(idCat);
    if (idCat) {
      navigate(`/catalogo?categoria=${idCat}`);
    } else {
      navigate('/catalogo');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />
      <BuntingGarland />

      <main className="flex-1">
        {/* 1. HERO SECTION (Diseño Stitch Fiesta Artesanal) */}
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface py-10 lg:py-14">
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-primary-fixed/40 blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Columna Izquierda Hero */}
              <div className="lg:col-span-7 flex flex-col items-start gap-4 z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs shadow-sm">
                  <span className="material-symbols-outlined text-sm text-secondary">favorite</span>
                  <span className="font-bold tracking-wide uppercase">Taller Artesanal Festivo</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span className="text-secondary font-bold">100% Hecho con Amor</span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] text-on-surface leading-tight tracking-tight mb-0">
                  ¡Hacemos realidad la{' '}
                  <span className="text-primary italic font-semibold">fiesta</span> de tus{' '}
                  <span className="relative inline-block text-secondary">
                    sueños!
                    <span className="absolute -bottom-1 left-0 w-full h-2 bg-secondary-fixed-dim/60 rounded-full"></span>
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-on-surface-variant max-w-xl mb-1">
                  «¡Hola! En Creaciones Yuli convertimos tus ideas en piñatas, maquetas y decoraciones hechas con amor. Cuéntanos qué tienes en mente y te ayudamos a cotizar.»
                </p>

                {/* Dual CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-1">
                  <button
                    type="button"
                    onClick={() => navigate('/catalogo')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary text-on-secondary hover:bg-[#A3125B] transition-all duration-300 text-sm font-bold shadow-md hover:scale-105 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">auto_awesome</span>
                    <span>Solicitar cotización</span>
                  </button>

                  <a
                    href="https://wa.me/50657147889?text=Hola%20Creaciones%20Yuli,%20deseo%20cotizar%20una%20pi%C3%B1ata%20o%20decoraci%C3%B3n%20personalizada"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary hover:bg-primary-container transition-all duration-300 text-sm font-bold shadow-sm hover:scale-105"
                  >
                    <span className="material-symbols-outlined text-lg">chat</span>
                    <span>WhatsApp: 5714-7889</span>
                  </a>
                </div>

                {/* Barra de 3 Sellos de Confianza */}
                <div className="grid grid-cols-3 gap-3 pt-4 w-full bg-surface-container-lowest/90 p-3.5 rounded-xl border border-outline-variant/60 shadow-sm mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined text-base">handshake</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-on-surface">100% Artesanal</span>
                      <span className="text-xs text-on-surface-variant hidden sm:inline">
                        Cuidado en cada trazo
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary flex-shrink-0">
                      <span className="material-symbols-outlined text-base">palette</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-on-surface">Cualquier Personaje</span>
                      <span className="text-xs text-on-surface-variant hidden sm:inline">
                        Diseño a la medida
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary flex-shrink-0">
                      <span className="material-symbols-outlined text-base">local_shipping</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-on-surface">Entregas Seguras</span>
                      <span className="text-xs text-on-surface-variant hidden sm:inline">
                        Puntuales y cuidadas
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Mosaico Visual Stitch + Logo Oficial */}
              <div className="lg:col-span-5 relative">
                <div className="relative bg-surface-container-lowest p-3 rounded-xl shadow-xl border border-outline-variant/60 transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="relative h-80 sm:h-96 w-full rounded-lg overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover"
                      alt="Piñata Estrella Arcoíris Deluxe elaborada a mano en Creaciones Yuli"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoRgrwjk2WGi36Squsa0-uOLMbjI4E_f5ynZAim2VZ_m4LHXeRNDQxZKHDkgydh76CMiD-So7tfeOa1z5pB7cddo_r2qfStwLkk-L19A6jd6YB_GyrOQflaYgldUGRC66jJJtd1r1H1wEPIhkpedakafJPGPRQO2bhGu8mu6LN5yXZITMgsNrdzvd9-U_pvIVj5n4BxXDxnjy5Tedm2HespScoAkr8bxA8fy3CpLpS"
                    />
                    <div className="absolute top-3 left-3 bg-surface/95 backdrop-blur-md px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                      <span className="text-xs font-bold text-secondary">
                        Piñatas Estrella &amp; Figuras 3D
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-primary text-on-primary px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">thumb_up</span>
                      <span className="text-xs font-semibold">Facebook: Creaciones Yuli</span>
                    </div>
                  </div>

                  <div className="p-3 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-base text-on-surface font-bold mb-0.5">
                        Piñata Estrella Arcoíris Deluxe
                      </p>
                      <p className="text-xs text-on-surface-variant mb-0">
                        Confeccionada con capas de crepé italiano y flequillos artesanales.
                      </p>
                    </div>
                    <BrandLogo size="header" />
                  </div>
                </div>

                {/* Tarjeta Flotante de Banderines */}
                <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-surface-container-lowest p-2.5 rounded-xl shadow-lg border border-outline-variant items-center gap-3 z-20 max-w-xs transform -rotate-2 hover:rotate-0 transition-transform">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      alt="Banderines temáticos"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDseHyLXgQ1b0P4IzqwIsAOQ0d_APgOrdUor8AvjaEkwBe3Aqp0r_zSu9KsvTFgIjSd-Ndwnhx3XOOALXYWCthZNXLdfu3RfUiYP1qFVVwM3N3IZxoU8ztaNjuJBAo6NmFpCvSfCXsj7k3GSB_VYvtNrr5WPIIufajFM5FOu0DJl9DULuzn0uapSPKUd-nhIOyrV6HjqI9sLdmUihlBxsT-JdEA9pjrNVKd1Y6uVY9"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary block">
                      Banderines &amp; Toppers
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      Corte fino y personalizados
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ESPECIALIDADES / CATEGORÍAS SHOWCASE */}
        <section className="w-full py-12 bg-surface" id="especialidades">
          <div className="max-w-7xl mx-auto px-6 lg:px-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-secondary text-xs uppercase tracking-wider font-bold">
                  <span className="material-symbols-outlined text-sm">category</span>
                  <span>Nuestras Especialidades</span>
                </div>
                <h2 className="font-headline-lg text-3xl text-on-surface font-bold mt-1 mb-0">
                  Todo para que tu evento sea <span className="text-primary italic">inolvidable</span>
                </h2>
              </div>
              <p className="text-sm text-on-surface-variant max-w-md mb-0">
                Diseñamos cada pieza artesanalmente combinando colores alegres, papeles especiales y estructuras reforzadas para resistir la máxima diversión.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ESPECIALIDADES.map((esp) => (
                <article
                  key={esp.id_categoria}
                  className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={esp.titulo}
                      src={esp.imagen}
                    />
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs shadow-sm font-bold ${esp.badgeClass}`}
                    >
                      {esp.badge}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-primary text-xs mb-1 font-bold">
                        <span className="material-symbols-outlined text-base">{esp.icono}</span>
                        <span>{esp.subtitulo}</span>
                      </div>
                      <h3 className="text-lg text-on-surface font-bold mb-1.5">{esp.titulo}</h3>
                      <p className="text-sm text-on-surface-variant mb-0">{esp.descripcion}</p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-outline-variant/40 flex items-center justify-between">
                      <span className="text-xs font-bold text-secondary">{esp.pie}</span>
                      <button
                        type="button"
                        onClick={() => irACatalogo(esp.id_categoria)}
                        aria-label={`Ver catálogo de ${esp.titulo}`}
                        className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. BARRA INTERACTIVA DE TEMÁTICAS EN TENDENCIA */}
        <section className="w-full bg-surface-container-low py-4 border-y border-outline-variant/40">
          <div className="max-w-7xl mx-auto px-6 lg:px-14">
            <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-on-surface uppercase whitespace-nowrap flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-base">
                  local_fire_department
                </span>
                Temáticas en Tendencia:
              </span>
              <div className="flex items-center gap-2">
                {TEMATICAS_TENDENCIA.map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => irACatalogo(t.id)}
                    className={
                      tematicaActiva === t.id
                        ? 'px-4 py-1.5 rounded-full bg-secondary text-on-secondary text-xs shadow-sm font-bold whitespace-nowrap flex items-center gap-1 cursor-pointer'
                        : 'px-4 py-1.5 rounded-full bg-surface-container-highest/70 text-on-surface-variant hover:bg-primary hover:text-on-primary text-xs font-bold whitespace-nowrap transition-colors cursor-pointer'
                    }
                  >
                    {tematicaActiva === t.id && (
                      <span className="material-symbols-outlined text-xs">star</span>
                    )}
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. GALERÍA BENTO ASIMÉTRICA DE EVENTOS REALES */}
        <section className="w-full py-12 bg-surface">
          <div className="max-w-7xl mx-auto px-6 lg:px-14">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-primary-fixed text-primary text-xs font-bold uppercase mb-2">
                <span className="material-symbols-outlined text-sm">photo_camera</span>
                <span>Galería Real de Eventos</span>
              </div>
              <h2 className="font-headline-lg text-3xl text-on-surface font-bold mb-1">
                Celebraciones llenas de magia y color
              </h2>
              <p className="text-sm text-on-surface-variant mb-0">
                Cada fotografía representa una historia feliz. Creamos piezas únicas adaptadas al gusto de cada homenajeado.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Card 1 */}
              <div className="group relative rounded-xl overflow-hidden shadow-md bg-surface-container-lowest h-72">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Fiesta Tropical Flamenco & Tucán"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcS09updwH94vwEV7wn8sVXtvbbFN-Noh2eilJRUTfsSvgvzKUIxPqSov43ignpUJJqZYmKjOsNdErsGUZe9lIz7kLfCg8pdK1wJm2UJpRM4-TpD7KyR09DnavPTc487mQkE3stnP_c76j2I5dmipYZDObS8X0UaaTn9S1EnsuzGY0s5iNUnVnatRujNn7aMlf7V-zOrN2zxc80bKOx9yf3l6-tu8tVemQcFmfQ3Ae"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/25 to-transparent flex flex-col justify-end p-5">
                  <span className="text-secondary-fixed text-xs font-bold uppercase tracking-wider">
                    Cumpleaños Infantil
                  </span>
                  <p className="text-white text-lg font-bold mb-0.5">
                    Fiesta Tropical Flamenco &amp; Tucán
                  </p>
                  <p className="text-white/80 text-xs mb-0">
                    Piñata 3D y banderines personalizados
                  </p>
                </div>
              </div>

              {/* Card 2 (Asimétrica 2 filas) */}
              <div className="group relative rounded-xl overflow-hidden shadow-md bg-surface-container-lowest h-72 sm:h-auto sm:row-span-2">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Tierno Osito Dormilón en Tonos Pastel"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdMgEiVZ5-8RjnMTkczD_wE_JsLOvAEGAwPylAqjFwXY6QmZOTgWhol47pElLYTMWZL81r0ADimDgJqWPVHP1ckcnsWtI5GoolqLZh6G-xYKNb5YnmUZjsIW2O0s8cFnQ4BM62iYoPu2HjJ4G036-llEjKOTtPtUiwE5APcrT8oCPVAM3Ic39zIbzOgW83WxClMvrmIFUP1Kg015O_gRqRkc73VUNjAmahqQeD1VEc"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/25 to-transparent flex flex-col justify-end p-5">
                  <span className="text-primary-fixed text-xs font-bold uppercase tracking-wider">
                    Baby Shower &amp; Bienvenida
                  </span>
                  <p className="text-white text-lg font-bold mb-0.5">
                    Tierno Osito Dormilón en Tonos Pastel
                  </p>
                  <p className="text-white/80 text-xs mb-0">
                    Piñata con apertura de listones mágicos y kit dulcero
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative rounded-xl overflow-hidden shadow-md bg-surface-container-lowest h-72">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Superhéroes al Rescate"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrgf11geO2VWMPKWv5Mz4Ve0WZSuEqO90JH6PZsKEmossmJ5BGc1uV9SEvwnOnaDyCkrGpwCRdFNKMQymLH26zv4YfO-A7eTrbc7iVSi2X9KYRjVmICTrOvRzfzykFaddI1IUCDd2xnv4r_vdT19pG4BPmhluwnh3HflMTVXSO-UQL4IcABWlxfUbqCnQyWFnbMBQlIasgtJKdqh4wrVmzjB-TtW8jWWf39LA7_fjc"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/25 to-transparent flex flex-col justify-end p-5">
                  <span className="text-tertiary-fixed text-xs font-bold uppercase tracking-wider">
                    Aventura Infantil
                  </span>
                  <p className="text-white text-lg font-bold mb-0.5">Superhéroes al Rescate</p>
                  <p className="text-white/80 text-xs mb-0">
                    Estructura extra-reforzada para 20 niños
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="group relative rounded-xl overflow-hidden shadow-md bg-surface-container-lowest h-72">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Ángel Celestial Blanco & Dorado"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtVbDOLCVbhHdp9zZh73f3hEI0Dpr7f8OS9EXQOJk4S5-73SN4zXJZTI2gkrwN5EtjLQdiOsGk-pfESwCg0G2dA0oaxP1KT9WI4QsKYCD677ztCgQFHGDZHqBPSXF2iy3AFP386Br-fy2ptdKmGAyU2_EwAom5Oab-UuX2wU8sBN4Maa_QW1cWHMGF8nIP_eR2IKkEgKli0oXwHcfE_JHzNNyvjlGvHJbZUF1hE9XW"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/25 to-transparent flex flex-col justify-end p-5">
                  <span className="text-secondary-fixed text-xs font-bold uppercase tracking-wider">
                    Primera Comunión &amp; Bautizo
                  </span>
                  <p className="text-white text-lg font-bold mb-0.5">
                    Ángel Celestial Blanco &amp; Dorado
                  </p>
                  <p className="text-white/80 text-xs mb-0">
                    Cajitas con detalles en papel aperlado
                  </p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="group relative rounded-xl overflow-hidden shadow-md bg-surface-container-lowest h-72">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Número 15 Floral Rose Gold"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuADJTvM4GVTmVaS-cYohY3ri-DKI3mlVLBwx-rdkIpHABrS27bkG6crjLnZdNXmkdyosNHH5zWc0xVZtUt-SFpytRpnLJqM5sFgSyjO0ssNrI7tU1VJBpCrxPNW_tEfg6H65Mf6ro5PFiOjtwEZIWeODiWsfmsQfUw3P7AbrnDLY22vTSTpdynUXFjNcKUFEyf4Ax5SIbIs56avB4xcpC1q1f-QS0za2U9luSfAlRiJ"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/25 to-transparent flex flex-col justify-end p-5">
                  <span className="text-primary-fixed text-xs font-bold uppercase tracking-wider">
                    Quinceañeras &amp; Graduaciones
                  </span>
                  <p className="text-white text-lg font-bold mb-0.5">
                    Número 15 Floral Rose Gold
                  </p>
                  <p className="text-white/80 text-xs mb-0">
                    Diseño de autor para sesión de fotos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. EL SELLO DE CALIDAD YULI (3 Propuestas de Valor + Métricas) */}
        <section className="w-full py-12 bg-surface-container-low border-y border-outline-variant/40">
          <div className="max-w-7xl mx-auto px-6 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="inline-flex items-center gap-1.5 text-secondary text-xs uppercase tracking-wider font-bold">
                  <span className="material-symbols-outlined text-sm">volunteer_activism</span>
                  <span>El Sello de Calidad Yuli</span>
                </div>
                <h2 className="font-headline-lg text-3xl text-on-surface font-bold mb-0">
                  ¿Por qué las familias confían en <span className="text-primary">Creaciones Yuli</span>?
                </h2>
                <p className="text-sm text-on-surface-variant mb-2">
                  Sabemos que una fiesta no es solo una reunión: es un recuerdo que tus hijos y seres queridos guardarán por siempre en su corazón.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/60 shadow-sm">
                    <span className="font-headline-lg text-3xl font-bold text-primary block">
                      +850
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      Piñatas, maquetas y decoraciones entregadas
                    </span>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/60 shadow-sm">
                    <span className="font-headline-lg text-3xl font-bold text-secondary block">
                      100%
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      Clientes felices con amor
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/60 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">favorite</span>
                  </div>
                  <div>
                    <h3 className="text-base text-on-surface font-bold mb-1">
                      Hecho con amor y dedicación
                    </h3>
                    <p className="text-sm text-on-surface-variant mb-0">
                      No usamos moldes genéricos ni producciones en masa. Cada flequillo, textura, capa y elemento decorativo es colocado artesanalmente con paciencia y máxima prolijidad.
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/60 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">draw</span>
                  </div>
                  <div>
                    <h3 className="text-base text-on-surface font-bold mb-1">
                      Cualquier temática, personaje o maqueta a escala
                    </h3>
                    <p className="text-sm text-on-surface-variant mb-0">
                      Desde personajes animados y números florales hasta maquetas escolares o universitarias detalladas. Si puedes imaginarlo, lo creamos en el taller.
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/60 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">quickreply</span>
                  </div>
                  <div>
                    <h3 className="text-base text-on-surface font-bold mb-1">
                      Atención rápida y personalizada
                    </h3>
                    <p className="text-sm text-on-surface-variant mb-0">
                      Cotización ágil en nuestra plataforma web o por WhatsApp al 5714-7889. Te asesoramos con medidas, colores y tiempos de entrega sin compromiso.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PASOS PARA ORDENAR TU FIESTA SOÑADA (4 Pasos) */}
        <section className="w-full py-12 bg-surface">
          <div className="max-w-7xl mx-auto px-6 lg:px-14">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-secondary-fixed text-secondary text-xs font-bold uppercase mb-2">
                <span className="material-symbols-outlined text-sm">checklist</span>
                <span>Fácil y Seguro</span>
              </div>
              <h2 className="font-headline-lg text-3xl text-on-surface font-bold mb-1">
                Pasos para ordenar tu fiesta soñada
              </h2>
              <p className="text-sm text-on-surface-variant mb-0">
                Hacemos que el proceso sea sencillo, divertido y sin estrés para que solo te preocupes por celebrar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-full bg-primary text-on-primary font-bold text-lg flex items-center justify-center mb-4 shadow-sm">
                    1
                  </div>
                  <h3 className="text-base text-on-surface font-bold mb-1.5">Elige tu temática</h3>
                  <p className="text-sm text-on-surface-variant">
                    Explora el catálogo o cuéntanos la temática, colores preferidos y medidas de la creación que deseas.
                  </p>
                </div>
                <div className="pt-3 flex items-center gap-1.5 text-primary text-xs font-bold">
                  <span className="material-symbols-outlined text-base">image</span>
                  <span>Aceptamos tus ideas</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-full bg-secondary text-on-secondary font-bold text-lg flex items-center justify-center mb-4 shadow-sm">
                    2
                  </div>
                  <h3 className="text-base text-on-surface font-bold mb-1.5">
                    Cotiza en Web o WhatsApp
                  </h3>
                  <p className="text-sm text-on-surface-variant">
                    Solicita tu pedido en la plataforma o al 5714-7889. Coordinamos presupuesto y fecha de entrega.
                  </p>
                </div>
                <div className="pt-3 flex items-center gap-1.5 text-secondary text-xs font-bold">
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>Respuesta inmediata</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-full bg-tertiary text-on-tertiary font-bold text-lg flex items-center justify-center mb-4 shadow-sm">
                    3
                  </div>
                  <h3 className="text-base text-on-surface font-bold mb-1.5">Creamos con amor</h3>
                  <p className="text-sm text-on-surface-variant">
                    Manos a la obra en nuestro taller. Estructuramos, empapelamos y cuidamos cada detalle artesanal.
                  </p>
                </div>
                <div className="pt-3 flex items-center gap-1.5 text-tertiary text-xs font-bold">
                  <span className="material-symbols-outlined text-base">favorite</span>
                  <span>Artesanía pura</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-full bg-primary-container text-on-primary-container font-bold text-lg flex items-center justify-center mb-4 shadow-sm">
                    4
                  </div>
                  <h3 className="text-base text-on-surface font-bold mb-1.5">
                    ¡Listo para festejar!
                  </h3>
                  <p className="text-sm text-on-surface-variant">
                    Recíbelo o retíralo en la fecha acordada, listo para disfrutar una celebración inolvidable.
                  </p>
                </div>
                <div className="pt-3 flex items-center gap-1.5 text-primary text-xs font-bold">
                  <span className="material-symbols-outlined text-base">celebration</span>
                  <span>¡A disfrutar la fiesta!</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. BANNER DE CONVERSIÓN DIRECTA Y TESTIMONIOS */}
        <section className="w-full py-12 bg-gradient-to-r from-primary-container via-primary to-secondary text-on-primary relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-14 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 flex flex-col gap-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase w-fit">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  <span>Atención Directa &amp; Cotizaciones</span>
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-0">
                  ¿Planeando tu próxima celebración o proyecto?
                </h2>
                <p className="text-base text-white/90 max-w-2xl mb-0">
                  ¡Conversemos hoy mismo! Solicita tu pedido personalizado desde tu cuenta o escríbenos directamente por WhatsApp al 5714-7889.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/catalogo')}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-on-surface hover:bg-surface-container-low transition-all font-bold text-sm shadow-xl cursor-pointer"
                >
                  <span className="material-symbols-outlined text-secondary">celebration</span>
                  <span>Ver Catálogo Completo</span>
                </button>
                <a
                  href="https://wa.me/50657147889?text=Hola%20Creaciones%20Yuli,%20deseo%20cotizar%20para%20mi%20evento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white transition-all font-bold text-sm"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>Chatear en WhatsApp (5714-7889)</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
