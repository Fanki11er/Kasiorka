import styled from 'styled-components';

const StyledInfo = styled.div`
  width: 30%;
  height: 100%;
  color: ${({ theme }) => theme.green};
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  padding: 10px;
  text-align: center;
  user-select: none;

  @media screen and (max-width: 1920px) {
    font-size: ${({ theme }) => theme.fontSizeMedium.small};
    padding: 3px;
  }
`;

export default StyledInfo;
