import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import PropTypes from 'prop-types';

const FormButton = styled(MenuItem)`
  width: 220px;
  margin-bottom: 20px;
  transform: translateX(75px);
  color: ${({ theme, green }) => (green === 'true' ? theme.green : theme.menuBlue)};
  border: 2px solid ${({ theme, green }) => (green === 'true' ? theme.green : theme.menuBlue)};
  padding: 10px;
  text-align: center;
  @media screen and (max-width: 1920px) {
    padding: 5px;
    transform: translateX(0);
  }
`;

FormButton.propTypes = {
  green: PropTypes.string,
};

export default FormButton;
