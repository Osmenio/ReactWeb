import { useCallback, useEffect, useState } from 'react';
import { InfoModal, TopPageTitle, UserTable } from '../../component';
import { Button, Dropdown, Input } from 'semantic-ui-react';
import "./UserPage.scss"
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { UserModel, UserProfileEnum, UserStatusEnum } from '../../models';
import { UserModal } from '../../component/user-modal/UserModal';
import { UserService } from '../../services';
import { useSessionContext } from '../../providers';

enum UserActionEnum {
  None,
  Add,
  Update,
  // Reset,
}

const productStatus = Object.entries(UserStatusEnum).map(([key, value]) => ({
  key: key,
  text: value,
  value: value,
}));

const UserPage = () => {
  const { session } = useSessionContext();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<UserStatusEnum>();
  const [listUser, setListUser] = useState<UserModel[]>([]);
  const [listUserFilter, setListUserFilter] = useState<UserModel[]>([]);

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalPositiveBtn, setUserModalPositiveBtn] = useState('');
  const [userModalNegativeBtn, setUserModalNegativeBtn] = useState('');

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalSubtitle, setInfoModalSubtitle] = useState('');
  const [infoModalPositiveBtn, setInfoModalPositiveBtn] = useState('');
  const [infoModalNegativeBtn, setInfoModalNegativeBtn] = useState('');

  const [editUser, setEditUser] = useState<UserModel | undefined>();
  const [action, setAction] = useState(UserActionEnum.None);

  const handleFilterProducts = useCallback(() => {
    const list = (search.trim() === "" && !status)
      ? listUser
      : listUser.filter(p => {
        const matchDescription = search.trim() === "" || p.name.toLowerCase().includes(search.toLowerCase());
        const matchStatus = !status || p.status === status;
        return matchDescription && matchStatus;
      });
    setListUserFilter(list)
  }, [listUser, search, status]);

  // const handleEditProduct = useCallback(() => {
  //   setUserModalPositiveBtn("Salvar")
  //   setUserModalNegativeBtn("Cancelar")
  //   setUserModalOpen(true)
  // }, []);

  const getAllUsers = async () => {
    const { users, error } = await UserService.getAllUser();
    if (error) {
      console.log(`getAllUsers`, error)
      setAction(UserActionEnum.None)
      setInfoModalSubtitle(`Falha ao carregar os dados de usuários`)
      setInfoModalPositiveBtn("Ok")
      setInfoModalOpen(true)
    } else {
      const listAll = users.map((item): UserModel => ({
        id: item.id,
        name: item.name,
        login: item.login,
        password: item.password,
        profile: item.profile as UserProfileEnum,
        status: item.status as UserStatusEnum,
      }));
      const list = filterAdm(listAll.sort((a, b) => a.name.localeCompare(b.name)))
      setListUser(list || []);
      setListUserFilter(list || []);
    }
  };

  const addUser = async (user: UserModel) => {
    const newUser = {
      ...user,
      password: "123",
      status: UserStatusEnum.FirstAccess
    }
    const error = await UserService.addUser(newUser);
    if (error) {
      console.log(`addUser`, error)
      setAction(UserActionEnum.None)
      setInfoModalSubtitle(`Falha ao salvar o usuário`)
      setInfoModalPositiveBtn("Ok")
      setInfoModalOpen(true)
    }
    getAllUsers()
  };

  const updateUser = async (user: UserModel) => {
    const { error } = await UserService.updateUser(user);
    if (error) {
      console.log(`updateUser:`, error)
      setAction(UserActionEnum.None)
      setInfoModalSubtitle(`Falha ao atualizar o usuário`)
      setInfoModalPositiveBtn("Ok")
      setInfoModalOpen(true)
    }
    getAllUsers()
  };

  const resetUser = async (user: UserModel) => {
    const { error } = await UserService.updateUser(user);
    if (error) {
      console.log(`updateUser:`, error)
      setAction(UserActionEnum.None)
      setInfoModalSubtitle(`Falha ao atualizar o usuário`)
      setInfoModalPositiveBtn("Ok")
      setInfoModalOpen(true)
    }
    getAllUsers()
  };

  const filterAdm = (users: UserModel[]) => {
    return users.filter(p => p.name !== "Adm")
  }

  useEffect(() => {
    handleFilterProducts();
  }, [search, status]);

  useEffect(() => {
    getAllUsers();
  }, []);

  return <>
    <TopPageTitle
      title={"Usuários"}
      icon={faUsers}
    />

    <div
      className="products_header"
    >
      <div>
        <Input
          className="products_search"
          placeholder="Buscar ..."
          onChange={(event) => {
            setSearch(event.target.value)
          }}
        />

        <Dropdown
          style={{ marginLeft: '10px' }}
          clearable
          placeholder="Situação"
          selection
          options={productStatus}
          onChange={(_, data) => {
            const status = data.value as UserStatusEnum
            setStatus(status)
          }}
        />
      </div>

      <Button
        className="products_button"
        color='blue'
        onClick={() => {
          setAction(UserActionEnum.Add)
          setUserModalPositiveBtn("Salvar")
          setUserModalNegativeBtn("Cancelar")
          setUserModalOpen(true)
        }}
      >
        Adicionar
      </Button>
    </div>

    <div>
      <UserTable
        items={listUserFilter}
        onEdit={(item) => {
          setAction(UserActionEnum.Update)
          setEditUser(item)
          setUserModalPositiveBtn("Salvar")
          setUserModalNegativeBtn("Cancelar")
          setUserModalOpen(true)
        }}
        onChangeStatus={(item) => {
          setEditUser(item)
          setAction(UserActionEnum.Update)
          if (item.login === session.user?.login) {
            setInfoModalSubtitle(`Deseja resetar a senha desse usuário?`)
            setInfoModalPositiveBtn("Alterar")
          } else {
            const sts = item.status === UserStatusEnum.Inactive ? UserStatusEnum.FirstAccess : UserStatusEnum.Inactive
            const msg = sts === UserStatusEnum.Inactive ? "" : "\nIsso resetará a senha."
            setInfoModalSubtitle(`Deseja alterar o status desse usuário para ${sts}?${msg}`)
            setInfoModalPositiveBtn("Alterar")
          }
          setInfoModalNegativeBtn("Cancelar")
          setInfoModalOpen(true)
        }}
      // onChangePassword={(item) => {
      //   setEditUser(item)
      //   setAction(UserActionEnum.Reset)
      //   setInfoModalSubtitle(`Deseja resetar a senha desse usuário?`)
      //   setInfoModalPositiveBtn("Resetar")
      //   setInfoModalNegativeBtn("Cancelar")
      //   setInfoModalOpen(true)
      // }}
      />
    </div>

    <UserModal
      open={userModalOpen}
      title={action === UserActionEnum.Update ? 'Editar usuário' : 'Adicionar usuário'}
      item={action === UserActionEnum.Update ? editUser : undefined}
      positiveBtnText={userModalPositiveBtn}
      negativeBtnText={userModalNegativeBtn}
      onPositiveBtn={(item) => {
        setUserModalOpen(false)
        if (action === UserActionEnum.Add) {
          addUser(item)
        } else {
          console.log(`UserModal:editUser`, editUser)
          updateUser(item)
        }
      }}
      onNegativeBtn={() => {
        setUserModalOpen(false)
      }}
    />

    <InfoModal
      open={infoModalOpen}
      title='Atenção'
      subtitle={infoModalSubtitle}
      positiveBtnText={infoModalPositiveBtn}
      negativeBtnText={infoModalNegativeBtn}
      onPositiveBtn={() => {
        setInfoModalOpen(false)
        if (action === UserActionEnum.Update && editUser) {
          if (editUser.login === session.user?.login) {
            console.log(`FirstAccess`, editUser)
            updateUser({
              ...editUser,
              password: "123",
              status: UserStatusEnum.FirstAccess
            })
          } else {
            console.log(`Inactive`, editUser)
            updateUser({
              ...editUser,
              password: editUser.status === UserStatusEnum.Inactive ? "123" : editUser.password,
              status: editUser.status === UserStatusEnum.Inactive ? UserStatusEnum.FirstAccess : UserStatusEnum.Inactive
            })
          }
        }
      }}
      onNegativeBtn={() => {
        setInfoModalOpen(false)
      }}
    />
  </>
}

export {
  UserPage
}