import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

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
  return order === 'desc'
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
  return stabilizedThis.map(el => el[0]);
}

const EnhancedTableBody = props => {
  const {
    enableSelection,
    order,
    orderBy,
    page,
    rowsPerPage,
    selected,
    setSelected,
    rows,
  } = props;

  const handleClick = (_event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = name => selected.indexOf(name) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableBody>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              aria-checked={isItemSelected}
              hover
              key={row.id}
              onClick={
                enableSelection ? event => handleClick(event, row.id) : null
              }
              role={enableSelection ? 'checkbox' : null}
              selected={isItemSelected}
              tabIndex={-1}
            >
              {enableSelection && (
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </TableCell>
              )}
              {Object.entries(row).map(([key, value]) => {
                const rowKey = `${key}-${row.id}`;

                const numeric = typeof value === 'number';
                const perGame = key.slice(-2) === 'pg';

                if (key !== 'id') {
                  return (
                    <TableCell key={rowKey} align={numeric ? 'right' : 'left'}>
                      {perGame ? value.toFixed(2) : value}
                    </TableCell>
                  );
                }
                return <Fragment key={rowKey} />;
              })}
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

EnhancedTableBody.propTypes = {
  enableSelection: PropTypes.bool,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  rows: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selected: PropTypes.array,
  setSelected: PropTypes.func,
};

EnhancedTableBody.defaultProps = {
  enableSelection: false,
  selected: [],
  setSelected() {},
};

export default EnhancedTableBody;
