import { Button, Divider, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography gutterBottom variant='h3'>
        Oops - we've looked everywhere but couldn't find this.
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to='/catalog'>
        Go back to shop
      </Button>
    </Container>
  );
}