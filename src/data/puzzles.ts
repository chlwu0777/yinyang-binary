export interface Puzzle {
  start: number;
  target: number;
  max: number;
  hint: string;
  hintEn: string;
}

export const puzzles: Puzzle[] = [
  { start: 0, target: 1, max: 1, hint: '翻转一比特', hintEn: 'Flip one bit' },
  { start: 0, target: 7, max: 3, hint: '抵达流动态', hintEn: 'Reach flow state' },
  { start: 0, target: 63, max: 6, hint: '全激活', hintEn: 'Full activation' },
  { start: 63, target: 0, max: 6, hint: '回归原点', hintEn: 'Return to origin' },
  { start: 21, target: 42, max: 6, hint: '取反', hintEn: 'Bitwise invert' },
  { start: 1, target: 62, max: 5, hint: '差一步', hintEn: 'One step away' },
  { start: 36, target: 27, max: 6, hint: '镜像', hintEn: 'Mirror' },
  { start: 0, target: 21, max: 3, hint: '完成在望', hintEn: 'Almost done' },
];
