<script setup lang="ts">
	import NoteItem from './NoteItem.vue';
	import { useNoteStore } from '@/stores/note';

	const noteStore = useNoteStore();
</script>

<template>
	<div>
		<NoteItem
			v-for="note of noteStore.notes"
			:key="note.id"
      :note="note"
		/>
	</div>
</template>

<style scoped></style>
