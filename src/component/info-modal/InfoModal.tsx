import { Modal, Button } from 'semantic-ui-react';
import './InfoModal.scss';

interface InfoModalProps {
  open: boolean;
  title: string;
  subtitle: string;
  positiveBtnText?: string;
  negativeBtnText?: string;
  neutralBtnText?: string;
  onPositiveBtn?: () => void;
  onNegativeBtn?: () => void;
  onNeutralBtn?: () => void;
}

const InfoModal = ({
  open,
  title,
  subtitle,
  positiveBtnText,
  negativeBtnText,
  neutralBtnText,
  onPositiveBtn = () => { },
  onNegativeBtn = () => { },
  onNeutralBtn = () => { },
}: InfoModalProps) => {

  return (
    <Modal
      open={open}
      className='info_modal'
    >

      <div className="info_modal_title">
        {title}
      </div>

      <div className="info_modal_subtitle">
        {subtitle}
      </div>

      <div className="info_footer_buttons">
        {negativeBtnText && <Button
          className="info_button_size"
          color='red'
          onClick={onNegativeBtn}
        >
          {negativeBtnText}
        </Button>}

        {neutralBtnText && <Button
          className="info_button_size"
          onClick={onNeutralBtn}
        >
          {neutralBtnText}
        </Button>}

        {positiveBtnText && <Button
          className="info_button_size"
          color='blue'
          onClick={onPositiveBtn}
        >
          {positiveBtnText}
        </Button>}
      </div>
    </Modal>
  );
};

export { InfoModal };
