<script setup lang="ts">
	import Header from '@/components/Header.vue';
</script>

<template>
	<Header />
	<main class="app-layout-default-main">
		<slot />
	</main>
</template>

<style scoped>
	.app-layout-default-main {
		min-height: var(100vh - --header-height);
    display: flex;
    justify-content: center;
	}
</style>
