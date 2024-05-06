import { Cell } from "../models/board";

interface props {
  cell: Cell;
}

const C4Cell = ({ cell }: props) => {
  let chipColor = "white";

  if (cell.value === "red") {
    chipColor = cell.value;
  }
  if (cell.value === "yellow") {
    chipColor = cell.value;
  }

  return (
    <td style={{ width: "80px", height: "80px" }}>
      <div
        style={{
          width: "60px",
          height: "60px",
          backgroundColor: chipColor,
          borderRadius: "50%",
          margin: "auto",
        }}
      ></div>
    </td>
  );
};

export default C4Cell;
