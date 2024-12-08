<script setup>
import { useCurrencyStore } from '../store/currencyStore'
import { computed, ref, onMounted } from 'vue'
import NavBar from '../components/NavBar.vue'
import { icons } from '../icons/icons'

const store = useCurrencyStore()
const loading = ref(true)

onMounted(async () => {
    await store.loadRates().then(() => loading.value = false)
})

const exchangeRates = computed(() => {
    const baseCurrency = store.getBaseCurrency
    const favoriteCurrencies = store.favoriteCurrencies
    return Object.fromEntries(
        Object.entries(store.exchangeRates)
            .filter(([key]) => key !== baseCurrency && !favoriteCurrencies.includes(key))
            .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
    )
})

const favoriteCurrencies = computed(() => {
    return Object.values(store.favoriteCurrencies).filter((value) => value !== store.getBaseCurrency)
})

function toggleFavorite(currency) {
    store.toggleFavorite(currency)
}

</script>


<template>
    <div class="text-[black] h-screen flex justify-center items-center overflow-hodden">
        <NavBar />
        <div v-if="!loading" class="flex flex-col  justify-around gap-10 items-center px-[20px]">
            <div class="text-[#fff]">
                <h1 class="text-[28px] lg:text-[32px] font-bold text-center max-w-[700px] rounded-tl-[10px]">
                    Live exchange rates to 1 {{ store.getBaseCurrency }}
                </h1>
                <h2 class="text-center">
                    Compare currencies in real time and find the right moment to transfer funds
                </h2>
            </div>

            <div
                class="flex flex-col justify-center items-start  text-[14px] sm:text-[20px] bg-[#cecece1f] w-full  lg:w-max py-[20px] px-[30px] rounded-[10px]">
                <table class="bg-[#e2e2e2f5] rounded-[10px] w-full">
                    <tbody>
                        <TransitionGroup name="fade">
                            <tr class="font-bold text-center" v-for="currency in favoriteCurrencies" :key="currency">
                                <td class="sm:w-[150px] lg:w-[150px] py-2 sm:px-3 lg:py-3 lg:px-5">
                                    {{ currency }}
                                </td>
                                <td class="sm:w-[150px] lg:w-[300px] py-2 sm:px-3 lg:py-3 lg:px-5">
                                    {{ store.exchangeRates[currency] }}
                                </td>
                                <td>
                                    <button class="flex justify-end p-2 w-full py-2 px-3 text-[16px]"
                                        @click="toggleFavorite(currency)">
                                        <component :is='icons["starRemove"]'
                                            class="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px] flex justify-center" />
                                    </button>
                                </td>
                            </tr>
                        </TransitionGroup>
                        <TransitionGroup name="fade">
                            <tr class="text-center" v-for="(rate, currency) in exchangeRates" :key="currency">
                                <td class="sm:w-[150px] lg:w-[150px] sm:px-3 lg:px-5">
                                    {{ currency }}
                                </td>
                                <td class="sm:w-[150px] lg:w-[300px] py-2 sm:px-3 lg:py-3 lg:px-5"> {{ rate }}
                                </td>
                                <td>
                                    <button class="flex justify-end p-2 w-full py-2 px-3 text-[16px]"
                                        @click="toggleFavorite(currency)">
                                        <component :is='icons["startAdd"]'
                                            class="w-[15px] h-[15px] lg:w-[20px] lg:h-[20px] flex justify-center" />
                                    </button>
                                </td>
                            </tr>
                        </TransitionGroup>

                    </tbody>
                </table>
            </div>
        </div>
        <n-space v-else class="flex justify-center items-center pt-[5px]">
            <n-spin class="" :theme-overrides="{ common: { primaryColor: '#fff' } }" size="small" />
        </n-space>
    </div>
</template>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s cubic-bezier(0.25, 0, 0.3, 1);
}


.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01) translate(20px, 0);
}

.fade-leave-active {
    position: absolute;
}
</style>