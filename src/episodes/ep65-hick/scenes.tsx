import React from 'react';
import {clamp01, easeOut} from '../../library/anim';
import {Crosshair, HitMark, project, Range, TopMap, Tracer} from '../../library/tactical/range';
import {glowF, T, TF} from '../../library/tactical/theme';
import {entropyBits, equalBits, hickFitSec, HICK_EXP1_B, HICK_MERKEL_B, ILLUST_P} from './timeline';

const note = (text: string, top = 214) => (
  <div style={{position: 'absolute', left: 80, right: 80, top, textAlign: 'center', fontFamily: TF.mono, fontWeight: 700, fontSize: 22, letterSpacing: 2, color: T.dim}}>{text}</div>
);

/** 开场俯视：三个口，准星还在左边。示意，不是任何地图 */
export const HoldMap: React.FC<{aim: 'left' | 'right'; showEnemy?: boolean}> = ({aim, showEnemy = false}) => {
  const you = {x: 960, y: 760};
  const angles = [
    {x: 430, y: 430, name: '左口'},
    {x: 960, y: 340, name: '中口'},
    {x: 1490, y: 430, name: '右口'},
  ];
  const aimAt = aim === 'left' ? angles[0] : angles[2];
  return (
    <>
      <TopMap
        blocks={[
          [250, 250, 80, 280],
          [620, 250, 90, 220],
          [1210, 250, 90, 220],
          [1590, 250, 80, 280],
          [700, 560, 520, 70],
        ]}
        units={[
          {x: you.x, y: you.y, color: T.cyan, label: '你', dir: -Math.PI / 2, fov: 2.6, reach: 560},
          ...angles.map((a) => ({x: a.x, y: a.y, color: T.gray, label: a.name})),
          ...(showEnemy ? [{x: angles[2].x, y: angles[2].y + 70, color: T.red, label: '人'}] : []),
        ]}
        sight={[[you.x, you.y, aimAt.x, aimAt.y, aim === 'left' ? T.cyan : T.red]]}
      />
      {note(showEnemy ? '回放 · 准星在左，人在右 · 示意' : '三个口都能打到 · 原创俯视 · 示意', 228)}
    </>
  );
};

/** 死亡镜头：准星还在左侧掩体，人在右边 */
export const LatePeek: React.FC<{f: number; at: number}> = ({f, at}) => {
  const cam = {x: 0, z: 0.6, y: 1.55, yaw: 0.05, pitch: 0};
  const aimed = project([-2.6, 1.15, 7.2], cam) ?? [640, 520];
  const foe = project([2.2, 1.35, 7.4], cam) ?? [1320, 480];
  const t = f - at;
  return (
    <>
      <Range
        cam={cam}
        tone="red"
        boxes={[{x: -2.7, z: 6.2, w: 1.3, h: 1.15, d: 1.1}]}
        dummies={[{x: 2.2, z: 7.4, state: t > 16 ? 'hit' : 'idle'}]}
      />
      <Crosshair x={aimed[0]} y={aimed[1]} />
      {t >= 0 && t < 8 && <Tracer to={foe} t={t} />}
      {note('准星还在左边 · 人从右边出来 · 示意', 228)}
    </>
  );
};

/** 结尾：预瞄已经在那个口上。示意，不是收益保证 */
export const ClearPeek: React.FC<{f: number; kill: number}> = ({f, kill}) => {
  const cam = {x: 0, z: 1.2, y: 1.55, yaw: 0.22, pitch: 0.01};
  const foe = project([2.15, 1.35, 11.2], cam) ?? [960, 500];
  const t = f - kill;
  return (
    <>
      <Range cam={cam} tone="warm" boxes={[{x: -2.4, z: 6.2, w: 1.2, h: 1.15, d: 1}]} dummies={[{x: 2.15, z: 11.2, state: t > 14 ? 'dead' : t > 0 ? 'hit' : 'idle', color: '#f0a045'}]} />
      <Crosshair x={foe[0]} y={foe[1]} color="#ffe1b5" />
      {t >= 0 && t < 8 && <Tracer to={foe} t={t} color="#ffe1b5" />}
      <HitMark f={f} at={kill} x={foe[0]} y={foe[1]} text="HIT" color="#ffe1b5" />
      {note('预瞄的那个口 · 示意，不是固定收益', 228)}
    </>
  );
};

/** Hick 的灯和键，示意装置，不是原实验照片 */
export const LampRow: React.FC<{f: number; at: number}> = ({f, at}) => {
  const n = f < at ? 2 : f < at + 28 ? 4 : 10;
  const lamps = Array.from({length: 10}, (_, i) => {
    const a = -Math.PI * 0.85 + (i / 9) * Math.PI * 0.7;
    return {x: 960 + Math.cos(a) * 560, y: 620 + Math.sin(a) * 150, on: i < n};
  });
  return (
    <>
      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        {lamps.map((l, i) => (
          <g key={i}>
            <circle cx={l.x} cy={l.y} r={28} fill={l.on ? T.orange : '#14202e'} stroke={l.on ? T.orange : 'rgba(200,215,225,0.25)'} strokeWidth={3} style={{filter: l.on ? glowF(T.orange, 10) : undefined}} />
            <rect x={l.x - 16} y={760} width={32} height={18} rx={3} fill={l.on ? T.cyan : '#14202e'} opacity={0.9} />
          </g>
        ))}
      </svg>
      <div style={{position: 'absolute', left: 0, right: 0, top: 250, textAlign: 'center', fontFamily: TF.sans, fontSize: 48, color: T.white}}>
        现在有 <span style={{color: T.orange, filter: glowF(T.orange, 8)}}>{n}</span> 个可能
      </div>
      {note('Hick 1952 · 灯和按键是示意，不是实验装置照片')}
    </>
  );
};

/** 对数形状，纵轴不标毫秒 */
export const LogSketch: React.FC<{f: number; at: number}> = ({f, at}) => {
  const p = easeOut(clamp01((f - at) / 24));
  const pts = Array.from({length: 40}, (_, i) => {
    const u = i / 39;
    const n = 1 + u * 9;
    const y = Math.log10(n + 1) / Math.log10(11);
    return [280 + u * 1360, 700 - y * 380];
  });
  const d = pts.map((q, i) => `${i ? 'L' : 'M'}${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(' ');
  return (
    <>
      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        <line x1={280} y1={720} x2={1680} y2={720} stroke="rgba(200,215,225,0.25)" />
        <line x1={280} y1={300} x2={280} y2={720} stroke="rgba(200,215,225,0.25)" />
        <path d={d} fill="none" stroke={T.cyan} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} style={{filter: glowF(T.cyan, 8)}} />
        {[1, 2, 4, 8, 10].map((n) => (
          <text key={n} x={280 + ((n - 1) / 9) * 1360} y={760} textAnchor="middle" fill={T.gray} fontFamily={TF.mono} fontSize={22}>
            {n}
          </text>
        ))}
        <text x={960} y={820} textAnchor="middle" fill={T.gray} fontFamily={TF.sans} fontSize={26}>
          选项个数
        </text>
        <text x={250} y={280} fill={T.gray} fontFamily={TF.sans} fontSize={24}>
          反应时间的形状
        </text>
      </svg>
      {note('只画对数往上走、然后变缓 · 纵轴没有毫秒')}
    </>
  );
};

export const BitRow: React.FC<{f: number; at: number}> = ({f, at}) => {
  const cards: [number, number][] = [
    [2, equalBits(2)],
    [4, equalBits(4)],
    [8, equalBits(8)],
  ];
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 280, display: 'flex', justifyContent: 'center', gap: 48}}>
        {cards.map(([n, bits], i) => {
          const on = clamp01((f - at - i * 8) / 8);
          return (
            <div key={n} style={{width: 420, height: 340, border: `2px solid ${T.cyan}`, background: 'rgba(10,19,34,0.72)', opacity: 0.25 + 0.75 * on, boxShadow: `0 0 ${18 * on}px ${T.cyan}66`, textAlign: 'center'}}>
              <div style={{marginTop: 36, fontFamily: TF.sans, fontSize: 36, color: T.gray}}>{n} 个平等选项</div>
              <div style={{marginTop: 24, fontFamily: TF.mono, fontWeight: 700, fontSize: 120, color: T.cyan, filter: glowF(T.cyan, 10)}}>{bits.toFixed(0)}</div>
              <div style={{fontFamily: TF.sans, fontSize: 32, color: T.white}}>比特 · log2({n})</div>
            </div>
          );
        })}
      </div>
      {note('定义：只算「会是哪一个」。不是开枪要慢的毫秒')}
    </>
  );
};

/** 两条实验室拟合，单位是秒。系数不同，所以没有统一的「每个口加几毫秒」 */
export const FitChart: React.FC<{f: number; at: number}> = ({f, at}) => {
  const p = easeOut(clamp01((f - at) / 28));
  const ns = [1, 2, 3, 4, 5, 6, 8, 10];
  const xOf = (n: number) => 340 + ((n - 1) / 9) * 1180;
  const yOf = (sec: number) => 700 - (sec / 0.72) * 360;
  const path = (b: number) => ns.map((n, i) => `${i ? 'L' : 'M'}${xOf(n).toFixed(1)} ${yOf(hickFitSec(b, n)).toFixed(1)}`).join(' ');
  return (
    <>
      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        <line x1={340} y1={710} x2={1560} y2={710} stroke="rgba(200,215,225,0.25)" />
        {[0.2, 0.4, 0.6].map((sec) => (
          <g key={sec}>
            <line x1={340} x2={1560} y1={yOf(sec)} y2={yOf(sec)} stroke="rgba(200,215,225,0.08)" />
            <text x={320} y={yOf(sec) + 6} textAnchor="end" fill={T.dim} fontFamily={TF.mono} fontSize={18}>
              {sec.toFixed(1)}s
            </text>
          </g>
        ))}
        <path d={path(HICK_MERKEL_B)} fill="none" stroke={T.orange} strokeWidth={5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} style={{filter: glowF(T.orange, 6)}} />
        <path d={path(HICK_EXP1_B)} fill="none" stroke={T.cyan} strokeWidth={5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} style={{filter: glowF(T.cyan, 6)}} />
      </svg>
      <div style={{position: 'absolute', left: 360, top: 250, fontFamily: TF.sans, fontSize: 28, color: T.orange}}>Merkel 数据拟合 · {HICK_MERKEL_B}·log10(n+1) 秒</div>
      <div style={{position: 'absolute', left: 1080, top: 250, fontFamily: TF.sans, fontSize: 28, color: T.cyan}}>Hick 实验一 · {HICK_EXP1_B}·log10(n+1) 秒</div>
      {note('纵轴是实验室拟合的秒，不是「多一个口加多少毫秒」 · 序列跳过 7 和 9')}
    </>
  );
};

const WAYS = [
  ['个数', '等概率的选项变多'],
  ['比例', '个数不变，有一个更常出现'],
  ['上一拍', '下一瞬间取决于刚才'],
] as const;

export const WayRow: React.FC<{f: number; at: number}> = ({f, at}) => (
  <>
    <div style={{position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center', gap: 36}}>
      {WAYS.map(([title, sub], i) => {
        const on = clamp01((f - at - i * 10) / 8);
        return (
          <div key={title} style={{width: 480, height: 300, border: `2px solid ${on > 0.4 ? T.orange : 'rgba(200,215,225,0.2)'}`, background: 'rgba(10,19,34,0.75)', opacity: 0.3 + 0.7 * on, textAlign: 'center'}}>
            <div style={{marginTop: 48, fontFamily: TF.mono, fontWeight: 700, fontSize: 22, letterSpacing: 4, color: T.orange}}>0{i + 1}</div>
            <div style={{marginTop: 16, fontFamily: TF.sans, fontSize: 64, color: T.white}}>{title}</div>
            <div style={{marginTop: 12, fontFamily: TF.sans, fontSize: 28, color: T.gray}}>{sub}</div>
          </div>
        );
      })}
    </div>
    {note('Hyman 1953 摘要里的三种改法 · 反应时间跟着信息走')}
  </>
);

/** 同样四个口：等概率 2 比特，示意概率下熵更低。概率是本片假设 */
export const DoorSplit: React.FC<{f: number; at: number}> = ({f, at}) => {
  const on = clamp01((f - at) / 10);
  const h = entropyBits(ILLUST_P);
  const doors = (weights: number[], color: string) =>
    weights.map((w, i) => (
      <div key={i} style={{width: 70, height: 46 + w * 150, background: color, opacity: 0.35 + 0.65 * w, boxShadow: `0 0 12px ${color}`}} />
    ));
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 280, display: 'flex', justifyContent: 'center', gap: 120, opacity: on}}>
      {[
        ['四个口一样可能', 2, [1, 1, 1, 1], T.gray],
        ['一个口更常出现 · 示意', h, ILLUST_P.map((p) => p / 0.7), T.cyan],
      ].map(([label, bits, weights, color]) => (
        <div key={String(label)} style={{width: 640, textAlign: 'center'}}>
          <div style={{fontFamily: TF.sans, fontSize: 32, color: T.white}}>{label as string}</div>
          <div style={{marginTop: 28, height: 230, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 18}}>{doors(weights as number[], color as string)}</div>
          <div style={{marginTop: 18, fontFamily: TF.mono, fontWeight: 700, fontSize: 64, color: color as string}}>{(bits as number).toFixed(2)}</div>
          <div style={{fontFamily: TF.sans, fontSize: 26, color: T.gray}}>比特 · 自己算的熵</div>
        </div>
      ))}
    </div>
  );
};

/** 三个口还在，同时要判断的只剩一个 */
export const Collapse: React.FC<{f: number; at: number}> = ({f, at}) => {
  const p = clamp01((f - at) / 36);
  const lanes = [
    {name: '左口', who: '队友', color: T.orange},
    {name: '中口', who: '你预瞄', color: T.cyan},
    {name: '右口', who: '队友', color: T.orange},
  ];
  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 0, top: 340, display: 'flex', justifyContent: 'center', gap: 48}}>
        {lanes.map((lane) => (
          <div key={lane.name} style={{width: 420, height: 280, border: `2px solid ${lane.color}`, textAlign: 'center', opacity: lane.who === '你预瞄' ? 1 : 1 - 0.45 * p, background: 'rgba(10,19,34,0.7)'}}>
            <div style={{marginTop: 48, fontFamily: TF.sans, fontSize: 54, color: T.white}}>{lane.name}</div>
            <div style={{marginTop: 24, fontFamily: TF.sans, fontSize: 36, color: lane.color}}>{p > 0.45 || lane.who === '你预瞄' ? lane.who : '都要你看'}</div>
          </div>
        ))}
      </div>
      {note('口没有消失 · 你同时判断的变少了 · 建议，示意')}
    </>
  );
};
