import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, Accordion, AccordionSummary, AccordionDetails, TextField
} from '@material-ui/core'

import Autocomplete from '@material-ui/lab/Autocomplete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'

import { List, GridTwoColumns } from 'theme/wrappers'

import { actions } from 'state/ducks/explorer'

import { useDispatch, useSelector } from 'react-redux'

import { getExplorerOptions, getExplorerFilters } from 'utils/configQueries'

import useStyles from './styles'

const AccordionOptions = ({ id, title, items }) => {
  const accordionItems = new Map([
    ['Altura', List],
    ['Area', List],
    ['Mixtura', List],
    ['Incidence', List],
    ['Aliquot', List],
    ['Barrio', GridTwoColumns]
  ])
  const AccordionItem = accordionItems.get(id)

  return (
    <Accordion elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <AccordionItem
          items={items}
        />
      </AccordionDetails>
    </Accordion>
  )
}
const Explorer = () => {
  const decorators = useFontsStyles()
  const classes = useStyles()
  const dispatch = useDispatch()

  const filterHeighOptions = useSelector((state) => state.explorer.filterHeighOptions)
  const filterIncidenceOptions = useSelector((state) => state.explorer.filterIncidenceOptions)
  const value = useSelector((state) => state.explorer.autoCompleteValue)

  // Filtros
  const filters = getExplorerFilters()

  const handleComboChange = (nextValue) => {
    dispatch(actions.selectedValue(nextValue))
    const showHeight = !!nextValue.find((c) => c.id === 'Height')
    const showIncidence = !!nextValue.find((c) => c.id === 'Incidence' || c.id === 'Aliquot')

    // TODO: habilitar eslint sin perder funcionalidad
    // eslint-disable-next-line no-unused-expressions
    showHeight
      ? dispatch(actions.filterHeighOptions(true))
      : dispatch(actions.filterHeighOptions(false))

    // eslint-disable-next-line no-unused-expressions
    showIncidence
      ? dispatch(actions.filterIncidenceOptions(true))
      : dispatch(actions.filterIncidenceOptions(false))
  }

  return (
    <ContainerBar>
      <Typography variant="h5" className={`${decorators.bold} ${decorators.marginTop_md} ${decorators.marginBottom_xl}`}>
        Explorar
      </Typography>
      <Autocomplete
        className={classes.combo}
        multiple
        limitTags={3}
        options={filters}
        value={value}
        disableCloseOnSelect
        filterSelectedOptions
        getOptionLabel={(option) => option.title}
        onChange={(_, nextValue) => handleComboChange(nextValue)}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField {...params} variant="outlined" label="Filtros" placeholder="Capas" />
        )}
      />
      {
        !filterHeighOptions && !filterIncidenceOptions && (
          <Box className={classes.unFiltered}>
            <Typography variant="h6" className={decorators.bold}>
              Seleccione un filtro
            </Typography>
          </Box>
        )
      }
      {
        filterHeighOptions && (
          <Box>
            <Typography variant="body2" className={`${decorators.marginTop_xl} ${decorators.marginBottom_ml}`}>
              Alturas Código Urbanístico
            </Typography>
            {
              getExplorerOptions('Height').map(({ id, title, items }) => (
                <AccordionOptions
                  key={id}
                  id={id}
                  title={title}
                  items={items}
                />
              ))
            }
          </Box>
        )
      }
      {
        filterIncidenceOptions && (
          <Box>
            <Typography variant="body2" className={`${decorators.marginTop_xl} ${decorators.marginBottom_ml}`}>
              Incidencia Ley 6.062, Alícuotas Ley 6.062
            </Typography>
            {
              getExplorerOptions('Incidence').map(({ id, title, items }) => (
                <AccordionOptions
                  key={id}
                  id={id}
                  title={title}
                  items={items}
                />
              ))
            }
          </Box>
        )
      }
    </ContainerBar>
  )
}

AccordionOptions.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired
}

export default Explorer
