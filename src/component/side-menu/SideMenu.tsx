import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBoxesStacked, faCalculator, faChartColumn, faMoneyBill1Wave, faUsers } from '@fortawesome/free-solid-svg-icons';

import './SideMenu.scss';
import { UserProfileEnum } from '../../models';
import { useSessionContext } from '../../providers';

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
  const { session } = useSessionContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      onClose();
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
            {session?.user?.profile == UserProfileEnum.Admin &&
              <li>
                <Link to="/dashboard">
                  <FontAwesomeIcon icon={faChartColumn} />
                  <span>Dashboard</span>
                </Link>
              </li>
            }
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
            {session?.user?.profile == UserProfileEnum.Admin &&
              <li>
                <Link to="/balance">
                  <FontAwesomeIcon icon={faCalculator} />
                  <span>Balanço</span>
                </Link>
              </li>
            }
            {session?.user?.profile == UserProfileEnum.Admin &&
              <li>
                <Link to="/user">
                  <FontAwesomeIcon icon={faUsers} />
                  <span>Usuários</span>
                </Link>
              </li>
            }
          </ul>
        </nav>
      </div>
    </div>
  );
};

export { MenuButton, SideMenu };
