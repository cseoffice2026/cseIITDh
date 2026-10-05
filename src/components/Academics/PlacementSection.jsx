import { useState } from "react";
import Section from "../Section";

const programStats = {
  "B.Tech": [
    { label: "Registered", value: "58" },
    { label: "Placed", value: "55" },
    { label: "Opted for competitive exams", value: "0" },
    { label: "Opted for higher education", value: "1" },
    { label: "Placement rate", value: "94.8%" },
  ],
  "M.Tech": [
    { label: "Registered", value: "21" },
    { label: "Placed", value: "20" },
    { label: "Opted for competitive exams", value: "0" },
    { label: "Opted for higher education", value: "1" },
    { label: "Placement rate", value: "95.2%" },
    { label: "Average CTC", value: "15.95 LPA" },
    { label: "Median CTC", value: "12 LPA" },
  ],
};

const programCtc = {
  "B.Tech": [
    { label: "Average", value: 22 },
    { label: "Median", value: 20 },
  ],
  "M.Tech": [
    { label: "Average", value: 15.95 },
    { label: "Median", value: 12 },
  ],
};

function MetricCard({ value, label }) {
  return (
    <div className="flex min-h-24 flex-col justify-center rounded-xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm sm:px-4">
      <div className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {value}
      </div>
      <div className="mt-1.5 text-xs font-medium leading-snug text-slate-500 sm:text-sm">
        {label}
      </div>
    </div>
  );
}

export default function PlacementSection() {
  const [selectedProgram, setSelectedProgram] = useState("B.Tech");
  const [activePlacementSegment, setActivePlacementSegment] = useState(null);
  const [activeCtc, setActiveCtc] = useState(null);
  const stats = programStats[selectedProgram];
  const placed = Number(stats.find(({ label }) => label === "Placed").value);
  const registered = Number(
    stats.find(({ label }) => label === "Registered").value
  );
  const placementRate = (placed / registered) * 100;
  const ctcStats = programCtc[selectedProgram];
  const ctcChartMax =
    Math.ceil(Math.max(...ctcStats.map(({ value }) => value)) / 5) * 5;
  const remaining = registered - placed;
  const circumference = 2 * Math.PI * 78;
  const placedArc = (placementRate / 100) * circumference;

  return (
    <Section id="placements" title="Placements">
      <div className="space-y-5">
        <div
          className="flex w-fit rounded-lg bg-slate-100 p-1"
          role="tablist"
          aria-label="Placement statistics by degree"
        >
          {Object.keys(programStats).map((program) => (
            <button
              key={program}
              id={`placement-tab-${program.replace(".", "").toLowerCase()}`}
              type="button"
              role="tab"
              aria-selected={selectedProgram === program}
              aria-controls="placement-stats-panel"
              onClick={() => setSelectedProgram(program)}
              className={`rounded-md px-5 py-2 text-sm font-semibold transition-colors ${
                selectedProgram === program
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {program}
            </button>
          ))}
        </div>

        <div
          id="placement-stats-panel"
          role="tabpanel"
          aria-labelledby={`placement-tab-${selectedProgram.replace(".", "").toLowerCase()}`}
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {stats.map(({ label, value }) => (
              <MetricCard key={label} value={value} label={label} />
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-800">
                CTC Analysis (LPA)
              </h3>
              <div className="relative mt-5 h-44 border-b border-l border-slate-300">
                {[0, 1, 2, 3].map((line) => (
                  <div
                    key={line}
                    className="absolute right-0 left-0 border-t border-dashed border-slate-200"
                    style={{ bottom: `${(line / 3) * 100}%` }}
                  />
                ))}
                <div className="relative z-10 flex h-full items-end justify-around gap-6 px-6">
                  {ctcStats.map(({ label, value }) => (
                    <div
                      key={label}
                      className="relative flex h-full w-full flex-col items-center justify-end"
                    >
                      {activeCtc === label && (
                        <span className="absolute bottom-[82%] rounded bg-slate-800 px-2 py-1 text-xs font-medium text-white shadow">
                          {value} LPA
                        </span>
                      )}
                      <button
                        type="button"
                        className="w-full max-w-16 rounded-t-md bg-sky-500 transition-colors hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                        style={{ height: `${(value / ctcChartMax) * 78}%` }}
                        aria-label={`${label} CTC: ${value} LPA`}
                        title={`${label}: ${value} LPA`}
                        onMouseEnter={() => setActiveCtc(label)}
                        onMouseLeave={() => setActiveCtc(null)}
                        onFocus={() => setActiveCtc(label)}
                        onBlur={() => setActiveCtc(null)}
                      />
                      <span className="mt-2 text-xs font-medium text-slate-600">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-500">{selectedProgram}</p>
            </div>

            <div className="min-h-[360px] rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-lg font-bold text-slate-800">
                Placement Success Rate
              </h3>
              <div className="relative mt-3 flex h-[285px] flex-col items-center justify-center">
                <div className="relative flex h-52 w-52 items-center justify-center">
                  <svg
                    className="absolute inset-0 h-full w-full -rotate-90 overflow-visible"
                    viewBox="0 0 200 200"
                    role="group"
                    aria-label={`${placed} of ${registered} ${selectedProgram} students placed, ${placementRate.toFixed(1)} percent`}
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r="78"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="36"
                      className="cursor-pointer"
                      strokeDasharray={`${circumference - placedArc} ${placedArc}`}
                      strokeDashoffset={-placedArc}
                      onMouseEnter={() => setActivePlacementSegment("remaining")}
                      onMouseLeave={() => setActivePlacementSegment(null)}
                      onClick={() => setActivePlacementSegment("remaining")}
                      onFocus={() => setActivePlacementSegment("remaining")}
                      onBlur={() => setActivePlacementSegment(null)}
                      tabIndex="0"
                      role="button"
                      aria-label={`Remaining: ${remaining}`}
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="78"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="36"
                      strokeDasharray={`${placedArc} ${circumference - placedArc}`}
                      className="cursor-pointer transition-[stroke-width] hover:stroke-[40px]"
                      onMouseEnter={() => setActivePlacementSegment("placed")}
                      onMouseLeave={() => setActivePlacementSegment(null)}
                      onClick={() => setActivePlacementSegment("placed")}
                      onFocus={() => setActivePlacementSegment("placed")}
                      onBlur={() => setActivePlacementSegment(null)}
                      tabIndex="0"
                      role="button"
                      aria-label={`Placed: ${placed}`}
                    />
                  </svg>
                  <div className="pointer-events-none absolute border border-slate-300 bg-white px-3 py-4 text-sm font-medium text-green-500 shadow-sm">
                    {activePlacementSegment === "remaining"
                      ? `Remaining : ${remaining}`
                      : `Placed : ${placed}`}
                  </div>
                  <div className="absolute -left-3 top-0 flex items-center text-sm font-medium text-green-500">
                    <span>{placementRate.toFixed(0)}%</span>
                    <span className="ml-1 h-px w-7 rotate-45 bg-green-500" />
                  </div>
                </div>
                <div className="mt-7 flex items-center justify-center gap-3 text-sm font-medium">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-green-500"
                    onMouseEnter={() => setActivePlacementSegment("placed")}
                    onMouseLeave={() => setActivePlacementSegment(null)}
                    onFocus={() => setActivePlacementSegment("placed")}
                    onBlur={() => setActivePlacementSegment(null)}
                  >
                    <span className="h-3 w-3 bg-green-500" />
                    Placed
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-slate-400"
                    onMouseEnter={() => setActivePlacementSegment("remaining")}
                    onMouseLeave={() => setActivePlacementSegment(null)}
                    onFocus={() => setActivePlacementSegment("remaining")}
                    onBlur={() => setActivePlacementSegment(null)}
                  >
                    <span className="h-3 w-3 bg-slate-200" />
                    Remaining
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
