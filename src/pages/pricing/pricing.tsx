import { useCallback } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { toast } from "@/components/ui/use-toast";


const Pricing = () => {
  const { email } = useAppSelector(
    (state: RootState) => state.loginstatus
  );
  const basicFeatures = ["Add Filter", "1 month subscription"];
  const proFeatures = ["Add Filter", "Location", "Instant Skip", "2 month subscription"];

  const startstripesession = useCallback(async (plantype: string, price: number) => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      const body = {
        plan: plantype,
        price: price,
        email
      }
      const headers = {
        "Content-Type": "application/json"
      }

      const data = await fetch(`${import.meta.env.VITE_RANDOMHUB_BACKEND}/v1/users/stripe/create-checkout-session`, {
        method: "POST",
        body: JSON.stringify(body),
        headers
      })

      if (!data.ok) {
        toast({
          title: "Network error!",
        });
        return;
      }

      const responce = await data.json();
      if (responce.success) {
        const result = await stripe?.redirectToCheckout({
          sessionId: responce.id
        })
        if (result?.error) {
          toast({
            title: "Error occurred!",
          });
          return;
        }
      } else {
        toast({
          title: responce.message,
        });
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Error occurred!",
      });
    }
  }, [email]);

  const getBasicBundle = useCallback(async () => {
    await startstripesession("BASIC", 29);
  }, [startstripesession]);

  const getProBundle = useCallback(async () => {
    await startstripesession("PRO", 49);
  }, [startstripesession]);

  return (
    <div className="min-h-screen">
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">

          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Choose a Bundle</h2>

            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-0">

            <div className="w-full rounded-lg bg-gray-800 p-6 sm:w-1/2 sm:rounded-r-none sm:p-8 lg:w-1/3">
              <div className="mb-4">
                <h3 className="text-2xl font-semibold text-gray-100 sm:text-3xl">Basic Bundle</h3>
                <p className="text-gray-300">Filter</p>
              </div>

              <div className="mb-4 space-x-2">
                <span className="text-4xl font-bold text-gray-100">₹29</span>
                <span className="text-2xl text-gray-300 line-through">₹49</span>
              </div>

              <ul className="mb-6 space-y-2 text-gray-300">
                {basicFeatures?.map((item, ind) => {
                  return <li key={ind} className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>

                    <span>{item}</span>
                  </li>
                })}
              </ul>

              <button onClick={getBasicBundle} className="block w-full rounded-lg bg-gray-500 px-8 py-3 text-center text-sm font-semibold text-gray-100 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-600 focus-visible:ring active:text-gray-300 md:text-base">Get the Basic Bundle</button>
            </div>
            <div className="w-full rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-400 p-6 shadow-xl sm:w-1/2 sm:p-8">
              <div className="mb-4 flex flex-col items-start justify-between gap-4 lg:flex-row">
                <div>
                  <h3 className="text-2xl font-semibold text-white sm:text-3xl">Pro Bundle</h3>
                  <p className="text-indigo-100">Filter + Location</p>
                </div>

                <span className="order-first inline-block rounded-full bg-indigo-200 bg-opacity-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white lg:order-none">Best value</span>
              </div>

              <div className="mb-4 space-x-2">
                <span className="text-4xl font-bold text-white">₹49</span>
                <span className="text-2xl text-indigo-100 line-through">₹89</span>
              </div>

              <ul className="mb-6 space-y-2 text-indigo-100">
                {proFeatures?.map((item, ind) => {
                  return <li key={ind} className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>

                    <span>{item}</span>
                  </li>
                })}
              </ul>

              <button onClick={getProBundle} className="block w-full rounded-lg bg-indigo-200 bg-opacity-50 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-300 focus-visible:ring active:bg-indigo-400 md:text-base">Get the Pro Bundle</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
