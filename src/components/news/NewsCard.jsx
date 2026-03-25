export default function NewsCard({ item }) {
  return (
    <div className="bg-white shadow p-4 rounded">
      {/* catégorie */}
      <span className="text-xs bg-gray-200 px-2 py-1 rounded">
        {item.category}
      </span>

      {/* titre */}
      <h2 className="font-semibold mt-2">
        {item.title}
      </h2>

      {/* date */}
      <p className="text-sm text-gray-500">
        {item.date}
      </p>

      {/* contenu */}
      <p className="mt-2">
        {item.content}
      </p>

      {/* image */}
      {item.image && (
        <img
          src={item.image}
          alt=""
          className="mt-2 rounded"
        />
      )}

      {/* vidéo */}
      {item.video && (
        <video controls className="mt-2 rounded">
          <source src={item.video} />
        </video>
      )}
    </div>
  );
}