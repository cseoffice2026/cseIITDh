import Section from "../Section";
import FormerMemberCard from "./FormerMemberCard";

export default function FormerMemberSection({ formerFaculty, formerStaff }) {
  return (
    <Section id="former-members" title="Former Members">
      <div className="space-y-10">
        {/* Former Faculty */}
        <div id="former-faculty" className="scroll-mt-[136px]">
          <h3 className="text-xl font-semibold text-gray-800 mb-5">
            Former Faculty
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {formerFaculty.length > 0 ? (
              formerFaculty.map((member) => (
                <FormerMemberCard key={member?.id} {...member} />
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No former faculty records available.
              </p>
            )}
          </div>
        </div>

        {/* Former Staff */}
        <div id="former-staff" className="scroll-mt-[136px]">
          <h3 className="text-xl font-semibold text-gray-800 mb-5">
            Former Staff
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {formerStaff.length > 0 ? (
              formerStaff.map((member) => (
                <FormerMemberCard key={member?.id} {...member} />
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No former staff records available.
              </p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}