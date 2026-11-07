import React from 'react';
import {Composition, Folder, Still} from 'remotion';
import {Ep00Demo} from './episodes/ep00-demo/Ep00Demo';
import {DURATION as EP00_DURATION, FPS, H as EP00_H, W as EP00_W} from './episodes/ep00-demo/lib/timeline';
import {Ep01Agent} from './episodes/ep01-agent/Ep01Agent';
import {DURATION as EP01_DURATION} from './episodes/ep01-agent/cues';
import {Ep02Llm} from './episodes/ep02-llm/Ep02Llm';
import {DURATION as EP02_DURATION} from './episodes/ep02-llm/cues';
import {CC_H, CC_W, Ep03Cc} from './episodes/ep03-cc/Ep03Cc';
import {DURATION as EP03_DURATION} from './episodes/ep03-cc/cues';
import {EP04_H, EP04_W, Ep04Opus55} from './episodes/ep04-opus55/Ep04Opus55';
import {DURATION as EP04_DURATION} from './episodes/ep04-opus55/cues';
import {EP05_H, EP05_W, Ep05Token} from './episodes/ep05-token/Ep05Token';
import {DURATION as EP05_DURATION} from './episodes/ep05-token/cues';
import {EP06_H, EP06_W, Ep06Context} from './episodes/ep06-context/Ep06Context';
import {DURATION as EP06_DURATION} from './episodes/ep06-context/cues';
import {EP06T_H, EP06T_W, Ep06ContextTall} from './episodes/ep06-context/Ep06ContextTall';
import {EP07_H, EP07_W, Ep07Agent} from './episodes/ep07-agent/Ep07Agent';
import {DURATION as EP07_DURATION} from './episodes/ep07-agent/cues';
import {EP07T_H, EP07T_W, Ep07AgentTall} from './episodes/ep07-agent/Ep07AgentTall';
import {EP08_H, EP08_W, Ep08Hallucination} from './episodes/ep08-hallucination/Ep08Hallucination';
import {DURATION as EP08_DURATION} from './episodes/ep08-hallucination/cues';
import {EP08T_H, EP08T_W, Ep08HallucinationTall} from './episodes/ep08-hallucination/Ep08HallucinationTall';
import {EP09_H, EP09_W, Ep09Prompt} from './episodes/ep09-prompt/Ep09Prompt';
import {DURATION as EP09_DURATION} from './episodes/ep09-prompt/cues';
import {EP10_H, EP10_W, Ep10Multimodal} from './episodes/ep10-multimodal/Ep10Multimodal';
import {DURATION as EP10_DURATION} from './episodes/ep10-multimodal/cues';
import {EP11_H, EP11_W, Ep11Mcp} from './episodes/ep11-mcp/Ep11Mcp';
import {DURATION as EP11_DURATION} from './episodes/ep11-mcp/cues';
import {EP12_H, EP12_W, Ep12Skill} from './episodes/ep12-skill/Ep12Skill';
import {DURATION as EP12_DURATION} from './episodes/ep12-skill/cues';
import {EP13_H, EP13_W, Ep13Subagent} from './episodes/ep13-subagent/Ep13Subagent';
import {DURATION as EP13_DURATION} from './episodes/ep13-subagent/cues';
import {EP14_H, EP14_W, Ep14AgentPermission} from './episodes/ep14-agent-permission/Ep14AgentPermission';
import {DURATION as EP14_DURATION} from './episodes/ep14-agent-permission/cues';
import {EP15_H, EP15_W, Ep15PromptInjection} from './episodes/ep15-prompt-injection/Ep15PromptInjection';
import {DURATION as EP15_DURATION} from './episodes/ep15-prompt-injection/cues';
import {EP16_H, EP16_W, Ep16AgentDone} from './episodes/ep16-agent-done/Ep16AgentDone';
import {DURATION as EP16_DURATION} from './episodes/ep16-agent-done/cues';
import {EP17_H, EP17_W, Ep17Sycophancy} from './episodes/ep17-sycophancy/Ep17Sycophancy';
import {DURATION as EP17_DURATION} from './episodes/ep17-sycophancy/cues';
import {EP18_H, EP18_W, Ep18AiHistory} from './episodes/ep18-ai-history/Ep18AiHistory';
import {DURATION as EP18_DURATION} from './episodes/ep18-ai-history/cues';
import {EP19_H, EP19_W, Ep19AppleHistory} from './episodes/ep19-apple-history/Ep19AppleHistory';
import {DURATION as EP19_DURATION} from './episodes/ep19-apple-history/cues';
import {EP20_H, EP20_W, Ep20NvidiaHistory} from './episodes/ep20-nvidia-history/Ep20NvidiaHistory';
import {DURATION as EP20_DURATION} from './episodes/ep20-nvidia-history/cues';
import {EP21_H, EP21_W, Ep21NobelPhysics} from './episodes/ep21-nobel-physics/Ep21NobelPhysics';
import {DURATION as EP21_DURATION} from './episodes/ep21-nobel-physics/cues';
import {Ep21CoverTall} from './episodes/ep21-nobel-physics/Cover';
import {Ep22CoverTall} from './episodes/ep22-nobel-chemistry/Cover';
import {EP22_H, EP22_W, Ep22NobelChemistry} from './episodes/ep22-nobel-chemistry/Ep22NobelChemistry';
import {DURATION as EP22_DURATION} from './episodes/ep22-nobel-chemistry/cues';
import {Ep18CoverTall} from './episodes/ep18-ai-history/CoverTall';
import {Ep19CoverTall} from './episodes/ep19-apple-history/CoverTall';
import {Ep20CoverTall} from './episodes/ep20-nvidia-history/CoverTall';
import {DURATION as EP23_DURATION, FPS as EP23_FPS, H as EP23_H, W as EP23_W} from './episodes/ep23-wheat-chessboard/timeline';
import {Ep23Wheat} from './episodes/ep23-wheat-chessboard/Ep23Wheat';
import {DURATION as EP24_DURATION, FPS as EP24_FPS, H as EP24_H, W as EP24_W} from './episodes/ep24-birthday-paradox/timeline';
import {Ep24Birthday} from './episodes/ep24-birthday-paradox/Ep24Birthday';
import {Ep24CoverTall} from './episodes/ep24-birthday-paradox/Cover';
import {DURATION as EP25_DURATION, FPS as EP25_FPS, H as EP25_H, W as EP25_W} from './episodes/ep25-behind-cover/timeline';
import {Ep25Cover} from './episodes/ep25-behind-cover/Ep25Cover';
import {DURATION as EP28_DURATION, FPS as EP28_FPS, H as EP28_H, W as EP28_W} from './episodes/ep28-express-relay/timeline';
import {Ep28Relay} from './episodes/ep28-express-relay/Ep28Relay';
import {Ep28CoverTall} from './episodes/ep28-express-relay/CoverTall';
import {DURATION as EP30_DURATION, FPS as EP30_FPS, H as EP30_H, W as EP30_W} from './episodes/ep30-tang-divorce/timeline';
import {Ep30Divorce} from './episodes/ep30-tang-divorce/Ep30Divorce';
import {Ep30CoverTall} from './episodes/ep30-tang-divorce/CoverTall';
import {DURATION as EP32_DURATION, FPS as EP32_FPS, H as EP32_H, W as EP32_W} from './episodes/ep32-love-lasts/timeline';
import {Ep32Love} from './episodes/ep32-love-lasts/Ep32Love';
import {DURATION as EP34_DURATION, FPS as EP34_FPS, H as EP34_H, W as EP34_W} from './episodes/ep34-song-takeout/timeline';
import {Ep34Takeout} from './episodes/ep34-song-takeout/Ep34Takeout';
import {Ep34CoverTall} from './episodes/ep34-song-takeout/CoverTall';
import {DURATION as EP41_DURATION, FPS as EP41_FPS, H as EP41_H, W as EP41_W} from './episodes/ep41-flying-money/timeline';
import {Ep41FlyingMoney} from './episodes/ep41-flying-money/Ep41FlyingMoney';
import {Ep41CoverTall} from './episodes/ep41-flying-money/CoverTall';
import {DURATION as EP46_DURATION, FPS as EP46_FPS, H as EP46_H, W as EP46_W} from './episodes/ep46-song-ice/timeline';
import {Ep46SongIce} from './episodes/ep46-song-ice/Ep46SongIce';
import {Ep46CoverTall} from './episodes/ep46-song-ice/CoverTall';
import {DURATION as EP29_DURATION, FPS as EP29_FPS, H as EP29_H, W as EP29_W} from './episodes/ep29-footsteps/timeline';
import {Ep29Footsteps} from './episodes/ep29-footsteps/Ep29Footsteps';
import {DURATION as EP31_DURATION, FPS as EP31_FPS, H as EP31_H, W as EP31_W} from './episodes/ep31-rigged/timeline';
import {Ep31Rigged} from './episodes/ep31-rigged/Ep31Rigged';
import {DURATION as EP33_DURATION, FPS as EP33_FPS, H as EP33_H, W as EP33_W} from './episodes/ep33-teammates/timeline';
import {Ep33Teammates} from './episodes/ep33-teammates/Ep33Teammates';
import {DURATION as EP35_DURATION, FPS as EP35_FPS, H as EP35_H, W as EP35_W} from './episodes/ep35-choke/timeline';
import {Ep35Choke} from './episodes/ep35-choke/Ep35Choke';
import {DURATION as EP37_DURATION, FPS as EP37_FPS, H as EP37_H, W as EP37_W} from './episodes/ep37-bhop/timeline';
import {Ep37Bhop} from './episodes/ep37-bhop/Ep37Bhop';
import {DURATION as EP39_DURATION, FPS as EP39_FPS, H as EP39_H, W as EP39_W} from './episodes/ep39-latency/timeline';
import {Ep39Latency} from './episodes/ep39-latency/Ep39Latency';
import {DURATION as EP40_DURATION, FPS as EP40_FPS, H as EP40_H, W as EP40_W} from './episodes/ep40-counter-strafe/timeline';
import {Ep40CounterStrafe} from './episodes/ep40-counter-strafe/Ep40CounterStrafe';
import {DURATION as EP42_DURATION, FPS as EP42_FPS, H as EP42_H, W as EP42_W} from './episodes/ep42-tap-fire/timeline';
import {Ep42TapFire} from './episodes/ep42-tap-fire/Ep42TapFire';
import {DURATION as EP43_DURATION, FPS as EP43_FPS, H as EP43_H, W as EP43_W} from './episodes/ep43-one-more-game/timeline';
import {Ep43OneMoreGame} from './episodes/ep43-one-more-game/Ep43OneMoreGame';
import {DURATION as EP45_DURATION, FPS as EP45_FPS, H as EP45_H, W as EP45_W} from './episodes/ep45-callouts/timeline';
import {Ep45Callouts} from './episodes/ep45-callouts/Ep45Callouts';
import {DURATION as EP47_DURATION, FPS as EP47_FPS, H as EP47_H, W as EP47_W} from './episodes/ep47-spotlight/timeline';
import {Ep47Spotlight} from './episodes/ep47-spotlight/Ep47Spotlight';
import {DURATION as EP48_DURATION, FPS as EP48_FPS, H as EP48_H, W as EP48_W} from './episodes/ep48-jiggle-peek/timeline';
import {Ep48JigglePeek} from './episodes/ep48-jiggle-peek/Ep48JigglePeek';
import {DURATION as EP49_DURATION, FPS as EP49_FPS, H as EP49_H, W as EP49_W} from './episodes/ep49-ad-strafe/timeline';
import {Ep49AdStrafe} from './episodes/ep49-ad-strafe/Ep49AdStrafe';
import {DURATION as EP50_DURATION, FPS as EP50_FPS, H as EP50_H, W as EP50_W} from './episodes/ep50-late-night/timeline';
import {Ep50LateNight} from './episodes/ep50-late-night/Ep50LateNight';
import {DURATION as EP51_DURATION, FPS as EP51_FPS, H as EP51_H, W as EP51_W} from './episodes/ep51-practice/timeline';
import {Ep51Practice} from './episodes/ep51-practice/Ep51Practice';
import {DURATION as EP65_DURATION, FPS as EP65_FPS, H as EP65_H, W as EP65_W} from './episodes/ep65-hick/timeline';
import {Ep65Hick} from './episodes/ep65-hick/Ep65Hick';
import {Ep65CoverTall} from './episodes/ep65-hick/CoverTall';
import {DURATION as EP36_DURATION, FPS as EP36_FPS, H as EP36_H, W as EP36_W} from './episodes/ep36-boxed-pigs/timeline';
import {Ep36Pigs} from './episodes/ep36-boxed-pigs/Ep36Pigs';
import {Ep36CoverTall} from './episodes/ep36-boxed-pigs/CoverTall';
import {DURATION as EP38_DURATION, FPS as EP38_FPS, H as EP38_H, W as EP38_W} from './episodes/ep38-butterfly/timeline';
import {Ep38Butterfly} from './episodes/ep38-butterfly/Ep38Butterfly';
import {Ep38CoverTall} from './episodes/ep38-butterfly/CoverTall';
import {DURATION as EP26_DURATION} from './episodes/ep26-opus-video/cues';
import {EP26_H, EP26_W, Ep26OpusVideo} from './episodes/ep26-opus-video/Ep26OpusVideo';
import {Ep26CoverTall} from './episodes/ep26-opus-video/Cover';
import {DURATION as EP27_DURATION} from './episodes/ep27-opus-video-full/cues';
import {EP27_H, EP27_W, Ep27OpusVideoFull} from './episodes/ep27-opus-video-full/Ep27OpusVideoFull';
import {Ep27CoverTall} from './episodes/ep27-opus-video-full/Cover';
import {GILDED_DEMO_FRAMES, GildedDemo} from './library/previews/GildedDemo';
import {HALFTONE_DEMO_FRAMES, HalftoneDemo} from './library/previews/HalftoneDemo';
import {BLACKGOLD_DEMO_FRAMES, BlackGoldDemo} from './library/previews/BlackGoldDemo';
import {LAMPLIGHT_DEMO_FRAMES, LamplightDemo} from './library/previews/LamplightDemo';
import {TACTICAL_DEMO_FRAMES, TacticalDemo} from './library/previews/TacticalDemo';
import {WARM_DESK_DEMO_FRAMES, WarmDeskDemo} from './library/previews/WarmDeskDemo';
import {EDITOR_ROOM_DEMO_FRAMES, EditorRoomDemo} from './library/previews/EditorRoomDemo';
import {WARM_DESK_SHOW_FRAMES, WarmDeskCoverDemo, WarmDeskShowDemo} from './library/previews/WarmDeskShowDemo';
import {PixelWardrobe} from './library/previews/PixelWardrobe';
import {Wardrobe} from './library/previews/Wardrobe';

const mix = {mix: 'all' as const};

/**
 * 作品 ID 与 src/episodes/ 下的目录名一致；预览页以 library- 开头。
 * Studio 左栏按风格分文件夹，和 materials/、out/ 的分类一致（风格内按编号排，封面紧跟在对应那一期后面）；
 * 新一期注册到它所属风格的 <Folder> 里。Folder 名只能用中文、字母、数字和 -。
 */
export const Root: React.FC = () => (
  <>
    <Folder name="01-矢量手绘风">
      <Composition id="ep00-demo" component={Ep00Demo} durationInFrames={EP00_DURATION} fps={FPS} width={EP00_W} height={EP00_H} />
      <Composition id="ep01-agent" component={Ep01Agent} durationInFrames={EP01_DURATION} fps={FPS} width={1080} height={1920} defaultProps={mix} />
      <Composition id="ep02-llm" component={Ep02Llm} durationInFrames={EP02_DURATION} fps={FPS} width={1080} height={1920} defaultProps={mix} />
    </Folder>
    <Folder name="02-像素手绘风">
      <Composition id="ep03-cc" component={Ep03Cc} durationInFrames={EP03_DURATION} fps={FPS} width={CC_W} height={CC_H} defaultProps={mix} />
      <Composition id="ep04-opus55" component={Ep04Opus55} durationInFrames={EP04_DURATION} fps={FPS} width={EP04_W} height={EP04_H} defaultProps={mix} />
    </Folder>
    <Folder name="03-像素贴纸风">
      <Composition id="ep05-token" component={Ep05Token} durationInFrames={EP05_DURATION} fps={FPS} width={EP05_W} height={EP05_H} defaultProps={mix} />
      <Composition id="ep06-context" component={Ep06Context} durationInFrames={EP06_DURATION} fps={FPS} width={EP06_W} height={EP06_H} defaultProps={mix} />
      <Composition id="ep06-context-tall" component={Ep06ContextTall} durationInFrames={EP06_DURATION} fps={FPS} width={EP06T_W} height={EP06T_H} defaultProps={mix} />
      <Composition id="ep07-agent" component={Ep07Agent} durationInFrames={EP07_DURATION} fps={FPS} width={EP07_W} height={EP07_H} defaultProps={mix} />
      <Composition id="ep07-agent-tall" component={Ep07AgentTall} durationInFrames={EP07_DURATION} fps={FPS} width={EP07T_W} height={EP07T_H} defaultProps={mix} />
      <Composition id="ep08-hallucination" component={Ep08Hallucination} durationInFrames={EP08_DURATION} fps={FPS} width={EP08_W} height={EP08_H} defaultProps={mix} />
      <Composition id="ep08-hallucination-tall" component={Ep08HallucinationTall} durationInFrames={EP08_DURATION} fps={FPS} width={EP08T_W} height={EP08T_H} defaultProps={mix} />
      <Composition id="ep09-prompt" component={Ep09Prompt} durationInFrames={EP09_DURATION} fps={FPS} width={EP09_W} height={EP09_H} defaultProps={mix} />
      <Composition id="ep10-multimodal" component={Ep10Multimodal} durationInFrames={EP10_DURATION} fps={FPS} width={EP10_W} height={EP10_H} defaultProps={mix} />
      <Composition id="ep11-mcp" component={Ep11Mcp} durationInFrames={EP11_DURATION} fps={FPS} width={EP11_W} height={EP11_H} defaultProps={mix} />
      <Composition id="ep12-skill" component={Ep12Skill} durationInFrames={EP12_DURATION} fps={FPS} width={EP12_W} height={EP12_H} defaultProps={mix} />
      <Composition id="ep13-subagent" component={Ep13Subagent} durationInFrames={EP13_DURATION} fps={FPS} width={EP13_W} height={EP13_H} defaultProps={mix} />
      <Composition id="ep14-agent-permission" component={Ep14AgentPermission} durationInFrames={EP14_DURATION} fps={FPS} width={EP14_W} height={EP14_H} defaultProps={mix} />
      <Composition id="ep15-prompt-injection" component={Ep15PromptInjection} durationInFrames={EP15_DURATION} fps={FPS} width={EP15_W} height={EP15_H} defaultProps={mix} />
      <Composition id="ep16-agent-done" component={Ep16AgentDone} durationInFrames={EP16_DURATION} fps={FPS} width={EP16_W} height={EP16_H} defaultProps={mix} />
      <Composition id="ep17-sycophancy" component={Ep17Sycophancy} durationInFrames={EP17_DURATION} fps={FPS} width={EP17_W} height={EP17_H} defaultProps={mix} />
    </Folder>
    <Folder name="04-Vox科普">
      <Composition id="ep18-ai-history" component={Ep18AiHistory} durationInFrames={EP18_DURATION} fps={FPS} width={EP18_W} height={EP18_H} defaultProps={mix} />
      <Still id="ep18-ai-history-cover-tall" component={Ep18CoverTall} width={1080} height={1440} />
      <Composition id="ep19-apple-history" component={Ep19AppleHistory} durationInFrames={EP19_DURATION} fps={FPS} width={EP19_W} height={EP19_H} defaultProps={mix} />
      <Still id="ep19-apple-history-cover-tall" component={Ep19CoverTall} width={1080} height={1440} />
      <Composition id="ep20-nvidia-history" component={Ep20NvidiaHistory} durationInFrames={EP20_DURATION} fps={FPS} width={EP20_W} height={EP20_H} defaultProps={mix} />
      <Still id="ep20-nvidia-history-cover-tall" component={Ep20CoverTall} width={1080} height={1440} />
      <Composition id="ep21-nobel-physics" component={Ep21NobelPhysics} durationInFrames={EP21_DURATION} fps={FPS} width={EP21_W} height={EP21_H} defaultProps={mix} />
      <Still id="ep21-nobel-physics-cover-tall" component={Ep21CoverTall} width={1080} height={1440} />
      <Composition id="ep22-nobel-chemistry" component={Ep22NobelChemistry} durationInFrames={EP22_DURATION} fps={FPS} width={EP22_W} height={EP22_H} defaultProps={mix} />
      <Still id="ep22-nobel-chemistry-cover-tall" component={Ep22CoverTall} width={1080} height={1440} />
    </Folder>
    <Folder name="05-暗金文献风">
      <Composition id="ep23-wheat-chessboard" component={Ep23Wheat} durationInFrames={EP23_DURATION} fps={EP23_FPS} width={EP23_W} height={EP23_H} />
      <Composition id="ep24-birthday-paradox" component={Ep24Birthday} durationInFrames={EP24_DURATION} fps={EP24_FPS} width={EP24_W} height={EP24_H} />
      <Still id="ep24-birthday-paradox-cover-tall" component={Ep24CoverTall} width={1080} height={1440} />
      <Composition id="ep32-love-lasts" component={Ep32Love} durationInFrames={EP32_DURATION} fps={EP32_FPS} width={EP32_W} height={EP32_H} />
    </Folder>
    <Folder name="06-战术屏科普风">
      <Composition id="ep25-behind-cover" component={Ep25Cover} durationInFrames={EP25_DURATION} fps={EP25_FPS} width={EP25_W} height={EP25_H} />
      <Composition id="ep29-footsteps" component={Ep29Footsteps} durationInFrames={EP29_DURATION} fps={EP29_FPS} width={EP29_W} height={EP29_H} />
      <Composition id="ep31-rigged" component={Ep31Rigged} durationInFrames={EP31_DURATION} fps={EP31_FPS} width={EP31_W} height={EP31_H} />
      <Composition id="ep33-teammates" component={Ep33Teammates} durationInFrames={EP33_DURATION} fps={EP33_FPS} width={EP33_W} height={EP33_H} />
      <Composition id="ep35-choke" component={Ep35Choke} durationInFrames={EP35_DURATION} fps={EP35_FPS} width={EP35_W} height={EP35_H} />
      <Composition id="ep37-bhop" component={Ep37Bhop} durationInFrames={EP37_DURATION} fps={EP37_FPS} width={EP37_W} height={EP37_H} />
      <Composition id="ep39-latency" component={Ep39Latency} durationInFrames={EP39_DURATION} fps={EP39_FPS} width={EP39_W} height={EP39_H} />
      <Composition id="ep40-counter-strafe" component={Ep40CounterStrafe} durationInFrames={EP40_DURATION} fps={EP40_FPS} width={EP40_W} height={EP40_H} />
      <Composition id="ep42-tap-fire" component={Ep42TapFire} durationInFrames={EP42_DURATION} fps={EP42_FPS} width={EP42_W} height={EP42_H} />
      <Composition id="ep43-one-more-game" component={Ep43OneMoreGame} durationInFrames={EP43_DURATION} fps={EP43_FPS} width={EP43_W} height={EP43_H} />
      <Composition id="ep45-callouts" component={Ep45Callouts} durationInFrames={EP45_DURATION} fps={EP45_FPS} width={EP45_W} height={EP45_H} />
      <Composition id="ep47-spotlight" component={Ep47Spotlight} durationInFrames={EP47_DURATION} fps={EP47_FPS} width={EP47_W} height={EP47_H} />
      <Composition id="ep48-jiggle-peek" component={Ep48JigglePeek} durationInFrames={EP48_DURATION} fps={EP48_FPS} width={EP48_W} height={EP48_H} />
      <Composition id="ep49-ad-strafe" component={Ep49AdStrafe} durationInFrames={EP49_DURATION} fps={EP49_FPS} width={EP49_W} height={EP49_H} />
      <Composition id="ep50-late-night" component={Ep50LateNight} durationInFrames={EP50_DURATION} fps={EP50_FPS} width={EP50_W} height={EP50_H} />
      <Composition id="ep51-practice" component={Ep51Practice} durationInFrames={EP51_DURATION} fps={EP51_FPS} width={EP51_W} height={EP51_H} />
      <Composition id="ep65-hick" component={Ep65Hick} durationInFrames={EP65_DURATION} fps={EP65_FPS} width={EP65_W} height={EP65_H} />
      <Still id="ep65-hick-cover-tall" component={Ep65CoverTall} width={1080} height={1440} />
    </Folder>
    <Folder name="07-暖纸工作台风">
      <Composition id="ep26-opus-video" component={Ep26OpusVideo} durationInFrames={EP26_DURATION} fps={FPS} width={EP26_W} height={EP26_H} defaultProps={mix} />
      <Still id="ep26-opus-video-cover-tall" component={Ep26CoverTall} width={1080} height={1440} />
      <Composition id="ep27-opus-video-full" component={Ep27OpusVideoFull} durationInFrames={EP27_DURATION} fps={FPS} width={EP27_W} height={EP27_H} defaultProps={mix} />
      <Still id="ep27-opus-video-full-cover-tall" component={Ep27CoverTall} width={1080} height={1440} />
    </Folder>
    <Folder name="08-灯火史话风">
      <Composition id="ep28-express-relay" component={Ep28Relay} durationInFrames={EP28_DURATION} fps={EP28_FPS} width={EP28_W} height={EP28_H} />
      <Still id="ep28-express-relay-cover-tall" component={Ep28CoverTall} width={1080} height={1440} />
      <Composition id="ep30-tang-divorce" component={Ep30Divorce} durationInFrames={EP30_DURATION} fps={EP30_FPS} width={EP30_W} height={EP30_H} />
      <Still id="ep30-tang-divorce-cover-tall" component={Ep30CoverTall} width={1080} height={1440} />
      <Composition id="ep34-song-takeout" component={Ep34Takeout} durationInFrames={EP34_DURATION} fps={EP34_FPS} width={EP34_W} height={EP34_H} />
      <Still id="ep34-song-takeout-cover-tall" component={Ep34CoverTall} width={1080} height={1440} />
      <Composition id="ep41-flying-money" component={Ep41FlyingMoney} durationInFrames={EP41_DURATION} fps={EP41_FPS} width={EP41_W} height={EP41_H} />
      <Still id="ep41-flying-money-cover-tall" component={Ep41CoverTall} width={1080} height={1440} />
      <Composition id="ep46-song-ice" component={Ep46SongIce} durationInFrames={EP46_DURATION} fps={EP46_FPS} width={EP46_W} height={EP46_H} />
      <Still id="ep46-song-ice-cover-tall" component={Ep46CoverTall} width={1080} height={1440} />
    </Folder>
    <Folder name="09-黑金光影风">
      <Composition id="ep36-boxed-pigs" component={Ep36Pigs} durationInFrames={EP36_DURATION} fps={EP36_FPS} width={EP36_W} height={EP36_H} />
      <Still id="ep36-boxed-pigs-cover-tall" component={Ep36CoverTall} width={1080} height={1440} />
      <Composition id="ep38-butterfly" component={Ep38Butterfly} durationInFrames={EP38_DURATION} fps={EP38_FPS} width={EP38_W} height={EP38_H} />
      <Still id="ep38-butterfly-cover-tall" component={Ep38CoverTall} width={1080} height={1440} />
    </Folder>
    <Folder name="99-素材预览">
      <Composition id="library-wardrobe" component={Wardrobe} durationInFrames={150} fps={FPS} width={1080} height={1920} />
      <Composition id="library-gilded" component={GildedDemo} durationInFrames={GILDED_DEMO_FRAMES} fps={FPS} width={1920} height={1080} />
      <Composition id="library-halftone" component={HalftoneDemo} durationInFrames={HALFTONE_DEMO_FRAMES} fps={FPS} width={1920} height={1080} />
      <Composition id="library-blackgold" component={BlackGoldDemo} durationInFrames={BLACKGOLD_DEMO_FRAMES} fps={FPS} width={1920} height={1080} />
      <Composition id="library-lamplight" component={LamplightDemo} durationInFrames={LAMPLIGHT_DEMO_FRAMES} fps={FPS} width={1920} height={1080} />
      <Composition id="library-tactical" component={TacticalDemo} durationInFrames={TACTICAL_DEMO_FRAMES} fps={FPS} width={1920} height={1080} />
      <Composition id="library-warm-desk" component={WarmDeskDemo} durationInFrames={WARM_DESK_DEMO_FRAMES} fps={FPS} width={1920} height={1080} />
      <Composition id="library-editor-room" component={EditorRoomDemo} durationInFrames={EDITOR_ROOM_DEMO_FRAMES} fps={FPS} width={1920} height={1080} />
      <Composition id="library-warm-desk-show" component={WarmDeskShowDemo} durationInFrames={WARM_DESK_SHOW_FRAMES} fps={FPS} width={1920} height={1080} />
      <Still id="library-warm-desk-cover" component={WarmDeskCoverDemo} width={1080} height={1440} />
      <Composition id="library-pixel-wardrobe" component={PixelWardrobe} durationInFrames={150} fps={FPS} width={1080} height={1080} />
    </Folder>
  </>
);
