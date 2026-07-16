"use server";

import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContact(formData: {
  name: string;
  email: string;
  phone: string;
  industry: string;
  message: string;
}) {
  try {
    // 1. Insert into Supabase
    // We combine phone and industry into the message to fit the original table schema,
    // and use industry for the subject.
    const { error: dbError } = await supabase.from("contact_us").insert([
      {
        name: formData.name,
        email: formData.email,
        subject: formData.industry ? `Enquiry from ${formData.industry} sector` : "General Enquiry",
        message: `Phone: ${formData.phone}\nIndustry: ${formData.industry}\n\nMessage:\n${formData.message}`,
      },
    ]);

    if (dbError) {
      console.error("Supabase insert error:", dbError);
    }

    // 2. Send email to Admin (Lead Notification)
    // Replace the 'to' email with the admin's email if it's different.
    // Note: If you haven't verified a domain on Resend, you can only send from onboarding@resend.dev to your registered email.
    // Assuming you have verified your domain, we use info@irasynergy.com
    await resend.emails.send({
      from: "iRA Synergy <info@irasynergy.com>", 
      to: "info@irasynergy.com", 
      subject: `New Lead: ${formData.name} - ${formData.industry || "General"}`,
      text: `You have a new contact form submission:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Industry/Sector: ${formData.industry}

Message:
${formData.message}`,
    });

    // 3. Send Thank You email to User
    await resend.emails.send({
      from: "iRA Synergy <info@irasynergy.com>", 
      to: formData.email,
      subject: "Thank you for contacting iRA Synergy",
      text: `Dear ${formData.name},

Thank you for reaching out to iRA Synergy. We have received your message and our team will get back to you within 24 hours.

Here is a copy of your message:
${formData.message}

Best Regards,
The iRA Synergy Team
https://irasynergy.com`,
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Failed to send message." };
  }
}
