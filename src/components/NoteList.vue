<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import TodoList from './TodoList.vue';
	import { useNoteStore } from '@/stores/note';
	import { confirmBox, confirmMsg, cancelMsg } from '@/utils/confirm';

	const noteStore = useNoteStore();
	const router = useRouter();

	const goToAddPage = () => {
		router.push('/add/');
	};

	const goToEditPage = (id: string) => {
		router.push(`/edit/${id}`);
	};
	const removeNote = (id: string) => {
		confirmBox(
			'Вы уверены что хотите удалить эту запись?',
			'Подтвердите действие'
		)
			.then(() => {
				confirmMsg();
				noteStore.removeNoteItem(id);
			})
			.catch(() => {
				cancelMsg();
			});
	};
</script>

<template>
	<div>
		<div class="add-button">
			<el-button
				type="success"
				@click="goToAddPage"
				>Добавить</el-button
			>
		</div>
		<div class="list-wrapper">
			<div
				v-if="noteStore.notes.length"
				class="collapse"
			>
				<el-collapse>
					<div>
						<el-collapse-item
							v-for="note of noteStore.notes"
							:key="note.id"
							:name="note.id"
							class="accordion-header"
						>
							<template #title>
								<div class="title-accordion">
									<span>{{ note.title }}</span>
									<div class="button-group">
										<el-button
											type="warning"
											@click.stop="goToEditPage(note.id)"
											><el-icon> <Edit /> </el-icon
										></el-button>
										<el-button
											type="danger"
											@click.stop="removeNote(note.id)"
											><el-icon> <Delete /> </el-icon
										></el-button>
									</div>
								</div>
							</template>

							<div v-if="note.todos.length">
								<ul>
									<TodoList
										v-for="todo of note?.todos"
										:key="todo.id"
										:oneTodo="todo"
										class="todo-item"
									/>
								</ul>
							</div>

							<div v-else>
								<h3>Список дел пуст</h3>
							</div>
						</el-collapse-item>
					</div>
				</el-collapse>
			</div>
			<div
				class="empty-list"
				v-else
			>
				<h2>Спиосок задач пуст</h2>
			</div>
		</div>
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

	.title-accordion {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.button-group {
		margin-right: 10px;
	}

	.collapse {
		min-width: 80%;
		max-width: 80%;
	}
	.list-wrapper {
		display: flex;
		margin-top: 40px;
		justify-content: center;
		height: 100vh;
	}

	.empty-list {
		display: flex;
		justify-content: center;
	}

	.add-button {
		display: flex;
		justify-content: end;
		margin-bottom: 10px;
	}
</style>
