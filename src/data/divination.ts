/**
 * 蓍草大衍法 — Yarrow Stalk Divination Algorithm
 *
 * "大衍之数五十，其用四十有九"
 * 49 stalks, 3 changes per line, 6 lines per hexagram = 18 total operations
 */

export type YaoValue = 6 | 7 | 8 | 9;

export interface ChangeStep {
  total: number;       // stalks at start of this change
  left: number;        // left pile after split
  right: number;       // right pile after split
  hung: number;        // 1 stalk hung aside
  leftRemainder: number;
  rightRemainder: number;
  aside: number;       // total set aside this change
  remaining: number;   // stalks remaining after this change
}

export interface YaoResult {
  value: YaoValue;
  changes: [ChangeStep, ChangeStep, ChangeStep];
  isChanging: boolean; // 6 or 9 = changing line
  isYang: boolean;     // 7 or 9 = yang
}

export interface DivinationResult {
  yaos: YaoResult[];           // 6 lines, bottom to top
  binary: string;              // 6-char binary string
  changingBinary: string | null; // changed hexagram binary, or null
  hexNum: number;              // primary hexagram number (1-64)
  changingHexNum: number | null;
}

/**
 * Perform one "change" (变) of the yarrow stalk method
 */
function performOneChange(total: number): ChangeStep {
  // 分二: Split into two piles
  const left = Math.floor(Math.random() * (total - 2)) + 1;
  const right = total - left;

  // 挂一: Hang one from the right
  const hung = 1;
  const rightAfterHang = right - 1;

  // 揲四归奇: Count by fours, remainder goes aside
  const leftRemainder = left % 4 === 0 ? 4 : left % 4;
  const rightRemainder = rightAfterHang % 4 === 0 ? 4 : rightAfterHang % 4;

  const aside = hung + leftRemainder + rightRemainder;
  const remaining = total - aside;

  return { total, left, right, hung, leftRemainder, rightRemainder, aside, remaining };
}

/**
 * Divine one yao (爻) through 3 changes (三变)
 */
export function divineOneYao(): YaoResult {
  let total = 49;
  const changes: ChangeStep[] = [];

  for (let i = 0; i < 3; i++) {
    const step = performOneChange(total);
    changes.push(step);
    total = step.remaining;
  }

  // Result: total / 4 gives the yao value
  // Possible values: 24→6(老阴), 28→7(少阳), 32→8(少阴), 36→9(老阳)
  const value = (total / 4) as YaoValue;

  return {
    value,
    changes: changes as [ChangeStep, ChangeStep, ChangeStep],
    isChanging: value === 6 || value === 9,
    isYang: value === 7 || value === 9,
  };
}

/**
 * Perform a complete divination — 6 yao lines
 */
export function performDivination(): DivinationResult {
  const yaos: YaoResult[] = [];

  // Divine 6 lines (bottom to top)
  for (let i = 0; i < 6; i++) {
    yaos.push(divineOneYao());
  }

  // Build binary: yang=1, yin=0
  const binary = yaos.map(y => y.isYang ? '1' : '0').join('');

  // Build changing hexagram if any changing lines
  const hasChanging = yaos.some(y => y.isChanging);
  let changingBinary: string | null = null;

  if (hasChanging) {
    changingBinary = yaos.map(y => {
      if (y.value === 9) return '0'; // old yang → yin
      if (y.value === 6) return '1'; // old yin → yang
      return y.isYang ? '1' : '0';  // unchanged
    }).join('');
  }

  // Find hexagram number from hexagramsData (imported at call site)
  return {
    yaos,
    binary,
    changingBinary,
    hexNum: 0,  // to be resolved by caller
    changingHexNum: null,
  };
}

/**
 * Get yao label based on value
 */
export function getYaoLabel(value: YaoValue): { cn: string; en: string; symbol: string } {
  switch (value) {
    case 6: return { cn: '老阴 ⚋ (变)', en: 'Old Yin (changing)', symbol: '⚋' };
    case 7: return { cn: '少阳 ⚊', en: 'Young Yang', symbol: '⚊' };
    case 8: return { cn: '少阴 ⚋', en: 'Young Yin', symbol: '⚋' };
    case 9: return { cn: '老阳 ⚊ (变)', en: 'Old Yang (changing)', symbol: '⚊' };
  }
}
