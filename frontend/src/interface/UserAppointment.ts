import type { Service } from "./Service";

interface UserAppointment {
  _id: string;
  services: Service[];
  date: Date;       
  time: string;       
  totalAmount: number;
  user: string;      
}

export type { UserAppointment };