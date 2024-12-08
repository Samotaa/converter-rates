import axios from 'axios'

const API_URL = `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_API_URL}`

export default {

    async fetchExchangeRates(baseCurrency) {
        try {
            const { data } = await axios.get(`${API_URL}/latest/${baseCurrency}`)
            return data
        } catch (error) {
            console.error('Error fetching exchange rates:', error)
            throw error
        }
    },

    async fetchPairConversion(from, to) {
        try {
            const { data } = await axios.get(`${API_URL}/pair/${from}/${to}`)
            return data
        } catch (error) {
            console.error('Error fetching exchange rates:', error)
            throw error
        }
    }
}


