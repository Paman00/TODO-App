import React from "react";
import "./TodoList.css";

function TodoList(props) {
	const renderFunc = (props.render && props.render) || (props.children && props.children);
	return (
		<section className="TodoList-container">
			{props.error && props.onError()}
			{props.loading && props.onLoading()}

			{(!props.loading && !props.totalTodos) && props.onEmptyTodos()}

			{(!!props.totalTodos && !props.searchedTodos.length) && props.onEmptySearchResults(props.searchText)}
			
			<ul>
				{!props.loading && props.searchedTodos.map(renderFunc) }
				{/*!props.loading && props.searchedTodos.map(todo => props.renderFunc(todo))*/}
			</ul>
		</section>
	);
}

export { TodoList };
