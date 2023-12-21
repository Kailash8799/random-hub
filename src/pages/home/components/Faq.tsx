import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <>
      <div>
        <h1 className="text-black text-center mt-10 font-bold text-6xl">
          FAQs
        </h1>
      </div>
      <div className="lg:mx-32 sm:mx-14 mx-5">
        <Accordion type="multiple"  className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="items-start text-left">
              What Unveils the Magic of RandomHub?
            </AccordionTrigger>
            <AccordionContent>
              Monkey refers to a world-leading social product designed to offer
              a unique social experience. While "monkey" is a term that also
              denotes animals like primates in English, in this context, we
              specifically refer to an engaging social platform. This intriguing
              nomenclature simultaneously reflects the product's liveliness and
              its nature as a social medium.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="items-start text-left">
              What Makes RandomHub Unique in Social Networking?
            </AccordionTrigger>
            <AccordionContent>
              Monkey sets itself apart by prioritizing authentic face-to-face
              interactions through real-time 1-on-1 video chats. This approach
              goes beyond conventional text-based conversations, allowing users
              to establish immediate and meaningful connections with others.
              This distinctive emphasis on engaging in random video chats sets
              Monkey apart from other social networking platforms, creating an
              exciting and genuine social experience.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="items-start text-left" >
              Why Choose RandomHub for Engaging with New Connections?
            </AccordionTrigger>
            <AccordionContent>
              Monkey offers a feature-rich platform, akin to well-established
              social chat platforms like Omegle, OmeTV, Chatroulette, and
              AzarLive. What truly sets Monkey apart is its unwavering
              commitment to excellence in social networking. It aims to provide
              the most polished alternative, emphasizing user experience,
              safety, and the opportunity to engage in lively conversations,
              connecting you with strangers from around the world. With Monkey,
              you can easily talk to strangers and make new connections.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="items-start text-left">
              Can I Use RandomHub Anytime and Anywhere?
            </AccordionTrigger>
            <AccordionContent>
              Monkey offers the best of both worlds, allowing users to
              seamlessly connect with new people using its mobile app or
              website. Whether you're on the move or at your computer, Monkey's
              adaptability ensures a hassle-free experience for everyone.
              Additionally, Monkey's broad accessibility and focus on
              spontaneous video chats provide you with the opportunity to
              interact freely with others, no matter the time or location, while
              ensuring your safety.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="items-start text-left">Can I use RandomHub for free?</AccordionTrigger>
            <AccordionContent>
              Absolutely! Monkey is available for free download on the Google
              Play Store, and you can enjoy its essential features, including
              random chat and video calls, without any charges. While the core
              features are accessible to all users without cost, we also offer
              optional in-app purchases for premium features. These premium
              options are designed to enhance your social experience and provide
              you with even more ways to connect and interact on Monkey.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
