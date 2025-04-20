"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "We've received your message and will get back to you soon.",
        })
        setName("")
        setEmail("")
        setMessage("")
      } else {
        throw new Error(data.error || "Failed to send message")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
  <Input
    type="text"
    id="name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
    disabled={isLoading}
    className="peer pl-8 border-b-2 border-gray-300 focus:border-green-500 transition-colors"
    placeholder=" " 
  />
  <label
    htmlFor="name"
    className={`absolute left-8 transition-all 
      ${name ? "-top-4 text-xs text-green-500" : "absolute left-8 top-2 text-gray-600 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-green-500 transition-all"
      }`}
  >
    Name
  </label>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 absolute left-2 top-3 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
</div>

      <div className="relative">
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="peer pl-8 border-b-2 border-gray-300 focus:border-green-500 transition-colors"
          placeholder=" "
        />
        <label
          htmlFor="email"
          className={`absolute left-8 transition-all 
            ${email ? "-top-4 text-xs text-green-500" : "absolute left-8 top-2 text-gray-600 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-green-500 transition-all"
            }`}
        >
          Email
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-2 top-3 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      </div>
      <div className="relative">
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={isLoading}
          className="peer pl-8 pt-2 border-b-2 border-gray-300 focus:border-green-500 transition-colors"
          placeholder=" "
          rows={4}
        />
        <label
          htmlFor="message"
          className={`absolute left-8 transition-all 
            ${message ? "-top-4 text-xs text-green-500" : "absolute left-8 top-2 text-gray-600 cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-green-500 transition-all"
            }`}
        >
          Message
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-2 top-3 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <Button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  )
}