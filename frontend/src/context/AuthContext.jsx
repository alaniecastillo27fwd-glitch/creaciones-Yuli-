import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('cy_token');
    localStorage.removeItem('cy_usuario');
    setUsuario(null);
  }, []);

  // Restaurar y verificar sesión al cargar la aplicación
  useEffect(() => {
    const tokenGuardado = localStorage.getItem('cy_token');
    const usuarioGuardado = localStorage.getItem('cy_usuario');

    if (!tokenGuardado || !usuarioGuardado) {
      setCargando(false);
      return;
    }

    try {
      setUsuario(JSON.parse(usuarioGuardado));
    } catch {
      logout();
    }

    api
      .get('/auth/profile')
      .then((res) => {
        if (res.data?.ok && res.data?.data) {
          const perfil = res.data.data;
          const usuarioActualizado = {
            id_usuario: perfil.id_usuario,
            nombre_completo: perfil.nombre_completo,
            email: perfil.email,
            telefono: perfil.telefono,
            rol: perfil.rol_activo || perfil.roles?.[0]?.nombre || 'Cliente'
          };
          setUsuario(usuarioActualizado);
          localStorage.setItem('cy_usuario', JSON.stringify(usuarioActualizado));
        }
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setCargando(false);
      });
  }, [logout]);

  // Escuchar evento global de expiración 401 emitido por api.js
  useEffect(() => {
    const handleExpired = () => logout();
    window.addEventListener('cy:session-expired', handleExpired);
    return () => window.removeEventListener('cy:session-expired', handleExpired);
  }, [logout]);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, usuario: datosUsuario } = response.data;

    localStorage.setItem('cy_token', token);
    localStorage.setItem('cy_usuario', JSON.stringify(datosUsuario));
    setUsuario(datosUsuario);

    return datosUsuario;
  };

  const register = async (payloadRegistro) => {
    const response = await api.post('/auth/register', payloadRegistro);
    return response.data;
  };

  const rolActivo = usuario?.rol || null;
  const estaAutenticado = Boolean(usuario);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        rol: rolActivo,
        estaAutenticado,
        cargando,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de un AuthProvider.');
  }
  return context;
};
