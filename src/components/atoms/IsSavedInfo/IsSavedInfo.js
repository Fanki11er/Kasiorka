import styled from 'styled-components';
import PropTypes from 'prop-types';

const IsSavedInfo = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ theme, isSaved: { isSaved, moneyIsSaved } }) =>
    !isSaved || !moneyIsSaved ? theme.sundayRed : theme.green};
  align-self: center;
  margin: 10px;
  transition: background-color 0.5s;
  @media screen and (max-width: 1920px) {
    width: 12px;
    height: 12px;
  }
`;

IsSavedInfo.propTypes = {
  isSaved: PropTypes.object,
};
export default IsSavedInfo;
