/**
 * 使用webpack的批量导出配置 
 * 	context(API目录的相对路劲， 是否支持递归子目录，需要查询文件的后缀)
 */

const requireApi = require.context('.', true, /.js$/);

let module = {};

requireApi.keys().forEach((key, index) => {
	if (key === './index.js') return;
	Object.assign(module, requireApi(key))
})

export default module;