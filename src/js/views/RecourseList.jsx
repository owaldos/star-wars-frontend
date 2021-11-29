import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import reactRouterDom, { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Context } from "../store/appContext";

const RecourseList = ({ recourse, img }) => {
	const { store, actions } = useContext(Context);

	let isFavorite = store.favorites.find(favorite => favorite.name_favorite === recourse.name);

	return (
		<div className="card d-inline-flex mx-3" style={{ width: "14rem" }}>
			<img src={img} className="card-img-top" alt="..." />

			<div className="card-body">
				<h5 className="card-title">{recourse.name}</h5>

				<div className=" d-flex justify-content-between">
					<Link to="/single" onClick={() => actions.createDescription(recourse.url, img)}>
						<span className="btn btn-primary " href="#" role="button">
							Go somewhere
						</span>
					</Link>
					<button
						type="button"
						className="btn btn-light rounded-circle"
						onClick={() => {
							if (isFavorite === undefined) {
								actions.saveFavorites(recourse.name, recourse.url, img);
							} else actions.deleteFavorite(isFavorite.id);
						}}>
						{isFavorite === undefined ? (
							<i className="bi bi-heart text-primary" />
						) : (
							<i className="bi bi-heart text-danger" />
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default RecourseList;
RecourseList.propTypes = {
	recourse: PropTypes.object,
	img: PropTypes.string
};
