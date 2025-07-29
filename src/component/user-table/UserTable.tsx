import { forwardRef } from 'react';
import { Popup, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import './UserTable.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCheckDouble, faKey, faPen } from '@fortawesome/free-solid-svg-icons';
import { UserModel, UserStatusEnum } from '../../models';
import { useSessionContext } from '../../providers';

interface UserTableProps {
  items: UserModel[];
  onEdit?: (item: UserModel) => void;
  onChangeStatus?: (item: UserModel) => void;
}

const UserTable = forwardRef((props: UserTableProps, ref) => {
  const {
    items,
    onEdit = () => { },
    onChangeStatus = () => { },
  } = props;

  const { session } = useSessionContext();

  const getStatusColor = (status: UserStatusEnum): string => {
    switch (status) {
      case UserStatusEnum.Active: return 'green';
      case UserStatusEnum.Inactive: return 'red';
      default: return 'inherit';
    }
  };

  return (
    <div>
      <Table
        className="table_print"
        celled
      >
        <TableHeader>
          <TableRow>
            <TableHeaderCell
              className="table_header"
              width={3}
            >
              Usuário
            </TableHeaderCell>
            <TableHeaderCell
              className="table_header"
              width={3}
              textAlign='center'
            >
              Login
            </TableHeaderCell>
            <TableHeaderCell
              className="table_header"
              width={3}
              textAlign='center'
            >
              Perfil
            </TableHeaderCell>
            <TableHeaderCell
              className="table_header"
              width={3}
              textAlign='center'
            >
              Status
            </TableHeaderCell>

            <TableHeaderCell
              className="table_header"
              width={3}
              textAlign='center'
            >
              Ações
            </TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((item, index) => {

            const isActive = item.status === UserStatusEnum.Active || item.status === UserStatusEnum.FirstAccess
            const msg = item.login === session.user?.login ? 'Resetar Senha' : isActive ? 'Inativar usuário' : 'Ativar usuário'
            const icon = item.login === session.user?.login ? faKey : isActive ? faBan : faCheckDouble
            const iconColor = item.login === session.user?.login ? 'black' : isActive ? 'red' : 'green'

            return (<TableRow
              key={index}
            >
              <TableCell>
                {item.name}
              </TableCell>
              <TableCell>
                {item.login}
              </TableCell>
              <TableCell textAlign='center' >
                {item.profile}
              </TableCell>
              <TableCell
                textAlign='center'
                style={{ color: getStatusColor(item.status) }}
              >
                {item.status}
              </TableCell>

              <TableCell textAlign='center' >

                <Popup
                  content='Editar usuário'
                  position='bottom center'
                  trigger={
                    <FontAwesomeIcon
                      icon={faPen}
                      color={item.login === session.user?.login ? 'gray' : 'black'}
                      onClick={() => {
                        if (item.login !== session.user?.login) onEdit(item)
                      }} />
                  } />

                <Popup
                  content={msg}
                  position='bottom center'
                  trigger={
                    <FontAwesomeIcon
                      icon={icon}
                      color={iconColor}
                      style={{ marginLeft: '10px' }}
                      onClick={() => onChangeStatus(item)} />
                  } />

                {/* <Popup
                  content={isActive ? 'Inativar usuário' : 'Ativar usuário'}
                  position='bottom center'
                  trigger={
                    <FontAwesomeIcon
                      icon={isActive ? faBan : faCheckDouble}
                      color={isActive ? 'red' : 'green'}
                      style={{ marginLeft: '10px' }}
                      onClick={() => onChangeStatus(item)} />
                  } /> */}
              </TableCell>
            </TableRow>)
          })}
        </TableBody>
      </Table>
    </div>
  );
});

export { UserTable };

