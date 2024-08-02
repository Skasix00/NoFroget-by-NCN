import { Container } from "@mantine/core";
import "./index.css";
import "../../common/styles/index.css";
import { useEffect, useState } from "react";
import { Get, Post } from "../../helpers/api";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import AddEvent from "../../components/AddEvent";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
	const localizer = momentLocalizer(moment);
	const [appointements, setAppointments] = useState([]);

	const DnDCalendar = withDragAndDrop(Calendar);

	const GetAppointments = async () => {
		let apts = await Get("nofroget/getAll");
		return apts;
	};

	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				let apts = await GetAppointments();
				if (apts) {
					apts.map((item) => {
						item.start = new Date(item.start);
						item.end = new Date(item.end);
					});
				}
				setAppointments(apts);
			} catch (error) {
				console.error("Failed to fetch appointments:", error);
			}
		};
		fetchAppointments();
	}, []);

	function HandleEventDrop({ event }) {
		console.log(event);
	}
	function newEvent(e) {
		e.preventDefault;
		console.log("Teste");
	}
	function ViewEvent(event) {
		alert(JSON.stringify(event));
	}
	return (
		<Container fluid size='responsive'>
			<AddEvent />
			<br></br>
			{appointements ? (
				<div>
					<DnDCalendar
						className='calendar-whitebg mb-4'
						dayLayoutAlgorithm={"no-overlap"}
						onSelectSlot={newEvent}
						resizable
						localizer={localizer}
						events={appointements}
						draggableAccessor='isDraggable'
						onSelectEvent={(event) => ViewEvent(event)}
						onEventDrop={HandleEventDrop}
						startAccessor='start'
						endAccessor='end'
						style={{ height: 600 }}
						defaultView={"day"}
						views={["day", "week", "month", "agenda"]}
						selectable
					/>
				</div>
			) : (
				<></>
			)}
		</Container>
	);
}
