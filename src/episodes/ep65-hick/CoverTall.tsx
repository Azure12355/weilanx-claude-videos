import React from 'react';
import {AbsoluteFill} from 'remotion';
import {glowF, T, TF} from '../../library/tactical/theme';
import {EP, SERIES, TITLE} from './timeline';

/**
 * 严格 3:4（1080×1440）代码封面。标题与成片一致，两行排开，避免 13 个字挤出画面。
 * 不画任何真实游戏的角色、枪械和标志。
 */
export const Ep65CoverTall: React.FC = () => {
  const [a, b] = TITLE.split('，');
  return (
    <AbsoluteFill style={{background: T.bg, fontFamily: TF.sans, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 78%, #163044 0%, #050b14 58%)'}} />
      <svg width={1080} height={1440} style={{position: 'absolute'}}>
        {Array.from({length: 18}, (_, i) => (
          <line key={i} x1={i * 64} y1={0} x2={i * 64} y2={1440} stroke="rgba(120,170,200,0.07)" />
        ))}
        <path d="M48 48 H120 M48 48 V120" fill="none" stroke={T.cyan} strokeWidth={3} />
        <path d="M1032 48 H960 M1032 48 V120" fill="none" stroke={T.cyan} strokeWidth={3} />
        <path d="M48 1392 H120 M48 1392 V1320" fill="none" stroke="rgba(200,215,225,0.35)" strokeWidth={3} />
        <path d="M1032 1392 H960 M1032 1392 V1320" fill="none" stroke="rgba(200,215,225,0.35)" strokeWidth={3} />
        {[240, 540, 840].map((x, i) => (
          <g key={x}>
            <rect x={x - 46} y={980} width={92} height={250} fill="#101a28" stroke={i === 1 ? T.cyan : 'rgba(200,215,225,0.28)'} strokeWidth={3} />
            <circle cx={x} cy={1040} r={16} fill={i === 1 ? T.orange : T.gray} style={{filter: i === 1 ? glowF(T.orange, 8) : undefined}} />
          </g>
        ))}
        <circle cx={540} cy={1160} r={34} fill="none" stroke={T.cyan} strokeWidth={6} style={{filter: glowF(T.cyan, 8)}} />
        <path d="M540 1136 V1160 H564" stroke={T.cyan} strokeWidth={6} />
      </svg>
      <div style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', fontFamily: TF.mono, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: T.cyan}}>
        {SERIES} · {EP}
      </div>
      <div style={{position: 'absolute', left: 48, right: 48, top: 240, textAlign: 'center', fontSize: 92, lineHeight: 1.12, color: T.white, textShadow: '0 6px 0 rgba(0,0,0,0.65)'}}>
        {a}，
      </div>
      <div style={{position: 'absolute', left: 48, right: 48, top: 370, textAlign: 'center', fontSize: 92, lineHeight: 1.12, color: T.white, textShadow: '0 6px 0 rgba(0,0,0,0.65)'}}>
        你开枪越<span style={{color: T.red, filter: glowF(T.red, 10)}}>慢</span>？
      </div>
      <div style={{position: 'absolute', left: 70, right: 70, top: 540, textAlign: 'center', fontSize: 40, color: T.cyan, filter: glowF(T.cyan, 6)}}>
        同时要处理的信息
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1280, textAlign: 'center', fontFamily: TF.mono, fontSize: 22, letterSpacing: 3, color: T.gray}}>
        {b ? '选择反应 · 实验室结论，不是引擎机制 · 示意' : '示意'}
      </div>
    </AbsoluteFill>
  );
};
