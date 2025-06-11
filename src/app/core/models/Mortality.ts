export interface Mortality {
  id: number;
  cageId: number;
  date: Date;
  count: number;
  cause?: string;
}
