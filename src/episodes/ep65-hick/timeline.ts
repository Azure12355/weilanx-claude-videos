/**
 * ep65 能打的口越多，你开枪越慢？（战术屏科普风，无口播，约 2 分 18 秒）
 * 作品 ID 用 ep65：本仓库代码最大到 ep51，远端 main 同样到此；不覆盖 ep52-swing。
 * 战术屏成片目录用 23：用户核对的 COS 战术屏目录最大是 22-最菜指挥，全局作品号最大 ep64。
 * 画面上的系列号因此写 EP.23，而不是本仓库表里的 EP.17。
 * 配乐是用户提供的 public/music/user-default-bgm.mp3（文件不进 git）。
 * 实测：17.45 秒能量跳升约 15.6 dB，102.52 秒跳升约 13.8 dB，第 47 小节是低谷。
 * 网格与系列既有重拍一致，沿用 BAR = (102.52 − 17.45) / 40。不是程序配乐。
 *
 * 冤 → 翻案 → 招：三个口一起看，人从旁边出来，你开枪慢了，被说反应慢。
 * 实验室里的选择反应时间跟着「信息」走，不是每多一个口就固定加多少毫秒。
 * 招（建议，不是实测收益）：一次只清一个口、预瞄最可能的、队友分口、别把每个口当成一样可能。
 * 锚词「信息」。第 8 小节（17.45 秒）标题，第 48 小节（102.52 秒）砸出锚词。片尾停在评论区问题。
 *
 * 事实（Hick 1952 读过 Taylor & Francis 全文的文字层，公式与 Proctor & Schneider 2018 的复述一致；
 * Hyman 1953 只读到 APA 记录页上的摘要，doi.org 全文抓取返回 500，字幕不写摘要以外的操作细节）：
 *   Hick, W. E. (1952). On the rate of gain of information. Quarterly Journal of Experimental Psychology, 4(1), 11–26.
 *     https://doi.org/10.1080/17470215208416600
 *     选择反应，豌豆灯 + 莫尔斯键，选项最多十个（序列跳过 7 和 9）；实验一被试是他自己。
 *     无差错、等概率时，刺激不确定性是 log n；他另外把「也可能还没出现」算进去，拟合 log(n+1)。
 *     Merkel 1885 数据（Woodworth 1938 转引）：RT（秒）= 0.626·log10(n+1)。
 *     他自己的实验一：0.518·log10(n+1)。两条斜率不一样。
 *     允许出错可以更快，提取的信息变少。摘要：信息获得速率平均大体恒定，量级约每秒五个比特。
 *     不规则序列上他几乎看不到练习再加快；Merkel 数据练习下降很大，他解释为序列好猜。
 *   Hyman, R. (1953). Stimulus information as a determinant of reaction time. Journal of Experimental Psychology, 45(3), 188–196.
 *     https://doi.org/10.1037/h0056940
 *     摘要：信息用三种方式改——等概率选项的个数、某选项出现的比例、取决于前一个刺激的概率。
 *     三种方式里，反应时间对信息量都呈线性回归。
 *   Proctor, R. W., & Schneider, D. W. (2018). Hick’s law for choice reaction time: A review.
 *     Quarterly Journal of Experimental Psychology, 71(6), 1281–1299. 读过综述 PDF。
 *     刺激—反应越对应，选项效应可以很小；大量练习后斜率下降，但不是一条固定毫秒。
 * 比特数 log2(n) 和示意概率的熵是定义 / 自己算的，不是论文里的反应时。开场和结尾的对枪是示意。四招是建议。
 */
export const FPS = 30;
export const W = 1920;
export const H = 1080;

/** 用户默认配乐实测网格：两个重拍 17.45 秒和 102.52 秒相隔 40 小节 */
export const BAR = (102.52 - 17.45) / 40;
export const BAR0 = 17.45 - 8 * BAR;
export const BEAT = BAR / 4;
export const beatSec = (b: number) => BAR0 + BEAT * b;
export const fr = (sec: number) => Math.round(sec * FPS);
export const fbt = (b: number) => fr(beatSec(b));
export const fb = (k: number) => fbt(4 * k);

export const HIT = fb(8);
export const HIT2 = fb(48);
export const DARK_FROM = fr(16.7);
export const DARK_FROM2 = fr(101.75);
export const FREEZE = 3;
export const DURATION = fr(beatSec(256) + 1);

/** 开场三次重音（第 7、10、15 拍）：露人、回放、背上反应慢 */
export const PEAK = fbt(7);
export const REPLAY = fbt(10);
export const BLAME = fbt(15);

export const SERIES = 'FPS 原理课';
export const EP = 'EP.23';
export const TOPIC = '选择反应';
export const TITLE = '能打的口越多，你开枪越慢？';
export const HOOK_LINE = '你守着三个口，〖开枪怎么总是慢〗？';
export const ANCHOR = '信息';
export const TERM2 = '选择反应 · Choice Reaction';
export const QUESTION_LINE = '三个口一起盯，\n手为什么〔慢半拍〕？';
export const BIG_LINE = '四个口，\n〔不等于〕四份信息';
export const FLIP_LINE = '你不是手慢，\n是〔信息还没减下来〕';
export const ASK_LINE = '你最常被几个口\n同时看着？';

/** 四招，每条不超过 8 个字。都是建议，不是测出来的收益 */
export const STEPS = ['一次只清一口', '预瞄最可能', '队友分开看', '别当成一样'] as const;

export const CHAPTERS: [number, string][] = [
  [0, '开场'],
  [9, '选择'],
  [16, '信息'],
  [24, '不是定数'],
  [32, '概率'],
  [40, '怎么办'],
  [48, '结尾'],
];
export const chapterAt = (f: number) => {
  let i = 0;
  CHAPTERS.forEach(([b], k) => {
    if (f >= fb(b)) i = k;
  });
  return i;
};

/** 字幕：[拍号, 文字]。【】青 〖〗红 〔〕橙。null 放大字卡或标题卡 */
export const CUES: [number, string | null][] = [
  // 开场：重演挫败
  [0, '你架在包点，三个口都能打到人。'],
  [3, '队友让你看着，别漏。'],
  [7, '〖右边忽然露出一个人〗。'],
  [10, '你刚转过去，人已经缩回去了。'],
  [15, '结算上写着：反应慢。'],
  [19, '可你的准星，刚才还停在另外两个口。'],
  [24, '你开始觉得，是自己反应慢。'],
  [28, '慢的也许不是手，是还没减掉的——'],
  [32, null], // 标题卡
  // 选择
  [36, '1952 年，Hick 研究的是选择反应。'],
  [40, '灯亮了按对应的键，选项最多十个。'],
  [44, '一样可能的选项越多，平均反应越久。'],
  [48, '他配的是一条对数曲线，不是固定加时。'],
  [52, '被试主要是他自己，样本很小。'],
  [56, '这是实验室，不是某个游戏的引擎机制。'],
  [60, '多出来的时间，花在处理【信息】上。'],
  // 信息
  [68, '只算「会是哪一个」：两个平等选项是 1 比特。'],
  [72, '四个是 2 比特，八个是 3 比特。翻倍只多 1。'],
  [76, '「也可能还没出现」，所以他拟合 log(n+1)。'],
  [80, '比特数是定义。它不告诉你开枪慢多少毫秒。'],
  [84, '摘要写的速率，大约每秒 5 比特这个量级。'],
  [88, '换人、换条件，这个速率并不固定。'],
  [92, '允许出错，反应可以更快，准头会差。'],
  // 不是定数
  [100, '他也可以故意打得更快，同时错得更多。'],
  [104, '提取的信息变少，反应时间也跟着变短。'],
  [108, '两条拟合的斜率不一样，没有统一毫秒。'],
  [112, '2018 年综述：对应越直接，效应可以很小。'],
  [116, '大量练习之后，斜率也会下降，但不是消失。'],
  [120, '序列如果好猜，练习带来的加快会很大。'],
  [124, '换成打乱的序列，他看到的练习变化很小。'],
  // 概率
  [132, '1953 年 Hyman 换了三种方式改信息。'],
  [136, '可以改平等选项的个数。'],
  [140, '也可以不改个数，只让某一个更常出现。'],
  [144, '还可以让下一瞬间，取决于刚才的刺激。'],
  [148, '三种都是：反应时间跟着〔信息〕走。'],
  [152, null], // 大字：四个口，不等于四份信息
  // 怎么办（建议）
  [160, '同一个道理，用在站位上，是建议：'],
  [164, '① 一次只清一个口，清完再看下一个。'],
  [168, '② 预瞄你觉得最可能的那个口。'],
  [172, '③ 剩下的口，交给队友分开看。'],
  [176, '④ 别把每个口，都当成一样可能。'],
  [180, '口还在，你同时要判断的信息变少了。'],
  [188, '你不是手慢，你只是还堆着太多——'],
  [192, null], // 第二个爆点「信息」
  // 结尾
  [200, '还是三个口。你只预瞄了最可能的一个。'],
  [204, '另外两个，队友已经各自看着。'],
  [208, '人从你预瞄的口出来。'],
  [216, '这一次，〔判断先做完了〕。示意，不是保证。'],
  [224, null], // 情绪翻转大字
  [236, null], // 评论区问题，放到片尾
];
export const cueStart = (i: number) => fbt(CUES[i][0]);
export const cueEnd = (i: number) => (i + 1 < CUES.length ? cueStart(i + 1) : DURATION);
export const HALF_BEATS = [28, 188];

export const SHOTS = {
  hook: [0, PEAK],
  death: [PEAK, REPLAY],
  replay: [REPLAY, BLAME],
  blame: [BLAME, fb(6)],
  question: [fb(6), HIT],
  title: [HIT, fb(9)],
  choice: [fb(9), fb(13)],
  logfit: [fb(13), fb(16)],
  info: [fb(16), fb(17)],
  bits: [fb(17), fb(21)],
  rate: [fb(21), fb(24)],
  notfixed: [fb(24), fb(25)],
  slopes: [fb(25), fb(28)],
  edges: [fb(28), fb(32)],
  prob: [fb(32), fb(33)],
  ways: [fb(33), fb(37)],
  track: [fb(37), fb(38)],
  bigline: [fb(38), fb(40)],
  steps: [fb(40), fb(45)],
  build: [fb(45), HIT2],
  hit2: [HIT2, fb(50)],
  outro: [fb(50), fb(56)],
  flipline: [fb(56), fb(59)],
  ask: [fb(59), DURATION],
} as const;

export const OUT_RANGE = fbt(208);
export const OUT_KILL = fbt(216);

/* ---------------- 片中的事实（原文，测试核对） ---------------- */

export const HICK_YEAR = 1952;
export const HICK_MAX_N = 10;
export const HICK_BITS_ORDER = 5;
/** Merkel 1885 数据上的拟合，单位是秒，底是 10。不是「每多一个选项加这么多毫秒」 */
export const HICK_MERKEL_B = 0.626;
/** Hick 实验一（他自己）的拟合系数，同样是 log10(n+1)、单位秒 */
export const HICK_EXP1_B = 0.518;
export const hickFitSec = (b: number, n: number) => b * Math.log10(n + 1);
export const HICK_FINDING = 'the rate of gain of information is, on the average, constant with respect to time';
export const HICK_ORDER = 'of the order of five';
export const HYMAN_YEAR = 1953;
export const HYMAN_REGRESSION = 'produced a linear regression for each of the three ways';
export const PROCTOR_YEAR = 2018;

/** 等概率时「会是哪一个」的信息，单位比特。定义，不是反应时 */
export const equalBits = (n: number) => Math.log2(n);
/**
 * 示意：四个口里一个很常出现。概率是本片假设，用来算熵，不是 Hyman 的实验分布。
 * H = −Σ p log2(p)
 */
export const ILLUST_P = [0.7, 0.1, 0.1, 0.1] as const;
export const entropyBits = (ps: readonly number[]) => -ps.reduce((s, p) => s + (p > 0 ? p * Math.log2(p) : 0), 0);

const A = 'audio/ep65-hick';
export const SFX: [string, number, number][] = [
  // 开场：第 0～1 拍配乐自己有重音，枪声放在第 7 拍
  [`${A}/gunshot.wav`, PEAK, 0.62],
  [`${A}/crack.wav`, PEAK + 2, 0.5],
  [`${A}/rewind.wav`, REPLAY - 4, 0.55],
  [`${A}/impact.wav`, BLAME, 0.55],
  [`${A}/tick.wav`, fbt(19), 0.4],
  [`${A}/tick.wav`, fbt(24), 0.45],
  [`${A}/riser.wav`, fr(beatSec(32) - 2), 0.55],
  [`${A}/impact.wav`, HIT, 0.6],
  // 选择
  [`${A}/tick.wav`, fbt(40), 0.4],
  [`${A}/tick.wav`, fbt(44), 0.4],
  [`${A}/impact.wav`, fbt(60), 0.5],
  // 信息
  ['audio/sfx/whoosh.wav', fb(16), 0.4],
  [`${A}/chapter.wav`, fb(16), 0.55],
  [`${A}/tick.wav`, fbt(68), 0.4],
  [`${A}/tick.wav`, fbt(72), 0.4],
  [`${A}/tick.wav`, fbt(84), 0.45],
  [`${A}/impact.wav`, fbt(92), 0.5],
  // 不是定数
  ['audio/sfx/whoosh.wav', fb(24), 0.4],
  [`${A}/chapter.wav`, fb(24), 0.55],
  [`${A}/tick.wav`, fbt(100), 0.4],
  [`${A}/impact.wav`, fbt(108), 0.5],
  [`${A}/tick.wav`, fbt(116), 0.4],
  [`${A}/tick.wav`, fbt(124), 0.4],
  // 概率
  ['audio/sfx/whoosh.wav', fb(32), 0.4],
  [`${A}/chapter.wav`, fb(32), 0.55],
  [`${A}/tick.wav`, fbt(136), 0.4],
  [`${A}/tick.wav`, fbt(140), 0.4],
  [`${A}/tick.wav`, fbt(144), 0.4],
  [`${A}/impact.wav`, fbt(148), 0.55],
  ['audio/sfx/whoosh.wav', fb(38), 0.35],
  [`${A}/impact.wav`, fb(38), 0.5],
  // 怎么办
  ['audio/sfx/whoosh.wav', fb(40), 0.35],
  [`${A}/chapter.wav`, fb(40), 0.5],
  ...[164, 168, 172, 176].map((b): [string, number, number] => [`${A}/tick.wav`, fbt(b), 0.48]),
  [`${A}/riser.wav`, fr(beatSec(192) - 2), 0.55],
  [`${A}/impact.wav`, HIT2, 0.6],
  // 结尾
  ['audio/sfx/whoosh.wav', OUT_RANGE, 0.35],
  [`${A}/gunshot.wav`, OUT_KILL, 0.7],
  ['audio/sfx/ding.wav', OUT_KILL + 4, 0.4],
  [`${A}/impact.wav`, fb(56), 0.5],
  [`${A}/tick.wav`, fb(59), 0.45],
];
