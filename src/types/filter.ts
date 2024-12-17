export interface FilterPreset {
  label: string;
  value: number;
}

export interface FilterConfig {
  presets: FilterPreset[];
  suffix?: string;
}

export interface FilterState {
  type: 'preset' | 'custom';
  preset?: number;
  min?: number;
  max?: number;
}

export interface FilterRange {
  min: number;
  max: number;
}