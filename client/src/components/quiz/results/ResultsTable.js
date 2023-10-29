import React, { useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  TablePagination,
  Checkbox,
} from "@mui/material";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import EnhancedTableToolbar from "./Toolbar";
import "react-toastify/dist/ReactToastify.css";

const generateRandomCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>/?";
  let code = "";
  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
};

export default function ResultsTable(props) {
  // const { user: currentUser } = useSelector((state) => state.auth);
  const {
    results,
    setResults,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    selected,
    setSelected,
  } = props;

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem(`results`) || '[]');
    setResults(storedResults);
  }, [setResults]);

  const handleRowSelect = (event, index) => {
    if (event.target.checked) {
      setSelected([...selected, index]);
    } else {
      setSelected(selected.filter((i) => i !== index));
    }
  };

  const handleHeaderCheckboxChange = (event) => {
    if (event.target.checked) {
      const indices = sortedResults.map((_, index) => index);
      setSelected(indices);
    } else {
      setSelected([]);
    }
  };

  const handleDeleteButtonClick = () => {
    const remainingResults = results.filter(
      (_, index) => !selected.includes(index)
    );

    const notify = () =>
      toast.success(
        <Typography>
          {results.length - remainingResults.length} Result(s) deleted
          <span
            onClick={undoDelete}
            style={{
              borderRadius: "4px",
              padding: "4px",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.1)",
              marginLeft: "2.2em",
            }}
          >
            Undo
          </span>
        </Typography>
      );

    const undoDelete = () => {
      setResults(results);
      setSelected([]);
      localStorage.setItem(
        `results`,
        JSON.stringify(results)
      );
    };

    setResults(remainingResults);
    setSelected([]);
    localStorage.setItem(
      `results`,
      JSON.stringify(remainingResults)
    );
    notify();
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedResults = results.slice().sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <ToastContainer />
      <Paper sx={{ width: "100%", mb: 2, border: "2px solid black" }}>
        <EnhancedTableToolbar
          selected={selected.length}
          onDelete={handleDeleteButtonClick}
        />
        {!sortedResults.length && (
          <Typography padding={2}>
            No previous results. All of them were deleted.
          </Typography>
        )}
        {sortedResults.length > 0 && (
          <TableContainer
            sx={{
              boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={selected.length === sortedResults.length}
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < sortedResults.length
                      }
                      onChange={handleHeaderCheckboxChange}
                    />
                    <TableSortLabel
                      active={sortField === "date"}
                      direction={sortDirection}
                      onClick={() => handleSort("date")}
                    >
                      Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortField === "score"}
                      direction={sortDirection}
                      onClick={() => handleSort("score")}
                    >
                      Score
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortField === "category"}
                      direction={sortDirection}
                      onClick={() => handleSort("category")}
                    >
                      Category
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedResults
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox
                          checked={selected.includes(index)}
                          onChange={(event) => handleRowSelect(event, index)}
                        />
                        {result.date}
                      </TableCell>
                      <TableCell>{result.score}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Box sx={{ float: "right" }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={2}
                count={sortedResults.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}
