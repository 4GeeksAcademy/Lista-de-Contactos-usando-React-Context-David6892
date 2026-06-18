import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const AddContact = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();
	const { id } = useParams();

	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		address: ""
	});

	useEffect(() => {
		if (id) {
			const contact = store.contacts.find(
				c => c.id === parseInt(id)
			);

			if (contact) setForm(contact);
		}
	}, [id, store.contacts]);

	const handleChange = e => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const payload = {
			...form,
			agenda_slug: "davidgarcia-contactlist"
		};

		if (id) {
			await store.updateContact(id, payload);
		} else {
			await store.addContact(payload);
		}

		const contacts = await store.getContacts();

		dispatch({
			type: "set_contacts",
			payload: contacts
		});

		navigate("/");
	};

	return (
		<div className="container">

			<h1>{id ? "Edit Contact" : "Add Contact"}</h1>

			<form onSubmit={handleSubmit}>

				<input className="form-control mb-2"
					name="name"
					value={form.name}
					onChange={handleChange}
					placeholder="Name"
				/>

				<input className="form-control mb-2"
					name="email"
					value={form.email}
					onChange={handleChange}
					placeholder="Email"
				/>

				<input className="form-control mb-2"
					name="phone"
					value={form.phone}
					onChange={handleChange}
					placeholder="Phone"
				/>

				<input className="form-control mb-2"
					name="address"
					value={form.address}
					onChange={handleChange}
					placeholder="Address"
				/>

				<button className="btn btn-primary">
					Save
				</button>

			</form>
		</div>
	);
};