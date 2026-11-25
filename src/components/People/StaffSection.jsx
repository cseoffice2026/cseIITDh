import Section from "../Section";
import StaffCard from "./StaffCard";

export default function StaffSection({ staffMembers }) {
  return (
    <Section id="staff" title="Staff Members">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {staffMembers.map((member) => (
          <StaffCard key={member?.id} {...member} />
        ))}
      </div>
    </Section>
  );
}
