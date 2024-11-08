import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ExercisesProvider } from "./context/ExercisesProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<ExercisesProvider>
		<App />
	</ExercisesProvider>,
);
