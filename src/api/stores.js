import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexStores = (user) => {
  return axios({
    url: `${apiUrl}/stores`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const showStore = (user, id) => {
  return axios({
    url: `${apiUrl}/stores/${id}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const deleteStore = (user, id) => {
  return axios({
    url: `${apiUrl}/stores/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const createStore = (user, data) => {
  return axios({
    url: `${apiUrl}/stores`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { store: data }
  })
}

export const editStore = (user, data, id) => {
  return axios({
    url: `${apiUrl}/stores/${id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { store: data }
  })
}
