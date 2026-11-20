import Section from "../Section";
import FacultyCard from "./FacultyCard";

export default function DepartmentLeadership({ leadership }) {
  return (
    <Section id="leadership" title="Department Leadership">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {leadership.map((member) => (
          <FacultyCard key={member?.id} {...member} />
        ))}
      </div>
    </Section>
  );
}
