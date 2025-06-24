import { Modal, Button } from 'semantic-ui-react';
import './UserModal.scss';

export interface UserModalProps {
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

const UserModal = ({
  open,
  title,
  subtitle,
  positiveBtnText,
  negativeBtnText,
  neutralBtnText,
  onPositiveBtn = () => { },
  onNegativeBtn = () => { },
  onNeutralBtn = () => { },
}: UserModalProps) => {
  // const title = success ? 'Sucesso' : 'Erro';

  return (
    <Modal
      // onClose={onClose}
      open={open}
      className='user_modal'
    >
      {/* <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{subtitle}</Modal.Content> */}
      {/* <Modal.Content>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Modal.Content> */}
      {/* <Modal.Actions>
        <Button
          onClick={onClose}>
          Fechar
        </Button>
      </Modal.Actions> */}

      <div className="user_modal_title">
        {title}
      </div>

      <div className="user_modal_subtitle">
        {subtitle}
      </div>

      <div className="user_footer_buttons">
        {negativeBtnText && <Button
          className="user_button_size"
          color='red'
          onClick={onNegativeBtn}
        >
          {negativeBtnText}
        </Button>}

        {neutralBtnText && <Button
          className="user_button_size"
          onClick={onNeutralBtn}
        >
          {neutralBtnText}
        </Button>}

        {positiveBtnText && <Button
          className="user_button_size"
          color='blue'
          onClick={onPositiveBtn}
        >
          {positiveBtnText}
        </Button>}
      </div>
    </Modal>
  );
};

export { UserModal };
