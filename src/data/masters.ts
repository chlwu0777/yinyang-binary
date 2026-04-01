export interface MasterData {
  id: string;
  name: string;
  nameEn: string;
  era: string;
  eraEn: string;
  title: string;
  titleEn: string;
  avatar: string;
  portrait: string;
  quote: string;
  quoteEn: string;
  description: string;
  descriptionEn: string;
  contribution: string;
  contributionEn: string;
  significance: string;
  significanceEn: string;
}

export const masters: MasterData[] = [
  { id: 'fuxi', name: '伏羲', nameEn: 'Fu Xi', era: '约前3000年', eraEn: 'c. 3000 BCE', title: '八卦始祖', titleEn: 'Creator of Trigrams', avatar: '☰', portrait: '/portraits/fuxi.png', quote: '"仰则观象于天，俯则观法于地"', quoteEn: '"Looking up to heavens, looking down to earth."', description: '中华民族人文始祖，创制八卦，开启中华文明的符号系统。', descriptionEn: 'Created the Eight Trigrams - humanity\'s first binary symbolic system.', contribution: '创制先天八卦', contributionEn: 'Created Earlier Heaven Bagua', significance: '开创二元符号描述世界', significanceEn: 'Pioneered binary symbols' },
  { id: 'kingwen', name: '周文王', nameEn: 'King Wen', era: '约前1152-1056年', eraEn: 'c. 1152-1056 BCE', title: '六十四卦推演者', titleEn: 'Developer of 64 Hexagrams', avatar: '䷀', portrait: '/portraits/kingwen.png', quote: '"天行健，君子以自强不息"', quoteEn: '"Heaven moves with vigor."', description: '被囚羑里七年，将八卦推演为六十四卦。', descriptionEn: 'Combined trigrams into 64 hexagrams - a complete 6-bit state space.', contribution: '推演六十四卦', contributionEn: 'Derived 64 hexagrams', significance: '3-bit扩展到6-bit状态空间', significanceEn: 'Expanded to 6-bit state space' },
  { id: 'confucius', name: '孔子', nameEn: 'Confucius', era: '前551-479年', eraEn: '551-479 BCE', title: '《易传》作者', titleEn: 'Author of Ten Wings', avatar: '儒', portrait: '/portraits/confucius.png', quote: '"五十以学易，可以无大过矣"', quoteEn: '"Study the Changes at fifty."', description: '儒家创始人，晚年精研《周易》，著《易传》十篇。', descriptionEn: 'Wrote Ten Wings commentary, elevating to philosophy.', contribution: '著《易传》十翼', contributionEn: 'Authored Ten Wings', significance: '状态机理论升华为哲学', significanceEn: 'Elevated to philosophy' },
  { id: 'shao', name: '邵雍', nameEn: 'Shao Yong', era: '1011-1077', eraEn: '1011-1077 CE', title: '象数易学大师', titleEn: 'Image-Number Master', avatar: '数', portrait: '/portraits/shaoyong.png', quote: '"一分为二，二分为四"', quoteEn: '"One divides into two, two into four."', description: '北宋理学家，"加一倍法"与二进制完全一致。', descriptionEn: 'Doubling method identical to binary - 600 years before Leibniz.', contribution: '发现"加一倍法"', contributionEn: 'Discovered doubling method', significance: '数学描述二进制结构', significanceEn: 'Mathematical binary description' },
  { id: 'leibniz', name: '莱布尼茨', nameEn: 'Leibniz', era: '1646-1716', eraEn: '1646-1716 CE', title: '二进制发明者', titleEn: 'Binary Inventor', avatar: '01', portrait: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Gottfried_Wilhelm_von_Leibniz.jpg/240px-Gottfried_Wilhelm_von_Leibniz.jpg', quote: '"1和0足以创造一切"', quoteEn: '"One suffices to derive all."', description: '1703年发现六十四卦与二进制数0-63完美对应。', descriptionEn: 'Discovered hexagrams correspond to binary 0-63.', contribution: '发现易经与二进制对应', contributionEn: 'Linked I Ching to binary', significance: '连接东方智慧与西方数学', significanceEn: 'Connected East-West wisdom' },
  { id: 'takashima', name: '高岛吞象', nameEn: 'Takashima', era: '1832-1914', eraEn: '1832-1914 CE', title: '易学实占大师', titleEn: 'Divination Master', avatar: '占', portrait: '/portraits/takashima.png', quote: '"易は天地の道"', quoteEn: '"I Ching illuminates heaven and earth."', description: '日本明治易学家，将易经应用于商业决策。', descriptionEn: 'Applied I Ching to business decisions.', contribution: '著《高岛易断》', contributionEn: 'Authored Takashima Ekidan', significance: '证明实用决策系统价值', significanceEn: 'Proved practical value' },
  { id: 'wilhelm', name: '卫礼贤', nameEn: 'R. Wilhelm', era: '1873-1930', eraEn: '1873-1930 CE', title: '易经西传使者', titleEn: 'Bridge to West', avatar: '译', portrait: '/portraits/wilhelm.png', quote: '"《易经》是中国思想的源头"', quoteEn: '"I Ching is the living source."', description: '德国汉学家，完成最具影响力的《易经》德文译本。', descriptionEn: 'Produced the most influential I Ching translation.', contribution: '翻译《易经》德文本', contributionEn: 'Translated to German', significance: '西方首次系统理解易经', significanceEn: 'Enabled Western understanding' },
  { id: 'jung', name: '荣格', nameEn: 'C.G. Jung', era: '1875-1961', eraEn: '1875-1961 CE', title: '共时性理论创立者', titleEn: 'Synchronicity Creator', avatar: '心', portrait: '/portraits/jung.png', quote: '"共时性是非因果性的联系"', quoteEn: '"Synchronicity is acausal connecting."', description: '深受易经启发，提出"共时性"概念。', descriptionEn: 'Developed Synchronicity inspired by I Ching.', contribution: '提出共时性原理', contributionEn: 'Developed synchronicity', significance: '连接古代智慧与现代科学', significanceEn: 'Connected to modern science' },
];
