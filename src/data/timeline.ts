export interface TimelineMilestone {
  year: string;
  titleCn: string;
  titleEn: string;
  descCn: string;
  descEn: string;
  icon: string;
  binary?: string;
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    year: '~5000 BCE',
    titleCn: '太极',
    titleEn: 'Taiji — The Supreme Ultimate',
    descCn: '万物起源于混沌统一的太极。无极生太极，一即是全，全即是一。这是人类最早的"初始状态"概念。',
    descEn: 'All things originate from the undifferentiated Taiji. From nothingness emerges the ultimate — the first concept of an "initial state."',
    icon: '☯',
  },
  {
    year: '~5000 BCE',
    titleCn: '阴阳两仪 — 宇宙的第一次二分',
    titleEn: 'Yin-Yang — The First Binary Split',
    descCn: '太极动而生阳，静而生阴。宇宙从此有了二元对立：明与暗、刚与柔、有与无。这是 0 和 1 最古老的哲学原型。',
    descEn: 'Taiji divides into Yang (active) and Yin (receptive). The universe gains its first binary opposition: light and dark, firm and yielding. The oldest philosophical prototype of 0 and 1.',
    icon: '◑',
    binary: '0 · 1',
  },
  {
    year: '~3000 BCE',
    titleCn: '伏羲画八卦 — 3-bit 编码系统',
    titleEn: "Fu Xi's Eight Trigrams — 3-bit Encoding",
    descCn: '伏羲仰观天文、俯察地理，以阴爻(- -)和阳爻(——)三叠而成八卦。八个符号编码天、地、雷、风、水、火、山、泽，这是人类第一个3位二进制编码系统。',
    descEn: 'Fu Xi observed heaven and earth, stacking Yin (broken) and Yang (solid) lines into 8 trigrams. Eight symbols encoding nature — humanity\'s first 3-bit binary encoding system.',
    icon: '☰',
    binary: '000 → 111',
  },
  {
    year: '~1050 BCE',
    titleCn: '周文王推演六十四卦 — 6-bit 完整状态空间',
    titleEn: "King Wen's 64 Hexagrams — 6-bit State Space",
    descCn: '文王被囚羑里，将八卦两两重叠推演出六十四卦，创造了一个完整的6位二进制状态空间（2^6 = 64）。每一卦都是一种宇宙状态的编码。',
    descEn: 'Imprisoned for seven years, King Wen combined trigram pairs into 64 hexagrams — a complete 6-bit state space (2^6 = 64). Each hexagram encodes a state of the cosmos.',
    icon: '䷀',
    binary: '000000 → 111111',
  },
  {
    year: '1011-1077',
    titleCn: '邵雍"加一倍法" — 比莱布尼茨早600年',
    titleEn: "Shao Yong's Doubling Method — 600 Years Before Leibniz",
    descCn: '北宋大儒邵雍发现"一分为二，二分为四，四分为八"的加一倍法，这与二进制的数学结构完全一致。他用先天图序排列六十四卦，从 000000 到 111111，与今日的二进制计数不谋而合。',
    descEn: 'Song Dynasty scholar Shao Yong discovered the "doubling method" — one divides into two, two into four. His Earlier Heaven arrangement orders hexagrams from 000000 to 111111, identical to binary counting.',
    icon: '数',
  },
  {
    year: '1703',
    titleCn: '莱布尼茨 — 东西方智慧的交汇',
    titleEn: 'Leibniz — Where East Meets West',
    descCn: '德国数学家莱布尼茨发表二进制算术论文。当法国传教士白晋寄来邵雍的先天六十四卦方圆图时，莱布尼茨惊讶地发现：六十四卦与二进制数 0-63 完美对应。他写道："1和0，这个不可思议的万有起源的秘密。"',
    descEn: 'Leibniz published his binary arithmetic. When missionary Bouvet sent Shao Yong\'s hexagram diagram, Leibniz was astonished: hexagrams perfectly correspond to binary 0-63. He wrote: "1 and 0 — the wonderful origin of all things."',
    icon: '01',
  },
  {
    year: '1854',
    titleCn: '布尔代数 — 逻辑的二进制化',
    titleEn: 'Boolean Algebra — Logic Becomes Binary',
    descCn: '英国数学家乔治·布尔证明所有逻辑运算都可以归约为两个值（真/假，即1/0）之间的运算。AND、OR、NOT——阴阳之间的变换规则，被严格数学化了。',
    descEn: 'George Boole proved all logical operations reduce to two values (true/false, 1/0). AND, OR, NOT — the transformation rules between Yin and Yang, rigorously formalized into mathematics.',
    icon: '∧∨',
  },
  {
    year: '1945+',
    titleCn: '现代计算机 — 阴阳爻化为硅片电路',
    titleEn: 'Modern Computers — Yao Lines Become Silicon Circuits',
    descCn: '冯·诺依曼架构的计算机诞生。数十亿个晶体管，每个只有两种状态：导通(1)与截止(0)——阳爻与阴爻。三千多年前伏羲画下的那一横一断，最终成为驱动整个数字文明的基石。',
    descEn: 'The von Neumann computer is born. Billions of transistors, each with only two states: on (1) and off (0) — Yang and Yin lines. The solid and broken marks Fu Xi drew over 3,000 years ago became the foundation of our digital civilization.',
    icon: '💻',
  },
];
