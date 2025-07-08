import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { LoginModal } from '../component';

const HomePage = () => {

  const [open, setOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  return (
    <>
      <LoginModal
        open={open}
        // user='carlos'
        // password='carlos'
        // showConfirmPassword
        // error='Usuário não encontrado'
        onClick={({ user, password, confirmPassword }) => {
          console.log(`onClick:${user}:${password}:${confirmPassword}`)
          setOpen(false);
          navigate('/dashboard');
        }}
      />
    </>
  )
}

export { HomePage }