import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableBody from './EnhancedTableBody';
import EnhancedTableToolbar from './EnhancedTableToolbar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const EnhancedTable = props => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const {
    defaultOrder,
    defaultOrderBy,
    enablePagination,
    enableSelection,
    headCells,
    rows,
    tableTitle,
  } = props;

  useEffect(() => {
    if (defaultOrder) {
      setOrder(defaultOrder);
    }
    if (defaultOrderBy) {
      setOrderBy(defaultOrderBy);
    }
  }, [defaultOrder, defaultOrderBy]);

  const classes = useStyles();

  const handleRequestSort = (_event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowCount = rows.length;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          tableTitle={tableTitle}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowCount}
            />
            <EnhancedTableBody
              enableSelection={enableSelection}
              order={order}
              orderBy={orderBy}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={selected}
              setSelected={setSelected}
              rows={rows}
            />
          </Table>
        </TableContainer>
        {enablePagination && (
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={rowCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </div>
  );
};

EnhancedTable.propTypes = {
  defaultOrder: PropTypes.string,
  defaultOrderBy: PropTypes.string,
  enablePagination: PropTypes.bool,
  enableSelection: PropTypes.bool,
  headCells: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  tableTitle: PropTypes.string,
};

EnhancedTable.defaultProps = {
  defaultOrder: null,
  defaultOrderBy: null,
  enablePagination: false,
  enableSelection: false,
  tableTitle: null,
};

export default EnhancedTable;
