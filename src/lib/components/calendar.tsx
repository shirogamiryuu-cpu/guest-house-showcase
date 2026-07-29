"use client";

import * as React from "react";
import { DayPicker, getDefaultClassNames, DayButton } from "react-day-picker";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../components/button";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames() as Record<string, string>;

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background p-3 rounded-md [--cell-size:2.25rem]",
        className
      )}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),

        months: cn(
          "flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex flex-col gap-4", defaultClassNames.month),

        month_caption: cn(
          "flex items-center justify-center relative h-10",
          defaultClassNames.month_caption
        ),

        caption_label: cn(
          "text-sm font-medium select-none",
          defaultClassNames.caption_label
        ),

        nav: cn(
          "absolute inset-x-0 top-0 flex items-center justify-between",
          defaultClassNames.nav
        ),

        nav_button: cn(
          "h-(--cell-size) w-(--cell-size) flex items-center justify-center rounded-md hover:bg-accent",
          defaultClassNames.nav_button
        ),

        table: "w-full border-collapse",

        head_row: "flex",
        head_cell:
          "text-muted-foreground flex-1 text-[0.8rem] font-normal select-none",

        row: "flex w-full mt-2",

        cell: cn(
          "relative flex-1 p-0 text-center aspect-square",
          defaultClassNames.cell
        ),

        day: cn(
          "group/day relative flex h-full w-full items-center justify-center rounded-md text-sm font-normal select-none",
          "hover:bg-accent",
          defaultClassNames.day
        ),

        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary",

        day_today: "border border-accent rounded-md",

        day_outside: "text-muted-foreground opacity-50",

        day_disabled: "text-muted-foreground opacity-30",

        range_start:
          "bg-primary text-primary-foreground rounded-l-md",

        range_middle:
          "bg-accent text-accent-foreground rounded-none",

        range_end:
          "bg-primary text-primary-foreground rounded-r-md",

        ...classNames,
      } as Record<string, string>}
      components={{
        IconLeft: ({ className, ...props }: React.ComponentProps<
          typeof ChevronLeftIcon
        >) => (
          <ChevronLeftIcon className={cn("h-4 w-4", className)} {...props} />
        ),

        IconRight: ({ className, ...props }: React.ComponentProps<
          typeof ChevronRightIcon
        >) => (
          <ChevronRightIcon className={cn("h-4 w-4", className)} {...props} />
        ),

        DayButton: CalendarDayButton,

        ...components,
      } as React.ComponentProps<typeof DayPicker>["components"]}
      {...props}
    />
  );
}

/* -----------------------------
   Custom Day Button
------------------------------ */

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus();
    }
  }, [modifiers.focused]);

  const isSingleSelected =
    modifiers.selected &&
    !modifiers.range_start &&
    !modifiers.range_end &&
    !modifiers.range_middle;

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toISOString()}
      data-selected-single={isSingleSelected}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "h-full w-full flex items-center justify-center text-sm font-normal",
        "group-data-[focused=true]/day:ring-2 group-data-[focused=true]/day:ring-ring/50",
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground",
        "data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground",
        "data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground",
        "data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground",
        className
      )}
      {...props}
    >
      {day.date.getDate()}
    </Button>
  );
}