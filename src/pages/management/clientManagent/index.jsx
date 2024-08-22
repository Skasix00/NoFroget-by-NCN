import { Container } from "@mantine/core";
import CreateClient from "./createClient/index";
import DeleteClient from "./deleteClient/index";
import UpdateClient from "./updateClient/index";

export default function ClientManagement() {
	return (
		<>
			<Container fluid size='responsive'>
				<section>
					<div className='page-title'>
						<h2 className='pagetitle mt-2'>Gestão de Clientes</h2>
					</div>
					<div className='page-content'>
						<div className='services-accordion'>
							<CreateClient></CreateClient>
							<UpdateClient></UpdateClient>
							<DeleteClient></DeleteClient>
						</div>
						<small>
							<p className='charcoal mt-2'>* Use este bloco para gerir clientes</p>
						</small>
					</div>
				</section>
			</Container>
		</>
	);
}
