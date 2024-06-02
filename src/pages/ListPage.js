// import React, { useState, useEffect } from 'react';
// import axios from '../api/api'; // Use the authorized axios instance
// import { useParams } from 'react-router-dom';
// import "./ListPage.css";

// const ListPage = () => {
//   const { listId } = useParams();
//   const [list, setList] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchList = async () => {
//       try {
//         const response = await axios.get(`/lists/search/${listId}`);
//         setList(response.data);
//       } catch (error) {
//         setError('Error fetching list. It might be private or does not exist.');
//       }
//     };

//     fetchList();
//   }, [listId]);

//   if (error) {
//     return <div>{error}</div>;
//   }
//   const handleShare = () => {
//     const url = window.location.href;
//     navigator.clipboard.writeText(url).then(() => {
//       alert('Playlist link copied!');
//     });
//   };

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!list) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="movie-list-container">
//       <div className="movie-list">
//         {list.movies.map((movie) => (
//           <div className="movie-card" key={movie.imdbID}>
//             <img src={movie.Poster} alt={movie.Title} className="movie-poster"/>
//             <div className="movie-info">
//               <h3>{movie.Title}</h3>
//               <p>Year: {movie.Year}</p>
//               <p>Type: {movie.Type}</p>
//               {/* <p>IMDb ID: {movie.imdbID}</p> */}
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="share-button-container">
//         <button onClick={handleShare} className="share-button">Share List</button>
//       </div>
//     </div>
//   );
// };

// export default ListPage;
import React, { useState, useEffect } from 'react';
import axios from '../api/api'; // Use the authorized axios instance
import { useParams } from 'react-router-dom';
import "./ListPage.css";

const ListPage = () => {
  const { listId } = useParams();
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(`/lists/search/${listId}`);
        setList(response.data);
      } catch (error) {
        setError('Error fetching list. It might be private or does not exist.');
      }
    };

    fetchList();
  }, [listId]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('List link copied to clipboard!');
    });
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-container">
      <div className="list-content">
        <h2 className="list-title">{list.name}</h2>
        <div className="movie-list">
          {list.movies.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} className="movie-poster"/>
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>Year: {movie.Year}</p>
                <p>Type: {movie.Type}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="share-button-container">
          <button onClick={handleShare} className="share-button">Share List</button>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
