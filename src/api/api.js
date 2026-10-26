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
 * Fetch Academic Programmes from Google Sheets CSV.
 *
 * Required constant:
 * constant.academicProgramsSheetCSV
 */
const normalizeProgrammeHeader = (value) =>
	String(value ?? "")
		.replace(/^\uFEFF/, "")
		.trim()
		.toLowerCase()
		.replace(/[_-]+/g, " ")
		.replace(/[^a-z0-9\s/]/g, "")
		.replace(/\s+/g, " ");

export const getAcademicPrograms = async () => {
	const response = await axios.get(
		constant.academicProgramsSheetCSV,
		{
			responseType: "text",
		},
	);

	const parsed = Papa.parse(response.data, {
		header: true,
		skipEmptyLines: "greedy",
		transformHeader: normalizeProgrammeHeader,
	});

	if (parsed.errors.length > 0 && parsed.data.length === 0) {
		throw new Error(
			`Failed to parse Academic Programmes CSV: ${parsed.errors[0].message}`,
		);
	}

	const rows = parsed.data.filter((row) =>
		Object.values(row).some(
			(value) => String(value ?? "").trim() !== "",
		),
	);

	const getValue = (row, aliases) => {
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

	const programs = rows
		.map((row, index) => {
			const name = getValue(row, [
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
				"course name",
				"course",
				"title",
				"name",
			]);

			// Ignore rows without a programme name.
			if (!name) return null;

			return {
				id:
					getValue(row, [
						"id",
						"programme id",
						"program id",
						"order",
						"display order",
					]) || `${name}-${index + 1}`,

				name,

				description: getValue(row, [
					"short description",
					"programme description",
					"program description",
					"programme details",
					"program details",
					"description",
					"overview",
					"summary",
					"details",
					"about",
				]),

				duration: getValue(row, [
					"duration",
					"programme duration",
					"program duration",
					"duration of programme",
					"duration of program",
					"length",
					"years",
				]),

				level: getValue(row, [
					"level",
					"degree level",
					"programme level",
					"program level",
					"study level",
					"ug/pg",
					"degree",
					"category",
					"type",
				]),

				category: getValue(row, [
					"branch",
					"specialization",
					"specialisation",
					"stream",
					"programme category",
					"program category",
				]),

				link: getValue(row, [
					"programme link",
					"program link",
					"details link",
					"learn more link",
					"curriculum link",
					"admission link",
					"application link",
					"website",
					"url",
					"link",
					"learn more",
				]),

				imageUrl: getValue(row, [
					"image url",
					"programme image",
					"program image",
					"image",
					"photo",
					"thumbnail",
				]),
			};
		})
		.filter(Boolean);

	if (programs.length === 0) {
		throw new Error(
			"No programme rows were recognized. Check that the Google Sheet is publicly readable and contains a Programme Name, Program Name, Programme, Program, Title, or Name column.",
		);
	}

	return programs;
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