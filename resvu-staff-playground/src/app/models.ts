export interface AuthUser {
  id: string;
  email: string;
  phone: string;
  name: string;
}


export interface Staff {
  id: string;
  name: string;
  email: string;
  position: string;
  phone: string;
  start_date: Date;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  // nation: string;
  residents: string;
}
