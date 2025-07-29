import { useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { LoginModal } from '../component';
import { UserService } from '../services/UserService';
import { UserModel, UserProfileEnum, UserStatusEnum } from '../models';
import { useSessionContext } from '../providers';

const HomePage = () => {
  const { session, setSession } = useSessionContext();

  const [open, setOpen] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [isConfirmPassword, setConfirmPassword] = useState(false);
  const [loggedUser, setLoggerUser] = useState<UserModel | undefined>();

  const navigate = useNavigate();

  const getUser = async (login: string, pwd: string) => {
    console.log(`getUser`)
    const { user, error } = await UserService.getUser(login, pwd);
    console.log(`getUser:`, user, session)
    if (error) {
      setError("Usuário não encontrado")
      setConfirmPassword(false)
    } else if (user?.status == UserStatusEnum.FirstAccess) {
      setLoggerUser(user)
      setError("")
      setConfirmPassword(true)
    } else if (user?.status == UserStatusEnum.Active) {
      console.log(`getUser.session:`, session)
      setSession(
        {
          ...session,
          user
        }
      )
      setLoggerUser(user)
      setOpen(false);
      setConfirmPassword(false)
      navigate('/product');
    } else if (user?.status == UserStatusEnum.Inactive) {
      setError("Usuário não encontrado")
    }
  };

  const updateUser = async (login: string, pwd: string) => {

    const newUser: UserModel = {
      id: loggedUser?.id ?? 0,
      name: loggedUser?.name ?? "",
      login: login,
      password: pwd,
      profile: loggedUser?.profile ?? UserProfileEnum.Sales,
      status: UserStatusEnum.Active
    }

    const { user, error } = await UserService.updateUser(newUser);
    if (error) {
      setError("Falha ao salvar usuário")
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
  };

  const handleUser = useCallback((login, password) => {
    if (isConfirmPassword) {
      updateUser(login, password)
    } else {
      getUser(login, password)
    }
  }, [isConfirmPassword]);

  return (
    <>
      <LoginModal
        open={open}
        showConfirmPassword={isConfirmPassword}
        error={error}
        onClick={({ login, password }) => {
          handleUser(login, password);
        }}
      />
    </>
  )
}

export { HomePage }