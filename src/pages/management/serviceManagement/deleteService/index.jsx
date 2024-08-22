import { useEffect, useState } from "react";
import { Accordion, Button } from "@mantine/core";
import { Delete, Get } from "../../../../helpers/api";
import { notifications } from "@mantine/notifications";

export default function DeleteService() {
	//const [clients, setClients] = useState(undefined);
	const [services, setServices] = useState(undefined);
	const [servico, setServico] = useState(undefined);
	useEffect(() => {
		if (!services) {
			// const getClients = async () => {
			// 	let clients = await Get("nofroget/clients/getAll");
			// 	setClients(clients);
			// };
			const getServices = async () => {
				let services = await Get("nofroget/services/getAll");
				setServices(services);
			};
			getServices();
			//getClients();
		}
	}, [services]);

	const handleServiceDelete = async () => {
		let reallyDeletes = confirm("Quer mesmo apagar este registo ?");

		if (reallyDeletes && servico) {
			try {
				Delete(`nofroget/services/delete?id=${servico}`);
				return notifications.show({
					title: "Serviço Apagado com sucesso !",
					message: "O serviço foi eleminado",
					autoClose: 3000,
					color: "yellow",
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
				color: "green",
				className: "notification",
				withBorder: true,
			});
		}
	};
	return (
		<div className='mt-3'>
			<Accordion chevronPosition='right' variant='separated'>
				<Accordion.Item value='1' className='services-accordion-item-danger'>
					<Accordion.Control>
						<p className='text-white text-large bold align-center'>Apagar Serviço </p>
					</Accordion.Control>
					<Accordion.Panel>
						<div className='form-group'>
							<label htmlFor='serviceInput' className='text-white'>
								Serviço
							</label>
							<div className='row'>
								<div className='col-lg-8'>
									<select name='serviceInput' id='serviceInput' className='form-control' value={servico} onChange={(e) => setServico(e.target.value)}>
										<option value='none'>-- Escolha um serviço --</option>
										{services ? (
											services.map((s) => (
												<option key={s._id} value={s._id}>
													{s.title}
												</option>
											))
										) : (
											<option value='0'>Sem serviços</option>
										)}
									</select>
								</div>
								<div className='col-lg-4'>
									<Button classNames={{ root: "button-violet" }} fullWidth variant='filled' onClick={handleServiceDelete}>
										Apagar Serviço
									</Button>
								</div>
							</div>
						</div>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</div>
	);
}
