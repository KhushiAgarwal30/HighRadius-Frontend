export function createData(
  order_id,
  customer_name,
  cutomer_id,
  order_amt,
  approval_status,
  approved_by,
  notes,
  order_date
) {
  return {
    order_id,
    customer_name,
    cutomer_id,
    order_amt,
    approval_status,
    approved_by,
    notes,
    order_date,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function formatDate(date) {
  const spaceRemovedDate = date.split(" ");
  const formattedDate = spaceRemovedDate[0].replace(/-/g, "/");
  return formattedDate;
}
