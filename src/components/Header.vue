<script setup></script>

<template>
	<header class="header">
		<div class="header-wrapper">Header</div>
	</header>
</template>

<style scoped>
	.header {
		height: var(--header-height);
		background-color: var(--primary);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.header-wrapper {
		width: 1000px;
    color: white;
    font-size: 32px;
    font-weight: 700;
	}
</style>
