import {ApiPromise, get, post, upLoad} from '@/api';

export interface Form {
    id?:string|null
    title: string
    content: string
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
 * 编辑笔记
 * @param data
 */
export function upDataNote(data:Form):ApiPromise<any> {
    return post('/note/upDataNote',data)
}

/**
 * 获取笔记详情
 * @param params
 */
export function getNoteDetail(params: { id: string }): ApiPromise<any> {
    return get('/note/getNoteDetail', params)
}

/**
 * 笔记上传图片
 * @param file
 */
export function uploadimg(file: Blob | FormData): ApiPromise<any> {
    return upLoad('/note/uploadimg', file, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
}
