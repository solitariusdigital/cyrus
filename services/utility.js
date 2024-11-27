export function convertNumber(number) {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function fourGenerator() {
  return Math.floor(1000 + Math.random() * 9000);
}

export function sixGenerator() {
  return Math.floor(100000 + Math.random() * 900000);
}

export function convertDate(date, type) {
  if (type === "fa") {
    return new Date(date).toLocaleDateString("fa-IR");
  } else {
    return new Date(date).toLocaleDateString("en-US");
  }
}

export function abbreviateNumber(num) {
  return new Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
}

export function toFarsiNumber(number) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number
    .toString()
    .split("")
    .map((x) => farsiDigits[x])
    .join("");
}

export function toEnglishNumber(number) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number
    .split("")
    .map((x) => farsiDigits.indexOf(x)) // Find the index of the Farsi digit
    .join("");
}

export function isEnglishNumber(str) {
  return Boolean(str.match(/^[A-Za-z0-9]*$/));
}

export function getCurrentDate(isYesterday = false) {
  const now = new Date();
  if (isYesterday) {
    now.setDate(now.getDate() - 1);
  }
  const date = now.toLocaleDateString("fa-IR", {
    timeZone: "Asia/Tehran",
  });
  return date;
}

export function onlyLettersAndNumbers(str) {
  return Boolean(str.match(/^[A-Za-z0-9]*$/));
}

// upload media into s3 bucket
export async function uploadMedia(
  media,
  mediaId,
  mediaFolder,
  subFolder,
  format
) {
  const file = media;
  const res = await fetch(
    `/api/upload?file=${mediaFolder}/${subFolder}/${mediaId}${format}`
  );
  const { url, fields } = await res.json();

  const formData = new FormData();
  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value);
  });

  await fetch(url, {
    method: "POST",
    body: formData,
  });
}

export function replaceSpacesAndHyphens(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      result += "-";
    } else if (str[i] === "-") {
      result += " ";
    } else {
      result += str[i];
    }
  }
  return result;
}

export function sliceString(string, number) {
  return string.slice(0, number).split(" ").slice(0, -1).join(" ") + "...";
}

export function areAllStatesValid(states) {
  for (const state of states) {
    const values = Object.values(state);
    for (const value of values) {
      if (value === "") {
        return false;
      }
    }
  }
  return true;
}

export function validateEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export function extractParagraphs(text) {
  return text
    .split(/-{3,}|\n\n+/)
    .filter((paragraph) => paragraph.trim() !== "");
}
