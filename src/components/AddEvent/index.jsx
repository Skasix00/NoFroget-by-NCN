import { useEffect, useState } from "react";
import { Get, Post } from "../../helpers/api";
import { notifications } from "@mantine/notifications";
import "./index.css";

export default function AddEvent({visible}) {
	const [isVisible, setIsVisible] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [starthours, setStartHours] = useState("00");
	const [startminutes, setStartMinutes] = useState("00");
	const [endDate, setEndDate] = useState("");
	const [endhours, setEndHours] = useState("00");
	const [endminutes, setEndMinutes] = useState("00");
	const [startDateTime, setStartDateTime] = useState("");
	const [endDateTime, setEndDateTime] = useState("");
	const [clients, setClients] = useState(undefined);
	const [services, setServices] = useState(undefined);
	const [npessoas, setNpessoas] = useState("");
	const [descricao, setDescricao] = useState("");
	const [cliente, setCliente] = useState("none");
	const [servico, setServico] = useState("none");
	const [titulo, setTitulo] = useState("");

	const handleSetDateTime = () => {
		if (startDate) {
			const formattedStartDateTime = `${startDate}T${starthours.padStart(2, "0")}:${startminutes.padStart(2, "0")}`;
			setStartDateTime(formattedStartDateTime);
		}
		if (endDate) {
			const formattedEndDateTime = `${endDate}T${endhours.padStart(2, "0")}:${endminutes.padStart(2, "0")}`;
			setEndDateTime(formattedEndDateTime);
		}
	};

	useEffect(() => {
		if (!clients && !services) {
			const getClients = async () => {
				let clients = await Get("nofroget/clients/getAll");
				setClients(clients);
			};
			const getServices = async () => {
				let services = await Get("nofroget/services/getAll");
				setServices(services);
			};
			getServices();
			getClients();
		}
	}, [clients, services]);

	useEffect(() => {
		const handleSetDateTime = () => {
			if (startDate) {
				const formattedStartDateTime = `${startDate}T${starthours.padStart(2, "0")}:${startminutes.padStart(2, "0")}`;
				setStartDateTime(formattedStartDateTime);
			}
			if (endDate) {
				const formattedEndDateTime = `${endDate}T${endhours.padStart(2, "0")}:${endminutes.padStart(2, "0")}`;
				setEndDateTime(formattedEndDateTime);
			}
		};

		handleSetDateTime();
	}, [startDate, endDate, starthours, startminutes, endhours, endminutes]);

	const handleFormSubmit = async () => {
		let msg = "";

		if (startDateTime === "") {
			msg += "Preencha a data de inicio\n";
		}

		if (endDateTime === "") {
			msg += "Preencha a data de fim \n";
		}
		if (cliente === "none") {
			msg += "Indique a cliente a marcar\n";
		}
		if (titulo === "") {
			msg += "Preencha o titulo\n";
		}
		if (servico === "none") {
			msg += "Preencha o serviço\n";
		}
		if (npessoas === "") {
			msg += "Indique o numero de pessoas\n";
		}
		if (descricao === "") {
			msg += "Preencha a descrição\n";
		}

		const appointment = {
			title: titulo,
			start: startDateTime,
			end: endDateTime,
			client: cliente,
			description: descricao,
			nofpersons: npessoas,
			category: servico,
		};

		if (msg) {
			alert(`Campos em Falta:\n\n${msg}`);
		} else {
			let newAppointment = await Post("nofroget/post/addNew", appointment);
			console.log(newAppointment);

			if (newAppointment === "OK") {
				notifications.show({
					title: "Marcação criada com sucesso.",
					message: "Continue o bom trabalho!!",
					autoClose: 3000,
					color: "green",
					className: "notification",
					withBorder: true,
				});

				setIsVisible(!isVisible);
			}
		}
	};
	return (
		<>
			<button className='btn btn-outline-success' data-toggle='modal' data-target='#exampleModal' onClick={(e) => setIsVisible(!isVisible)}>
				Adicionar Nova Marcação
			</button>
			<div>
				<div className='modal' id='exampleModal' role='dialog' style={{ display: isVisible ? "block" : "none" }}>
					<div className='modal-dialog' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title'>Nova Marcação</h5>
							</div>
							<div className='modal-body'>
								<div className='row'>
									<div className='col-lg-12'>
										<div className='form-group'>
											<label htmlFor='tituloInput'>Titulo</label>
											<input type='text' className='form-control' id='tituloInput' name='tituloInput' value={titulo} onChange={(e) => setTitulo(e.target.value)}></input>
										</div>
										<div className='form-group'>
											<label htmlFor='serviceInput'>Serviço</label>
											<select name='serviceInput' id='serviceInput' className='form-control' value={servico} onChange={(e) => setServico(e.target.value)}>
												<option value='none'>-- Escolha um serviço --</option>
												{services ? (
													services.map((s) => (
														<option key={s._id} value={s.title}>
															{s.title}
														</option>
													))
												) : (
													<option value='0'>Sem serviços</option>
												)}
											</select>
										</div>
										<br></br>
										<div className='form-group row'>
											<label htmlFor='startDateInput' className='col-sm-2 col-form-label'>
												Inicio
											</label>
											<div className='col-sm-4'>
												<input type='date' className='form-control' id='startDateInput' name='startDateInput' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
											</div>
											<label htmlFor='hours' className='col-sm-1 col-form-label'></label>
											<div className='col-sm-2'>
												<select id='hours' className='form-control' value={starthours} onChange={(e) => setStartHours(e.target.value)}>
													{[...Array(24).keys()].map((hour) => (
														<option key={hour} value={hour < 10 ? `0${hour}` : hour}>
															{hour < 10 ? `0${hour}` : hour}
														</option>
													))}
												</select>
											</div>
											<label htmlFor='minutes' className='col-sm-1 col-form-label'>
												:
											</label>
											<div className='col-sm-2'>
												<select id='minutes' className='form-control' value={startminutes} onChange={(e) => setStartMinutes(e.target.value)}>
													{[...Array(60).keys()].map((minute) => (
														<option key={minute} value={minute < 10 ? `0${minute}` : minute}>
															{minute < 10 ? `0${minute}` : minute}
														</option>
													))}
												</select>
											</div>
										</div>
										<br></br>
										<div className='form-group row'>
											<label htmlFor='endDateInput' className='col-sm-2 col-form-label'>
												Fim
											</label>
											<div className='col-sm-4'>
												<input type='date' className='form-control' id='endDateInput' name='endDateInput' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
											</div>
											<label htmlFor='hours' className='col-sm-1 col-form-label'></label>
											<div className='col-sm-2'>
												<select id='hours' className='form-control' value={endhours} onChange={(e) => setEndHours(e.target.value)}>
													{[...Array(24).keys()].map((hour) => (
														<option key={hour} value={hour < 10 ? `0${hour}` : hour}>
															{hour < 10 ? `0${hour}` : hour}
														</option>
													))}
												</select>
											</div>
											<label htmlFor='minutes' className='col-sm-1 col-form-label'>
												:
											</label>
											<div className='col-sm-2'>
												<select id='minutes' className='form-control' value={endminutes} onChange={(e) => setEndMinutes(e.target.value)}>
													{[...Array(60).keys()].map((minute) => (
														<option key={minute} value={minute < 10 ? `0${minute}` : minute}>
															{minute < 10 ? `0${minute}` : minute}
														</option>
													))}
												</select>
											</div>
										</div>
										<br></br>
										<div className='form-group'>
											<label htmlFor='clienteNameInput'>Cliente</label>
											<select className='form-control' id='clienteNameInput' name='clienteNameInput' value={cliente} onChange={(e) => setCliente(e.target.value)}>
												<option value='none'>-- Escolha um cliente --</option>
												{clients ? (
													clients.map((s) => (
														<option key={s._id} value={s.ClientName}>
															{s.ClientName}
														</option>
													))
												) : (
													<option value='0'>Sem serviços</option>
												)}
											</select>
										</div>
										<div className='form-group'>
											<label htmlFor='nPersonsInput'>Nº de Pessoas</label>
											<input type='text' className='form-control' id='nPersonsInput' name='nPersonsInput' value={npessoas} onChange={(e) => setNpessoas(e.target.value)}></input>
										</div>
										<div className='form-group'>
											<label htmlFor='descriptionInput'>Descrição</label>
											<input
												type='text'
												className='form-control'
												id='descriptionInput'
												name='descriptionInput'
												value={descricao}
												onChange={(e) => {
													setDescricao(e.target.value);
												}}
											></input>
										</div>
									</div>
								</div>
							</div>
							<div className='modal-footer'>
								<button type='button' className='btn btn-secondary' data-dismiss='modal' onClick={(e) => setIsVisible(!isVisible)}>
									Close
								</button>
								<button type='button' className='btn btn-primary' onClick={handleFormSubmit}>
									Save changes
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
