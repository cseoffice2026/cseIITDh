import axios from "axios";
import Papa from "papaparse";
import { constant } from "../constant/constant";

const axiosInstance = axios.create({
	baseURL: constant.baseURL,
});

/**
 * Fetch News from Google Sheets CSV.
 */
export const getNews = async () => {
	try {
		const response = await axios.get(constant.newsSheetCSV, {
			responseType: "text",
		});

		return new Promise((resolve, reject) => {
			Papa.parse(response.data, {
				header: true,
				skipEmptyLines: true,
				transformHeader: (header) => header.trim().toLowerCase(),

				complete: (results) => {
					if (
						import.meta.env.DEV &&
						results.data.length > 0
					) {
						console.log(
							"Available News CSV columns:",
							Object.keys(results.data[0]),
						);
					}

					const transformedData = results.data
						.filter((row) =>
							Object.values(row).some(
								(value) => value && value.trim() !== "",
							),
						)
						.map((row) => {
							const getValue = (variations) => {
								for (const variation of variations) {
									const value = row[variation];

									if (value && value.trim() !== "") {
										return value.trim();
									}
								}

								return null;
							};

							const title =
								getValue([
									"title",
									"news title",
									"headline",
									"name",
								]) || "";

							const description =
								getValue([
									"description",
									"news description",
									"details",
									"content",
									"summary",
									"body",
								]) || "";

							const date = getValue([
								"date",
								"news date",
								"published date",
								"publish date",
								"datetime",
							]);

							const link = getValue([
								"link",
								"url",
								"news link",
								"article link",
								"read more",
							]);

							return {
								Title: title,
								date,
								description,
								link,
							};
						});

					resolve(transformedData);
				},

				error: (error) => {
					console.error("Error parsing News CSV:", error);
					reject(
						new Error(
							`Failed to parse News CSV: ${error.message}`,
						),
					);
				},
			});
		});
	} catch (error) {
		console.error(
			"Error fetching news from Google Sheets:",
			error,
		);

		return [];
	}
};

/**
 * Fetch Talks and Events from Google Sheets CSV.
 */
export const getTalksAndEvents = async () => {
	try {
		const response = await axios.get(
			constant.talksAndEventsSheetCSV,
			{
				responseType: "text",
			},
		);

		return new Promise((resolve, reject) => {
			Papa.parse(response.data, {
				header: true,
				skipEmptyLines: true,
				transformHeader: (header) => header.trim().toLowerCase(),

				complete: (results) => {
					if (
						import.meta.env.DEV &&
						results.data.length > 0
					) {
						console.log(
							"Available CSV columns:",
							Object.keys(results.data[0]),
						);
					}

					const transformedData = results.data
						.filter((row) =>
							Object.values(row).some(
								(value) => value && value.trim() !== "",
							),
						)
						.map((row) => {
							const getValue = (variations) => {
								for (const variation of variations) {
									const value = row[variation];

									if (value && value.trim() !== "") {
										return value.trim();
									}
								}

								return null;
							};

							const title =
								getValue([
									"title",
									"talk title",
									"event title",
									"seminar title",
									"name",
									"topic",
								]) || "";

							const speaker = getValue([
								"speaker",
								"speaker name",
								"presenter",
								"presenter name",
								"speaker/presenter",
							]);

							const designation = getValue([
								"designation",
								"speaker designation",
								"affiliation",
								"speaker affiliation",
								"position",
							]);

							const venue = getValue([
								"venue",
								"event venue",
								"location",
								"place",
								"room",
							]);

							const startDate = getValue([
								"start date",
								"startdate",
								"date",
								"event date",
							]);

							const endDate = getValue([
								"end date",
								"enddate",
								"date",
								"event date",
							]);

							const eventTime = getValue([
								"time",
								"event time",
								"timing",
								"date/time",
							]);

							const date = getValue([
								"date",
								"event date",
								"date/time",
								"datetime",
								"schedule",
							]);

							const description = getValue([
								"description",
								"event description",
								"details",
								"abstract",
								"summary",
								"notes",
							]);

							const links = getValue([
								"link",
								"event links",
							]);

							return {
								Title: title,
								Speaker: speaker,
								designation,
								venue,
								startDate: startDate || date,
								endDate: endDate || date,
								date: endDate || startDate || date,
								time: eventTime,
								sortingDate: endDate || startDate || date,
								description,
								links,
							};
						});

					resolve(transformedData);
				},

				error: (error) => {
					console.error("Error parsing CSV:", error);
					reject(
						new Error(`Failed to parse CSV: ${error.message}`),
					);
				},
			});
		});
	} catch (error) {
		console.error(
			"Error fetching talks and events from Google Sheets:",
			error,
		);

		return [];
	}
};

/**
 * Google Sheets integration for the Programmes section.
 *
 * The sheet is the single source of truth for non-PhD programme metadata and
 * course rows. Course names are never interpreted as programme names.
 */
const normalizeProgrammeHeader = (value) =>
	String(value ?? "")
		.replace(/^\uFEFF/, "")
		.trim()
		.toLowerCase()
		.replace(/[_-]+/g, " ")
		.replace(/[^a-z0-9\s/]/g, "")
		.replace(/\s+/g, " ");

const slugifyProgramme = (value) =>
	String(value ?? "")
		.toLowerCase()
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

/** Map known names and common aliases to the site's stable routes. */
export const getProgrammeKey = (value = "") => {
	const normalized = String(value ?? "")
		.toLowerCase()
		.replace(/[._-]+/g, " ")
		.replace(/[^a-z0-9\s/]/g, " ")
		.replace(/\s+/g, " ")
		.trim();

	if (
		/m\s*tech.*research|research.*m\s*tech|\bms\s+by\s+research\b|\bmfr\b/.test(
			normalized,
		)
	) {
		return "mtech-research";
	}
	if (/\bph\s*d\b|doctor(?:al|ate)?/.test(normalized)) return "phd";
	if (/\bm\s*tech\b|master\s+of\s+technology/.test(normalized)) return "mtech";
	if (/\bb\s*tech\b|bachelor\s+of\s+technology|undergraduate/.test(normalized)) {
		return "btech";
	}

	return null;
};

const getProgrammeSheetValue = (row, aliases) => {
	for (const alias of aliases) {
		const value = row[normalizeProgrammeHeader(alias)];
		if (value !== undefined && value !== null && String(value).trim() !== "") {
			return String(value).replace(/\s+/g, " ").trim();
		}
	}
	return "";
};

const programmeNameAliases = [
	"programme name",
	"program name",
	"name of the programme",
	"name of programme",
	"name of the program",
	"name of program",
	"programme offered",
	"program offered",
	"programme title",
	"program title",
	"academic programme",
	"academic program",
	"degree programme",
	"degree program",
	"programme",
	"program",
];

const extractProgrammeUrl = (value) => {
	const text = String(value ?? "").trim();
	if (!text) return "";

	const markdownMatch = text.match(/\[[^\]]*\]\((https?:\/\/[^)]+)\)/i);
	const urlMatch = text.match(/https?:\/\/[^\s)]+/i);
	const candidate = (markdownMatch?.[1] || urlMatch?.[0] || text).trim();

	if (/^https?:\/\//i.test(candidate)) {
		try {
			const parsed = new URL(candidate);
			return parsed.protocol === "http:" || parsed.protocol === "https:"
				? parsed.href
				: "";
		} catch {
			return "";
		}
	}

	// Allow same-site absolute paths only; reject protocol-relative URLs.
	if (candidate.startsWith("/") && !candidate.startsWith("//")) return candidate;
	return "";
};

/** Download and parse the one public CSV used by the Programmes section. */
const fetchAcademicSheetRows = async () => {
	if (!constant.academicProgramsSheetCSV) {
		throw new Error("The Academic Programmes Google Sheet CSV URL is not configured.");
	}

	const response = await axios.get(constant.academicProgramsSheetCSV, {
		responseType: "text",
		params: { _ts: Date.now() },
	});
	const csvText = String(response.data ?? "").trim();

	if (
		!csvText ||
		/<\s*!doctype\s+html|<\s*html[\s>]/i.test(csvText)
	) {
		throw new Error(
			"Google Sheets did not return CSV data. Make the sheet publicly readable or publish the tab to the web.",
		);
	}

	const parsed = Papa.parse(csvText, {
		header: true,
		skipEmptyLines: "greedy",
		transformHeader: normalizeProgrammeHeader,
	});

	if (parsed.errors.length > 0 && parsed.data.length === 0) {
		throw new Error(`Failed to parse the Academic Programmes Google Sheet: ${parsed.errors[0].message}`);
	}

	return parsed.data.filter((row) =>
		Object.values(row).some((value) => String(value ?? "").trim() !== ""),
	);
};

/**
 * Fetch programme metadata from the sheet.
 * A row is recognised as a programme only when its Programme/Program field
 * has a value. This deliberately does not use Course Name, Title, or Name as
 * a fallback, because doing so turns every course into a false programme.
 * PhD is intentionally excluded while its sheet integration is on hold.
 */
export const getAcademicPrograms = async () => {
	const rows = await fetchAcademicSheetRows();
	const programByIdentity = new Map();

	rows.forEach((row, index) => {
		const name = getProgrammeSheetValue(row, programmeNameAliases);
		if (!name) return;

		const explicitKey = getProgrammeSheetValue(row, [
			"programme key",
			"program key",
			"category key",
			"programme slug",
			"program slug",
			"slug",
			"key",
		]);
		const categoryKey = getProgrammeKey(name) || getProgrammeKey(explicitKey);
		if (categoryKey === "phd" || getProgrammeKey(name) === "phd") return;

		const routeCell = getProgrammeSheetValue(row, [
			"route",
			"page path",
			"internal route",
			"website path",
			"page slug",
			"path",
		]);
		let suppliedRoute = "";
		if (routeCell.startsWith("/programmes/") && !routeCell.startsWith("//")) {
			suppliedRoute = routeCell.split(/[?#]/)[0].replace(/\/+$/, "");
		} else if (routeCell && !/^https?:\/\//i.test(routeCell) && !routeCell.startsWith("/")) {
			const routeSlug = slugifyProgramme(routeCell.replace(/^programmes\//i, ""));
			if (routeSlug) suppliedRoute = `/programmes/${routeSlug}`;
		}

		const suppliedRouteKey = suppliedRoute
			? suppliedRoute.split("/").filter(Boolean).at(-1)
			: "";
		const key = categoryKey || slugifyProgramme(explicitKey || name);
		const routeKey = suppliedRouteKey || categoryKey || key;
		const programme = {
			id: getProgrammeSheetValue(row, ["id", "programme id", "program id", "order", "display order"]) || `${routeKey}-${index + 1}`,
			key,
			categoryKey,
			routeKey,
			route: suppliedRoute || `/programmes/${routeKey}`,
			name,
			shortName: getProgrammeSheetValue(row, ["short name", "programme short name", "program short name", "display name", "display label", "menu label", "short title", "label"]),
			eyebrow: getProgrammeSheetValue(row, ["eyebrow", "programme eyebrow", "program eyebrow", "programme type"]),
			subtitle: getProgrammeSheetValue(row, ["subtitle", "programme subtitle", "program subtitle", "title suffix", "heading accent"]),
			description: getProgrammeSheetValue(row, ["short description", "programme description", "program description", "programme details", "program details", "description", "overview", "summary", "details", "about"]),
			duration: getProgrammeSheetValue(row, ["duration", "programme duration", "program duration", "duration of programme", "duration of program", "length", "years"]),
			semesters: getProgrammeSheetValue(row, ["semesters", "number of semesters", "semester count"]),
			level: getProgrammeSheetValue(row, ["proposed level (ug/pg)", "proposed level", "ug/pg", "level", "degree level", "programme level", "program level", "study level", "degree", "type"]),
			category: getProgrammeSheetValue(row, ["branch", "specialization", "specialisation", "stream", "programme category", "program category"]),
			eligibility: getProgrammeSheetValue(row, ["eligibility", "eligibility criteria", "entry requirements", "qualifying degree"]),
			link: extractProgrammeUrl(getProgrammeSheetValue(row, ["programme link", "program link", "details link", "learn more link", "curriculum link", "admission link", "application link", "website", "url", "link", "learn more"])),
		};

		const identity = String(routeKey || key || slugifyProgramme(name)).toLowerCase();
		if (!programByIdentity.has(identity)) {
			programByIdentity.set(identity, programme);
			return;
		}

		// Some sheets repeat the programme name on each course row. Merge in
		// any available metadata without creating duplicate menu entries.
		const existing = programByIdentity.get(identity);
		for (const [field, value] of Object.entries(programme)) {
			if (
				(existing[field] === "" || existing[field] === null || existing[field] === undefined) &&
				value !== "" && value !== null && value !== undefined
			) {
				existing[field] = value;
			}
		}
	});

	// Empty programme metadata is a valid state. The UI displays an empty-state
	// message instead of fabricating programme details.
	return [...programByIdentity.values()];
};
/**
 * Fetch PhD programme page content from its dedicated Google Sheet.
 * Supports section-based rows and common key/value column layouts.
 */
export const getPhDProgrammePageData = async () => {
  const sheetUrl = constant.phdProgrammeSheetCSV;

  if (!sheetUrl) {
    throw new Error("The PhD Google Sheet URL is not configured.");
  }

  const response = await axios.get(sheetUrl, {
    responseType: "text",
    params: { _ts: Date.now() },
  });

  const csvText = String(response.data ?? "").trim();

  if (
    !csvText ||
    /<\s*!doctype\s+html|<\s*html[\s>]/i.test(csvText)
  ) {
    throw new Error(
      "The PhD Google Sheet did not return CSV data. " +
        "Make the sheet publicly readable and verify its CSV URL."
    );
  }

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: normalizeProgrammeHeader,
  });

  if (parsed.errors.length && !parsed.data.length) {
    throw new Error(
      `Could not parse the PhD Google Sheet: ${parsed.errors[0].message}`
    );
  }

  const rows = parsed.data.filter((row) =>
    Object.values(row).some(
      (value) => String(value ?? "").trim() !== ""
    )
  );

  const valueOf = (row, aliases) => {
    for (const alias of aliases) {
      const value = row[normalizeProgrammeHeader(alias)];

      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        return String(value).trim();
      }
    }

    return "";
  };

  const firstColumnValue = (aliases) => {
    for (const row of rows) {
      const value = valueOf(row, aliases);
      if (value) return value;
    }

    return "";
  };

  // Supports a spreadsheet where each row contains a Field/Value pair.
  const keyedValue = (pattern) => {
    const row = rows.find((item) => {
      const key = valueOf(item, [
        "field",
        "key",
        "attribute",
        "property",
        "label",
        "metric",
        "title",
        "heading",
        "name",
      ]);

      return pattern.test(key);
    });

    if (!row) return "";

    return valueOf(row, [
      "value",
      "answer",
      "content",
      "description",
      "details",
      "text",
      "link",
      "url",
    ]);
  };

  const entries = rows.map((row, index) => {
    const section = valueOf(row, [
      "section",
      "section name",
      "content section",
      "category",
      "group",
      "type",
      "area",
    ]);

    const label = valueOf(row, [
      "label",
      "field",
      "key",
      "attribute",
      "property",
      "metric",
      "statistic label",
    ]);

    const explicitResearchArea = valueOf(row, [
      "research area",
      "research focus",
      "area of research",
      "focus area",
    ]);

    const qualification = valueOf(row, [
      "qualifying degree",
      "qualification",
      "degree",
      "eligible degree",
    ]);

    const credits = valueOf(row, [
      "minimum credits",
      "credit requirement",
      "credit value",
      "credits",
    ]);

    const title =
      explicitResearchArea ||
      valueOf(row, [
        "title",
        "heading",
        "item",
        "name",
        "topic",
        "stage",
        "requirement",
        "coursework item",
        "statistic",
      ]) ||
      qualification ||
      label;

    const description = valueOf(row, [
      "description",
      "details",
      "content",
      "summary",
      "overview",
      "text",
      "information",
      "explanation",
      "answer",
    ]);

    const value = valueOf(row, [
      "value",
      "count",
      "number",
      "statistic value",
      "duration",
      "minimum credits",
      "credit requirement",
      "credits",
    ]);

    const link = extractProgrammeUrl(
      valueOf(row, [
        "url",
        "link",
        "website",
        "official link",
        "resource link",
        "document link",
      ])
    );

    const searchable = [
      section,
      label,
      title,
      explicitResearchArea,
    ]
      .join(" ")
      .toLowerCase();

    let bucket = "additional";

    if (
      /statistic|quick facts|programme facts|typical duration|selection rounds|research scholars|faculty count/.test(
        searchable
      )
    ) {
      bucket = "stats";
    } else if (
      /research area|research focus|area of research|speciali[sz]ation/.test(
        searchable
      )
    ) {
      bucket = "researchAreas";
    } else if (
      /coursework|credit requirement|qualifying degree|course requirement/.test(
        searchable
      ) ||
      Boolean(qualification && credits)
    ) {
      bucket = "courseworkCredits";
    } else if (
      /research progress|research milestone|stage|thesis|defen[cs]e|dissertation/.test(
        searchable
      )
    ) {
      bucket = "researchStages";
    } else if (
      /admission|eligibility|selection process|application/.test(
        searchable
      )
    ) {
      bucket = "admissions";
    } else if (link) {
      bucket = "links";
    }

    return {
      id: `phd-${index + 1}`,
      section: section || "Additional Programme Information",
      title,
      label,
      description,
      value,
      qualification,
      credits,
      link,
      bucket,
      order: Number(
        valueOf(row, ["order", "sort order", "display order", "sequence"])
      ),
    };
  });

  const sortEntries = (items) =>
    [...items].sort((a, b) => {
      const aHasOrder = Number.isFinite(a.order) && a.order > 0;
      const bHasOrder = Number.isFinite(b.order) && b.order > 0;

      if (aHasOrder && bHasOrder) return a.order - b.order;
      if (aHasOrder) return -1;
      if (bHasOrder) return 1;

      return 0;
    });

  const stats = sortEntries(
    entries.filter(
      (entry) =>
        entry.bucket === "stats" &&
        (entry.value || entry.description)
    )
  ).map((entry) => ({
    label: entry.label || entry.title || entry.section,
    value: entry.value || entry.description,
  }));

  const directDuration =
    firstColumnValue([
      "typical duration",
      "programme duration",
      "program duration",
      "duration",
    ]) || keyedValue(/duration/i);

  if (
    directDuration &&
    !stats.some((stat) => /duration/i.test(stat.label))
  ) {
    stats.unshift({
      label: "Typical Duration",
      value: directDuration,
    });
  }

  const directOverview =
    firstColumnValue([
      "programme overview",
      "program overview",
      "programme description",
      "program description",
      "overview text",
      "introduction text",
    ]) ||
    keyedValue(
      /^(programme overview|program overview|overview|introduction|about programme|programme description|program description)$/i
    );

  const overviewEntry = entries.find((entry) =>
    /overview|introduction|programme description|program description/i.test(
      `${entry.section} ${entry.title} ${entry.label}`
    )
  );

  const overview =
    directOverview ||
    overviewEntry?.description ||
    overviewEntry?.value ||
    "";

  const researchAreas = sortEntries(
    entries.filter((entry) => entry.bucket === "researchAreas")
  ).map((entry) => ({
    title: entry.title || entry.label || entry.section,
    description: entry.description || entry.value || "",
  }));

  const courseworkCredits = sortEntries(
    entries.filter((entry) => entry.bucket === "courseworkCredits")
  ).map((entry) => ({
    title:
      entry.qualification ||
      entry.title ||
      entry.label ||
      entry.section,
    value: entry.credits || entry.value || "",
    description: entry.description || "",
  }));

  const researchStages = sortEntries(
    entries.filter((entry) => entry.bucket === "researchStages")
  );

  const admissions = sortEntries(
    entries.filter((entry) => entry.bucket === "admissions")
  );

  const links = sortEntries(
    entries.filter((entry) => entry.bucket === "links")
  );

  // Group any other section rows so they are not silently discarded.
  const otherEntries = entries.filter(
    (entry) => entry.bucket === "additional"
  );

  const grouped = new Map();

  for (const entry of otherEntries) {
    const sectionName =
      entry.section || "Additional Programme Information";

    if (!grouped.has(sectionName)) {
      grouped.set(sectionName, []);
    }

    grouped.get(sectionName).push(entry);
  }

  const otherSections = [...grouped.entries()].map(
    ([title, items]) => ({
      title,
      items: sortEntries(items),
    })
  );

  return {
    title:
      firstColumnValue([
        "programme title",
        "program title",
        "page title",
      ]) ||
      keyedValue(/^(programme title|program title|page title)$/i) ||
      "PhD",

    subtitle:
      firstColumnValue([
        "programme subtitle",
        "program subtitle",
        "subtitle",
      ]) ||
      keyedValue(/^(programme subtitle|program subtitle|subtitle)$/i) ||
      "Computer Science and Engineering",

    eyebrow:
      firstColumnValue([
        "programme type",
        "programme eyebrow",
        "eyebrow",
      ]) ||
      keyedValue(/^(programme type|programme eyebrow|eyebrow)$/i) ||
      "Doctoral Programme",

    overview,
    duration: directDuration,
    stats,
    researchAreas,
    courseworkCredits,
    researchStages,
    admissions,
    links,
    otherSections,
    rowCount: rows.length,
  };
};

const firstCodeLevelDigit = (code) => {
	const match = String(code ?? "").match(/(\d)\d\d/);
	return match ? Number(match[1]) : null;
};

const inferCourseLevel = (value, programmeKey, newCode, oldCode) => {
	const normalized = String(value ?? "").toUpperCase();
	if (/\bUG\b|UNDERGRADUATE/.test(normalized)) return "UG";
	if (/\bPG\b|POSTGRADUATE/.test(normalized)) return "PG";
	if (programmeKey === "btech") return "UG";
	if (programmeKey === "mtech" || programmeKey === "mtech-research") return "PG";
	const digit = firstCodeLevelDigit(newCode) ?? firstCodeLevelDigit(oldCode);
	if (digit !== null) return digit <= 4 ? "UG" : "PG";
	return "";
};

/**
 * Fetch courses from the same Google Sheet. Supports sheets with a Programme
 * column as well as a general UG/PG course catalogue. No local XLSX/CSV files
 * are used by this API.
 */
export const getAcademicCourses = async () => {
	const rows = await fetchAcademicSheetRows();
	const courseRows = [];
	let currentProgrammeName = "";

	for (const row of rows) {
		const directProgrammeName = getProgrammeSheetValue(row, programmeNameAliases);
		if (directProgrammeName) currentProgrammeName = directProgrammeName;

		const newCode = getProgrammeSheetValue(row, ["new course code", "new code", "course code", "current code", "current course code", "subject code", "code", "course id"]);
		const oldCode = getProgrammeSheetValue(row, ["old course code", "old code", "previous code", "previous course code", "legacy code"]);
		const name = getProgrammeSheetValue(row, ["course name", "name of course", "course title", "subject name", "course"])
			|| ((newCode || oldCode) ? getProgrammeSheetValue(row, ["name", "title"]) : "");
		if (!name || /^(course name|name of course|subject name)$/i.test(name)) continue;

		const ltpc = getProgrammeSheetValue(row, ["l t p c", "l-t-p-c", "ltpc", "credit structure", "credits", "credit pattern"]);
		const proposedLevel = getProgrammeSheetValue(row, ["proposed level (ug/pg)", "proposed level", "ug/pg", "level", "degree level", "programme level", "program level", "study level"]);
		const programmeName = directProgrammeName || currentProgrammeName;
		const key = getProgrammeKey(programmeName);

		courseRows.push({
			newCode,
			oldCode,
			name,
			ltpc: /^\d+(?:\.\d+)?-\d+(?:\.\d+)?-\d+(?:\.\d+)?-\d+(?:\.\d+)?$/.test(ltpc) ? ltpc : "",
			level: inferCourseLevel(proposedLevel, key, newCode, oldCode),
			programmeName,
			programmeKey: key,
			programmeRouteKey: key || slugifyProgramme(programmeName),
			semester: getProgrammeSheetValue(row, ["semester", "sem", "term"]),
			remarks: getProgrammeSheetValue(row, ["remarks", "remark", "notes", "comments"]),
		});
	}

	return courseRows;
};


/**
 * Fetch Students from Google Sheets CSV.
 * Existing student division logic is preserved.
 */
export const getStudents = async () => {
	const response = await axios.get(
		constant.studentsSheetCSV,
		{
			responseType: "text",
		},
	);

	const parsed = Papa.parse(response.data, {
		header: true,
		skipEmptyLines: true,
		transformHeader: (header) => header.trim().toLowerCase(),
	});

	if (parsed.errors.length > 0) {
		throw new Error(
			`Failed to parse student roster CSV: ${parsed.errors[0].message}`,
		);
	}

	const rows = parsed.data;

	const headers = new Set(
		Object.keys(rows[0] || {}),
	);

	const requiredHeaders = [
		"degree",
		"branch",
		"roll no",
		"name",
	];

	const missingHeaders = requiredHeaders.filter(
		(header) => !headers.has(header),
	);

	if (missingHeaders.length > 0) {
		throw new Error(
			`Student roster is missing required columns: ${missingHeaders.join(", ")}`,
		);
	}

	const studentsByDivision = {
		"btech-cse": [],
		"btech-mnc": [],
		"mtech-cse": [],
		mfr: [],
	};

	const normalize = (value) =>
		(value || "")
			.toLowerCase()
			.replace(/[^a-z0-9]/g, "");

	const getDivision = (row) => {
		const rollNo = (row["roll no"] || "").trim().toUpperCase();

		if (/^MC\d+BT/.test(rollNo)) return "btech-mnc";
		if (/^CS\d+BT/.test(rollNo)) return "btech-cse";
		if (/^CS\d+MT/.test(rollNo)) return "mtech-cse";
		if (/^CS\d+MR/.test(rollNo)) return "mfr";

		const degree = normalize(row.degree);
		const branch = normalize(row.branch);

		const isBtech = degree === "btech";
		const isMtech =
			degree === "mtech" ||
			degree === "mtechbyresearch";

		if (
			isBtech &&
			[
				"cse",
				"computerscience",
				"computerscienceengineering",
			].includes(branch)
		) {
			return "btech-cse";
		}

		if (
			isBtech &&
			[
				"mnc",
				"mathcomputing",
				"mathematicscomputing",
			].includes(branch)
		) {
			return "btech-mnc";
		}

		if (
			isMtech &&
			(branch === "mtr" || degree === "mtechbyresearch")
		) {
			return "mfr";
		}

		if (
			isMtech &&
			[
				"cse",
				"computerscience",
				"computerscienceengineering",
			].includes(branch)
		) {
			return "mtech-cse";
		}

		return null;
	};

	for (const row of rows) {
		const division = getDivision(row);
		const rollNo = (row["roll no"] || "").trim();
		const name = (row.name || "").trim();

		if (division && rollNo && name) {
			studentsByDivision[division].push({
				rollNo,
				name,
			});
		}
	}

	if (
		!Object.values(studentsByDivision).some(
			(students) => students.length > 0,
		)
	) {
		throw new Error(
			"No students in the roster matched the supported CSE divisions.",
		);
	}

	return studentsByDivision;
};

/**
 * Fetch CSE Conclave schedule from Google Sheets CSV.
 */
export const getCseConclaveSchedule = async () => {
	const response = await axios.get(
		constant.cseConclaveScheduleSheetCSV,
		{
			responseType: "text",
		},
	);

	const parsed = Papa.parse(response.data, {
		header: true,
		skipEmptyLines: "greedy",
		transformHeader: (header) =>
			header.replace(/^\uFEFF/, "").trim().toLowerCase(),
	});

	if (parsed.errors.length > 0) {
		throw new Error(
			`Failed to parse CSE Conclave schedule CSV: ${parsed.errors[0].message}`,
		);
	}

	const rows = parsed.data;
	const headers = new Set(parsed.meta.fields || []);

	const requiredHeaders = [
		"date",
		"start time",
		"end time",
		"particulars",
		"anchor",
		"title",
	];

	const missingHeaders = requiredHeaders.filter(
		(header) => !headers.has(header),
	);

	if (missingHeaders.length > 0) {
		throw new Error(
			`CSE Conclave schedule is missing required columns: ${missingHeaders.join(", ")}`,
		);
	}

	return rows
		.filter((row) =>
			Object.values(row).some(
				(value) => value.trim() !== "",
			),
		)
		.map((row) => ({
			date: row.date.trim(),
			startTime: row["start time"].trim(),
			endTime: row["end time"].trim(),
			particulars: row.particulars.trim(),
			anchor: row.anchor.trim(),
			title: row.title.trim(),
		}));
};

/**
 * Fetch About page data from the API.
 */
export const getAboutPageData = async () => {
	const { data } = await axiosInstance.get("/about-pages");
	return data?.data;
};

/**
 * Fetch Academic Rules.
 */
export const getAcademicRules = async () => {
	const { data } = await axiosInstance.get("/academic-ruless");
	return data?.data?.[0]?.Rules;
};

/**
 * Fetch Academic FAQs.
 */
export const getAcademicFaq = async () => {
	const { data } = await axiosInstance.get("/acad-faqs");

	return data?.data?.map((item) => ({
		question: item.Question,
		answer: item.Answer,
	}));
};

/**
 * Fetch Admissions information.
 */
export const getAdmissionsInfo = async () => {
	const { data } = await axiosInstance.get("/admissions-pages");
	return data?.data?.[0].allData;
};

/**
 * Fetch People information and sort by last name.
 */
export const getPeopleInfo = async () => {
	const { data } = await axiosInstance.get(
		"/peoples?pagination[pageSize]=50",
	);

	if (!data || !Array.isArray(data.data)) {
		console.error(
			"Fetched data is not in the expected format:",
			data,
		);

		return [];
	}

	const getLastName = (fullName) => {
		if (!fullName || typeof fullName !== "string") {
			return "";
		}

		const parts = fullName.trim().split(" ");
		return parts[parts.length - 1];
	};

	const sortedData = [...data.data].sort((a, b) => {
		const fullNameA = a?.Name;
		const fullNameB = b?.Name;

		const lastNameA = getLastName(fullNameA).toLowerCase();
		const lastNameB = getLastName(fullNameB).toLowerCase();

		return lastNameA.localeCompare(lastNameB);
	});

	return sortedData;
};

/**
 * Fetch Research Labs.
 */
export const getResearchData = async () => {
	const { data } = await axiosInstance.get("/research-labs");
	return data?.data;
};

/**
 * Fetch Research Projects.
 */
export const getResearchProjectsData = async () => {
	const { data } = await axiosInstance.get("/research-projects");
	return data?.data;
};

/**
 * Fetch Carousel images.
 */
export const getCarouselImages = async () => {
	const { data } = await axiosInstance.get(
		"/carousel-imagess?populate=*",
	);

	return data?.data;
};

/**
 * Fetch Gallery images.
 */
export const getGalleryImages = async () => {
	const { data } = await axiosInstance.get(
		"/gallery-images?populate=*",
	);

	return data?.data;
};

/**
 * Fetch search results.
 */
export const getSearchResult = async (query) => {
	if (
		!query ||
		typeof query !== "string" ||
		!query.trim()
	) {
		throw new Error(
			"A valid search query must be provided.",
		);
	}

	const encodedQuery = encodeURIComponent(query.trim());

	const { data } = await axiosInstance.get(
		`/fuzzy-search/search?query=${encodedQuery}`,
	);

	return data;
};

/**
 * Fetch Join as Faculty page data.
 */
export const getJoinAsFacultyData = async () => {
	const { data } = await axiosInstance.get(
		"/join-as-faculty-pages",
	);

	return data?.data?.sort(
		(a, b) => a.Level - b.Level,
	) || [];
};