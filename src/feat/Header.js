import React, { Fragment } from 'react'
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks'
import { bindHover } from 'material-ui-popup-state/es/core'
import { Clear } from '@material-ui/icons'
import { forEach, isEmpty, map } from 'lodash'
import { Link } from 'react-router-dom'
import { ListItemText, makeStyles } from '@material-ui/core'
import { view } from 'react-easy-state'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AppBar from '@material-ui/core/AppBar/AppBar'
import appStore from '../appStore'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge/Badge'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Paper from '@material-ui/core/Paper'
import Popover from '@material-ui/core/Popover'
import Toolbar from '@material-ui/core/Toolbar'
import Timer from 'react-compound-timer'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  cartButton: {
    marginRight: 2
  },
  
  toolbar: {
    flexDirection: 'row-reverse',
    background: '#33A2FF'
  },
  
  container: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  
  cartList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}))

const StyledBadge = withStyles(theme => ({
  badge: {
    top: '50%',
    right: -3,
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
}))(Badge)

export default view(props => {
  const classes = useStyles()
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoPopover',
  })

  const items = map(appStore.cart, (item, index) => {
    return (
      <ListItem key={ index }>
        <ListItemAvatar>
          <Avatar>
            <ShoppingCartIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={ `${item.quantity} ${item.name}`} secondary={ `R$ ${item.price}` } />
      </ListItem>
    )
  })

  let badgeCount = 0

  forEach(appStore.cart, item => {
    badgeCount = badgeCount + item.quantity
  })

  if(appStore.counter < 0){
    setTimeout(() => {
      appStore.stopCounter()
    }, 200)
  }

  return (
    <Fragment>
      <AppBar color="default">
        <Toolbar className={ classes.toolbar }>
          <IconButton
            edge="start"
            aria-label="menu"
            className={ classes.cartButton }
            {...bindTrigger(popupState)}
            {...bindHover(popupState)}
          >
            <StyledBadge
              badgeContent={ badgeCount }
              color="primary"
            >
              <ShoppingCartIcon color="primary"/>
            </StyledBadge>
          </IconButton>

          <Timer
            initialTime={900000}
            startImmediately={false}
            direction="backward"
            onStop={() => appStore.cleanAllCart()}
          >
            {({ start, stop, getTimerState, getTime }) => {
              appStore.startCounter = start
              appStore.stopCounter = stop
              appStore.counter = getTime()
              appStore.counterState = getTimerState()

              return (
                <React.Fragment>
                  <div
                    style={{
                      marginRight: 50
                    }}
                    hidden={ getTimerState().localeCompare('PLAYING')}
                  >
                    <Timer.Minutes /> minutos 

                    <Timer.Seconds /> segundos
                  </div>
                </React.Fragment>
              )
            }}
          </Timer>
          
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {
              !isEmpty(items) ? (
                  <List className={ classes.cartList } >
                    { items }
                  </List>
                ) : (
                  <Paper
                    style={{
                      minWidth: 200,
                      minHeight: 200
                    }}
                  >
                    <Typography align="center">
                      Seu carrinho está vazio
                    </Typography>
                  </Paper>
                )
            }
            {
              !isEmpty(items) ? (
                <Grid
                  container
                >
                  <Link to="/checkout" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="contained"
                      color="default"
                    >
                      <span>Finalizar</span>
                    </Button>
                  </Link>

                  <Button variant="outlined" onClick={ appStore.cleanAllCart }>
                    Limpar Carrinho
                    <Clear />
                  </Button>

                </Grid>

              ) : (
                <Grid></Grid>
              )
            }
          </Popover>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  )
})
