import { Container } from "@mantine/core";
import ClientManagement from "./clientManagent/index";
import ServiceManagement from "./serviceManagement/index";

export default function Management() {
	return (
		<>
			<Container fluid size='responsive'>
				<section className='mt-2 mb-2'>
					<div className='white-bg border-15 mb-4 shadow-bg'>
						<ClientManagement />
					</div>
				</section>
				<section className='mt-2'>
					<div className='white-bg border-15 mb-4 shadow-bg'>
						<ServiceManagement />
					</div>
				</section>
			</Container>
		</>
	);
}
