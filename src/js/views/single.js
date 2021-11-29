import React, { useContext } from "react";
import PropTypes, { object } from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export const Single = props => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="container">
				<div className=" row">
					<div className="col-6">
						<img
							src={store.description.img}
							className="img-fluid rounded-start"
							alt="..."
							style={{ width: "80%" }}
						/>
					</div>
					<div className=" row col-6 text-center">
						<h2 className="mx-auto">
							{store.description.data ? store.description.data.properties.name : null}
						</h2>
						<h4>{store.description.data ? store.description.data.description : null}</h4>
						<p>
							Star Wars, conocida también en español como La guerra de las galaxias, es una franquicia
							compuesta primordialmente de una serie de películas concebidas por el cineasta
							estadounidense George Lucas en la década de 1970
						</p>
					</div>
				</div>
				<div className="d-flex overflow-auto border-top border-danger mt-3">
					{store.description.data
						? Object.keys(store.description.data.properties).map((item, index) => {
								return (
									<div className="mx-3" key={index} style={{ color: "red" }}>
										<h6>{item}</h6>
										<p>{store.description.data.properties[item]}</p>
									</div>
								);
						  })
						: ""}
				</div>
			</div>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
