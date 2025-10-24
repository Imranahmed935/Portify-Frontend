/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Phone, Mail, MapPin, Linkedin, Github } from "lucide-react";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        "service_3vadbk3",
        "template_tddw8te",
        formData,
        "7lGJvGVZeWienpTMV"
      );
      toast.success("Message sent successfully!");
      setFormData({ from_name: "", from_email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Try again.");
      setSuccess("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <section id="Contact-Section" className="flex flex-col items-center justify-center px-4 mb-24 lg:mt-20">
  <div className=" bg-accent-foreground dark:bg-gray-900 rounded-3xl shadow-2xl p-8 lg:p-16 w-full max-w-7xl">
    <h1 className="text-3xl font-bold text-center mb-12">Get in Touch</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left Side - Contact Info */}
      <div className="flex flex-col justify-center space-y-6  dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold">Contact Information</h2>
        <p className="flex items-center gap-3 text-white dark:text-gray-300">
          <Phone className="w-5 h-5 text-blue-600" /> +8801871421977
        </p>
        <p className="flex items-center gap-3 text-white dark:text-gray-300">
          <Mail className="w-5 h-5 text-blue-600" /> imrantahir9918@gmail.com
        </p>
        <p className="flex items-center gap-3 text-white dark:text-gray-300">
          <MapPin className="w-5 h-5 text-blue-600" /> Companiganj, Sylhet, Bangladesh
        </p>

        {/* Social Links */}
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
            className="text-blue-700 hover:text-blue-600 transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div className=" border p-8 rounded-2xl shadow-lg">
        {success && (
          <p
            className={`text-center mb-4 ${
              success.includes("successfully") ? "text-green-500" : "text-red-500"
            }`}
          >
            {success}
          </p>
        )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
  <Input
    name="from_name"
    value={formData.from_name}
    onChange={handleChange}
    placeholder="Your Name"
    required
    className="bg-gray-800 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
  />
  <Input
    type="email"
    name="from_email"
    value={formData.from_email}
    onChange={handleChange}
    placeholder="Your Email"
    required
    className="bg-gray-800 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
  />
  <Input
    name="subject"
    value={formData.subject}
    onChange={handleChange}
    placeholder="Subject"
    required
    className="bg-gray-800 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
  />
  <Textarea
    name="message"
    value={formData.message}
    onChange={handleChange}
    placeholder="Write your message..."
    rows={6}
    required
    className="bg-gray-800 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-500"
  />
  <Button
    type="submit"
    className={`bg-blue-600 hover:bg-blue-700 text-white mt-2 w-full ${
      loading ? "opacity-70 cursor-not-allowed" : ""
    }`}
    disabled={loading}
  >
    {loading ? "Sending..." : "Send Message"}
  </Button>
</form>

      </div>
    </div>
  </div>
</section>

  );
};

export default ContactSection;
