import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
  LastPage as LastPageIcon,
  FirstPage as FirstPageIcon,
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

export default function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        color="secondary"
        style={{
          backgroundColor: "#d7f4f5",
          borderRadius: "0.5vh",
          width: "2vh",
          height: "2vh",
          margin: "1vh",
        }}
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        color="secondary"
        style={{
          backgroundColor: "#d7f4f5",
          borderRadius: "0.5vh",
          width: "2vh",
          height: "2vh",
          margin: "1vh",
        }}
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        color="secondary"
        style={{
          backgroundColor: "#d7f4f5",
          borderRadius: "0.5vh",
          width: "2vh",
          height: "2vh",
          margin: "1vh",
        }}
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        color="secondary"
        style={{
          backgroundColor: "#d7f4f5",
          borderRadius: "0.5vh",
          width: "2vh",
          height: "2vh",
          margin: "1vh",
        }}
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
