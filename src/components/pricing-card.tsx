import { Check } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline";
  highlighted?: boolean;
  disabled?: boolean;
}

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  highlighted = false,
  disabled,
}: PricingCardProps) {
  return (
    <Card
      className={`${
        highlighted
          ? "border-purple-300 bg-white shadow-lg shadow-purple-100"
          : "border-gray-200 bg-white hover:border-gray-300"
      } relative overflow-hidden transition-all ${disabled && "cursor-not-allowed grayscale"}`}
    >
      {highlighted && (
        <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
      )}

      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <div className="mt-2 flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">{price}</span>
          {period && <span className="ml-1 text-gray-500">{period}</span>}
        </div>
        <p className="mt-2 text-gray-600">{description}</p>
      </CardHeader>

      <CardContent>
        <ul className="min-h-36 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          disabled={disabled}
          className={`w-full ${
            buttonVariant === "default"
              ? "bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white hover:opacity-90"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
          variant={buttonVariant}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
