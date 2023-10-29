import React from 'react';
import { alpha } from '@mui/material/styles'
import {
  Typography,
  Toolbar,
  Tooltip,
  IconButton
} from '@mui/material';
import { Delete, FilterList } from '@mui/icons-material';

export default function EnhancedTableToolbar(props) {
  const { selected, onDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        py: 2,
        bgcolor: 'secondary.main',
        borderRadius: '2px',
        ...(selected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {selected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Previous Results
        </Typography>
      )}

      {selected > 0 ? (
        <Tooltip arrow title="Delete">
          <IconButton onClick={onDelete}>
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip arrow title="Filter list">
          <IconButton color='primary'>
            <FilterList />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}