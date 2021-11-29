import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const Signup = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const handleClick = async () => {
		let data = {
			username: user,
			password
		};
		const response = await fetch(store.url + "/users", {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(data)
		});
		if (response.ok) {
			history.push("/login");
		} else alert(response.statusText);
	};
	return (
		<div className="container  d-flex justify-content-center">
			<form className="w-50 card ">
				<div className="m-5">
					<legend>Registrar</legend>
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
						Enviar
					</button>
				</div>
			</form>
		</div>
	);
};

export default Signup;
