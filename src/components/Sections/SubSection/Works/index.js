/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react'

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
import { actions as worksActions } from 'state/ducks/works'

import { useDispatch, useSelector } from 'react-redux'

import { getWorksGroups, getColumnsWorksByWorksId } from 'utils/configQueries'

import useStyles from './styles'

// Éste ejemplo es sólo a modo de prueba, la respuesta de la Api puede ser totalmente diferente
const dataState = [
  {
    type: 'worksStarted',
    data: [
      {
        id: 'Obra100',
        workData: [
          {
            column: 'expte',
            value: '1'
          },
          {
            column: 'date',
            value: '20-10-20'
          },
          {
            column: 'workType',
            value: '---'
          },
          {
            column: 'sup',
            value: '475 m²'
          },
          {
            column: 'dest',
            value: 'Comercio'
          }
        ]
      },
      {
        id: 'Obra200',
        workData: [
          {
            column: 'expte',
            value: '2'
          },
          {
            column: 'date',
            value: '24-10-20'
          },
          {
            column: 'workType',
            value: '---'
          },
          {
            column: 'sup',
            value: '175 m²'
          },
          {
            column: 'dest',
            value: 'Local'
          }
        ]
      }
    ]
  },
  {
    type: 'worksRegisters',
    data: [
      {
        id: 'Obra300',
        workData: [
          {
            column: 'expte',
            value: '3'
          },
          {
            column: 'date',
            value: '24-10-20'
          },
          {
            column: 'workType',
            value: '---'
          },
          {
            column: 'sup',
            value: '80 m²'
          },
          {
            column: 'dest',
            value: 'Vivienda'
          }
        ]
      },
      {
        id: 'Obra200',
        workData: [
          {
            column: 'expte',
            value: '4'
          },
          {
            column: 'date',
            value: '28-10-20'
          },
          {
            column: 'workType',
            value: '---'
          },
          {
            column: 'sup',
            value: '175 m²'
          },
          {
            column: 'dest',
            value: 'Comercio'
          }
        ]
      }
    ]
  },
  {
    type: 'urbanCertificates',
    data: [
      {
        id: 'Obra300',
        workData: [
          {
            column: 'expte',
            value: '5'
          },
          {
            column: 'date',
            value: '24-10-20'
          },
          {
            column: 'workType',
            value: '---'
          },
          {
            column: 'sup',
            value: '80 m²'
          },
          {
            column: 'dest',
            value: 'Vivienda'
          }
        ]
      },
      {
        id: 'Obra200',
        workData: [
          {
            column: 'expte',
            value: '6'
          },
          {
            column: 'date',
            value: '28-10-20'
          },
          {
            column: 'workType',
            value: '---'
          },
          {
            column: 'sup',
            value: '175 m²'
          },
          {
            column: 'dest',
            value: 'Comercio'
          }
        ]
      }
    ]
  }
]

const Columns = ({ id, styles: { bold, tableCell } }) => (
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
          dataState.find(
            (type) => type.type === id
          ).data.map(
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
          Obras
        </Typography>
      </Box>
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
