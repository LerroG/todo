import { createRouter, createWebHistory } from 'vue-router';
import { loadLayoutMiddleware } from '@/router/middleware/loadLayout.middleware';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/HomeView.vue'),
		},
		{
			path: `/add`,
			name: 'add',
			component: () => import('../views/AddEditView.vue'),
		},
		{
			path: `/edit/:id`,
			name: 'edit',
			component: () => import('../views/AddEditView.vue'),
		},
	],
});

router.beforeEach(loadLayoutMiddleware);

export default router;
