import React from "react";
import { useLocalStorage } from "./useLocalStorage";

function useTodos() {
	const {
		item: todos,
		saveItem: saveTodos,
		synchronizeItem: synchronizeTodos,
		loading,
		error,
	} = useLocalStorage("TODOS_V1", []);
	const [searchValue, setSearchValue] = React.useState("");
	const [openModal, setOpenModal] = React.useState(false);

	const completedTodos = todos.filter((todo) => todo.completed === true).length;

	const totalTodos = todos.length;

	let searchedTodos = [];
	if (!searchValue.length > 0) {
		searchedTodos = todos;
	} else {
		searchedTodos = todos.filter((todo) => {
			const todoText = todo.text.toLowerCase();
			const searchText = searchValue.toLowerCase();
			return todoText.includes(searchText);
		});
	}

	const addTodo = (newText) => {
		const newTodos = [...todos];
		newTodos.push({ 
			text: newText, 
			completed: false 
		});
		saveTodos(newTodos);
	};
	const completeTodo = (text) => {
		const todoIndex = todos.findIndex((todo) => todo.text === text);
		const newTodos = [...todos];
		newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
		saveTodos(newTodos);
	};
	const deleteTodo = (text) => {
		const todoIndex = todos.findIndex((todo) => todo.text === text);
		const newTodos = [...todos];
		newTodos.splice(todoIndex, 1);
		saveTodos(newTodos);
	};

	return {
		loading,
		error,
		totalTodos,
		completedTodos,
		searchValue,
		setSearchValue,
		searchedTodos,
		addTodo,
		completeTodo,
		deleteTodo,
		openModal,
		setOpenModal,
		synchronizeTodos,
	};
}
		
export { useTodos };
