<script setup lang="ts">
	import NoteList from '@/components/NoteList.vue';
	import RefTest from '@/components/RefTest.vue';
	import { ref } from 'vue';
	const text = ref('text');
	const name = ref('Ismet');

	const person = ref({
		name: 'Ismet',
		age: 24,
	});

	const log = console.log;
</script>

<template>
	<div class="note-list">
		<pre>{{ text }}</pre>
		<pre>{{ name }}</pre>

		<pre>
			{{ person }}

		</pre
		>
		<RefTest
			v-model:text="text"
			v-model="name"
			v-model:user="person"
		/>
		<NoteList />
	</div>
</template>

<style scoped>
	.note-list {
		width: 1000px;
		padding-top: 20px;
	}
</style>
