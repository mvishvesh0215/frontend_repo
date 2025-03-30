import axios from 'axios'
import { createUrl } from './utils'

function getAuthHeaders() {
    const token = sessionStorage.getItem('token'); // Get token from session storage

    const headers = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true' // ✅ Automatically included
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`; // ✅ Add only if token exists
    }

    return headers;
}

export async function getCurrentOrder(userId){
    try{
    const url = createUrl('customer/current-order/'+userId)
    const response=await axios.get(url, { headers: getAuthHeaders() })
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
    }
}
export async function OrderNow(userId,paperType,layers,quantity,dimensions){
    try{
        const url = createUrl('customer/order-now/'+userId)
        const body={
            paperType,layers,quantity,dimensions
        }
    const response=axios.post(url,body,{ headers: getAuthHeaders() })
    return (await response).data
    }catch (ex) {
        return { status: 'error', error: ex }
        }
}

export async function getOrders(userId){
    try {
        const url = createUrl('customer/all-orders/'+userId)
        const response = await axios.get(url, { headers: getAuthHeaders() });
        // Ensure response is an array before using `.filter()`
        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            console.error('Unexpected response format:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
}

export async function getProfile(userId){
    try{
    const url = createUrl('customer/profile/'+userId)
    const response=await axios.get(url, { headers: getAuthHeaders() })
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
    }
}

export async function requestQuotation(userId,paperType,layers,quantity,dimensions,message){
    try{
        const url = createUrl('customer/request-quotation/'+userId)
        const body={
            paperType,layers,quantity,dimensions,message
        }
    const response=axios.post(url,body,{ headers: getAuthHeaders() })
    return (await response).data
    }catch (ex) {
        return { status: 'error', error: ex }
        }
}

export async function updateProfile(userId,name,email,phone,position,company,address,password){
    try{
        const url = createUrl('customer/update-profile/'+userId)
        const body={
            name,email,phone,position,company,address,password
        }
    const response=axios.post(url,body,{ headers: getAuthHeaders() })
    return (await response).data
    }catch (ex) {
        return { status: 'error', error: ex }
        }
}

export async function getPendingOrder(userId){
    try{
        const url = createUrl('customer/pending-orders/'+userId)
        const response=await axios.get(url, { headers: getAuthHeaders() })
        return response.data
    } catch (ex) {
        return { status: 'error', error: ex }
    }
}

export async function requestOrderCancellation(userId,orderId, message){
    try{
        const url = createUrl('customer/request-order-cancellation/'+userId)
        const body={
            orderId, message
        }
    const response=axios.post(url,body,{ headers: getAuthHeaders() })
    return (await response).data
    }catch (ex) {
        return { status: 'error', error: ex }
        }
}