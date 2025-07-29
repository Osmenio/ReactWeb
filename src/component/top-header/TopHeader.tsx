import { Link } from 'react-router-dom';

import './TopHeader.scss';
import { MenuButton } from '..';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '../../utils/format-utils';
import { UserModel } from '../../models';
import { useState, useEffect } from 'react';
import logo from '../../logo.svg';
import { useSessionContext } from '../../providers/SessionContext';

interface TopHeaderProps {
  isOpen: boolean;
  onMenuToggle: () => void;
}

const TopHeader = ({ isOpen, onMenuToggle }: TopHeaderProps) => {
  const { session, clearSession } = useSessionContext();

  return (
    <div className="top-container no_print">
      <header className="top-header">

        <MenuButton
          isOpen={isOpen}
          onClose={onMenuToggle}
        />

        <div className="top-header_left">
          <Link to="/product" className="top_header_logo">
            <img src={logo} alt="Logo" />
          </Link>

          <Link to="/product" className="top_header_product">
            <div className="top_header_product_title">NOME DA EMPRESA</div>
            <div className="top_header_product_subtitle">PORTAL DE VENDAS</div>
          </Link>
        </div>

        <div className='user_no_link'>
          <strong>Olá, {capitalizeFirstLetter(session?.user?.name ?? "convidado")}!</strong>
        </div>

        <Link to="/" className='user_no_link'>
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            size="2x"
            style={{ marginLeft: '10px', marginRight: '10px' }}
            onClick={() => {
              console.log("FontAwesomeIcon")
              // setSession(null)
              clearSession()
            }} />
        </Link>

      </header >
    </div>
  );
};

export { TopHeader };
