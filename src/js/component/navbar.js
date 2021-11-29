import React, { useContext } from "react";
import { Link } from "react-router-dom";
import starwars from "../../img/starwars.png";
import { Context } from "../store/appContext";
import Favorites from "./FavoritesList.jsx";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<div className="container d-flex justify-content-between">
				<div className="d-flex align-items-center ">
					<Link to="/">
						<img src={starwars} alt="Star Wars" style={{ width: "80px" }} />
					</Link>
					{store.token && (
						<div className="mx-2">
							<p className="mb-0"> Bienvenido(a)</p>
							<h1 className="m-0">{store.user}</h1>
						</div>
					)}
				</div>
				<div className="d-flex">
					{!store.token && (
						<>
							<Link className="btn btn-primary mx-1" to="/signup">
								Sign up
							</Link>
							<Link className="btn btn-primary" to="/login">
								Log In
							</Link>
						</>
					)}

					{store.token && (
						<>
							<Link to="/" className="btn btn-danger mx-1" onClick={() => actions.deleteToken()}>
								Cerrar sesión
							</Link>
							<Favorites />
						</>
					)}
				</div>
			</div>
		</nav>
	);
};
