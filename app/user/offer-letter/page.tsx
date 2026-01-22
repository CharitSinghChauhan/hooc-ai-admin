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
import { Controller, useForm, useWatch } from "react-hook-form";
import z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { pdf } from "@react-pdf/renderer";
import { DatePickerInput } from "@/components/date-picker";
import PdfTemplateUnpaid from "./templates/pdf-template-unpaid";
import PdfTemplatePaid from "./templates/pdf-template-paid";

const formSchema = z
  .object({
    fullname: z.string().min(1, "Fullname is required"),
    email: z.email(),
    DOJ: z.date({ error: "Date of Joining is required" }),
    till_date: z.date({ error: "Till date is required" }),
    paymentType: z.enum(["stipend", "unpaid"], {
      error: "Payment type is required",
    }),
    fixed: z.number().positive().optional(),
    variable: z.number().positive().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentType === "stipend") {
      if (!data.fixed || data.fixed <= 0) {
        ctx.addIssue({
          // TODO : fix
          code: z.ZodIssueCode.custom,
          message: "Fixed stipend is required when payment type is stipend",
          path: ["fixed"],
        });
      }
      if (!data.variable || data.variable < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Variable stipend is required when payment type is stipend",
          path: ["variable"],
        });
      }
    }
  });

const SignUpPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "Charit Singh Chauhan",
      email: "charitsinghchauhan@gmail.com",
      paymentType: "stipend",
      DOJ: new Date(),
      till_date: new Date(),
      variable: 1000,
      fixed: 2000,
    },
  });

  const paymentType = useWatch({
    control: form.control,
    name: "paymentType",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const Template =
        values.paymentType === "stipend" ? PdfTemplatePaid : PdfTemplateUnpaid;
      const blob = await pdf(<Template data={values} />).toBlob();
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
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <DatePickerInput
                        title="Date of Joining"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="till_date"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <DatePickerInput
                        title="Valid Till"
                        value={field.value}
                        onChange={field.onChange}
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
                  <div className="flex gap-4">
                    <Controller
                      name="fixed"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            type="number"
                            placeholder="Fixed stipend"
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
                    <Controller
                      name="variable"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            type="number"
                            placeholder="variable stipend"
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
                  </div>
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
