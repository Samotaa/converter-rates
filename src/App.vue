<script setup>
import { useCurrencyStore } from './store/currencyStore.js'
import { onMounted } from 'vue'

const store = useCurrencyStore()

onMounted(async () => {
  let baseCurrency = localStorage.getItem("baseCurrency")
  baseCurrency = baseCurrency ? baseCurrency : 'BYN'
  await store.setBaseCurrency(baseCurrency).then(() => {
    localStorage.setItem("baseCurrency", baseCurrency)
  }).catch((error) => {
    console.error(error)
  })
})
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
