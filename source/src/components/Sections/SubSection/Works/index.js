import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  IconButton
} from '@material-ui/core'

import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

import ContainerBar from 'components/Sections/ContainerBar'
import CustomTooltip from 'theme/wrappers/CustomTooltip'
import SelectParcel from 'components/Sections/SubSection/SelectParcel'

import useFontsStyles from 'theme/fontsDecorators'

import { actions as worksActions } from 'state/ducks/works'

import { useDispatch, useSelector } from 'react-redux'

import { getWorksGroups } from 'utils/configQueries'

import useStyles from './styles'

const GridPanel = ({ columns, tableData, styles: { bold, tableCell } }) => {
  return (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column} className={tableCell}>
                    <Typography variant="subtitle2" className={bold}>
                      {column}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody styles={{ tableCell }}>
              {
                // Se mapea cada una de las obras para dicha tabla
                // Se mapea cada una de las obras para dicha tabla
                tableData.map((row) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TableRow>
                    {
                      // Se mapean los valores de cada obra para cada columna
                      columns.map((column, idx) => (
                        <TableCell key={column} className={tableCell}>
                          {row[idx]}
                        </TableCell>
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
  const data = useSelector((state) => state.works.data)
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.parcel.smp)

  useEffect(() => {
    dispatch(worksActions.clickOnParcel(smp))
  }, [dispatch, smp])

  return (
    <ContainerBar type="table">
      <Box className={classes.boxContainer}>
        {
          data?.sade?.length >= 1 &&
          data?.sade?.map(({ title, columns, dataTable }) => (
            <Box className={classes.boxSubContainer} key={title}>
              <Box className={classes.title}>
                <Typography
                  variant="subtitle1"
                  className={`${decorators.bold} ${decorators.marginBottom_ml}`}
                >
                  {title}
                </Typography>
              </Box>
              <GridPanel
                columns={columns}
                tableData={dataTable}
                styles={{ ...decorators, ...classes }}
              />
            </Box>
          ))
        }
        {!smp && <SelectParcel />}
        {smp && !data?.sade?.length && (
            <TableContainer>
              <Typography>No posee</Typography>
            </TableContainer>
          )
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  styles: PropTypes.objectOf(makeStyles).isRequired
}

export default Works
