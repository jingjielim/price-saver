import React, { useState, useEffect, Fragment } from 'react'
import { Table, Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { indexItems, createItem, editItem, deleteItem } from '../../api/items'

import messages from '../AutoDismissAlert/messages'

const Items = props => {
  const [itemsList, setItemsList] = useState(null)
  const [newItem, setNewItem] = useState({ name: '', unit: '' })
  const [editedItem, setEditedItem] = useState({ name: '', unit: '' })
  const [change, setChange] = useState(false)
  const [editId, setEditId] = useState(null)
  const [itemToDelete, setItemToDelete] = useState({ id: '', name: '', unit: '' })
  const [show, setShow] = useState(false)

  useEffect(() => {
    indexItems(props.user)
      .then(res => {
        const { items } = res.data
        const list = items.map(item => {
          if (item.id === editId) {
            return (
              <tr key={item.id}>
                <td>
                  <input
                    autoFocus
                    autoComplete='off'
                    value={editedItem.name}
                    name='name'
                    onChange={handleEditChange}
                    onKeyPress={event => event.key === 'Enter' ? handleEdit(event) : null}
                  />
                </td>
                <td>
                  <input
                    autoComplete='off'
                    value={editedItem.unit}
                    name='unit'
                    onChange={handleEditChange}
                    onKeyPress={event => event.key === 'Enter' ? handleEdit(event) : null}
                  />
                </td>
                <td>
                  <FontAwesomeIcon icon='trash-alt' className='text-danger' onClick={() => handleAskDelete(item.id, item.name)}/>
                </td>
              </tr>
            )
          }
          return (
            <tr key={item.id}>
              <td onClick={() => handleClick(item.id, item.name, item.unit)}>{item.name}</td>
              <td onClick={() => handleClick(item.id, item.name, item.unit)}>{item.unit}</td>
              <td>
                <FontAwesomeIcon icon='trash-alt' className='text-danger' onClick={() => handleAskDelete(item.id, item.name)}/>
              </td>
            </tr>
          )
        })
        setItemsList(list)
      })
      .catch(error => props.msgAlert({
        heading: 'Load Items Failure ' + error.message,
        message: messages.indexItemsFailure,
        variant: 'danger'
      }))
  }, [change, editedItem])

  const handleClick = (id, name, unit) => {
    setEditId(id)
    setEditedItem({ name, unit })
  }

  const handleEditChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    setEditedItem(item => Object.assign({}, item, updatedField))
  }

  const handleEdit = event => {
    editItem(props.user, editedItem, editId)
      .then(res => {
        setEditId(null)
        setChange(state => !state)
        setEditedItem({ name: '', unit: '' })
      })
      .catch(
        console.error
      )
  }

  const handleCreateChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    setNewItem(item => Object.assign({}, item, updatedField))
  }

  const handleCreate = event => {
    createItem(props.user, newItem)
      .then(res => {
        setChange(state => !state)
        setNewItem({ name: '', unit: '' })
      })
      .catch(
        console.error
      )
  }

  const handleAskDelete = (id, name, unit) => {
    setItemToDelete({ id, name, unit })
    setShow(true)
  }

  const handleDelete = () => {
    deleteItem(props.user, itemToDelete.id)
      .then(() => {
        setShow(false)
        setItemToDelete({ id: '', name: '', unit: '' })
        setChange(state => !state)
      })
      .catch(console.error)
  }

  const handleClose = () => setShow(false)

  if (itemsList === null) {
    return (
      <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
    )
  } else {
    return (
      <Fragment>
        <h1>Items list</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <td>Name</td>
              <td>Units</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {itemsList}
            <tr>
              <td>
                <input
                  autoComplete='off'
                  className='border-0 bg-transparent'
                  value={newItem.name}
                  name='name'
                  placeholder='Add New Item Name'
                  onChange={handleCreateChange}
                  onKeyPress={event => event.key === 'Enter' ? handleCreate(event) : null}
                />
              </td>
              <td>
                <input
                  autoComplete='off'
                  className='border-0 bg-transparent'
                  value={newItem.unit}
                  name='unit'
                  placeholder='Add New Item Unit'
                  onChange={handleCreateChange}
                  onKeyPress={event => event.key === 'Enter' ? handleCreate(event) : null}
                />
              </td>
              <td>
                <Button variant='primary' size='sm'>Submit</Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Delete <span className='text-danger'>&apos;{itemToDelete.name}&apos;</span> from list of items?</Modal.Body>
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

export default Items
