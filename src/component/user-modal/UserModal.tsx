import { Modal, Button, Input, Dropdown } from 'semantic-ui-react';
import './UserModal.scss';
import { useCallback, useEffect, useState } from 'react';
import { UserModel, UserProfileEnum, UserStatusEnum } from '../../models';

const userProfile = Object.entries(UserProfileEnum).map(([key, value]) => ({
  key: key,
  text: value,
  value: value,
}));

interface UserModalProps {
  open: boolean;
  title: string;
  item?: UserModel;
  positiveBtnText?: string;
  negativeBtnText?: string;
  onPositiveBtn?: (user: UserModel) => void;
  onNegativeBtn?: () => void;
}

const UserModal = ({
  open,
  title,
  item,
  positiveBtnText,
  negativeBtnText,
  onPositiveBtn = () => { },
  onNegativeBtn = () => { },
}: UserModalProps) => {

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [profile, setProfile] = useState<UserProfileEnum | undefined>();
  const [status, setStatus] = useState<UserStatusEnum | undefined>();

  const [errorName, setErrorName] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [errorProfile, setErrorProfile] = useState("");

  useEffect(() => {
    if (open) {
      setName(item?.name?.trim() || "");
      setLogin(item?.login?.trim() || "");
      setProfile(item?.profile || undefined)
      setStatus(item?.status || undefined)
    }
  }, [open]);

  const handleSave = useCallback(() => {
    if (isValidFields()) {
      onPositiveBtn({
        id: item?.id ?? 0,
        name,
        login,
        password: item?.password ?? "123",
        profile: profile ?? UserProfileEnum.Sales,
        status: status ?? UserStatusEnum.FirstAccess,
      })
      cleanAll()
    }
  }, [name, login, profile, status]);

  const isValidFields = useCallback(() => {
    const error = "Campo obrigatório"
    let isValid = true

    if (name.trim() === "") {
      setErrorName(error)
      isValid = false
    }
    if (login.trim() === "") {
      setErrorLogin(error)
      isValid = false
    }
    if (profile === undefined) {
      setErrorProfile(error)
      isValid = false
    }
    return isValid;
  }, [name, login, profile]);

  const cleanAll = () => {
    setName("")
    setLogin("")
    setProfile(undefined)
    setStatus(undefined)

    setErrorName("")
    setErrorLogin("")
    setErrorProfile("")
  };

  return (
    <Modal
      open={open}
      className='user_modal'
    >
      <div className="user_modal_container">
        <div className="user_modal_title">
          {title}
        </div>

        <div>
          <div>
            Usuário *
          </div>
          <Input
            style={{ marginTop: '5px' }}
            fluid
            value={name}
            error={errorName.trim() !== ""}
            placeholder="Nome"
            onChange={(event) => {
              setName(event.target.value)
              setErrorName("")
            }}
          />
          {errorName.trim() !== "" && <div style={{ color: 'red' }}>
            {errorName}
          </div>}

          <div style={{ marginTop: '20px' }}>
            Login *
          </div>
          <Input
            style={{ marginTop: '5px' }}
            fluid
            value={login}
            error={errorLogin.trim() !== ""}
            placeholder="Login"
            onChange={(event) => {
              setLogin(event.target.value)
              setErrorLogin("")
            }}
          />
          {errorLogin.trim() !== "" && <div style={{ color: 'red' }}>
            {errorLogin}
          </div>}

          <div style={{ marginTop: '20px' }}>
            Perfil *
          </div>
          <Dropdown
            style={{ marginTop: '5px' }}
            placeholder="Perfil"
            error={errorProfile.trim() !== ""}
            selection
            value={profile}
            options={userProfile}
            onChange={(_, data) => {
              const profile = data.value as UserProfileEnum
              setProfile(profile)
              setErrorProfile("")
            }}
          />

          {errorProfile.trim() !== "" && <div style={{ color: 'red' }}>
            {errorProfile}
          </div>
          }
          <div />

          <div style={{ marginTop: '20px' }}>
            Situação: {item ? status : UserStatusEnum.FirstAccess}
          </div>
        </div>
      </div>

      <div className="product_footer_buttons">
        {negativeBtnText && <Button
          className="product_button_size"
          color='red'
          onClick={() => {
            cleanAll()
            onNegativeBtn()
          }}
        >
          {negativeBtnText}
        </Button>}

        {positiveBtnText && <Button
          className="product_button_size"
          color='blue'
          onClick={() => {
            handleSave()
          }}
        >
          {positiveBtnText}
        </Button>}
      </div>
    </Modal>
  );
};

export { UserModal };
