/**
  * 页面路由
  * @param router
  */
function pageRoutes(router: any) {
  // 首页
  router.get('/', async (ctx: any) => {
    await ctx.render('index');
  });

  // 例子
  router.get('/examples/(.*)', async (ctx: any) => {
    await ctx.render('examples');
  });

  // 其他未知路径直接重定向首页
  router.get('/(.+)', async (ctx: any) => {
    await ctx.redirect('/');
  });
}

export default pageRoutes;
