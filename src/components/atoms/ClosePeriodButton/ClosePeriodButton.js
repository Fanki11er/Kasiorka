import styled from 'styled-components';
import MenuItem from '../../atoms/MenuItem/MenuItem';
import PropTypes from 'prop-types';

const ClosePeriodButton = styled(MenuItem)`
  min-width: 50%;
  max-width: 360px;
  margin: 15px 0 5px 0;
  transform: translateX(75px);

  color: ${({ theme, green }) => (green === 'true' ? theme.green : theme.menuBlue)};
  border: 2px solid ${({ theme, green }) => (green === 'true' ? theme.green : theme.menuBlue)};
  padding: 10px;
  text-align: center;
  @media screen and (max-width: 1920px) {
    padding: 5px;
  }
`;

ClosePeriodButton.propTypes = {
  green: PropTypes.string,
};

export default ClosePeriodButton;
