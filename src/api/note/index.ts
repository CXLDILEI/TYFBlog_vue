import {ApiPromise, get, post, upLoad} from '@/api';

export interface Form {
    id?: string | null
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
    return post('/note/addNote', data);
}

/**
 * 编辑笔记
 * @param data
 */
export function upDataNote(data: Form): ApiPromise<any> {
    return post('/note/updateNote', data);
}

/**
 * 获取笔记详情
 * @param params
 */
export function getNoteDetail(params: { id: string }): ApiPromise<any> {
    return get('/note/getNoteDetail', params);
}

/**
 * 笔记上传图片
 * @param file
 */
export function uploadimg(file: Blob | FormData): ApiPromise<any> {
    return upLoad('/note/uploadimg', file, {headers: {'content-type': 'application/x-www-form-urlencoded'}});
}

/**
 * 获取笔记列表
 * @param params
 */
export function getComment(params: { noteId: string, replyPageSize: number, page: number, pageSize: number }): ApiPromise<[{ data: Array<any>, totalPage: number }]> {
    return get('/comment/getComment', params);
}

/**
 * 删除笔记
 * @param data
 */
export function noteDelete(data: { id: string }): ApiPromise<any> {
    return post('/note/deleteNote', data);
}

/**
 * 增加评论
 * @param data
 */
export function addComment(data: {
    noteId: string,
    content: string,
}): ApiPromise<any> {
    return post('/comment/addComment', data);
}

/**
 * 回复列表
 * @param params
 */
export function moreReply(params: { commentId: string, pageData: any }): ApiPromise<any> {
    return get('/comment/getMoreReply', params);
}

/**
 * 点赞
 * @param data
 */
export function addCommentLike(data: { type: number, id: string }): ApiPromise<any> {
    return post('/comment/addCommentLike', data);
}

/**
 * 新增回复
 * @param data
 */
export function addReply(data: {
    commentId: string,
    toUserId: string,
    content: string
}): ApiPromise<any> {
    return post('/comment/addReply', data);
}
