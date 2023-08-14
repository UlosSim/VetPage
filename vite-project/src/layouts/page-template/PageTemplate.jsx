import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { Outlet } from 'react-router-dom';
import { StyledContainer } from './PageTemplateStyled';

const PageTemplate = () => {
  return (
    <StyledContainer>
      <Header />
      <Outlet />
      <Footer />
    </StyledContainer>
  );
};

export default PageTemplate;
