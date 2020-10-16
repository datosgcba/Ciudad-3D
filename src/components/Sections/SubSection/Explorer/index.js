import React, { useState } from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, Accordion, AccordionSummary, AccordionDetails, TextField
} from '@material-ui/core'

import Autocomplete from '@material-ui/lab/Autocomplete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'
import GridTwoColumns from 'components/Sections/SubSection/Explorer/GridTwoColumns'
import { List } from 'theme/wrappers'

import { getLayersGroups, getLayersByLayersGroupId, getExplorerOptions } from 'utils/configQueries'

import useStyles from './styles'

const AccordionOptions = ({ id, title, items }) => {
  const accordionItems = new Map([
    ['Altura', List],
    ['Area', List],
    ['Mixtura', List],
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
  const groupLayers = (getLayersGroups().map(({ id, title }) => (
    { id, title }
  )))

  const groupOptions = groupLayers.map(({ id }) => (
    getLayersByLayersGroupId(id)
  ))

  const filtersOptions = []
  groupOptions.forEach((group) => (
    group.forEach((options) => (
      filtersOptions.push(options)
    ))
  ))

  const { options } = getExplorerOptions()
  const [explorerOptions] = useState(options)

  const handleComboChange = () => {
    // TODO: filtrar
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
        onChange={(_, value) => { handleComboChange(value) }}
        options={filtersOptions}
        disableCloseOnSelect
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField {...params} variant="outlined" label="Filtros" placeholder="Capas" />
        )}
      />
      <Box>
        {explorerOptions.map(({ id, title, items }) => (
          <AccordionOptions
            key={id}
            id={id}
            title={title}
            items={items}
          />
        ))}
      </Box>
    </ContainerBar>
  )
}

AccordionOptions.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired
}

export default Explorer
