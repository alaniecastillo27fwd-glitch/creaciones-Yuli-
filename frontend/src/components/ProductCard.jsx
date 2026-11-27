// Fotografías artesanales curadas del paquete Stitch Fiesta Artesanal por categoría
const STITCH_CATEGORY_IMAGES = {
  1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM9eXdQgdvZorWlWrnfQYPjA0ZPp2nDJOIQsJbwHvYVa-WLutgB5lMamTDSL-RQImH47vJSVjEc8-HbkiBh1DdkN1g968Eg0HUp_qx1rR1Z2EULNrBYaqcZ845mL-qNNqtTWlHNcr2gTTDaygdAuV4kwqQZAOw5bNh4gHp5rS_lIUSxolz-ZyW0wGRtMTqhLlkqBFMi9hHeUANHQ9K-dGaQljenvo_PuXpPM20YLA9',
  2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjLbK0AuAZMlVZUFI6CCQwA-O4xj_yHNpanzn9YtJXa7QdofECQmwsSkmfwfQVaYlXzEo9yBa3BWmU4bFdnB-llXj7ha-bKROf28DDZQptLN8_FLWTONlOfA4s7FU_aSFWTRQBsFgsaIyb4AC7FMpneMtn8kc4W6-KOnf6nK2hYRErp3ZBTJFqSu5i2G8IkdtrnUq_Z3bKpzfwOololz1QJ3S6fCfXHw7LOfV7jT3P',
  3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdMgEiVZ5-8RjnMTkczD_wE_JsLOvAEGAwPylAqjFwXY6QmZOTgWhol47pElLYTMWZL81r0ADimDgJqWPVHP1ckcnsWtI5GoolqLZh6G-xYKNb5YnmUZjsIW2O0s8cFnQ4BM62iYoPu2HjJ4G036-llEjKOTtPtUiwE5APcrT8oCPVAM3Ic39zIbzOgW83WxClMvrmIFUP1Kg015O_gRqRkc73VUNjAmahqQeD1VEc',
  4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLTJBHJj2tNBtIYyV_qnLq99ImsSELYFHvOgraD5AgS7oyx91GYzEap02X7fBEn-ptuFxpElps1i5NNi0kvCbHfPDb1YVT6BUWAJXUbAq_VuMHC4YRWliXrM0goE-7EB1fpf-FO0jRqBmlvfY0y8N1jJTYej44cfJwjpXfp65wwv9hVrvBfXss_LbXVT9yu_JXS_ZzO6NQRx4G9TUgUkVys3iGqciQksJHvbzt0G18',
  5: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrgf11geO2VWMPKWv5Mz4Ve0WZSuEqO90JH6PZsKEmossmJ5BGc1uV9SEvwnOnaDyCkrGpwCRdFNKMQymLH26zv4YfO-A7eTrbc7iVSi2X9KYRjVmICTrOvRzfzykFaddI1IUCDd2xnv4r_vdT19pG4BPmhluwnh3HflMTVXSO-UQL4IcABWlxfUbqCnQyWFnbMBQlIasgtJKdqh4wrVmzjB-TtW8jWWf39LA7_fjc',
  6: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwnQ08Q7CuRkejs2GF3CRfKzIhdAz35FGphALAsBiRPQ6bl3vZmKZwcuLRcs1NIgiYUTaDWEvOtOvSWgw9KgoPOz-z8aIk0LlJ2arHEB4S-PuSv61UN8exYurPK6NJb4gwhV7z538plXfee82atKhmeU0p78TPqh3hJ6m-b88Blc-ibj7zDpb15xDy4P6PEPwQ2XC5YGTutiGwDf4gLij0zj4t8eKTNUKnkyNGCqHq'
};

export default function ProductCard({ producto, onCotizar }) {
  const {
    id_categoria,
    nombre,
    descripcion,
    precio_base_crc,
    tiempo_elaboracion_dias = 3,
    imagen_url,
    personalizable = true,
    categoria
  } = producto;

  const precioFormateado = Number(precio_base_crc || 0).toLocaleString('es-CR', {
    minimumFractionDigits: 0
  });

  const imagenMostrar =
    imagen_url && imagen_url.startsWith('http')
      ? imagen_url
      : STITCH_CATEGORY_IMAGES[id_categoria] || STITCH_CATEGORY_IMAGES[1];

  return (
    <article className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Imagen Superior Estilo Stitch */}
        <div className="relative h-56 w-full overflow-hidden bg-surface-container">
          <img
            src={imagenMostrar}
            alt={nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {categoria?.nombre && (
            <span className="absolute top-3 left-3 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              {categoria.nombre}
            </span>
          )}
          {personalizable && (
            <span className="absolute bottom-3 right-3 bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              ✨ 100% Personalizable
            </span>
          )}
        </div>

        {/* Contenido de la Tarjeta */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-primary text-xs font-bold mb-1">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span>Elaboración artesanal: ~{tiempo_elaboracion_dias} días</span>
          </div>
          <h3 className="font-headline-sm text-lg text-on-surface font-bold mb-2">
            {nombre}
          </h3>
          <p className="text-sm text-on-surface-variant mb-0 leading-relaxed">
            {descripcion}
          </p>
        </div>
      </div>

      {/* Pie de Tarjeta con Precio y Acciones */}
      <div className="px-5 pb-5 pt-2 border-t border-outline-variant/40 flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-on-surface-variant font-semibold">
            Precio base desde:
          </span>
          <span className="text-xl font-bold text-primary-container">
            ₡{precioFormateado}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onCotizar && onCotizar(producto)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-secondary text-on-secondary hover:bg-[#A3125B] font-bold text-sm shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            <span>Pedir a Medida</span>
          </button>

          <a
            href={`https://wa.me/50657147889?text=${encodeURIComponent(
              `Hola Creaciones Yuli, me interesa cotizar: ${nombre}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Cotizar ${nombre} por WhatsApp`}
            className="w-10 h-10 rounded-full bg-primary-fixed text-primary hover:bg-primary hover:text-on-primary flex items-center justify-center transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">chat</span>
          </a>
        </div>
      </div>
    </article>
  );
}
