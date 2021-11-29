import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Favorites = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="dropdown">
			<button
				className="btn btn-primary dropdown-toggle"
				type="button"
				id="dropdownMenu2"
				data-bs-toggle="dropdown"
				aria-expanded="false">
				Tus favoritos ( {Object.keys(store.favorites).length} )
			</button>
			<ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
				{store.favorites.map(favorite => (
					<li key={favorite.id} className="d-flex justify-content-between mx-1  ">
						<Link
							to="/single"
							className="text-decoration-none"
							onClick={e => {
								actions.createDescription(favorite.url);
							}}>
							{favorite.name_favorite}
						</Link>
						<i
							className="bi bi-trash"
							onClick={e => {
								actions.deleteFavorite(favorite.id);
							}}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Favorites;
