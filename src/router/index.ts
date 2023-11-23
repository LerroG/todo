import { createRouter, createWebHistory } from 'vue-router';
import { loadLayoutMiddleware } from '@/router/middleware/loadLayout.middleware';
import { RouteNamesEnum } from '@/router/router.types';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: RouteNamesEnum.home,
			component: () => import('@/views/HomeView.vue'),
		},
		{
			path: '/note',
			name: RouteNamesEnum.addEdit,
			component: () => import('../views/AddEditView.vue'),
		},
	],
});

router.beforeEach(loadLayoutMiddleware);

export default router;
