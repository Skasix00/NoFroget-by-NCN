import { useEffect, useState } from "react";
import { Accordion, Button, NumberInput, TextInput, Checkbox } from "@mantine/core";
import { Get, Update } from "../../../../helpers/api";
import { notifications } from "@mantine/notifications";

export default function UpdateService() {
	const [services, setServices] = useState(undefined);
	const [service, setService] = useState(undefined);
	const [updateForm, setUpdateForm] = useState({
		title: "",
		description: "",
		isActive: 1,
		isDeleted: 0,
	});
	const [price, setPrice] = useState(0);
	const [isActiveService, setServiceEnabled] = useState(true);
	const [isDeletedService, setServiceDeleted] = useState(false);

	useEffect(() => {
		if (!services) {
			const getServices = async () => {
				let services = await Get("nofroget/services/getAll");
				setServices(services);
			};

			getServices();
		}
	}, [services]);

	const handleServiceUpdate = async (e) => {
		e.preventDefault();
		updateForm.price = price;
		let data = updateForm;
		let reallyUpdates = confirm("Quer mesmo alterar este registo ?");
		if (reallyUpdates && updateForm && service !== "none") {
			try {
				await Update(`nofroget/services/update/${service}`, data);

				let updatedServices = await Get("nofroget/services/getAll");
				setServices(updatedServices);

				clearForm();
				return notifications.show({
					title: "Serviço alterado com sucesso !",
					message: "Serviço foi alterado",
					autoClose: 3000,
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

	const handleUpdateInputChange = (e) => {
		const { name, value } = e.target;

		setUpdateForm((prevCreateFormData) => ({
			...prevCreateFormData,
			[name]: value,
		}));
	};

	const handleServiceChoosing = async (service) => {
		setService(service);

		if (service !== "none") {
			try {
				let serviceData = await Get(`nofroget/services/${service}`);

				setUpdateForm((prevForm) => ({
					...prevForm,
					title: serviceData.title,
					description: serviceData.description,
					price: serviceData.price,
				}));

				setPrice(serviceData.price);

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
		setService("none");
		setUpdateForm((prevForm) => ({
			...prevForm,
			title: "",
			description: "",
			price: "",
		}));

		setPrice(0);
	};

	return (
		<div className='mt-3'>
			<Accordion chevronPosition='right' variant='separated'>
				<Accordion.Item value='1' className='services-accordion-item-warning'>
					<Accordion.Control>
						<p className='text-white text-large bold align-center'>Editar Serviço </p>
					</Accordion.Control>
					<Accordion.Panel>
						<div className='form-group'>
							<label htmlFor='serviceInput' className='text-white'>
								Serviço
							</label>
							<div className='row'>
								<div className='col-lg-12'>
									<select name='serviceInput' id='serviceInput' className='form-control' value={service} onChange={(e) => handleServiceChoosing(e.target.value)}>
										<option value='none'>-- Escolha um Serviço --</option>
										{services ? (
											services.map((s) => (
												<option className='text-black' key={s._id} value={s._id}>
													{s.title}
												</option>
											))
										) : (
											<option value='0'>Sem Serviços</option>
										)}
									</select>
								</div>
								<div className='row'>
									<div className='col-lg-4'>
										<TextInput className='text-white' label='Nome do Serviço' name='title' value={updateForm.title} onChange={handleUpdateInputChange}></TextInput>
									</div>
									<div className='col-lg-4'>
										<TextInput className='text-white' label='Descrição' name='description' value={updateForm.description} onChange={handleUpdateInputChange}></TextInput>
									</div>
									<div className='col-lg-4'>
										<NumberInput decimalSeparator=',' allowNegative={false} placeholder='Indique o preço do serviço' suffix=' €' className='text-white' label='Preço em €' name='price' value={price} onChange={(val) => setPrice(val)}></NumberInput>
									</div>
								</div>
								<div className='row mt-3'>
									<div className='col-lg-2'>
										<Checkbox defaultChecked labelPosition='right' label='Ativo' color='grape' value={isActiveService} onChange={() => setServiceEnabled(!isActiveService)}></Checkbox>
									</div>
									<div className='col-lg-2'>
										<Checkbox labelPosition='right' label='Apagado' color='grape' value={isDeletedService} onChange={() => setServiceDeleted(!isDeletedService)}></Checkbox>
									</div>
								</div>
							</div>
							<div className='col-lg-12 mt-5'>
								<Button classNames={{ root: "button-violet" }} fullWidth variant='filled' onClick={(e) => handleServiceUpdate(e)}>
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
