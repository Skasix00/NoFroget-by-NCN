import { Container } from "@mantine/core";
import ClientManagement from "./clientManagent/index";
import ServiceManagement from "./serviceManagement/index";
import ListingClients from "./clientManagent/listingClient";
import ListingServices from "./serviceManagement/listingService";

export default function Management() {
	return (
		<>
			<Container fluid size='responsive'>
				<section>
					<div className='white-bg border-15 mb-4 shadow-bg listings'>
						<div className='row'>
							<div className='col-lg-6 text-center'>
								<ListingClients></ListingClients>
							</div>
							<div className='col-lg-6 text-center'>
								<ListingServices></ListingServices>
							</div>
						</div>
					</div>
				</section>
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
