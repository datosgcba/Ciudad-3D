import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, Accordion, AccordionSummary, AccordionDetails
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'
import GridTwoColumns from 'components/Sections/SubSection/Explorer/GridTwoColumns'
import { List } from 'theme/wrappers'

import config from 'appConfig'

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

  const { options } = config.categorias.find((c) => c.id === 'Explorer')
  return (
    <ContainerBar>
      <Typography variant="h5" className={`${decorators.bold} ${decorators.marginTop_md} ${decorators.marginBottom_xl}`}>
        Explorar
      </Typography>
      <Box>
        {options.map(({ id, title, items }) => (
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
