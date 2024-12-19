export interface FilterPreset {
  label: string;
  value: number;
}

export interface FilterConfig {
  presets: FilterPreset[];
  suffix?: string;
}

export interface FilterState {
  type: 'preset' | 'range';
  value?: number;
  min?: number;
  max?: number;
}