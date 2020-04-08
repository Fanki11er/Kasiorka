import styled from 'styled-components';
import PropTypes from 'prop-types';
const ExpensesSign = styled.div`
  color: ${({ children, theme }) => (children === '-' ? theme.sundayRed : theme.green)};
  font-size: 1.5em;
  width: 10%;
  text-align: center;
  transition: color 0.2s;
  user-select: none;

  @media screen and (max-width: 770px) {
    width: 6%;
  }
`;

ExpensesSign.propTypes = {
  children: PropTypes.node,
};

export default ExpensesSign;
