import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {clamp01} from '../../library/anim';
import {AnswerReveal, BigWord, ChapterCard, DeathScreen, HookBanner, HudFrame, StepGrid, TacBg, TCaption} from '../../library/tactical/stage';
import {glowF, T, TF, typeChar} from '../../library/tactical/theme';
import {BitRow, ClearPeek, Collapse, DoorSplit, FitChart, HoldMap, LampRow, LatePeek, LogSketch, WayRow} from './scenes';
import {
  ANCHOR,
  ASK_LINE,
  BAR,
  BAR0,
  BIG_LINE,
  BLAME,
  chapterAt,
  CHAPTERS,
  CUES,
  cueEnd,
  cueStart,
  DARK_FROM,
  DARK_FROM2,
  DURATION,
  EP,
  fb,
  fbt,
  FLIP_LINE,
  FPS,
  FREEZE,
  HALF_BEATS,
  HICK_BITS_ORDER,
  HIT,
  HIT2,
  HOOK_LINE,
  OUT_KILL,
  OUT_RANGE,
  PEAK,
  QUESTION_LINE,
  SERIES,
  SFX,
  SHOTS,
  STEPS,
  TERM2,
  TITLE,
  TOPIC,
} from './timeline';

/**
 * ep65 能打的口越多，你开枪越慢？
 * 镜头硬切，卡在用户默认配乐的实测重拍上。无口播。
 * mix 用来导出分轨：all 成片画面，sfx 只留音效，方便限幅混音。
 */

const inShot = (f: number, s: readonly [number, number]) => f >= s[0] && f < s[1];

const punch = (f: number) => {
  if (f < HIT) return 0;
  const k = Math.floor((f / FPS - BAR0) / BAR);
  const t = f - fb(k);
  if (f >= HIT && f < HIT + 10) return 0.04 * (1 - (f - HIT) / 10);
  if (f >= HIT2 && f < HIT2 + 10) return 0.04 * (1 - (f - HIT2) / 10);
  const amp = k >= 40 && k < 48 ? 0.006 : 0.012;
  return t >= 0 && t < 7 ? amp * (1 - t / 7) : 0;
};

const typed = (text: string, f: number, at: number, size: number, color: string) => (
  <div style={{fontFamily: TF.sans, fontSize: size, lineHeight: 1.15, color, textAlign: 'center', filter: glowF(color, 12)}}>
    {[...text].map((ch, i) => {
      const {opacity, filter, transform} = typeChar(f, at, i, 2);
      return (
        <span key={i} style={{display: 'inline-block', opacity, filter, transform}}>
          {ch}
        </span>
      );
    })}
  </div>
);

export const Ep65Hick: React.FC<{mix?: 'all' | 'bgm' | 'sfx'}> = ({mix = 'all'}) => {
  const f = useCurrentFrame();
  const dark1 = f >= HIT ? 0 : Math.pow(clamp01((f - DARK_FROM) / (HIT - FREEZE - DARK_FROM)), 0.7) * 0.94;
  const dark2 = f >= HIT2 || f < DARK_FROM2 ? 0 : Math.pow(clamp01((f - DARK_FROM2) / (HIT2 - FREEZE - DARK_FROM2)), 0.7) * 0.94;
  const ff = f >= DARK_FROM && f < HIT ? Math.min(f, HIT - FREEZE) : f >= DARK_FROM2 && f < HIT2 ? Math.min(f, HIT2 - FREEZE) : f;
  const ch = chapterAt(f);
  const showHud = !inShot(f, SHOTS.title) && !inShot(f, SHOTS.hit2);
  const line1 = TITLE.split('，')[0] + '，';
  const line2 = TITLE.split('，')[1] ?? '';

  return (
    <AbsoluteFill style={{background: T.bg, fontFamily: TF.sans, overflow: 'hidden'}}>
      {(mix === 'all' || mix === 'bgm') && <Audio src={staticFile('audio/ep65-hick/bgm.wav')} />}
      {(mix === 'all' || mix === 'sfx') &&
        SFX.map(([file, t, vol], i) => (
          <Sequence key={i} from={Math.max(0, t)} durationInFrames={90}>
            <Audio src={staticFile(file)} volume={vol} />
          </Sequence>
        ))}

      <AbsoluteFill style={{transform: `scale(${1 + punch(f)})`}}>
        {inShot(f, SHOTS.hook) && (
          <>
            <TacBg />
            <HoldMap aim="left" />
          </>
        )}
        {inShot(f, SHOTS.death) && (
          <>
            <TacBg tone="red" />
            <LatePeek f={ff} at={PEAK} />
            <DeathScreen f={ff} at={PEAK + 16} label="太晚了" />
          </>
        )}
        {inShot(f, SHOTS.replay) && (
          <>
            <TacBg />
            <HoldMap aim="left" showEnemy />
          </>
        )}
        {inShot(f, SHOTS.blame) && (
          <>
            <TacBg tone="red" />
            <div style={{position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center', opacity: clamp01((f - BLAME) / 6)}}>
              <div style={{fontFamily: TF.mono, fontWeight: 700, fontSize: 22, letterSpacing: 6, color: T.gray}}>结算 · 示意</div>
              <div style={{marginTop: 12, fontFamily: TF.sans, fontSize: 140, color: T.red, filter: glowF(T.red, 16)}}>反应慢</div>
            </div>
          </>
        )}
        {inShot(f, SHOTS.question) && (
          <>
            <TacBg />
            <BigWord f={ff} at={SHOTS.question[0]} text={QUESTION_LINE} size={96} y={460} />
          </>
        )}

        {inShot(f, SHOTS.title) && (
          <>
            <TacBg />
            <div style={{position: 'absolute', left: 0, right: 0, top: 250, textAlign: 'center', fontFamily: TF.mono, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: T.cyan}}>{SERIES} · {EP}</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 360}}>{typed(line1, f, HIT, 108, T.white)}</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 500}}>{typed(line2, f, HIT + [...line1].length * 2, 108, T.white)}</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 680, textAlign: 'center', opacity: clamp01((f - HIT - 28) / 10)}}>
              <span style={{padding: '8px 28px', borderRadius: 40, background: T.cyan, fontFamily: TF.sans, fontSize: 36, letterSpacing: 8, color: '#06121a'}}>{TOPIC}</span>
            </div>
            <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, rgba(220,240,250,0.85), rgba(66,198,223,0.25) 45%, rgba(0,0,0,0) 75%)', opacity: 1 - clamp01((f - HIT) / 10), pointerEvents: 'none'}} />
          </>
        )}

        {inShot(f, SHOTS.choice) && (
          <>
            <TacBg />
            <LampRow f={f} at={fbt(40)} />
          </>
        )}
        {inShot(f, SHOTS.logfit) && (
          <>
            <TacBg />
            <LogSketch f={f} at={SHOTS.logfit[0]} />
          </>
        )}
        {inShot(f, SHOTS.info) && (
          <>
            <TacBg />
            <ChapterCard f={f} at={fb(16)} n={2} title="信息" sub="INFORMATION" />
          </>
        )}
        {inShot(f, SHOTS.bits) && (
          <>
            <TacBg />
            <BitRow f={f} at={fbt(68)} />
          </>
        )}
        {inShot(f, SHOTS.rate) && (
          <>
            <TacBg />
            <div style={{position: 'absolute', left: 0, right: 0, top: 340, textAlign: 'center'}}>
              <div style={{fontFamily: TF.sans, fontSize: 40, color: T.gray}}>Hick 1952 · 摘要里的量级</div>
              <div style={{marginTop: 16, fontFamily: TF.mono, fontWeight: 700, fontSize: 150, color: T.orange, filter: glowF(T.orange, 14)}}>约 {HICK_BITS_ORDER} 比特/秒</div>
              <div style={{marginTop: 8, fontFamily: TF.sans, fontSize: 36, color: T.white}}>实验室里的量级，不是你的枪</div>
            </div>
          </>
        )}

        {inShot(f, SHOTS.notfixed) && (
          <>
            <TacBg />
            <ChapterCard f={f} at={fb(24)} n={3} title="不是定数" sub="NOT A CONSTANT" />
          </>
        )}
        {inShot(f, SHOTS.slopes) && (
          <>
            <TacBg />
            <FitChart f={f} at={SHOTS.slopes[0]} />
          </>
        )}
        {inShot(f, SHOTS.edges) && (
          <>
            <TacBg />
            <div style={{position: 'absolute', left: 220, right: 220, top: 300, display: 'flex', flexDirection: 'column', gap: 28}}>
              {[
                [fbt(112), '对应越直接，选项变多也未必更慢', 'Proctor & Schneider 2018 · 综述'],
                [fbt(120), '序列好猜，练习会把时间压下去', 'Hick 1952 · 谈 Merkel 的数据'],
                [fbt(124), '序列打乱，他几乎没再看到练习变快', 'Hick 1952 · 他自己的不规则序列'],
              ].map(([at, text, src]) => (
                <div key={String(src)} style={{opacity: clamp01((f - (at as number)) / 8), borderLeft: `6px solid ${T.orange}`, padding: '12px 28px', background: 'rgba(10,19,34,0.72)'}}>
                  <div style={{fontFamily: TF.sans, fontSize: 40, color: T.white}}>{text}</div>
                  <div style={{marginTop: 6, fontFamily: TF.mono, fontSize: 20, letterSpacing: 1, color: T.gray}}>{src}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {inShot(f, SHOTS.prob) && (
          <>
            <TacBg />
            <ChapterCard f={f} at={fb(32)} n={4} title="概率" sub="PROBABILITY" />
          </>
        )}
        {inShot(f, SHOTS.ways) && (
          <>
            <TacBg />
            <WayRow f={f} at={fbt(136)} />
          </>
        )}
        {inShot(f, SHOTS.track) && (
          <>
            <TacBg />
            <DoorSplit f={f} at={SHOTS.track[0]} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 230, textAlign: 'center', fontFamily: TF.mono, fontWeight: 700, fontSize: 22, letterSpacing: 1, color: T.dim}}>假设概率 0.70 / 0.10 / 0.10 / 0.10 · 不是论文里的分布</div>
          </>
        )}
        {inShot(f, SHOTS.bigline) && (
          <>
            <TacBg />
            <BigWord f={f} at={SHOTS.bigline[0]} text={BIG_LINE} size={108} y={440} />
          </>
        )}

        {inShot(f, SHOTS.steps) && (
          <>
            <TacBg />
            {f < fb(41) ? (
              <ChapterCard f={f} at={fb(40)} n={5} title="怎么办" sub="FEWER AT ONCE" />
            ) : (
              <StepGrid
                f={f}
                ats={[fbt(164), fbt(168), fbt(172), fbt(176)]}
                titles={[...STEPS]}
                colors={[T.cyan, T.orange, T.green, T.red]}
                icons={[
                  (c) => (
                    <>
                      <rect x={40} y={40} width={36} height={70} fill={c} />
                      <rect x={100} y={40} width={36} height={70} fill={c} opacity={0.25} />
                      <rect x={160} y={40} width={36} height={70} fill={c} opacity={0.25} />
                    </>
                  ),
                  (c) => (
                    <>
                      <circle cx={120} cy={70} r={28} fill="none" stroke={c} strokeWidth={6} />
                      <path d="M120 42 V70 H148" stroke={c} strokeWidth={6} />
                    </>
                  ),
                  (c) => (
                    <>
                      <circle cx={70} cy={75} r={16} fill={c} />
                      <circle cx={120} cy={75} r={16} fill={c} />
                      <circle cx={170} cy={75} r={16} fill={c} />
                    </>
                  ),
                  (c) => (
                    <>
                      <rect x={36} y={48} width={28} height={54} fill={c} />
                      <rect x={80} y={48} width={28} height={54} fill={c} opacity={0.35} />
                      <rect x={124} y={48} width={28} height={54} fill={c} opacity={0.35} />
                      <rect x={168} y={48} width={28} height={54} fill={c} opacity={0.35} />
                    </>
                  ),
                ]}
              />
            )}
          </>
        )}
        {inShot(f, SHOTS.build) && (
          <>
            <TacBg />
            <Collapse f={ff} at={SHOTS.build[0]} />
          </>
        )}
        {inShot(f, SHOTS.hit2) && (
          <>
            <TacBg />
            <AnswerReveal f={f} at={HIT2} label="你还没减掉的" text={ANCHOR} dark={0} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center', fontFamily: TF.mono, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: T.gray, opacity: clamp01((f - HIT2 - 18) / 12)}}>{TERM2}</div>
          </>
        )}

        {inShot(f, SHOTS.outro) &&
          (f < OUT_RANGE ? (
            <>
              <TacBg tone="warm" />
              <div style={{position: 'absolute', left: 0, right: 0, top: 360, textAlign: 'center'}}>
                <div style={{fontFamily: TF.sans, fontSize: 48, color: '#ffd9a8'}}>还是三个口</div>
                <div style={{marginTop: 28, fontFamily: TF.sans, fontSize: 64, color: T.white}}>你只盯最可能的一个</div>
                <div style={{marginTop: 20, fontFamily: TF.sans, fontSize: 32, color: T.gray}}>另外两个交给队友 · 示意</div>
              </div>
            </>
          ) : (
            <>
              <TacBg tone="warm" />
              <ClearPeek f={f} kill={OUT_KILL} />
            </>
          ))}
        {inShot(f, SHOTS.flipline) && (
          <>
            <TacBg tone="warm" />
            <BigWord f={f} at={SHOTS.flipline[0]} text={FLIP_LINE} size={92} y={440} />
          </>
        )}
        {inShot(f, SHOTS.ask) && (
          <>
            <TacBg />
            <BigWord f={f} at={SHOTS.ask[0]} text={ASK_LINE} size={96} y={430} />
            <div style={{position: 'absolute', left: 0, right: 0, top: 680, textAlign: 'center', fontFamily: TF.sans, fontSize: 34, color: T.cyan, opacity: clamp01((f - SHOTS.ask[0] - 40) / 12)}}>评论区说说</div>
          </>
        )}
      </AbsoluteFill>

      {showHud && (
        <HudFrame
          series={SERIES}
          ep={EP}
          topic={TOPIC}
          chapter={[ch, CHAPTERS.length - 1, CHAPTERS[ch][1]]}
          progress={f / DURATION}
          ticks={CHAPTERS.slice(1).map(([b]) => fb(b) / DURATION)}
          hp={inShot(f, SHOTS.outro) && f >= OUT_RANGE ? 100 : undefined}
          ammo={inShot(f, SHOTS.outro) && f >= OUT_RANGE ? [24, 25] : undefined}
        />
      )}
      <HookBanner f={f} text={HOOK_LINE} out={DARK_FROM} />
      <AbsoluteFill style={{background: '#000', opacity: Math.max(dark1, dark2), pointerEvents: 'none'}} />

      {CUES.map(([, text], i) => {
        if (!text) return null;
        const beat = CUES[i][0];
        const st = cueStart(i);
        const out = beat === HALF_BEATS[0] ? DARK_FROM : beat === HALF_BEATS[1] ? DARK_FROM2 : cueEnd(i) - 6;
        if (f < st - 2 || f > out + 10) return null;
        return <TCaption key={i} f={f} at={st} out={out} text={text} />;
      })}
      <AbsoluteFill style={{background: '#000', opacity: clamp01((f - (DURATION - 30)) / 30), pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};
