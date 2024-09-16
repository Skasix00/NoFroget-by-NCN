import { useState } from "react";
import { Container } from "@mantine/core";
import ListingClients from "./clientManagent/listingClient";
import ListingServices from "./serviceManagement/listingService";
import ClientManagement from "./clientManagent/index";
import ServiceManagement from "./serviceManagement/index";
import { Draggable, Droppable, DragDropContext } from "@hello-pangea/dnd";
import "./index.css";

// Reordering function to update the list positions
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

export default function Management() {
	const [items, setItems] = useState([
		{ id: "0", content: <ListingClients /> },
		{ id: "1", content: <ListingServices /> },
	]);

	const handleOnDragEnd = (result) => {
		if (!result.destination) return;

		const reorderedItems = reorder(items, result.source.index, result.destination.index);
		setItems(reorderedItems);
	};

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Container fluid size='responsive'>
				<section>
					<div className='white-bg border-15 mb-4 p-3 shadow-bg'>
						<Droppable droppableId='droppable-list'>
							{(provided) => (
								<div {...provided.droppableProps} ref={provided.innerRef}>
									<div className='row'>
										{items.map((item, index) => (
											<Draggable key={item.id} draggableId={item.id} index={index}>
												{(provided, snapshot) => (
													<div
														className='col-md-6'
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														style={{
															...provided.draggableProps.style,
															opacity: snapshot.isDragging ? 0.9 : 1,
															transform: snapshot.isDragging ? provided.draggableProps.style.transform : "none",
															transition: "transform 0.2s ease",
														}}
													>
														{item.content}
													</div>
												)}
											</Draggable>
										))}
									</div>
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</div>
					<div className='white-bg border-15 shadow-bg mb-3'>
						<ClientManagement />
					</div>

					<div className='white-bg border-15 shadow-bg mb-3'>
						<ServiceManagement />
					</div>
				</section>
			</Container>
		</DragDropContext>
	);
}
