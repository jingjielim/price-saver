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
