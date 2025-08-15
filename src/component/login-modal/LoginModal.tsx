import { useCallback, useEffect, useState } from 'react';
import { Button, Input, Modal } from 'semantic-ui-react';
import './LoginModal.scss';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LoginModalProps {
  open: boolean;
  user?: string;
  password?: string;
  confirmPassword?: string;
  showConfirmPassword?: boolean;
  error?: string;
  onClick?: (params: {
    login: string;
    password: string;
  }) => void;
}

const LoginModal = ({
  open,
  user,
  password,
  confirmPassword,
  showConfirmPassword,
  error,
  onClick = () => { },
}: LoginModalProps) => {

  const [login, setLogin] = useState(user || "");
  const [pwd, setPwd] = useState(password || "");
  const [confirmPwd, setConfirmPwd] = useState(confirmPassword || "");

  const [errorLogin, setErrorLogin] = useState(false);
  const [errorPwd, setErrorPwd] = useState(false);
  const [errorConfirmPwd, setErrorConfirmPwd] = useState(false);

  const handleOnClick = useCallback(() => {
    if (isValidFields()) {
      onClick({
        login: login,
        password: pwd,
      })
      handleClearData()
    }
  }, [login, pwd, confirmPwd, showConfirmPassword]);

  const isValidFields = useCallback(() => {
    let isValid = true

    if (login.trim() === "") {
      setErrorLogin(true)
      isValid = false
    }

    if (pwd.trim() === "") {
      setErrorPwd(true)
      isValid = false
    }

    if (showConfirmPassword && (confirmPwd.trim() === "" || pwd !== confirmPwd)) {
      setErrorConfirmPwd(true)
      isValid = false
    }

    return isValid;
  }, [login, pwd, confirmPwd, showConfirmPassword]);

  const handleClearData = () => {
    setConfirmPwd("")
  };

  return (
    <Modal
      className="modal_size"
      open={open}
    >

      <div className="modal_content">
        <div>
          <FontAwesomeIcon
            className="modal_logo"
            icon={faTruckFast}
            size="4x"
          />
          <div
            className="modal_title"
          >
            Nome da Empresa
          </div>

          <div>
            Usuário *
          </div>
          <Input
            fluid
            placeholder="Usuário"
            value={login}
            onChange={(event) => {
              setLogin(event.target.value)
              setErrorLogin(false)
            }}
          >
          </Input>
          {errorLogin &&
            <div style={{ color: 'red' }}>
              Digite um usuário válido
            </div>
          }

          <div style={{ marginTop: '20px' }}>
            Senha *
          </div>
          <div>
            <Input
              fluid
              type='password'
              placeholder="Senha"
              value={pwd}
              onChange={(event) => {
                setPwd(event.target.value)
                setErrorPwd(false)
              }}
            >
            </Input>
          </div>
          {errorPwd &&
            <div style={{ color: 'red' }}>
              Digite uma senha válida
            </div>
          }

          {showConfirmPassword &&
            <div>
              <div style={{ marginTop: '20px' }}>
                Cofirmar Senha:
              </div>
              <div>
                <Input
                  fluid
                  type='password'
                  placeholder="Cofirmar Senha *"
                  value={confirmPwd}
                  onChange={(event) => {
                    setConfirmPwd(event.target.value)
                    setErrorConfirmPwd(false)
                  }}
                >
                </Input>
              </div>
              {errorConfirmPwd &&
                <div style={{ color: 'red' }}>
                  Senhas diferentes
                </div>
              }
            </div>
          }

          {error &&
            <div style={{ marginTop: '20px', color: 'red' }}>
              {error}
            </div>
          }

          <Button
            className="modal_btn"
            onClick={handleOnClick}
            color="blue">
            Entrar
          </Button>

        </div>
      </div>
    </Modal>
  );
};

export { LoginModal };
