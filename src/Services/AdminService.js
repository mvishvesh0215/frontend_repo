import axios from 'axios'
import { createUrl } from './utils'

function getAuthHeaders() {
    const token = sessionStorage.getItem('token'); // Ensure token is stored
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

export async function getPendingOrders(){
    try {
        const url = createUrl('admin/pending-orders')
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

export async function getCompletedOrders(){
    try {
        const url = createUrl('admin/completed-orders')
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
export async function getCancelledOrder(){
    try {
        const url = createUrl('admin/cancelled-orders')
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
export async function getRequestedQuotations(){
    try {
        const url = createUrl('admin/requested-quotation')
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

export async function updateOrderStatus(orderId,orderStatus,orderDetails){
    try{
        const url = createUrl('admin/update-order-status/'+orderId)
        const body={
            orderStatus,orderDetails
        }
    const response=axios.post(url,body,{ headers: getAuthHeaders() })
    return (await response).data
    }catch (ex) {
        return { status: 'error', error: ex }
        }
}
export async function updateQuotationStatus(quotationId, quotationStatus){
    try{
        const url = createUrl('admin/update-quotation-status/'+quotationId)
        const body={
            quotationStatus
        }
    const response=axios.put(url,body,{ headers: getAuthHeaders() })
    return (await response).data
    }catch (ex) {
        return { status: 'error', error: ex }
        }
}

export async function getCustomerStats(){
    try {
        const url = createUrl('admin/customers-analytics')
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

export async function getOrderStats(){
    try {
        const url = createUrl('admin/orders-analytics')
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