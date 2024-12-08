// src/stores/currencyStore.js
import { defineStore } from 'pinia';
import currencyService from '../services/currencyService';

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    baseCurrency: null,
    favoriteCurrencies: [],
    exchangeRates: {},
    pairConversion: null
  }),

  getters: {
    getBaseCurrency() {
      return this.baseCurrency
    },

    getPairConversion() {
      return this.pairConversion?.conversion_rate
    }
  },

  actions: {
    async loadRates() {
      try {
        const allowedCurrencies = ['BYN', 'EUR', 'USD', 'PLN', 'RUB']
        const rates = await currencyService.fetchExchangeRates(this.baseCurrency)
        this.exchangeRates = Object.keys(rates.conversion_rates)
          .filter((currency) => allowedCurrencies.includes(currency))
          .reduce((filteredRates, currency) => {
            filteredRates[currency] = rates.conversion_rates[currency]
            return filteredRates
          }, {})
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error)
      }
    },

    async loadPair(from, to) {
      try {
        const pair = await currencyService.fetchPairConversion(from, to)
        this.pairConversion = pair
      } catch (error) {
        console.error('Failed to fetch pair:', error)
      }
    },

    async setBaseCurrency(currency) {
      this.baseCurrency = currency
      try {
        await this.loadRates()
      } catch (error) {
        console.error('Failed to set base currency:', error)
      }
    },

    toggleFavorite(currency) {
      if (this.favoriteCurrencies.includes(currency)) {
        this.favoriteCurrencies = this.favoriteCurrencies.filter((cur) => cur !== currency)
      } else {
        this.favoriteCurrencies.push(currency)
      }
    },
  },
});
