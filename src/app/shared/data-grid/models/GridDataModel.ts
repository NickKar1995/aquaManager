import { CageGridRow } from 'app/features/fish-stocking/models/CageGridRow';
import { DefaultDataModel } from './DefaultDataModel';
import { TransferGridRow } from 'app/features/fish-transfers/models/TransferGridRow';
import { MortalityGridRow } from 'app/features/mortalities/models/MortalityGridRow';
import { Cage } from '@models';

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type GridDataModel =
  | Cage[]
  | DefaultDataModel[]
  | CageGridRow[]
  | TransferGridRow[]
  | MortalityGridRow[];
