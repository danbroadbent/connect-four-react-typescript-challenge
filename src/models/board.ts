export interface Cell {
  value: string | null;
}

export interface Row {
  cells: Cell[];
}

export interface Board {
  rows: Row[];
}
