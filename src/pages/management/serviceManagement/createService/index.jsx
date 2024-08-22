import { Accordion, Button, NumberInput, TextInput } from "@mantine/core";
import { useState } from "react";
import { Post } from "../../../../helpers/api";
import "./index.css";
import { notifications } from "@mantine/notifications";

export default function CreateService() {
	const [createForm, setCreateForm] = useState({
		title: "",
		description: "",
	});
	const [price, setPrice] = useState(0);

	const handleCreateInputChange = (e) => {
		const { name, value } = e.target;

		setCreateForm((prevCreateFormData) => ({
			...prevCreateFormData,
			[name]: value,
		}));
	};

	const handleServiceCreation = async () => {
		createForm.price = price;
		createForm.isActive = 1;
		createForm.isDeleted = 0;
		let data = createForm;
		let newService = await Post("nofroget/services/addNew", data);

		if (newService === "OK") {
			return notifications.show({
				title: "Serviço criado com sucesso !",
				message: "O serviço foi criado",
				autoClose: 3000,
				color: "green",
				className: "notification",
				withBorder: true,
			});
		} else {
			return notifications.show({
				title: "Ups algo correu mal...",
				message: "Contacte o administrador.",
				autoClose: 1000,
				color: "red",
				className: "notification",
				withBorder: true,
			});
		}
	};

	return (
		<div className='mt-3'>
			<Accordion chevronPosition='right' variant='separated'>
				<Accordion.Item value='1' className='services-accordion-item-success'>
					<Accordion.Control>
						<p className='text-white text-large bold align-center'>Criar Serviço </p>
					</Accordion.Control>
					<Accordion.Panel>
						<div>
							<TextInput className='text-white' label='Nome do Serviço' name='title' value={createForm.title} onChange={handleCreateInputChange}></TextInput>
							<TextInput className='text-white' label='Descrição' name='description' value={createForm.description} onChange={handleCreateInputChange}></TextInput>
							<NumberInput decimalSeparator=',' allowNegative={false} placeholder='Indique o preço do serviço' suffix='€' className='text-white' label='Preço em €' name='price' value={price} onChange={(val) => setPrice(val)}></NumberInput>
							<div className='mt-3'>
								<Button classNames={{ root: "button-violet" }} fullWidth variant='filled' onClick={handleServiceCreation}>
									Criar Novo Serviço
								</Button>
							</div>
						</div>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
		</div>
	);
}
