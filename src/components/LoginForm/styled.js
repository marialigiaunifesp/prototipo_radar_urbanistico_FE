import styled from 'styled-components';
import theme from '../../configs/theme';

export const LoginContainer = styled.section`
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const Title = styled.h3`
  color: #25231e;
  margin-bottom: 5%;
`;
