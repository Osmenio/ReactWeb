import { useCallback, useEffect, useState } from 'react';
import { InfoModal, TopPageTitle, UserTable } from '../../component';
import { Button, Dropdown, Input } from 'semantic-ui-react';
import "./UserPage.scss"
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { UserModel, UserStatusEnum } from '../../models';
import { ListUserMock } from '../../mock/user.mock';
import { UserModal } from '../../component/user-modal/UserModal';

const productStatus = Object.entries(UserStatusEnum).map(([key, value]) => ({
  key: key,
  text: value,
  value: value,
}));

const UserPage = () => {

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<UserStatusEnum>();
  const [listUser, setListUser] = useState<UserModel[]>(ListUserMock);

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalPositiveBtn, setUserModalPositiveBtn] = useState('');
  const [userModalNegativeBtn, setUserModalNegativeBtn] = useState('');

  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalSubtitle, setInfoModalSubtitle] = useState('');
  const [infoModalPositiveBtn, setInfoModalPositiveBtn] = useState('');
  const [infoModalNegativeBtn, setInfoModalNegativeBtn] = useState('');

  const [editUser, setEditUser] = useState<UserModel | undefined>();

  const handleFilterProducts = useCallback(() => {
    const list = (search.trim() === "" && !status)
      ? ListUserMock
      : ListUserMock.filter(p => {
        const matchDescription = search.trim() === "" || p.name.toLowerCase().includes(search.toLowerCase());
        const matchStatus = !status || p.status === status;
        return matchDescription && matchStatus;
      });
    setListUser(list)
  }, [search, status]);

  const handleEditProduct = useCallback(() => {
    setUserModalPositiveBtn("Salvar")
    setUserModalNegativeBtn("Cancelar")
    setUserModalOpen(true)
  }, []);

  useEffect(() => {
    handleFilterProducts();
  }, [search, status]);

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
          setEditUser(undefined)
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
        items={listUser}
        onEdit={(item) => {
          setEditUser(item)
          handleEditProduct()
        }}
        onBlock={(item) => {
          const sts = item.status == UserStatusEnum.Inactive ? UserStatusEnum.FirstAccess : UserStatusEnum.Inactive
          setInfoModalSubtitle(`Deseja alterar o status desse usuário para ${sts}?`)
          setInfoModalPositiveBtn("Alterar")
          setInfoModalNegativeBtn("Cancelar")
          setInfoModalOpen(true)
        }}
      />
    </div>

    <UserModal
      open={userModalOpen}
      title={editUser ? 'Editar produto' : 'Adicionar produto'}
      item={editUser}
      positiveBtnText={userModalPositiveBtn}
      negativeBtnText={userModalNegativeBtn}
      onPositiveBtn={(item) => {
        console.log(`item`, item)
        setUserModalOpen(false)
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