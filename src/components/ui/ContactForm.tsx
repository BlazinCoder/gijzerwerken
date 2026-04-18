"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const FORMSPREE_URL = "https://formspree.io/f/xyzplaceholder";

const ONDERWERPEN = [
  "Maatwerk aanvraag",
  "Vraag over een kunstwerk",
  "Samenwerking",
  "Overig",
] as const;

interface ContactFormProps {
  defaultOnderwerp?: string;
  defaultBericht?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  const name = (data.get("name") as string | null)?.trim() ?? "";
  const email = (data.get("email") as string | null)?.trim() ?? "";
  const message = (data.get("message") as string | null)?.trim() ?? "";

  if (name.length < 2) {
    errors.name = "Vul je naam in (minimaal 2 tekens)";
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Vul een geldig e-mailadres in";
  }
  if (message.length < 10) {
    errors.message = "Bericht moet minimaal 10 tekens bevatten";
  }
  return errors;
}

const inputClasses =
  "w-full rounded-lg border border-iron-700/50 bg-iron-800 px-4 py-3 text-cream placeholder:text-cream/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-copper/50 focus:border-copper/50";

const errorInputClasses =
  "w-full rounded-lg border border-rust bg-iron-800 px-4 py-3 text-cream placeholder:text-cream/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rust/50 focus:border-rust/50";

const labelClasses =
  "mb-2 block text-sm tracking-widest uppercase text-cream/70";

export default function ContactForm({
  defaultOnderwerp,
  defaultBericht,
}: ContactFormProps) {
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setFormState("submitting");

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      setFormState(response.ok ? "success" : "error");
    } catch {
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        {/* Animated checkmark */}
        <motion.svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          className="text-copper"
        >
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.path
            d="M20 32L28 40L44 24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
          />
        </motion.svg>

        <h3 className="mt-6 font-playfair text-2xl text-cream">
          Bericht verzonden!
        </h3>
        <p className="mt-2 text-cream/70">
          Bedankt! Gijs neemt zo snel mogelijk contact op.
        </p>
        <button
          onClick={() => setFormState("idle")}
          className="mt-6 text-sm tracking-widest uppercase text-copper transition-colors duration-300 hover:text-copper-light"
        >
          Nog een bericht sturen
        </button>
      </motion.div>
    );
  }

  const fields = [
    { key: "name", delay: 0 },
    { key: "email", delay: 0.1 },
    { key: "phone", delay: 0.2 },
    { key: "_subject", delay: 0.3 },
    { key: "message", delay: 0.4 },
  ] as const;

  return (
    <form
      action={FORMSPREE_URL}
      method="POST"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Naam */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: fields[0].delay }}
        className="mb-5"
      >
        <label htmlFor="contact-name" className={labelClasses}>
          Naam <span className="text-copper">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          minLength={2}
          placeholder="Je naam"
          aria-required="true"
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={errors.name ? errorInputClasses : inputClasses}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-rust" role="alert">
            {errors.name}
          </p>
        )}
      </motion.div>

      {/* E-mail */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: fields[1].delay }}
        className="mb-5"
      >
        <label htmlFor="contact-email" className={labelClasses}>
          E-mailadres <span className="text-copper">*</span>
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          placeholder="je@email.nl"
          aria-required="true"
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={errors.email ? errorInputClasses : inputClasses}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-rust" role="alert">
            {errors.email}
          </p>
        )}
      </motion.div>

      {/* Telefoon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: fields[2].delay }}
        className="mb-5"
      >
        <label htmlFor="contact-phone" className={labelClasses}>
          Telefoon <span className="text-cream/30">(optioneel)</span>
        </label>
        <input
          type="tel"
          id="contact-phone"
          name="phone"
          placeholder="06 - 1234 5678"
          className={inputClasses}
        />
      </motion.div>

      {/* Onderwerp */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: fields[3].delay }}
        className="mb-5"
      >
        <label htmlFor="contact-subject" className={labelClasses}>
          Onderwerp
        </label>
        <div className="relative">
          <select
            id="contact-subject"
            name="_subject"
            defaultValue={defaultOnderwerp ?? ONDERWERPEN[0]}
            className={`${inputClasses} appearance-none pr-10`}
          >
            {ONDERWERPEN.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {/* Custom chevron */}
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cream/50"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 8l4 4 4-4"
            />
          </svg>
        </div>
      </motion.div>

      {/* Bericht */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: fields[4].delay }}
        className="mb-6"
      >
        <label htmlFor="contact-message" className={labelClasses}>
          Bericht <span className="text-copper">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder="Waar kunnen we je mee helpen?"
          defaultValue={defaultBericht}
          aria-required="true"
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${errors.message ? errorInputClasses : inputClasses} resize-y`}
        />
        {errors.message && (
          <p
            id="message-error"
            className="mt-1 text-sm text-rust"
            role="alert"
          >
            {errors.message}
          </p>
        )}
      </motion.div>

      {/* Error banner */}
      {formState === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 rounded-lg border border-rust/30 bg-rust/10 px-4 py-3 text-sm text-cream/80"
          role="alert"
        >
          Er ging iets mis. Probeer het opnieuw of stuur een mail naar{" "}
          <a
            href="mailto:info@gijzerwerken.com"
            className="text-copper underline hover:text-copper-light"
          >
            info@gijzerwerken.com
          </a>
          .
        </motion.div>
      )}

      {/* Submit */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="inline-flex items-center gap-2 rounded-lg bg-copper px-8 py-3 text-sm font-semibold tracking-widest uppercase text-iron-900 transition-colors duration-300 hover:bg-copper-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          {formState === "submitting" ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-iron-900/30 border-t-iron-900" />
              Verzenden…
            </>
          ) : (
            "Verstuur bericht"
          )}
        </button>
      </motion.div>
    </form>
  );
}
