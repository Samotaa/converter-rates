<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { icons } from '../icons/icons';

defineProps({
    modelValue: {
        type: [String, null],
        required: true,
    },
    options: {
        type: Array,
        required: true,
    },
    getFlagClass: {
        type: Function,
        required: true,
    },
    placeholder: {
        type: String,
        default: 'Select an option',
    },
});

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const dropdownRef = ref(null)

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})

function toggleDropdown() {
    isOpen.value = !isOpen.value
}

function selectOption(option) {
    emit('update:modelValue', option)
    isOpen.value = false
};

function handleClickOutside(event) {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isOpen.value = false
    }
}

</script>

<template>
    <div ref="dropdownRef" class="text-[#303030] relative cursor-pointer">
        <div class="shadow-md flex justify-center items-center gap-1 hover:bg-[#e9e8e8] rounded-[10px] px-2 py-1 w-full"
            @click="toggleDropdown">
            <span :class="getFlagClass(modelValue)" class="flag-icon"></span>
            <span class="w-[40px] md:w-[50px] lg:w-[70px] text-center font-medium ">{{ modelValue }}</span>
            <span v-if="isOpen">
                <component :is="icons['arrowUp']"
                    class="w-[10px] h-[10px] md:w-[15px] md:h-[15px] lg:w-[20px] lg:h-[20px] flex justify-center" />
            </span>
            <span v-else>
                <component :is="icons['arrowDown']"
                    class="w-[10px] h-[10px] md:w-[15px] md:h-[15px] lg:w-[20px] lg:h-[20px] flex justify-center" />
            </span>
        </div>
        <ul v-if="isOpen" class="absolute z-20 bg-[#e2e2e2] w-full">
            <li v-for="option in options" :key="option" @click="selectOption(option)"
                class="flex justify-center items-center gap-1 p-[5px] cursor-pointer hover:bg-[#e9e8e8]">
                <span :class="getFlagClass(option)" class=""></span>
                {{ option }}
            </li>
        </ul>
    </div>
</template>
