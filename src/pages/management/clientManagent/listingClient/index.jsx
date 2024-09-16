import React, { useEffect, useState, useRef } from "react";
import { Get } from "../../../../helpers/api";
import { notifications } from "@mantine/notifications";
import { Table } from "@mantine/core";

export default function ListingClients() {
	const [clients, setClients] = useState([]);
	const hasFetchedRef = useRef(false);

	useEffect(() => {
		if (hasFetchedRef.current) return;

		const fetchClients = async () => {
			try {
				const data = await Get("nofroget/clients/getAll");

				if (Array.isArray(data)) {
					setClients(data);

					if (!hasFetchedRef.current) {
						notifications.show({
							title: data.length > 0 ? "Clientes carregados com sucesso!" : "Nenhum cliente encontrado",
							message: data.length > 0 ? "Consulte a listagem." : "Não há clientes para exibir.",
							autoClose: 3000,
							color: data.length > 0 ? "green" : "yellow",
							className: "notification",
							withBorder: true,
						});
						hasFetchedRef.current = true; // Set this after showing notification
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

		fetchClients();
	}, []);

	return (
		<div>
			{clients.length === 0 ? (
				<p>A Carregar...</p>
			) : (
				<Table striped highlightOnHover withTableBorder withColumnBorders> 
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Nome Cliente</Table.Th>
							<Table.Th>Idade</Table.Th>
							<Table.Th>Visitas</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{clients.map((client) => (
							<Table.Tr key={client._id}>
								<Table.Td>{client.ClientName}</Table.Td>
								<Table.Td>{client.Age}</Table.Td>
								<Table.Td>{client.Visits}</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			)}
		</div>
	);
}
