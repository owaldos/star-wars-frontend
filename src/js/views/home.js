import React, { useEffect, useContext } from "react";
import "../../styles/home.scss";
import { Context } from "../store/appContext";
import RecourseList from "./RecourseList.jsx";
import img_planets from "../../img/img_planets.jpeg";
import img_people from "../../img/img_people.jpeg";
import img_vehicles from "../../img/img_vehicles.jpeg";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getRecourse("people");
		actions.getRecourse("vehicles");
		actions.getRecourse("planets");
	}, []);

	useEffect(
		() => {
			actions.setToken();
		},
		[store.token]
	);

	return (
		<div className="container  ">
			<h2>People</h2>
			<div className="overflow-auto">
				<div className=" " style={{ width: `calc(${store.people.length}* 16rem)` }}>
					{store.people.map(item => (
						<RecourseList key={item.uid} recourse={item} img={img_people} />
					))}
				</div>
			</div>

			<h2>Vehicles</h2>
			<div className="  overflow-auto">
				<div style={{ width: `calc(${store.vehicles.length}* 16rem)` }}>
					{store.vehicles.map(item => (
						<RecourseList key={item.uid} recourse={item} img={img_vehicles} />
					))}
				</div>
			</div>

			<h2>PLanets</h2>
			<div className=" overflow-auto">
				<div style={{ width: `calc(${store.planets.length}* 16rem)` }}>
					{store.planets.map(item => (
						<RecourseList key={item.uid} recourse={item} img={img_planets} />
					))}
				</div>
			</div>
		</div>
	);
};
