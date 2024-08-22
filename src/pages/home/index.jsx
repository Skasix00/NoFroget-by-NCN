// import { Container } from "@mantine/core";
// import { useCallback, useEffect, useState } from "react";
// import { Get } from "../../helpers/api";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// import AddEvent from "../../components/AddEvent";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";

// import moment from "moment";
// import localization from "moment/locale/pt";

// moment.locale("pt");
// moment.updateLocale("pt", localization);
// const localizer = momentLocalizer(moment);

// export default function Home() {
// 	const [appointments, setAppointments] = useState([]);
// 	const [isModalVisible, setIsModalVisible] = useState(false);

// 	const DnDCalendar = withDragAndDrop(Calendar);

// 	const fetchAppointments = async () => {
// 		try {
// 			let apts = await Get("nofroget/getAll");
// 			if (apts) {
// 				apts = apts.map((item) => ({
// 					...item,
// 					start: new Date(item.start),
// 					end: new Date(item.end),
// 				}));
// 			}
// 			setAppointments(apts);
// 		} catch (error) {
// 			console.error("Failed to fetch appointments:", error);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchAppointments();
// 	}, []);

// 	const handleNewEvent = () => {
// 		setIsModalVisible(true);
// 	};

// 	const handleCloseModal = () => {
// 		setIsModalVisible(false);
// 	};

// 	const addNewAppointment = useCallback((newAppointment) => {
// 		setAppointments((prevAppointments) => [
// 			...prevAppointments,
// 			{
// 				...newAppointment,
// 				start: new Date(newAppointment.start),
// 				end: new Date(newAppointment.end),
// 			},
// 		]);
// 		handleCloseModal();
// 	}, []);

// 	const messages = {
// 		date: "Data",
// 		time: "Duração",
// 		event: "Marcação",
// 		allDay: "Todo o dia",
// 		week: "Semana",
// 		work_week: "Semana Laboral",
// 		day: "Dia",
// 		month: "Mês",
// 		previous: "Anterior",
// 		next: "Próximo",
// 		yesterday: "Ontem",
// 		tomorrow: "Amanhã",
// 		today: "Hoje",
// 		agenda: "Agenda",
// 		noEventsInRange: "Sem marcações nas datas especificadas.",

// 		showMore: (total) => `+${total} marcações`,
// 	};

// 	const formats = {
// 		// the 'date' on each day cell of the 'month' view
// 		dateFormat: "D",
// 		// the day of the week header in the 'month' view
// 		weekdayFormat: (date) => moment(date).format("dddd"),
// 		// the day header in the 'week' and 'day' (Time Grid) views
// 		dayFormat: (date) => moment(date).format("dddd Do"),
// 		// the time in the gutter in the Time Grid views
// 		timeGutterFormat: (date) => moment(date).format("hh:mm"),
// 		dayHeaderFormats: (date) => moment(date).format("dddd @ DO"),
// 	};

// 	console.log("Current locale:", moment.locale()); // Verify locale
// 	console.log("Formatted weekday:", moment().format("dddd"));

// 	return (
// 		<Container fluid size='responsive'>
// 			<button className='btn btn-outline-success' onClick={handleNewEvent}>
// 				Adicionar Nova Marcação
// 			</button>
// 			<AddEvent isVisible={isModalVisible} onClose={handleCloseModal} onAddAppointment={addNewAppointment} />
// 			<br />
// 			{appointments.length > 0 ? (
// 				<DnDCalendar
// 					messages={messages}
// 					formats={formats}
// 					culture={"pt"}
// 					localizer={localizer}
// 					events={appointments}
// 					className='calendar-whitebg mb-4'
// 					dayLayoutAlgorithm={"no-overlap"}
// 					onSelectSlot={handleNewEvent}
// 					draggableAccessor='isDraggable'
// 					onSelectEvent={(event) => alert(JSON.stringify(event))}
// 					onEventDrop={(event) => console.log(event)}
// 					startAccessor='start'
// 					endAccessor='end'
// 					style={{ height: 600 }}
// 					defaultView={"day"}
// 					views={["day", "week", "month", "agenda"]}
// 					selectable
// 					resizable
// 				/>
// 			) : (
// 				<p>No appointments available</p>
// 			)}
// 		</Container>
// 	);
// }

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

export default function Home() {
	const [appointments, setAppointments] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const calendarRef = useRef(null);

	const fetchAppointments = async () => {
		try {
			let apts = await Get("nofroget/getAll");
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

	return (
		<Container fluid size='responsive'>
			<button className='btn btn-outline-success' onClick={handleNewEvent}>
				Adicionar Nova Marcação
			</button>
			<AddEvent isVisible={isModalVisible} onClose={handleCloseModal} onAddAppointment={addNewAppointment} />
			<br />
			{appointments.length > 0 ? (
				<FullCalendar
					ref={calendarRef}
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
					initialView='timeGridWeek' // Default view, can be "dayGridMonth", "timeGridWeek", "listWeek", etc.
					locale={ptLocale}
					editable={true}
					selectable={true}
					events={appointments}
					eventClick={(event) => alert(JSON.stringify(event.event))}
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
