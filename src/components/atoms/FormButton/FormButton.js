import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/MenuItem';

const FormButton = styled(MenuItem)`
  width: 220px;
  margin-bottom: 20px;
  transform: translateX(75px);
  color: ${({ theme, green }) => (green === 'true' ? theme.green : theme.menuBlue)};
  border: 2px solid ${({ theme, green }) => (green === 'true' ? theme.green : theme.menuBlue)};
  padding: 10px;
  text-align: center;
`;

export default FormButton;
