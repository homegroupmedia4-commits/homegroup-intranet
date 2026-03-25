export default function MemberCard({ member }) {
  return (
    <div className="p-4 shadow rounded bg-white">
      <div className="font-bold">{member.name}</div>

      <div className="text-sm text-gray-500">
        {member.role}
      </div>

      <p className="mt-2 text-sm">
        {member.desc}
      </p>

      <button className="mt-3 text-blue-500">
        Coordonnées
      </button>
    </div>
  );
}