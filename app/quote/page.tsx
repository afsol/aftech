"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import axios from "@/utils/axios";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { 
  Building2, 
  Mail, 
  PhoneCall, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Briefcase 
} from "lucide-react";

// Types for form state and backend services
interface ServiceOption {
  id: number;
  heading: string;
}

export default function QuotePage() {
  // Form State Fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    serviceId: "",
    mobileNumber: "",
    message: ""
  });

  // Dynamic Content States
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: ""
  });

  // 1. Fetch available services dynamically from your backend API
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/services`, {
        headers: { "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY },
      })
      .then((res) => {
        // Fallback checks depending on whether you return an array directly or nested in data wrappers
        const payload = res.data?.data || [];
        setServices(Array.isArray(payload) ? payload : []);
      })
      .catch((err) => console.error("Error fetching services dropdown items:", err))
      .finally(() => setLoadingServices(false));
  }, []);

  // 2. Handle Form input mutations safely
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Post Quote payload parameters on form submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      // Map frontend fields safely to your Laravel backend endpoint naming rules
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/quotes`, {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            service_id: formData.serviceId,
            mobile: formData.mobileNumber, // 💡 Changed from mobileNumber key to 'mobile' to match backend request expectation
            message: formData.message,
        }, {
            headers: { "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY },
        });

      if (response.data?.success) {
        setStatus({
          type: "success",
          message: "Your quote request has been sent successfully! Our sales team will get back to you shortly."
        });
        // Clear out input strings upon successful completion
        setFormData({ firstName: "", lastName: "", email: "", serviceId: "", mobileNumber: "", message: "" });
      } else {
        throw new Error(response.data?.message || "Failed to register request parameters.");
      }
    } catch (err: any) {
      console.error("Submission breakdown error:", err);
      setStatus({
        type: "error",
        message: err.response?.data?.message || "An error occurred while submitting your request. Please try again."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Row Descriptor Section */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Request a Custom Quote
            </h1>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Tell us about your enterprise needs, and our engineers will configure a scalable solution optimized for your deployment criteria.
            </p>
          </div>

          {/* Balanced Split Layout Grid: Form (65%) vs Details Sidebar (35%) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* LEFT ROW CANVAS: Interactive Submission Matrix Card Container */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-xs p-6 md:p-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2 pb-3 border-b border-slate-100">
                <Briefcase className="h-5 w-5 text-slate-400" /> System Requirement Specifiers
              </h2>

              {/* Status Alert Panels Container notification wrappers */}
              {status.type && (
                <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-sm animate-in fade-in duration-200 ${status.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-100" : "bg-red-50 text-red-800 border border-red-100"}`}>
                  {status.type === "success" ? <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-600 flex-shrink-0" /> : <AlertCircle className="h-5 w-5 mt-0.5 text-red-600 flex-shrink-0" />}
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Dual Input Names Array */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="e.g., Ali"
                      className="w-full text-sm bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="e.g., Khan"
                      className="w-full text-sm bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>

                {/* Email Fields Row Row Block */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@company.com"
                    className="w-full text-sm bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all placeholder:text-slate-300"
                  />
                </div>

                {/* Dynamic Services Selector Option Field Container */}
               <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Target Solution Category *
                    </label>
                    <div className="relative w-full">
                        {/* 💡 Note the lowercase 'select' tag to properly support native option elements */}
                        <select
                        name="serviceId"
                        required
                        value={formData.serviceId}
                        onChange={handleInputChange}
                        className="w-full text-sm bg-slate-50/50 border border-slate-200 rounded-xl pl-4 pr-10 py-3 focus:bg-white focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all text-slate-700 appearance-none cursor-pointer block dynamic-select"
                        >
                        <option value="" disabled className="text-slate-400">
                            Select an infrastructure segment...
                        </option>
                        {services.map((srv) => (
                            <option key={srv.id} value={srv.id} className="text-slate-800">
                            {srv.heading}
                            </option>
                        ))}
                        </select>

                        {/* Dynamic Status Indicator */}
                        {loadingServices ? (
                        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 animate-pulse font-medium">
                            Loading...
                        </span>
                        ) : null}

                        {/* Custom Dropdown Arrow Icon Indicator (Aligned safely to the right aspect) */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 border-l border-slate-200/60 my-2">
                        <svg 
                            className="fill-current h-4 w-4" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                        </div>
                    </div>
                    </div>

                {/* mobileNumber Line Entry Segment block */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Mobile number *</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    required
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="Briefly state your quote objective"
                    className="w-full text-sm bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all placeholder:text-slate-300"
                  />
                </div>

                {/* Rich Context Multi-Line Message Field Frame */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Project Scope details / Requirements *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide site deployment context, expected node volumes, scaling properties, or configuration deadlines..."
                    className="w-full text-sm bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all placeholder:text-slate-300 resize-none leading-relaxed"
                  />
                </div>

                {/* Submit Confirmation Trigger Component Anchor Button */}
                <Button
                  type="submit"
                  disabled={submitting || loadingServices}
                  className="w-full h-11 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 disabled:pointer-events-none mt-4"
                >
                  <Send className="h-4 w-4" />
                  <span>{submitting ? "Transmitting Profile..." : "Submit Quote Application"}</span>
                </Button>
              </form>
            </div>

            {/* RIGHT ROW CANVAS: Corporate HQ Contact Details Sidebar */}
            <div className="space-y-6">
              {/* Contact Information block matrix elements frame panel card container wrapper */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6">
                <h2 className="text-base font-bold text-slate-800 mb-5 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-slate-400" /> Head Office Details
                </h2>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Location</h4>
                      <p className="text-sm text-slate-500 mt-0.5 font-normal leading-relaxed">
                        Islamabad, Capital Territory, Pakistan
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <PhoneCall className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Helpline Contact</h4>
                      <p className="text-sm text-slate-500 mt-0.5 font-normal font-mono">
                        +92 (051) 123-4567
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Corporate Desk</h4>
                      <p className="text-sm text-slate-500 mt-0.5 font-normal">
                        info@aftechnologies.pk
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* MAP ANCHOR BOX PANEL CANVAS - Configured for your link injector replacement */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" /> Live Location Map
                  </h3>
                </div>
                <div className="aspect-video bg-slate-100 flex flex-col items-center justify-center text-center p-4">
                  <MapPin className="h-7 w-7 text-slate-300 animate-bounce mb-2" />
                  <p className="text-xs font-medium text-slate-400 max-w-[200px]">
                    Google Maps Link or iframe component element container placeholder
                  </p>
                  <span className="text-[10px] text-slate-300 block mt-1">
                    (Modify this frame inside source file later)
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}