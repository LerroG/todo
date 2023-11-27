<script setup lang="ts">
	import { useRoute, useRouter } from 'vue-router';
	import { computed, onMounted, ref, reactive } from 'vue';
	import { useNoteStore } from '@/stores/note';
	import type { INote } from '@/stores/note';
	import type { FormInstance } from 'element-plus';
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
	const formRef = ref<FormInstance>();

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

	const saveNote = (note: INote, formEl: FormInstance | undefined) => {
		if (!formEl) return;

		formEl.validate((valid) => {
			if (valid) {
				console.log('submit!');
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
			} else {
				console.log('error submit!');
				return false;
			}
		});
	};

	const returnToHomePage = () => {
		confirmBox(
			'Вы уверены что хотите отменить изменения?',
			'Подтвердите действие'
		).then(() => {
			router.push('/');
		});
	};

	const setDataToForm = () => {
		const data = getNoteInfo();
		if (data) {
			todoForm.value = JSON.parse(JSON.stringify(data));
		}
	};

	const removeNote = (id: string) => {
		confirmBox(
			'Вы уверены что хотите удалить эту запись?',
			'Подтвердите действие'
		)
			.then(() => {
				confirmMsg();
				noteStore.removeNoteItem(id);
				router.push('/');
			})
			.catch(() => {
				cancelMsg();
			});
	};

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
			ref="formRef"
			label="Создание"
			class="form"
			:model="todoForm"
		>
			<el-form-item
				label="Название заметки"
				style="margin-bottom: 40px"
				prop="title"
				:rules="{
					required: true,
					message: 'Это поле не может быть пустым',
					trigger: 'blur',
				}"
			>
				<el-col :span="11">
					<el-input
						v-model="todoForm.title"
						placeholder="Введите название заметки"
					/>
				</el-col>
				<el-col
					v-if="edit"
					:span="2"
				>
					<el-checkbox
						v-model="todoForm.isNoteCompleted"
						class="checkbox"
					>
						{{ todoForm.isNoteCompleted ? 'Выполнено' : 'Не выполнено' }}
					</el-checkbox>
				</el-col>
			</el-form-item>

			<el-form-item
				label="Название задачи"
				v-for="(todo, idx) of todoForm.todos"
				:key="todo.id"
				:prop="'todos.' + idx + '.todo'"
				:rules="{
					required: true,
					message: 'Это поле не может быть пустым',
					trigger: 'blur',
				}"
			>
				<el-col :span="10">
					<el-input
						v-model="todo.todo"
						placeholder="Введите задачу"
					/>
				</el-col>
				<el-col
					v-if="edit"
					:span="4"
				>
					<el-checkbox
						v-model="todo.isTodoCompleted"
						class="checkbox"
					>
						{{ todo.isTodoCompleted ? 'Выполнено' : 'Не выполнено' }}
					</el-checkbox>
				</el-col>
				<el-col :span="2">
					<el-button
						style="margin-left: 10px"
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
				<span style="margin-left: 10px">Добавить задачу</span>
			</el-form-item>
			<el-form-item>
				<el-button
					:type="typeButtonOk"
					@click="
						saveNote(
							{
								...todoForm,
							},
							formRef
						)
					"
					>{{ edit ? 'Сохранить изменения' : 'Сохранить заметку' }}</el-button
				>
				<el-button
					v-if="edit"
					type="danger"
					@click="removeNote(todoForm.id)"
					>Удалить</el-button
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
