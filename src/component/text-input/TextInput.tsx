import React, { useCallback, useState } from 'react';
import { Button, Grid, Input, Modal } from 'semantic-ui-react';
import './TextInput.scss';
import { faBars, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TextInput = ({
  // open,
  // onClick = () => { },
}) => {

  // const [isUserNameValid, setUserNameValid] = useState<boolean>(true);
  // const [isPasswordValid, setPasswordValid] = useState<boolean>(true);
  // const [userName, setUserName] = useState<String>("");
  // const [password, setPassword] = useState<String>("");

  // const handleOnClick = useCallback(() => {

  //   const isUserValid = userName.trim() !== "";
  //   const isPassValid = password.trim() !== "";

  //   console.log(`handleOnClick:${userName}:${password}`)
  //   console.log(`valide:${isUserValid}:${isPassValid}`)

  //   setUserNameValid(isUserValid)
  //   setPasswordValid(isPassValid)

  //   if (isUserValid && isPassValid)
  //     onClick()
  // }, [userName, password, onClick]);

  return (
    <>
      <Input
        className="modal_input"
        placeholder="Usuário *"
        onChange={(event) => {
          // setUserName(event.target.value)
        }}
      >
      </Input>
    </>
  );
};

export { TextInput };
