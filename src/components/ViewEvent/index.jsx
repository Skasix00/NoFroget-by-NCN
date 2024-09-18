import { useEffect, useState } from "react";
import { Get } from "../../helpers/api";
import "./index.css";
import { formatDate } from "../../../utils/utils";

export default function ViewEvent({ isVisible, onClose, appointmentID }) {
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");
	const [appointment, setAppointment] = useState(undefined);
	const [npessoas, setNpessoas] = useState("");
	const [descricao, setDescricao] = useState("");
	const [cliente, setCliente] = useState("none");
	const [servico, setServico] = useState("none");
	const [titulo, setTitulo] = useState("");

	useEffect(() => {
		if (!appointment && appointmentID !== 0) {
			const getAppointment = async () => {
				let data = await Get(`nofroget/post/${appointmentID}`);

				if (data) {
					console.log(data);
					setTitulo(data.title);
					setCliente(data.client);
					setDescricao(data.description);
					setStart(new Date(data.start));
					setEnd(new Date(data.end));
					setNpessoas(data.nofpersons);
					setServico(data.category);
				}
				setAppointment(data);
			};

			getAppointment();
		}
	}, [appointment, appointmentID]);

	return (
		<>
			<div>
				<div className='modal' id='exampleModal' style={{ display: isVisible ? "block" : "none", backgroundColor: "hsla(0, 0%, 13%, 0.596)" }}>
					<div className='modal-dialog'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title'>Detalhes da Marcação</h5>
							</div>
							<div className='modal-body'>
								<div className='row'>
									<div className='col-lg-12'>
										<div className='form-group'>
											<label htmlFor='tituloInput' className='form-label'>
												Titulo
											</label>
											<input type='text' className='form-control' id='tituloInput' name='tituloInput' placeholder={titulo} disabled></input>
										</div>
										<div className='form-group'>
											<label htmlFor='serviceInput' className='form-label'>
												Serviço
											</label>
											<select name='serviceInput' id='serviceInput' className='form-control' disabled>
												<option>{servico}</option>
											</select>
										</div>
										<br></br>
										<div className='row'>
											<div className='form-group col-sm-6'>
												<label htmlFor='startDateInput' className='form-label'>
													Inicio
												</label>

												<input type='date' className='form-control' id='startDateInput' name='startDateInput' value={formatDate(start)} disabled />
											</div>
											<br></br>
											<div className='form-group col-sm-6'>
												<label htmlFor='endDateInput' className='form-label'>
													Fim
												</label>

												<input type='date' className='form-control' id='endDateInput' name='endDateInput' value={formatDate(end)} disabled />
											</div>
											<br></br>
										</div>
										<div className='form-group'>
											<label htmlFor='clienteNameInput' className='form-label'>
												Cliente
											</label>
											<select className='form-control' id='clienteNameInput' name='clienteNameInput' placeholder={cliente} disabled>
												<option>{cliente}</option>
											</select>
										</div>
										<div className='form-group'>
											<label htmlFor='nPersonsInput' className='form-label'>
												Nº de Pessoas
											</label>
											<input type='text' className='form-control' id='nPersonsInput' name='nPersonsInput' placeholder={npessoas} disabled></input>
										</div>
										<div className='form-group'>
											<label htmlFor='descriptionInput' className='form-label'>
												Descrição
											</label>
											<input type='text' className='form-control' id='descriptionInput' name='descriptionInput' placeholder={descricao} disabled></input>
										</div>
									</div>
								</div>
							</div>
							<div className='modal-footer'>
								<button type='button' className='btn btn-danger' data-dismiss='modal' onClick={onClose}>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
