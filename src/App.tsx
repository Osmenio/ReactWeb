import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { SideMenu, TopHeader } from './component';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { BalancePage, DashboardPage, HomePage, ProductsPage, SalesPage, UserPage } from './page';

import './semantic-ui-components-customization.scss';
import 'semantic-ui-css/semantic.min.css';
import { useSessionContext } from './providers';

const App = () => {
  const { session } = useSessionContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
    // console.log(`handleMenuToggle:${isMenuOpen}`)
  }, [isMenuOpen]);

  return (
    <div className="app-container">
      <TopHeader isOpen={isMenuOpen} onMenuToggle={handleMenuToggle} />
      <SideMenu isOpen={isMenuOpen} onClose={handleMenuToggle} />

      <div className="app-content">
        <main className="content">
          <Routes>
            {/* <Route path="/" element={<HomePage />} />
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
              element={session?.user ? <UserPage /> : <Navigate to="/" replace />} /> */}


            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/product" element={<ProductsPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/balance" element={<BalancePage />} />
            <Route path="/user" element={<UserPage />} />


            {/* {session.user ? (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/product" element={<ProductsPage />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/balance" element={<BalancePage />} />
                <Route path="/user" element={<UserPage />} />
              </>
            ) : (
              <>
                <Route path="/" element={<HomePage />} />
              </>
            )} */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;