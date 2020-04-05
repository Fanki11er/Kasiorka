import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: relative;
  display: flex;
  min-width: 500px;
  width: 28%;
  height: 475px;
  border: 3px solid ${({ theme }) => theme.menuBlue};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.primaryTransparent};
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1920px) {
    min-width: 450px;
    height: 300px;
    width: 35%;
    max-width: 500px;
  }
  @media screen and (max-width: 767px) {
    min-width: 340px;
    max-width: 450px;
  }
`;

export default ModalWrapper;
