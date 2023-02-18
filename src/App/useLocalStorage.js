import React from "react";

function useLocalStorage(itemName, initialValue = {}) {
	const [state, dispatch] = React.useReducer(
		reducer,
		initialState(initialValue)
	);
	const { synchronizedItem, error, loading, item } = state;

	const onError = (error) => dispatch({ type: actionTypes.error, payload: error, });
	const onSuccess = (item) => dispatch({ type: actionTypes.success, payload: item, });
	const onSave = (item) => dispatch({ type: actionTypes.save, payload: item, });
	const onSynchronize = () => dispatch({ type: actionTypes.synchronize, });

	React.useEffect(() => {
		setTimeout(() => {
			try {
				const localStorageItem = localStorage.getItem(itemName);
				let parsedItem;

				if (!localStorageItem) {
					localStorage.setItem(itemName, JSON.stringify(initialValue));
					parsedItem = initialValue;
				} else {
					parsedItem = JSON.parse(localStorageItem);
				}

				onSuccess(parsedItem);
			} catch (error) {
				onError(error);
			}
		}, 3000);
	}, [synchronizedItem]);

	const saveItem = (newItem) => {
		try {
			localStorage.setItem(itemName, JSON.stringify(newItem));
			onSave(newItem);
		} catch (error) {
			onError(error);
		}
	};

	const synchronizeItem = () => {
		onSynchronize();
	};

	return {
		item,
		saveItem,
		loading,
		error,
		synchronizeItem,
	};
}

const initialState = (initialValue) => ({
	synchronizedItem: true,
	error: false,
	loading: true,
	item: initialValue,
});

const actionTypes = {
	error: "ERROR",
	success: "SUCCESS",
	save: "SAVE",
	synchronize: "SYNCHRONIZE",
};
const reducerObject = (state, payload) => ({
	[actionTypes.error]: {
		...state,
		error: payload,
	},
	[actionTypes.success]: {
		...state,
		item: payload,
		loading: false,
		synchronizedItem: true,
	},
	[actionTypes.save]: {
		...state,
		item: payload,
	},
	[actionTypes.synchronize]: {
		...state,
		loading: true,
		synchronizedItem: false,
	},
});

const reducer = (state, action) => {
	if (reducerObject(state, action.payload)[action.type])
		return reducerObject(state, action.payload)[action.type];
	else return state;
};

export { useLocalStorage };
