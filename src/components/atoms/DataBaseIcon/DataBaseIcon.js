import styled from 'styled-components';
import { Database2 } from 'styled-icons/remix-fill/';

const DataBaseIcon = styled(Database2)`
  width: 25%;
  opacity: 1;
  transition: opacity 0.5s;

  &.notActiveIcon {
    color: gray;
    opacity: 0.5;
  }
`;

export default DataBaseIcon;
