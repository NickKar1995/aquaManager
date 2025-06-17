export interface DefaultDataModel {
  currentBalance: number;
  id: number;
  name: string;
  diameter: number;
  depth: number;
  status: 'empty' | 'stocked';
}
