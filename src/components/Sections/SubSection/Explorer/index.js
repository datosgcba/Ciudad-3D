import React from 'react'

import {
  Box, Typography, Accordion, AccordionSummary, AccordionDetails
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'
import GridTwoColumns from 'components/Sections/SubSection/Explorer/GridTwoColumns'

import config from 'appConfig'

const Explorer = () => {
  const decorators = useFontsStyles()

  const accordionItems = new Map([
    ['Altura', GridTwoColumns],
    ['Area', GridTwoColumns],
    ['Mixtura', GridTwoColumns],
    ['Barrio', GridTwoColumns]
  ])

  const { options } = config.categorias.find((c) => c.id === 'Explorer')
  return (
    <ContainerBar>
      <Typography variant="h5" className={`${decorators.marginTop_md} ${decorators.marginBottom_xl}`}>
        Explorar
      </Typography>
      <Box>
        {
          options.map(({ id, title, items }) => {
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
          })
        }
      </Box>
    </ContainerBar>
  )
}

export default Explorer
