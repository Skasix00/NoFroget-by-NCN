import { Container } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { Get } from "../../helpers/api";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list"; // For drag-and-drop
import ptLocale from "@fullcalendar/core/locales/pt";
import AddEvent from "../../components/AddEvent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ViewEvent from "../../components/ViewEvent";

export default function Home() {
	const [appointments, setAppointments] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isViewModalVisible, setIsViewModalVisible] = useState(false);
	const calendarRef = useRef(null);
	const [appointmentID, setAppointmentID] = useState(0);

	const fetchAppointments = async () => {
		try {
			let apts = await Get("nofroget/post/getAll");
			if (apts) {
				apts = apts.map((item) => ({
					...item,
					start: new Date(item.start),
					end: new Date(item.end),
				}));
			}
			setAppointments(apts);
		} catch (error) {
			console.error("Failed to fetch appointments:", error);
		}
	};

	useEffect(() => {
		fetchAppointments();
	}, []);

	const handleNewEvent = () => {
		setIsModalVisible(true);
	};

	const handleCloseModal = () => {
		setIsModalVisible(false);
	};
	const handleViewCloseModal = () => {
		setIsViewModalVisible(false);
	};

	const addNewAppointment = useCallback((newAppointment) => {
		setAppointments((prevAppointments) => [
			...prevAppointments,
			{
				...newAppointment,
				start: new Date(newAppointment.start),
				end: new Date(newAppointment.end),
			},
		]);
		handleCloseModal();
	}, []);

	const viewAppointmentDetails = (info) => {
		var id = info.event.extendedProps._id;
		setAppointmentID(id);
		setIsViewModalVisible(true);
	};
	return (
		<Container fluid size='responsive'>
			<button className='btn btn-outline-success' onClick={handleNewEvent}>
				Adicionar Nova Marcação
			</button>
			<AddEvent isVisible={isModalVisible} onClose={handleCloseModal} onAddAppointment={addNewAppointment} />
			<ViewEvent isVisible={isViewModalVisible} onClose={handleViewCloseModal} appointmentID={appointmentID} />
			<br />
			{appointments.length > 0 ? (
				<FullCalendar
					ref={calendarRef}
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
					initialView='timeGridWeek'
					locale={ptLocale}
					editable={true}
					selectable={true}
					events={appointments}
					eventClick={(info) => viewAppointmentDetails(info)}
					dateClick={handleNewEvent}
					// eventDrop={(info) => {
					//     const updatedAppointments = appointments.map((event) => {
					//         if (event.id === info.event.id) {
					//             return {
					//                 ...event,
					//                 start: info.event.start,
					//                 end: info.event.end,
					//             };
					//         }
					//         return event;
					//     });
					//     setAppointments(updatedAppointments);
					// }}
					// eventResize={(info) => {
					//     const updatedAppointments = appointments.map((event) => {
					//         if (event.id === info.event.id) {
					//             return {
					//                 ...event,
					//                 start: info.event.start,
					//                 end: info.event.end,
					//             };
					//         }
					//         return event;
					//     });
					//     setAppointments(updatedAppointments);
					// }}
					height={600}
					headerToolbar={{
						left: "prev,next today",
						center: "title",
						right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
					}}
					viewClassNames={["custom-calendar", "calendar-whitebg", "mb-4"]}
				/>
			) : (
				<p>No appointments available</p>
			)}
		</Container>
	);
}
