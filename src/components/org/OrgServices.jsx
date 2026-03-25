import MemberCard from "./MemberCard";

export default function OrgServices({ members }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Collaborateurs
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
          />
        ))}
      </div>
    </div>
  );
}