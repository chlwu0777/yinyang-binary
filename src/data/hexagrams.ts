export interface HexagramData {
  num: number;
  binary: string;
  name: string;
  nameEn: string;
  meaning: string;
  meaningEn: string;
  state: string;
  desc: string;
  descEn: string;
  kw: string;
  kwEn: string;
  img: string;
  imgEn: string;
}

export const hexagramsData: HexagramData[] = [
  { num: 1, binary: '111111', name: '乾', nameEn: 'Qián', meaning: '天', meaningEn: 'Creative', state: 'FULL_ACTIVE', desc: '全激活态', descEn: 'All open', kw: '刚健', kwEn: 'Strength', img: '天行健', imgEn: 'Heaven moves' },
  { num: 2, binary: '000000', name: '坤', nameEn: 'Kūn', meaning: '地', meaningEn: 'Receptive', state: 'RECEPTIVE', desc: '全接收态', descEn: 'Awaiting', kw: '柔顺', kwEn: 'Receptivity', img: '地势坤', imgEn: 'Earth' },
  { num: 3, binary: '010001', name: '屯', nameEn: 'Zhūn', meaning: '难', meaningEn: 'Difficulty', state: 'INIT_DIFF', desc: '初始困难', descEn: 'Boot struggle', kw: '艰难', kwEn: 'Birth pains', img: '云雷屯', imgEn: 'Thunder' },
  { num: 4, binary: '100010', name: '蒙', nameEn: 'Méng', meaning: '蒙', meaningEn: 'Folly', state: 'UNTRAINED', desc: '未训练', descEn: 'Guidance', kw: '启发', kwEn: 'Education', img: '山下泉', imgEn: 'Spring' },
  { num: 5, binary: '010111', name: '需', nameEn: 'Xū', meaning: '待', meaningEn: 'Waiting', state: 'WAIT', desc: '等待态', descEn: 'Pending', kw: '等待', kwEn: 'Patience', img: '云天', imgEn: 'Clouds' },
  { num: 6, binary: '111010', name: '讼', nameEn: 'Sòng', meaning: '讼', meaningEn: 'Conflict', state: 'CONFLICT', desc: '冲突态', descEn: 'Conflict', kw: '争执', kwEn: 'Dispute', img: '天水', imgEn: 'Opposition' },
  { num: 7, binary: '000010', name: '师', nameEn: 'Shī', meaning: '师', meaningEn: 'Army', state: 'ORGANIZE', desc: '组织态', descEn: 'Hierarchy', kw: '纪律', kwEn: 'Discipline', img: '地水', imgEn: 'Water' },
  { num: 8, binary: '010000', name: '比', nameEn: 'Bǐ', meaning: '比', meaningEn: 'Union', state: 'NETWORK', desc: '网络态', descEn: 'Connect', kw: '团结', kwEn: 'Unity', img: '水地', imgEn: 'Water' },
  { num: 9, binary: '110111', name: '小畜', nameEn: 'Xiǎo Xù', meaning: '小畜', meaningEn: 'Small Taming', state: 'BUFFER', desc: '小缓冲', descEn: 'Cache', kw: '积累', kwEn: 'Gathering', img: '风天', imgEn: 'Wind' },
  { num: 10, binary: '111011', name: '履', nameEn: 'Lǚ', meaning: '履', meaningEn: 'Treading', state: 'CAREFUL', desc: '谨慎态', descEn: 'Careful', kw: '谨慎', kwEn: 'Conduct', img: '天泽', imgEn: 'Treading' },
  { num: 11, binary: '000111', name: '泰', nameEn: 'Tài', meaning: '泰', meaningEn: 'Peace', state: 'FLOW', desc: '通畅态', descEn: 'Throughput', kw: '和谐', kwEn: 'Harmony', img: '天地交', imgEn: 'Union' },
  { num: 12, binary: '111000', name: '否', nameEn: 'Pǐ', meaning: '否', meaningEn: 'Standstill', state: 'BLOCKED', desc: '阻塞态', descEn: 'Closed', kw: '阻塞', kwEn: 'Stagnation', img: '天地不交', imgEn: 'Separation' },
  { num: 13, binary: '111101', name: '同人', nameEn: 'Tóng Rén', meaning: '同人', meaningEn: 'Fellowship', state: 'SYNC', desc: '协同态', descEn: 'Parallel', kw: '团结', kwEn: 'Fellowship', img: '天火', imgEn: 'Fellowship' },
  { num: 14, binary: '101111', name: '大有', nameEn: 'Dà Yǒu', meaning: '大有', meaningEn: 'Possession', state: 'ABUNDANCE', desc: '丰盛态', descEn: 'Resource+', kw: '丰盛', kwEn: 'Abundance', img: '火天', imgEn: 'Great having' },
  { num: 15, binary: '000100', name: '谦', nameEn: 'Qiān', meaning: '谦', meaningEn: 'Modesty', state: 'LOW_POWER', desc: '低功耗', descEn: 'Energy save', kw: '谦虚', kwEn: 'Humility', img: '地山', imgEn: 'Modesty' },
  { num: 16, binary: '001000', name: '豫', nameEn: 'Yù', meaning: '豫', meaningEn: 'Enthusiasm', state: 'READY', desc: '预备态', descEn: 'Prepared', kw: '喜悦', kwEn: 'Joy', img: '雷地', imgEn: 'Enthusiasm' },
  { num: 17, binary: '011001', name: '随', nameEn: 'Suí', meaning: '随', meaningEn: 'Following', state: 'FOLLOW', desc: '跟随态', descEn: 'Subordinate', kw: '顺从', kwEn: 'Adaptation', img: '泽雷', imgEn: 'Following' },
  { num: 18, binary: '100110', name: '蛊', nameEn: 'Gǔ', meaning: '蛊', meaningEn: 'Decay Work', state: 'REPAIR', desc: '修复态', descEn: 'Error fix', kw: '改革', kwEn: 'Repair', img: '山风', imgEn: 'Repair' },
  { num: 19, binary: '000011', name: '临', nameEn: 'Lín', meaning: '临', meaningEn: 'Approach', state: 'APPROACH', desc: '接近态', descEn: 'Connect', kw: '接近', kwEn: 'Approach', img: '地泽', imgEn: 'Approach' },
  { num: 20, binary: '110000', name: '观', nameEn: 'Guān', meaning: '观', meaningEn: 'View', state: 'OBSERVE', desc: '观察态', descEn: 'Read-only', kw: '观察', kwEn: 'Observe', img: '风地', imgEn: 'Viewing' },
  { num: 21, binary: '101001', name: '噬嗑', nameEn: 'Shì Kè', meaning: '噬嗑', meaningEn: 'Biting', state: 'FORCE', desc: '决断态', descEn: 'Force', kw: '决断', kwEn: 'Decision', img: '火雷', imgEn: 'Biting' },
  { num: 22, binary: '100101', name: '贲', nameEn: 'Bì', meaning: '贲', meaningEn: 'Grace', state: 'FORMAT', desc: '美化态', descEn: 'Styled', kw: '美化', kwEn: 'Beauty', img: '山火', imgEn: 'Grace' },
  { num: 23, binary: '100000', name: '剥', nameEn: 'Bō', meaning: '剥', meaningEn: 'Splitting', state: 'DECAY', desc: '衰减态', descEn: 'Failing', kw: '衰败', kwEn: 'Decay', img: '山地', imgEn: 'Stripping' },
  { num: 24, binary: '000001', name: '复', nameEn: 'Fù', meaning: '复', meaningEn: 'Return', state: 'RESET', desc: '复位态', descEn: 'Reboot', kw: '回归', kwEn: 'Return', img: '地雷', imgEn: 'Return' },
  { num: 25, binary: '111001', name: '无妄', nameEn: 'Wú Wàng', meaning: '无妄', meaningEn: 'Innocence', state: 'AUTHENTIC', desc: '真实态', descEn: 'No mask', kw: '真诚', kwEn: 'Sincerity', img: '天雷', imgEn: 'Innocence' },
  { num: 26, binary: '100111', name: '大畜', nameEn: 'Dà Xù', meaning: '大畜', meaningEn: 'Great Taming', state: 'BIG_BUFFER', desc: '大缓冲', descEn: 'Deep store', kw: '积累', kwEn: 'Accumulate', img: '山天', imgEn: 'Great taming' },
  { num: 27, binary: '100001', name: '颐', nameEn: 'Yí', meaning: '颐', meaningEn: 'Nourish', state: 'MAINTAIN', desc: '养护态', descEn: 'Upkeep', kw: '滋养', kwEn: 'Nourish', img: '山雷', imgEn: 'Nourishing' },
  { num: 28, binary: '011110', name: '大过', nameEn: 'Dà Guò', meaning: '大过', meaningEn: 'Excess', state: 'OVERLOAD', desc: '过载态', descEn: 'Critical', kw: '过度', kwEn: 'Excess', img: '泽风', imgEn: 'Great exceeding' },
  { num: 29, binary: '010010', name: '坎', nameEn: 'Kǎn', meaning: '坎', meaningEn: 'Abysmal', state: 'DANGER', desc: '危险态', descEn: 'Deep risk', kw: '危险', kwEn: 'Danger', img: '坎水', imgEn: 'Water' },
  { num: 30, binary: '101101', name: '离', nameEn: 'Lí', meaning: '离', meaningEn: 'Clinging', state: 'DISPLAY', desc: '显示态', descEn: 'Clear out', kw: '光明', kwEn: 'Brightness', img: '离火', imgEn: 'Fire' },
  { num: 31, binary: '011100', name: '咸', nameEn: 'Xián', meaning: '咸', meaningEn: 'Influence', state: 'SENSE', desc: '感应态', descEn: 'Coupling', kw: '感应', kwEn: 'Attraction', img: '泽山', imgEn: 'Influence' },
  { num: 32, binary: '001110', name: '恒', nameEn: 'Héng', meaning: '恒', meaningEn: 'Duration', state: 'STEADY', desc: '恒定态', descEn: 'Stable', kw: '持久', kwEn: 'Persistence', img: '雷风', imgEn: 'Duration' },
  { num: 33, binary: '111100', name: '遁', nameEn: 'Dùn', meaning: '遁', meaningEn: 'Retreat', state: 'RETREAT', desc: '退避态', descEn: 'Withdraw', kw: '退避', kwEn: 'Retreat', img: '天山', imgEn: 'Retreat' },
  { num: 34, binary: '001111', name: '大壮', nameEn: 'Dà Zhuàng', meaning: '大壮', meaningEn: 'Great Power', state: 'POWER', desc: '强盛态', descEn: 'Max out', kw: '强盛', kwEn: 'Strength', img: '雷天', imgEn: 'Great power' },
  { num: 35, binary: '101000', name: '晋', nameEn: 'Jìn', meaning: '晋', meaningEn: 'Progress', state: 'PROGRESS', desc: '进展态', descEn: 'Upgrading', kw: '进步', kwEn: 'Advancement', img: '火地', imgEn: 'Progress' },
  { num: 36, binary: '000101', name: '明夷', nameEn: 'Míng Yí', meaning: '明夷', meaningEn: 'Darkening', state: 'HIDDEN', desc: '隐匿态', descEn: 'Low profile', kw: '隐藏', kwEn: 'Concealment', img: '地火', imgEn: 'Darkening' },
  { num: 37, binary: '110101', name: '家人', nameEn: 'Jiā Rén', meaning: '家人', meaningEn: 'Family', state: 'INTERNAL', desc: '内部态', descEn: 'Closed sys', kw: '家庭', kwEn: 'Family', img: '风火', imgEn: 'Family' },
  { num: 38, binary: '101011', name: '睽', nameEn: 'Kuí', meaning: '睽', meaningEn: 'Opposition', state: 'DIVERGE', desc: '分歧态', descEn: 'Opposition', kw: '对立', kwEn: 'Opposition', img: '火泽', imgEn: 'Opposition' },
  { num: 39, binary: '010100', name: '蹇', nameEn: 'Jiǎn', meaning: '蹇', meaningEn: 'Obstruction', state: 'OBSTACLE', desc: '阻碍态', descEn: 'Blocked', kw: '困难', kwEn: 'Difficulty', img: '水山', imgEn: 'Obstruction' },
  { num: 40, binary: '001010', name: '解', nameEn: 'Xiè', meaning: '解', meaningEn: 'Deliverance', state: 'RELEASE', desc: '释放态', descEn: 'Unlock', kw: '解脱', kwEn: 'Release', img: '雷水', imgEn: 'Deliverance' },
  { num: 41, binary: '100011', name: '损', nameEn: 'Sǔn', meaning: '损', meaningEn: 'Decrease', state: 'DECREASE', desc: '减损态', descEn: 'Free mem', kw: '减少', kwEn: 'Decrease', img: '山泽', imgEn: 'Decrease' },
  { num: 42, binary: '110001', name: '益', nameEn: 'Yì', meaning: '益', meaningEn: 'Increase', state: 'INCREASE', desc: '增益态', descEn: 'Acquire', kw: '增加', kwEn: 'Increase', img: '风雷', imgEn: 'Increase' },
  { num: 43, binary: '011111', name: '夬', nameEn: 'Guài', meaning: '夬', meaningEn: 'Breakthrough', state: 'BREAK', desc: '突破态', descEn: 'Decisive', kw: '决断', kwEn: 'Resolution', img: '泽天', imgEn: 'Breakthrough' },
  { num: 44, binary: '111110', name: '姤', nameEn: 'Gòu', meaning: '姤', meaningEn: 'Coming to Meet', state: 'ENCOUNTER', desc: '遭遇态', descEn: 'Unexpected', kw: '邂逅', kwEn: 'Encounter', img: '天风', imgEn: 'Meeting' },
  { num: 45, binary: '011000', name: '萃', nameEn: 'Cuì', meaning: '萃', meaningEn: 'Gathering', state: 'GATHER', desc: '聚集态', descEn: 'Aggregate', kw: '聚集', kwEn: 'Assembly', img: '泽地', imgEn: 'Gathering' },
  { num: 46, binary: '000110', name: '升', nameEn: 'Shēng', meaning: '升', meaningEn: 'Pushing Up', state: 'ASCEND', desc: '上升态', descEn: 'Growing', kw: '上升', kwEn: 'Ascending', img: '地风', imgEn: 'Pushing up' },
  { num: 47, binary: '011010', name: '困', nameEn: 'Kùn', meaning: '困', meaningEn: 'Oppression', state: 'EXHAUSTED', desc: '困境态', descEn: 'Depleted', kw: '困境', kwEn: 'Exhaustion', img: '泽水', imgEn: 'Oppression' },
  { num: 48, binary: '010110', name: '井', nameEn: 'Jǐng', meaning: '井', meaningEn: 'The Well', state: 'SOURCE', desc: '源头态', descEn: 'Supply', kw: '滋养', kwEn: 'Nourishment', img: '水风', imgEn: 'The well' },
  { num: 49, binary: '011101', name: '革', nameEn: 'Gé', meaning: '革', meaningEn: 'Revolution', state: 'REVOLUTION', desc: '变革态', descEn: 'Refactor', kw: '变革', kwEn: 'Change', img: '泽火', imgEn: 'Revolution' },
  { num: 50, binary: '101110', name: '鼎', nameEn: 'Dǐng', meaning: '鼎', meaningEn: 'Cauldron', state: 'TRANSFORM', desc: '转化态', descEn: 'Processing', kw: '转化', kwEn: 'Transform', img: '火风', imgEn: 'Cauldron' },
  { num: 51, binary: '001001', name: '震', nameEn: 'Zhèn', meaning: '震', meaningEn: 'Arousing', state: 'ACTIVATE', desc: '激活态', descEn: 'Start', kw: '震动', kwEn: 'Shock', img: '震雷', imgEn: 'Thunder' },
  { num: 52, binary: '100100', name: '艮', nameEn: 'Gèn', meaning: '艮', meaningEn: 'Still', state: 'PAUSE', desc: '静止态', descEn: 'Still', kw: '静止', kwEn: 'Stillness', img: '艮山', imgEn: 'Mountain' },
  { num: 53, binary: '110100', name: '渐', nameEn: 'Jiàn', meaning: '渐', meaningEn: 'Development', state: 'GRADUAL', desc: '渐进态', descEn: 'Step by step', kw: '循序', kwEn: 'Gradual', img: '风山', imgEn: 'Development' },
  { num: 54, binary: '001011', name: '归妹', nameEn: 'Guī Mèi', meaning: '归妹', meaningEn: 'Marrying Maiden', state: 'DEPENDENT', desc: '从属态', descEn: 'Linked', kw: '从属', kwEn: 'Subordinate', img: '雷泽', imgEn: 'Marrying' },
  { num: 55, binary: '001101', name: '丰', nameEn: 'Fēng', meaning: '丰', meaningEn: 'Abundance', state: 'PEAK', desc: '峰值态', descEn: 'Maximum', kw: '丰盛', kwEn: 'Abundance', img: '雷火', imgEn: 'Abundance' },
  { num: 56, binary: '101100', name: '旅', nameEn: 'Lǚ', meaning: '旅', meaningEn: 'Wanderer', state: 'TEMPORARY', desc: '游离态', descEn: 'Transient', kw: '旅行', kwEn: 'Travel', img: '火山', imgEn: 'Wanderer' },
  { num: 57, binary: '110110', name: '巽', nameEn: 'Xùn', meaning: '巽', meaningEn: 'Gentle', state: 'PENETRATE', desc: '渗透态', descEn: 'Deep cast', kw: '渗透', kwEn: 'Penetration', img: '巽风', imgEn: 'Wind' },
  { num: 58, binary: '011011', name: '兑', nameEn: 'Duì', meaning: '兑', meaningEn: 'Joyous', state: 'JOY', desc: '喜悦态', descEn: 'Positive', kw: '喜悦', kwEn: 'Joy', img: '兑泽', imgEn: 'Lake' },
  { num: 59, binary: '110010', name: '涣', nameEn: 'Huàn', meaning: '涣', meaningEn: 'Dispersion', state: 'DISPERSE', desc: '分散态', descEn: 'Distributed', kw: '分散', kwEn: 'Dissolution', img: '风水', imgEn: 'Dispersion' },
  { num: 60, binary: '010011', name: '节', nameEn: 'Jié', meaning: '节', meaningEn: 'Limitation', state: 'LIMIT', desc: '限制态', descEn: 'Constrained', kw: '节制', kwEn: 'Limitation', img: '水泽', imgEn: 'Limitation' },
  { num: 61, binary: '110011', name: '中孚', nameEn: 'Zhōng Fú', meaning: '中孚', meaningEn: 'Inner Truth', state: 'TRUTH', desc: '诚信态', descEn: 'Validated', kw: '真诚', kwEn: 'Sincerity', img: '风泽', imgEn: 'Inner truth' },
  { num: 62, binary: '001100', name: '小过', nameEn: 'Xiǎo Guò', meaning: '小过', meaningEn: 'Small Exceeding', state: 'FINE_TUNE', desc: '微调态', descEn: 'Minor adj', kw: '谨慎', kwEn: 'Caution', img: '雷山', imgEn: 'Small exceeding' },
  { num: 63, binary: '010101', name: '既济', nameEn: 'Jì Jì', meaning: '既济', meaningEn: 'After Completion', state: 'COMPLETE', desc: '完成态', descEn: 'Task done', kw: '完成', kwEn: 'Completion', img: '水火', imgEn: 'After completion' },
  { num: 64, binary: '101010', name: '未济', nameEn: 'Wèi Jì', meaning: '未济', meaningEn: 'Before Completion', state: 'INCOMPLETE', desc: '未完成态', descEn: 'Pending', kw: '未完', kwEn: 'Incomplete', img: '火水', imgEn: 'Before completion' },
];
