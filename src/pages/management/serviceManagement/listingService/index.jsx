import React, { useEffect, useState, useRef } from "react";
import { Get } from "../../../../helpers/api";
import { notifications } from "@mantine/notifications";
import { Table } from "@mantine/core";

export default function ListingServices() {
	const [services, setServices] = useState([]);
	const hasFetchedRef = useRef(false);

	useEffect(() => {
		if (hasFetchedRef.current) return;

		const fetchServices = async () => {
			try {
				const data = await Get("nofroget/services/getAll");

				if (Array.isArray(data)) {
					setServices(data);

					if (!hasFetchedRef.current) {
						notifications.show({
							title: data.length > 0 ? "Serviços carregados com sucesso!" : "Nenhum cliente encontrado",
							message: data.length > 0 ? "Consulte a listagem." : "Não há serviços para exibir.",
							autoClose: 3000,
							color: data.length > 0 ? "green" : "yellow",
							className: "notification",
							withBorder: true,
						});
						hasFetchedRef.current = true;
					}
				} else {
					console.warn("Invalid data format:", data);
				}
			} catch (error) {
				notifications.show({
					title: "Ups algo correu mal...",
					message: "Contacte o administrador.",
					autoClose: 1000,
					color: "red",
					className: "notification",
					withBorder: true,
				});
			}
		};

		fetchServices();
	}, []);

	return (
		<div className='mt-3 ms-3 me-3 mb-4'>
			{services.length === 0 ? (
				<p>A Carregar...</p>
			) : (
				<Table striped highlightOnHover withTableBorder withColumnBorders>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Nome do serviço</Table.Th>
							<Table.Th>Descriçāo</Table.Th>
							<Table.Th>Preço</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{services.map((service) => (
							<Table.Tr key={service._id}>
								<Table.Td>{service.title}</Table.Td>
								<Table.Td>{service.description}</Table.Td>
								<Table.Td>{service.price}</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			)}
		</div>
	);
}
