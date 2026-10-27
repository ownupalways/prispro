"use client";

import { useState, type ChangeEvent, type SyntheticEvent, type ReactNode } from "react";
import { NIGERIA_STATES } from "@/lib/nigeria-states";

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const emptyValues: FormValues = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.fullName.trim().length < 3) {
    errors.fullName = "Enter your full name.";
  }

  const phone = values.phone.replace(/\s/g, "");
  if (!/^(0|\+234)[789][01]\d{8}$/.test(phone)) {
    errors.phone = "Enter a valid Nigerian phone number.";
  }

  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (values.address.trim().length < 5) {
    errors.address = "Enter your delivery address.";
  }

  if (!values.city.trim()) errors.city = "Enter your city or town.";
  if (!values.state) errors.state = "Choose your state.";

  return errors;
}

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
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-foreground">
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
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-lg border border-border bg-surface p-6"
    >
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
            className={inputClass}
          >
            <option value="">Select state</option>
            {NIGERIA_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground hover:opacity-90"
      >
        Continue
      </button>

      {submitted && (
        <p className="text-sm text-muted">
          Details look good. Placing the order comes in the next step.
        </p>
      )}
    </form>
  );
}
