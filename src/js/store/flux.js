const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: [],
			planets: [],
			vehicles: [],
			favorites: [],
			description: "",
			token: undefined,
			url: "http://127.0.0.1:8000",
			user: ""
		},
		actions: {
			setToken: () => {
				const actions = getActions();
				setStore({ token: localStorage.getItem("token"), user: localStorage.getItem("user") });
				actions.getFavorites();
			},

			deleteToken: () => {
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				setStore({ token: undefined, favorites: [] });
			},

			getRecourse: async type => {
				let response = await fetch(`https://www.swapi.tech/api/${type}/`);
				let data = await response.json();
				type == "people"
					? setStore({ people: data.results })
					: type == "vehicles"
						? setStore({ vehicles: data.results })
						: setStore({ planets: data.results });
			},
			saveFavorites: async (name, url, img) => {
				const prevStore = getStore();

				let data = {
					url: url,
					name_favorite: name
				};

				if (prevStore.token) {
					let response = await fetch(`${prevStore.url}/favorites/add`, {
						method: "POST",
						headers: {
							Authorization: `Bearer ${prevStore.token}`,
							"content-type": "application/json"
						},
						body: JSON.stringify(data)
					});
					let body = await response.json();
					if (body) setStore({ favorites: [...prevStore.favorites, body] });
				}
			},

			getFavorites: async () => {
				const prevStore = getStore();

				if (prevStore.token) {
					let response = await fetch(`${prevStore.url}/favorites`, {
						method: "GET",
						headers: { Authorization: `Bearer ${prevStore.token}` }
					});
					let body = await response.json();
					setStore({ favorites: body });
				}
			},

			deleteFavorite: async id => {
				const prevStore = getStore();
				const actions = getActions();

				if (prevStore.token) {
					let response = await fetch(`${prevStore.url}/favorites/delete/${id}`, {
						method: "DELETE",
						headers: { Authorization: `Bearer ${prevStore.token}` }
					});

					let body = await response.json();
					if (response.ok) {
						actions.getFavorites();
					} else alert(body.message);
				}
			},

			createDescription: async (url, img) => {
				let response = await fetch(url);
				let data = await response.json();
				setStore({ description: { data: data.result } });
			}
		}
	};
};

export default getState;
