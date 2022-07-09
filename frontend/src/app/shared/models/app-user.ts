
export interface AppUser {
  name: string;
  email: string;
  isAdmin: boolean;
  shipping: {
    name: string,
    phoneNo: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    country: string,
    zipCode: string
  };
}