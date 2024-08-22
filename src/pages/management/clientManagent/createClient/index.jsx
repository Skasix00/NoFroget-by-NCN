import { Accordion, Button, NumberInput, TextInput } from "@mantine/core";
import { Post } from "../../../../helpers/api";
import { useState } from "react";
import dayjs from "dayjs";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";

export default function CreateClient() {
	const [createForm, setCreateForm] = useState({
		ClientName: "",
		Age: "",
		Score: 0,
		NVisits: 0,
	});

	const [Birthdate, setBirthdate] = useState();

	const dateParser = (input) => {
		if (input === "BBD") {
			return new Date(13, 12, 2000);
		}
		return dayjs(input, "DD/MM/YYYY").toDate();
	};

	const handleCreateInputChange = (e) => {
		const { name, value } = e.target;

		setCreateForm((prevCreateFormData) => ({
			...prevCreateFormData,
			[name]: value,
		}));
	};

	const handleClientCreation = async () => {
		createForm.Birthdate = Birthdate;
		createForm.isActive = 1;
		createForm.isDeleted = 0;
		
		let data = createForm;
		let res = await Post("nofroget/clients/addNew", data);

		if (res === "OK") {
			return notifications.show({
				title: "Cliente criado com sucesso !",
				message: "O cliente foi criado",
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

	const handleBirthDate = (val) => {
		const today = dayjs();

		const age = today.diff(val, "year");

		setCreateForm((prevCreateFormData) => ({
			...prevCreateFormData,
			Age: age,
		}));

		setBirthdate(val);
	};

	return (
		<div className='mt-3'>
			<Accordion chevronPosition='right' variant='separated'>
				<Accordion.Item value='1' className='services-accordion-item-success'>
					<Accordion.Control>
						<p className='text-white text-large bold align-center'>Nova ficha de cliente </p>
					</Accordion.Control>
					<Accordion.Panel>
						<div>
							<TextInput className='text-white' label='Nome da Cliente' name='ClientName' value={createForm.ClientName} onChange={handleCreateInputChange}></TextInput>
							<DateInput clearable className='text-white' name='BBD' dateParser={dateParser} valueFormat='DD/MM/YYYY' label='Data de nacimento' placeholder='Dia/Mês/Ano' value={Birthdate} onChange={(val) => handleBirthDate(val)}></DateInput>
							<NumberInput allowDecimal={false} defaultValue={new Date()} allowNegative={false} placeholder='A idade é calculada automaticamente' suffix=' Anos' className='text-white' label='Idade' name='Age' value={createForm.Age} readOnly></NumberInput>
							<div className='mt-3'>
								<Button classNames={{ root: "button-violet" }} fullWidth variant='filled' onClick={handleClientCreation}>
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
