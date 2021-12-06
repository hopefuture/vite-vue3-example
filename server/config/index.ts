// 根据环境变量返回不同的 config 信息
async function getConfig() {
  const env = process.env.NODE_ENV;

  let config: any = null;

  switch (env) {
    case 'development':
      config = await import('../config/development');
      break;
    case 'beta':
      config = await import('../config/beta');
      break;
    case 'production':
      config = await import('../config/production');
      break;
    default:
      config = await import('../config/production');
  }

  return config.default;
}

export default getConfig;
