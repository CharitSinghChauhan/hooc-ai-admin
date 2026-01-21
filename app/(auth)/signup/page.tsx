"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { DatePickerInput } from "@/components/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { pdf } from "@react-pdf/renderer";
import PdfTemplate from "./pdf-template";

const formSchema = z
  .object({
    fullname: z.string().min(1, "Fullname is required"),
    email: z.email(),
    DOJ: z.date(),
    till_date: z.string().optional(),
    paymentType: z.enum(["stipend", "unpaid"]),
    amount: z.number().positive().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentType === "stipend") {
      if (!data.amount || data.amount <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Amount is required for stipend",
          path: ["amount"],
        });
      }
    }
  });

const SignUpPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      DOJ: new Date(),
      paymentType: "stipend",
    },
  });

  const paymentType = form.watch("paymentType");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const blob = await pdf(<PdfTemplate data={values} />).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card className="w-full sm:max-w-md">
        <CardContent>
          <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="fullname"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id="form-rhf-input-fullname"
                      aria-invalid={fieldState.invalid}
                      placeholder="Fullname"
                      autoComplete="name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id="form-rhf-input-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Email"
                      autoComplete="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="flex justify-center items-center gap-2">
                <Controller
                  name="DOJ"
                  control={form.control}
                  render={({ field }) => (
                    <DatePickerInput
                      title="Date of Joining"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                <Controller
                  name="till_date"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="w-[50%] mx-auto"
                    >
                      <FieldLabel htmlFor="till_date">
                        Valid Till (Optional)
                      </FieldLabel>
                      <Input
                        {...field}
                        id="till_date"
                        aria-invalid={fieldState.invalid}
                        placeholder="DD/MM/YYYY"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-6 px-2 py-2">
                  <Controller
                    name="paymentType"
                    control={form.control}
                    render={({ field }) => (
                      <>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="stipend"
                            checked={field.value === "stipend"}
                            onCheckedChange={() => field.onChange("stipend")}
                          />
                          <FieldLabel
                            htmlFor="stipend"
                            className="font-normal m-0 p-0 cursor-pointer"
                          >
                            Stipend
                          </FieldLabel>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="unpaid"
                            checked={field.value === "unpaid"}
                            onCheckedChange={() => field.onChange("unpaid")}
                          />
                          <FieldLabel
                            htmlFor="unpaid"
                            className="font-normal m-0 p-0 cursor-pointer"
                          >
                            Unpaid
                          </FieldLabel>
                        </div>
                      </>
                    )}
                  />
                </div>

                {paymentType === "stipend" && (
                  <Controller
                    name="amount"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          type="number"
                          placeholder="Amount"
                          autoComplete="off"
                          aria-invalid={fieldState.invalid}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? undefined : Number(value),
                            );
                          }}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                )}
              </div>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="form">
              Print
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
