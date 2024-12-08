<script setup>
import { computed, ref, watch } from 'vue';
import { useCurrencyStore } from '../store/currencyStore';
import { useRoute } from 'vue-router';
import DropdownMenu from './DropdownMenu.vue'
import { getFlagClass } from '../composables/flags'

const route = useRoute()
const store = useCurrencyStore()
const defaultCurrency = ref(store.getBaseCurrency)
const currencies = computed(() => Object.keys(store.exchangeRates))

const routes = [
    { path: '/', name: 'Exchange' },
    { path: '/rates', name: 'Rates' },
]

watch(defaultCurrency, (newDefaultCurrency, oldDefaultCurrency) => {
    if (newDefaultCurrency !== oldDefaultCurrency) {
        localStorage.setItem("baseCurrency", newDefaultCurrency)
        store.setBaseCurrency(newDefaultCurrency)
    }
})

</script>

<template>
    <nav
        class="fixed z-10 top-0 left-0 flex justify-between items-center w-full p-3 font-medium border-b border-[#ffffff41] backdrop-blur-3xl bg-[#6e666627] drop-shadow">
        <div class="text-[#fff] text-[16px] md:text-[24px] font-bold">Converter</div>
        <div class="flex justify-center items-center gap-5">
            <div v-for="item in routes" :key="item.name" class="items-center">
                <router-link :to="item.path">
                    <span class="text-[14px] md:text-[22px] w-full text-center hover:text-[#d4d4d4] font-medium"
                        :class="route.path === item.path ? 'text-[#fff]' : 'text-[#a5a5a5]'">
                        {{ item.name }}
                    </span>
                </router-link>
            </div>
        </div>
        <div>
            <DropdownMenu v-model="defaultCurrency" :options="currencies" :getFlagClass="getFlagClass"
                class="text-[#000] bg-[#e2e2e2f5] rounded-[10px]" placeholder="Select To" />
        </div>
    </nav>
</template>