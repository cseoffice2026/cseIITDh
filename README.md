# IIT Dharwad CSE Department Website

React 19 single-page website built with Vite, Tailwind CSS, and React Router.

## Development

```bash
npm install
npm run dev
```

## Validation and production build

```bash
npm run lint
npm run build
npm run preview
```

The production bundle is written to `dist/`. The build also writes a bundle
analysis report to `dist/stats.html`.

## Project layout

- `src/App.jsx` defines the shared header, navigation, footer, and routes.
- `src/pages/` contains the routed website pages.
- `src/components/` contains shared page sections and interface components.
- `src/hooks/` contains React Query data hooks.
- `src/api/api.js` contains the Strapi and Google Sheets data integrations.
- `src/constant/` contains API and route constants.
- `src/content/` and `public/` contain static documents and media.

The navigation is horizontal at desktop widths and becomes a slide-out menu on
mobile and tablet widths. Search results are available at `/search?q=...`.

## Tree Structure

```bash
cseIITDh/
├─ public/
│  ├─ images/
│  │  └─ logo.png
│  ├─ CSE_course-list.xlsx
│  ├─ insti_fav_white.jpg
│  ├─ institute_favicon.png
│  ├─ MTech-by-Research-Admission-Brochure-Spring-2026-27.pdf
│  ├─ PhD-Admission-Brochure-Spring-2026-27.pdf
│  ├─ timetable.pdf
│  └─ vite.svg
├─ src/
│  ├─ api/
│  │  └─ api.js
│  ├─ components/
│  │  ├─ Academics/
│  │  │  ├─ AcademicRules.jsx
│  │  │  ├─ CoursesSection.jsx
│  │  │  ├─ CurriculumSection.jsx
│  │  │  ├─ FAQs.jsx
│  │  │  ├─ NavCard.jsx
│  │  │  ├─ PlacementSection.jsx
│  │  │  └─ TimeTableSection.jsx
│  │  ├─ Admissions/
│  │  │  ├─ BTechSection.jsx
│  │  │  ├─ MarkdownLink.jsx
│  │  │  ├─ MSResearchSection.jsx
│  │  │  ├─ MTechSection.jsx
│  │  │  └─ PhDSection.jsx
│  │  ├─ Carousel/
│  │  │  └─ Carousel.jsx
│  │  ├─ ContactUs/
│  │  │  ├─ ContactPoints.jsx
│  │  │  ├─ ContactUsFaq.jsx
│  │  │  ├─ ContactUsForm.jsx
│  │  │  ├─ ContactUsSocialMediaSection.jsx
│  │  │  ├─ DepartmentAddress.jsx
│  │  │  └─ LocationAndDirections.jsx
│  │  ├─ Footer/
│  │  │  └─ Footer.jsx
│  │  ├─ Gallery/
│  │  │  └─ Gallery.jsx
│  │  ├─ Home/
│  │  │  ├─ NewsSection.jsx
│  │  │  ├─ ProgramsSection.jsx
│  │  │  └─ TalksAndEventsSection.jsx
│  │  ├─ LoadingSkeleton/
│  │  │  └─ PageSkeleton.jsx
│  │  ├─ Navbar/
│  │  │  └─ Navbar.jsx
│  │  ├─ PDFViewer/
│  │  │  ├─ PDFErrorFallback.jsx
│  │  │  ├─ PDFViewer.css
│  │  │  └─ PDFViewer.jsx
│  │  ├─ People/
│  │  │  ├─ DepartmentLeadership.jsx
│  │  │  ├─ FacultyCard.jsx
│  │  │  ├─ FacultySection.jsx
│  │  │  ├─ FormerFacultySection.jsx
│  │  │  ├─ FormerMemberCard.jsx
│  │  │  ├─ FormerMemberSection.jsx
│  │  │  ├─ GraduatedScholarSection.jsx
│  │  │  ├─ PhDScholarSection.jsx
│  │  │  ├─ StaffCard.jsx
│  │  │  ├─ StaffSection.jsx
│  │  │  └─ StudentsSection.jsx
│  │  ├─ Programmes/
│  │  │  └─ CourseTable.jsx
│  │  ├─ Research/
│  │  │  ├─ DepartmentFacilities.jsx
│  │  │  └─ ResearchProjects.jsx
│  │  ├─ Topbar/
│  │  │  ├─ SearchInput.jsx
│  │  │  └─ Topbar.jsx
│  │  ├─ BackToTopButton.jsx
│  │  ├─ GlobalError.jsx
│  │  ├─ LazyRoute.jsx
│  │  ├─ Loading.jsx
│  │  ├─ ScrollToTop.jsx
│  │  └─ Section.jsx
│  ├─ constant/
│  │  ├─ constant.js
│  │  └─ searchRoutes.js
│  ├─ content/
│  │  ├─ about.txt
│  │  ├─ conclave2_0.png
│  │  ├─ contact.txt
│  │  ├─ cse-conclave.jpeg
│  │  ├─ facilities.html
│  │  ├─ faculty.html
│  │  ├─ Faculty.pdf
│  │  ├─ image.png
│  │  ├─ news.jpg
│  │  ├─ staff.html
│  │  └─ timetable.pdf
│  ├─ data/
│  │  └─ studentsData.js
│  ├─ hooks/
│  │  ├─ useAboutData.js
│  │  ├─ useAcademicFaqs.js
│  │  ├─ useAcademicPrograms.js
│  │  ├─ useAcademicRules.js
│  │  ├─ useAdmissionsInfo.js
│  │  ├─ useCarouselImages.js
│  │  ├─ useCourses.js
│  │  ├─ useDebounce.js
│  │  ├─ useGalleryImages.js
│  │  ├─ useJoinAsFacultyData.js
│  │  ├─ useNews.js
│  │  ├─ usePeopleInfo.js
│  │  ├─ useResearchData.js
│  │  ├─ useResearchProjectsData.js
│  │  ├─ useSearchResult.js
│  │  ├─ useStudentsData.js
│  │  └─ useTalksAndEvents.js
│  ├─ pages/
│  │  ├─ About.jsx
│  │  ├─ Academics.jsx
│  │  ├─ Admissions.jsx
│  │  ├─ Allnews.jsx
│  │  ├─ AllTalksEventsPage.jsx
│  │  ├─ Contact.jsx
│  │  ├─ CseConclave.jsx
│  │  ├─ CseConclave2.jsx
│  │  ├─ Home.jsx
│  │  ├─ JoinAsFaculty.jsx
│  │  ├─ People.jsx
│  │  ├─ Programmes.jsx
│  │  ├─ Research.jsx
│  │  └─ SearchResults.jsx
│  ├─ App.css
│  ├─ App.jsx
│  ├─ index.css
│  ├─ main.jsx
│  └─ searchData.jsx
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
├─ tailwind.config.js
└─ vite.config.js
```