import './HomePage.css'; 
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from '../api/api'; 
import { FaLock, FaLockOpen } from 'react-icons/fa';
const defaultPoster = "https://via.placeholder.com/500x500?text=No+Image+Available";


const HomePage = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [newListVisibility, setNewListVisibility] = useState('private');
  const [addToListDialogOpen, setAddToListDialogOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await axios.get('/lists');
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };

  const searchMovies = async (query) => {
    try {
      const response = await axios.get(`https://blrflixbackend.onrender.com/api/omdb`, {
        params: {
          s: query
        }
      });
      console.log(response);

      setSearchResults(response.data.Search || []);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const openAddToListDialog = (movie) => {
    setSelectedMovie(movie);
    setAddToListDialogOpen(true);
  };

  const closeAddToListDialog = () => {
    setSelectedMovie(null);
    setAddToListDialogOpen(false);
  };

  // const addMovieToList = async (listId) => {
  //   if (listId === 'new') {
  //     // Create a new list and add the movie to it
  //     try {
  //       const response = await axios.post('/lists', {
  //         name: newListName,
  //         movies: [selectedMovie],
  //         visibility: newListVisibility
  //       });
  //       setLists([...lists, response.data]);
  //     } catch (error) {
  //       console.error('Error creating list:', error);
  //     }
  //   } else {
  //     // Add the movie to an existing list
  //     try {
  //       const response = await axios.put(`/lists/${listId}/addMovie`, { movie: selectedMovie });
  //       setLists(lists.map(list => list._id === listId ? response.data : list));
  //     } catch (error) {
  //       console.error('Error adding movie to list:', error);
  //     }
  //   }
  //   closeAddToListDialog();
  // };
  const addMovieToList = async (listId) => {
    if (listId === 'new') {
      // Check if a list with the same name and visibility already exists
      const existingList = lists.find(
        list => list.name === newListName && list.visibility === newListVisibility
      );

      if (existingList) {
        setErrorMessage('A list with the same name and visibility already exists.');
      } else {
        // Create a new list and add the movie to it
        try {
          const response = await axios.post('/lists', {
            name: newListName,
            movies: [selectedMovie],
            visibility: newListVisibility
          });
          setLists([...lists, response.data]);
          closeAddToListDialog();
        } catch (error) {
          console.error('Error creating list:', error);
        }
      }
    } else {
      // Add the movie to an existing list
      try {
        const response = await axios.put(`/lists/${listId}/addMovie`, { movie: selectedMovie });
        setLists(lists.map(list => list._id === listId ? response.data : list));
        closeAddToListDialog();
      } catch (error) {
        console.error('Error adding movie to list:', error);
      }
    }
  };

  const openList = (list) => {
    setSelectedList(list);
  };

  const closeList = () => {
    setSelectedList(null);
  };

  // Function to generate a unique URL for a list
  const generateListURL = (listId) => {
    return `${window.location.origin}/lists/search/${listId}`;
  };

  return (
    <div className="container">
      <h1>Movie Search</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Movies"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchMovies(query);
              }
            }
          }
        />
        <button onClick={() => searchMovies(query)}>Search</button>
      </div>
      <div className="movie-list">
        {searchResults.map((movie) => (
          <div className="movie-card" key={movie.imdbID} onClick={() => openAddToListDialog(movie)}>
            <img src={movie.Poster && movie.Poster!=='N/A' ? movie.Poster : defaultPoster} alt={movie.Title} className="movie-poster"/>
            <div className="movie-info">
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
              <p>Type: {movie.Type}</p>
              {/* <p>IMDb ID: {movie.imdbID}</p> */}
            </div>
          </div>
        ))}
      </div>

      {addToListDialogOpen && (
        <div className="dialog">
          <h2>Add to List</h2>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <p>Select a list to add the movie to:</p>
          <ul>
            {lists.map((list) => (
              <li className="DialogListName" key={list._id} onClick={() => addMovieToList(list._id)}>
                {list.name} - <Link to={generateListURL(list._id)} className='availList2'>Share</Link>
                
              </li>
            ))}
            <li>
              <input
                type="text"
                placeholder="New List Name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
              <select
                value={newListVisibility}
                onChange={(e) => setNewListVisibility(e.target.value)}
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
              <button onClick={() => addMovieToList('new')}>Create and Add</button>
            </li>
          </ul>
          <button onClick={closeAddToListDialog}>Cancel</button>
        </div>
      )}
      <div className="list-details2">
          <h2>Your playLists</h2>
          <ul className="list-details3">
            {lists.map((list) => (
              <li key={list._id} onClick={() => openList(list)} >
                  <div className="left">
                  <p title="Click to view the playlist!">{list.name}</p>  
                  </div>
                  <div className="right">
                  {list.visibility==="public" ? <FaLockOpen /> : <FaLock />}
                  </div>
              </li>
            ))}
          </ul>
          {selectedList && (
        <div className="list-details">
          <h2>{selectedList.name} {selectedList.visibility==="public" ? <FaLockOpen /> : <FaLock />}</h2>
          <Link to={generateListURL(selectedList._id)} className='availList2'>Share</Link>
          {/* <a href={generateListURL(selectedList._id)} className='availList2'>Share</a> */}
          <ul>
            {selectedList.movies.map((movie) => (
              <li key={movie.imdbID}>
                {movie.Title} ({movie.Year})
              </li>
            ))}
          </ul>
          <button onClick={closeList}>Close</button>
        </div>
      )}
      </div>
    </div>
  );
};

export default HomePage;