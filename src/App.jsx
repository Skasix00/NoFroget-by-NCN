import "../src/common/styles/index.css";
import MainLayout from "./components/mainlayout";
import Routing from "./routes/routes";

function App() {
	return (
		<MainLayout>
			<Routing></Routing>
		</MainLayout>
	);
}

export default App;
