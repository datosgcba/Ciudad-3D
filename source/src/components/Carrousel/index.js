import React, { useEffect } from 'react'
import {
  Box, Typography, Button, makeStyles, useTheme
} from '@material-ui/core'
import MobileStepper from '@material-ui/core/MobileStepper'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%'
  }
}))

const Carrousel = ({ photos = [] }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = photos.length

  useEffect(() => {
    setActiveStep(0)
  }, [photos])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  return (
    <div className={classes.root}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {photos.map((step, index) => (
          <Box key={step.fecha}>
            <Box style={{
              position: 'absolute',
              top: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              width: '100%',
              padding: 5
            }}
            >
              <Typography color="textSecondary">{photos[activeStep]?.fecha}</Typography>
            </Box>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.photo} alt={step.fecha} />
            ) : null}
          </Box>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={(
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Siguiente
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        )}
        backButton={(
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Anterior
          </Button>
        )}
      />
    </div>
  )
}

export default Carrousel
