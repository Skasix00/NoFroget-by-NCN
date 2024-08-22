import { useEffect, useState } from "react";
import { Accordion, Button } from "@mantine/core";
import { Delete, Get } from "../../../../helpers/api";
import { notifications } from "@mantine/notifications";

export default function DeleteClient() {
	const [clients, setClients] = useState(undefined);
	const [client, setClient] = useState(undefined);

	useEffect(() => {
		if (!clients) {
			const getClients = async () => {
				let clients = await Get("nofroget/clients/getAll");
				setClients(clients);
			};

			getClients();
		}
	}, [clients]);

	const handleClientDelete = async () => {
		let reallyDeletes = confirm("Quer mesmo apagar este registo ?");

		if (reallyDeletes && client) {
			try {
				Delete(`nofroget/clients/delete?id=${client}`);
				return notifications.show({
					title: "Cliente Apagado com sucesso !",
					message: "O cliente foi eleminado",
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
						<p className='text-white text-large bold align-center'>Apagar Cliente </p>
					</Accordion.Control>
					<Accordion.Panel>
						<div className='form-group'>
							<label htmlFor='clientInput' className='text-white'>
								Cliente
							</label>
							<div className='row'>
								<div className='col-lg-8'>
									<select name='clientInput' id='clientInput' className='form-control' value={client} onChange={(e) => setClient(e.target.value)}>
										<option value='none'>-- Escolha um Cliente --</option>
										{clients ? (
											clients.map((s) => (
												<option className="text-black" key={s._id} value={s._id}>
													{s.ClientName}
												</option>
											))
										) : (
											<option value='0'>Sem Clientes</option>
										)}
									</select>
								</div>
								<div className='col-lg-4'>
									<Button classNames={{ root: "button-violet" }} fullWidth variant='filled' onClick={handleClientDelete}>
										Apagar Cliente
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
