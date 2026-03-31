"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "./AnimatedButton";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const fieldRefs = {
    name: nameRef,
    email: emailRef,
    message: messageRef,
  };

  const validate = useCallback((): FormErrors => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  }, [formData]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const errs = validate();
      setErrors(errs);

      const firstError = (Object.keys(errs) as (keyof FormErrors)[])[0];
      if (firstError) {
        fieldRefs[firstError].current?.focus();
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    },
    [validate]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Contact form"
      noValidate
      className="mx-auto w-full max-w-xl"
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 py-12"
            aria-live="polite"
          >
            {/* Checkmark animation */}
            <motion.svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              className="text-accent"
            >
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.path
                d="M20 32l8 8 16-16"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              />
            </motion.svg>
            <p className="text-lg font-medium text-text-primary">
              Thanks! I&apos;ll be in touch.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-5"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                Name <span className="field-error inline" aria-hidden="true">*</span>
              </label>
              <input
                ref={nameRef}
                id="contact-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`w-full rounded-xl border bg-surface px-4 py-3 text-text-primary placeholder:text-text-secondary/50 transition-colors focus:border-accent focus:outline-none ${
                  errors.name ? "input-error" : "border-surface-light"
                }`}
                placeholder="Your name"
              />
              {errors.name && (
                <p id="name-error" role="alert" className="field-error">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                Email <span className="field-error inline" aria-hidden="true">*</span>
              </label>
              <input
                ref={emailRef}
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full rounded-xl border bg-surface px-4 py-3 text-text-primary placeholder:text-text-secondary/50 transition-colors focus:border-accent focus:outline-none ${
                  errors.email ? "input-error" : "border-surface-light"
                }`}
                placeholder="you@email.com"
              />
              {errors.email && (
                <p id="email-error" role="alert" className="field-error">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-sm font-medium text-text-primary"
              >
                Message <span className="field-error inline" aria-hidden="true">*</span>
              </label>
              <textarea
                ref={messageRef}
                id="contact-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`w-full resize-none rounded-xl border bg-surface px-4 py-3 text-text-primary placeholder:text-text-secondary/50 transition-colors focus:border-accent focus:outline-none ${
                  errors.message ? "input-error" : "border-surface-light"
                }`}
                placeholder="Tell me about your project..."
              />
              {errors.message && (
                <p id="message-error" role="alert" className="field-error">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <AnimatedButton type="submit" variant="filled">
                Send Message
              </AnimatedButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
