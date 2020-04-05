import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormLabel = styled.label`
  min-width: ${({ custom }) => (custom ? '400px' : '550px')};
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

  @media screen and (max-width: 1920px) {
    height: 35px;
    font-size: ${({ theme }) => theme.fontSizeMedium.medium};
    min-width: ${({ custom }) => (custom ? '300px' : '380px')};
    padding: 15px 10px;
  }

  @media screen and (max-width: 767px) {
    min-width: 90%;
    width: 92%;
    padding: 15px 10px;
    height: 47px;
  }
`;

FormLabel.propTypes = {
  custom: PropTypes.bool,
};

FormLabel.defaultProps = {
  custom: false,
};
export default FormLabel;
