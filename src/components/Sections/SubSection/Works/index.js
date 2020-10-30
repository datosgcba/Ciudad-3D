/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, TableContainer, Table, TableHead, TableRow,
  TableCell, TableBody, makeStyles
} from '@material-ui/core'
import ContainerBar from 'components/Sections/ContainerBar'

import useFontsStyles from 'theme/fontsDecorators'

import { actions as worksActions } from 'state/ducks/works'

import { useDispatch, useSelector } from 'react-redux'

import { getWorksGroups } from 'utils/configQueries'

import useStyles from './styles'

const GridPanel = ({ id, columns, styles: { bold, tableCell } }) => {
  const data = useSelector((state) => state.works.data[id])

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {
              columns.map(({ label, field }) => (
                <TableCell key={field} className={tableCell}>
                  <Typography variant="subtitle2" className={bold}>
                    {label}
                  </Typography>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody styles={{ tableCell }}>
          {
            // Se mapea cada una de las obras para dicha tabla
            // Por lo tanto se crea una nueva TableRow por cada obra
            data && data.map((row, idx) => (
              <TableRow key={idx}>
                {
                  // Se mapean los valores de cada obra para cada columna
                  columns.map(({ field }) => (
                    <TableCell key={field} className={tableCell}>{row[field]}</TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Works = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  // const data = useSelector((state) => state.works.data)
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.basicData.data.smp)

  useEffect(() => {
    dispatch(worksActions.clickOnParcel(smp))
  }, [dispatch, smp])

  return (
    <ContainerBar
      type="table"
    >
      <Box className={classes.boxContainer}>
        {
          getWorksGroups().map(({ id, title, columns }) => (
            <Box className={classes.boxSubContainer} key={id}>
              <Typography variant="subtitle1" className={`${decorators.bold} ${decorators.marginTop_md} ${decorators.marginBottom_ml}`}>
                {title}
              </Typography>
              <GridPanel id={id} columns={columns} styles={{ ...decorators, ...classes }} />
            </Box>
          ))
        }
      </Box>
    </ContainerBar>
  )
}

GridPanel.defaultProps = {
  bold: '',
  tableCell: ''
}
GridPanel.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  bold: PropTypes.string,
  tableCell: PropTypes.string,
  styles: PropTypes.objectOf(makeStyles).isRequired
}

export default Works
