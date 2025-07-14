<script setup lang="ts">
import type { PropType } from 'vue'
import type { Service } from '@/interface/Service.ts';
import { formatCurrency } from '@/helpers';
import { useAppointmentsStore } from '@/stores/appointments';

const appointmentsStore = useAppointmentsStore();

defineProps({
    service: {
        // le indico que Object debe cumplir la forma de Service
        type: Object as PropType<Service>,
        required: true  // así TS sabe que nunca será undefined
    }
})
</script>

<template>

    <div class="p-5 space-y-5 rounded-lg cursor-pointer "
        :class="appointmentsStore.isServiceSelected(service._id) ? 'bg-blue-500 text-white' : 'bg-white'"
        @click="appointmentsStore.onServiceSelected(service)">
        <p class="text-2xl font-light">{{ service.name }}</p>
        <p class="text-4xl font-black "
            :class="appointmentsStore.isServiceSelected(service._id) ? ' text-white' : 'text-blue-600'">{{
                formatCurrency(service.price) }}</p>
    </div>
</template>