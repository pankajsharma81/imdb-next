import Results from "@/components/Results";

export default async function Search({ params }) {
  const searchTerm = params.searchTerm;

  const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`;
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
    console.log(movies);
  } catch (error) {
    console.log("Error Occured !", error);
  }

  return (
    <div>
      {movies && movies.length === 0 && (
        <h1 className="text-center pt-6">No results found</h1>
      )}
      {movies && <Results movies={movies} />}
    </div>
  );
}
