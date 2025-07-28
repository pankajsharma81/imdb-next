import Image from "next/image";
import Link from "next/link";

export default async function MoviePage({ params }) {
  const movieID = params.id;
  const url = `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  };

  let movie;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    movie = data;
  } catch (error) {
    console.log("Error Occured !", error);
  }

  if (!movie) return <div>Movie not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-2 text-center">{movie.title}</h1>
      <p className="italic text-center mb-4">{movie.tagline}</p>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <Image
          src={`https://image.tmdb.org/t/p/original${
            movie.poster_path || movie.backdrop_path
          }`}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-lg shadow-lg w-full md:w-auto"
        />

        <div className="flex-1 space-y-3 text-sm sm:text-base">
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} mins
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average} ({movie.vote_count}{" "}
            votes)
          </p>
          <p>
            <strong>Language:</strong> {movie.original_language.toUpperCase()}
          </p>
          <p>
            <strong>Genres:</strong>{" "}
            {movie.genres.map((g) => g.name).join(", ")}
          </p>
          <p>
            <strong>Overview:</strong> {movie.overview}
          </p>

          {movie.homepage && (
            <p>
              <Link
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Visit Official Website
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
