interface SoundData {
  name: string;       // 音频名称
  files: string[];    // 音频文件路径数组
  group: string;      // 音频所属组别
  volume: number;     // 音频音量
  html5?: boolean;    // 是否使用 HTML5 播放器（可选）
  howls: Howl[];      // 存储 Howl 实例的数组
}
