import Results from "@/components/Results";

export default async function Home({ searchParams }) {
  const genre = searchParams?.genre || "fetchTrending";

  const url = `https://api.themoviedb.org/3${
    genre === "fetchTopRated" ? "/movie/top_rated?" : "/trending/all/week?"
  }language=en-US&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  };

  let movies;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    movies = data?.results;
    console.log(data.results);
  } catch (error) {
    console.log("Error Occured !", error);
  }

  return (
    <div>
      <Results movies={movies}/>
    </div>
  );
}
