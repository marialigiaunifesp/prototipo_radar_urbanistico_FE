import styled from 'styled-components';
import theme from '../../configs/theme';

const LoginContainer = styled.section`
  max-width: 360px;
  background: ${theme.palette.background.paper};
  margin: 15px auto;
  border-radius: 5px;
  padding: 2%;
  align-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default LoginContainer;
