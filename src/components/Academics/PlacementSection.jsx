import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { constant } from "../../constant/constant";
import usePlacementCompanies from "../../hooks/usePlacementCompanies";
import DepartmentHeading from "../DepartmentHeading";
import Loading from "../Loading";
import Section from "../Section";

const programStats = {
  "B.Tech": {
    registered: 58,
    placed: 55,
    competitiveExams: 0,
    higherEducation: 1,
    averageCtc: 22,
    medianCtc: 20,
  },
  "M.Tech": {
    registered: 21,
    placed: 20,
    competitiveExams: 0,
    higherEducation: 1,
    averageCtc: 15.95,
    medianCtc: 12,
  },
};

// Theme colors (same values as the brand-* tokens in index.css).
// ECharts needs real hex values, so they are repeated here.
const themeColors = {
  brand600: "#19007b",
  brand500: "#473395",
  brand400: "#7566b0",
  brand300: "#a399ca",
  muted: "#64748b",
};

const segmentColors = {
  placed: themeColors.brand600,
  competitiveExams: themeColors.brand500,
  higherEducation: themeColors.brand400,
  remaining: themeColors.brand300,
};

function CompanyCard({ name }) {
  const [logoUnavailable, setLogoUnavailable] = useState(false);
  const companyKey = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const domain = constant.placementCompanyLogoDomains[companyKey];
  const logoToken = import.meta.env.VITE_LOGO_DEV_TOKEN;
  const monogram = name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <li className="group flex min-h-20 items-center justify-start py-3">
      <div className="flex w-full items-center justify-start gap-3 transition-transform duration-200 group-hover:scale-[1.02]">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center">
          {domain && logoToken && !logoUnavailable ? (
            <img
              src={`https://img.logo.dev/${encodeURIComponent(domain)}?token=${encodeURIComponent(logoToken)}&size=128`}
              alt={`${name} logo`}
              loading="lazy"
              className="max-h-14 max-w-14 object-contain"
              onError={() => setLogoUnavailable(true)}
            />
          ) : (
            <span
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-sm font-bold text-brand-800"
              aria-hidden="true"
            >
              {monogram}
            </span>
          )}
        </span>
        <span className="text-left text-sm font-semibold leading-snug text-slate-800 sm:text-base">
          {name}
        </span>
      </div>
    </li>
  );
}

function RecruitingCompanies() {
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const {
    data: companies = [],
    isLoading,
    isError,
    error,
    refetch,
  } = usePlacementCompanies();
  const visibleCompanies = showAllCompanies ? companies : companies.slice(0, 31);

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <DepartmentHeading
          as="h3"
          size="compact"
          title="Our Recruiting Companies"
          className="mb-0"
        />
        {!isLoading && !isError && companies.length > 0 ? (
          <span className="w-fit rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-brand-800">
            {companies.length} companies
          </span>
        ) : null}
      </div>

      {isLoading ? (
        <Loading className="m-0 py-8" children="Loading recruiting companies..." />
      ) : isError ? (
        <div
          className="rounded-2xl border border-red-200 bg-white p-5 text-center"
          role="alert"
        >
          <p className="text-sm text-red-700">
            Unable to load recruiting companies: {error.message}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            Try again
          </button>
        </div>
      ) : companies.length > 0 ? (
        <>
          <ul className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
            {visibleCompanies.map((company) => (
              <CompanyCard key={company} name={company} />
            ))}
          </ul>
          {companies.length > 31 ? (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                aria-expanded={showAllCompanies}
                onClick={() => setShowAllCompanies((expanded) => !expanded)}
                className="rounded-lg border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 shadow-sm transition hover:border-brand-300 hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
              >
                {showAllCompanies ? " View less" : "+10 View more"}
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <p className="rounded-2xl bg-white p-6 text-center text-sm text-slate-600">
          No recruiting companies are listed yet.
        </p>
      )}
    </section>
  );
}

function PlacementDonutChart({ program, placed, segments }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) {
      return undefined;
    }

    const chart = echarts.init(chartRef.current);
    const makeCenterGraphic = (value, label) => [
      {
        id: "center-value",
        type: "text",
        left: "center",
        top: "38%",
        z: 10,
        silent: true,
        style: {
          text: String(value),
          fontSize: 30,
          fontWeight: 700,
          fill: themeColors.brand600,
        },
      },
      {
        id: "center-label",
        type: "text",
        left: "center",
        top: "56%",
        z: 10,
        silent: true,
        style: {
          text: label,
          width: 80,
          overflow: "break",
          align: "center",
          lineHeight: 13,
          fontSize: 11,
          fontWeight: 500,
          fill: themeColors.muted,
        },
      },
    ];

    const option = {
      animation: true,
      animationDuration: 500,
      animationEasing: "cubicOut",
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        confine: true,
        formatter: ({ name, value, percent }) =>
          `${name}<br/>${value} students (${percent.toFixed(1)}%)`,
      },
      graphic: makeCenterGraphic(placed, "Placed"),
      series: [
        {
          type: "pie",
          radius: ["55%", "86%"],
          center: ["50%", "50%"],
          startAngle: 90,
          data: segments.map(({ label, value, color }) => ({
            name: label,
            value,
            itemStyle: { color },
          })),
          label: { show: false },
          labelLine: { show: false },
          emphasis: {
            focus: "self",
            scale: true,
            scaleSize: 3,
            label: { show: false },
            itemStyle: {
              shadowBlur: 8,
              shadowColor: "rgba(25, 0, 123, 0.25)",
            },
          },
          itemStyle: {
            borderColor: "#ffffff",
            borderWidth: 2,
          },
        },
      ],
    };

    chart.setOption(option);
    chart.on("mouseover", (params) => {
      if (params.componentType !== "series" || params.seriesType !== "pie") {
        return;
      }
      chart.setOption({
        graphic: makeCenterGraphic(params.value, params.name),
      });
    });
    chart.on("globalout", () => {
      chart.setOption({
        graphic: makeCenterGraphic(placed, "Placed"),
      });
    });

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [placed, program, segments]);

  return (
    <div
      ref={chartRef}
      className="h-[200px] w-[200px] shrink-0"
      role="img"
      aria-label={`${program} placement outcomes: ${segments.map(({ label, value }) => `${label} ${value}`).join(", ")}`}
    />
  );
}

function PlacementOutcomeCard({ program, stats }) {
  const { registered, placed, competitiveExams, higherEducation } = stats;
  const remaining = Math.max(
    registered - placed - competitiveExams - higherEducation,
    0,
  );
  const placementRate = (placed / registered) * 100;
  const segments = [
    { key: "placed", label: "Students placed", value: placed, color: segmentColors.placed },
    {
      key: "competitiveExams",
      label: "Opted for competitive exams",
      value: competitiveExams,
      color: segmentColors.competitiveExams,
    },
    {
      key: "higherEducation",
      label: "Opted for higher education",
      value: higherEducation,
      color: segmentColors.higherEducation,
    },
    { key: "remaining", label: "Other / remaining", value: remaining, color: segmentColors.remaining },
  ].filter(({ value }) => value > 0);

  const statTiles = [
    { label: "Placement rate", value: `${placementRate.toFixed(1)}%` },
    { label: "Average CTC", value: `${stats.averageCtc} LPA` },
    { label: "Median CTC", value: `${stats.medianCtc} LPA` },
  ];

  return (
    <article className="rounded-2xl border border-brand-100 bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-bold text-brand-600 sm:text-xl">
          Registered Students: {registered}
        </h3>
        <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-accent">
          {program}
        </span>
      </div>

      {/* Chart + legend side by side */}
      <div className="mt-3 flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
        <PlacementDonutChart program={program} placed={placed} segments={segments} />

        <ul className="w-full flex-1 space-y-3">
          {segments.map(({ key, label, value, color }) => {
            const share = (value / registered) * 100;
            return (
              <li key={key}>
                <div className="flex items-center justify-between gap-3 text-sm sm:text-base">
                  <span className="flex items-center gap-2 font-medium text-slate-700">
                    <span
                      aria-hidden="true"
                      className="h-3 w-3 shrink-0 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                    {label}
                  </span>
                  <span className="font-bold tabular-nums text-brand-600">
                    {value}
                    <span className="ml-1.5 text-xs font-medium text-slate-500">
                      ({share.toFixed(1)}%)
                    </span>
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-brand-50">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${share}%`, backgroundColor: color }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Stat tiles */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {statTiles.map(({ label, value }) => (
          <div key={label} className="rounded-xl bg-brand-50 px-3 py-2.5">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
            <p className="mt-0.5 text-base font-bold text-brand-600 sm:text-lg">
              {value}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function PlacementSection() {
  const [selectedProgram, setSelectedProgram] = useState("Placements Overview");
  const tabs = ["Placements Overview", ...Object.keys(programStats)];

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-s">
        <div
          className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 p-3"
          role="tablist"
          aria-label="Placement overview and statistics"
        >
          {tabs.map((program) => (
            <button
              key={program}
              id={`placement-tab-${program.replace(".", "").toLowerCase()}`}
              type="button"
              role="tab"
              aria-selected={selectedProgram === program}
              aria-controls="placement-program-panel"
              onClick={() => setSelectedProgram(program)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 ${
                selectedProgram === program
                  ? "bg-white text-brand-800 shadow-sm ring-1 ring-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {program}
            </button>
          ))}
        </div>
        <div
          id="placement-program-panel"
          className="p-3 sm:p-5"
          role="tabpanel"
          aria-labelledby={`placement-tab-${selectedProgram.replace(".", "").toLowerCase()}`}
        >
          {selectedProgram === "Placements Overview" ? (
            <div className="mx-auto w-full max-w-[1100px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <img
                src="/placement_stats.png"
                alt="Placement statistics overview"
                className="block h-auto max-h-[32rem] w-full object-contain"
              />
            </div>
          ) : (
            <PlacementOutcomeCard
              program={selectedProgram}
              stats={programStats[selectedProgram]}
            />
          )}
        </div>
      </div>
      <RecruitingCompanies />
    </>
  );
}