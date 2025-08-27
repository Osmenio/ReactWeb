import { useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { LoadingModal, LoginModal } from '../component';
import { UserService } from '../services/UserService';
import { DefaultUserModel, UserModel, UserProfileEnum, UserStatusEnum } from '../models';
import { useSessionContext } from '../providers';
import { AuthService } from '../services';

const HomePage = () => {
  const navigate = useNavigate();
  const { session, setSession } = useSessionContext();

  const [open, setOpen] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [isConfirmPassword, setConfirmPassword] = useState(false);
  const [loggedUser, setLoggerUser] = useState(DefaultUserModel);
  const [loading, setLoading] = useState(false);

  const getUserById = async (userId: string) => {
    const { user, error } = await UserService.getUserById(userId);
    if (error) {
      setError("Usuário não encontrado")
      setConfirmPassword(false)
    } else if (user?.status == UserStatusEnum.FirstAccess) {
      setLoggerUser(user)
      setError("")
      setConfirmPassword(true)
    } else if (user?.status == UserStatusEnum.Active) {
      setSession(
        {
          ...session,
          user
        }
      )
      setOpen(false);
      setConfirmPassword(false)
      navigate('/product');
    } else if (user?.status == UserStatusEnum.Inactive) {
      setError("Usuário inativo")
    }
    setLoading(false)
  };

  const updateUser = async (userId: string) => {

    const newUser: UserModel = {
      ...loggedUser,
      id: userId,
      status: UserStatusEnum.Active,
    }

    const { user, error } = await UserService.updateUser(newUser);
    if (error) {
      setError("Falha ao atualizar o usuário")
      setConfirmPassword(false)
    } else if (user?.status == UserStatusEnum.Active) {
      setSession(
        {
          ...session,
          user
        }
      )
      setOpen(false);
      setConfirmPassword(false)
      navigate('/product');
    }
    setLoading(false)
  };

  const authUpdate = async (password: string) => {
    const { userId, error } = await AuthService.update(password);
    if (error) {
      console.log(`signUp:`, error)
      setError("Usuário não encontrado")
      setConfirmPassword(false)
      setLoading(false)
    } else {
      updateUser(userId ?? "0")
    }
  };

  const signIn = async (login: string, password: string) => {
    const { userId, error } = await AuthService.signIn(`${login}@gmail.com`, password);
    if (error) {
      console.log(`signIn:`, error)
      setError("Usuário não encontrado")
      setConfirmPassword(false)
      setLoading(false)
    } else {
      getUserById(userId ?? "0")
    }
  };

  const handleUser = useCallback((login, password) => {
    setLoading(true)
    if (isConfirmPassword) {
      authUpdate(password)
    } else {
      signIn(login, password)
    }
  }, [isConfirmPassword]);

  return (
    <>
      <LoginModal
        open={open}
        showConfirmPassword={isConfirmPassword}
        error={error}
        onBackClick={() => {
          setConfirmPassword(false)
        }}
        onClick={({ login, password }) => {
          handleUser(login, password);
        }}
      />

      <LoadingModal
        show={loading}
      />
    </>
  )
}

export { HomePage }