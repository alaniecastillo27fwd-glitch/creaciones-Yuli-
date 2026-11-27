import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const { usuario, rol, estaAutenticado, logout } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuAbierto(false);
    navigate('/');
  };

  const navPillClass = ({ isActive }) =>
    isActive
      ? 'px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-semibold text-sm shadow-sm transition-all'
      : 'px-4 py-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-primary-fixed/60 font-semibold text-sm transition-all';

  return (
    <header className="sticky top-0 w-full z-50 bg-surface/95 backdrop-blur-xl border-b border-outline-variant/60 shadow-[0_2px_12px_rgba(41,37,36,0.05)]">
      <div className="min-h-[5.25rem] max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4 py-2">
        {/* Identidad Oficial Creaciones Yuli */}
        <Link
          to="/"
          onClick={() => setMenuAbierto(false)}
          className="flex items-center gap-3 group"
        >
          <BrandLogo size="header" />
          <div className="flex flex-col">
            <span className="font-headline-md text-xl sm:text-2xl font-bold tracking-tight text-primary leading-none">
              Creaciones Yuli
            </span>
            <span className="text-[11px] text-secondary tracking-widest uppercase font-bold mt-1">
              Arte Hecho con Amor
            </span>
          </div>
        </Link>

        {/* Navegación Desktop (Stitch Pill Nav) */}
        <nav className="hidden lg:flex items-center gap-1.5">
          <NavLink to="/" end className={navPillClass}>
            Inicio
          </NavLink>
          <NavLink to="/catalogo" className={navPillClass}>
            Catálogo &amp; Piñatas
          </NavLink>

          {estaAutenticado && rol === 'Cliente' && (
            <NavLink to="/cliente" className={navPillClass}>
              Mis Pedidos
            </NavLink>
          )}

          {estaAutenticado && rol === 'Administrador' && (
            <NavLink to="/admin" className={navPillClass}>
              Panel Admin
            </NavLink>
          )}

          {estaAutenticado && (rol === 'Colaborador' || rol === 'Administrador') && (
            <NavLink to="/colaborador" className={navPillClass}>
              Taller &amp; Stock
            </NavLink>
          )}

          {estaAutenticado && (rol === 'Auditor' || rol === 'Administrador') && (
            <NavLink to="/auditor" className={navPillClass}>
              Auditoría Ley 8968
            </NavLink>
          )}

          {estaAutenticado && (
            <NavLink to="/perfil" className={navPillClass}>
              Mi Perfil
            </NavLink>
          )}
        </nav>

        {/* Acciones Derecha: WhatsApp + Sesión */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href="https://wa.me/50657147889?text=Hola%20Creaciones%20Yuli,%20deseo%20cotizar%20una%20creaci%C3%B3n%20personalizada"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-on-primary hover:bg-primary-container shadow-sm transition-all text-sm font-semibold"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            <span>5714-7889</span>
          </a>

          {!estaAutenticado ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary-fixed text-sm font-bold transition-all"
              >
                Ingresar
              </Link>
              <Link
                to="/registro"
                className="px-4 py-2 rounded-full bg-secondary text-on-secondary hover:bg-[#A3125B] text-sm font-bold shadow-sm transition-all"
              >
                Crear Cuenta
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-primary-fixed text-primary-container text-xs font-bold border border-primary/20">
                {usuario.nombre_completo} • {rol}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-full bg-secondary text-on-secondary hover:bg-[#A3125B] text-xs font-bold transition-all cursor-pointer"
              >
                Salir
              </button>
            </div>
          )}
        </div>

        {/* Botón Menú Hamburguesa Móvil */}
        <button
          type="button"
          aria-label="Abrir menú de navegación"
          onClick={() => setMenuAbierto((prev) => !prev)}
          className="lg:hidden inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary text-on-primary text-sm font-bold shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">
            {menuAbierto ? 'close' : 'menu'}
          </span>
          <span>{menuAbierto ? 'Cerrar' : 'Menú'}</span>
        </button>
      </div>

      {/* Menú Desplegable Móvil */}
      {menuAbierto && (
        <div className="lg:hidden bg-surface-container-lowest border-t border-outline-variant px-6 py-4 flex flex-col gap-2.5 shadow-lg">
          <NavLink to="/" end className={navPillClass} onClick={() => setMenuAbierto(false)}>
            Inicio
          </NavLink>
          <NavLink to="/catalogo" className={navPillClass} onClick={() => setMenuAbierto(false)}>
            Catálogo &amp; Piñatas
          </NavLink>

          {estaAutenticado && rol === 'Cliente' && (
            <NavLink to="/cliente" className={navPillClass} onClick={() => setMenuAbierto(false)}>
              Mis Pedidos
            </NavLink>
          )}
          {estaAutenticado && rol === 'Administrador' && (
            <NavLink to="/admin" className={navPillClass} onClick={() => setMenuAbierto(false)}>
              Panel Admin
            </NavLink>
          )}
          {estaAutenticado && (rol === 'Colaborador' || rol === 'Administrador') && (
            <NavLink to="/colaborador" className={navPillClass} onClick={() => setMenuAbierto(false)}>
              Taller &amp; Stock
            </NavLink>
          )}
          {estaAutenticado && (rol === 'Auditor' || rol === 'Administrador') && (
            <NavLink to="/auditor" className={navPillClass} onClick={() => setMenuAbierto(false)}>
              Auditoría Ley 8968
            </NavLink>
          )}
          {estaAutenticado && (
            <NavLink to="/perfil" className={navPillClass} onClick={() => setMenuAbierto(false)}>
              Mi Perfil
            </NavLink>
          )}

          <div className="pt-2 border-t border-outline-variant flex flex-wrap gap-2">
            {!estaAutenticado ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuAbierto(false)}
                  className="flex-1 text-center px-4 py-2 rounded-full border border-primary text-primary font-bold text-sm"
                >
                  Ingresar
                </Link>
                <Link
                  to="/registro"
                  onClick={() => setMenuAbierto(false)}
                  className="flex-1 text-center px-4 py-2 rounded-full bg-secondary text-on-secondary font-bold text-sm"
                >
                  Crear Cuenta
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full px-4 py-2 rounded-full bg-secondary text-on-secondary font-bold text-sm"
              >
                Cerrar sesión ({usuario.nombre_completo})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
