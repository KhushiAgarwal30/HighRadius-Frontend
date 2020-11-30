import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@material-ui/core";

const headCells = [
  { id: "order_id", numeric: false, disablePadding: true, label: "Order ID" },
  {
    id: "customer_name",
    numeric: true,
    disablePadding: false,
    label: "Customer Name",
  },
  {
    id: "customer_id",
    numeric: true,
    disablePadding: false,
    label: "Customer ID",
  },
  {
    id: "order_amt",
    numeric: true,
    disablePadding: false,
    label: "Order Amount",
  },
  {
    id: "approval_status",
    numeric: true,
    disablePadding: false,
    label: "Approval Status",
  },
  {
    id: "approved_by",
    numeric: true,
    disablePadding: false,
    label: "Approved By",
  },
  { id: "notes", numeric: true, disablePadding: false, label: "Notes" },
  {
    id: "order_date",
    numeric: true,
    disablePadding: false,
    label: "Order Date",
  },
];

export default function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="default" />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
