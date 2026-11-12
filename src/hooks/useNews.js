import { useQuery } from "@tanstack/react-query";
import { getNews } from "../api/api";

// Parse date strings like "15 Mar 2026", "15 Mar", "2026-03-15"
const parseDate = (dateString) => {
	if (!dateString || dateString.toLowerCase() === "present") return null;

	try {
		let cleanDate = dateString.replace(/\s*\(year not specified\)\s*/i, "").trim();

		const hasYear = /\d{4}/.test(cleanDate);
		if (!hasYear) {
			const currentYear = new Date().getFullYear();
			const tempDate = new Date(`${cleanDate} ${currentYear}`);
			const today = new Date();
			cleanDate += tempDate < today ? ` ${currentYear + 1}` : ` ${currentYear}`;
		}

		const date = new Date(cleanDate);
		return !isNaN(date.getTime()) ? date : null;
	} catch {
		return null;
	}
};

const formatDateDisplay = (dateString, date) => {
	if (!dateString) return "";
	if (dateString.toLowerCase() === "present") return "Present";
	return date
		? date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
		: dateString;
};

const formatApplicationDate = (dateString) => {
	if (!dateString) return "";

	const isoDate = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (isoDate) {
		const [, year, month, day] = isoDate;
		return new Date(Number(year), Number(month) - 1, Number(day))
			.toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
	}

	const parsedDate = parseDate(dateString);
	return formatDateDisplay(dateString, parsedDate);
};

const extractApplicationDates = (description) => {
	const patterns = {
		applicationOpens: /\bapplication\s+opens?\s*[:\-–]?\s*(.+?)(?=\r?\n|$)/i,
		applicationDeadline:
			/\bapplication\s+deadline\s*[:\-–]?\s*(.+?)(?=\r?\n|$)/i,
	};
	let remainingDescription = description;
	const dates = {};

	for (const [field, pattern] of Object.entries(patterns)) {
		const match = remainingDescription.match(pattern);
		dates[field] = match?.[1]?.trim() || "";
		if (match) remainingDescription = remainingDescription.replace(pattern, "");
	}

	return {
		...dates,
		description: remainingDescription
			.replace(/\bimportant\s+dates\b[:\s-]*/gi, "")
			.replace(/\n{2,}/g, "\n")
			.trim(),
	};
};

const transformNews = (news) =>
	// Present data in the same order as it appears in the Google Sheet (no sorting)
	news?.map((item) => {
		const publishedDate = item.date || item.published_date;
		const date = parseDate(publishedDate);
		const featuredValue = String(item.featured ?? "").toLowerCase();
		const extractedDates = extractApplicationDates(item.description || "");
		return {
			title: item.title || item.Title || "",
			date, // Date object (or null) for filtering/sorting
			dateDisplay: formatDateDisplay(publishedDate, date),
			description: extractedDates.description,
			applicationOpens: formatApplicationDate(
				item.applicationOpens ||
					item.application_opens ||
					extractedDates.applicationOpens,
			),
			applicationDeadline: formatApplicationDate(
				item.applicationDeadline ||
					item.application_deadline ||
					extractedDates.applicationDeadline,
			),
			category: item.category || "News",
			status: item.status || "",
			featured: ["true", "yes", "1"].includes(featuredValue),
			link: item.link || null,
		};
	}) || [];

export function useNews() {
	return useQuery({
		queryKey: ["news"],
		queryFn: getNews,
		select: transformNews,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}