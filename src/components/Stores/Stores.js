import React, { useState, useEffect, Fragment } from 'react'
import { Table, Modal, Button, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { indexStores, createStore, editStore, deleteStore } from '../../api/stores'
import messages from '../AutoDismissAlert/messages'

const Stores = props => {
  const [stores, setStores] = useState([])
  const [storesList, setStoresList] = useState(null)
  const [newStore, setNewStore] = useState({ name: '' })
  const [editedStore, setEditedStore] = useState({ name: '' })
  const [change, setChange] = useState(false)
  const [editId, setEditId] = useState(null)
  const [storeToDelete, setStoreToDelete] = useState({ id: '', name: '' })
  const [show, setShow] = useState(false)

  useEffect(() => {
    indexStores(props.user)
      .then(res => {
        const { stores } = res.data
        setStores(stores)
      })
      .catch(error => props.msgAlert({
        heading: 'Load Stores Failure ' + error.message,
        message: messages.indexStoresFailure,
        variant: 'danger'
      }))
  }, [change])

  useEffect(() => {
    const list = stores.map(store => {
      if (store.id === editId) {
        return (
          <tr key={store.id}>
            <td>
              <input
                autoFocus
                autoComplete='off'
                value={editedStore.name}
                name='name'
                onChange={handleEditChange}
                onKeyPress={event => event.key === 'Enter' ? handleEdit(event) : null}
              />
            </td>
            <td>
              <FontAwesomeIcon icon='trash-alt' className='text-danger' onClick={() => handleAskDelete(store.id, store.name)}/>
            </td>
          </tr>
        )
      }
      return (
        <tr key={store.id} >
          <td onClick={() => {
            if (store.editable) {
              handleClick(store.id, store.name)
            }
          }}>{store.name}</td>
          <td>
            {
              store.editable ? <FontAwesomeIcon icon='trash-alt' className='text-danger' onClick={() => handleAskDelete(store.id, store.name)}/> : null
            }
          </td>
        </tr>
      )
    })
    setStoresList(list)
  }, [stores, editedStore])

  const handleClick = (id, name) => {
    setEditId(id)
    setEditedStore({ name })
  }

  const handleEditChange = event => {
    setEditedStore({ name: event.target.value })
  }

  const handleEdit = event => {
    editStore(props.user, editedStore, editId)
      .then(res => {
        setEditId(null)
        setChange(state => !state)
        setEditedStore({ name: '' })
      })
      .catch(error => {
        if (error.response) {
          error = error.response.data
          let message = ''
          for (const key in error) {
            message = message.concat(`${error[key]} `)
          }
          error.message = message
        }
        props.msgAlert({
          heading: 'Edit Store failed with error: ' + error.message,
          message: messages.editStoreFailure,
          variant: 'danger'
        })
      })
  }

  const handleCreateChange = event => {
    setNewStore({ name: event.target.value })
  }

  const handleCreate = event => {
    createStore(props.user, newStore)
      .then(res => {
        setChange(state => !state)
        setNewStore({ name: '' })
      })
      .catch(error => {
        if (error.response) {
          error = error.response.data
          let message = ''
          for (const key in error) {
            message = message.concat(`${error[key]} `)
          }
          error.message = message
        }
        props.msgAlert({
          heading: 'Create Store failed with error: ' + error.message,
          message: messages.createStoreFailure,
          variant: 'danger'
        })
      })
  }

  const handleAskDelete = (id, name) => {
    setStoreToDelete({ id, name })
    setShow(true)
  }

  const handleDelete = () => {
    deleteStore(props.user, storeToDelete.id)
      .then(() => {
        setShow(false)
        setStoreToDelete({ id: '', name: '' })
        setChange(state => !state)
      })
      .catch(error => props.msgAlert({
        heading: 'Delete Store Failed with error: ' + error.message,
        message: messages.deleteStoreFailure,
        variant: 'danger'
      }))
  }

  const handleClose = () => setShow(false)

  if (storesList === null) {
    return (
      <Fragment>
        <h1>Stores list</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <td>Name</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan='2'>
                <Spinner className='my-3 mx-auto d-block' animation="border" variant='primary' role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </td>
            </tr>
          </tbody>
        </Table>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <h1>Stores list</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <td>Name</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {storesList}
            <tr>
              <td>
                <input
                  onFocus={() => {
                    setEditId(null)
                    setEditedStore({ name: '', unit: '' })
                  }}
                  autoComplete='off'
                  className='border-0 bg-transparent'
                  value={newStore.name}
                  name='name'
                  placeholder='Add store'
                  onChange={handleCreateChange}
                  onKeyPress={event => event.key === 'Enter' ? handleCreate(event) : null}
                />
              </td>
              <td>
                <Button onClick={handleCreate} variant='primary' size='sm'>Submit</Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Delete <span className='text-danger'>&apos;{storeToDelete.name}&apos;</span> from list of stores?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    )
  }
}

export default Stores
