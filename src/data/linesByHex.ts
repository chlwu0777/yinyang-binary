/**
 * 六十四卦每爻中英文解释 (Line-by-line CN/EN for 64 hexagrams)
 * 爻序自下而上：初(1) → 上(6)
 */
export const linesByHex: Record<number, Array<{cn: string; en: string; plainCn?: string; plainEn?: string}>> = {
  1: [ // 乾 Qián
    { cn: '初九：潜龙勿用', en: 'Line 1 (Yang): Hidden dragon, do not act yet.', plainCn: '龙还潜藏，不要急于施展。', plainEn: 'The dragon is still hidden; do not act yet.' },
    { cn: '九二：见龙在田，利见大人', en: 'Line 2 (Yang): Dragon appears in the field; favorable to meet the great one.', plainCn: '龙出现在田野，利于拜见贵人。', plainEn: 'Dragon appears in the field; good to meet someone great.' },
    { cn: '九三：君子终日乾乾，夕惕若厉，无咎', en: 'Line 3 (Yang): Noble strives all day, wary at night; no blame.', plainCn: '君子整天勤勉，夜里仍警惕，没有过失。', plainEn: 'The noble works hard all day and stays alert at night; no blame.' },
    { cn: '九四：或跃在渊，无咎', en: 'Line 4 (Yang): Leap from the abyss; no blame.', plainCn: '或可跃出深渊，没有过失。', plainEn: 'Maybe leap from the deep; no blame.' },
    { cn: '九五：飞龙在天，利见大人', en: 'Line 5 (Yang): Flying dragon in heaven; favorable to meet the great one.', plainCn: '飞龙在天，利于见贵人。', plainEn: 'Flying dragon in heaven; good to meet the great one.' },
    { cn: '上九：亢龙有悔', en: 'Line 6 (Yang): Arrogant dragon has regret.', plainCn: '龙飞得过高则有悔。', plainEn: 'The dragon at the top has regret.' }
  ],
  2: [ // 坤 Kūn
    { cn: '初六：履霜，坚冰至', en: 'Line 1 (Yin): Treading frost; solid ice approaches.', plainCn: '踩到霜，就知道坚冰快来了。', plainEn: 'Treading on frost means solid ice is coming.' },
    { cn: '六二：直、方、大，不习无不利', en: 'Line 2 (Yin): Straight, square, great; no practice, no detriment.', plainCn: '正直、方正、宽大，不刻意修习也无不利。', plainEn: 'Straight, square, and broad; no need to force practice.' },
    { cn: '六三：含章可贞，或从王事，无成有终', en: 'Line 3 (Yin): Hold the pattern, maintain correctness; serve the king without claiming success.', plainCn: '内含文采而守正，或辅佐君王，不居功而有善终。', plainEn: 'Hold your virtue, serve without claiming success.' },
    { cn: '六四：括囊，无咎无誉', en: 'Line 4 (Yin): Tie the bag; no blame, no praise.', plainCn: '扎紧口袋，不招祸也不求誉。', plainEn: 'Tie the bag; no blame, no praise.' },
    { cn: '六五：黄裳，元吉', en: 'Line 5 (Yin): Yellow skirt; supreme good fortune.', plainCn: '穿黄色下裳，大吉。', plainEn: 'Yellow lower garment; supreme good fortune.' },
    { cn: '上六：龙战于野，其血玄黄', en: 'Line 6 (Yin): Dragons fight in the wild; their blood dark and yellow.', plainCn: '龙在郊野相争，其血青黄。', plainEn: 'Dragons fight in the wild; their blood runs dark and yellow.' }
  ],
  3: [ // 屯 Zhūn
    { cn: '初九：磐桓，利居贞，利建侯', en: 'Line 1 (Yang): Hesitant; favorable to abide in correctness, to establish lords.', plainCn: '徘徊不进时，宜守正，宜建立根基。', plainEn: 'When hesitant, stay correct and build your base.' },
    { cn: '六二：屯如邅如，乘马班如', en: 'Line 2 (Yin): Difficulty, hesitation; horses circle.', plainCn: '艰难徘徊，乘马也团团转。', plainEn: 'Stuck in difficulty; even horses circle.' },
    { cn: '六三：即鹿无虞，惟入于林中', en: 'Line 3 (Yin): Chasing deer without a guide; enter the forest.', plainCn: '追鹿没有向导，只会深入林中。', plainEn: 'Chasing deer without a guide leads into the forest.' },
    { cn: '六四：乘马班如，求婚媾，往吉', en: 'Line 4 (Yin): Horses circle; seek union; going brings good fortune.', plainCn: '乘马盘旋，求婚配，前往则吉。', plainEn: 'Horses circle; seek union; going brings good fortune.' },
    { cn: '九五：屯其膏，小贞吉，大贞凶', en: 'Line 5 (Yang): Store the fat; small correctness brings good fortune, great brings misfortune.', plainCn: '积聚资源，小规模守正则吉，过大则凶。', plainEn: 'Store resources; small correctness is good, excess is bad.' },
    { cn: '上六：乘马班如，泣血涟如', en: 'Line 6 (Yin): Horses circle; tears and blood flow.', plainCn: '乘马盘旋不前，泣泪成血。', plainEn: 'Horses circle; tears and blood flow.' }
  ],
  4: [ // 蒙 Méng
    { cn: '初六：发蒙，利用刑人，用说桎梏', en: 'Line 1 (Yin): Develop the ignorant; use discipline, remove fetters.', plainCn: '启发蒙昧，宜用规矩约束人，从而脱去枷锁。', plainEn: 'Enlighten the ignorant with discipline so they can be freed.' },
    { cn: '九二：包蒙吉，纳妇吉，子克家', en: 'Line 2 (Yang): Embrace the ignorant, good fortune; take a wife, good fortune; son manages the house.', plainCn: '包容蒙昧则吉，娶妇吉，子能持家。', plainEn: 'Embrace the ignorant—good; take a wife—good; son can run the house.' },
    { cn: '六三：勿用取女，见金夫，不有躬', en: 'Line 3 (Yin): Do not take this woman; she sees a wealthy man, loses herself.', plainCn: '不要娶这样的女子；见有钱人就失态。', plainEn: 'Do not marry her; she loses herself before wealth.' },
    { cn: '六四：困蒙，吝', en: 'Line 4 (Yin): Confined in ignorance; humiliation.', plainCn: '困于蒙昧，有遗憾。', plainEn: 'Stuck in ignorance brings regret.' },
    { cn: '六五：童蒙，吉', en: 'Line 5 (Yin): Childlike ignorance; good fortune.', plainCn: '像孩童般纯真蒙昧，吉。', plainEn: 'Childlike innocence brings good fortune.' },
    { cn: '上九：击蒙，不利为寇，利御寇', en: 'Line 6 (Yang): Strike the ignorant; not favorable to be the aggressor, favorable to resist.', plainCn: '击破蒙昧；不宜主动侵犯，宜防御。', plainEn: 'Break ignorance; do not attack, defend instead.' }
  ],
  5: [ // 需 Xū
    { cn: '初九：需于郊，利用恒，无咎', en: 'Line 1 (Yang): Waiting in the suburbs; constancy brings no blame.', plainCn: '在郊外等待，持恒则无过。', plainEn: 'Waiting in the outskirts; constancy brings no blame.' },
    { cn: '九二：需于沙，小有言，终吉', en: 'Line 2 (Yang): Waiting on the sand; small criticism, in the end good fortune.', plainCn: '在沙地等待，稍有非议，终吉。', plainEn: 'Waiting on sand; small criticism, good fortune in the end.' },
    { cn: '九三：需于泥，致寇至', en: 'Line 3 (Yang): Waiting in the mud; invites the enemy.', plainCn: '在泥中等待，会招来敌害。', plainEn: 'Waiting in mud invites trouble.' },
    { cn: '六四：需于血，出自穴', en: 'Line 4 (Yin): Waiting in blood; emerge from the pit.', plainCn: '在血光中等待，终将脱出险穴。', plainEn: 'Waiting in danger; you will emerge from the pit.' },
    { cn: '九五：需于酒食，贞吉', en: 'Line 5 (Yang): Waiting with wine and food; correctness brings good fortune.', plainCn: '以酒食待时，守正则吉。', plainEn: 'Waiting with wine and food; correctness brings good fortune.' },
    { cn: '上六：入于穴，有不速之客三人来，敬之终吉', en: 'Line 6 (Yin): Enter the pit; three uninvited guests come; respect them, in the end good fortune.', plainCn: '进入穴中，三位不速之客到来，敬待他们则终吉。', plainEn: 'Enter the pit; three uninvited guests come; respect them for good fortune.' }
  ],
  6: [ // 讼 Sòng
    { cn: '初六：不永所事，小有言，终吉', en: 'Line 1 (Yin): Do not carry the matter through; small criticism, in the end good fortune.', plainCn: '不把争执拖到底，小有口舌，终吉。', plainEn: 'Do not push the dispute; small talk, good fortune in the end.' },
    { cn: '九二：不克讼，归而逋，其邑人三百户无眚', en: 'Line 2 (Yang): Cannot win the dispute; return and flee; his town of three hundred households is spared.', plainCn: '打不赢官司就回去躲开，其乡里可免灾。', plainEn: 'Cannot win; withdraw and your people are spared.' },
    { cn: '六三：食旧德，贞厉，终吉', en: 'Line 3 (Yin): Feed on old virtue; correctness is perilous but ends in good fortune.', plainCn: '靠往日德行度日，守正虽险，终吉。', plainEn: 'Rely on past virtue; correctness is risky but ends well.' },
    { cn: '九四：不克讼，复即命，渝安贞，吉', en: 'Line 4 (Yang): Cannot win; return to fate, change to peace and correctness; good fortune.', plainCn: '争不胜则顺从天命，改而安于正道，吉。', plainEn: 'Cannot win; accept fate, turn to peace and correctness—good fortune.' },
    { cn: '九五：讼，元吉', en: 'Line 5 (Yang): In dispute, supreme good fortune.', plainCn: '居中正而断讼，大吉。', plainEn: 'In dispute from the center, supreme good fortune.' },
    { cn: '上九：或锡之鞶带，终朝三褫之', en: 'Line 6 (Yang): Perhaps given a leather belt; by end of day taken away three times.', plainCn: '或许得赐腰带，一天内又被夺回三次。', plainEn: 'Maybe given a belt; by day\'s end it is taken back three times.' }
  ],
  7: [ // 师 Shī
    { cn: '初六：师出以律，否臧凶', en: 'Line 1 (Yin): Army sets out with discipline; without order, misfortune.', plainCn: '出师要有纪律，否则凶。', plainEn: 'Army must have discipline; otherwise misfortune.' },
    { cn: '九二：在师中，吉无咎，王三锡命', en: 'Line 2 (Yang): In the center of the army; good fortune, no blame; king bestows favor three times.', plainCn: '居中统师，吉无咎，王多次嘉奖。', plainEn: 'At the center of the army; good fortune, king favors you.' },
    { cn: '六三：师或舆尸，凶', en: 'Line 3 (Yin): Army perhaps carries corpses; misfortune.', plainCn: '军队载尸而还，凶。', plainEn: 'Army carrying the dead—misfortune.' },
    { cn: '六四：师左次，无咎', en: 'Line 4 (Yin): Army camps on the left; no blame.', plainCn: '军队退守左侧，无咎。', plainEn: 'Army retreats to the left; no blame.' },
    { cn: '六五：田有禽，利执言，无咎', en: 'Line 5 (Yin): Game in the field; favorable to capture and speak; no blame.', plainCn: '田中有禽兽，宜捕获并宣告，无咎。', plainEn: 'Game in the field; capture and declare; no blame.' },
    { cn: '上六：大君有命，开国承家，小人勿用', en: 'Line 6 (Yin): Great ruler gives orders; open the state, inherit the house; do not use petty people.', plainCn: '大君颁命，封国承家，不要用小人。', plainEn: 'Ruler gives orders; found states, inherit houses; do not use petty people.' }
  ],
  8: [ // 比 Bǐ
    { cn: '初六：有孚比之，无咎；有孚盈缶，终来有它吉', en: 'Line 1 (Yin): Sincerity in union; no blame. Full vessel of sincerity; in the end comes other good fortune.', plainCn: '以诚信亲附，无咎；诚信满溢，终得他吉。', plainEn: 'Union with sincerity—no blame; full sincerity brings further good fortune.' },
    { cn: '六二：比之自内，贞吉', en: 'Line 2 (Yin): Union from within; correctness brings good fortune.', plainCn: '从内心亲附，守正则吉。', plainEn: 'Union from within; correctness brings good fortune.' },
    { cn: '六三：比之匪人', en: 'Line 3 (Yin): Union with the wrong people.', plainCn: '亲附了不该亲附的人。', plainEn: 'Union with the wrong people.' },
    { cn: '六四：外比之，贞吉', en: 'Line 4 (Yin): Union from without; correctness brings good fortune.', plainCn: '向外亲附贤者，守正则吉。', plainEn: 'Union with those outside; correctness brings good fortune.' },
    { cn: '九五：显比，王用三驱，失前禽，邑人不诫，吉', en: 'Line 5 (Yang): Manifest union; king hunts three drives, loses the forward game; townspeople do not warn; good fortune.', plainCn: '光明亲比，如王三驱网开一面，邑人不惊，吉。', plainEn: 'Open union; like the king\'s hunt leaving an escape; good fortune.' },
    { cn: '上六：比之无首，凶', en: 'Line 6 (Yin): Union without a head; misfortune.', plainCn: '亲附而无首领，凶。', plainEn: 'Union without a leader—misfortune.' }
  ],
  9: [ // 小畜 Xiǎo Xù
    { cn: '初九：复自道，何其咎，吉', en: 'Line 1 (Yang): Return to your own way; what blame? Good fortune.', plainCn: '回到自己的正道，有何过咎，吉。', plainEn: 'Return to your way; no blame, good fortune.' },
    { cn: '九二：牵复，吉', en: 'Line 2 (Yang): Drawn back; good fortune.', plainCn: '被牵回正道，吉。', plainEn: 'Drawn back to the right path—good fortune.' },
    { cn: '九三：舆说辐，夫妻反目', en: 'Line 3 (Yang): Wagon loses its spokes; husband and wife turn their eyes away.', plainCn: '车脱辐条，夫妻反目。', plainEn: 'Wagon loses spokes; husband and wife fall out.' },
    { cn: '六四：有孚，血去惕出，无咎', en: 'Line 4 (Yin): Sincerity; blood departs, fear leaves; no blame.', plainCn: '有诚信，血光消、恐惧除，无咎。', plainEn: 'Sincerity; danger and fear leave—no blame.' },
    { cn: '九五：有孚挛如，富以其邻', en: 'Line 5 (Yang): Sincerity binds; wealth shared with neighbors.', plainCn: '诚信相系，与邻共享富足。', plainEn: 'Sincerity binds; share wealth with neighbors.' },
    { cn: '上九：既雨既处，尚德载，妇贞厉，月几望，君子征凶', en: 'Line 6 (Yang): Rain has fallen, rest; virtue carries; woman\'s correctness is perilous; moon nearly full; noble goes, misfortune.', plainCn: '雨已下、已止，德可载物；妇人守正有险，月将满时君子出征凶。', plainEn: 'Rain has come and gone; virtue carries. For the woman correctness is risky; near full moon, noble goes—misfortune.' }
  ],
  10: [ // 履 Lǚ
    { cn: '初九：素履，往无咎', en: 'Line 1 (Yang): Plain treading; going, no blame.', plainCn: '朴素而行，前往无咎。', plainEn: 'Tread plainly; going brings no blame.' },

    { cn: '九二：履道坦坦，幽人贞吉', en: 'Line 2 (Yang): Path level and broad; secluded person’s correctness brings good fortune.', plainCn: '道路平坦，幽居守正者吉。', plainEn: 'Path is level; the secluded one\'s correctness brings good fortune.' },

    { cn: '六三：眇能视，跛能履，履虎尾咥人，凶', en: 'Line 3 (Yin): One-eyed can see, lame can walk; tread on tiger’s tail, it bites; misfortune.', plainCn: '独眼能看、跛足能走，但踩虎尾被咬，凶。', plainEn: 'One-eyed sees, lame walks; tread on tiger\'s tail and get bitten—misfortune.' },

    { cn: '九四：履虎尾，愬愬终吉', en: 'Line 4 (Yang): Tread on tiger’s tail; trembling, in the end good fortune.', plainCn: '踩虎尾而戒惧，终吉。', plainEn: 'Tread on tiger\'s tail with caution—good fortune in the end.' },

    { cn: '九五：夬履，贞厉', en: 'Line 5 (Yang): Decisive treading; correctness is perilous.', plainCn: '决断而行，守正也有危险。', plainEn: 'Decisive treading; correctness is still perilous.' },

    { cn: '上九：视履考祥，其旋元吉', en: 'Line 6 (Yang): Look at the treading, examine the omen; turning back, supreme good fortune.', plainCn: '审视所行、考究吉凶，回头则大吉。', plainEn: 'Review your steps and the signs; turning back brings supreme good fortune.' }

  ],
  11: [ // 泰 Tài
    { cn: '初九：拔茅茹，以其汇，征吉', en: 'Line 1 (Yang): Pulling up grass, roots follow; with your kind, going brings good fortune.', plainCn: '拔茅草根连根，与同类一起行动，征则吉。', plainEn: 'Pull up grass, roots follow; act with your kind—good fortune.' },

    { cn: '九二：包荒，用冯河，不遐遗，朋亡，得尚于中行', en: 'Line 2 (Yang): Embrace the wild, ford the river; do not neglect the distant; friends are lost; gain support in the central course.', plainCn: '包容荒远、涉越大河，不弃远人，失朋而得中道之助。', plainEn: 'Embrace the wild, ford the river; do not forget the distant; gain support on the central path.' },

    { cn: '九三：无平不陂，无往不复，艰贞无咎', en: 'Line 3 (Yang): No level without slope, no going without return; hardship in correctness, no blame.', plainCn: '没有只平不陂的，没有只往不复的；艰守正道则无咎。', plainEn: 'No level without slope, no going without return; hold to correctness—no blame.' },

    { cn: '六四：翩翩不富，以其邻，不戒以孚', en: 'Line 4 (Yin): Fluttering, not rich; with neighbors, no warning needed when sincere.', plainCn: '轻浮则不富，与邻以诚则不必戒备。', plainEn: 'Fluttering and not rich; with neighbors, sincerity needs no guard.' },

    { cn: '六五：帝乙归妹，以祉元吉', en: 'Line 5 (Yin): Emperor Yi gives his sister in marriage; blessing, supreme good fortune.', plainCn: '帝乙嫁妹，得福大吉。', plainEn: 'Emperor Yi gives his sister in marriage; blessing, supreme good fortune.' },

    { cn: '上六：城复于隍，勿用师，自邑告命，贞吝', en: 'Line 6 (Yin): Wall returns to the moat; do not use the army; from the town comes the order; correctness brings humiliation.', plainCn: '城墙倒回城壕，不要兴师，从邑中传命，守正也难免遗憾。', plainEn: 'Wall falls into the moat; do not use the army; orders from the town; correctness still brings regret.' }

  ],
  12: [ // 否 Pǐ
    { cn: '初六：拔茅茹，以其汇，贞吉亨', en: 'Line 1 (Yin): Pulling up grass, roots follow; with your kind; correctness brings good fortune and success.', plainCn: '拔茅连根，与同类守正则吉而亨。', plainEn: 'Pull up grass, roots follow; with your kind, correctness brings good fortune.' },

    { cn: '六二：包承，小人吉，大人否亨', en: 'Line 2 (Yin): Embrace and receive; petty person has good fortune, great person does not succeed.', plainCn: '包容承顺，小人吉，大人否塞不亨。', plainEn: 'Embrace and receive; petty person gains, great person is blocked.' },

    { cn: '六三：包羞', en: 'Line 3 (Yin): Embrace shame.', plainCn: '含羞忍辱。', plainEn: 'Carry shame.' },

    { cn: '九四：有命无咎，畴离祉', en: 'Line 4 (Yang): There is fate, no blame; companions share the blessing.', plainCn: '有天命则无咎，同侪得福。', plainEn: 'With fate, no blame; companions share the blessing.' },

    { cn: '九五：休否，大人吉；其亡其亡，系于苞桑', en: 'Line 5 (Yang): Rest in standstill; great person has good fortune; “It is lost, it is lost”—tied to the clump of mulberries.', plainCn: '否运将止，大人吉；常念“将亡将亡”，如系于丛桑则固。', plainEn: 'Standstill ends; great person has good fortune; \'It is lost\'—hold fast like the mulberry.' },

    { cn: '上九：倾否，先否后喜', en: 'Line 6 (Yang): Overturn standstill; first standstill, then joy.', plainCn: '倾覆否塞，先否后喜。', plainEn: 'Overturn standstill; first block, then joy.' }

  ],
  13: [ // 同人 Tóng Rén
    { cn: '初九：同人于门，无咎', en: 'Line 1 (Yang): Fellowship at the gate; no blame.', plainCn: '在门外与人同心，无咎。', plainEn: 'Fellowship at the gate—no blame.' },

    { cn: '六二：同人于宗，吝', en: 'Line 2 (Yin): Fellowship in the clan; humiliation.', plainCn: '只与同宗同心，则狭隘有吝。', plainEn: 'Fellowship only within the clan—regret.' },

    { cn: '九三：伏戎于莽，升其高陵，三岁不兴', en: 'Line 3 (Yang): Hide troops in the thicket, climb the high hill; for three years do not rise.', plainCn: '伏兵于草莽，登高陵，三年不兴兵。', plainEn: 'Hide troops in the thicket, climb the hill; do not rise for three years.' },

    { cn: '九四：乘其墉，弗克攻，吉', en: 'Line 4 (Yang): Mount the wall; cannot attack; good fortune.', plainCn: '登上城墙，不克攻则止，吉。', plainEn: 'Mount the wall; cannot attack—stop; good fortune.' },

    { cn: '九五：同人，先号咷而后笑，大师克相遇', en: 'Line 5 (Yang): Fellowship; first wailing, then laughter; great army overcomes and meets.', plainCn: '同人先哭后笑，大军终能会师。', plainEn: 'Fellowship; first weeping, then laughter; the great army meets.' },

    { cn: '上九：同人于郊，无悔', en: 'Line 6 (Yang): Fellowship in the suburbs; no regret.', plainCn: '在郊野与人同心，无悔。', plainEn: 'Fellowship in the suburbs—no regret.' }

  ],
  14: [ // 大有 Dà Yǒu
    { cn: '初九：无交害，匪咎，艰则无咎', en: 'Line 1 (Yang): No contact with harm; not blame; in hardship, no blame.', plainCn: '不涉及利害，非咎；在艰困中则无咎。', plainEn: 'No contact with harm; in hardship, no blame.' },

    { cn: '九二：大车以载，有攸往，无咎', en: 'Line 2 (Yang): Great cart for carrying; having somewhere to go; no blame.', plainCn: '大车装载，有所往，无咎。', plainEn: 'Great cart carries; having somewhere to go—no blame.' },

    { cn: '九三：公用亨于天子，小人弗克', en: 'Line 3 (Yang): Duke presents offering to the Son of Heaven; petty person cannot.', plainCn: '公侯献享于天子，小人不能胜任。', plainEn: 'Duke offers to the Son of Heaven; petty person cannot.' },

    { cn: '九四：匪其彭，无咎', en: 'Line 4 (Yang): Not in his grandeur; no blame.', plainCn: '不张扬自大，无咎。', plainEn: 'Not flaunting—no blame.' },

    { cn: '六五：厥孚交如，威如，吉', en: 'Line 5 (Yin): His sincerity connects; awe-inspiring; good fortune.', plainCn: '以诚信相交，有威严，吉。', plainEn: 'Sincerity connects; dignified—good fortune.' },

    { cn: '上九：自天祐之，吉无不利', en: 'Line 6 (Yang): From heaven he is blessed; good fortune, nothing不利.', plainCn: '得天之佑，吉无不利。', plainEn: 'Heaven blesses; good fortune, nothing unfavorable.' }

  ],
  15: [ // 谦 Qiān
    { cn: '初六：谦谦君子，用涉大川，吉', en: 'Line 1 (Yin): Modest, modest noble; crossing the great river; good fortune.', plainCn: '谦而又谦的君子，可渡大川，吉。', plainEn: 'The modest noble can cross the great river—good fortune.' },

    { cn: '六二：鸣谦，贞吉', en: 'Line 2 (Yin): Proclaim modesty; correctness brings good fortune.', plainCn: '谦德外显而闻名，守正则吉。', plainEn: 'Modesty is known; correctness brings good fortune.' },

    { cn: '九三：劳谦君子，有终吉', en: 'Line 3 (Yang): Toiling modest noble; there is an end, good fortune.', plainCn: '勤劳而谦的君子，有善终，吉。', plainEn: 'The toiling modest noble has a good end—good fortune.' },

    { cn: '六四：无不利，撝谦', en: 'Line 4 (Yin): Nothing not favorable; wield modesty.', plainCn: '无不利，发挥谦德。', plainEn: 'Nothing unfavorable; wield modesty.' },

    { cn: '六五：不富以其邻，利用侵伐，无不利', en: 'Line 5 (Yin): Not rich, with neighbors; favorable to use invasion; nothing not favorable.', plainCn: '不独富而与邻共，宜于制敌，无不利。', plainEn: 'Not rich alone, with neighbors; use to subdue opposition—nothing unfavorable.' },

    { cn: '上六：鸣谦，利用行师，征邑国', en: 'Line 6 (Yin): Proclaim modesty; favorable to march the army, campaign against towns.', plainCn: '谦名远播，宜于出师征讨邑国。', plainEn: 'Proclaim modesty; favorable to march and campaign.' }

  ],
  16: [ // 豫 Yù
    { cn: '初六：鸣豫，凶', en: 'Line 1 (Yin): Proclaim ease; misfortune.', plainCn: '沉溺享乐而张扬，凶。', plainEn: 'Proclaim ease—misfortune.' },

    { cn: '六二：介于石，不终日，贞吉', en: 'Line 2 (Yin): Firm as stone; not all day; correctness brings good fortune.', plainCn: '坚如磐石，不终日即悟，守正则吉。', plainEn: 'Firm as stone; not all day; correctness brings good fortune.' },

    { cn: '六三：盱豫悔，迟有悔', en: 'Line 3 (Yin): Gazing at ease, regret; delay brings regret.', plainCn: '媚上求豫则有悔，迟疑也有悔。', plainEn: 'Gazing at ease brings regret; delay brings regret.' },

    { cn: '九四：由豫，大有得，勿疑朋盍簪', en: 'Line 4 (Yang): From ease, great gain; do not doubt, friends gather like hair in a clasp.', plainCn: '由豫而大有得，勿疑，朋辈如簪聚。', plainEn: 'From ease, great gain; do not doubt, friends gather like a clasp.' },

    { cn: '六五：贞疾，恒不死', en: 'Line 5 (Yin): Correctness in illness; constant, does not die.', plainCn: '守正如养疾，可长久不死。', plainEn: 'Correctness in illness; constant, does not die.' },

    { cn: '上六：冥豫，成有渝，无咎', en: 'Line 6 (Yin): Dark ease; completion has change; no blame.', plainCn: '昏昧于豫，成而有变，无咎。', plainEn: 'Dark ease; completion has change—no blame.' }

  ],
  17: [ // 随 Suí
    { cn: '初九：官有渝，贞吉，出门交有功', en: 'Line 1 (Yang): Office has change; correctness brings good fortune; going out the gate to connect brings merit.', plainCn: '职守有变，守正则吉，出门交往有功。', plainEn: 'Office has change; correctness brings good fortune; going out to connect brings merit.' },

    { cn: '六二：系小子，失丈夫', en: 'Line 2 (Yin): Tie to the small one; lose the husband.', plainCn: '系于小人，失去君子。', plainEn: 'Tie to the small one; lose the husband.' },

    { cn: '六三：系丈夫，失小子，随有求得，利居贞', en: 'Line 3 (Yin): Tie to the husband; lose the small one; following has seeking and gain; favorable to abide in correctness.', plainCn: '系于君子，舍小人，随从有求必得，宜守正。', plainEn: 'Tie to the husband; lose the small one; following brings gain; favorable to abide in correctness.' },

    { cn: '九四：随有获，贞凶，有孚在道以明，何咎', en: 'Line 4 (Yang): Following has capture; correctness brings misfortune; sincerity on the way clarifies; what blame?', plainCn: '随从而有获，守正防凶，有诚信在道则明，何咎。', plainEn: 'Following has capture; correctness avoids misfortune; sincerity on the way clarifies—no blame.' },

    { cn: '九五：孚于嘉，吉', en: 'Line 5 (Yang): Sincerity in excellence; good fortune.', plainCn: '诚信于美善，吉。', plainEn: 'Sincerity in excellence—good fortune.' },

    { cn: '上六：拘系之，乃从维之，王用亨于西山', en: 'Line 6 (Yin): Bind and tie; then follow and bind; king makes offering on the western mountain.', plainCn: '拘系而顺从维系，王用以享于西山。', plainEn: 'Bind and tie; then follow and bind; king makes offering on the western mountain.' }

  ],
  18: [ // 蛊 Gǔ
    { cn: '初六：干父之蛊，有子，考无咎，厉终吉', en: 'Line 1 (Yin): Correct the father’s decay; having a son, the father has no blame; peril ends in good fortune.', plainCn: '匡正父辈之弊，有子承业，父无咎，虽厉终吉。', plainEn: 'Correct the father\'s decay; having a son, the father has no blame; peril ends in good fortune.' },

    { cn: '九二：干母之蛊，不可贞', en: 'Line 2 (Yang): Correct the mother’s decay; cannot maintain correctness.', plainCn: '匡正母辈之弊，不可固执。', plainEn: 'Correct the mother\'s decay; cannot be rigid.' },

    { cn: '九三：干父之蛊，小有悔，无大咎', en: 'Line 3 (Yang): Correct the father’s decay; small regret, no great blame.', plainCn: '匡正父辈之弊，小有悔，无大咎。', plainEn: 'Correct the father\'s decay; small regret, no great blame.' },

    { cn: '六四：裕父之蛊，往见吝', en: 'Line 4 (Yin): Indulge the father’s decay; going meets humiliation.', plainCn: '宽纵父辈之弊，往则见吝。', plainEn: 'Indulge the father\'s decay; going meets regret.' },

    { cn: '六五：干父之蛊，用誉', en: 'Line 5 (Yin): Correct the father’s decay; use praise.', plainCn: '匡正父辈之弊，得誉。', plainEn: 'Correct the father\'s decay; use praise.' },

    { cn: '上九：不事王侯，高尚其事', en: 'Line 6 (Yang): Do not serve king or lord; hold your affair high.', plainCn: '不事王侯，以己事为高。', plainEn: 'Do not serve king or lord; hold your affair high.' }

  ],
  19: [ // 临 Lín
    { cn: '初九：咸临，贞吉', en: 'Line 1 (Yang): Approach with influence; correctness brings good fortune.', plainCn: '以感化临人，守正则吉。', plainEn: 'Approach with influence; correctness brings good fortune.' },

    { cn: '九二：咸临，吉无不利', en: 'Line 2 (Yang): Approach with influence; good fortune, nothing not favorable.', plainCn: '以感化临人，吉无不利。', plainEn: 'Approach with influence; good fortune, nothing unfavorable.' },

    { cn: '六三：甘临，无攸利，既忧之，无咎', en: 'Line 3 (Yin): Sweet approach; nothing favorable; once you worry over it, no blame.', plainCn: '以甘言临人，无利；既已忧之则无咎。', plainEn: 'Sweet approach; nothing favorable; once you worry over it—no blame.' },

    { cn: '六四：至临，无咎', en: 'Line 4 (Yin): Utmost approach; no blame.', plainCn: '亲临其境，无咎。', plainEn: 'Utmost approach—no blame.' },

    { cn: '六五：知临，大君之宜，吉', en: 'Line 5 (Yin): Knowing approach; fitting for the great ruler; good fortune.', plainCn: '以智慧临下，大君之宜，吉。', plainEn: 'Knowing approach; fitting for the great ruler—good fortune.' },

    { cn: '上六：敦临，吉无咎', en: 'Line 6 (Yin): Sincere approach; good fortune, no blame.', plainCn: '以敦厚临下，吉无咎。', plainEn: 'Sincere approach; good fortune, no blame.' }

  ],
  20: [ // 观 Guān
    { cn: '初六：童观，小人无咎，君子吝', en: 'Line 1 (Yin): Childish viewing; petty person has no blame, noble has humiliation.', plainCn: '如童子般浅观，小人无咎，君子吝。', plainEn: 'Childish viewing; petty person has no blame, noble has regret.' },

    { cn: '六二：闚观，利女贞', en: 'Line 2 (Yin): Peeping view; favorable for woman’s correctness.', plainCn: '从门缝窥观，利女子守正。', plainEn: 'Peeping view; favorable for woman\'s correctness.' },

    { cn: '六三：观我生，进退', en: 'Line 3 (Yin): View my life; advance and retreat.', plainCn: '观照己身，决定进退。', plainEn: 'View my life; advance and retreat.' },

    { cn: '六四：观国之光，利用宾于王', en: 'Line 4 (Yin): View the country’s light; favorable to be guest of the king.', plainCn: '观王国之光，宜为王之宾。', plainEn: 'View the country\'s light; favorable to be guest of the king.' },

    { cn: '九五：观我生，君子无咎', en: 'Line 5 (Yang): View my life; noble has no blame.', plainCn: '观照己身，君子无咎。', plainEn: 'View my life; noble has no blame.' },

    { cn: '上九：观其生，君子无咎', en: 'Line 6 (Yang): View his life; noble has no blame.', plainCn: '观照其生，君子无咎。', plainEn: 'View his life; noble has no blame.' }

  ],
  21: [ // 噬嗑 Shì Kè
    { cn: '初九：屦校灭趾，无咎', en: 'Line 1 (Yang): Fetters hide the toes; no blame.', plainCn: '脚镣遮住脚趾，小惩无咎。', plainEn: 'Fetters hide the toes; no blame.' },

    { cn: '六二：噬肤灭鼻，无咎', en: 'Line 2 (Yin): Bite through skin, nose disappears; no blame.', plainCn: '咬透皮肤伤及鼻，无咎。', plainEn: 'Bite through skin, nose disappears; no blame.' },

    { cn: '六三：噬腊肉遇毒，小吝，无咎', en: 'Line 3 (Yin): Bite dried meat, meet poison; small humiliation, no blame.', plainCn: '咬干肉遇毒，小有麻烦，无咎。', plainEn: 'Bite dried meat, meet poison; small regret, no blame.' },

    { cn: '九四：噬干胏，得金矢，利艰贞，吉', en: 'Line 4 (Yang): Bite dry gristle, obtain metal arrows; favorable hardship in correctness; good fortune.', plainCn: '咬干骨，得金矢，宜艰守正道，吉。', plainEn: 'Bite dry gristle, obtain metal arrows; hardship in correctness—good fortune.' },

    { cn: '六五：噬干肉，得黄金，贞厉，无咎', en: 'Line 5 (Yin): Bite dry meat, obtain yellow metal; correctness is perilous, no blame.', plainCn: '咬干肉得黄金，守正虽厉无咎。', plainEn: 'Bite dry meat, obtain yellow metal; correctness perilous, no blame.' },

    { cn: '上九：何校灭耳，凶', en: 'Line 6 (Yang): Carrying fetters, ears disappear; misfortune.', plainCn: '肩扛刑具、耳不闻，凶。', plainEn: 'Carrying fetters, ears disappear—misfortune.' }

  ],
  22: [ // 贲 Bì
    { cn: '初九：贲其趾，舍车而徒', en: 'Line 1 (Yang): Adorn his toes; leave the cart and walk.', plainCn: '文饰其足，舍车步行。', plainEn: 'Adorn his toes; leave the cart and walk.' },

    { cn: '六二：贲其须', en: 'Line 2 (Yin): Adorn his beard.', plainCn: '文饰其须。', plainEn: 'Adorn his beard.' },

    { cn: '九三：贲如濡如，永贞吉', en: 'Line 3 (Yang): Adorned, moist; lasting correctness brings good fortune.', plainCn: '文饰润泽，长守正则吉。', plainEn: 'Adorned, moist; lasting correctness brings good fortune.' },

    { cn: '六四：贲如皤如，白马翰如，匪寇婚媾', en: 'Line 4 (Yin): Adorned, white; white horse like wings; not a robber, marriage.', plainCn: '文饰素白，白马如飞，非寇乃婚。', plainEn: 'Adorned, white; white horse like wings; not a robber, marriage.' },

    { cn: '六五：贲于丘园，束帛戋戋，吝，终吉', en: 'Line 5 (Yin): Adorn the hill garden; bundle of silk, scanty; humiliation, in the end good fortune.', plainCn: '饰于丘园，束帛菲薄，虽吝终吉。', plainEn: 'Adorn the hill garden; bundle of silk scanty; regret, in the end good fortune.' },

    { cn: '上九：白贲，无咎', en: 'Line 6 (Yang): White adornment; no blame.', plainCn: '以白为饰，返璞无咎。', plainEn: 'White adornment—no blame.' }

  ],
  23: [ // 剥 Bō
    { cn: '初六：剥床以足，蔑贞凶', en: 'Line 1 (Yin): Stripping the bed from the legs; disregard correctness, misfortune.', plainCn: '剥床从足起，蔑贞则凶。', plainEn: 'Stripping the bed from the legs; disregard correctness—misfortune.' },

    { cn: '六二：剥床以辨，蔑贞凶', en: 'Line 2 (Yin): Stripping the bed from the frame; disregard correctness, misfortune.', plainCn: '剥床至床板，蔑贞则凶。', plainEn: 'Stripping the bed from the frame; disregard correctness—misfortune.' },

    { cn: '六三：剥之无咎', en: 'Line 3 (Yin): Strip it; no blame.', plainCn: '剥而无咎。', plainEn: 'Strip it—no blame.' },

    { cn: '六四：剥床以肤，凶', en: 'Line 4 (Yin): Stripping the bed to the skin; misfortune.', plainCn: '剥及于身，凶。', plainEn: 'Stripping the bed to the skin—misfortune.' },

    { cn: '六五：贯鱼以宫人宠，无不利', en: 'Line 5 (Yin): String of fish like palace women favored; nothing not favorable.', plainCn: '如贯鱼般以宫人承宠，无不利。', plainEn: 'String of fish like palace women favored; nothing unfavorable.' },

    { cn: '上九：硕果不食，君子得舆，小人剥庐', en: 'Line 6 (Yang): Great fruit not eaten; noble gains the cart, petty person loses the hut.', plainCn: '硕果不食；君子得车，小人失庐。', plainEn: 'Great fruit not eaten; noble gains the cart, petty person loses the hut.' }

  ],
  24: [ // 复 Fù
    { cn: '初九：不远复，无祗悔，元吉', en: 'Line 1 (Yang): Return before going far; no great regret; supreme good fortune.', plainCn: '不远即复，无大悔，大吉。', plainEn: 'Return before going far; no great regret—supreme good fortune.' },

    { cn: '六二：休复，吉', en: 'Line 2 (Yin): Restful return; good fortune.', plainCn: '休止而复，吉。', plainEn: 'Restful return—good fortune.' },

    { cn: '六三：频复，厉无咎', en: 'Line 3 (Yin): Repeated return; peril, no blame.', plainCn: '屡次反复，厉而无咎。', plainEn: 'Repeated return; peril, no blame.' },

    { cn: '六四：中行独复', en: 'Line 4 (Yin): Central course, alone return.', plainCn: '居中道而独复。', plainEn: 'Central course, alone return.' },

    { cn: '六五：敦复，无悔', en: 'Line 5 (Yin): Sincere return; no regret.', plainCn: '敦厚而复，无悔。', plainEn: 'Sincere return—no regret.' },

    { cn: '上六：迷复，凶，有灾眚', en: 'Line 6 (Yin): Lost return; misfortune; there is disaster.', plainCn: '迷而不复，凶，有灾。', plainEn: 'Lost return—misfortune; there is disaster.' }

  ],
  25: [ // 无妄 Wú Wàng
    { cn: '初九：无妄，往吉', en: 'Line 1 (Yang): No false step; going brings good fortune.', plainCn: '无妄而行，往则吉。', plainEn: 'No false step; going brings good fortune.' },

    { cn: '六二：不耕获，不菑畲，则利有攸往', en: 'Line 2 (Yin): Do not plow for harvest, do not open new land; then favorable to have somewhere to go.', plainCn: '不耕而望获、不垦而望熟，则利有所往。', plainEn: 'Do not plow for harvest; then favorable to have somewhere to go.' },

    { cn: '六三：无妄之灾，或系之牛，行人之得，邑人之灾', en: 'Line 3 (Yin): Disaster without false step; perhaps a tethered ox; traveler gains, townspeople suffer.', plainCn: '无妄之灾，如系牛被行人牵走，邑人遭灾。', plainEn: 'Disaster without false step; perhaps a tethered ox; traveler gains, townspeople suffer.' },

    { cn: '九四：可贞，无咎', en: 'Line 4 (Yang): Can maintain correctness; no blame.', plainCn: '可守正，无咎。', plainEn: 'Can maintain correctness—no blame.' },

    { cn: '九五：无妄之疾，勿药有喜', en: 'Line 5 (Yang): Illness without false step; no medicine, there is joy.', plainCn: '无妄之疾，勿药自愈。', plainEn: 'Illness without false step; no medicine, there is joy.' },

    { cn: '上九：无妄，行有眚，无攸利', en: 'Line 6 (Yang): No false step; action has disaster; nothing favorable.', plainCn: '无妄而行有灾，无利。', plainEn: 'No false step; action has disaster—nothing favorable.' }

  ],
  26: [ // 大畜 Dà Xù
    { cn: '初九：有厉，利已', en: 'Line 1 (Yang): There is peril; favorable to stop.', plainCn: '有危险，宜止。', plainEn: 'There is peril; favorable to stop.' },

    { cn: '九二：舆说辐', en: 'Line 2 (Yang): Wagon loses its spokes.', plainCn: '车脱辐。', plainEn: 'Wagon loses its spokes.' },

    { cn: '九三：良马逐，利艰贞，曰闲舆卫，利有攸往', en: 'Line 3 (Yang): Good horses chase; favorable hardship in correctness; practice cart and guard; favorable to go.', plainCn: '良马驰逐，利艰贞，熟习车卫，利有所往。', plainEn: 'Good horses chase; favorable hardship in correctness; practice cart and guard—favorable to go.' },

    { cn: '六四：童牛之牿，元吉', en: 'Line 4 (Yin): Calf’s horn guard; supreme good fortune.', plainCn: '小牛加牿，大吉。', plainEn: 'Calf\'s horn guard—supreme good fortune.' },

    { cn: '六五：豮豕之牙，吉', en: 'Line 5 (Yin): Gelded pig’s tusks; good fortune.', plainCn: '去势之猪的牙，吉。', plainEn: 'Gelded pig\'s tusks—good fortune.' },

    { cn: '上九：何天之衢，亨', en: 'Line 6 (Yang): What heaven’s thoroughfare; success.', plainCn: '如行于天道，亨。', plainEn: 'What heaven\'s thoroughfare—success.' }

  ],
  27: [ // 颐 Yí
    { cn: '初九：舍尔灵龟，观我朵颐，凶', en: 'Line 1 (Yang): Abandon your spirit tortoise, watch my drooping jaws; misfortune.', plainCn: '舍你的灵龟，看我鼓腮而食，凶。', plainEn: 'Abandon your spirit tortoise, watch my drooping jaws—misfortune.' },

    { cn: '六二：颠颐，拂经于丘颐，征凶', en: 'Line 2 (Yin): Toppling nourishment; oppose the rule on the hill; going brings misfortune.', plainCn: '颠倒颐养，违背常道，征凶。', plainEn: 'Toppling nourishment; oppose the rule—going brings misfortune.' },

    { cn: '六三：拂颐，贞凶，十年勿用，无攸利', en: 'Line 3 (Yin): Oppose nourishment; correctness brings misfortune; ten years do not use; nothing favorable.', plainCn: '违背颐道，贞凶，十年勿用，无利。', plainEn: 'Oppose nourishment; correctness brings misfortune; ten years do not use—nothing favorable.' },

    { cn: '六四：颠颐吉，虎视眈眈，其欲逐逐，无咎', en: 'Line 4 (Yin): Toppling nourishment, good fortune; tiger’s gaze fixed; his desire pursues; no blame.', plainCn: '颠颐则吉，虎视眈眈、其欲逐逐，无咎。', plainEn: 'Toppling nourishment, good fortune; tiger\'s gaze fixed; his desire pursues—no blame.' },

    { cn: '六五：拂经，居贞吉，不可涉大川', en: 'Line 5 (Yin): Oppose the rule; abide in correctness, good fortune; cannot cross the great river.', plainCn: '拂经，居守正则吉，不可涉大川。', plainEn: 'Oppose the rule; abide in correctness, good fortune; cannot cross the great river.' },

    { cn: '上九：由颐，厉吉，利涉大川', en: 'Line 6 (Yang): From nourishment; peril, good fortune; favorable to cross the great river.', plainCn: '由颐而养，厉则吉，利涉大川。', plainEn: 'From nourishment; peril, good fortune; favorable to cross the great river.' }

  ],
  28: [ // 大过 Dà Guò
    { cn: '初六：藉用白茅，无咎', en: 'Line 1 (Yin): Rest on white reeds; no blame.', plainCn: '用白茅垫放，无咎。', plainEn: 'Rest on white reeds—no blame.' },

    { cn: '九二：枯杨生稊，老夫得其女妻，无不利', en: 'Line 2 (Yang): Withered poplar sprouts; old man gets a young wife; nothing not favorable.', plainCn: '枯杨生嫩芽，老夫得少妻，无不利。', plainEn: 'Withered poplar sprouts; old man gets a young wife—nothing unfavorable.' },

    { cn: '九三：栋桡，凶', en: 'Line 3 (Yang): Ridgepole bends; misfortune.', plainCn: '栋梁弯曲，凶。', plainEn: 'Ridgepole bends—misfortune.' },

    { cn: '九四：栋隆，吉，有它吝', en: 'Line 4 (Yang): Ridgepole rises; good fortune; other matters bring humiliation.', plainCn: '栋梁高起，吉，有他吝。', plainEn: 'Ridgepole rises; good fortune; other matters bring regret.' },

    { cn: '九五：枯杨生华，老妇得其士夫，无咎无誉', en: 'Line 5 (Yang): Withered poplar blooms; old woman gets a young husband; no blame, no praise.', plainCn: '枯杨开花，老妇得少夫，无咎无誉。', plainEn: 'Withered poplar blooms; old woman gets a young husband; no blame, no praise.' },

    { cn: '上六：过涉灭顶，凶，无咎', en: 'Line 6 (Yin): Wading past, drown; misfortune; no blame.', plainCn: '涉深灭顶，凶而义无咎。', plainEn: 'Wading past, drown; misfortune; no blame.' }

  ],
  29: [ // 坎 Kǎn
    { cn: '初六：习坎，入于坎窞，凶', en: 'Line 1 (Yin): Repeated pit; enter the pit’s depth; misfortune.', plainCn: '重坎，陷入坎穴，凶。', plainEn: 'Repeated pit; enter the pit\'s depth—misfortune.' },

    { cn: '九二：坎有险，求小得', en: 'Line 2 (Yang): Pit has danger; seek small gain.', plainCn: '坎中有险，求小有所得。', plainEn: 'Pit has danger; seek small gain.' },

    { cn: '六三：来之坎坎，险且枕，入于坎窞，勿用', en: 'Line 3 (Yin): Coming and going, pit after pit; danger and rest; enter the pit’s depth; do not use.', plainCn: '来去皆坎，险而止，入于坎穴，勿用。', plainEn: 'Coming and going, pit after pit; danger and rest; enter the pit\'s depth—do not use.' },

    { cn: '六四：樽酒簋贰，用缶，纳约自牖，终无咎', en: 'Line 4 (Yin): Jar of wine, two bowls; use earthenware; receive the covenant from the window; in the end no blame.', plainCn: '樽酒二簋，用缶，从牖纳约，终无咎。', plainEn: 'Jar of wine, two bowls; use earthenware; receive the covenant from the window—in the end no blame.' },

    { cn: '九五：坎不盈，祗既平，无咎', en: 'Line 5 (Yang): Pit not full; level already reached; no blame.', plainCn: '坎未盈，已近平，无咎。', plainEn: 'Pit not full; level already reached—no blame.' },

    { cn: '上六：系用徽纆，寘于丛棘，三岁不得，凶', en: 'Line 6 (Yin): Bound with rope, placed in thorn thicket; three years not obtaining; misfortune.', plainCn: '用绳捆缚，置于丛棘，三年不得，凶。', plainEn: 'Bound with rope, placed in thorn thicket; three years not obtaining—misfortune.' }

  ],
  30: [ // 离 Lí
    { cn: '初九：履错然，敬之无咎', en: 'Line 1 (Yang): Treading in confusion; respect it, no blame.', plainCn: '步履错杂，敬之无咎。', plainEn: 'Treading in confusion; respect it—no blame.' },

    { cn: '六二：黄离，元吉', en: 'Line 2 (Yin): Yellow clinging; supreme good fortune.', plainCn: '黄色附丽，大吉。', plainEn: 'Yellow clinging—supreme good fortune.' },

    { cn: '九三：日昃之离，不鼓缶而歌，则大耋之嗟，凶', en: 'Line 3 (Yang): Sun declining clinging; not beating the earthen pot and singing, then the great elder’s sigh; misfortune.', plainCn: '日斜之离，不鼓缶而歌则老耄之嗟，凶。', plainEn: 'Sun declining clinging; not beating the pot and singing, then the elder\'s sigh—misfortune.' },

    { cn: '九四：突如其来如，焚如，死如，弃如', en: 'Line 4 (Yang): Suddenly coming; burning, dying, abandoned.', plainCn: '突如其来，焚、死、弃。', plainEn: 'Suddenly coming; burning, dying, abandoned.' },

    { cn: '六五：出涕沱若，戚嗟若，吉', en: 'Line 5 (Yin): Tears flowing; grief and sigh; good fortune.', plainCn: '涕泣滂沱、忧戚嗟叹，终吉。', plainEn: 'Tears flowing; grief and sigh—good fortune.' },

    { cn: '上九：王用出征，有嘉折首，获匪其丑，无咎', en: 'Line 6 (Yang): King uses it to march; praise, break the chief; capture not his kind; no blame.', plainCn: '王用之以出征，有嘉折首，获非其类，无咎。', plainEn: 'King uses it to march; praise, break the chief; capture not his kind—no blame.' }

  ],
  31: [ // 咸 Xián
    { cn: '初六：咸其拇', en: 'Line 1 (Yin): Influence the big toe.', plainCn: '感应在脚趾。', plainEn: 'Influence the big toe.' },

    { cn: '六二：咸其腓，凶，居吉', en: 'Line 2 (Yin): Influence the calf; misfortune; abiding brings good fortune.', plainCn: '感应在小腿，凶，居则吉。', plainEn: 'Influence the calf; misfortune; abiding brings good fortune.' },

    { cn: '九三：咸其股，执其随，往吝', en: 'Line 3 (Yang): Influence the thigh; hold what follows; going brings humiliation.', plainCn: '感应在股，执其随从，往则吝。', plainEn: 'Influence the thigh; hold what follows; going brings regret.' },

    { cn: '九四：贞吉悔亡，憧憧往来，朋从尔思', en: 'Line 4 (Yang): Correctness brings good fortune, regret vanishes; coming and going in turmoil; friends follow your thought.', plainCn: '贞吉悔亡，憧憧往来，朋从尔思。', plainEn: 'Correctness brings good fortune, regret vanishes; coming and going in turmoil; friends follow your thought.' },

    { cn: '九五：咸其脢，无悔', en: 'Line 5 (Yang): Influence the back of the neck; no regret.', plainCn: '感应在背，无悔。', plainEn: 'Influence the back of the neck—no regret.' },

    { cn: '上六：咸其辅颊舌', en: 'Line 6 (Yin): Influence the jaw, cheek, and tongue.', plainCn: '感应在辅颊与舌。', plainEn: 'Influence the jaw, cheek, and tongue.' }

  ],
  32: [ // 恒 Héng
    { cn: '初六：浚恒，贞凶，无攸利', en: 'Line 1 (Yin): Deep constancy; correctness brings misfortune; nothing favorable.', plainCn: '深求恒，贞凶，无利。', plainEn: 'Deep constancy; correctness brings misfortune—nothing favorable.' },

    { cn: '九二：悔亡', en: 'Line 2 (Yang): Regret vanishes.', plainCn: '悔亡。', plainEn: 'Regret vanishes.' },

    { cn: '九三：不恒其德，或承之羞，贞吝', en: 'Line 3 (Yang): Not constant in virtue; perhaps receive shame; correctness brings humiliation.', plainCn: '不恒其德，或承羞耻，贞吝。', plainEn: 'Not constant in virtue; perhaps receive shame; correctness brings regret.' },

    { cn: '九四：田无禽', en: 'Line 4 (Yang): Field has no game.', plainCn: '田无禽兽。', plainEn: 'Field has no game.' },

    { cn: '六五：恒其德，贞，妇人吉，夫子凶', en: 'Line 5 (Yin): Constant in virtue; correctness; woman has good fortune, husband misfortune.', plainCn: '恒守其德，贞；妇人吉，夫子凶。', plainEn: 'Constant in virtue; correctness; woman has good fortune, husband misfortune.' },

    { cn: '上六：振恒，凶', en: 'Line 6 (Yin): Shaking constancy; misfortune.', plainCn: '动摇恒道，凶。', plainEn: 'Shaking constancy—misfortune.' }

  ],
  33: [ // 遁 Dùn
    { cn: '初六：遁尾，厉，勿用有攸往', en: 'Line 1 (Yin): Retreat’s tail; peril; do not use, have somewhere to go.', plainCn: '遁而在后，厉，勿有所往。', plainEn: 'Retreat\'s tail; peril; do not have somewhere to go.' },

    { cn: '六二：执之用黄牛之革，莫之胜说', en: 'Line 2 (Yin): Hold it with yellow ox leather; none can loosen it.', plainCn: '用黄牛皮捆缚，莫能脱。', plainEn: 'Hold it with yellow ox leather; none can loosen it.' },

    { cn: '九三：系遁，有疾厉，畜臣妾吉', en: 'Line 3 (Yang): Tied retreat; illness, peril; keeping servants and concubines brings good fortune.', plainCn: '系于遁，有疾厉，畜臣妾则吉。', plainEn: 'Tied retreat; illness, peril; keeping servants brings good fortune.' },

    { cn: '九四：好遁，君子吉，小人否', en: 'Line 4 (Yang): Good retreat; noble has good fortune, petty person does not.', plainCn: '好遁，君子吉，小人否。', plainEn: 'Good retreat; noble has good fortune, petty person does not.' },

    { cn: '九五：嘉遁，贞吉', en: 'Line 5 (Yang): Excellent retreat; correctness brings good fortune.', plainCn: '嘉美之遁，贞吉。', plainEn: 'Excellent retreat; correctness brings good fortune.' },

    { cn: '上九：肥遁，无不利', en: 'Line 6 (Yang): Flourishing retreat; nothing not favorable.', plainCn: '远遁，无不利。', plainEn: 'Flourishing retreat; nothing unfavorable.' }

  ],
  34: [ // 大壮 Dà Zhuàng
    { cn: '初九：壮于趾，征凶，有孚', en: 'Line 1 (Yang): Strong in the toes; going brings misfortune; there is sincerity.', plainCn: '壮于脚趾，征凶，有诚信。', plainEn: 'Strong in the toes; going brings misfortune; there is sincerity.' },

    { cn: '九二：贞吉', en: 'Line 2 (Yang): Correctness brings good fortune.', plainCn: '贞吉。', plainEn: 'Correctness brings good fortune.' },

    { cn: '九三：小人用壮，君子用罔，贞厉', en: 'Line 3 (Yang): Petty person uses strength, noble uses the net; correctness is perilous.', plainCn: '小人用壮，君子用网，贞厉。', plainEn: 'Petty person uses strength, noble uses the net; correctness is perilous.' },

    { cn: '九四：贞吉悔亡，藩决不赢，壮于大舆之辐', en: 'Line 4 (Yang): Correctness brings good fortune, regret vanishes; hedge broken, not entangled; strong as the great cart’s spoke.', plainCn: '贞吉悔亡，藩决而不赢，壮于大车之辐。', plainEn: 'Correctness brings good fortune, regret vanishes; hedge broken, not entangled; strong as the great cart\'s spoke.' },

    { cn: '六五：丧羊于易，无悔', en: 'Line 5 (Yin): Lose the sheep at the boundary; no regret.', plainCn: '丧羊于疆场，无悔。', plainEn: 'Lose the sheep at the boundary—no regret.' },

    { cn: '上六：羝羊触藩，不能退，不能遂，无攸利', en: 'Line 6 (Yin): Ram butts the hedge; cannot retreat, cannot advance; nothing favorable.', plainCn: '公羊触藩，不能退不能进，无利。', plainEn: 'Ram butts the hedge; cannot retreat, cannot advance—nothing favorable.' }

  ],
  35: [ // 晋 Jìn
    { cn: '初六：晋如摧如，贞吉，罔孚，裕无咎', en: 'Line 1 (Yin): Advancing, broken; correctness brings good fortune; no sincerity yet; ease, no blame.', plainCn: '进则摧折，贞吉，未孚，宽裕无咎。', plainEn: 'Advancing, broken; correctness brings good fortune; no sincerity yet; ease, no blame.' },

    { cn: '六二：晋如愁如，贞吉，受兹介福，于其王母', en: 'Line 2 (Yin): Advancing, troubled; correctness brings good fortune; receive this great blessing from the king’s mother.', plainCn: '进则愁苦，贞吉，受此大福于王母。', plainEn: 'Advancing, troubled; correctness brings good fortune; receive this great blessing from the king\'s mother.' },

    { cn: '六三：众允，悔亡', en: 'Line 3 (Yin): All agree; regret vanishes.', plainCn: '众人信从，悔亡。', plainEn: 'All agree; regret vanishes.' },

    { cn: '九四：晋如鼫鼠，贞厉', en: 'Line 4 (Yang): Advancing like a mole; correctness is perilous.', plainCn: '进如鼫鼠，贞厉。', plainEn: 'Advancing like a mole; correctness is perilous.' },

    { cn: '六五：悔亡，失得勿恤，往吉无不利', en: 'Line 5 (Yin): Regret vanishes; loss or gain, do not worry; going brings good fortune, nothing not favorable.', plainCn: '悔亡，得失勿恤，往吉无不利。', plainEn: 'Regret vanishes; loss or gain, do not worry; going brings good fortune, nothing unfavorable.' },

    { cn: '上九：晋其角，维用伐邑，厉吉无咎，贞吝', en: 'Line 6 (Yang): Advance to the horn; only use to attack the town; peril, good fortune, no blame; correctness brings humiliation.', plainCn: '进其角，只宜伐邑，厉吉无咎，贞吝。', plainEn: 'Advance to the horn; only use to attack the town; peril, good fortune, no blame; correctness brings regret.' }

  ],
  36: [ // 明夷 Míng Yí
    { cn: '初九：明夷于飞，垂其翼', en: 'Line 1 (Yang): Darkening of the light in flight; drooping its wings.', plainCn: '明夷于飞，垂其翼。', plainEn: 'Darkening of the light in flight; drooping its wings.' },

    { cn: '六二：明夷，夷于左股，用拯马壮，吉', en: 'Line 2 (Yin): Darkening; wound in the left thigh; use a strong horse to save; good fortune.', plainCn: '明夷，伤于左股，用壮马拯救，吉。', plainEn: 'Darkening; wound in the left thigh; use a strong horse to save—good fortune.' },

    { cn: '九三：明夷于南狩，得其大首，不可疾贞', en: 'Line 3 (Yang): Darkening on the southern hunt; obtain its great head; cannot hasten correctness.', plainCn: '明夷于南狩，得其大首，不可疾贞。', plainEn: 'Darkening on the southern hunt; obtain its great head; cannot hasten correctness.' },

    { cn: '六四：入于左腹，获明夷之心，于出门庭', en: 'Line 4 (Yin): Enter the left belly; obtain the darkening’s heart; leave the gate and courtyard.', plainCn: '入于左腹，获明夷之心，出于门庭。', plainEn: 'Enter the left belly; obtain the darkening\'s heart; leave the gate and courtyard.' },

    { cn: '六五：箕子之明夷，贞吉', en: 'Line 5 (Yin): Jizi’s darkening of the light; correctness brings good fortune.', plainCn: '箕子之明夷，贞吉。', plainEn: 'Jizi\'s darkening of the light; correctness brings good fortune.' },

    { cn: '上六：不明晦，初登于天，后入于地', en: 'Line 6 (Yin): Not bright, dark; first ascending to heaven, then entering the earth.', plainCn: '不明而晦，初登于天，后入于地。', plainEn: 'Not bright, dark; first ascending to heaven, then entering the earth.' }

  ],
  37: [ // 家人 Jiā Rén
    { cn: '初九：闲有家，悔亡', en: 'Line 1 (Yang): Guard the family; regret vanishes.', plainCn: '防闲其家，悔亡。', plainEn: 'Guard the family; regret vanishes.' },

    { cn: '六二：无攸遂，在中馈，贞吉', en: 'Line 2 (Yin): Nothing to accomplish; in the central provision; correctness brings good fortune.', plainCn: '无所成，主中馈，贞吉。', plainEn: 'Nothing to accomplish; in the central provision; correctness brings good fortune.' },

    { cn: '九三：家人嗃嗃，悔厉吉', en: 'Line 3 (Yang): Family stern; regret, peril, good fortune.', plainCn: '家人严厉，悔厉终吉。', plainEn: 'Family stern; regret, peril, good fortune.' },

    { cn: '六四：富家，大吉', en: 'Line 4 (Yin): Enrich the family; great good fortune.', plainCn: '富其家，大吉。', plainEn: 'Enrich the family—great good fortune.' },

    { cn: '九五：王假有家，勿恤，吉', en: 'Line 5 (Yang): King arrives at the family; do not worry; good fortune.', plainCn: '王至其家，勿恤，吉。', plainEn: 'King arrives at the family; do not worry—good fortune.' },

    { cn: '上九：有孚威如，终吉', en: 'Line 6 (Yang): Sincerity, awe; in the end good fortune.', plainCn: '有诚信与威严，终吉。', plainEn: 'Sincerity, awe; in the end good fortune.' }

  ],
  38: [ // 睽 Kuí
    { cn: '初九：悔亡，丧马勿逐自复', en: 'Line 1 (Yang): Regret vanishes; lost horse, do not chase, it returns.', plainCn: '悔亡，丧马勿逐自复。', plainEn: 'Regret vanishes; lost horse, do not chase, it returns.' },

    { cn: '九二：遇主于巷，无咎', en: 'Line 2 (Yang): Meet the master in the lane; no blame.', plainCn: '于巷中遇主，无咎。', plainEn: 'Meet the master in the lane—no blame.' },

    { cn: '六三：见舆曳，其牛掣', en: 'Line 3 (Yin): See the cart pulled, its ox held.', plainCn: '见车被曳，其牛被掣。', plainEn: 'See the cart pulled, its ox held.' },

    { cn: '九四：睽孤，遇元夫，交孚，厉无咎', en: 'Line 4 (Yang): Opposed and alone; meet the primal man; connect in sincerity; peril, no blame.', plainCn: '睽而孤，遇元夫，交以孚，厉无咎。', plainEn: 'Opposed and alone; meet the primal man; connect in sincerity; peril, no blame.' },

    { cn: '六五：悔亡，厥宗噬肤，往何咎', en: 'Line 5 (Yin): Regret vanishes; his clan bites skin; going, what blame?', plainCn: '悔亡，其宗噬肤，往何咎。', plainEn: 'Regret vanishes; his clan bites skin; going, what blame?' },

    { cn: '上九：睽孤，见豕负涂，载鬼一车', en: 'Line 6 (Yang): Opposed and alone; see a pig carrying mud, a cart full of ghosts.', plainCn: '睽孤，见豕负涂，载鬼一车。', plainEn: 'Opposed and alone; see a pig carrying mud, a cart full of ghosts.' }

  ],
  39: [ // 蹇 Jiǎn
    { cn: '初六：往蹇，来誉', en: 'Line 1 (Yin): Going, obstruction; coming, praise.', plainCn: '往则蹇，来则誉。', plainEn: 'Going, obstruction; coming, praise.' },

    { cn: '六二：王臣蹇蹇，匪躬之故', en: 'Line 2 (Yin): King’s servant, obstruction upon obstruction; not for his own sake.', plainCn: '王臣蹇蹇，非为自身。', plainEn: 'King\'s servant, obstruction upon obstruction; not for his own sake.' },

    { cn: '九三：往蹇，来反', en: 'Line 3 (Yang): Going, obstruction; coming back.', plainCn: '往蹇，来反。', plainEn: 'Going, obstruction; coming back.' },

    { cn: '六四：往蹇，来连', en: 'Line 4 (Yin): Going, obstruction; coming, connection.', plainCn: '往蹇，来连。', plainEn: 'Going, obstruction; coming, connection.' },

    { cn: '九五：大蹇，朋来', en: 'Line 5 (Yang): Great obstruction; friends come.', plainCn: '大蹇，朋来。', plainEn: 'Great obstruction; friends come.' },

    { cn: '上六：往蹇，来硕，吉', en: 'Line 6 (Yin): Going, obstruction; coming, greatness; good fortune.', plainCn: '往蹇，来则硕，吉。', plainEn: 'Going, obstruction; coming, greatness—good fortune.' }

  ],
  40: [ // 解 Xiè
    { cn: '初六：无咎', en: 'Line 1 (Yin): No blame.', plainCn: '无咎。', plainEn: 'No blame.' },

    { cn: '九二：田获三狐，得黄矢，贞吉', en: 'Line 2 (Yang): Field captures three foxes; obtain yellow arrows; correctness brings good fortune.', plainCn: '田获三狐，得黄矢，贞吉。', plainEn: 'Field captures three foxes; obtain yellow arrows; correctness brings good fortune.' },

    { cn: '六三：负且乘，致寇至', en: 'Line 3 (Yin): Carry and ride; invite the enemy.', plainCn: '负且乘，招致寇至。', plainEn: 'Carry and ride; invite the enemy.' },

    { cn: '九四：解而拇，朋至斯孚', en: 'Line 4 (Yang): Release your thumb; friends come with sincerity.', plainCn: '解你拇指之缚，朋至则孚。', plainEn: 'Release your thumb; friends come with sincerity.' },

    { cn: '六五：君子维有解，吉', en: 'Line 5 (Yin): Noble alone has release; good fortune.', plainCn: '君子唯有解，吉。', plainEn: 'Noble alone has release—good fortune.' },

    { cn: '上六：公用射隼于高墉之上，获之无不利', en: 'Line 6 (Yin): Duke shoots the hawk from the high wall; capture it, nothing not favorable.', plainCn: '公用射隼于高墉之上，获之无不利。', plainEn: 'Duke shoots the hawk from the high wall; capture it—nothing unfavorable.' }

  ],
  41: [ // 损 Sǔn
    { cn: '初九：已事遄往，无咎，酌损之', en: 'Line 1 (Yang): Finish the affair, go quickly; no blame; consider what to decrease.', plainCn: '事已则速往，无咎，酌量减损。', plainEn: 'Finish the affair, go quickly; no blame; consider what to decrease.' },

    { cn: '九二：利贞，征凶，弗损益之', en: 'Line 2 (Yang): Favorable correctness; going brings misfortune; do not decrease, add to it.', plainCn: '利贞，征凶，弗损而益之。', plainEn: 'Favorable correctness; going brings misfortune; do not decrease, add to it.' },

    { cn: '六三：三人行则损一人，一人行则得其友', en: 'Line 3 (Yin): Three people going, lose one; one person going, gain a friend.', plainCn: '三人行则损一人，一人行则得其友。', plainEn: 'Three people going, lose one; one person going, gain a friend.' },

    { cn: '六四：损其疾，使遄有喜，无咎', en: 'Line 4 (Yin): Decrease the illness; make haste, there is joy; no blame.', plainCn: '损其疾，使速有喜，无咎。', plainEn: 'Decrease the illness; make haste, there is joy—no blame.' },

    { cn: '六五：或益之十朋之龟，弗克违，元吉', en: 'Line 5 (Yin): Perhaps add a tortoise worth ten strings; cannot refuse; supreme good fortune.', plainCn: '或益之十朋之龟，弗克违，大吉。', plainEn: 'Perhaps add a tortoise worth ten strings; cannot refuse—supreme good fortune.' },

    { cn: '上九：弗损益之，无咎，贞吉', en: 'Line 6 (Yang): Do not decrease, add to it; no blame; correctness brings good fortune.', plainCn: '弗损而益之，无咎，贞吉。', plainEn: 'Do not decrease, add to it; no blame; correctness brings good fortune.' }

  ],
  42: [ // 益 Yì
    { cn: '初九：利用为大作，元吉无咎', en: 'Line 1 (Yang): Favorable to use for great deeds; supreme good fortune, no blame.', plainCn: '利为大作，大吉无咎。', plainEn: 'Favorable to use for great deeds; supreme good fortune, no blame.' },

    { cn: '六二：或益之十朋之龟，弗克违，永贞吉', en: 'Line 2 (Yin): Perhaps add a tortoise worth ten strings; cannot refuse; lasting correctness, good fortune.', plainCn: '或益之十朋之龟，弗克违，永贞吉。', plainEn: 'Perhaps add a tortoise worth ten strings; cannot refuse; lasting correctness, good fortune.' },

    { cn: '六三：益之用凶事，无咎', en: 'Line 3 (Yin): Increase used for dire affairs; no blame.', plainCn: '益之用凶事，无咎。', plainEn: 'Increase used for dire affairs—no blame.' },

    { cn: '六四：中行告公从，利用为依迁国', en: 'Line 4 (Yin): Central course, report to the duke, he follows; favorable to rely on to move the state.', plainCn: '中行告公从，利为依迁国。', plainEn: 'Central course, report to the duke, he follows; favorable to rely on to move the state.' },

    { cn: '九五：有孚惠心，勿问元吉', en: 'Line 5 (Yang): Sincerity, benevolent heart; do not ask, supreme good fortune.', plainCn: '有孚惠心，勿问大吉。', plainEn: 'Sincerity, benevolent heart; do not ask—supreme good fortune.' },

    { cn: '上九：莫益之，或击之，立心勿恒，凶', en: 'Line 6 (Yang): None add to it; perhaps strike it; set the heart without constancy; misfortune.', plainCn: '莫益之，或击之，立心勿恒，凶。', plainEn: 'None add to it; perhaps strike it; set the heart without constancy—misfortune.' }

  ],
  43: [ // 夬 Guài
    { cn: '初九：壮于前趾，往不胜为咎', en: 'Line 1 (Yang): Strong in the front toes; going cannot win, blame.', plainCn: '壮于前趾，往不胜为咎。', plainEn: 'Strong in the front toes; going cannot win—blame.' },

    { cn: '九二：惕号，莫夜有戎，勿恤', en: 'Line 2 (Yang): Alert call; night has arms; do not worry.', plainCn: '惕号，暮夜有戎，勿恤。', plainEn: 'Alert call; night has arms—do not worry.' },

    { cn: '九三：壮于頄，有凶', en: 'Line 3 (Yang): Strong in the cheekbones; there is misfortune.', plainCn: '壮于颧骨，有凶。', plainEn: 'Strong in the cheekbones; there is misfortune.' },

    { cn: '九四：臀无肤，其行次且', en: 'Line 4 (Yang): Buttocks without skin; his walking hesitant.', plainCn: '臀无肤，其行趑趄。', plainEn: 'Buttocks without skin; his walking hesitant.' },

    { cn: '九五：苋陆夬夬，中行无咎', en: 'Line 5 (Yang): Purslane, decisive, decisive; central course, no blame.', plainCn: '苋陆夬夬，中行无咎。', plainEn: 'Purslane, decisive; central course—no blame.' },

    { cn: '上六：无号，终有凶', en: 'Line 6 (Yin): No call; in the end there is misfortune.', plainCn: '无号，终有凶。', plainEn: 'No call; in the end there is misfortune.' }

  ],
  44: [ // 姤 Gòu
    { cn: '初六：系于金柅，贞吉', en: 'Line 1 (Yin): Tie to the metal brake; correctness brings good fortune.', plainCn: '系于金柅，贞吉。', plainEn: 'Tie to the metal brake; correctness brings good fortune.' },

    { cn: '九二：包有鱼，无咎，不利宾', en: 'Line 2 (Yang): Wrapping has fish; no blame; not favorable for the guest.', plainCn: '包有鱼，无咎，不利宾。', plainEn: 'Wrapping has fish; no blame; not favorable for the guest.' },

    { cn: '九三：臀无肤，其行次且', en: 'Line 3 (Yang): Buttocks without skin; his walking hesitant.', plainCn: '臀无肤，其行趑趄。', plainEn: 'Buttocks without skin; his walking hesitant.' },

    { cn: '九四：包无鱼，起凶', en: 'Line 4 (Yang): Wrapping has no fish; rise, misfortune.', plainCn: '包无鱼，起则凶。', plainEn: 'Wrapping has no fish; rise—misfortune.' },

    { cn: '九五：以杞包瓜，含章，有陨自天', en: 'Line 5 (Yang): With willow wrap the melon; hold the pattern; fall from heaven.', plainCn: '以杞包瓜，含章，有陨自天。', plainEn: 'With willow wrap the melon; hold the pattern; fall from heaven.' },

    { cn: '上九：姤其角，吝，无咎', en: 'Line 6 (Yang): Meet at the horn; humiliation; no blame.', plainCn: '姤其角，吝，无咎。', plainEn: 'Meet at the horn; regret; no blame.' }

  ],
  45: [ // 萃 Cuì
    { cn: '初六：有孚不终，乃乱乃萃', en: 'Line 1 (Yin): Sincerity not lasting; then chaos, then gathering.', plainCn: '有孚不终，乃乱乃萃。', plainEn: 'Sincerity not lasting; then chaos, then gathering.' },

    { cn: '六二：引吉，无咎', en: 'Line 2 (Yin): Draw in, good fortune; no blame.', plainCn: '引则吉，无咎。', plainEn: 'Draw in, good fortune—no blame.' },

    { cn: '六三：萃如嗟如，无攸利', en: 'Line 3 (Yin): Gather and sigh; nothing favorable.', plainCn: '萃如嗟如，无利。', plainEn: 'Gather and sigh—nothing favorable.' },

    { cn: '九四：大吉无咎', en: 'Line 4 (Yang): Great good fortune, no blame.', plainCn: '大吉无咎。', plainEn: 'Great good fortune, no blame.' },

    { cn: '九五：萃有位，无咎', en: 'Line 5 (Yang): Gather with position; no blame.', plainCn: '萃而有位，无咎。', plainEn: 'Gather with position—no blame.' },

    { cn: '上六：赍咨涕洟，无咎', en: 'Line 6 (Yin): Sighing, tears and mucus; no blame.', plainCn: '赍咨涕洟，无咎。', plainEn: 'Sighing, tears and mucus—no blame.' }

  ],
  46: [ // 升 Shēng
    { cn: '初六：允升，大吉', en: 'Line 1 (Yin): True ascent; great good fortune.', plainCn: '允升，大吉。', plainEn: 'True ascent—great good fortune.' },

    { cn: '九二：孚乃利用禴，无咎', en: 'Line 2 (Yang): Sincerity then favorable for the simple offering; no blame.', plainCn: '孚乃利用禴，无咎。', plainEn: 'Sincerity then favorable for the simple offering—no blame.' },

    { cn: '九三：升虚邑', en: 'Line 3 (Yang): Ascend the empty town.', plainCn: '升于虚邑。', plainEn: 'Ascend the empty town.' },

    { cn: '六四：王用亨于岐山，吉无咎', en: 'Line 4 (Yin): King makes offering at Mount Qi; good fortune, no blame.', plainCn: '王用亨于岐山，吉无咎。', plainEn: 'King makes offering at Mount Qi; good fortune, no blame.' },

    { cn: '六五：贞吉，升阶', en: 'Line 5 (Yin): Correctness brings good fortune; ascend the steps.', plainCn: '贞吉，升阶。', plainEn: 'Correctness brings good fortune; ascend the steps.' },

    { cn: '上六：冥升，利于不息之贞', en: 'Line 6 (Yin): Dark ascent; favorable for unceasing correctness.', plainCn: '冥升，利于不息之贞。', plainEn: 'Dark ascent; favorable for unceasing correctness.' }

  ],
  47: [ // 困 Kùn
    { cn: '初六：臀困于株木', en: 'Line 1 (Yin): Buttocks oppressed by the stump.', plainCn: '臀困于株木。', plainEn: 'Buttocks oppressed by the stump.' },

    { cn: '九二：困于酒食，朱绂方来', en: 'Line 2 (Yang): Oppressed by wine and food; red sash soon comes.', plainCn: '困于酒食，朱绂方来。', plainEn: 'Oppressed by wine and food; red sash soon comes.' },

    { cn: '六三：困于石，据于蒺藜', en: 'Line 3 (Yin): Oppressed by stone, lean on thorns.', plainCn: '困于石，据于蒺藜。', plainEn: 'Oppressed by stone, lean on thorns.' },

    { cn: '九四：来徐徐，困于金车', en: 'Line 4 (Yang): Coming slowly; oppressed by metal cart.', plainCn: '来徐徐，困于金车。', plainEn: 'Coming slowly; oppressed by metal cart.' },

    { cn: '九五：劓刖，困于赤绂', en: 'Line 5 (Yang): Nose and feet cut; oppressed by red sash.', plainCn: '劓刖，困于赤绂。', plainEn: 'Nose and feet cut; oppressed by red sash.' },

    { cn: '上六：困于葛藟，于臲卼，曰动悔有悔，征吉', en: 'Line 6 (Yin): Oppressed by vines, in danger; say: move, regret, have regret; going brings good fortune.', plainCn: '困于葛藟，于臲卼，曰动悔有悔，征吉。', plainEn: 'Oppressed by vines, in danger; say: move, regret; going brings good fortune.' }

  ],
  48: [ // 井 Jǐng
    { cn: '初六：井泥不食，旧井无禽', en: 'Line 1 (Yin): Well mud, not to drink; old well has no birds.', plainCn: '井泥不食，旧井无禽。', plainEn: 'Well mud, not to drink; old well has no birds.' },

    { cn: '九二：井谷射鲋，瓮敝漏', en: 'Line 2 (Yang): Well valley shoots the minnow; jar broken, leaks.', plainCn: '井谷射鲋，瓮敝漏。', plainEn: 'Well valley shoots the minnow; jar broken, leaks.' },

    { cn: '九三：井渫不食，为我心恻', en: 'Line 3 (Yang): Well cleared, not drunk; for me, heart sad.', plainCn: '井渫不食，为我心恻。', plainEn: 'Well cleared, not drunk; for me, heart sad.' },

    { cn: '六四：井甃，无咎', en: 'Line 4 (Yin): Well lined; no blame.', plainCn: '井甃，无咎。', plainEn: 'Well lined—no blame.' },

    { cn: '九五：井冽寒泉食', en: 'Line 5 (Yang): Well cold, spring water to drink.', plainCn: '井冽寒泉可食。', plainEn: 'Well cold, spring water to drink.' },

    { cn: '上六：井收勿幕，有孚元吉', en: 'Line 6 (Yin): Well complete, do not cover; sincerity, supreme good fortune.', plainCn: '井成勿幕，有孚大吉。', plainEn: 'Well complete, do not cover; sincerity—supreme good fortune.' }

  ],
  49: [ // 革 Gé
    { cn: '初九：巩用黄牛之革', en: 'Line 1 (Yang): Bind with yellow ox leather.', plainCn: '巩用黄牛之革。', plainEn: 'Bind with yellow ox leather.' },

    { cn: '六二：己日乃革之，征吉无咎', en: 'Line 2 (Yin): On the day of renewal, change it; going brings good fortune, no blame.', plainCn: '己日乃革之，征吉无咎。', plainEn: 'On the day of renewal, change it; going brings good fortune, no blame.' },

    { cn: '九三：征凶贞厉', en: 'Line 3 (Yang): Going brings misfortune; correctness is perilous.', plainCn: '征凶贞厉。', plainEn: 'Going brings misfortune; correctness is perilous.' },

    { cn: '九四：悔亡，有孚改命，吉', en: 'Line 4 (Yang): Regret vanishes; sincerity changes fate; good fortune.', plainCn: '悔亡，有孚改命，吉。', plainEn: 'Regret vanishes; sincerity changes fate—good fortune.' },

    { cn: '九五：大人虎变，未占有孚', en: 'Line 5 (Yang): Great one’s tiger change; not yet divined, there is sincerity.', plainCn: '大人虎变，未占有孚。', plainEn: 'Great one\'s tiger change; not yet divined, there is sincerity.' },

    { cn: '上六：君子豹变，小人革面', en: 'Line 6 (Yin): Noble’s leopard change; petty person changes face.', plainCn: '君子豹变，小人革面。', plainEn: 'Noble\'s leopard change; petty person changes face.' }

  ],
  50: [ // 鼎 Dǐng
    { cn: '初六：鼎颠趾，利出否', en: 'Line 1 (Yin): Cauldron topples on its legs; favorable to go out, reject.', plainCn: '鼎颠趾，利出否。', plainEn: 'Cauldron topples on its legs; favorable to go out, reject.' },

    { cn: '九二：鼎有实，我仇有疾', en: 'Line 2 (Yang): Cauldron has substance; my mate has illness.', plainCn: '鼎有实，我仇有疾。', plainEn: 'Cauldron has substance; my mate has illness.' },

    { cn: '九三：鼎耳革，其行塞', en: 'Line 3 (Yang): Cauldron’s ears changed; its course blocked.', plainCn: '鼎耳革，其行塞。', plainEn: 'Cauldron\'s ears changed; its course blocked.' },

    { cn: '九四：鼎折足，覆公餗', en: 'Line 4 (Yang): Cauldron breaks its legs; overturn the duke’s stew.', plainCn: '鼎折足，覆公餗。', plainEn: 'Cauldron breaks its legs; overturn the duke\'s stew.' },

    { cn: '六五：鼎黄耳金铉，利贞', en: 'Line 5 (Yin): Cauldron yellow ears, metal ring; favorable correctness.', plainCn: '鼎黄耳金铉，利贞。', plainEn: 'Cauldron yellow ears, metal ring; favorable correctness.' },

    { cn: '上九：鼎玉铉，大吉无不利', en: 'Line 6 (Yang): Cauldron jade ring; great good fortune, nothing not favorable.', plainCn: '鼎玉铉，大吉无不利。', plainEn: 'Cauldron jade ring; great good fortune, nothing unfavorable.' }

  ],
  51: [ // 震 Zhèn
    { cn: '初九：震来虩虩，后笑言哑哑', en: 'Line 1 (Yang): Thunder comes, terror; afterward laughter and talk.', plainCn: '震来虩虩，后笑言哑哑。', plainEn: 'Thunder comes, terror; afterward laughter and talk.' },

    { cn: '六二：震来厉，亿丧贝', en: 'Line 2 (Yin): Thunder comes, peril; lose the cowries.', plainCn: '震来厉，亿丧贝。', plainEn: 'Thunder comes, peril; lose the cowries.' },

    { cn: '六三：震苏苏，震行无眚', en: 'Line 3 (Yin): Thunder trembling; thunder’s course has no disaster.', plainCn: '震苏苏，震行无眚。', plainEn: 'Thunder trembling; thunder\'s course has no disaster.' },

    { cn: '九四：震遂泥', en: 'Line 4 (Yang): Thunder sinks in mud.', plainCn: '震遂泥。', plainEn: 'Thunder sinks in mud.' },

    { cn: '六五：震往来厉，亿无丧有事', en: 'Line 5 (Yin): Thunder coming and going, peril; no loss, there are affairs.', plainCn: '震往来厉，亿无丧有事。', plainEn: 'Thunder coming and going, peril; no loss, there are affairs.' },

    { cn: '上六：震索索，视矍矍', en: 'Line 6 (Yin): Thunder searching; gaze darting.', plainCn: '震索索，视矍矍。', plainEn: 'Thunder searching; gaze darting.' }

  ],
  52: [ // 艮 Gèn
    { cn: '初六：艮其趾，无咎', en: 'Line 1 (Yin): Still the toes; no blame.', plainCn: '艮其趾，无咎。', plainEn: 'Still the toes—no blame.' },

    { cn: '六二：艮其腓，不拯其随，其心不快', en: 'Line 2 (Yin): Still the calf; do not lift what follows; his heart not at ease.', plainCn: '艮其腓，不拯其随，其心不快。', plainEn: 'Still the calf; do not lift what follows; his heart not at ease.' },

    { cn: '九三：艮其限，列其夤，厉薰心', en: 'Line 3 (Yang): Still the waist; split the spine; peril smokes the heart.', plainCn: '艮其限，列其夤，厉薰心。', plainEn: 'Still the waist; split the spine; peril smokes the heart.' },

    { cn: '六四：艮其身，无咎', en: 'Line 4 (Yin): Still the body; no blame.', plainCn: '艮其身，无咎。', plainEn: 'Still the body—no blame.' },

    { cn: '六五：艮其辅，言有序，悔亡', en: 'Line 5 (Yin): Still the jaw; words have order; regret vanishes.', plainCn: '艮其辅，言有序，悔亡。', plainEn: 'Still the jaw; words have order; regret vanishes.' },

    { cn: '上九：敦艮，吉', en: 'Line 6 (Yang): Sincere stillness; good fortune.', plainCn: '敦艮，吉。', plainEn: 'Sincere stillness—good fortune.' }

  ],
  53: [ // 渐 Jiàn
    { cn: '初六：鸿渐于干', en: 'Line 1 (Yin): Wild goose gradually at the shore.', plainCn: '鸿渐于干。', plainEn: 'Wild goose gradually at the shore.' },

    { cn: '六二：鸿渐于磐，饮食衎衎', en: 'Line 2 (Yin): Wild goose gradually on the rock; eating and drinking, content.', plainCn: '鸿渐于磐，饮食衎衎。', plainEn: 'Wild goose gradually on the rock; eating and drinking, content.' },

    { cn: '九三：鸿渐于陆', en: 'Line 3 (Yang): Wild goose gradually on the land.', plainCn: '鸿渐于陆。', plainEn: 'Wild goose gradually on the land.' },

    { cn: '六四：鸿渐于木', en: 'Line 4 (Yin): Wild goose gradually in the tree.', plainCn: '鸿渐于木。', plainEn: 'Wild goose gradually in the tree.' },

    { cn: '九五：鸿渐于陵', en: 'Line 5 (Yang): Wild goose gradually on the hill.', plainCn: '鸿渐于陵。', plainEn: 'Wild goose gradually on the hill.' },

    { cn: '上九：鸿渐于陆，其羽可用为仪', en: 'Line 6 (Yang): Wild goose gradually on the land; its feathers can be used for the ceremony.', plainCn: '鸿渐于陆，其羽可用为仪。', plainEn: 'Wild goose gradually on the land; its feathers can be used for the ceremony.' }

  ],
  54: [ // 归妹 Guī Mèi
    { cn: '初九：归妹以娣，跛能履', en: 'Line 1 (Yang): Marrying maiden as younger sister; lame can walk.', plainCn: '归妹以娣，跛能履。', plainEn: 'Marrying maiden as younger sister; lame can walk.' },

    { cn: '九二：眇能视', en: 'Line 2 (Yang): One-eyed can see.', plainCn: '眇能视。', plainEn: 'One-eyed can see.' },

    { cn: '六三：归妹以须，反归以娣', en: 'Line 3 (Yin): Marrying maiden as concubine; return to marry as younger sister.', plainCn: '归妹以须，反归以娣。', plainEn: 'Marrying maiden as concubine; return to marry as younger sister.' },

    { cn: '九四：归妹愆期，迟归有时', en: 'Line 4 (Yang): Marrying maiden delayed; late return has its time.', plainCn: '归妹愆期，迟归有时。', plainEn: 'Marrying maiden delayed; late return has its time.' },

    { cn: '六五：帝乙归妹，其君之袂不如其娣之袂良', en: 'Line 5 (Yin): Emperor Yi marries maiden; her lord’s sleeves not as good as the younger sister’s.', plainCn: '帝乙归妹，其君之袂不如其娣之袂良。', plainEn: 'Emperor Yi marries maiden; her lord\'s sleeves not as good as the younger sister\'s.' },

    { cn: '上六：女承筐无实', en: 'Line 6 (Yin): Woman carries basket without substance.', plainCn: '女承筐无实。', plainEn: 'Woman carries basket without substance.' }

  ],
  55: [ // 丰 Fēng
    { cn: '初九：遇其配主，虽旬无咎', en: 'Line 1 (Yang): Meet his matching lord; though equal, no blame.', plainCn: '遇其配主，虽旬无咎。', plainEn: 'Meet his matching lord; though equal, no blame.' },

    { cn: '六二：丰其蔀', en: 'Line 2 (Yin): Abundance, its covering.', plainCn: '丰其蔀。', plainEn: 'Abundance, its covering.' },

    { cn: '九三：丰其沛', en: 'Line 3 (Yang): Abundance, its curtain.', plainCn: '丰其沛。', plainEn: 'Abundance, its curtain.' },

    { cn: '九四：丰其蔀', en: 'Line 4 (Yang): Abundance, its covering.', plainCn: '丰其蔀。', plainEn: 'Abundance, its covering.' },

    { cn: '六五：来章有庆誉，吉', en: 'Line 5 (Yin): Coming pattern has celebration and praise; good fortune.', plainCn: '来章有庆誉，吉。', plainEn: 'Coming pattern has celebration and praise—good fortune.' },

    { cn: '上六：丰其屋，蔀其家', en: 'Line 6 (Yin): Abundance his house; cover his home.', plainCn: '丰其屋，蔀其家。', plainEn: 'Abundance his house; cover his home.' }

  ],
  56: [ // 旅 Lǚ
    { cn: '初六：旅琐琐，斯其所取灾', en: 'Line 1 (Yin): Travel petty; this is what brings disaster.', plainCn: '旅琐琐，斯其所取灾。', plainEn: 'Travel petty; this is what brings disaster.' },

    { cn: '六二：旅即次，怀其资，得童仆贞', en: 'Line 2 (Yin): Travel reaches the inn; hold his funds; gain servant’s correctness.', plainCn: '旅即次，怀其资，得童仆贞。', plainEn: 'Travel reaches the inn; hold his funds; gain servant\'s correctness.' },

    { cn: '九三：旅焚其次，丧其童仆', en: 'Line 3 (Yang): Travel burns his inn; lose his servant.', plainCn: '旅焚其次，丧其童仆。', plainEn: 'Travel burns his inn; lose his servant.' },

    { cn: '九四：旅于处，得其资斧', en: 'Line 4 (Yang): Travel in place; obtain his funds and axe.', plainCn: '旅于处，得其资斧。', plainEn: 'Travel in place; obtain his funds and axe.' },

    { cn: '六五：射雉一矢亡', en: 'Line 5 (Yin): Shoot the pheasant, one arrow lost.', plainCn: '射雉一矢亡。', plainEn: 'Shoot the pheasant, one arrow lost.' },

    { cn: '上九：鸟焚其巢', en: 'Line 6 (Yang): Bird burns its nest.', plainCn: '鸟焚其巢。', plainEn: 'Bird burns its nest.' }

  ],
  57: [ // 巽 Xùn
    { cn: '初六：进退，利武人之贞', en: 'Line 1 (Yin): Advance and retreat; favorable for the warrior’s correctness.', plainCn: '进退，利武人之贞。', plainEn: 'Advance and retreat; favorable for the warrior\'s correctness.' },

    { cn: '九二：巽在床下', en: 'Line 2 (Yang): Penetration under the bed.', plainCn: '巽在床下。', plainEn: 'Penetration under the bed.' },

    { cn: '九三：频巽，吝', en: 'Line 3 (Yang): Repeated penetration; humiliation.', plainCn: '频巽，吝。', plainEn: 'Repeated penetration; regret.' },

    { cn: '六四：悔亡，田获三品', en: 'Line 4 (Yin): Regret vanishes; field captures three kinds.', plainCn: '悔亡，田获三品。', plainEn: 'Regret vanishes; field captures three kinds.' },

    { cn: '九五：贞吉悔亡，无不利', en: 'Line 5 (Yang): Correctness brings good fortune, regret vanishes; nothing not favorable.', plainCn: '贞吉悔亡，无不利。', plainEn: 'Correctness brings good fortune, regret vanishes; nothing unfavorable.' },

    { cn: '上九：巽在床下，丧其资斧', en: 'Line 6 (Yang): Penetration under the bed; lose funds and axe.', plainCn: '巽在床下，丧其资斧。', plainEn: 'Penetration under the bed; lose funds and axe.' }

  ],
  58: [ // 兑 Duì
    { cn: '初九：和兑，吉', en: 'Line 1 (Yang): Harmonious joy; good fortune.', plainCn: '和兑，吉。', plainEn: 'Harmonious joy—good fortune.' },

    { cn: '九二：孚兑，吉，悔亡', en: 'Line 2 (Yang): Sincere joy; good fortune; regret vanishes.', plainCn: '孚兑，吉，悔亡。', plainEn: 'Sincere joy; good fortune; regret vanishes.' },

    { cn: '六三：来兑，凶', en: 'Line 3 (Yin): Coming joy; misfortune.', plainCn: '来兑，凶。', plainEn: 'Coming joy—misfortune.' },

    { cn: '九四：商兑未宁', en: 'Line 4 (Yang): Deliberate joy, not yet at peace.', plainCn: '商兑未宁。', plainEn: 'Deliberate joy, not yet at peace.' },

    { cn: '九五：孚于剥，有厉', en: 'Line 5 (Yang): Sincerity in stripping; there is peril.', plainCn: '孚于剥，有厉。', plainEn: 'Sincerity in stripping; there is peril.' },

    { cn: '上六：引兑', en: 'Line 6 (Yin): Draw in joy.', plainCn: '引兑。', plainEn: 'Draw in joy.' }

  ],
  59: [ // 涣 Huàn
    { cn: '初六：用拯马壮，吉', en: 'Line 1 (Yin): Use a strong horse to save; good fortune.', plainCn: '用拯马壮，吉。', plainEn: 'Use a strong horse to save—good fortune.' },

    { cn: '九二：涣奔其机', en: 'Line 2 (Yang): Dispersion runs to its base.', plainCn: '涣奔其机。', plainEn: 'Dispersion runs to its base.' },

    { cn: '六三：涣其躬', en: 'Line 3 (Yin): Disperse the self.', plainCn: '涣其躬。', plainEn: 'Disperse the self.' },

    { cn: '六四：涣其群，元吉', en: 'Line 4 (Yin): Disperse the crowd; supreme good fortune.', plainCn: '涣其群，大吉。', plainEn: 'Disperse the crowd—supreme good fortune.' },

    { cn: '九五：涣汗其大号', en: 'Line 5 (Yang): Dispersion, sweat, his great call.', plainCn: '涣汗其大号。', plainEn: 'Dispersion, sweat, his great call.' },

    { cn: '上九：涣其血去逖出', en: 'Line 6 (Yang): Disperse his blood, leave, go far.', plainCn: '涣其血去逖出。', plainEn: 'Disperse his blood, leave, go far.' }

  ],
  60: [ // 节 Jié
    { cn: '初九：不出户庭，无咎', en: 'Line 1 (Yang): Do not go out the door and courtyard; no blame.', plainCn: '不出户庭，无咎。', plainEn: 'Do not go out the door and courtyard—no blame.' },

    { cn: '九二：不出门庭，凶', en: 'Line 2 (Yang): Do not go out the gate and courtyard; misfortune.', plainCn: '不出门庭，凶。', plainEn: 'Do not go out the gate and courtyard—misfortune.' },

    { cn: '六三：不节若，则嗟若', en: 'Line 3 (Yin): Not limiting; then sighing.', plainCn: '不节若，则嗟若。', plainEn: 'Not limiting; then sighing.' },

    { cn: '六四：安节，亨', en: 'Line 4 (Yin): Peaceful limitation; success.', plainCn: '安节，亨。', plainEn: 'Peaceful limitation—success.' },

    { cn: '九五：甘节，吉', en: 'Line 5 (Yang): Sweet limitation; good fortune.', plainCn: '甘节，吉。', plainEn: 'Sweet limitation—good fortune.' },

    { cn: '上六：苦节，贞凶', en: 'Line 6 (Yin): Bitter limitation; correctness brings misfortune.', plainCn: '苦节，贞凶。', plainEn: 'Bitter limitation; correctness brings misfortune.' }

  ],
  61: [ // 中孚 Zhōng Fú
    { cn: '初九：虞吉，有它不燕', en: 'Line 1 (Yang): At ease, good fortune; other matters, not at rest.', plainCn: '虞吉，有它不燕。', plainEn: 'At ease, good fortune; other matters, not at rest.' },

    { cn: '九二：鸣鹤在阴，其子和之', en: 'Line 2 (Yang): Crying crane in the shade; its young answer.', plainCn: '鸣鹤在阴，其子和之。', plainEn: 'Crying crane in the shade; its young answer.' },

    { cn: '六三：得敌', en: 'Line 3 (Yin): Meet the enemy.', plainCn: '得敌。', plainEn: 'Meet the enemy.' },

    { cn: '六四：月几望，马匹亡', en: 'Line 4 (Yin): Moon nearly full; horse pair lost.', plainCn: '月几望，马匹亡。', plainEn: 'Moon nearly full; horse pair lost.' },

    { cn: '九五：有孚挛如', en: 'Line 5 (Yang): Sincerity binds.', plainCn: '有孚挛如。', plainEn: 'Sincerity binds.' },

    { cn: '上九：翰音登于天', en: 'Line 6 (Yang): Bird’s cry rises to heaven.', plainCn: '翰音登于天。', plainEn: 'Bird\'s cry rises to heaven.' }

  ],
  62: [ // 小过 Xiǎo Guò
    { cn: '初六：飞鸟以凶', en: 'Line 1 (Yin): Flying bird brings misfortune.', plainCn: '飞鸟以凶。', plainEn: 'Flying bird brings misfortune.' },

    { cn: '六二：过其祖，遇其妣', en: 'Line 2 (Yin): Pass his grandfather, meet his grandmother.', plainCn: '过其祖，遇其妣。', plainEn: 'Pass his grandfather, meet his grandmother.' },

    { cn: '九三：弗过防之', en: 'Line 3 (Yang): Do not exceed; guard against it.', plainCn: '弗过防之。', plainEn: 'Do not exceed; guard against it.' },

    { cn: '九四：无咎，弗过遇之', en: 'Line 4 (Yang): No blame; do not exceed, meet it.', plainCn: '无咎，弗过遇之。', plainEn: 'No blame; do not exceed, meet it.' },

    { cn: '六五：密云不雨', en: 'Line 5 (Yin): Dense clouds, no rain.', plainCn: '密云不雨。', plainEn: 'Dense clouds, no rain.' },

    { cn: '上六：弗遇过之', en: 'Line 6 (Yin): Do not meet, exceed it.', plainCn: '弗遇过之。', plainEn: 'Do not meet, exceed it.' }

  ],
  63: [ // 既济 Jì Jì
    { cn: '初九：曳其轮，濡其尾，无咎', en: 'Line 1 (Yang): Drag the wheel; wet the tail; no blame.', plainCn: '曳其轮，濡其尾，无咎。', plainEn: 'Drag the wheel; wet the tail—no blame.' },

    { cn: '六二：妇丧其茀', en: 'Line 2 (Yin): Woman loses her veil.', plainCn: '妇丧其茀。', plainEn: 'Woman loses her veil.' },

    { cn: '九三：高宗伐鬼方', en: 'Line 3 (Yang): High Ancestor attacked the Demon Region.', plainCn: '高宗伐鬼方。', plainEn: 'High Ancestor attacked the Demon Region.' },

    { cn: '六四：繻有衣袽', en: 'Line 4 (Yin): Silk has rags.', plainCn: '繻有衣袽。', plainEn: 'Silk has rags.' },

    { cn: '九五：东邻杀牛，不如西邻之禴祭', en: 'Line 5 (Yang): Eastern neighbor kills ox; not as good as western neighbor’s simple offering.', plainCn: '东邻杀牛，不如西邻之禴祭。', plainEn: 'Eastern neighbor kills ox; not as good as western neighbor\'s simple offering.' },

    { cn: '上六：濡其首，厉', en: 'Line 6 (Yin): Wet the head; peril.', plainCn: '濡其首，厉。', plainEn: 'Wet the head—peril.' }

  ],
  64: [ // 未济 Wèi Jì
    { cn: '初六：濡其尾，吝', en: 'Line 1 (Yin): Wet the tail; humiliation.', plainCn: '濡其尾，吝。', plainEn: 'Wet the tail—regret.' },

    { cn: '九二：曳其轮，贞吉', en: 'Line 2 (Yang): Drag the wheel; correctness brings good fortune.', plainCn: '曳其轮，贞吉。', plainEn: 'Drag the wheel; correctness brings good fortune.' },

    { cn: '六三：未济征凶', en: 'Line 3 (Yin): Not yet across; going brings misfortune.', plainCn: '未济征凶。', plainEn: 'Not yet across; going brings misfortune.' },

    { cn: '九四：贞吉悔亡', en: 'Line 4 (Yang): Correctness brings good fortune; regret vanishes.', plainCn: '贞吉悔亡。', plainEn: 'Correctness brings good fortune; regret vanishes.' },

    { cn: '六五：君子之光', en: 'Line 5 (Yin): Noble’s light.', plainCn: '君子之光。', plainEn: 'Noble\'s light.' },

    { cn: '上九：有孚于饮酒，无咎', en: 'Line 6 (Yang): Sincerity in drinking wine; no blame.', plainCn: '有孚于饮酒，无咎。', plainEn: 'Sincerity in drinking wine—no blame.' }

  ]
};
