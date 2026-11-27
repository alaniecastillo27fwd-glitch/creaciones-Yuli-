/**
 * BuntingGarland - Cinta superior de banderines festivos (Diseño Stitch Fiesta Artesanal)
 */
export default function BuntingGarland({
  mensaje = '¡Transformamos celebraciones en sonrisas inolvidables!'
}) {
  return (
    <div className="w-full overflow-hidden bg-surface-container-low py-1.5 border-b border-outline-variant/40 relative">
      <div className="max-w-7xl mx-auto px-4 flex justify-between sm:justify-around items-center opacity-90 select-none">
        {/* Banderines izquierdos */}
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-5 bg-secondary rounded-b-md shadow-sm transform -rotate-6 inline-block"></span>
          <span className="w-3.5 h-5 bg-primary rounded-b-md shadow-sm transform rotate-3 inline-block"></span>
          <span className="w-3.5 h-5 bg-tertiary-fixed-dim rounded-b-md shadow-sm transform -rotate-3 inline-block"></span>
          <span className="w-3.5 h-5 bg-secondary-fixed-dim rounded-b-md shadow-sm transform rotate-6 inline-block"></span>
          <span className="w-3.5 h-5 bg-primary-fixed-dim rounded-b-md shadow-sm transform -rotate-2 inline-block"></span>
        </div>

        {/* Lema central */}
        <div className="flex items-center gap-1.5 text-secondary text-xs uppercase tracking-widest font-bold">
          <span className="material-symbols-outlined text-sm">celebration</span>
          <span className="truncate">{mensaje}</span>
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
        </div>

        {/* Banderines derechos */}
        <div className="hidden md:flex items-center gap-2">
          <span className="w-3.5 h-5 bg-primary rounded-b-md shadow-sm transform rotate-6 inline-block"></span>
          <span className="w-3.5 h-5 bg-secondary-fixed-dim rounded-b-md shadow-sm transform -rotate-3 inline-block"></span>
          <span className="w-3.5 h-5 bg-tertiary-container rounded-b-md shadow-sm transform rotate-2 inline-block"></span>
          <span className="w-3.5 h-5 bg-primary-container rounded-b-md shadow-sm transform -rotate-6 inline-block"></span>
          <span className="w-3.5 h-5 bg-secondary rounded-b-md shadow-sm transform rotate-4 inline-block"></span>
        </div>
      </div>
    </div>
  );
}
