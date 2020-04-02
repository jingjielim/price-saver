import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexPrices = (user) => {
  return axios({
    url: `${apiUrl}/prices`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const showPrice = (user, id) => {
  return axios({
    url: `${apiUrl}/prices/${id}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const deletePrice = (user, id) => {
  return axios({
    url: `${apiUrl}/prices/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const createPrice = (user, data) => {
  return axios({
    url: `${apiUrl}/prices`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { price: data }
  })
}

export const editPrice = (user, data, id) => {
  return axios({
    url: `${apiUrl}/prices/${id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: { prices: data }
  })
}
