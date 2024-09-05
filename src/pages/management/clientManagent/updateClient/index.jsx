import { useEffect, useState } from "react";
import { Accordion, Button, NumberInput, TextInput, Checkbox } from "@mantine/core";
import { Get, Update } from "../../../../helpers/api";
import { notifications } from "@mantine/notifications";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";

export default function UpdateClient() {
	const [clients, setClients] = useState(undefined);
	const [client, setClient] = useState(undefined);
	const [updateForm, setUpdateForm] = useState({
		ClientName: "",
		Age: "",
		Score: 0,
		NVisits: 0,
		isActive: 1,
		isDeleted: 0,
	});

	const [Birthdate, setBirthdate] = useState();
	const [isActiveClient, setClientEnabled] = useState(true);
	const [isDeletedClient, setClientDeleted] = useState(false);

	useEffect(() => {
		if (!clients) {
			const getClients = async () => {
				let clients = await Get("nofroget/clients/getAll");
				setClients(clients);
			};

			getClients();
		}
	}, [clients]);

	const handleClientUpdate = async (e) => {
		e.preventDefault();
		updateForm.Birthdate = Birthdate;
		let data = updateForm;
		let reallyUpdates = confirm("Quer mesmo alterar este registo ?");
		if (reallyUpdates && updateForm && client !== "none") {
			try {
				await Update(`nofroget/clients/update/${client}`, data);

				let updatedClients = await Get("nofroget/clients/getAll");
				setClients(updatedClients);

				clearForm();
				return notifications.show({
					title: "Cliente alterado com sucesso !",
					message: "O cliente foi alterado",
					autoClose: 3000,
					color: "green",
					className: "notification",
					withBorder: true,
				});
			} catch (error) {
				clearForm();
				return notifications.show({
					title: "Ups algo correu mal...",
					message: "Contacte o administrador.",
					autoClose: 1000,
					color: "red",
					className: "notification",
					withBorder: true,
				});
			}
		} else {
			clearForm();
			return notifications.show({
				title: "Nada foi alterado.",
				message: "Nenhuma operação foi efetuada.",
				autoClose: 3000,
				color: "red",
				className: "notification",
				withBorder: true,
			});
		}
	};

	const dateParser = (input) => {
		if (input === "BBD") {
			return new Date(13, 12, 2000);
		}
		return dayjs(input, "DD/MM/YYYY").toDate();
	};

	const handleUpdateInputChange = (e) => {
		const { name, value } = e.target;

		setUpdateForm((prevCreateFormData) => ({
			...prevCreateFormData,
			[name]: value,
		}));
	};

	const handleBirthDate = (val) => {
		const today = dayjs();

		const age = today.diff(val, "year");

		setUpdateForm((prevCreateFormData) => ({
			...prevCreateFormData,
			Age: age,
		}));

		setBirthdate(val);
	};

	const handleClientChoosing = async (client) => {
		setClient(client);

		if (client !== "none") {
			try {
				let clientData = await Get(`nofroget/clients/${client}`);

				let bdateCut = clientData.Birthdate.substring(0, clientData.Birthdate.indexOf("T"));
				let bdate = new Date(bdateCut);

				setUpdateForm((prevForm) => ({
					...prevForm,
					ClientName: clientData.ClientName,
					Age: clientData.Age,
				}));

				setBirthdate(bdate);

				return notifications.show({
					title: "Informação carregada com sucesso",
					message: "Sucesso!",
					autoClose: 1000,
					color: "green",
					className: "notification",
					withBorder: true,
				});
			} catch (error) {
				return notifications.show({
					title: "Ups algo correu mal...",
					message: "Contacte o administrador.",
					autoClose: 1000,
					color: "red",
					className: "notification",
					withBorder: true,
				});
			}
		} else {
			clearForm();
		}
	};

	const clearForm = () => {
		setClient("none");
		setUpdateForm((prevForm) => ({
			...prevForm,
			ClientName: "",
			Age: "",
		}));
		setBirthdate("");
	};
	return (
		<div className='mt-3'>
			<Accordion chevronPosition='right' variant='separated'>
				<Accordion.Item value='1' className='services-accordion-item-warning'>
					<Accordion.Control>
						<p className='text-white text-large bold align-center'>Editar Cliente </p>
					</Accordion.Control>
					<Accordion.Panel>
						<div className='form-group'>
							<label htmlFor='clientInput' className='text-white'>
								Cliente
							</label>
							<div className='row'>
								<div className='col-lg-12'>
									<select name='clientInput' id='clientInput' className='form-control' value={client} onChange={(e) => handleClientChoosing(e.target.value)}>
										<option value='none'>-- Escolha um Cliente --</option>
										{clients ? (
											clients.map((s) => (
												<option className='text-black' key={s._id} value={s._id}>
													{s.ClientName}
												</option>
											))
										) : (
											<option value='0'>Sem Clientes</option>
										)}
									</select>
								</div>
								<TextInput className='text-white' label='Nome da Cliente' name='ClientName' value={updateForm.ClientName} onChange={handleUpdateInputChange}></TextInput>
								<div className='row'>
									<div className='col-lg-4'>
										<DateInput clearable className='text-white' name='BBD' dateParser={dateParser} valueFormat='DD/MM/YYYY' label='Data de nacimento' placeholder='Dia/Mês/Ano' value={Birthdate} onChange={(val) => handleBirthDate(val)}></DateInput>
									</div>
									<div className='col-lg-3'>
										<NumberInput allowDecimal={false} allowNegative={false} placeholder='A idade é calculada automaticamente' suffix=' Anos' className='text-white' label='Idade' name='Age' value={updateForm.Age} readOnly></NumberInput>
									</div>
								</div>
								<div className='row mt-3'>
									<div className='col-lg-2'>
										<Checkbox defaultChecked labelPosition='right' label='Ativo' color='grape' value={isActiveClient} onChange={() => setClientEnabled(!isActiveClient)}></Checkbox>
									</div>
									<div className='col-lg-2'>
										<Checkbox labelPosition='right' label='Apagado' color='grape' value={isDeletedClient} onChange={() => setClientDeleted(!isDeletedClient)}></Checkbox>
									</div>
								</div>
							</div>
							<div className='col-lg-12 mt-5'>
								<Button classNames={{ root: "button-violet" }} fullWidth variant='filled' onClick={(e) => handleClientUpdate(e)}>
									Salvar
								</Button>
							</div>
						</div>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</div>
	);
}
