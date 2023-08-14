import { StyledLinksDiv, StyledNavigation } from './Header.styled';

import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../assets/images/vetbeeIcon.svg';

const Header = () => {
  // const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const links = [
    { title: 'Pets', to: '/' },
    { title: 'Medications', to: '/medications' },
  ];

  return (
    <>
      <StyledNavigation>
        <Link component={RouterLink} to='/'>
          <img src={logo} alt='vetbee logo' />
        </Link>
        <StyledLinksDiv>
          {links.map((link) => (
            <Link
              key={link.title}
              underline='none'
              fontWeight={600}
              component={RouterLink}
              to={link.to}
            >
              {link.title}
            </Link>
          ))}
        </StyledLinksDiv>
      </StyledNavigation>
      {/* <StyledTitleDiv>
        <Typography variant="h3">{routeData().title}</Typography>
        <StyledLinksDiv>
          <Box alignSelf="center">
            <Typography paragraph>Toggle dark mode</Typography>
            <Switch checked={darkMode} onChange={toggleDarkMode} />
          </Box>
        </StyledLinksDiv>
        <StyledLinksDiv>
          {routeData().buttons.map((button) => (
            <Button key={button} variant="contained">
              {button}
            </Button>
          ))}
        </StyledLinksDiv>
      </StyledTitleDiv> */}
    </>
  );
};

export default Header;
