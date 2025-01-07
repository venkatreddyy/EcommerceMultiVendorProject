import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Menu, MenuItem, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchSellerOrders, updateOrderStatus } from '../../../Redux Toolkit/Seller/sellerOrderSlice';
import { Order, OrderItem } from '../../../types/orderTypes';
import { fetchTransactionsBySeller } from '../../../Redux Toolkit/Seller/transactionSlice';
import { Transaction } from '../../../types/Transaction';
import { redableDateTime } from '../../../util/redableDateTime';



const orderStatusColor = {
  PENDING: { color: '#FFA500', label: 'PENDING' }, // Orange
  SHIPPED: { color: '#1E90FF', label: 'SHIPPED' }, // DodgerBlue
  DELIVERED: { color: '#32CD32', label: 'DELIVERED' }, // LimeGreen
  CANCELLED: { color: '#FF0000', label: 'CANCELLED' } // Red
};

export default function TransactionTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { sellerOrder, transaction } = useAppSelector(store => store);
  const dispatch = useAppDispatch();



  React.useEffect(() => {
    dispatch(fetchTransactionsBySeller(localStorage.getItem("jwt") || ""));
  }, [dispatch]);



  return (
    <>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Customer Details</TableCell>
              <TableCell>Order</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transaction.transactions.map((item: Transaction) => (
              <TableRow key={item.id}>
                <TableCell align="left"><div className='space-y-1'>
                  <h1 className='font-medium'>{redableDateTime(item.date).split("at")[0]}</h1>
                  <h1 className='text-xs text-gray-600 font-semibold'>{redableDateTime(item.date).split("at")[1]}</h1>
                  </div></TableCell>
                <TableCell component="th" scope="row">
                  <div className='space-y-2'>
                    <h1>{item.customer.fullName}</h1>
                    <h1 className='font-semibold'>{item.customer.email}</h1>
                    <h1 className='font-bold text-gray-600'>{item.customer.mobile}</h1>
                  </div>
                </TableCell>
                <TableCell>
                  Order Id : <strong> {item.order.id} </strong> 
                </TableCell>
                <TableCell
                  align="right">
                  ₹{item.order.totalSellingPrice}
                </TableCell>
                {/* <TableCell align="right">
                  <Button
                    size='small'
                    onClick={(e) => handleClick(e, item.id)}
                    color='primary'
                    className='bg-primary-color'>
                    Status
                  </Button>
                  <Menu
                    id={`status-menu ${item.id}`}
                    anchorEl={anchorEl[item.id]}
                    open={Boolean(anchorEl[item.id])}
                    onClose={() => handleClose(item.id)}
                    MenuListProps={{
                      'aria-labelledby': `status-menu ${item.id}`,
                    }}
                  >
                    {orderStatus.map((status) =>
                      <MenuItem 
                      key={status.label} 
                      onClick={() => handleUpdateOrder(item.id, status.label)}>
                        {status.label}</MenuItem>
                    )}
                  </Menu>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
