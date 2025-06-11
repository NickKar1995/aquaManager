export interface Cage {
  id: number;
  name: string;
  diameter: number;
  depth: number;
  status: 'empty' | 'stocked';
}
