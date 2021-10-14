import DrawPointSvg from '@/assets/annotation/toolHotKeyIcon/icon_point_kj.svg'
import DrawInvalidPointSvg from '@/assets/annotation/toolHotKeyIcon/icon_pointNull_kj.svg'
import SelectedPointSvg from '@/assets/annotation/toolHotKeyIcon/icon_pointActive_kj.svg'
import DeletePointSvg from '@/assets/annotation/toolHotKeyIcon/icon_del_kj.svg'
import MouseLeftSvg from '@/assets/annotation/toolHotKeyIcon/icon_mouse_left_kj.svg';
import MouseRightSvg from '@/assets/annotation/toolHotKeyIcon/icon_mouse_right_kj.svg';

import {
  backward,
  dargWithRightClick,
  forward,
  fullScreen,
  restore,
  revoke,
  rotate,
  scale,
  tabChangeSelected,
  tabReverseChangeSelected,
} from '../common';

export const drawPoint = {
  name: '标点',
  icon: DrawPointSvg,
  shortCut: [MouseLeftSvg],
};

export const drawInvalidPoint = {
  name: '标无效点',
  icon: DrawInvalidPointSvg,
  shortCut: ['Ctrl', MouseLeftSvg],
};

export const selectPoint = {
  name: '选中点',
  icon: SelectedPointSvg,
  shortCut: [MouseRightSvg],
  noticeInfo: '右击',
};

export const deletePoint = {
  name: '删除点',
  icon: DeletePointSvg,
  shortCut: ['Del'],
};

const pointToolShortCutTable = [
  drawPoint,
  drawInvalidPoint,
  selectPoint,
  deletePoint,

  revoke,
  restore,
  rotate,
  scale,
  // fullScreen,
  backward,
  forward,
  dargWithRightClick,
  tabChangeSelected,
  tabReverseChangeSelected,
];
export default pointToolShortCutTable;
