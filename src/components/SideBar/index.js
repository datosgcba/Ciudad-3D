import React from 'react'
import { useDispatch } from 'react-redux'

import { Drawer, makeStyles, Button } from '@material-ui/core'

import { actions } from 'state/ducks/tour'

import Categories from 'components/Categories/Categories'
import Logo from 'components/Logo/Logo'
import { getCategories } from 'utils/configQueries'

const data = getCategories()
const useStyles = makeStyles((theme) => ({
  sideBarPaper: {
    width: theme.spacing(9.75),
    background: theme.palette.secondary.main
  },
  logo: {
    marginTop: theme.spacing(1)
  }
}))

const ConnectedPanel = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  return (
    <Drawer
      variant="persistent"
      open
      PaperProps={{ elevation: 8, className: classes.sideBarPaper }}
    >
      <div className={classes.logo}>
        <Logo />
      </div>
      <Categories data={data} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(actions.isVisibleTour(true))}
      >
        Tour
      </Button>
    </Drawer>
  )
}

export default ConnectedPanel
