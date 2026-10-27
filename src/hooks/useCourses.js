import { useQuery } from "@tanstack/react-query";

// The Excel file lives in /public so it is served as a static file.
// To update the courses, just replace public/CSE_course-list.xlsx.
const EXCEL_URL = `${import.meta.env.BASE_URL}CSE_course-list.xlsx`;

// Column positions in the sheet:
// 0 Sl.No | 1 Old code | 2 New code | 3 Name | 4 L-T-P-C | 5 Senate meeting
// 6 Proposed level (UG/PG) | 7 Level of the code | 8 Remarks
const FIRST_DATA_ROW = 2; // rows 0-1 are the title and header rows

const clean = (v) =>
  v === null || v === undefined || v === ""
    ? ""
    : String(v).replace(/\s+/g, " ").trim();

const firstDigit = (code) => {
  const m = /(\d)\d\d/.exec(code || "");
  return m ? Number(m[1]) : null;
};

const LTPC_PATTERN = /^[\d.]+-[\d.]+-[\d.]+-[\d.]+$/;

function getLevel(levelText, codeLevel, newCode, oldCode) {
  const l = levelText.toUpperCase();
  if (l.includes("PG")) return "PG";
  if (l.includes("UG")) return "UG";

  // Sheet doesn't say UG/PG: fall back to the level digit of the code
  const digit =
    codeLevel !== "" && !Number.isNaN(Number(codeLevel))
      ? Math.trunc(Number(codeLevel))
      : firstDigit(newCode) ?? firstDigit(oldCode.split("/")[0]);

  return digit !== null && digit <= 4 ? "UG" : "PG";
}

export function parseCourseRows(rows) {
  return rows
    .slice(FIRST_DATA_ROW)
    .map((r) => {
      const name = clean(r[3]);
      if (!name || name.toLowerCase() === "name of course") return null;

      const newCode = clean(r[2]);
      let oldCode = clean(r[1]);
      if (oldCode === "CS") oldCode = ""; // incomplete code in the sheet

      let ltpc = clean(r[4]);
      if (!LTPC_PATTERN.test(ltpc)) ltpc = ""; // e.g. stray "32.0"

      let remarks = clean(r[8]);
      if (LTPC_PATTERN.test(remarks)) remarks = ""; // credit values, not a remark

      return {
        newCode,
        oldCode,
        name,
        ltpc,
        level: getLevel(clean(r[6]), clean(r[7]), newCode, oldCode),
        remarks,
      };
    })
    .filter(Boolean);
}

async function fetchCourses() {
  const res = await fetch(EXCEL_URL);
  if (!res.ok) {
    throw new Error(`Could not load course list (${res.status})`);
  }
  const buffer = await res.arrayBuffer();

  // Loaded on demand so the Excel parser isn't part of the main bundle
  const XLSX = await import("xlsx");
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
    raw: true,
  });

  return parseCourseRows(rows);
}

export default function useCourses() {
  return useQuery({
    queryKey: ["courses-excel"],
    queryFn: fetchCourses,
    staleTime: 1000 * 60 * 60,
  });
}