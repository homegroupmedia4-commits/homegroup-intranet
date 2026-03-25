import NewsCard from "./NewsCard";

export default function NewsGrid({ news }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {news.map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
    </div>
  );
}