import api from '../lib/axios';
import type { Appointment } from '../interface/Appointment';

export default {
    create(data: Appointment){
        return api.post('/appointments', data);
    },
    getByDate(date: string) {
        return api.get(`/appointments?date=${date}`);         
    }
}