import { Button } from "@/components/ui/button";
import { IEvent } from "@/lib/database/models/event.model";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  const onCheckout = async () => {
    console.log("Checkout");
  };
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/api/checkout_sessions", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);
  const options = { fetchClientSecret };

  return (
    <>
      <div id="checkout">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
      <form action={onCheckout} method="POST">
        <Button type="submit" role="link" size="lg" className="button sm:w-fit">
          {event.isFree ? "Get ticket" : "Buy ticket"}
        </Button>
      </form>
    </>
  );
};

export default Checkout;
