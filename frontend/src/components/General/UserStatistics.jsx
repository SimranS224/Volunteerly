import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width:400
  },
});

export default function DenseTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table  >
        <TableHead>
          <TableRow>
            <TableCell align="left"><b>Statistics</b></TableCell>
            <TableCell align="center"><b>Results</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map(row => (
            <TableRow key={row.name}>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="center">{row.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
