// 音乐库：public/music/ 里的现成曲子（不进 git），按段截取后做成某一期的 bgm.wav。
// 用法（在 audio/episodes/<期>.mjs 里）：
//   import {cutMusic} from '../music.mjs';
//   cutMusic({track: 'we-never', start: 16, duration: 30, ep: 'ep23-wheat-chessboard'});
import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
export const MUSIC_DIR = join(root, 'public', 'music');

/**
 * 曲目表：文件名、时长和用法备注。新放进 public/music/ 的曲子在这里补一行，
 * 并在 public/music/README.md 里记来源和授权。
 */
export const TRACKS = {
  'user-default': {
    file: 'user-default-bgm.mp3',
    seconds: 189.86,
    mood: '沉稳、有推进感，战术屏无口播用',
    note: '本文件由用户提供。实测 17.45 秒和 102.52 秒两次能量跳升，第 47 小节是低谷，网格与系列重拍一致。不要换成程序配乐。',
    source: '用户提供的默认配乐；mp3 不进 git',
  },
  'we-never': {
    file: 'we-never.mp3',
    seconds: 189.8,
    mood: '沉稳、有推进感的纯音乐，适合暗金文献风',
    note: '0.36 秒起音；整段 112.5 BPM，一小节约 2.13 秒；第一个「换气 + 重拍」在 17.45 秒（第 8 小节）；100–102.5 秒换气、102.52 秒整段重新进来（距第一个重拍正好 40 小节，网格 17.45 + 2.12675k 秒）；原始响度约 −9.6 LUFS，偏响',
    source: '作者自用曲目，已获授权；音频文件不随仓库分发，请换成你自己有授权的曲子',
  },
};

/**
 * 截一段曲子做成 public/audio/<ep>/bgm.wav：淡入淡出 + 响度标准化。
 * lufs 默认 −16（没有人声、配乐就是唯一音轨时）；有口播的期数建议 −34 左右，让配乐够轻。
 */
export function cutMusic({track, start = 0, duration, ep, lufs = -16, fadeIn = 0.5, fadeOut = 2}) {
  const t = TRACKS[track];
  if (!t) throw new Error(`音乐库里没有 ${track}，可用：${Object.keys(TRACKS).join(', ')}`);
  const src = join(MUSIC_DIR, t.file);
  if (!existsSync(src)) {
    console.log(`skip ${ep}: ${src} 不存在（音乐库文件不进 git，需要先放进 public/music/）`);
    return false;
  }
  const dir = join(root, 'public', 'audio', ep);
  mkdirSync(dir, {recursive: true});
  const af = [`afade=t=in:d=${fadeIn}`, `afade=t=out:st=${Math.max(0, duration - fadeOut)}:d=${fadeOut}`, `loudnorm=I=${lufs}:TP=-1.5:LRA=11`].join(',');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(start), '-t', String(duration), '-i', src, '-af', af, '-ar', '48000', '-ac', '2', join(dir, 'bgm.wav')]);
  console.log(`wrote ${ep}/bgm.wav ← ${track} ${start}s–${start + duration}s @ ${lufs} LUFS`);
  return true;
}
