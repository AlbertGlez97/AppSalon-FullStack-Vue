import type { Service } from "./Service";
import type { User } from "./User";

interface UserAppointment {
  _id: string;
  services: Service[];
  date: Date;       
  time: string;       
  totalAmount: number;
  user: User;      
}

export type { UserAppointment };