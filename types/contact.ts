export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  serviceType: "cctv" | "solar" | "both" | "other"
}

export interface ContactInfo {
  address: string
  phone: string
  email: string
  workingHours: string
  socialMedia: {
    facebook?: string
    instagram?: string
    linkedin?: string
  }
}
