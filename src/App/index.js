import React from "react";
import { useTodos } from "./useTodos";
import { TodoHeader } from "../TodoHeader";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodosError } from "../TodosError";
import { TodosLoading } from "../TodosLoading";
import { EmptyTodos } from "../EmptyTodos";
import { TodoItem } from "../TodoItem";
import { TodoForm } from "../TodoForm";
import { CreateTodoButton } from "../CreateTodoButton";
import { Modal } from "../Modal";
import { StorageChangeAlert } from "../StorageChangeAlert"

function App() {
	const { state, stateUpdaters, } = useTodos();
	const {
		completedTodos,
		totalTodos,
		searchValue,
		error,
		loading,
		searchedTodos,
		openModal,
	} = state;
	const {
		setSearchValue,
		completeTodo,
		deleteTodo,
		setOpenModal,
		addTodo,
		synchronizeTodos,
	} = stateUpdaters;

	return (
		<React.Fragment>
			<TodoHeader 
				loading={loading}
			>
				<TodoCounter 
					completedTodos={completedTodos} 
					totalTodos={totalTodos} 				
				/>
				<TodoSearch 
					searchValue={searchValue} 
					setSearchValue={setSearchValue} 
				/>
			</TodoHeader>

			<TodoList
				error={error}
				loading={loading}
				searchedTodos={searchedTodos}
				searchText={searchValue}
				totalTodos={totalTodos}
				onError={() => <TodosError />}
				onLoading={() => <TodosLoading />}
				onEmptyTodos={() => <EmptyTodos />}
				onEmptySearchResults={
					(searchText) => <p>No hay resultados para "{searchText}" :(</p>
				}
				render={todo => (
					<TodoItem
						key={todo.text}
						text={todo.text}
						completed={todo.completed}
						onComplete={() => completeTodo(todo.text)}
						onDelete={() => deleteTodo(todo.text)}
					/>
				)}
			>
				{todo => (
					<TodoItem
						key={todo.text}
						text={todo.text}
						completed={todo.completed}
						onComplete={() => completeTodo(todo.text)}
						onDelete={() => deleteTodo(todo.text)}
					/>
				)}
			</TodoList>

			{!!openModal && (
				<Modal>
					<TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />
				</Modal>
			)}
			<CreateTodoButton setOpenModal={setOpenModal} />

			<StorageChangeAlert 
				synchronize={synchronizeTodos}
			/>
		</React.Fragment>
	);
}

export default App;
