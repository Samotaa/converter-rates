<script setup>

defineProps({
    modelValue: {
        type: [String, Number],
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        default: '',
    },
    inputClass: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue'])

function handleInput(event) {
    emit('update:modelValue', event.target.value)
}

</script>

<template>
    <input :type="type" :placeholder="placeholder" :value="modelValue" @input="handleInput"
        class="hover:bg-[#e9e8e8] shadow-md bg-[#e2e2e200] rounded-[10px] px-2 py-1 w-full" />
</template>

<style scoped></style>
