export interface TimeZone {
  id: string;
  name: string;
  offset: number;
  abbreviation: string;
  isSource?: boolean;
}

export interface TimeBlock {
  start: Date;
  end: Date;
}