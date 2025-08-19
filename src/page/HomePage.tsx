import { useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { LoadingModal, LoginModal } from '../component';
import { UserService } from '../services/UserService';
import { DefaultUserModel, UserModel, UserProfileEnum, UserStatusEnum } from '../models';
import { useSessionContext } from '../providers';
import { AuthService } from '../services';

const HomePage = () => {
  const { session, setSession } = useSessionContext();

  const [open, setOpen] = useState<boolean>(true);
  // const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isConfirmPassword, setConfirmPassword] = useState(false);
  // const [loggedUser, setLoggerUser] = useState<UserModel | undefined>();
  const [loggedUser, setLoggerUser] = useState(DefaultUserModel);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const getUserById = async (userId: string) => {
    console.log(`getUserById:`, userId)
    const { user, error } = await UserService.getUserById(userId);
    console.log(`getUserById:`, user, session)
    if (error) {
      setError("Usuário não encontrado")
      setConfirmPassword(false)
    } else if (user?.status == UserStatusEnum.FirstAccess) {
      setLoggerUser(user)
      // setTitle("Primeiro acesso. Por favor, altere a senha.")
      setError("")
      setConfirmPassword(true)
    } else if (user?.status == UserStatusEnum.Active) {
      console.log(`getUserById.session:`, session)
      setSession(
        {
          ...session,
          user
        }
      )
      // setLoggerUser(user)
      setOpen(false);
      setConfirmPassword(false)
      navigate('/product');
    } else if (user?.status == UserStatusEnum.Inactive) {
      setError("Usuário não encontrado")
    }
    setLoading(false)
  };

  // const getUser = async (login: string, pwd: string) => {
  //   console.log(`getUser`)
  //   const { user, error } = await UserService.getUser(login, pwd);
  //   console.log(`getUser:`, user, session)
  //   if (error) {
  //     setError("Usuário não encontrado")
  //     setConfirmPassword(false)
  //   } else if (user?.status == UserStatusEnum.FirstAccess) {
  //     setLoggerUser(user)
  //     setError("")
  //     setConfirmPassword(true)
  //   } else if (user?.status == UserStatusEnum.Active) {
  //     console.log(`getUser.session:`, session)
  //     setSession(
  //       {
  //         ...session,
  //         user
  //       }
  //     )
  //     setLoggerUser(user)
  //     setOpen(false);
  //     setConfirmPassword(false)
  //     navigate('/product');
  //   } else if (user?.status == UserStatusEnum.Inactive) {
  //     setError("Usuário não encontrado")
  //   }
  //   setLoading(false)
  // };

  const updateUser = async (userId: string, pwd: string) => {

    const newUser: UserModel = {
      // ...session.user,
      // ...(session.user ? { session.user } : { id: 0 }),
      ...loggedUser,
      id: userId,
      password: pwd,
      status: UserStatusEnum.Active,
      profile: UserProfileEnum.Admin
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

  // const handleUser = useCallback((login, password) => {
  //   setLoading(true)
  //   if (isConfirmPassword) {
  //     updateUser(login, password)
  //   } else {
  //     getUser(login, password)
  //   }
  // }, [isConfirmPassword]);


  const authUpdate = async (login: string, pwd: string) => {
    // console.log(`signUp:login:`, login)
    // console.log(`signUp:pwd:`, pwd)

    const { userId, error } = await AuthService.update(pwd);
    if (error) {
      console.log(`signUp:`, error)
      setError("Usuário não encontrado")
      setConfirmPassword(false)
      setLoading(false)
    } else {
      updateUser(userId ?? "0", pwd)
    }
  };

  const signIn = async (login: string, pwd: string) => {
    // console.log(`signUp:login:`, login)
    // console.log(`signUp:pwd:`, pwd)

    const { userId, error } = await AuthService.signIn(`${login}@gmail.com`, pwd);
    if (error) {
      console.log(`signIn:`, error)
      setError("Usuário não encontrado")
      setConfirmPassword(false)
      setLoading(false)
    } else {
      getUserById(userId ?? "0")
      // setSession(
      //   {
      //     ...session,
      //     user: DefaultUserModel
      //   }
      // )
      // navigate('/product');
    }
    // setLoading(false)
  };

  const handleUser = useCallback((login, password) => {
    setLoading(true)
    // signIn(login, password)
    if (isConfirmPassword) {
      authUpdate(login, password)
    } else {
      signIn(login, password)
    }
  }, [isConfirmPassword]);

  return (
    <>
      <LoginModal
        open={open}
        // title={title}
        showConfirmPassword={isConfirmPassword}
        error={error}
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