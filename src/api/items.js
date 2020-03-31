import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexItems = (user) => {
  return axios({
    url: `${apiUrl}/items`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const showItem = (user, id) => {
  return axios({
    url: `${apiUrl}/items/${id}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const deleteItem = (user, id) => {
  return axios({
    url: `${apiUrl}/items/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const createItem = (user, data) => {
  return axios({
    url: `${apiUrl}/items`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { item: data }
  })
}

export const editItem = (user, data, id) => {
  return axios({
    url: `${apiUrl}/items/${id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { item: data }
  })
}
