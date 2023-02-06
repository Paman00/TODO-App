import React from "react";
import { AppUI } from "./AppUI";
import { TodoContextProvider } from "../TodoContext";

/*
localStorage.setItem('TODOS_V1', 
	JSON.stringify([
		{ text: "Cortar cebolla", completed: true },
		{ text: "Tomar el curso de intro a React", completed: false },
		{ text: "Llorar con la llorona", completed: true },
		{ text: "LALALALAA", completed: false },
	])
);*/

function App() {
	
	return (
		<TodoContextProvider>
			<AppUI />	
		</TodoContextProvider>
	);
}

export default App;
