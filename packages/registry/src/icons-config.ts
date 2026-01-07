import {
  FaKeyboard,
  FaCircleInfo,
  FaBell,
  FaCompass,
  FaLayerGroup,
  FaArrowPointer,
  FaPuzzlePiece,
  FaTableCells,
  FaChartBar,
} from 'react-icons/fa6';

/**
 * Single source of truth for category icons.
 * Maps category IDs to both the icon component and its name.
 */
export const categoryIconConfig = {
  layout: { name: 'FaTableCells', component: FaTableCells },
  composition: { name: 'FaPuzzlePiece', component: FaPuzzlePiece },
  action: { name: 'FaArrowPointer', component: FaArrowPointer },
  input: { name: 'FaKeyboard', component: FaKeyboard },
  information: { name: 'FaCircleInfo', component: FaCircleInfo },
  feedback: { name: 'FaBell', component: FaBell },
  navigation: { name: 'FaCompass', component: FaCompass },
  container: { name: 'FaLayerGroup', component: FaLayerGroup },
  data: { name: 'FaChartBar', component: FaChartBar },
} as const;
