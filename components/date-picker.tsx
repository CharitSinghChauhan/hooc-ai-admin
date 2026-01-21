"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export interface DatePickerInputProps {
  title: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

export function DatePickerInput({
  title,
  value,
  onChange,
}: DatePickerInputProps) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(value);
  const [inputValue, setInputValue] = React.useState(formatDate(value));

  // Sync input value when date prop changes
  React.useEffect(() => {
    setInputValue(formatDate(value));
  }, [value]);

  return (
    <Field className="mx-auto w-48">
      <FieldLabel htmlFor="date-required">{title}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="date-required"
          value={inputValue}
          placeholder="Select date"
          onChange={(e) => {
            const newValue = e.target.value;
            setInputValue(newValue);
            const date = new Date(newValue);
            if (isValidDate(date)) {
              onChange?.(date);
              setMonth(date);
            }
          }}
          onBlur={() => {
            // Reset to formatted date on blur if invalid or just to standardize
            setInputValue(formatDate(value));
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <InputGroupButton
                id="date-picker"
                variant="ghost"
                size="icon-xs"
                aria-label="Select date"
              >
                <CalendarIcon />
                <span className="sr-only">Select date</span>
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={value}
                month={month}
                onMonthChange={setMonth}
                onSelect={(date) => {
                  onChange?.(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
