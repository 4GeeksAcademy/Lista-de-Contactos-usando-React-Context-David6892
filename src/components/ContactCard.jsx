import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactCard = ({ contact }) => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);

	const handleDelete = async () => {
		await store.deleteContact(contact.id);

		const contacts = await store.getContacts();

		dispatch({
			type: "set_contacts",
			payload: contacts
		});

		setShowModal(false);
	};

	return (
		<div className="card mb-3 p-3">

			<h4>{contact.name}</h4>
			<p>{contact.email}</p>
			<p>{contact.phone}</p>
			<p>{contact.address}</p>

			<div className="d-flex gap-2">
				<button
					className="btn btn-warning"
					onClick={() => navigate(`/edit/${contact.id}`)}
				>
					Edit
				</button>

				<button
					className="btn btn-danger"
					onClick={() => setShowModal(true)}
				>
					Delete
				</button>
			</div>

			
			{showModal && (
				<div className="modal d-block" tabIndex="-1">
					<div className="modal-dialog">
						<div className="modal-content">

							<div className="modal-header">
								<h5 className="modal-title">
									Confirm delete
								</h5>
							</div>

							<div className="modal-body">
								<p>Are you sure you want to delete this contact?</p>
							</div>

							<div className="modal-footer">
								<button
									className="btn btn-secondary"
									onClick={() => setShowModal(false)}
								>
									Cancel
								</button>

								<button
									className="btn btn-danger"
									onClick={handleDelete}
								>
									Delete
								</button>
							</div>

						</div>
					</div>
				</div>
			)}
		</div>
	);
};