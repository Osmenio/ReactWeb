import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { SideMenu, TopHeader } from './component';
import { Routes, Route } from 'react-router-dom';
import { BalancePage, DashboardPage, HomePage, ProductsPage, SalesPage, UserPage } from './page';

import './semantic-ui-components-customization.scss';
import 'semantic-ui-css/semantic.min.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
    console.log(`handleMenuToggle:${isMenuOpen}`)
  }, [isMenuOpen]);

  return (
    <div
      className="app-container"
    >
      <TopHeader isOpen={isMenuOpen} onMenuToggle={handleMenuToggle} />
      <SideMenu isOpen={isMenuOpen} onClose={handleMenuToggle} />

      <div className="app-content">

        {/* <SideMenu isOpen={isMenuOpen} onClose={handleMenuToggle} /> */}

        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/product" element={<ProductsPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/balance" element={<BalancePage />} />
            <Route path="/user" element={<UserPage />} />

            {/* {isLoggedIn ? (
              <>
                <Route path="/" element={<InicioPage />} />
                <Route path="/colaboradores" element={<ColaboradoresPage />} />
                <Route path="/licenciados" element={<LicenciadosPage />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )} */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;