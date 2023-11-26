import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

export interface ITodo {
	id: string;
	todo: string;
	isTodoCompleted: boolean;
}

export interface INote {
	id: string;
	title: string;
	isNoteCompleted: boolean;
	todos: ITodo[];
}

export const useNoteStore = defineStore('noteStore', () => {
	const notes = ref<INote[]>([]);

	const notesInLocalStorage = localStorage.getItem('notes');
	if (notesInLocalStorage) {
		notes.value = JSON.parse(notesInLocalStorage)._value;
	}

	const setNoteItem = (note: INote) => {
		notes.value.push(note);
	};

	const getOneNote = (id: string) => {
		return notes.value.find((item) => item.id === id);
	};
	const editNoteItem = (note: INote) => {
		const noteIndex = notes.value.findIndex((item) => item.id === note.id);
		notes.value.splice(noteIndex, 1, note);
	};

	const removeNoteItem = (id: string) => {
		const noteIndex = notes.value.findIndex((item) => item.id === id);
		notes.value.splice(noteIndex, 1);
	};

	watch(
		() => notes,
		(state) => {
			localStorage.setItem('notes', JSON.stringify(state));
		},
		{ deep: true }
	);

	return {
		notes,
		setNoteItem,
		getOneNote,
		editNoteItem,
		removeNoteItem,
	};
});
