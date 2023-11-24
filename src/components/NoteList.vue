<script setup lang="ts">
	import TodoList from './TodoList.vue';
	import { useNoteStore } from '@/stores/note';

	const noteStore = useNoteStore();
</script>

<template>
	<div>
		<el-collapse>
			<el-collapse-item
				v-for="note of noteStore.notes"
				:key="note.id"
				:name="note.id"
				class="accordion-header"
			>
				<template #title>
					{{ note.title }}
				</template>
				<div>
					<ul>
						<TodoList
							v-for="todo of note?.todos"
							:key="todo.id"
							:oneTodo="todo"
							class="todo-item"
						/>
					</ul>
				</div>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<style scoped>
	.accordion-header :deep(.el-collapse-item__header) {
		font-size: 20px;
	}
	.todo-item {
		display: flex;
		align-items: center;
		padding: 6px 20px;
	}
</style>
