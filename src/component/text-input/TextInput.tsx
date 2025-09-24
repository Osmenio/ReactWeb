import React, { useCallback, useState } from 'react';
import { Button, Grid, Input, Modal } from 'semantic-ui-react';
import './TextInput.scss';
import { faBars, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



interface TextInputProps {
  title?: string;
  placehoder?: string;
}

const TextInput = ({
  title = "TextInput",
  placehoder = "TextInput"
}: TextInputProps) => {

  return (
    <div className="text_input_content">
      <div
        className="text_content"
      >
        {title}
      </div>
      <Input
        // className="modal_input"
        placeholder={placehoder}
        onChange={(event) => {
          // setUserName(event.target.value)
        }}
      />
      {/* </Input> */}
    </div>
  );
};

export { TextInput };
