import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { LoadingModal, SideMenu, TopHeader } from './component';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { BalancePage, DashboardPage, HomePage, ProductsPage, SalesPage, UserPage } from './page';

import './semantic-ui-components-customization.scss';
import 'semantic-ui-css/semantic.min.css';
import { useSessionContext } from './providers';
import { MockPage } from './page/MockPage';

const App = () => {
  const navigate = useNavigate();
  const { session, loading } = useSessionContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!loading && !session?.user) {
      navigate('/');
    }

  }, [session, loading, navigate]);

  if (loading) {
    return <LoadingModal
      show={true}
    />
  }

  return (
    <div className="app-container">
      <TopHeader isOpen={isMenuOpen} onMenuToggle={handleMenuToggle} />
      <SideMenu isOpen={isMenuOpen} onClose={handleMenuToggle} />

      <div className="app-content">
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            {/* <Route path="/mock" element={<MockPage />} />  */}
            <Route
              path="/dashboard"
              element={session?.user ? <DashboardPage /> : <Navigate to="/" replace />} />
            <Route
              path="/product"
              element={session?.user ? <ProductsPage /> : <Navigate to="/" replace />} />
            <Route
              path="/sales"
              element={session?.user ? <SalesPage /> : <Navigate to="/" replace />} />
            <Route
              path="/balance"
              element={session?.user ? <BalancePage /> : <Navigate to="/" replace />} />
            <Route
              path="/user"
              element={session?.user ? <UserPage /> : <Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;