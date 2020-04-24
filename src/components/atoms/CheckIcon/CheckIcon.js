import styled from 'styled-components';
import { Check } from 'styled-icons/fa-solid/';
const CHeckIcon = styled(Check)`
  width: 25%;
  margin-left: 5px;
  opacity: 1;
  transition: opacity 0.5s;

  &.notActiveIcon {
    color: gray;
    opacity: 0.5;
  }
`;

export default CHeckIcon;
