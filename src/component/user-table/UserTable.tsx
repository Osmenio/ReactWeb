import { forwardRef } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import './UserTable.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserModel, UserStatusEnum } from '../../models';

interface UserTableProps {
  items: UserModel[];
  onEdit?: (item: UserModel) => void;
  onBlock?: (item: UserModel) => void;
}

const UserTable = forwardRef((props: UserTableProps, ref) => {
  const {
    items,
    onEdit = () => { },
    onBlock = () => { },
  } = props;

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
              width={6}
            >
              Usuário
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
              <>
                Ações
              </>
            </TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((item, index) => {

            return (<TableRow
              key={index}
            >
              <TableCell>
                {item.name}
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
                <FontAwesomeIcon
                  icon={faPen}
                  onClick={() => onEdit(item)} />

                <FontAwesomeIcon
                  icon={faLock}
                  color='red'
                  style={{ marginLeft: '10px' }}
                  onClick={() => onBlock(item)} />
              </TableCell>
            </TableRow>)
          })}
        </TableBody>
      </Table>
    </div>
  );
});

export { UserTable };

