import { forwardRef } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import './ProductsTable.scss';
import { ListProductsMock } from '../../mock/product.mock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductModel, UserProfileEnum } from '../../models';
import { decimalFormat } from '../../utils/format-utils';
import { ProductStatusEnum } from '../../models/product-status.enum';
import { useSessionContext } from '../../providers';

interface ProductsTableProps {
  items: ProductModel[];
  onEdit?: (item: ProductModel) => void;
  onDelete?: (item: ProductModel) => void;
}

const ProductsTable = forwardRef((props: ProductsTableProps, ref) => {
  const { session } = useSessionContext();
  
  const {
    items,
    onEdit = () => { },
    onDelete = () => { },
  } = props;

  const products = ListProductsMock.map(item => ({
    key: item.description,
    value: item.description,
    text: item.description,
  }));

  const getStatusColor = (status: ProductStatusEnum): string => {
    switch (status) {
      case ProductStatusEnum.InStock: return 'green';
      case ProductStatusEnum.OutOfStock: return 'red';
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
              Produtos
            </TableHeaderCell>
            <TableHeaderCell
              className="table_header"
              width={2}
              textAlign='center'
            >
              Status
            </TableHeaderCell>

            {session?.user?.profile == UserProfileEnum.Admin &&
              <TableHeaderCell
                className="table_header"
                width={1}
                textAlign='center'
              >
                <>Valor<br />Compra</>
              </TableHeaderCell>
            }
            <TableHeaderCell
              className="table_header"
              width={1}
              textAlign='center'
            >
              <>Valor <br />Pix</>
            </TableHeaderCell>
            <TableHeaderCell
              className="table_header"
              width={1}
              textAlign='center'
            >
              <>Valor <br /> Débito</>
            </TableHeaderCell>
            <TableHeaderCell
              className="table_header"
              width={1}
              textAlign='center'
            >
              <>Valor <br /> Crédito</>
            </TableHeaderCell>
            <TableHeaderCell
              className="table_header"
              width={1}
              textAlign='center'
            >
              <>Ações</>
            </TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((item, index) => {

            return (
              <TableRow
                key={index}
              >
                <TableCell>
                  {item.description}
                </TableCell>
                <TableCell
                  textAlign='center'
                  style={{ color: getStatusColor(item.status) }}
                >
                  {item.status}
                </TableCell>

                {session?.user?.profile == UserProfileEnum.Admin &&
                  <TableCell textAlign='center' >
                    {decimalFormat(item.buyPrice)}
                  </TableCell>
                }

                <TableCell textAlign='center' >
                  {decimalFormat(item.priceOne)}
                </TableCell>
                <TableCell textAlign='center' >
                  {decimalFormat(item.priceTwo)}
                </TableCell>
                <TableCell textAlign='center' >
                  {decimalFormat(item.priceThree)}
                </TableCell>
                <TableCell textAlign='center' >

                  <FontAwesomeIcon
                    icon={faPen}
                    onClick={() => onEdit(item)} />

                  <FontAwesomeIcon
                    icon={faTrash}
                    color='red'
                    style={{ marginLeft: '10px' }}
                    onClick={() => onDelete(item)} />

                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  );
});

export { ProductsTable };