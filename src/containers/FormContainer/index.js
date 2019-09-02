import React, { useEffect, useState } from 'react'
import { get, map } from 'lodash'
import { view } from 'react-easy-state'
import appStore from '../../appStore'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import makeStyles from '@material-ui/core/styles/makeStyles'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export default view(() => {
  const classes = useStyles()

  const [values, setValues] = useState({
    id: '',
    categoryId: ''
  })

  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  useEffect(() => {
    appStore.setSelectedCategory(get(values, 'categoryId'))
  }, [values])

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }))
  }

  const items = map(appStore.categories, (item, index) => {
    return (
      <MenuItem
        key={ index }
        value={ item.id }
      >
        <Typography variant="subtitle1">
          <em>{ item.name }</em>
        </Typography>
      </MenuItem>
    )
  })

  return (
    <Grid
      container
      component="div"
      alignContent="flex-start"
    >
      <form autoComplete="off">
        <FormControl
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel
            ref={inputLabel}
            htmlFor="category"
          >
            <Typography>Categoria</Typography>
          </InputLabel>
          
          <Select
            value={values.categoryId}
            onChange={handleChange}
            input={
              <OutlinedInput
                labelWidth={labelWidth}
                name="categoryId"
                id="category"
              />
            }
          >
            { items }
          </Select>
        </FormControl>
      </form>
    </Grid>
  )
})
