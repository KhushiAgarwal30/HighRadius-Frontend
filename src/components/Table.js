import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
} from "@material-ui/core";

import { createData, getComparator, stableSort } from "../utils";
import { TableHead as EnhancedTableHead } from "../components";

const URL = "http://localhost:8080/1705588/dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2rem auto",
    width: "80%",
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
  Grid: {
    display: "flex",
    flexDirection: "column",
  },
  paginationGrid: {
    alignSelf: "flex-start",
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
  const [rowsPerPage] = React.useState(10);

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
    if (search.length >= 2) {
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

  const handleApprove = () => {};

  const handleReject = () => {};

  const handleClick = (_, order_id, row) => {
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

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
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
            {level === "Level 1" ? (
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
              </div>
            ) : (
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
        <div className={classes.Grid}>
          <TableContainer>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                classes={classes}
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
                        onClick={(event) =>
                          handleClick(event, row.order_id, row)
                        }
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
                        <TableCell align="right">
                          {row.approval_status}
                        </TableCell>
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
            className={classes.paginationGrid}
            rowsPerPageOptions={[10]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
          />
        </div>
      </Paper>
    </div>
  );
}
