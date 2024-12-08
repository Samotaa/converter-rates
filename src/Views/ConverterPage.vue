<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import CurrencyInput from '../components/CurrencyInput.vue'
import DropdownMenu from '../components/DropdownMenu.vue'
import NavBar from '../components/NavBar.vue'
import { useCurrencyStore } from '../store/currencyStore'
import { getFlagClass } from '../composables/flags'
import { icons } from '../icons/icons'

const store = useCurrencyStore()
const amount = ref(1)
const fromCurrency = ref(null)
const toCurrency = ref('USD')
const result = ref(null)
const loading = ref(true)
const swap = ref(true)

onMounted(() => {
    let baseCurrency = localStorage.getItem("baseCurrency")
    fromCurrency.value = baseCurrency ? baseCurrency : 'BYN'
})

watch(fromCurrency, async (newCurrency, oldCurrency) => {
    if (newCurrency !== oldCurrency && swap.value) {
        loading.value = true
        await store.loadPair(fromCurrency.value, toCurrency.value).then(() => {
            calculateResult()
            loading.value = false
        }).catch((error) => {
            loading.value = false
            console.error('Failed to fetch pair', error)
            throw error
        })
    }
})

watch(toCurrency, async (newCurrency, oldCurrency) => {
    if (newCurrency !== oldCurrency && swap.value) {
        loading.value = true
        await store.loadPair(fromCurrency.value, toCurrency.value).then(() => {
            calculateResult()
            loading.value = false
        }).catch((error) => {
            loading.value = false
            console.error('Failed to fetch pair', error)
            throw error
        })
    }
})

const currencies = computed(() => Object.keys(store.exchangeRates))

function calculateResult() {
    const rate = store.getPairConversion
    result.value = rate ? amount.value * rate : null
}

function calculateAmount() {
    const rate = store.getPairConversion
    amount.value = rate ? result.value / rate : null
}

async function swapPlaces() {
    loading.value = true
    swap.value = false
    await store.loadPair(toCurrency.value, fromCurrency.value).then(() => {
        loading.value = false
        let temp = toCurrency.value
        toCurrency.value = fromCurrency.value
        fromCurrency.value = temp
        calculateResult()
    }).catch((error) => {
        loading.value = false
        console.error('Failed to swap', error)
        throw error
    })
    swap.value = true
}

</script>

<template>
    <div class="h-screen">
        <NavBar />
        <div
            class="flex flex-col lg:flex-row justify-center lg:justify-center gap-10 w-full items-center text-[16px] md:text-[18px] lg:text-[30px] h-full drop-shadow px-[20px]">
            <div
                class="text-[white] flex flex-col max-w-[800px] justify-center items-center text-center lg:text-left lg:items-start gap-2 pr-[20px]">
                <p class="text-[12px] md:text-[14px] lg:text-[16px] font-medium text-[#a5a5a5]">
                    Live exchange rates at your fingertips
                </p>
                <div class="flex flex-col">
                    <p class="text-4xl md:text-5xl lg:text-6xl font-bold">CURRENCY</p>
                    <p class="text-4xl md:text-5xl lg:text-6xl font-bold">CONVERTER</p>
                </div>
                <p class="text-[12px] md:text-[12px] lg:text-[18px] max-w-[600px] text-[#cccccc] font-medium">
                    Check live foreign exchange rates, then use our website to convert money when the price is right
                    for you.
                </p>
            </div>
            <div class="backdrop-blur-md bg-[#cecece1f] w-full sm:w-max shadow-md py-10 px-10 rounded-[15px]">
                <div class="flex flex-col gap-2">
                    <div>
                        <div
                            class="bg-[#e2e2e2f5] text-[#303030] rounded-tl-[10px] rounded-tr-[10px] flex justify-start items-center px-2 pt-2 text-[12px] md:text-[14px]">
                            Amount
                        </div>
                        <div class="flex gap-2 bg-[#e2e2e2f5] p-2 rounded-br-[10px] rounded-bl-[10px] shadow-md">
                            <DropdownMenu v-model="fromCurrency" :options="currencies" :getFlagClass="getFlagClass"
                                placeholder="Select From" />
                            <CurrencyInput v-model="amount" type="number" placeholder="Amount"
                                @input="calculateResult" />
                        </div>
                    </div>
                    <div class="flex justify-center items-center bg-[#e2e2e2f5] rounded-[10px] h-max cursor-pointer"
                        @click="swapPlaces">
                        <div class="w-[40px] h-[40px] flex justify-center items-center">
                            <component v-if="!loading" :is='icons["swap"]'
                                class="flex justify-center w-[20px] h-[20px]" />
                            <n-space v-else class="flex justify-center items-center pt-[5px]">
                                <n-spin class="" :theme-overrides="{ common: { primaryColor: 'black' } }"
                                    size="small" />
                            </n-space>
                        </div>
                    </div>
                    <div>
                        <div
                            class="bg-[#e2e2e2f5] text-[#303030] rounded-tl-[10px] rounded-tr-[10px] flex justify-start items-center px-2 pt-2 text-[12px] md:text-[14px]">
                            Converted to
                        </div>
                        <div class="flex gap-2 bg-[#e2e2e2f5] p-2 rounded-br-[10px] rounded-bl-[10px] shadow-md">
                            <DropdownMenu v-model="toCurrency" :options="currencies" :getFlagClass="getFlagClass"
                                placeholder="Select To" />
                            <CurrencyInput v-model="result" type="number" placeholder="Converted Amount"
                                @input="calculateAmount" />
                        </div>
                    </div>
                    <div
                        class="bg-[#e2e2e2f5] rounded-[10px] text-[12px] md:text-[14px] p-2 flex justify-between items-center drop-shadow">
                        <p>Our current rate</p>
                        <div>1 {{ fromCurrency }} = {{ store.getPairConversion }} {{ toCurrency }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
