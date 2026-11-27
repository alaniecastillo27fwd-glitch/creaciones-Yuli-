import { Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Páginas Públicas y de Autenticación
import HomePage from '../pages/HomePage';
import CatalogPage from '../pages/CatalogPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

// Páginas de Gobernanza (Ley N.º 8968 CR)
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsPage from '../pages/TermsPage';
import ProfileDeleteAccountPage from '../pages/ProfileDeleteAccountPage';

// Dashboards Privados por Rol
import AdminDashboardPage from '../pages/AdminDashboardPage';
import CollaboratorDashboardPage from '../pages/CollaboratorDashboardPage';
import ClientDashboardPage from '../pages/ClientDashboardPage';
import AuditorDashboardPage from '../pages/AuditorDashboardPage';

function NotFoundView() {
  return (
    <div>
      <Navbar />
      <main className="container">
        <section className="card">
          <span className="badge-festive">Ruta no encontrada (404)</span>
          <h1>¡Ups! Esta página se nos traspapeló en el taller</h1>
          <p>
            No encontramos la dirección que buscas, pero nuestras piñatas, toppers y maquetas te esperan en el inicio.
          </p>
          <Link to="/" className="btn btn-primary">
            Volver al inicio
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. Rutas Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/catalogo" element={<CatalogPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/privacidad" element={<PrivacyPolicyPage />} />
      <Route path="/terminos" element={<TermsPage />} />

      {/* 2. Rutas Privadas Protegidas por Rol */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['Administrador']}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/colaborador"
        element={
          <ProtectedRoute allowedRoles={['Colaborador', 'Administrador']}>
            <CollaboratorDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cliente"
        element={
          <ProtectedRoute allowedRoles={['Cliente']}>
            <ClientDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/auditor"
        element={
          <ProtectedRoute allowedRoles={['Auditor', 'Administrador']}>
            <AuditorDashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/perfil"
        element={
          <ProtectedRoute allowedRoles={['Administrador', 'Colaborador', 'Cliente', 'Auditor']}>
            <ProfileDeleteAccountPage />
          </ProtectedRoute>
        }
      />

      {/* 3. Ruta Comodín 404 */}
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
}
