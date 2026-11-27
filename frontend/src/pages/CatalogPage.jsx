import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BuntingGarland from '../components/BuntingGarland';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import FeedbackBanner from '../components/FeedbackBanner';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const CATEGORIAS_BASE = [
  { id_categoria: 1, nombre: 'Piñatas' },
  { id_categoria: 2, nombre: 'Toppers' },
  { id_categoria: 3, nombre: 'Centros de mesa' },
  { id_categoria: 4, nombre: 'Decoraciones para fiestas' },
  { id_categoria: 5, nombre: 'Maquetas escolares/universitarias' },
  { id_categoria: 6, nombre: 'Decoración para el hogar' }
];

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { estaAutenticado } = useAuth();

  const categoriaInicial = searchParams.get('categoria')
    ? Number(searchParams.get('categoria'))
    : null;

  const [categorias, setCategorias] = useState(CATEGORIAS_BASE);
  const [categoriaActiva, setCategoriaActiva] = useState(categoriaInicial);
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [aviso, setAviso] = useState(null);

  useEffect(() => {
    api
      .get('/categorias')
      .then((res) => {
        if (Array.isArray(res.data?.data) && res.data.data.length > 0) {
          setCategorias(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setCargando(true);
    setAviso(null);

    const params = categoriaActiva ? { id_categoria: categoriaActiva } : {};

    api
      .get('/productos', { params })
      .then((res) => {
        setProductos(res.data?.data || []);
      })
      .catch(() => {
        setAviso({
          tipo: 'aviso',
          titulo: 'Estamos acomodando la vitrina del taller',
          mensaje:
            'En este momento no pudimos cargar los productos desde el servidor. Verifica que el backend esté encendido en el puerto 4000 o escríbenos al WhatsApp 5714-7889.'
        });
      })
      .finally(() => {
        setCargando(false);
      });
  }, [categoriaActiva]);

  const seleccionarCategoria = (idCat) => {
    setCategoriaActiva(idCat);
    if (idCat) {
      setSearchParams({ categoria: String(idCat) });
    } else {
      setSearchParams({});
    }
  };

  const handleCotizarProducto = (producto) => {
    if (!estaAutenticado) {
      setAviso({
        tipo: 'info',
        titulo: `¡Excelente elección: ${producto.nombre}!`,
        mensaje:
          'Para guardar tu solicitud personalizada y darle seguimiento en el taller, inicia sesión o crea tu cuenta en un minuto.'
      });
      setTimeout(() => navigate('/login'), 1600);
      return;
    }

    navigate(
      `/cliente?producto=${producto.id_producto}&nombre=${encodeURIComponent(producto.nombre)}`
    );
  };

  const productosFiltrados = productos.filter((p) => {
    if (!busqueda.trim()) return true;
    const termino = busqueda.toLowerCase();
    return (
      p.nombre?.toLowerCase().includes(termino) ||
      p.descripcion?.toLowerCase().includes(termino)
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />
      <BuntingGarland mensaje="✨ Catálogo Artesanal • Cada pieza se personaliza con tus colores y personaje favorito" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-14 py-10">
        {/* Cabecera Stitch */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-secondary text-xs font-bold uppercase mb-2">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>Vitrina Artesanal</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-on-surface mb-1">
              Catálogo de Creaciones Yuli
            </h1>
            <p className="text-sm text-on-surface-variant mb-0">
              Piñatas 3D, toppers shaker, centros de mesa, decoraciones y maquetas hechas con amor.
            </p>
          </div>

          {/* Buscador rápido */}
          <div className="w-full md:w-72">
            <div className="relative">
              <span className="material-symbols-outlined text-on-surface-variant text-lg absolute left-3.5 top-1/2 -translate-y-1/2">
                search
              </span>
              <input
                type="search"
                placeholder="Buscar piñata, topper, maqueta..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface-container-lowest border border-outline-variant text-sm text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </header>

        {aviso && (
          <FeedbackBanner
            tipo={aviso.tipo}
            titulo={aviso.titulo}
            mensaje={aviso.mensaje}
            onClose={() => setAviso(null)}
          />
        )}

        {/* Chips de Filtro por Categoría (Stitch Pills) */}
        <section
          aria-label="Filtrar catálogo por categoría"
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          <button
            type="button"
            onClick={() => seleccionarCategoria(null)}
            className={
              categoriaActiva === null
                ? 'px-4 py-2 rounded-full bg-secondary text-on-secondary text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer'
                : 'px-4 py-2 rounded-full bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary text-xs font-bold transition-colors cursor-pointer'
            }
          >
            <span className="material-symbols-outlined text-sm">apps</span>
            <span>Todas las creaciones</span>
          </button>

          {categorias.map((cat) => (
            <button
              key={cat.id_categoria}
              type="button"
              onClick={() => seleccionarCategoria(cat.id_categoria)}
              className={
                categoriaActiva === cat.id_categoria
                  ? 'px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-bold shadow-sm cursor-pointer'
                  : 'px-4 py-2 rounded-full bg-surface-container-lowest border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary text-xs font-bold transition-colors cursor-pointer'
              }
            >
              {cat.nombre}
            </button>
          ))}
        </section>

        {/* Cuadrícula de Productos */}
        {cargando ? (
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-12 text-center shadow-sm">
            <span className="material-symbols-outlined text-4xl text-primary animate-spin">
              progress_activity
            </span>
            <p className="mt-2 font-semibold text-on-surface mb-0">
              Preparando las creaciones del taller para ti...
            </p>
          </div>
        ) : productosFiltrados.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-10 text-center shadow-sm">
            <h3 className="text-lg font-bold text-on-surface mb-1">
              No encontramos resultados con ese filtro
            </h3>
            <p className="text-sm text-on-surface-variant mb-4">
              ¡Recuerda que trabajamos 100% a medida! Podemos confeccionar desde cero cualquier diseño o personaje que tengas en mente.
            </p>
            <button
              type="button"
              onClick={() => {
                setBusqueda('');
                seleccionarCategoria(null);
              }}
              className="px-5 py-2.5 rounded-full bg-secondary text-on-secondary text-sm font-bold shadow-sm cursor-pointer"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productosFiltrados.map((producto) => (
              <ProductCard
                key={producto.id_producto}
                producto={producto}
                onCotizar={handleCotizarProducto}
              />
            ))}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
