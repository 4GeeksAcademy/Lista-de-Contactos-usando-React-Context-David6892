const agendaSlug = "davidgarcia-contactlist";

const BASE_URL = "https://playground.4geeks.com/contact/agendas";

export const initialStore = () => ({
	contacts: [],
	loading: false,
	error: null,

	getContacts: async () => {
		try {
			const response = await fetch(
				`${BASE_URL}/${agendaSlug}/contacts`
			);

			if (!response.ok) {
				throw new Error("Error fetching contacts");
			}

			const data = await response.json();

			if (Array.isArray(data)) return data;
			if (Array.isArray(data?.contacts)) return data.contacts;

			return [];
		} catch (error) {
			console.log(error);
			return [];
		}
	},

	addContact: async (contact) => {
		try {
			const response = await fetch(
				`${BASE_URL}/${agendaSlug}/contacts`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						...contact,
						agenda_slug: agendaSlug
					})
				}
			);

			if (!response.ok) {
				throw new Error("Error creating contact");
			}

			return await response.json();
		} catch (error) {
			console.log(error);
		}
	},

	updateContact: async (id, contact) => {
		try {
			const response = await fetch(
				`${BASE_URL}/${agendaSlug}/contacts/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						...contact,
						agenda_slug: agendaSlug
					})
				}
			);

			if (!response.ok) {
				throw new Error("Error updating contact");
			}

			return await response.json();
		} catch (error) {
			console.log(error);
		}
	},

	deleteContact: async (id) => {
		try {
			const response = await fetch(
				`${BASE_URL}/${agendaSlug}/contacts/${id}`,
				{
					method: "DELETE"
				}
			);

			if (!response.ok) {
				throw new Error("Error deleting contact");
			}

			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	}
});

export default function storeReducer(store, action = {}) {
	switch (action.type) {
		case "set_contacts":
			return {
				...store,
				contacts: action.payload,
				loading: false,
				error: null
			};

		case "set_loading":
			return {
				...store,
				loading: action.payload
			};

		case "set_error":
			return {
				...store,
				error: action.payload,
				loading: false
			};

		default:
			return store;
	}
}