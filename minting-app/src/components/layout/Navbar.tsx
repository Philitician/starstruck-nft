import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import Link from '../../Link';
const ConnectWallet = dynamic(() => import('./ConnectWallet'), { ssr: false });

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ mx: 3 }}>
          <Typography
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            variant='h6'
            component={Link}
            noLinkStyle
            href='/'
          >
            STARSTRUCK
          </Typography>
          <Button component={Link} href='/' color='inherit'>
            Home
          </Button>
          <Button component={Link} href='/owner' color='inherit'>
            Owner
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <ConnectWallet />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
