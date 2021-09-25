// 集合路由、导航，不开发前端的情况下可以将以下2行注释掉
// const nav = $.nav_admin('{0}');
// nav.update();

/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	var {
		query,
		body
	} = req;

	// 操作sql模板
	var m = query.method;
	if (m === "get_obj") {
		var user = ctx.session.user;
		if (!user) {
			return $.ret.error(10000, "账户未登录！");
		}
		query.user_id = user.user_id;
	}
	var ret = await this.sql.run(query, body, db);
	return ret;
};

exports.main = main;
