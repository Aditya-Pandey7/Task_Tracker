"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

interface DatePickerProps {
  dueDate?: string;
  time?: string;
  onDateChange?: (date: string | undefined) => void;
  onTimeChange?: (time: string | undefined) => void;
}

function DatePicker({ dueDate, time, onDateChange, onTimeChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  React.useEffect(() => {
    if (dueDate) {
      const parsedDate = new Date(dueDate);
      setDate(parsedDate);
    }
  }, [dueDate]);
  return (
    <FieldGroup className=" flex-row">
      <Field>
        <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker-optional"
              className="w-32 justify-between font-normal"
            >
              {format(dueDate ? new Date(dueDate) : new Date(), "PPP")}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              defaultMonth={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setOpen(false);
                if (onDateChange) {
                  onDateChange(selectedDate?.toISOString());
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field className="w-32">
        <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
        <Input
          type="time"
          id="time-picker-optional"
          step="1"
          defaultValue={
            time
              ? /^\d{2}:\d{2}(:\d{2})?$/.test(time)
                ? time.slice(0, 5)
                : format(new Date(time), "HH:mm")
              : undefined
          }
          onChange={(e) => {
            if (onTimeChange && e.target.value) {
              // Combine the time with a date to create a valid ISO date string
              const baseDate = date || new Date();
              const [hours, minutes] = e.target.value.split(":").map(Number);
              const newDate = new Date(baseDate);
              newDate.setHours(hours, minutes, 0, 0);
              onTimeChange(newDate.toISOString());
            }
          }}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </FieldGroup>
  );
}

export default DatePicker;
