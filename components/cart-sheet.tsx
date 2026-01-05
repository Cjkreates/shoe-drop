"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingBag, Plus, Minus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { usePaystackPayment } from "react-paystack";
import { saveOrder } from "@/app/actions/save-order";

export const CartSheet = () => {
  const router = useRouter();
  const { items, isOpen, toggleCart, updateQuantity, removeItem, _hasHydrated, clearCart } = useCartStore();
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    useCartStore.persist.rehydrate();
    setMounted(true);
  }, []);

  if (!_hasHydrated) return null;

  // Calculate Total in KES (with auto-conversion for prices < 5000)
  const totalAmount = items.reduce((total, item) => {
    const convertedPrice = item.price < 5000 ? item.price * 130 : item.price;
    return total + convertedPrice * item.quantity;
  }, 0);

  // Configure Paystack
  const config = {
    reference: new Date().getTime().toString(),
    email: email.trim() || "user@example.com",
    amount: totalAmount * 100, // Paystack expects amount in Kobo/Cents (Multiply by 100)
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    currency: "KES",
  };

  // Initialize the Hook (must be called unconditionally)
  const initializePayment = usePaystackPayment(config);

  // Handle Success
  const onSuccess = async () => {
    try {
      // Save order to Supabase before clearing cart
      await saveOrder({
        email: email.trim() || "",
        amount: totalAmount,
        items,
      });
    } catch (err) {
      console.error("saveOrder failed", err);
    }

    clearCart();
    toggleCart(); // Close the drawer
    router.push("/success");
  };

  const onClose = () => {
    console.log("Payment closed");
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-lg bg-zinc-950 text-zinc-50 border-zinc-800 flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold uppercase text-zinc-50">
            MY CART ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <ShoppingBag className="w-16 h-16 text-zinc-700 mb-4" />
            <p className="text-zinc-400 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 my-4">
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
                      <p className="text-sm font-bold">{formatPrice(item.price)}</p>
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

            <div className="border-t border-zinc-800 pt-4 space-y-4 mt-auto">
              <div className="flex justify-between text-lg font-bold uppercase">
                <span>SUBTOTAL</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>

              {/* Email Input for Receipt */}
              <Input
                type="email"
                placeholder="Enter email for receipt"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-900 border-zinc-700 text-zinc-50 placeholder-zinc-500 focus:border-zinc-500 uppercase text-sm"
              />

              {/* THE FIXED BUTTON */}
              <Button
                className="w-full h-12 text-lg bg-zinc-50 hover:bg-zinc-200 text-zinc-950 font-bold uppercase rounded-none"
                disabled={!email.trim() || items.length === 0 || !mounted}
                onClick={() => {
                  if (mounted && email.trim()) {
                    initializePayment({ onSuccess, onClose });
                  }
                }}
              >
                PAY WITH M-PESA / CARD
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
