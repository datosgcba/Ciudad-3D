/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, IconButton,
  TableContainer, Table, TableHead, TableRow,
  TableCell, TableBody, makeStyles
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ContainerBarWorks from 'components/Sections/ContainerBarWorks'

import useFontsStyles from 'theme/fontsDecorators'

import { actions as categoriesActions } from 'state/ducks/categories'
import { actions as inspectionActions } from 'state/ducks/inspections'

import { useDispatch, useSelector } from 'react-redux'

import { getInspectionsGroups, getColumnsInspectionsByInspectionsId } from 'utils/configQueries'

import useStyles from './styles'

const Columns = ({ id, styles: { bold, tableCell } }) => {
  const dataState = useSelector((state) => state.inspections.data)
  const [data, setData] = useState(null)
  useEffect(() => {
    const inspection = dataState.find((type) => type.type === id) || {}
    setData(inspection.data)
  }, [id, dataState])

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {
              getColumnsInspectionsByInspectionsId(id).map((column, idx) => (
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
              ({ inspectionData }) => ({ inspectionData })
            // Se mapea cada una de las obras para dicha tabla
            // Por lo tanto se crea una nueva TableRow por cada obra
            ).map(({ inspectionData }, idx) => (
              <TableRow key={idx}>
                {
                  // Se mapean los valores de cada obra para cada columna
                  inspectionData.map(
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

const Inspections = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  // const data = useSelector((state) => state.works.data)
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.basicData.data.smp)

  useEffect(() => {
    dispatch(inspectionActions.clickOnParcel(smp))
  }, [dispatch, smp])

  return (
    <ContainerBarWorks>
      <Typography
        variant="h5"
        className={`${decorators.bold} ${decorators.marginTop_md} ${decorators.marginBottom_xl}`}
      >
        Información
      </Typography>
      <Box className={classes.subTitle}>
        <Typography variant="h6" className={decorators.bold}>
          <IconButton
            onClick={() => dispatch(categoriesActions.sectionBack())}
            className={classes.button}
          >
            <ArrowBackIcon />
          </IconButton>
          Inspecciones
        </Typography>
      </Box>
      <Box className={classes.boxContainer}>
        {
          getInspectionsGroups().map(({ id, title }) => (
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

export default Inspections
