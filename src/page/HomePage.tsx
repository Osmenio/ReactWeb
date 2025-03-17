import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom"
import { LoginModal } from '../component';
// import { Breadcrumb } from "../components"

const HomePage = () => {

  const [open, setOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  return (
    <>
      {/* <Breadcrumb /> */}
      {/* <Navigate to='/colaboradores' /> */}

      {/* <div style={{ backgroundColor: 'antiquewhite' }}>

        <p>
          Home page teste.
        </p>
      </div> */}

      <LoginModal
        open={open}
        onClick={() => {
          setOpen(false);
          navigate('/dashboard');
        }}
      />
    </>
  )
}

export { HomePage }