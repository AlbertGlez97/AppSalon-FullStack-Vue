<script setup lang="ts">
import type { PropType } from 'vue'
import type { Service } from '@/interface/Service.ts';
import { useAppointmentsStore } from '@/stores/appointments';
import { formatCurrency } from '@/helpers';

const storeAppointments = useAppointmentsStore();

defineProps({
    service: {
        // le indico que Object debe cumplir la forma de Service
        type: Object as PropType<Service>,
        required: true  // así TS sabe que nunca será undefined
    }
})


</script>

<template>
    <div class="border border-gray-600 rounded-lg p-5 flex justify-between items-center">
        <div>
            <p class="text-2xl font-extrabold text-white">{{ service.name }}</p>
            <p class="text-3xl font-black text-blue-500">{{ formatCurrency(service.price) }}</p>
        </div>
        <button type="button" class="inline-flex items-center rounded-md bg-red-600 text-white
            text-sm px-3 py-2 font-semibold shadow-sm ring-1 ring-red-300 hover:bg-red-700"
            @click="storeAppointments.onServiceSelected(service)">Eliminar</button>
    </div>
</template>