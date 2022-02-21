import { browser } from "$app/env";

function isToday(someDate) {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
}

export function isOverdue(someDate) {
  return someDate - new Date() < 0;
}

export function formatDueDate(date) {
  if (isToday(date)) {
    return `Today, ${date.toLocaleDateString(
      browser ? navigator.language : "en-UK",
      {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }
    )}`;
  } else {
    return date.toLocaleDateString(browser ? navigator.language : "en-UK", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}
