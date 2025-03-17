import { Link } from 'react-router-dom';
import React from 'react';
import './TopPageTitle.scss';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TopPageTitleProps {
  title: String,
  icon: IconDefinition
}

const TopPageTitle = ({ title, icon }: TopPageTitleProps) => {

  return (
    <>
      <div className="container">
        <FontAwesomeIcon
          icon={icon}
          size="2x"
          style={{ marginLeft: '10px', marginRight: '10px' }}
          onClick={() => console.log("FontAwesomeIcon")} />

        <div className="title">
          -
        </div>

        <div className="title">
          {title}
        </div>
      </div>
    </>
  );
};

export { TopPageTitle };
