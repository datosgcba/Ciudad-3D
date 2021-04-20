import React, { useState } from 'react'

import {
  Typography, Divider, Box, Paper, CardActionArea
} from '@material-ui/core'

import fontsDecorators from 'theme/fontsDecorators'

const variants = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'caption',
  'button',
  'overline']

const testText = 'BCDFG bcdfg aeiou AEIOU áéíóú ñ Ñ 123567890'

export default () => {
  const classes = fontsDecorators()
  const decorators = Object.keys(classes)

  const [variantSelected, setVariantSelected] = useState('body1')
  const [decoratorSelected, setDecoratorSelected] = useState('bold')
  return (
    <Paper>
      <Box style={{ backgroundColor: 'lightyellow' }}>
        <Typography variant="subtitle1">
          Testing:
          {variantSelected}
        </Typography>
        <Typography variant={variantSelected}>{testText}</Typography>
        <Typography variant="subtitle1">
          Decorator:
          {decoratorSelected}
        </Typography>
        <Typography
          variant={variantSelected}
          className={classes[decoratorSelected]}
        >
          {testText}
        </Typography>
      </Box>
      {
        variants.map((variant) => (
          <CardActionArea
            key={variant}
            onClick={() => setVariantSelected(variant)}
            style={{ backgroundColor: variantSelected === variant ? 'lightblue' : 'white' }}
          >
            <Typography variant={variant}>{variant}</Typography>
            <Divider />
          </CardActionArea>
        ))
      }
      {
        decorators.map((decorator) => (
          <CardActionArea
            key={decorator}
            onClick={() => setDecoratorSelected(decorator)}
            style={{ backgroundColor: decoratorSelected === decorator ? 'lightgreen' : 'lightyellow' }}
          >
            <Typography variant="body1" className={classes[decorator]}>{decorator}</Typography>
            <Divider />
          </CardActionArea>
        ))
      }
    </Paper>
  )
}
