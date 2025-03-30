import axios from 'axios'
import { createUrl } from './utils'

export async function register(name,email,phone,address,position,company,password) {
    try {
      const url = createUrl('home/sign-up')
      const body = {
        name,email,phone,address,position,company,password
    }
      const response = await axios.post(url, body)
      return response.data
    } catch (ex) {
      return { status: 'error', error: ex }
    }
}

export async function sendContactMessage(name,company,email,phone,message) {
    try {
      const url = createUrl('home/contact-us')
      const body = {
        name,company,email,phone,message
    }
      const response = await axios.post(url, body)
      return response.data
    } catch (ex) {
      return { status: 'error', error: ex }
    }
}

export async function login(email, password) {
    try {
      // create the url
      const url = createUrl('home/login')
  
      // create the request body
      const body = {
        email,
        password,
      }
  
      // call the API
      const response = await axios.post(url, body)
  
      // get the response body
      return response.data
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  }