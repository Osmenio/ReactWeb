import './TopPageTitle.scss';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TopPageTitleProps {
  title: string,
  icon?: IconDefinition,
  logo?: string;
}

const TopPageTitle = ({ title, icon, logo }: TopPageTitleProps) => {

  return (
    <>
      <div className="container">

        {icon &&
          <FontAwesomeIcon
            icon={icon}
            size="2x"
            style={{ marginLeft: '10px', marginRight: '10px' }}
            onClick={() => console.log("FontAwesomeIcon")} />
        }

        {logo &&
          <img
            style={{ width: 48, height: 48 }}
            src={logo}
            alt="Logo"
          />
        }
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
