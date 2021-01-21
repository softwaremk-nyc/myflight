import { CgData } from '../src/cg';

export const basicEmptyLabel = 'Basic Empty';

export interface CgDataEntry {
  name: string;
  cgData: CgData | null,
  maxW: number | null,
  comps: CgDataEntry[] | null,
  notes: string | null,
}
