import styled from 'styled-components';

const MainPageSectionLabel = styled.label`
  color: ${({ theme }) => theme.menuBlue};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.verySmall};
  margin-left: 20px;
  user-select: none;

  @media screen and (max-width: 560px) {
    margin-left: 0;
    text-align: center;
  }
`;

export default MainPageSectionLabel;
