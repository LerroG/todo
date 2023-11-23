<script lang="ts" setup>
	import { ref, reactive } from 'vue';

	const props = defineProps<{
		text: string;
		modelValue: string;
		user: {
			name: string;
			age: number;
		};

		
	}>();

	const emit = defineEmits<{
		'update:text': [v: string];
		'update:modelValue': [v: string];
		'update:user': [
			v: {
				name: string;
				age: number;
			}
		];
	}>();

	const input = ref(props.text);
	const input2 = ref(props.modelValue);
	const obj = ref({ ...props.user });

	const person = ref({
		name: 'Ismet',
		age: 24,
	});

	const person2 = reactive({
		name: 'Ruslan',
		age: 23,
	});

	const changePerson = () => {
		person.value.name = 'marat';
	};

	const changePerson2 = () => {
		person2.name = 'marat';
	};

	const upadateObj = () => {
		emit('update:user', obj.value);
	};
</script>

<template>
	<div>
		<div>
			<label for="">text</label>
			<input
				type="text"
				name=""
				id=""
				v-model="input"
				@input="emit('update:text', input)"
			/>
		</div>

		<div>
			<label for="">name</label>
			<input
				type="text"
				name=""
				id=""
				v-model="input2"
				@input="emit('update:modelValue', input2)"
			/>
		</div>

		<div>
			<div>
				<label for=""> Obj Name</label>
				<input
					type="text"
					name=""
					id=""
					v-model="obj.name"
					@input="upadateObj"
				/>
			</div>
			<div>
				<label for=""> Obj Age</label>
				<input
					type="number"
					name=""
					id=""
					v-model="obj.age"
					@input="upadateObj"
				/>
			</div>
		</div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil porro
		laudantium accusamus cum minus animi harum reiciendis quam sapiente nesciunt
		voluptatem ipsum, odit possimus numquam assumenda fugit id explicabo ut.
	</div>
</template>
