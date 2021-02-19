<template>
    <div>
        <!-- 评论框 -->
        <div class="comment-content">
            <a-input
                    type="comment"
                    :rows="2"
                    placeholder="请输入评论内容"
                    v-model:value="comment"
            >
            </a-input>
            <a-button
                    class="comment-btn"
                    type="primary"
                    @click="subComment"
            >提交
            </a-button>
        </div>
        <!-- 评论列表 -->
        <div>
            <div class="comment-list-item" v-for="(item,i) in commentList" :key="i">
                <div class="comment-list-item-top">
                    <div class="comment-list-item-top-header">
                        <div class="avatar">
                            <img v-if="item.user&&item.user.avatar" :src="item.user.avatar" alt="">
                            <img v-else src="../../../../src/assets/images/user.png" alt=""/>
                        </div>
                        <span>{{item.user.userName}}</span>
                        <span class="more-bottom" v-if="isAuthor(item.user._id)">(作者)</span>
                    </div>
                    <span class="date">{{item.createTime}}</span>
                </div>
                <div class="comment-list-item-center">
                    {{item.content}}
                </div>
                <div class="comment-list-item-bottom" @mouseover="hoverBottom(item)" @mouseout="outBottom(item)">
                    <div class="comment-list-item-bottom-item" v-if="item.liked">
                        <img v-if="item.liked.isLiked" @click="toCancelLike(LikedType.Comment,item._id,i)" src="../../../../src/assets/images/zan-y.png" alt=""/>
                        <img v-if="!item.liked.isLiked" @click="addLiked(LikedType.Comment,item._id,i)" src="../../../../src/assets/images/zan-n.png" alt=""/>
                        <span>{{item.liked.likedCount}}</span>
                    </div>
                    <div class="comment-list-item-bottom-item" v-show="isHover&&hoverId==item._id">
                        <div class="comment-list-item-bottom-item" @click="toReply(i)">
                            <img src="../../../../src/assets/images/reply.png" alt=""/>
                            <span>回复</span>
                        </div>
                        <div class="comment-list-item-bottom-item">
                            <img
                                    style="width:18px;height:18px;"
                                    src="../../../../src/assets/images/down.png"
                                    alt=""
                            />
                            <span>踩</span>
                        </div>
                    </div>
                </div>
                <!-- 回复评论框 -->
                <div class="comment-content" v-if="showReply&&replyIndex==i">
                    <a-input
                            type="comment"
                            :rows="2"
                            placeholder="请输入回复内容"
                            v-model:value="replyContent"
                    >
                    </a-input>
                    <a-button
                            class="comment-btn"
                            type="primary"
                            @click="subReply(item,i)"
                    >提交
                    </a-button
                    >
                </div>
                <!-- 回复列表 -->
                <div v-if="item.replyList" class="reply-list">
                    <div class="comment-list-item reply-item" v-for="(value,idx) in item.replyList.list"
                         :key="value._id">
                        <div class="comment-list-item-top">
                            <div class="comment-list-item-top-header">
                                <div class="avatar">
                                    <img v-if="value.from&&value.from.avatar" :src="value.from.avatar" alt="">
                                    <img src="../../../../src/assets/images/user.png" alt=""/>
                                </div>
                                <div v-if="value.from&&value.from._id!==value.to._id">
                                    <span>{{value.from.userName}}</span><span class="more-bottom"
                                                                              v-if="isAuthor(value.from._id)">(作者)</span><span
                                        class="back-text">回复</span><span>{{value.to.userName}}</span><span
                                        class="more-bottom" v-if="isAuthor(value.to._id)">(作者)</span>
                                </div>
                                <div v-else>
                                    <span>{{value.from.userName}}</span><span class="more-bottom"
                                                                              v-if="isAuthor(value.from._id)">(作者)</span>
                                </div>
                            </div>
                            <span class="date">{{value.createTime}}</span>
                        </div>
                        <div class="comment-list-item-center">
                            {{value.content}}
                        </div>
                        <div class="comment-list-item-bottom" @mouseover="hoverBottom(value)"
                             @mouseout="outBottom(value)">
                            <div v-if="value.liked" class="comment-list-item-bottom-item">
                                <img v-if="value.liked.isLiked" @click="toCancelLike(LikedType.Reply,value._id,i,idx)" src="../../../../src/assets/images/zan-y.png" alt=""/>
                                <img v-if="!value.liked.isLiked" @click="addLiked(LikedType.Reply,value._id,i,idx)" src="../../../../src/assets/images/zan-n.png" alt=""/>
                                <span>{{value.liked.likedCount}}</span>
                            </div>
                            <div class="comment-list-item-bottom-item" v-show="isHover&&hoverId==value._id">
                                <div class="comment-list-item-bottom-item" @click="toCommentReply(idx,value._id)">
                                    <img src="../../../../src/assets/images/reply.png" alt=""/>
                                    <span>回复</span>
                                </div>
                                <div class="comment-list-item-bottom-item">
                                    <img
                                            style="width:18px;height:18px;"
                                            src="../../../../src/assets/images/down.png"
                                            alt=""
                                    />
                                    <span>踩</span>
                                </div>
                            </div>
                        </div>
                        <!-- 回复框 -->
                        <div class="comment-content"
                             v-if="showCommentReply&&commentReplyIndex==idx&&commentReplyId==value._id">
                            <a-input
                                    type="comment"
                                    :rows="2"
                                    placeholder="请输入回复内容"
                                    v-model:value="replyContent"
                            >
                            </a-input>
                            <a-button
                                    class="comment-btn"
                                    type="primary"
                                    @click="subCommentReply(value,item._id,i)"
                            >提交
                            </a-button
                            >
                        </div>
                    </div>
                    <p class="more-bottom" @click="getMoreReply(item._id,i)"
                       v-if="item.replyList.total>2&&item.replyList.total<=5&&!item.isSelect">查看其他
                        {{item.replyList.total-2}} 条回复</p>
                    <p class="more-bottom"
                       v-if="item.replyList.total>5&&item.replyList.total>item.replyList.list.length"
                       @click="getAllReply(item._id,i,item.replyList.total)">查看全部
                        {{item.replyList.total}} 条回复</p>
                </div>
            </div>
        </div>
        <div class="more-content" v-if="hasMore" @click="getMore">
            <div class="more">查看更多</div>
        </div>
        <div v-if="commentList.length==0">
            <p class="nomore">暂无评论</p>
        </div>
        <div v-if="!hasMore&&commentList.length">
            <p class="nomore">无更多数据</p>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, toRefs, reactive} from 'vue';
    import {getComment, addReply, moreReply, addCommentLike, addComment, cancelLike} from '@/api/note';
    import {useRouter} from 'vue-router';
    import {message} from 'ant-design-vue';
    import {useStore} from 'vuex';
    import {LikedType, LikedStatus} from '@/util/enum';

    export default defineComponent({
        name: 'CommentList',
        setup() {
            const {currentRoute} = useRouter();
            const id = String(currentRoute.value.query.id);
            const store = useStore() as any;
            const state = reactive({
                id: null,
                noteData: {},
                user: {},
                comment: '',
                commentList: [] as any,
                replyContent: '',
                showReply: false,
                replyIndex: 0,
                showCommentReply: false,
                commentReplyIndex: 0,
                commentReplyId: '',
                isHover: false,
                hoverId: null,
                pageData: {
                    page: 1,
                    pageSize: 10
                },
                replyPageData: {
                    page: 1,
                    pageSize: 10
                },
                showAllComment: false,
                commentId: '',
                hasMore: false,
                loading: false,
                LikedType: LikedType
            });
            onMounted(() => {
                getCommentData();
            });
            const isAuthor = ( id: string ) => {
                return store.state.user?.info?._id === id;
            };
            const getCommentData = (replyPageSize = 2, getMore = false) => {
                state.loading = true;
                getComment({
                    noteId: id,
                    replyPageSize: replyPageSize,
                    page: state.pageData.page,
                    pageSize: state.pageData.pageSize
                }).then((res: any) => {
                    res.data.list.forEach((item: any) => {
                        // item.createTime = this.$global.initTime(item.createTime);
                        // item.user.avatar = this.$global.getAvatar(item.user.avatar)
                        // item.replyList.data.forEach((value:any)=>{
                        //   value.createTime = this.$global.initTime(value.createTime)
                        //   value.from.avatar = this.$global.getAvatar(value.from.avatar)
                        // })
                        item.isSelect = false
                    })
                    if (getMore) {
                        const list: Array<any> = res.data || [];
                        state.commentList.push(...list);
                    } else {
                        state.comment = '';
                        state.commentList = res.data.list;
                    }
                    hasMoreChange(res.data.totalPage);
                }).finally(() => {
                    state.loading = false;
                });
            };
            const subComment = () => {
                state.loading = true;
                if (state.comment.replace(/\s*/g, '') == '') {
                    return message.error('请输入内容');
                }
                addComment({
                    noteId: id,
                    content: state.comment,
                }).then((res) => {
                    // res.data.createTime = this.$global.initTime(res.data.createTime)
                    // res.data.user.avatar = this.$global.getAvatar(res.data.user.avatar)
                    state.commentList.unshift(res.data);
                    message.success('评论成功');
                    state.comment = '';
                }).finally(() => {
                    state.loading = false;
                });
            };
            const hasMoreChange = (totalPage: number) => {
                if (state.pageData.page < totalPage) {
                    state.hasMore = true;
                } else {
                    state.hasMore = false;
                }
            };
            const toReply = (i: number) => {
                if (i == state.replyIndex) {
                    state.showReply = !state.showReply;
                } else {
                    state.showReply = true;
                    state.replyIndex = i;
                }
                state.replyContent = '';
            };
            const subReply = (item: any, i: number) => {
                state.loading = true;
                addReply({
                    commentId: item._id,
                    to: item.user._id,
                    content: state.replyContent,
                }).then((res) => {
                    // res.data.user.avatar = this.$global.getAvatar(res.data.user.avatar)
                    // res.data.createTime=this.$global.initTime(res.data.createTime)
                    state.commentList[i].replyList.list.unshift(res.data);
                    state.commentList[i].isSelect = true;
                    message.success('回复成功');
                    state.showReply = false;
                    state.replyIndex = 0;
                    state.replyContent = '';
                }).finally(() => {
                    state.loading = false;
                });
            };
            const toCommentReply = (i: number, id: string) => {
                if (i == state.commentReplyIndex && state.commentReplyId == id) {
                    state.showCommentReply = !state.showCommentReply;
                } else {
                    state.showCommentReply = true;
                    state.commentReplyIndex = i;
                    state.commentReplyId = id;
                }
            };
            const subCommentReply = (value: any, commentId: string, i: number) => {
                addReply({
                    commentId: commentId,
                    to: value.to._id,
                    content: state.replyContent,
                }).then((res) => {
                    message.success('回复成功');
                    // res.data.createTime=state.$global.initTime(res.data.createTime)
                    // res.data.user.avatar = state.$global.getAvatar(res.data.user.avatar)
                    state.commentList[i].replyList.list.unshift(res.data);
                    state.commentList[i].isSelect = true;
                    state.showCommentReply = false;
                    state.commentReplyIndex = 0;
                    state.commentReplyId = '';
                    state.replyContent = '';
                }).finally(() => {
                    state.loading = false;
                });
            };
            const hoverBottom = (e: any) => {
                state.isHover = true;
                state.hoverId = e._id;
            };
            const outBottom = () => {
                state.isHover = false;
                state.hoverId = null;
            };
            // 查看更多回复
            const getMoreReply = (commentId: string, index: number) => {
                moreReply({
                    commentId,
                    page: state.replyPageData.page,
                    pageSize: state.replyPageData.pageSize
                }).then((res) => {
                    // res.data.forEach((value)=>{
                    //   value.createTime= this.$global.initTime(value.createTime)
                    //   value.from.avatar = this.$global.getAvatar(value.from.avatar)
                    // })
                    state.commentList[index].replyList.list = res.data.list;
                    state.commentList[index].isSelect = true;
                }).finally(() => {
                    state.loading = false;
                });
            };
            // 查看所有回复
            const getAllReply = (commentId: string, index: number, total: number) => {
                state.replyPageData.pageSize = total;
                getMoreReply(commentId, index);
            };
            // 点赞
            const addLiked = (type: number, id: string, index: number, idx: number) => {
                state.loading = true;
                // type=0 点赞评论，type=1 点赞回复
                addCommentLike({
                    type: type,
                    sourceId: id
                }).then((res) => {
                    console.log(state.commentList);
                    if (type == LikedType.Comment) {
                        state.commentList[index].liked = {
                            isLiked: res.data === LikedStatus.Liked,
                            likedCount: ++state.commentList[index].liked.likedCount
                        };
                    } else {
                        state.commentList[index].replyList.list[idx].liked = {
                            isLiked: res.data === LikedStatus.Liked,
                            likedCount: ++state.commentList[index].replyList.list[idx].liked.likedCount
                        };
                    }
                }).finally(() => {
                    state.loading = false;
                });
            };
            const toCancelLike = (type: number, id: string, index: number, idx: number)=>{
                state.loading = true;
                cancelLike({
                    type: type,
                    sourceId: id
                }).then((res)=>{
                    if (type == LikedType.Comment) {
                        state.commentList[index].liked = {
                            isLiked: res.data === LikedStatus.Liked,
                            likedCount: --state.commentList[index].liked.likedCount
                        };
                    } else {
                        state.commentList[index].replyList.list[idx].liked = {
                            isLiked: res.data === LikedStatus.Liked,
                            likedCount: --state.commentList[index].replyList.list[idx].liked.likedCount
                        };
                    }
                })
            }
            return {
                ...toRefs(state),
                toReply,
                subReply,
                toCommentReply,
                subCommentReply,
                hoverBottom,
                outBottom,
                getMoreReply,
                getAllReply,
                addLiked,
                subComment,
                isAuthor,
                toCancelLike
            };
        }
    });
</script>

<style scoped>
    .more {
        width: 360px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 16px;
        border-radius: 4px;
        color: rgb(89, 170, 255);
        cursor: pointer;
        font-size: 14px;
    }

    .note-content {
        width: 50vw;
    }

    .describe {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .detail-box {
        margin-top: 16px;
    }

    .user-header {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: rgba(24, 152, 239, 0.3);
        overflow: hidden;
        margin-right: 8px;
    }

    .user-header img {
        width: 100%;
        height: 100%;
    }

    .time {
        margin-left: 8px;
    }

    .note-top {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .comment {
        width: calc(100% - 32px);
        margin-top: 16px;
        margin-bottom: 16px;
        font-size: 14px
    }

    .comment h4 {
        padding-bottom: 8px;
        border-bottom: 1px solid #ddd;
    }

    .edit {
        position: absolute;
        top: 16px;
        right: 32px;
        padding: 16px;
    }

    .comment-content {
        display: flex;
        margin-top: 16px;
    }

    .comment-content .comment-btn {
        margin-left: 10px;
    }

    .comment-list {
        border-bottom: 1px solid #ddd;
    }

    .comment-list-item {
        padding: 16px 0;

    }

    .comment-list-item:nth-last-child(n+2) {
        border-bottom: 1px solid #ddd;
    }

    .comment-list .comment-list-item-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .avatar {
        width: 25px;
        height: 25px;
        background-color: rgba(24, 152, 239, 0.3);
        border-radius: 20px;
        margin-right: 8px;
        overflow: hidden;
    }

    .avatar img {
        width: 100%;
        height: 100%;
    }

    .comment-list-item-top-header {
        display: flex;
        align-items: center;
    }

    .date {
        color: #8590a6;
        font-size: 9pt;
    }

    .comment-list-item-center {
        margin-top: 8px;
        padding-left: 25px;
    }

    .comment-list-item-bottom {
        display: flex;
        align-items: center;
        margin-top: 12px;
        padding-left: 25px;
    }

    .comment-list-item-bottom img {
        width: 20px;
        height: 20px;
    }

    .comment-list-item-bottom-item {
        display: flex;
        align-items: center;
        margin-right: 24px;
        font-size: 13px;
        color: #8a8a8a;
        cursor: pointer;
    }

    .comment-list-item-bottom-item span {
        margin-left: 4px;
    }

    .reply-list {
        padding-left: 25px;
    }

    .back-text {
        color: #8590a6;
        padding: 0 8px;
    }

    .more-bottom {
        color: #999;
        cursor: pointer;
    }

    .more-content {
        display: flex;
        justify-content: center
    }

    .nomore {
        font-size: 14px;
        color: #999;
        text-align: center;
    }
</style>
