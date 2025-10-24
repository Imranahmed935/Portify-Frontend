"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Linkedin, Github } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Message submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    alert("Thank you! Your message has been sent.");
  };

  return (
    <section className="flex flex-col items-center justify-center px-4  space-y-12">
  <h1 className="text-3xl font-bold text-center">Get in Touch</h1>

  <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
    <div className="flex flex-col justify-center space-y-6 bg-gray-800 p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold">Contact Information</h2>
      <p className="flex items-center gap-3  text-white">
        <Phone className="w-5 h-5 text-blue-600" /> +8801871421977
      </p>
      <p className="flex items-center gap-3 text-white">
        <Mail className="w-5 h-5 text-blue-600" /> imrantahir9918@gmail.com
      </p>
      <p className="flex items-center gap-3 text-white">
        <MapPin className="w-5 h-5 text-blue-600" /> Companiganj, Sylhet, Bangladesh
      </p>

      <div className="flex items-center gap-4 mt-4">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-600 transition-colors"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600   transition-colors"
        >
          <Github className="w-6 h-6" />
        </a>
      </div>
    </div>

    {/* Right Side - Contact Form */}
    <div className=" bg-gray-800 p-8 rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
          className=" bg-accent-foreground dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
        />
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          required
          className="bg-accent-foreground dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
        />
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message..."
          rows={6}
          required
          className="bg-accent-foreground dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white mt-2 w-full"
        >
          Send Message
        </Button>
      </form>
    </div>
  </div>
</section>

  );
};

export default ContactSection;
