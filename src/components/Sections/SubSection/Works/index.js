/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, TableContainer, Table, TableHead, TableRow,
  TableCell, TableBody, makeStyles
} from '@material-ui/core'
import ContainerBarWorks from 'components/Sections/ContainerBarWorks'

import useFontsStyles from 'theme/fontsDecorators'

import { actions as worksActions } from 'state/ducks/works'

import { useDispatch, useSelector } from 'react-redux'

import { getWorksGroups, getColumnsWorksByWorksId } from 'utils/configQueries'

import useStyles from './styles'

// Éste ejemplo es sólo a modo de prueba, la respuesta de la Api puede ser totalmente diferente

const Columns = ({ id, styles: { bold, tableCell } }) => {
  const dataState = useSelector((state) => state.works.data)
  const [data, setData] = useState(null)
  useEffect(() => {
    const work = dataState.find((type) => type.type === id) || {}
    setData(work.data)
  }, [id, dataState])

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {
              getColumnsWorksByWorksId(id).map((column, idx) => (
                <TableCell key={idx} className={tableCell}>
                  <Typography variant="subtitle2" className={bold}>
                    {column}
                  </Typography>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody styles={{ tableCell }}>
          {
            // Se busca la tabla correspondiente
            data && data.map(
              ({ workData }) => ({ workData })
            // Se mapea cada una de las obras para dicha tabla
            // Por lo tanto se crea una nueva TableRow por cada obra
            ).map(({ workData }, idx) => (
              <TableRow key={idx}>
                {
                  // Se mapean los valores de cada obra para cada columna
                  workData.map(
                    ({ value }, indx) => (
                      <TableCell key={indx} className={tableCell}>{value}</TableCell>
                    )
                  )
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
    <ContainerBarWorks>
      <Box className={classes.boxContainer}>
        {
          getWorksGroups().map(({ id, title }) => (
            <Box className={classes.boxSubContainer} key={id}>
              <Typography variant="subtitle1" className={`${decorators.bold} ${decorators.marginTop_md} ${decorators.marginBottom_ml}`}>
                {title}
              </Typography>
              <Columns id={id} styles={{ ...decorators, ...classes }} />
            </Box>
          ))
        }
      </Box>
    </ContainerBarWorks>
  )
}

Columns.defaultProps = {
  bold: '',
  tableCell: ''
}
Columns.propTypes = {
  id: PropTypes.string.isRequired,
  bold: PropTypes.string,
  tableCell: PropTypes.string,
  styles: PropTypes.objectOf(makeStyles).isRequired
}

export default Works
