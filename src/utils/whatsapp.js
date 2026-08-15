// WhatsApp utility functions

export const openWhatsApp = (phone, message) => {
  const encodedMessage = encodeURIComponent(message)
  const url = `https://wa.me/${phone}?text=${encodedMessage}`
  window.open(url, '_blank')
}

export const generateBookingMessage = (formData) => {
  return `Hello Sree Maguva,

I would like to book an appointment.

Name: ${formData.name}
Phone: ${formData.phone}
Service: ${formData.service}
Date: ${formData.date}
Time: ${formData.time}
${formData.message ? `Message: ${formData.message}` : ''}

Thank you!`
}

export const generateAcademyEnquiryMessage = () => {
  return `Hello Sree Maguva, I am interested in your Beauty Academy courses. Please share the course details and fees.`
}

export const generateGeneralEnquiryMessage = (service = '') => {
  return service 
    ? `Hello Sree Maguva, I am interested in the ${service}. Please share more details.`
    : `Hello Sree Maguva, I would like to know more about your services. Please contact me.`
}
