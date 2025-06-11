
import { TransferDestination } from '@models'
export interface Transfer {
  id: number;
  date: Date;
  sourceCageId: number;
  destinations: TransferDestination[];
}
