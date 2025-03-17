import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMoon, faSun, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import logo from '../../logo.svg';
// import { MenuButton } from '.';

import React from 'react';
import './TopHeader.scss';
import { MenuButton } from '..';
import { faArrowRightFromBracket, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useTheme } from '../hooks';
// import { formatarCNPJ } from '../util';
// import { getSession } from '../services/session';

interface TopHeaderProps {
  onMenuToggle: () => void;
}

const TopHeader = ({ isOpen, onMenuToggle }) => {

  return (
    <div className="top-container no_print">
      <header className="top-header">

        <MenuButton
          isOpen={isOpen}
          onClose={onMenuToggle}
        />

        <div className="top-header_left">
          <Link to="/dashboard" className="top_header_logo">
            <img src={logo} alt="Logo" />
          </Link>
          
          <Link to="/dashboard" className="top_header_product">
            <div className="top_header_product_title">NOME DA EMPRESA</div>
            <div className="top_header_product_subtitle">PORTAL DE VENDAS</div>
          </Link>
        </div>

        <div className='user_no_link'>
          <strong>Olá, convidado!</strong>
        </div>

        <Link to="/" className='user_no_link'>
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            size="2x"
            style={{ marginLeft: '10px', marginRight: '10px' }}
            onClick={() => console.log("FontAwesomeIcon")} />
        </Link>

      </header >
    </div>
  );
};

export { TopHeader };
