import { NIGERIA_STATES } from "./nigeria-states";

export type DeliveryDetails = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
};

export type DeliveryErrors = Partial<Record<keyof DeliveryDetails, string>>;

export function validateDelivery(values: DeliveryDetails): DeliveryErrors {
  const errors: DeliveryErrors = {};

  const fullName = values.fullName.trim();
  if (fullName.length < 3 || fullName.length > 100) {
    errors.fullName = "Enter your full name.";
  }

  const phone = values.phone.replace(/\s/g, "");
  if (!/^(0|\+234)[789][01]\d{8}$/.test(phone)) {
    errors.phone = "Enter a valid Nigerian phone number.";
  }

  const email = values.email.trim();
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) {
    errors.email = "Enter a valid email address.";
  }

  const address = values.address.trim();
  if (address.length < 5 || address.length > 300) {
    errors.address = "Enter your delivery address.";
  }

  const city = values.city.trim();
  if (!city || city.length > 100) {
    errors.city = "Enter your city or town.";
  }

  if (!NIGERIA_STATES.includes(values.state)) {
    errors.state = "Choose your state.";
  }

  return errors;
}
