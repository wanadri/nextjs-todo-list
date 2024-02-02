import Link from "next/link";

async function getCats() {
  const response = await fetch("http://localhost:4000/cats", {
    next: {
      revalidate: 0,
    },
  });

  return response.json();
}

async function CatList() {
  const cats = await getCats();
  return (
    <>
      {cats.map((cat: any) => (
        <div
          key={cat.id}
          className="bg-slate-800 text-white my-2 p-4 m-4 rounded-xl font-semibold"
        >
          <Link href={`/cat/${cat.id}`}>
            <h1>{cat.name}</h1>
            <p>{cat.description}</p>
          </Link>
        </div>
      ))}
      {cats.length === 0 && (
        <div className="bg-slate-800 text-white my-2 p-4 m-4 rounded-xl font-semibold">
          <h1>No cats</h1>
        </div>
      )}
    </>
  );
}

export default CatList;
