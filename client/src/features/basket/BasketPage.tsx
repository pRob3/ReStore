import { Add, Delete, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import agent from '../../app/api/agent';
import { useStoreContext } from '../../app/context/StoreContext';
import BasketSummary from './BasketSummary';

export default function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: '',
  });

  function handleAddItem(productId: number, name: string) {
    setStatus({ loading: true, name: name });
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: '' }));
  }

  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    setStatus({ loading: true, name: name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: '' }));
  }

  if (!basket) return <Typography variant='h3'>Basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='center'>Quantity</TableCell>
              <TableCell align='right'>Subtotal</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <Box display='flex' alignItems='center'>
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    {item.name}
                    <span></span>
                  </Box>
                </TableCell>
                <TableCell align='right'>
                  ${(item.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align='center'>
                  <LoadingButton
                    loading={
                      status.loading && status.name === 'rem' + item.name
                    }
                    onClick={() =>
                      handleRemoveItem(item.productId, 1, 'rem' + item.name)
                    }
                    color='error'
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={
                      status.loading && status.name === 'add' + item.name
                    }
                    onClick={() =>
                      handleAddItem(item.productId, 'add' + item.name)
                    }
                    color='secondary'
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align='right'>
                  ${((item.price / 100) * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align='right'>
                  <LoadingButton
                    loading={
                      status.loading && status.name === 'del' + item.name
                    }
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        item.quantity,
                        'del' + item.name
                      )
                    }
                    color='error'
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>
    </>
  );
}
