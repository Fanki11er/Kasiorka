import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormLabel = styled.label`
  min-width: ${({ custom }) => (custom ? custom : '550px')};
  width: 70%;
  height: 65px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.menuBlue};
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  display: flex;
  justify-content: space-around;
  font-weight: bold;
  border: 2px solid ${({ theme }) => theme.menuBlue};
  border-radius: 10px;
  padding: 15px 20px;
  align-items: center;
`;

FormLabel.propTypes = {
  custom: PropTypes.string,
};
export default FormLabel;
