import { ref } from 'vue';
import { defineStore } from 'pinia';

const notesMocks: INote[] = [
	{
		id: Math.random().toString(),
		title: 'Title 1',
		isNoteCompleted: true,
		todos: [
			{
				id: Math.random().toString(),
				todo: 'Todo 1',
				isTodoCompleted: true,
			},
			{
				id: Math.random().toString(),
				todo: 'Todo 2',
				isTodoCompleted: false,
			},
			{
				id: Math.random().toString(),
				todo: 'Todo 3',
				isTodoCompleted: false,
			},
		],
	},
	{
		id: Math.random().toString(),
		title: 'Title 2',
		isNoteCompleted: true,
		todos: [
			{
				id: Math.random().toString(),
				todo: 'Todo 4',
				isTodoCompleted: false,
			},
			{
				id: Math.random().toString(),
				todo: 'Todo 5',
				isTodoCompleted: true,
			},
			{
				id: Math.random().toString(),
				todo: 'Todo 6',
				isTodoCompleted: true,
			},
		],
	},
];
localStorage.setItem('notes', JSON.stringify(notesMocks));

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
		notes.value = JSON.parse(notesInLocalStorage);
	}

	const setNotes = (value: INote[]) => {
		localStorage.setItem('notes', value);
		notes.value = value;
	};
	return { notes, setNotes };
});
