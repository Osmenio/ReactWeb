import React, { useCallback, useState } from 'react';
import { Button, Grid, Input, Modal } from 'semantic-ui-react';
import './LoginModal.scss';
import { faBars, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginModal = ({
  open,
  onClick = () => { },
}) => {

  const [isUserNameValid, setUserNameValid] = useState<boolean>(true);
  const [isPasswordValid, setPasswordValid] = useState<boolean>(true);
  const [userName, setUserName] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const handleOnClick = useCallback(() => {

    const isUserValid = userName.trim() !== "";
    const isPassValid = password.trim() !== "";

    console.log(`handleOnClick:${userName}:${password}`)
    console.log(`valide:${isUserValid}:${isPassValid}`)

    setUserNameValid(isUserValid)
    setPasswordValid(isPassValid)

    if (isUserValid && isPassValid)
      onClick()
  }, [userName, password, onClick]);

  return (
    <Modal
      className="modal_size"
      open={open}
    >

      {/* <Modal.Header>
        title
      </Modal.Header> */}

      {/* <Modal.Content
      // className="modal_content"
      > */}

      <div
        className="modal_content"
      >
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

          <Input
            className="modal_input"
            placeholder="Usuário *"
            onChange={(event) => {
              setUserName(event.target.value)
            }}
          >
          </Input>
          {!isUserNameValid &&
            <div className="modal_error">
              Digite um usuário válido
            </div>
          }

          {/* <div style={{ color: 'red', margin: '1rem' }}>
             Alguma coisa aqui
          </div> */}

          <div>
            <Input
              className="modal_input"
              placeholder="Senha *"
              onChange={(event) => {
                setPassword(event.target.value)
              }}
            >
            </Input>
          </div>
          {!isPasswordValid &&
            <div className="modal_error">
              Digite uma senha válida
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
      {/* </Modal.Content> */}

      {/* <Modal.Actions>
        <Button
          className="modal_btn"
          onClick={onClick}
          color="blue">
          Entrar
        </Button>

      </Modal.Actions> */}
    </Modal>
  );
};

export { LoginModal };
