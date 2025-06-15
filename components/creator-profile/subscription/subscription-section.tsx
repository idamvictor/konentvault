"use client";

import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { SubscriptionButton } from "../ui/subscription-button";

interface SubscriptionBundle {
  duration: string;
  discount: string;
  price: string;
}

interface SubscriptionSectionProps {
  monthlyPrice: string;
  bundles?: SubscriptionBundle[];
}

export function SubscriptionSection({
  monthlyPrice,
  bundles,
}: SubscriptionSectionProps) {
  const [showBundles, setShowBundles] = useState(false);

  return (
    <div className="px-4 py-6 bg-white border-t border-gray-100">
      <div className="space-y-4">
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-3">
            SUBSCRIPTION
          </h3>
          <SubscriptionButton price={monthlyPrice} />
        </div>

        {bundles && bundles.length > 0 && (
          <div>
            <button
              onClick={() => setShowBundles(!showBundles)}
              className="flex items-center justify-between w-full text-gray-500 text-sm font-medium mb-3"
            >
              SUBSCRIPTION BUNDLES
              <ChevronUp
                className={`h-4 w-4 transition-transform ${
                  showBundles ? "rotate-180" : ""
                }`}
              />
            </button>

            {showBundles && (
              <div className="space-y-3">
                {bundles.map((bundle, index) => (
                  <SubscriptionButton
                    key={index}
                    price={bundle.price}
                    discount={bundle.discount}
                    variant="bundle"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
