<script setup lang="ts">
	import { useRoute, useRouter } from 'vue-router';
	import { computed, onMounted, ref } from 'vue';
	import { useNoteStore } from '@/stores/note';
	import type { INote } from '@/stores/note';
	import { confirmBox, confirmMsg, cancelMsg } from '@/utils/confirm';

	const noteStore = useNoteStore();
	const router = useRouter();
	const route = useRoute();

	const getNoteInfo = () => {
		if (route.params.id) {
			const id = route.params.id.toString();
			const noteInfo = noteStore.getOneNote(id);
			return noteInfo;
		}
	};

	let edit = ref(false);

	edit.value = Boolean(route.params.id);

	const typeButtonOk = computed(() => (edit.value ? 'warning' : 'success'));
	const getRandomId = () => Math.floor(Math.random() * 100000).toString();

	const todoForm = ref<INote>({
		id: getRandomId(),
		title: '',
		isNoteCompleted: false,
		todos: [],
	});

	const addTodo = () => {
		todoForm.value.todos.push({
			id: getRandomId(),
			todo: '',
			isTodoCompleted: false,
		});
	};

	const removeTodo = (idx: number) => {
		confirmBox(
			'Вы уверены что хотите удалить эту запись?',
			'Подтвердите действие'
		)
			.then(() => {
				confirmMsg();
				todoForm.value.todos.splice(idx, 1);
			})
			.catch(() => {
				cancelMsg();
			});
	};

	const saveNote = (note: INote) => {
		if (edit.value) {
			confirmBox(
				'Вы уверены что хотите сохранить изменения?',
				'Подтвердите действие'
			).then(() => {
				noteStore.editNoteItem(note);
				router.push('/');
			});
		} else {
			noteStore.setNoteItem(note);
			router.push('/');
		}
	};

	const returnToHomePage = () => {
		router.push('/');
	};

	const setDataToForm = () => {
		const data = getNoteInfo();
		if (data) {
			todoForm.value = JSON.parse(JSON.stringify(data));
		}
	};
	// getNoteInfo();

	onMounted(() => {
		setDataToForm();
	});
</script>

<template>
	<div>
		<h1 class="h1-form">
			{{ edit ? 'Изменение заметки' : 'Создание новой заметки' }}
		</h1>
		<el-form
			label="Создание"
			class="form"
			v-model="todoForm"
		>
			<el-form-item
				label="Title"
				style="margin-bottom: 40px"
			>
				<el-col :span="11">
					<el-input
						v-model="todoForm.title"
						placeholder="Enter note title"
					/>
				</el-col>
				<el-col
					v-if="!edit"
					:span="2"
				>
					<el-checkbox
						v-model="todoForm.isNoteCompleted"
						class="checkbox"
					>
						{{ todoForm.isNoteCompleted ? 'Completed' : 'Not completed' }}
					</el-checkbox>
				</el-col>
			</el-form-item>

			<el-form-item
				label="Todo"
				v-for="(todo, idx) of todoForm.todos"
				:key="todo.id"
			>
				<el-col :span="10">
					<el-input
						v-model="todo.todo"
						placeholder="Enter todo"
					/>
				</el-col>
				<el-col :span="4">
					<el-checkbox
						v-model="todo.isTodoCompleted"
						v-if="!edit"
						placeholder="Enter todo"
						class="checkbox"
					>
						{{ todo.isTodoCompleted ? 'Completed' : 'Not completed' }}
					</el-checkbox>
				</el-col>
				<el-col :span="2">
					<el-button
						type="danger"
						@click="removeTodo(idx)"
						>-</el-button
					>
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					@click="addTodo"
					>+</el-button
				>
			</el-form-item>
			<el-form-item>
				<el-button
					:type="typeButtonOk"
					@click="
						saveNote({
							...todoForm,
						})
					"
					>{{ edit ? 'Сохранить изменения' : 'Сохранить заметку' }}</el-button
				>
				<el-button @click="returnToHomePage">Отмена</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<style scoped>
	.form {
		width: 1000px;
		padding-top: 20px;
	}

	.checkbox {
		margin-left: 10px;
	}

	.h1-form {
		margin-top: 16px;
	}
</style>
