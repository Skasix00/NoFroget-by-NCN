import { Container } from "@mantine/core";
import "../index.css";
import CreateService from "./createService/index";
import DeleteService from "./deleteService/index";
import UpdateService from "./updateService/index";

export default function ServiceManagement() {
	return (
		<>
			<Container fluid size='responsive'>
				<section>
					<div className='page-title'>
						<h2 className='pagetitle mt-2'>Gestão de Serviços</h2>
					</div>
					<div className='page-content'>
						<div className='services-accordion'>
							<CreateService></CreateService>
							<UpdateService></UpdateService>
							<DeleteService></DeleteService>
							<small>
								<p className='charcoal mt-2'>* Use este bloco para gerir serviços</p>
							</small>
						</div>
					</div>
				</section>
			</Container>
		</>
	);
}
