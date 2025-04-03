"use client";
import { AlertCircle, Check, Plus } from "lucide-react";
import { useSession } from "next-auth/react";

import { useState } from "react";
import useMyTranslation from "~/i18n/translation-client";
import { ModalDialog } from "./Modal";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// Define the form schema with validation
// const formSchema = z.object({
//   amount: z
//     .string()
//     .min(1, { message: "Amount is required" })
//     .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
//       message: "Amount must be a positive number",
//     }),
//   paymentMethod: z.enum(["credit_card", "paypal", "crypto"], {
//     required_error: "Please select a payment method",
//   }),
//   cardNumber: z
//     .string()
//     .optional()
//     .refine(
//       (val, ctx) => {
//         if (
//           ctx.path[0] === "cardNumber" &&
//           ctx.data.paymentMethod === "credit_card"
//         ) {
//           return val && val.length > 0;
//         }
//         return true;
//       },
//       { message: "Card number is required" },
//     ),
//   cardExpiry: z
//     .string()
//     .optional()
//     .refine(
//       (val, ctx) => {
//         if (
//           ctx.path[0] === "cardExpiry" &&
//           ctx.data.paymentMethod === "credit_card"
//         ) {
//           return val && val.length > 0;
//         }
//         return true;
//       },
//       { message: "Expiry date is required" },
//     ),
//   cardCvc: z
//     .string()
//     .optional()
//     .refine(
//       (val, ctx) => {
//         if (
//           ctx.path[0] === "cardCvc" &&
//           ctx.data.paymentMethod === "credit_card"
//         ) {
//           return val && val.length > 0;
//         }
//         return true;
//       },
//       { message: "CVC is required" },
//     ),
// });

// Define the credit packages
const creditPackages = [
  { value: "10", label: "10 Credits", price: "$5.99" },
  { value: "50", label: "50 Credits", price: "$24.99" },
  { value: "100", label: "100 Credits", price: "$44.99" },
  { value: "custom", label: "Custom Amount", price: "Custom" },
];

function UserCredits() {
  const { data } = useSession();
  const [showModal, setShowModal] = useState(false);
  const { t } = useMyTranslation("common.user-credits");
  const handleOpenModal = () => setShowModal(true);
  // const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"input" | "confirm" | "success" | "error">(
    "input",
  );
  const [selectedPackage] = useState<string | null>(null);
  const [customAmount] = useState("");

  // Initialize form
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     amount: "",
  //     paymentMethod: "credit_card",
  //   },
  // });

  // Handle form submission
  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   if (step === "input") {
  //     // Move to confirmation step
  //     setStep("confirm");
  //   } else if (step === "confirm") {
  //     try {
  //       // Simulate API call to process payment
  //       await new Promise((resolve) => setTimeout(resolve, 1500));

  //       // Show success message
  //       setStep("success");

  //       // Reset form after 3 seconds and close modal
  //       setTimeout(() => {
  //         form.reset();
  //         setStep("input");
  //         setOpen(false);
  //       }, 3000);
  //     } catch (error) {
  //       // Show error message
  //       setStep("error");
  //     }
  //   }
  // };

  // Handle package selection
  // const handlePackageSelect = (value: string) => {
  //   setSelectedPackage(value);
  //   if (value !== "custom") {
  //     form.setValue("amount", value);
  //     setCustomAmount("");
  //   } else {
  //     form.setValue("amount", customAmount);
  //   }
  // };

  // // Handle custom amount change
  // const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCustomAmount(e.target.value);
  //   if (selectedPackage === "custom") {
  //     form.setValue("amount", e.target.value);
  //   }
  // };

  // // Reset the form and state when the modal is closed
  // const handleOpenChange = (newOpen: boolean) => {
  //   if (!newOpen) {
  //     form.reset();
  //     setStep("input");
  //     setSelectedPackage(null);
  //     setCustomAmount("");
  //   }
  //   setOpen(newOpen);
  // };

  return (
    <>
      <span className="hidden items-center gap-2 md:inline-flex">
        {t.rich("your-credit-amount", {
          amount: () => (
            <span className="flex items-center justify-center rounded-full bg-slate-500 px-2 py-0.5 text-white">
              {data?.user?.credits ?? 0}
            </span>
          ),
        })}
      </span>
      <span className="flex items-center justify-center rounded-full bg-slate-500 px-2 py-0.5 text-white md:hidden">
        {t.rich("your-credit-amount-mobile", {
          amount: data?.user?.credits ?? 0,
        })}
      </span>

      {/* Your credits{" "} */}
      <Button
        size={"sm"}
        className="relative md:ml-4"
        onClick={handleOpenModal}
      >
        <Plus />
        <span className="hidden md:inline">{t("add-credits")}</span>
      </Button>

      {/* <div>
        <pre>{JSON.stringify({ user: data?.user }, null, 2)}</pre>
      </div> */}

      <ModalDialog
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={t("title")}
      >
        <p className="my-2">{t("description")}</p>

        <form>
          {step === "input" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                {creditPackages.map((pkg) => (
                  <div
                    key={pkg.value}
                    className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                      selectedPackage === pkg.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    // onClick={() => handlePackageSelect(pkg.value)}
                  >
                    <div className="font-medium">{pkg.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {pkg.price}
                    </div>
                  </div>
                ))}

                {selectedPackage === "custom" && (
                  <div className="pt-2">
                    <label
                      htmlFor="custom-amount"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("custom-amount")}
                      {/* Custom Amount */}
                    </label>
                    <Input
                      id="custom-amount"
                      type="number"
                      min="1"
                      placeholder={t("custom-amount-placeholder")}
                      value={customAmount}
                      // onChange={handleCustomAmountChange}
                      className="mt-1.5"
                    />
                  </div>
                )}

                {/* <FormField
                  // control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="credit_card"
                              id="credit_card"
                            />
                            <Label
                              htmlFor="credit_card"
                              className="flex items-center gap-2"
                            >
                              <CreditCard className="h-4 w-4" /> Credit Card
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label htmlFor="paypal">PayPal</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="crypto" id="crypto" />
                            <Label htmlFor="crypto">Cryptocurrency</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>

              <div className="flex justify-end gap-2 py-5 text-right">
                <Button
                  // disabled
                  type="button"
                  variant="outline"
                  onClick={() => setStep("input")}
                >
                  {t("back-button")}
                  {/* Back */}
                </Button>
                <Button
                // disabled
                // onClick={form.handleSubmit(onSubmit)}
                >
                  {t("confirm-button")}
                  {/* Confirm Purchase */}
                </Button>
              </div>
            </>
          )}

          {step === "success" && (
            <>
              <div className="space-y-4 py-4">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-4 rounded-full bg-green-100 p-3">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {/* Payment Successful! */}
                    {t("success-info")}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {selectedPackage === "custom"
                      ? `${customAmount} credits`
                      : `${selectedPackage} credits`}{" "}
                    {/* have been added to your account. */}
                  </p>
                </div>
              </div>
            </>
          )}

          {step === "error" && (
            <div className="space-y-4 py-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  There was a problem processing your payment. Please try again.
                </AlertDescription>
              </Alert>
              {/* <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("input")}
                >
                  Back
                </Button>
                <Button onClick={() => setStep("input")}>Try Again</Button>
              </DialogFooter> */}
            </div>
          )}
        </form>
      </ModalDialog>
    </>
  );
}

export default UserCredits;
