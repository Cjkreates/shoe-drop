"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingBag, Plus, Minus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/utils";

export const CartSheet = () => {
  const router = useRouter();
  const { items, isOpen, toggleCart, updateQuantity, removeItem, _hasHydrated, clearCart } = useCartStore();
  const [email, setEmail] = useState("");
  const [PaystackHook, setPaystackHook] = useState<any>(null);

  useEffect(() => {
    useCartStore.persist.rehydrate();
    // Dynamically load Paystack only on client
    if (typeof window !== "undefined") {
      import("react-paystack").then((mod) => {
        setPaystackHook(() => mod.usePaystackPayment);
      });
    }
  }, []);

  if (!_hasHydrated) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const amount = subtotal * 100;

  const onSuccess = () => {
    clearCart();
    router.push("/success");
  };

  const onClose = () => {
    console.log("Payment closed");
  };

  const handleCheckout = () => {
    if (!email.trim() || !PaystackHook) return;
    
    const reference = `shoe-drop-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    const config = {
      reference,
      email: email.trim(),
      amount: amount,
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
      currency: "KES",
    };

    // This won't work because hooks can't be called conditionally
    // We need a different approach - use a separate component
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-lg bg-zinc-950 text-zinc-50 border-zinc-800">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold uppercase text-zinc-50">Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <ShoppingBag className="w-16 h-16 text-zinc-700 mb-4" />
            <p className="text-zinc-400 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-300px)] mt-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 pb-4 border-b border-zinc-800">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold uppercase text-sm mb-1">{item.name}</h3>
                      <p className="text-xs text-zinc-400 mb-2">Size: {item.size}</p>
                      <p className="text-sm font-bold">{formatCurrency(item.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, -1)}
                          className="w-6 h-6 flex items-center justify-center border border-zinc-700 hover:border-zinc-500 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, 1)}
                          className="w-6 h-6 flex items-center justify-center border border-zinc-700 hover:border-zinc-500 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-zinc-950 border-t border-zinc-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold uppercase">Subtotal</span>
                <span className="text-xl font-bold">{formatCurrency(subtotal)}</span>
              </div>
              <input
                type="email"
                placeholder="Enter email for receipt"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 px-4 py-3 bg-zinc-900 border border-zinc-700 text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 uppercase text-sm"
              />
              {PaystackHook && (
                <PaystackCheckoutButton
                  email={email}
                  amount={amount}
                  onSuccess={onSuccess}
                  onClose={onClose}
                  usePaystackPayment={PaystackHook}
                />
              )}
              {!PaystackHook && (
                <Button
                  disabled
                  className="w-full bg-zinc-50 text-zinc-950 hover:bg-zinc-200 font-bold uppercase rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  LOADING...
                </Button>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

const PaystackCheckoutButton = ({
  email,
  amount,
  onSuccess,
  onClose,
  usePaystackPayment,
}: {
  email: string;
  amount: number;
  onSuccess: () => void;
  onClose: () => void;
  usePaystackPayment: any;
}) => {
  const [paymentTrigger, setPaymentTrigger] = useState(0);

  const config = useMemo(
    () => ({
      reference: `shoe-drop-${Date.now()}-${Math.random().toString(36).substring(7)}-${paymentTrigger}`,
      email: email.trim() || "user@example.com",
      amount: amount,
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
      currency: "KES",
    }),
    [email, amount, paymentTrigger]
  );

  const initializePayment = usePaystackPayment(config);

  useEffect(() => {
    if (paymentTrigger > 0) {
      initializePayment({ onSuccess, onClose });
    }
  }, [paymentTrigger, initializePayment, onSuccess, onClose]);

  return (
    <Button
      onClick={() => {
        if (!email.trim()) return;
        setPaymentTrigger((prev) => prev + 1);
      }}
      disabled={!email.trim()}
      className="w-full bg-zinc-50 text-zinc-950 hover:bg-zinc-200 font-bold uppercase rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
    >
      PAY WITH M-PESA / CARD
    </Button>
  );
};
