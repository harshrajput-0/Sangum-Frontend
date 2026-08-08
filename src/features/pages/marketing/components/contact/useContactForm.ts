"use client";

import { useState } from "react";
import {
  sendContactMessage,
  type ContactFormData,
} from "./contact.service";

type Status = "idle" | "sending" | "success" | "error";

export const useContactForm = () => {
  const [values, setValues] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setStatus("sending");

      await sendContactMessage(values);

      setValues({
        name: "",
        email: "",
        message: "",
      });

      setStatus("success");
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  };

  return {
    values,
    status,
    handleChange,
    handleSubmit,
  };
};