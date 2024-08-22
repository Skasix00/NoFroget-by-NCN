import { Container } from "@mantine/core";
import { Table } from "@mantine/core";
import "./index.css";

export default function Contacts() {
	const elements = [
		{ utils: "9:00 - 20:00", nonutils: "Apenas com marcação extraordinária" },
		{ utils: "Horário de Sábado pode variar", nonutils: "Horário pode variar aos feriados" },
	];

	const rows = elements.map((element) => (
		<Table.Tr key={element.name}>
			<Table.Td>{element.utils}</Table.Td>
			<Table.Td>{element.nonutils}</Table.Td>
		</Table.Tr>
	));

	return (
		<Container fluid size='responsive'>
			<section>
				<div className='white-bg border-15 mb-4 shadow-bg'>
					<h2 className='mb-1 ms-3 mt-2'>A nossa localização</h2>
					<iframe
					className="p-3"
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3109.683768902336!2d-9.178762188793915!3d38.793883271628566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd192d587dfbdc85%3A0x9856ee021c74206c!2sNice%20Nails!5e0!3m2!1sen!2spt!4v1724099097604!5m2!1sen!2spt'
						width='100%'
						height='400'
						loading='lazy'
					></iframe>
				</div>
			</section>
			<section className='mt-3'>
				<div className='white-bg border-15 mb-4 shadow-bg'>
					<h2 className='mb-2 ms-3 mt-2'>O nosso horário</h2>
					<div className='row mb-1 p-3'>
						<div className='col-lg-12'>
							<Table highlightOnHover withTableBorder withColumnBorders borderRadius='xl'>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>Dias Úteis e Sábados</Table.Th>
										<Table.Th>Domingos e Feriados</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>{rows}</Table.Tbody>
							</Table>
						</div>
					</div>
				</div>
			</section>
		</Container>
	);
}
