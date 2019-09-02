import React, { Fragment, useState } from 'react'
import { debounce, isEmpty } from 'lodash'
import { DeleteOutline } from '@material-ui/icons'
import { tableIcons } from './utils'
import { Typography } from '@material-ui/core'
import { view } from 'react-easy-state'
import AddBox from '@material-ui/icons/AddBox'
import appStore from '../appStore'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DoneIcon from '@material-ui/icons/Done'
import Fab from '@material-ui/core/Fab'
import MaterialTable from 'material-table'

export default view(props => {
  const [refresh, setRefresh] = useState(false)
  const [open, setOpen] = useState(false)

  const {
    history
  } = props

  const handleButtonClick = () => {
    handleOpenDialog()
  }

  const handleOpenDialog = () => {
    setOpen(true)
  }
  const handleCloseDialog = () => {
    setOpen(false)
  }
  const handleOk = () => {
    appStore.cleanAllCart()
    setTimeout(() => {
      handleCloseDialog()
      history.push('/')
    }, 300)
  }

  return (
    <Fragment>
      <MaterialTable
        icons={tableIcons}
        title="Produtos"
        localization={{
          body: {
            emptyDataSourceMessage: 'Nenhum registro encontrado'
          },
          header:{
            actions: ''
          },
          toolbar: {
            searchPlaceholder: 'Buscar'
          },
          pagination: {
            labelRowsSelect: 'por página',
            labelDisplayedRows: '{from}-{to} de {count}'
          }
        }}
        columns={[
          { title: 'Produto', field: 'name', editable: 'never' },
          { title: 'Descrição', field: 'description', editable: 'never' },
          { title: 'Preço', field: 'price', type: 'currency', editable: 'never' },
          { title: 'Quantidade', field: 'quantity', type: 'numeric'}
        ]}
        data={appStore.cart}
        options={{
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: () => <AddBox />,
            tooltip: 'Adicionar',
            onClick: debounce((event, rowData) => {
              appStore.addToCart(rowData)
              setRefresh(!refresh)
            })
          },
          {
            icon: () => <DeleteOutline />,
            tooltip: 'Remover',
            onClick: debounce((event, rowData) => {
              appStore.removeFromCart(rowData)
              setRefresh(!refresh)
              if(isEmpty(appStore.cart)){
                history.push('/')
              }

            }, 200)
          }
        ]}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse'
        }}
      >
        <Fab
          variant="extended"
          size="large"
          color="primary"
          aria-label="add"
          style={{
            marginTop: 10
          }}
          onClick={ handleButtonClick }
        >
          Finalizar Compra
          <DoneIcon />
        </Fab>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="xs"
          aria-labelledby="confirmation-dialog-title"
          open={open}
        >
          <DialogTitle>
            Seu pedido foi realizado com sucesso.
          </DialogTitle>
          <DialogContent>
            <Typography>Você será redirecionado para a páginal inicial.</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleOk} color="primary">
              Ok
            </Button>
            {/*<Button onClick={handleCancel} color="primary">*/}
            {/*  Cancelar*/}
            {/*</Button>*/}
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  )
})
