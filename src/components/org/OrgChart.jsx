export default function OrgChart({ members }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Organigramme
      </h2>

      <div className="bg-gray-100 p-4 rounded text-sm">
        <pre>
          {JSON.stringify(members, null, 2)}
        </pre>
      </div>
    </div>
  );
}