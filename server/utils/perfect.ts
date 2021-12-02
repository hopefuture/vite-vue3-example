import { warn } from '../middlewares/logger';

// 格式化 json 数据
export const parseJSON = (str: string) => {
  if (!str) {
    return {};
  }
  try {
    return JSON.parse(str);
  } catch (e: any) {
    warn(`JSON 格式不正确：${e.message}`);
    return {};
  }
};

// 把 json 数据转换为字符串
export const stringifyJSON = (json: any, space: any) => {
  try {
    return JSON.stringify(json, null, space);
  } catch (e: any) {
    warn(`JSON 格式不正确：${e.message}`);
    return '';
  }
};
