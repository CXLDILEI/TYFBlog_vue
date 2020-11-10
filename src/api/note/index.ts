import {ApiPromise, get, post} from '@/api';

export interface Form {
    title: string,
    content: string,
    textValue: string
}

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

/**
 *  新增笔记
 * @param data
 */
export function addNote(data: Form): ApiPromise<any> {
    return post('/note/addNote', data)
}

/**
 * 笔记上传图片
 * @param file
 */
export function uploadimg(file: Blob): ApiPromise<any> {
    return post('/note/uploadimg', file, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
}
