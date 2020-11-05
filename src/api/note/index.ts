import {ApiPromise, get, post} from '@/api';

/**
 * 获取笔记列表
 * @param params
 */
export function getNoteList(params: {
  pageSize: number,
  page: number
}): ApiPromise<any> {
  return get('/note/getNoteList', params);
}
