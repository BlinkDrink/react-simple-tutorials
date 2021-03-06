import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		searchQuery: "",
		currentPage: 1,
		sortColumn: { path: "title", order: "asc" },
	};

	// Once the component is rendered, didMount gets called and we set the state here
	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

		this.setState({ movies: getMovies(), genres });
	}

	// Toggles the like buttons against each movie
	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const index = movies.indexOf(movie);
		movies[index] = { ...movies[index] };
		movies[index].liked = !movies[index].liked;
		this.setState({ movies });
	};

	// Mainly used to change the active status of the currently selected page
	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleDelete = (movie) => {
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	handleSearch = (query) => {
		this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
	};

	getPagedData = () => {
		const {
			pageSize,
			currentPage,
			sortColumn,
			selectedGenre,
			movies,
			searchQuery,
		} = this.state;

		let filtered = movies;
		if (searchQuery)
			filtered = movies.filter((m) =>
				m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		else if (selectedGenre && selectedGenre._id)
			filtered = movies.filter((m) => m.genre._id === selectedGenre._id);

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const moviesPerPage = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: moviesPerPage };
	};

	render() {
		const { length: count } = this.state.movies;
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

		const { totalCount, data: moviesPerPage } = this.getPagedData();

		return (
			<div className="row">
				<div className="col-2">
					<ListGroup
						items={this.state.genres}
						selectedItem={this.state.selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>
				<div className="col">
					<Link
						to="/movies/new"
						className="btn btn-primary"
						style={{ marginBottom: 20 }}
					>
						New Movie
					</Link>
					<p className="p-2">Showing {totalCount} movies in the database.</p>
					<SearchBox value={searchQuery} onChange={this.handleSearch} />
					<MoviesTable
						movies={moviesPerPage}
						sortColumn={sortColumn}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>
					<Pagination
						itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
