import { Cell, Row } from "../models/board";
import C4Cell from "./C4Cell";

interface props {
  row: Row;
}

const C4Row = ({ row }: props) => {
  return (
    <tr>
      {row.cells.map((cell: Cell, i: number) => (
        <C4Cell key={i} cell={cell} />
      ))}
    </tr>
  );
};

export default C4Row;
