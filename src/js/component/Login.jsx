import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const Login = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const handleClick = async () => {
		let data = {
			user_name: user,
			password
		};
		const response = await fetch(store.url + "/login", {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(data)
		});
		const body = await response.json();
		if (response.ok) {
			localStorage.setItem("token", body.token);
			localStorage.setItem("user", body.user_name);
			actions.setToken();
			history.push("/");
		} else {
			alert(body.message);
		}
	};
	return (
		<div className="container  d-flex justify-content-center">
			<form className="w-50 card ">
				<div className="m-5">
					<legend>Inicia sesión</legend>
					<div className="mb-3">
						<label className="form-label">Nombre de Usuario</label>
						<input
							type="text"
							className="form-control"
							aria-describedby="emailHelp"
							onChange={e => setUser(e.target.value)}
							value={user}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Password</label>
						<input
							type="password"
							className="form-control"
							onChange={e => setPassword(e.target.value)}
							value={password}
						/>
					</div>

					<button type="button" className="btn btn-primary" onClick={handleClick}>
						Iniciar
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
