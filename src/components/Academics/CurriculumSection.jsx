import Section from "../Section";

export default function CurriculumSection() {
  return (
    <Section id="curriculum" title="Curriculum">
      {/*}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">B.Tech Program Structure</h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium mb-2">First Year</h4>
            <p className="text-gray-700 mb-3">
              Foundation courses in mathematics, programming, and engineering
              principles.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="font-medium">Semester 1</div>
                <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
                  <li>Calculus and Linear Algebra</li>
                  <li>Introduction to Programming</li>
                  <li>Digital Logic Design</li>
                  <li>Physics for Computing</li>
                  <li>Technical Communication</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="font-medium">Semester 2</div>
                <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
                  <li>Discrete Mathematics</li>
                  <li>Data Structures</li>
                  <li>Computer Organization</li>
                  <li>Probability and Statistics</li>
                  <li>Engineering Ethics</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-2">Second Year</h4>
            <p className="text-gray-700 mb-3">
              Core computer science subjects and fundamental theory.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="font-medium">Semester 3</div>
                <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
                  <li>Design and Analysis of Algorithms</li>
                  <li>Object Oriented Programming</li>
                  <li>Computer Architecture</li>
                  <li>Formal Languages and Automata</li>
                  <li>Economics for Engineers</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="font-medium">Semester 4</div>
                <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
                  <li>Operating Systems</li>
                  <li>Database Management Systems</li>
                  <li>Computer Networks</li>
                  <li>Software Engineering</li>
                  <li>Technical Writing</li>
                </ul>
              </div>
            </div>
          </div>
*/}
    <div className="mt-4 text-center">
  <p className="text-sm text-gray-500 mb-3">
    You can access the curriculum list here:
  </p>
  <a
    href="https://www.iitdh.ac.in/btech-curriculum"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block px-4 py-2 bg-[#19007B] text-white text-sm font-medium rounded-lg shadow hover:bg-[#140063] transition"
  >
    Check Curriculum 
  </a>
</div>
    </Section>
  );
}
