import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { Grid, Button, TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const URL = "http://localhost:8080/1705588/dashboard";

function createData(
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

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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

function EnhancedTableHead(props) {
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({ level }) {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("order_id");
  const [selected, setSelected] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [add, setAdd] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [searchRow, setSearchRow] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then(
        ({ data }) => {
          let result = [];
          data.forEach((el) => {
            if (level === "Level 1") {
              if (el.order_amt < 10000) {
                result.push(
                  createData(
                    el.orderid,
                    el.customer_name,
                    el.customer_id,
                    el.order_amt,
                    el.approval_status,
                    el.approved_by,
                    el.notes,
                    el.order_date
                  )
                );
              }
            } else if (level === "Level 2") {
              if (el.order_amt >= 10000 && el.order_amt < 50000) {
                result.push(
                  createData(
                    el.orderid,
                    el.customer_name,
                    el.customer_id,
                    el.order_amt,
                    el.approval_status,
                    el.approved_by,
                    el.notes,
                    el.order_date
                  )
                );
              }
            } else if (level === "Level 3") {
              if (el.order_amt > 50000) {
                result.push(
                  createData(
                    el.orderid,
                    el.customer_name,
                    el.customer_id,
                    el.order_amt,
                    el.approval_status,
                    el.approved_by,
                    el.notes,
                    el.order_date
                  )
                );
              }
            }
          });
          setRows(result);
          setSearchRow(result);
        },
        (err) => console.log(err)
      );
  }, [level]);

  const handleAdd = () => {
    setAdd(!add);
  };
  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (search.length >= 3) {
      const words = searchRow;
      const result = words.filter((word) =>
        word.order_id.toString().startsWith(e.target.value)
      );
      setRows(result);
    }
    if (e.target.value.length === 0) {
      setRows(searchRow);
    }
  };

  const handleApprove = () => {
    // let name=username;
    // name=username.split('_')
    // name=name[0]+' '+name[1]
    // axios.get('http://localhost:8080/1705500/dummy5?para1=Approved&para2='+name+'&para3='+selected[0]).then(res=>{
    //   const data=res.data;
    //   if (data==='Success'){
    //     handleLoad();
    //   }
    // })
  };

  const handleReject = () => {
    // let name=username;
    //   name=username.split('_')
    //   name=name[0]+' '+name[1]
    //   axios.get('http://localhost:8080/1705500/dummy5?para1=Rejected&para2='+name+'&para3='+selected[0]).then(res=>{
    //     const data=res.data;
    //     if (data==='Success'){
    //       handleLoad();
    //     }
    //   })
  };

  const handleClick = (event, order_id, row) => {
    const selectedIndex = selected.indexOf(order_id);
    let newSelected = [];
    let newSelectedRow = [];
    if (selectedIndex === -1) {
      newSelected = [order_id];
      newSelectedRow = [row];
    } else if (selectedIndex === 0) {
      newSelected = [];
      newSelectedRow = [];
    }
    setSelected(newSelected);
    setSelectedRow(newSelectedRow);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item>
            {level === "Level 1" && (
              <div>
                <Button
                  style={{ marginLeft: "2vh", width: "10vh", color: "white" }}
                  variant="contained"
                  color="secondary"
                  onClick={handleAdd}
                >
                  Add
                </Button>
                <Button
                  style={{ marginLeft: "2vh", width: "10vh", color: "white" }}
                  variant="contained"
                  color="secondary"
                  onClick={handleEdit}
                  disabled={selected.length === 0}
                >
                  Edit
                </Button>
                {/* <AddDialog add={add} onChange={handleAdd} />
                <EditDialog
                  edit={edit}
                  selected={selected[0]}
                  onChange={handleEdit}
                /> */}
              </div>
            )}
            {level === "Level 2" && (
              <div>
                <Button
                  style={{ marginLeft: "2vh", width: "10vh", color: "white" }}
                  variant="contained"
                  onClick={handleApprove}
                  color="secondary"
                  disabled={
                    selected.length === 0 || selectedRow[0].order_amt > 50000
                  }
                >
                  Approve
                </Button>
                <Button
                  style={{ marginLeft: "2vh", width: "10vh", color: "white" }}
                  variant="contained"
                  onClick={handleReject}
                  color="secondary"
                  disabled={
                    selected.length === 0 || selectedRow[0].order_amt > 50000
                  }
                >
                  Reject
                </Button>
              </div>
            )}
            {level === "Level 3" && (
              <div>
                <Button
                  style={{ marginLeft: "2vh", width: "10vh", color: "white" }}
                  variant="contained"
                  onClick={handleApprove}
                  color="secondary"
                  disabled={selected.length === 0}
                >
                  Approve
                </Button>
                <Button
                  style={{ marginLeft: "2vh", width: "10vh", color: "white" }}
                  variant="contained"
                  onClick={handleReject}
                  color="secondary"
                  disabled={selected.length === 0}
                >
                  Reject
                </Button>
              </div>
            )}
          </Grid>
          <Grid item>
            <TextField
              style={{ marginRight: "2vh", backgroundColor: "#f0fffe" }}
              placeholder="Search"
              size="small"
              value={search}
              onChange={(e) => handleSearch(e)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        {/* <EnhancedTableToolbar numSelected={selected.length} level={level}/> */}
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              classes={classes}
              level={level}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.order_id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      style={index % 2 ? { background: "#f0fffe" } : {}}
                      hover
                      onClick={(event) => handleClick(event, row.order_id, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.order_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.order_id}
                      </TableCell>
                      <TableCell align="right">{row.customer_name}</TableCell>
                      <TableCell align="right">{row.cutomer_id}</TableCell>
                      <TableCell align="right">{row.order_amt}</TableCell>
                      <TableCell align="right">{row.approval_status}</TableCell>
                      <TableCell align="right">{row.approved_by}</TableCell>
                      <TableCell align="right">{row.notes}</TableCell>
                      <TableCell align="right">{row.order_date}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 7, 10, 12, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          // style={{color:'#1c95ff'}}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
