import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBoxesStacked, faCalculator, faChartColumn, faHome, faMoneyBill1Wave, faUsers } from '@fortawesome/free-solid-svg-icons';

import './SideMenu.scss';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuButton = ({ isOpen, onClose }: SideMenuProps) => {
  return (
    <button
      className="menu-toggle"
      disabled={isOpen}
      onClick={onClose}
    >
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
};

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const sideMenuRef = useRef<HTMLDivElement>(null);
  // console.log(`SideMenu:`)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // const target = event.target as HTMLElement;
      // setTimeout(() => {
      // if (
      //   isOpen &&
      //   sideMenuRef.current &&
      //   !sideMenuRef.current.contains(event.target as Node) &&
      //   !(target.classList && target.classList.contains('menu-toggle'))
      // ) {
      //   onClose();
      // }
      onClose();
      // }, 0);
    };


    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);


  return (
    <div className="side-menu-container no_print">

      <div ref={sideMenuRef} className={`side-menu ${isOpen ? 'open' : ''}`}>

        <nav className="menu-items">
          <ul>
            <li>
              <Link to="/product">
                <FontAwesomeIcon icon={faBoxesStacked} />
                <span>Produtos</span>
              </Link>
            </li>
            <li>
              <Link to="/sales">
                <FontAwesomeIcon icon={faMoneyBill1Wave} />
                <span>Vendas</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FontAwesomeIcon icon={faChartColumn} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FontAwesomeIcon icon={faCalculator} />
                <span>Balanço</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FontAwesomeIcon icon={faUsers} />
                <span>Usuários</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export { MenuButton, SideMenu };
