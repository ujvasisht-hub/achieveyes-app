import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateProcessGoalPeriods(deadline: Date, startDate: Date = new Date()) {
  const periods: { type: string; start: Date; end: Date; label: string }[] = [];
  const now = startDate;
  const totalDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  // Always include these periods
  periods.push({
    type: "24h",
    start: new Date(now),
    end: new Date(now.getTime() + 24 * 60 * 60 * 1000),
    label: "Next 24 hours",
  });

  periods.push({
    type: "48h",
    start: new Date(now.getTime() + 24 * 60 * 60 * 1000),
    end: new Date(now.getTime() + 48 * 60 * 60 * 1000),
    label: "Next 48 hours",
  });

  periods.push({
    type: "7d",
    start: new Date(now.getTime() + 48 * 60 * 60 * 1000),
    end: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
    label: "Next 7 days",
  });

  periods.push({
    type: "1m",
    start: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
    end: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
    label: "Next 1 month",
  });

  // Add additional periods based on total timeline
  if (totalDays > 90) {
    periods.push({
      type: "3m",
      start: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
      end: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000),
      label: "Next 3 months",
    });
  }

  if (totalDays > 180) {
    periods.push({
      type: "6m",
      start: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000),
      end: new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000),
      label: "Next 6 months",
    });
  }

  if (totalDays > 365) {
    periods.push({
      type: "1y",
      start: new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000),
      end: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000),
      label: "Next 1 year",
    });
  }

  // Final period to deadline
  const lastPeriod = periods[periods.length - 1];
  if (lastPeriod.end < deadline) {
    periods.push({
      type: "custom",
      start: lastPeriod.end,
      end: deadline,
      label: `Until deadline (${Math.ceil((deadline.getTime() - lastPeriod.end.getTime()) / (1000 * 60 * 60 * 24))} days)`,
    });
  }

  return periods;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}



