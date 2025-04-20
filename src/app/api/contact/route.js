import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req) {
  console.log("Contact form submission received")

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Missing email configuration")
    return NextResponse.json({ error: "Email configuration is missing" }, { status: 500 })
  }

  try {
    const { name, email, message } = await req.json()
    console.log("Form data:", { name, email, message: message.substring(0, 50) + "..." })

    console.log("Creating transporter")
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true,
    })

    console.log("Verifying SMTP connection")
    await transporter.verify()
    console.log("SMTP connection verified successfully")

    const mailOptions = {
      from: `"Eden Mist Contact" <${process.env.EMAIL_USER}>`,
      to: "edenmist01@gmail.com",
      subject: "New Contact Form Submission - Eden Mist",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    }

    console.log("Sending email")
    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent successfully:", info.messageId)

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Detailed error:", error)
    let errorMessage = "Failed to send email"

    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

