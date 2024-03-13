import { backward, forward, setValid } from '../common';
import ForwardSvg from '@/assets/annotation/toolHotKeyIcon/icon_next_kj.svg';

export const forwardWithEnter = {
  name: 'Save',
  icon: ForwardSvg,
  shortCut: ['Ctrl', 'Enter'],
};

const LLMShortCutTable = [setValid, backward, forward, forwardWithEnter];

export default LLMShortCutTable;
