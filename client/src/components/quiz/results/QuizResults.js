import React, { useState } from 'react';
import { Stack } from '@mui/material';
import LineGraph from './Graph';
import ResultsTable from './ResultsTable';
import { useSelector } from 'react-redux';

export default function QuizResults() {
  const [results, setResults] = useState([]);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  // const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <Stack spacing={1}>
      <ResultsTable
        results={results}
        setResults={setResults}
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        selected={selected}
        setSelected={setSelected}
      />
      {/* {currentUser && ( */}
        <LineGraph results={results} />
      {/* )} */}
    </Stack>
  );
};
