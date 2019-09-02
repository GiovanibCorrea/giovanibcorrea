import React, { Fragment } from 'react'
import FormContainer from '../containers/FormContainer'
import GridContainer from '../containers/GridContainer'
import { view } from 'react-easy-state'

export default view(() => {
  return (
    <Fragment>
      <FormContainer />
      <GridContainer />
    </Fragment>
  )
})
