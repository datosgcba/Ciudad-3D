import React, { useState, useEffect } from 'react'

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
import { actions as actionsMap } from 'state/ducks/map'

import { useDispatch, useSelector } from 'react-redux'

import { getExplorerOptions, getExplorerFilters } from 'utils/configQueries'

import useStyles from './styles'

const AccordionOptions = ({
  id, idExplorer, title, items
}) => {
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
          idGroup={id}
          idExplorer={idExplorer}
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

  const value = useSelector((state) => state.explorer.autoCompleteValue)

  // Se eliminan los valores repetidos por tener el mismo filtro
  const categories = []
  const auxObj = {}
  const explorerOptions = value.map(({ filterId }) => getExplorerOptions(filterId))
  explorerOptions.forEach((arrayOpt) => {
    if (!(arrayOpt[0].id in auxObj)) {
      auxObj[arrayOpt[0].id] = true
      categories.push(arrayOpt)
    }
  })

  // Filtros
  const [filters, setFilters] = useState([])
  const [focusFilter, setFocusFilter] = useState(false)

  useEffect(() => {
  }, [dispatch])

  useEffect(() => {
    if (value.length > 1) {
      dispatch(actionsMap.removeLayer({ idLayer: 'explorer_layer' }))
      dispatch(actions.selectedValue([value[value.length - 1]]))
      return
    }
    if (value.length > 0) {
      dispatch(actionsMap.selectedExplorerFilter({ value }))
    } else {
      dispatch(actionsMap.removeLayer({ idLayer: 'explorer_layer' }))
    }

    dispatch(actions.refreshFilterRequest({ idLayer: 'explorer_layer' }))
    setFilters(getExplorerFilters().filter((f) => !value || !value.map((v) => v.id).includes(f.id)))
  }, [value, dispatch])

  const handleComboChange = (_, nextValue) => {
    dispatch(actions.selectedValue(nextValue))
  }

  return (
    <ContainerBar
      type="list"
    >
      <Autocomplete
        className={classes.combo}
        multiple
        limitTags={3}
        options={filters}
        value={value}
        onOpen={() => setFocusFilter(true)}
        onClose={() => setFocusFilter(false)}
        getOptionLabel={(option) => option.title}
        onChange={handleComboChange}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField {...params} variant="outlined" label="Filtros" placeholder="Capa" />
        )}
      />
      {
        value.length === 0 && (
          <Box className={classes.unFiltered}>
            <Typography variant="h6" className={decorators.bold}>
              Seleccione un filtro
            </Typography>
          </Box>
        )
      }
      {
        !focusFilter && categories
          .map((cat) => cat.map(({ title, id: idExplorer, options }) => (
            <Box key={idExplorer}>
              <Typography variant="body2" className={`${decorators.marginTop_xl} ${decorators.marginBottom_ml}`}>
                {title}
              </Typography>
              {
                options.map(({ id: idx, title: t, items }) => (
                  <AccordionOptions
                    key={idx}
                    id={idx}
                    idExplorer={idExplorer}
                    title={t}
                    items={items}
                  />
                ))
              }
            </Box>
          )))
      }
    </ContainerBar>
  )
}

AccordionOptions.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  idExplorer: PropTypes.string.isRequired
}

export default Explorer
