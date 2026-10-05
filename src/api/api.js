import axios from "axios";
import Papa from "papaparse";
import { constant } from "../constant/constant";

const axiosInstance = axios.create({
	baseURL: constant.baseURL,
});

/**
 * Fetch News from Google Sheets CSV
 * The sheet URL is configured in constant.newsSheetCSV
 */
export const getNews = async () => {
	try {
		// Fetch CSV data from Google Sheets
		const response = await axios.get(constant.newsSheetCSV, {
			responseType: "text",
		});

		// Parse CSV using PapaParse
		return new Promise((resolve, reject) => {
			Papa.parse(response.data, {
				header: true,
				skipEmptyLines: true,
				transformHeader: (header) => {
					// Normalize header names to lowercase and trim whitespace
					return header.trim().toLowerCase();
				},
				complete: (results) => {
					// Log available columns for debugging (only in development)
					if (process.env.NODE_ENV === "development" && results.data.length > 0) {
						console.log("Available News CSV columns:", Object.keys(results.data[0]));
					}

					// Transform parsed data to match expected format
					const transformedData = results.data
						.filter((row) => {
							// Filter out completely empty rows
							return Object.values(row).some((value) => value && value.trim() !== "");
						})
						.map((row) => {
							// Map CSV columns to expected format
							// Handle various possible column name variations (case-insensitive)
							const getValue = (variations) => {
								for (const variation of variations) {
									const value = row[variation];
									if (value && value.trim() !== "") {
										return value.trim();
									}
								}
								return null;
							};

							const title = getValue([
								"title",
								"news title",
								"headline",
								"name",
							]) || "";

							const description = getValue([
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
								date: date,
								description: description,
								link: link,
							};
						});

					resolve(transformedData);
				},
				error: (error) => {
					console.error("Error parsing News CSV:", error);
					reject(new Error(`Failed to parse News CSV: ${error.message}`));
				},
			});
		});
	} catch (error) {
		console.error("Error fetching news from Google Sheets:", error);
		// Return empty array on error to prevent app crash
		// This allows the app to continue functioning even if the sheet is temporarily unavailable
		return [];
	}
};

/**
 * Fetch Talks and Events from Google Sheets CSV
 * The sheet URL is configured in constant.talksAndEventsSheetCSV
 */
export const getTalksAndEvents = async () => {
	try {
		// Fetch CSV data from Google Sheets
		const response = await axios.get(constant.talksAndEventsSheetCSV, {
			responseType: "text",
		});

		// Parse CSV using PapaParse
		return new Promise((resolve, reject) => {
			Papa.parse(response.data, {
				header: true,
				skipEmptyLines: true,
				transformHeader: (header) => {
					// Normalize header names to lowercase and trim whitespace
					return header.trim().toLowerCase();
				},
				complete: (results) => {
					// Log available columns for debugging (only in development)
					if (process.env.NODE_ENV === "development" && results.data.length > 0) {
						console.log("Available CSV columns:", Object.keys(results.data[0]));
					}

					// Transform parsed data to match expected format
					const transformedData = results.data
						.filter((row) => {
							// Filter out completely empty rows
							return Object.values(row).some((value) => value && value.trim() !== "");
						})
						.map((row) => {
							// Map CSV columns to expected format
							// Handle various possible column name variations (case-insensitive)
							const getValue = (variations) => {
								for (const variation of variations) {
									const value = row[variation];
									if (value && value.trim() !== "") {
										return value.trim();
									}
								}
								return null;
							};

							const title = getValue([
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

							// New format: Start Date, End Date, Time
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

							// Use date or startDate for old format compatibility
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
								designation: designation,
								venue: venue,
								startDate: startDate || date,
								endDate: endDate || date,
								date: endDate || startDate || date, // For backward compatibility
								time: eventTime,
								sortingDate: endDate || startDate || date, // Use endDate for sorting
								description: description,
								links: links,
							};
						});

					resolve(transformedData);
				},
				error: (error) => {
					console.error("Error parsing CSV:", error);
					reject(new Error(`Failed to parse CSV: ${error.message}`));
				},
			});
		});
	} catch (error) {
		console.error("Error fetching talks and events from Google Sheets:", error);
		// Return empty array on error to prevent app crash
		// This allows the app to continue functioning even if the sheet is temporarily unavailable
		return [];
	}
};

export const getStudents = async () => {
	const response = await axios.get(constant.studentsSheetCSV, {
		responseType: "text",
	});

	const parsed = Papa.parse(response.data, {
		header: true,
		skipEmptyLines: true,
		transformHeader: (header) => header.trim().toLowerCase(),
	});

	if (parsed.errors.length > 0) {
		throw new Error(`Failed to parse student roster CSV: ${parsed.errors[0].message}`);
	}

	const rows = parsed.data;
	const headers = new Set(Object.keys(rows[0] || {}));
	const requiredHeaders = ["degree", "branch", "roll no", "name"];
	const missingHeaders = requiredHeaders.filter((header) => !headers.has(header));
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

	const normalize = (value) => (value || "").toLowerCase().replace(/[^a-z0-9]/g, "");

	const getDivision = (row) => {
		const rollNo = (row["roll no"] || "").trim().toUpperCase();
		if (/^MC\d+BT/.test(rollNo)) return "btech-mnc";
		if (/^CS\d+BT/.test(rollNo)) return "btech-cse";
		if (/^CS\d+MT/.test(rollNo)) return "mtech-cse";
		if (/^CS\d+MR/.test(rollNo)) return "mfr";

		const degree = normalize(row.degree);
		const branch = normalize(row.branch);
		const isBtech = degree === "btech";
		const isMtech = degree === "mtech" || degree === "mtechbyresearch";

		if (isBtech && ["cse", "computerscience", "computerscienceengineering"].includes(branch)) {
			return "btech-cse";
		}
		if (isBtech && ["mnc", "mathcomputing", "mathematicscomputing"].includes(branch)) {
			return "btech-mnc";
		}
		if (isMtech && (branch === "mtr" || degree === "mtechbyresearch")) {
			return "mfr";
		}
		if (isMtech && ["cse", "computerscience", "computerscienceengineering"].includes(branch)) {
			return "mtech-cse";
		}

		return null;
	};

	for (const row of rows) {
		const division = getDivision(row);
		const rollNo = (row["roll no"] || "").trim();
		const name = (row.name || "").trim();
		if (division && rollNo && name) {
			studentsByDivision[division].push({ rollNo, name });
		}
	}

	if (!Object.values(studentsByDivision).some((students) => students.length > 0)) {
		throw new Error("No students in the roster matched the supported CSE divisions.");
	}

	return studentsByDivision;
};

export const getAboutPageData = async () => {
	const { data } = await axiosInstance.get("/about-pages");
	return data?.data;
};

export const getAcademicRules = async () => {
	const { data } = await axiosInstance.get("/academic-ruless");
	return data?.data?.[0]?.Rules;
};

export const getAcademicFaq = async () => {
	const { data } = await axiosInstance.get("/acad-faqs");
	return data?.data?.map((item) => ({
		question: item.Question,
		answer: item.Answer,
	}));
};

export const getAdmissionsInfo = async () => {
	const { data } = await axiosInstance.get("/admissions-pages");
	return data?.data?.[0].allData;
};

export const getPeopleInfo = async () => {
	const { data } = await axiosInstance.get("/peoples?pagination[pageSize]=50");

	if (!data || !Array.isArray(data.data)) {
		console.error("Fetched data is not in the expected format:", data);
		return [];
	}

	const getLastName = (fullName) => {
		if (!fullName || typeof fullName !== 'string') {
			return '';
		}
		const parts = fullName.trim().split(' ');
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

export const getResearchData = async () => {
	const { data } = await axiosInstance.get("/research-labs");
	return data?.data;
};

export const getResearchProjectsData = async () => {
	const { data } = await axiosInstance.get("/research-projects");
	return data?.data;
};

export const getCarouselImages = async () => {
	const { data } = await axiosInstance.get("/carousel-imagess?populate=*");
	return data?.data;
};

export const getGalleryImages = async () => {
	const { data } = await axiosInstance.get("/gallery-images?populate=*");
	return data?.data;
};

export const getSearchResult = async (query) => {
	if (!query || typeof query !== "string" || !query.trim()) {
		throw new Error("A valid search query must be provided.");
	}
	const encodedQuery = encodeURIComponent(query.trim());
	const { data } = await axiosInstance.get(
		`/fuzzy-search/search?query=${encodedQuery}`,
	);
	return data;
};

export const getJoinAsFacultyData = async () => {
	const { data } = await axiosInstance.get("/join-as-faculty-pages");
	// Sort by Level field and return the data array
	return data?.data?.sort((a, b) => a.Level - b.Level) || [];
};
