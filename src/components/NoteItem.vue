<script setup lang="ts">
	import TodoList from './TodoList.vue';
	import type { INote } from '@/stores/note';

	interface Note {
		note?: INote;
	}
	defineProps<Note>();
</script>

<template>
	<div>
		<div class="note-title">
			<strong>{{ note?.title }}</strong>
		</div>
		<ul class="note-body">
			<TodoList
				v-for="todo of note?.todos"
				:key="todo.id"
        :oneTodo="todo"
        class="todo-item"
			/>
		</ul>
	</div>
</template>

<style scoped>
	.note-title {
		padding: 5px 10px;
		font-size: 20px;
		border-radius: 3px;
		border: 2px solid #dadada;
	}


  .todo-item {
    display: flex;
    align-items: center;
    padding: 6px 25px;
	}
</style>
