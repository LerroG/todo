import { ElMessage, ElMessageBox } from 'element-plus';

const confirmBox = (msg: string, title: string) => {
	return ElMessageBox.confirm(`${msg}`, `${title}`, {
		confirmButtonText: 'OK',
		cancelButtonText: 'Cancel',
		type: 'warning',
	});
};

const confirmMsg = () => {
	return ElMessage({
		message: 'Действие выполнено',
		type: 'success',
	});
};
const cancelMsg = () => {
	return ElMessage({
		message: 'Действие отменено',
		type: 'info',
	});
};

export { confirmBox, confirmMsg, cancelMsg };
