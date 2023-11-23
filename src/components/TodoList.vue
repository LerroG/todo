<script setup lang="ts">
	import type { ITodo } from '@/stores/note';

	interface Todo {
		oneTodo?: ITodo;
	}
	defineProps<Todo>();
	
</script>

<template>
	<li :class="{'todo-completed': oneTodo?.isTodoCompleted}">
		<el-checkbox
			disabled
			:checked="oneTodo?.isTodoCompleted"
			class="todo-checkbox"
		/>{{ oneTodo?.todo }}
	</li>
</template>

<style scoped>

.todo-completed {
  text-decoration: line-through;
  opacity: 0.5;
}
	.todo-checkbox {
		margin-right: 5px;
	}

	li {
		list-style-type: none;
	}
</style>
