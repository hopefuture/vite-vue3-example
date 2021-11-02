import { warn } from '../middlewares/logger';

// 格式化 json 数据
export const parseJSON = (str: string) => {
  if (!str) {
    return {};
  }
  try {
    return JSON.parse(str);
  } catch (e) {
    warn(`JSON 格式不正确：${e.message}`);
    return {};
  }
};

// 把 json 数据转换为字符串
export const stringifyJSON = (json: any, space: any) => {
  try {
    return JSON.stringify(json, null, space);
  } catch (e) {
    warn(`JSON 格式不正确：${e.message}`);
    return '';
  }
};

// 首字母大写
export const upperFirstLetter = (str: string) => {
  if (!str) {
    return '';
  }
  return str[0].toUpperCase() + str.substring(1);
};
