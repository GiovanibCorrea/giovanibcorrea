import React, { Fragment, useRef, useState } from 'react'
import { filter } from 'lodash'
import { tableIcons } from '../../feat/utils'
import { view } from 'react-easy-state'
import AddBox from '@material-ui/icons/AddBox'
import appStore from '../../appStore'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import MaterialTable from 'material-table'
import Snackbar from '@material-ui/core/Snackbar'

export default view(() => {
  const queueRef = useRef([])
  const [open, setOpen] = useState(false)
  const [messageInfo, setMessageInfo] = useState(undefined)

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift());
      setOpen(true)
    }
  }

  const openSnackBar = message => {
    queueRef.current.push({
      message,
      key: new Date().getTime(),
    })

    if (open) {
      setOpen(false)
    } 
    else {
      processQueue()
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleExited = () => {
    processQueue()
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
          { title: 'Produto', field: 'name' },
          { title: 'Descrição', field: 'description' },
          { title: 'Preço', field: 'price', type: 'currency' }
        ]}
        data={filter(appStore.products, item => {
          if(appStore.selectedCategory > 0){
            return item.idCategory === appStore.selectedCategory
          }
          return item

        })}
        options={{
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: () => <AddBox />,
            tooltip: 'Adicionar ao carrinho.',
            onClick: (event, rowData) => {
              appStore.addToCart(rowData)
              openSnackBar(rowData.description)
            }
          }
        ]}
      />
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <span
            id="message-id"
          >
            { messageInfo ? `${messageInfo.message} adicionado ao carrinho de compras` : undefined }
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Fragment>

  )
})
