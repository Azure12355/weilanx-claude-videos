import {existsSync} from 'node:fs';
import {describe, expect, it} from 'vitest';
import {
  ANCHOR,
  BAR,
  beatSec,
  BLAME,
  CHAPTERS,
  CUES,
  cueStart,
  DARK_FROM,
  DARK_FROM2,
  DURATION,
  entropyBits,
  equalBits,
  fb,
  fbt,
  FPS,
  HALF_BEATS,
  hickFitSec,
  HICK_BITS_ORDER,
  HICK_EXP1_B,
  HICK_FINDING,
  HICK_MAX_N,
  HICK_MERKEL_B,
  HICK_ORDER,
  HICK_YEAR,
  HIT,
  HIT2,
  HOOK_LINE,
  HYMAN_REGRESSION,
  HYMAN_YEAR,
  ILLUST_P,
  OUT_KILL,
  OUT_RANGE,
  PEAK,
  PROCTOR_YEAR,
  REPLAY,
  SFX,
  SHOTS,
  STEPS,
  TITLE,
} from '../../src/episodes/ep65-hick/timeline';

const plain = (t: string) => t.replace(/[【】〖〗〔〕\s]/g, '');
const all = CUES.map(([, t]) => t ?? '').join('');

describe('ep65 能打的口越多，你开枪越慢？', () => {
  it('卡点落在用户默认配乐实测的两个重拍上，开场重音在第 7、10、15 拍', () => {
    expect(Math.abs(HIT - 17.45 * FPS)).toBeLessThanOrEqual(2);
    expect(Math.abs(HIT2 - 102.52 * FPS)).toBeLessThanOrEqual(2);
    expect(Math.abs(PEAK - 4.19 * FPS)).toBeLessThanOrEqual(2);
    expect(Math.abs(REPLAY - 5.79 * FPS)).toBeLessThanOrEqual(2);
    expect(Math.abs(BLAME - 8.46 * FPS)).toBeLessThanOrEqual(2);
    expect(PEAK).toBeGreaterThan(fbt(2));
    expect(DARK_FROM).toBeLessThan(HIT - 10);
    expect(DARK_FROM2).toBeLessThan(HIT2 - 10);
  });
  it('片长约 2 分 18 秒，章节在乐句起点，标题是用户指定的那句，开场标题条 ≤ 20 字且含「你」', () => {
    expect(DURATION / FPS).toBeGreaterThan(130);
    expect(DURATION / FPS).toBeLessThan(145);
    expect(Math.abs(beatSec(256) - (17.45 + 56 * BAR))).toBeLessThan(0.001);
    CHAPTERS.slice(2).forEach(([b]) => expect(b % 4).toBe(0));
    expect(TITLE).toBe('能打的口越多，你开枪越慢？');
    expect(TITLE.split('，')).toEqual(['能打的口越多', '你开枪越慢？']);
    expect([...plain(HOOK_LINE)].length).toBeLessThanOrEqual(20);
    expect(HOOK_LINE).toContain('你');
    STEPS.forEach((s) => expect([...s].length).toBeLessThanOrEqual(8));
  });
  it('字幕按拍递增、都在片长内、每句不超过 24 字、话说一半的两句以破折号结尾、锚词出现', () => {
    for (let i = 1; i < CUES.length; i++) expect(CUES[i][0]).toBeGreaterThan(CUES[i - 1][0]);
    CUES.forEach(([, text], i) => {
      expect(cueStart(i)).toBeLessThan(DURATION - FPS);
      if (text) expect(plain(text).length).toBeLessThanOrEqual(24);
    });
    HALF_BEATS.forEach((b) => expect(CUES.find(([beat]) => beat === b)![1]).toMatch(/——$/));
    CUES.filter(([b, t]) => t && !HALF_BEATS.includes(b)).forEach(([, t]) => expect(t).not.toMatch(/——$/));
    expect(CUES.some(([, t]) => t?.includes(`【${ANCHOR}】`))).toBe(true);
    expect(all).not.toContain('一定');
    expect(all).not.toMatch(/\d+\s*毫秒/);
    expect(all).toContain('不是某个游戏的引擎机制');
    expect(all).toContain('是建议');
  });
  it('镜头首尾相接、片尾停在评论区问题；关键出场帧落在各自镜头里', () => {
    const list = Object.values(SHOTS);
    expect(list[0][0]).toBe(0);
    for (let i = 1; i < list.length; i++) expect(list[i][0]).toBe(list[i - 1][1]);
    expect(list[list.length - 1][1]).toBe(DURATION);
    expect(SHOTS.title[0]).toBe(HIT);
    expect(SHOTS.hit2[0]).toBe(HIT2);
    expect('next' in SHOTS).toBe(false);
    for (const [k] of CHAPTERS.slice(1)) expect(list.some(([a]) => a === fb(k))).toBe(true);
    const inside = (at: number, s: readonly [number, number]) => at >= s[0] && at + 8 < s[1];
    expect(inside(PEAK, SHOTS.death)).toBe(true);
    expect(inside(fbt(40), SHOTS.choice)).toBe(true);
    expect(inside(fbt(60), SHOTS.logfit)).toBe(true);
    expect(inside(fbt(68), SHOTS.bits)).toBe(true);
    [fbt(100), fbt(108)].forEach((at) => expect(inside(at, SHOTS.slopes)).toBe(true));
    [fbt(112), fbt(120), fbt(124)].forEach((at) => expect(inside(at, SHOTS.edges)).toBe(true));
    [fbt(136), fbt(140), fbt(144)].forEach((at) => expect(inside(at, SHOTS.ways)).toBe(true));
    expect(inside(SHOTS.track[0], SHOTS.track)).toBe(true);
    [164, 168, 172, 176].forEach((b) => expect(inside(fbt(b), SHOTS.steps)).toBe(true));
    [OUT_RANGE, OUT_KILL].forEach((at) => expect(inside(at, SHOTS.outro)).toBe(true));
  });
  it('Hick 1952、Hyman 1953、Proctor & Schneider 2018，以及定义和示意熵', () => {
    expect(HICK_YEAR).toBe(1952);
    expect(HICK_MAX_N).toBe(10);
    expect(HICK_BITS_ORDER).toBe(5);
    expect(HICK_FINDING).toContain('rate of gain of information');
    expect(HICK_ORDER).toContain('order of five');
    expect(HICK_MERKEL_B).toBe(0.626);
    expect(HICK_EXP1_B).toBe(0.518);
    expect(hickFitSec(HICK_MERKEL_B, 10)).toBeCloseTo(0.626 * Math.log10(11), 6);
    expect(hickFitSec(HICK_EXP1_B, 2)).not.toBeCloseTo(hickFitSec(HICK_MERKEL_B, 2), 3);
    expect(HYMAN_YEAR).toBe(1953);
    expect(HYMAN_REGRESSION).toContain('linear regression');
    expect(PROCTOR_YEAR).toBe(2018);
    expect(equalBits(2)).toBe(1);
    expect(equalBits(4)).toBe(2);
    expect(equalBits(8)).toBe(3);
    expect(ILLUST_P.reduce((s, p) => s + p, 0)).toBeCloseTo(1, 6);
    expect(entropyBits(ILLUST_P)).toBeLessThan(equalBits(4));
    expect(entropyBits(ILLUST_P).toFixed(2)).toBe('1.36');
    expect(all).toContain('1952');
    expect(all).toContain('1953');
    expect(all).toContain('2018');
    expect(all).toContain('log(n+1)');
    expect(all).toContain(`${HICK_BITS_ORDER} 比特`);
  });
  it('音效都在片长内，两个爆点有冲击，开场枪声不在第 0 拍；文件存在时才检查', () => {
    expect(SFX.some(([file, at]) => file.endsWith('impact.wav') && at === HIT)).toBe(true);
    expect(SFX.some(([file, at]) => file.endsWith('impact.wav') && at === HIT2)).toBe(true);
    expect(SFX.some(([file, at]) => file.endsWith('gunshot.wav') && at === PEAK)).toBe(true);
    expect(SFX.some(([file, at]) => file.endsWith('gunshot.wav') && at < fbt(2))).toBe(false);
    for (const [file, at] of SFX) {
      expect(at).toBeGreaterThanOrEqual(0);
      expect(at).toBeLessThan(DURATION);
      if (existsSync('public/audio/ep65-hick/bgm.wav')) expect(existsSync(`public/${file}`)).toBe(true);
    }
  });
});
