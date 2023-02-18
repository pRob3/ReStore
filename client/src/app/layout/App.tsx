import { Container, CssBaseline } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from '../context/StoreContext';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [setBasket]);

  const [darkMode, setDarkMode] = useState(false);
  const palletType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: palletType,
      background: {
        default: darkMode ? '#121212' : '#eaeaea',
      },
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  if (loading) return <LoadingComponent message='Initialising app...' />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
