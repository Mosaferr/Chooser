export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  subordinates?: Employee[]; // <--- to dodane
}
