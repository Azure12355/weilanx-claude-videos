// ep65 能打的口越多，你开枪越慢？
// 配乐使用用户提供的 public/music/user-default-bgm.mp3，从第 0 秒截到片长（约 137.5 秒，结尾 2 秒淡出）。
// 不换成程序配乐。响度 −16 LUFS，真峰值 −1.5 dBFS。音效另由 makeTacticalSfx 按画面生成。
import {cutMusic} from '../music.mjs';
import {makeTacticalSfx} from '../sfx-tactical.mjs';

const EP = 'ep65-hick';
const BAR = (102.52 - 17.45) / 40;
const DURATION = Math.round((17.45 - 8 * BAR + (BAR / 4) * 256 + 1) * 30) / 30;

if (cutMusic({track: 'user-default', start: 0, duration: DURATION, ep: EP, fadeIn: 0.02, fadeOut: 2})) makeTacticalSfx(EP);
