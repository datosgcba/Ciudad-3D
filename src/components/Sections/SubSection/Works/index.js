import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Paper, Typography, IconButton,
  TableContainer, Table, TableHead, TableRow,
  TableCell, TableBody, makeStyles
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import Scrollbar from 'react-smooth-scrollbar'

import useFontsStyles from 'theme/fontsDecorators'

import { actions } from 'state/ducks/categories'
import { useDispatch } from 'react-redux'

import { getWorksGroups, getColumnsWorksByWorksId } from 'utils/configQueries'

import useStyles from './styles'

function createData(name, calories, fat, carbs, protein) {
  return {
    name, calories, fat, carbs, protein
  }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

const Data = ({ styles: { tableCell } }) => (
  <TableBody>
    {rows.map((row) => (
      <TableRow key={row.name}>
        <TableCell className={tableCell}>{row.name}</TableCell>
        <TableCell className={tableCell}>{row.calories}</TableCell>
        <TableCell className={tableCell}>{row.fat}</TableCell>
        <TableCell className={tableCell}>{row.carbs}</TableCell>
        <TableCell className={tableCell}>{row.protein}</TableCell>
      </TableRow>
    ))}
  </TableBody>
)

const Columns = ({ id, styles: { bold, tableCell } }) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          {
            getColumnsWorksByWorksId(id).map((column, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableCell key={idx} className={tableCell}>
                <Typography variant="subtitle2" className={bold}>
                  {column}
                </Typography>
              </TableCell>
            ))
          }
        </TableRow>
      </TableHead>
      <Data styles={{ tableCell }} />
    </Table>
  </TableContainer>
)

const Works = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()

  const dispatch = useDispatch()

  return (
    <Box className={classes.box}>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={`${decorators.bold} ${decorators.marginTop_md} ${decorators.marginBottom_ml}`}>
          Información
        </Typography>
        <Box className={classes.subTitle}>
          <Typography variant="h6" className={decorators.bold}>
            <IconButton
              onClick={() => dispatch(actions.sectionBack())}
              className={classes.button}
            >
              <ArrowBackIcon />
            </IconButton>
            Obras
          </Typography>
        </Box>
      </Paper>
      <Scrollbar>
        <Box className={classes.boxContainer}>
          {
            getWorksGroups().map(({ id, title }) => (
              <Box key={id}>
                <Typography variant="subtitle1" className={`${decorators.bold} ${decorators.marginTop_md} ${decorators.marginBottom_ml}`}>
                  {title}
                </Typography>
                <Columns id={id} styles={{ ...decorators, ...classes }} />
              </Box>
            ))
          }
        </Box>
      </Scrollbar>
    </Box>
  )
}

Columns.propTypes = {
  id: PropTypes.string.isRequired,
  bold: PropTypes.string.isRequired,
  tableCell: PropTypes.string.isRequired,
  styles: PropTypes.objectOf(makeStyles).isRequired
}

Data.propTypes = {
  tableCell: PropTypes.string.isRequired,
  styles: PropTypes.objectOf(makeStyles).isRequired
}

export default Works
