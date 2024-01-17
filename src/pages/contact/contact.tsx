import { toast } from "@/components/ui/use-toast"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"

const Contact = () => {

  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState("")
  const [email, setemail] = useState("")
  const [subject, setsubject] = useState("")
  const [message, setmessage] = useState("")
  const [token, settoken] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("logintoken");
    if (token) {
      settoken(token);
    }
  }, [])

  const sendMessage = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await axios({
        method: "post",
        url: `${import.meta.env.VITE_RANDOMHUB_BACKEND}/v1/users/contact`,
        data: {
          firstname,
          lastname,
          email,
          subject,
          message,
          token
        },
      });

      if (res?.status !== 200) {
        toast({
          title: "Error occured!",
          description: "",
        });
        setIsLoading(false);
        return;
      }
      if (res?.data?.success) {
        toast({
          title: res?.data?.message,
        });
      } else {
        toast({
          title: res?.data?.message,
        });
      }
      setIsLoading(false)
    } catch (error) {
      toast({ title: "Error occurred!" })
      setIsLoading(false)
    }
  }, [email, firstname, lastname, message, subject, token])

  return (
    <div className="min-h-[90vh]">
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Get in touch</h2>

          </div>
          <form onSubmit={(e) => { e.preventDefault() }} className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">First name*</label>
              <input value={firstname} onChange={(e) => { setfirstname(e.target.value) }} name="first-name" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
            </div>

            <div>
              <label htmlFor="last-name" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Last name*</label>
              <input value={lastname} onChange={(e) => { setlastname(e.target.value) }} name="last-name" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email*</label>
              <input value={email} onChange={(e) => { setemail(e.target.value) }} name="email" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="subject" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Subject*</label>
              <input value={subject} onChange={(e) => { setsubject(e.target.value) }} name="subject" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Message*</label>
              <textarea value={message} onChange={(e) => { setmessage(e.target.value) }} name="message" className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
            </div>

            <div className="flex items-center justify-between sm:col-span-2">
              <button disabled={isLoading} onClick={sendMessage} className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">{isLoading ? "Sending..." : "Send"}</button>

              <span className="text-sm text-gray-500">*Required</span>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact