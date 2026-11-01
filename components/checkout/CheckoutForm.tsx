"use client";

import {
  useState,
  type ChangeEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import { placeOrder } from "@/lib/order-actions";
import {
  validateDelivery,
  type DeliveryDetails,
  type DeliveryErrors,
} from "@/lib/checkout-validation";
import { NIGERIA_STATES } from "@/lib/nigeria-states";

const emptyValues: DeliveryDetails = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
};

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1 block text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default function CheckoutForm() {
  const router = useRouter();
  const { items } = useCart();
  const [values, setValues] = useState<DeliveryDetails>(emptyValues);
  const [errors, setErrors] = useState<DeliveryErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    setServerError("");

    const found = validateDelivery(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);

    try {
      const result = await placeOrder({ delivery: values, items });

      if (result.ok) {
        router.push(`/order/${result.reference}?placed=1`);
        return;
      }

      setServerError(result.error);
      if (result.fieldErrors) setErrors(result.fieldErrors);
    } catch {
      setServerError("Something went wrong. Please try again.");
    }

    setSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-lg border border-border bg-surface p-6">
      <h2 className="text-lg font-semibold text-primary">Delivery details</h2>

      <Field label="Full name" htmlFor="fullName" error={errors.fullName}>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          value={values.fullName}
          onChange={handleChange}
          aria-invalid={!!errors.fullName}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone number" htmlFor="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="08012345678"
            value={values.phone}
            onChange={handleChange}
            aria-invalid={!!errors.phone}
            className={inputClass}
          />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Delivery address" htmlFor="address" error={errors.address}>
        <textarea
          id="address"
          name="address"
          rows={3}
          autoComplete="street-address"
          value={values.address}
          onChange={handleChange}
          aria-invalid={!!errors.address}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="City / Town" htmlFor="city" error={errors.city}>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            value={values.city}
            onChange={handleChange}
            aria-invalid={!!errors.city}
            className={inputClass}
          />
        </Field>

        <Field label="State" htmlFor="state" error={errors.state}>
          <select
            id="state"
            name="state"
            value={values.state}
            onChange={handleChange}
            aria-invalid={!!errors.state}
            className={inputClass}>
            <option value="">Select state</option>
            {NIGERIA_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-red-600">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
        {submitting ? "Placing order..." : "Place order"}
      </button>
    </form>
  );
}
