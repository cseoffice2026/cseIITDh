import Section from "../Section";
import FormerMemberCard from "./FormerMemberCard";

export default function FormerFacultySection({ formerFaculty }) {
  return (
    <Section id="former-faculty" title="Former Faculty">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formerFaculty.map((member) => (
          <FormerMemberCard key={member?.id} {...member} />
        ))}
      </div>
    </Section>
  );
}
