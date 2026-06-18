import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	const loadContacts = async () => {
		dispatch({ type: "set_loading", payload: true });

		try {
			const contacts = await store.getContacts();

			dispatch({
				type: "set_contacts",
				payload: contacts
			});
		} catch (error) {
			dispatch({
				type: "set_error",
				payload: "Error loading contacts"
			});
		}
	};

	useEffect(() => {
		loadContacts();
	}, []);

	return (
		<div className="container mt-4">

			<div className="d-flex justify-content-between align-items-center mb-3">
				<h1>Contact List</h1>

				<Link className="btn btn-success" to="/add-contact">
					Add Contact
				</Link>
			</div>

			{store.loading && <p>Loading contacts...</p>}

			{store.error && (
				<div className="alert alert-danger">
					{store.error}
				</div>
			)}

			{store.contacts.length === 0 && !store.loading ? (
				<p>No contacts yet</p>
			) : (
				store.contacts.map(contact => (
					<ContactCard
						key={contact.id}
						contact={contact}
					/>
				))
			)}
		</div>
	);
};