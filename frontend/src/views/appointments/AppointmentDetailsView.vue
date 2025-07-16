<script setup lang="ts">
import VueTailwindDatePicker from 'vue-tailwind-datepicker';
import SelectedServices from '@/components/SelectedServices.vue';
import { formatCurrency } from '@/helpers';
import { useAppointmentsStore } from '@/stores/appointments';

const storeAppointments = useAppointmentsStore();
</script>

<template>
    <h2 class="text-4xl font-extrabold text-white">Deatlles Cita y Resumen</h2>
    <p class="text-white text-lg">A continuacion verifica la informacion y confirma tu cita</p>
    <h3 class="text-3xl font-extrabold text-white">Servicios</h3>

    <p v-if="storeAppointments.noServiceSelected" class="text-white text-2xl text-center">No hay servicios seleccionados
    </p>

    <div v-else class="grid gap-5">
        <SelectedServices v-for="service in storeAppointments.services" :key="service._id" :service="service" />

        <p class="text-right text-white text-2xl">Total a pagar:
            <span class="font-bold">
                {{ formatCurrency(storeAppointments.totalAmout) }}
            </span>
        </p>
    </div>

    <div v-if="!storeAppointments.noServiceSelected" class="space-y-8">
        <h3 class="text-3xl font-extrabold text-white">Fecha y Hora</h3>
        <div class="lg:flex gap-5 items-start">
            <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
                <VueTailwindDatePicker i18n="es-mx" as-single no-input />
            </div>
        </div>
    </div>
</template>