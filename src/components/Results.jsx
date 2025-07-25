import React from 'react'

export default function Results({movies}) {
  return (
    <div>
      {movies.map((movie) => {
        return (
          <div key={movie.id} className="flex flex-col p-4 ">
            <p className="text-2xl font-semibold"> {movie.title}</p>
            {/* <p>{movie.overview}</p> */}
          </div>
        );
      })}
    </div>
  )
}
