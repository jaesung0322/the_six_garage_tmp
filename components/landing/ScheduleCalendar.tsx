"use client";

import { useMemo, useState } from "react";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// 6주 × 7일 = 42칸 고정 (레이아웃 안정)
function getCalendarCells(year: number, month: number) {
  const startWeekday = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLast = new Date(year, month, 0).getDate();

  const cells: Array<{ date: Date; inMonth: boolean }> = [];

  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({
      date: new Date(year, month - 1, prevLast - i),
      inMonth: false,
    });
  }
  for (let d = 1; d <= lastDate; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  while (cells.length < 42) {
    const last = cells[cells.length - 1].date;
    cells.push({
      date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1),
      inMonth: false,
    });
  }
  return cells;
}

export function ScheduleCalendar() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const cells = useMemo(
    () => getCalendarCells(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const isCurrentMonth =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const goPrev = () => {
    if (isCurrentMonth) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
            예약 스케줄
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-600">
            원하시는 날짜를 선택하시면 가능한 시간대를 확인하실 수 있습니다.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
          {/* 달력 */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-zinc-200">
            <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-3 py-3 sm:px-5 sm:py-4">
              <button
                type="button"
                onClick={goPrev}
                disabled={isCurrentMonth}
                aria-label="이전 달"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-white hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:text-zinc-300 disabled:hover:bg-transparent"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 18l-6-6 6-6"
                  />
                </svg>
              </button>
              <p
                aria-live="polite"
                className="text-base font-semibold text-zinc-900 sm:text-lg"
              >
                {viewYear}년 {viewMonth + 1}월
              </p>
              <button
                type="button"
                onClick={goNext}
                aria-label="다음 달"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-white hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 6l6 6-6 6"
                  />
                </svg>
              </button>
            </div>

            <div className="px-2 pb-3 pt-2 sm:px-4 sm:pb-4 sm:pt-3">
              <div className="grid grid-cols-7">
                {WEEKDAYS.map((w, i) => (
                  <div
                    key={w}
                    className={`py-2 text-center text-xs font-semibold sm:text-sm ${
                      i === 0
                        ? "text-rose-500"
                        : i === 6
                          ? "text-blue-500"
                          : "text-zinc-500"
                    }`}
                  >
                    {w}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                {cells.map(({ date, inMonth }) => {
                  const day = date.getDay();
                  const isToday = isSameDay(date, today);
                  const isSelected = selectedDate
                    ? isSameDay(date, selectedDate)
                    : false;
                  const isPast = date < today;
                  const disabled = !inMonth || isPast;

                  const baseColor =
                    day === 0
                      ? "text-rose-500"
                      : day === 6
                        ? "text-blue-500"
                        : "text-zinc-700";

                  return (
                    <button
                      key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                      type="button"
                      disabled={disabled}
                      onClick={() => handleSelectDate(date)}
                      aria-pressed={isSelected}
                      aria-label={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
                      className={[
                        "relative flex aspect-square items-center justify-center rounded-lg text-sm transition-all sm:text-base",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1",
                        disabled
                          ? "cursor-not-allowed text-zinc-300"
                          : isSelected
                            ? "bg-brand font-semibold text-brand-foreground shadow-sm hover:opacity-95"
                            : isToday
                              ? `bg-brand/10 font-semibold ${baseColor} hover:bg-brand/15`
                              : `${baseColor} hover:bg-zinc-100`,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <span>{date.getDate()}</span>
                      {isToday && !isSelected && (
                        <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand sm:bottom-1.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 시간대 패널 */}
          <div className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-zinc-200 sm:p-6">
            {selectedDate ? (
              <>
                <p className="text-sm text-zinc-500">선택한 날짜</p>
                <p className="mt-1 text-lg font-bold text-zinc-900 sm:text-xl">
                  {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}
                  월 {selectedDate.getDate()}일{" "}
                  <span className="text-zinc-500">
                    ({WEEKDAYS[selectedDate.getDay()]})
                  </span>
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <p className="text-sm font-semibold text-zinc-900">
                    가능한 시간
                  </p>
                  {selectedTime && (
                    <span className="text-xs font-medium text-brand">
                      {selectedTime} 선택됨
                    </span>
                  )}
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
                  {TIME_SLOTS.map((t) => {
                    const active = selectedTime === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        aria-pressed={active}
                        className={[
                          "rounded-md border px-2 py-2 text-sm font-medium transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                          active
                            ? "border-brand bg-brand text-brand-foreground"
                            : "border-zinc-200 text-zinc-700 hover:border-brand hover:bg-brand/5 hover:text-brand",
                        ].join(" ")}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  disabled={!selectedTime}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
                >
                  이 시간으로 예약하기
                </button>
              </>
            ) : (
              <div className="flex h-full min-h-[220px] flex-col items-center justify-center text-center">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3M16 7V3M3 11h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-zinc-900">
                  날짜를 선택해주세요
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  달력에서 원하시는 날짜를 클릭하시면
                  <br />
                  예약 가능한 시간대가 표시됩니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
