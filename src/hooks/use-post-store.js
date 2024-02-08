import { create } from "zustand";
export const usePostStore = create((set) => ({
  postId: null,
  replies: [],
  comments: [],
  totalComments: 0,
  intialActivePost: (credentials) =>
    set(() => ({
      postId: credentials.postId,
      comments: credentials.comments,
      replies: [],
      totalComments: credentials.comments?.length,
    })),
  addPostReply: (reply) =>
    set((state) => {
      return {
        replies: [...state.replies, reply],
        totalComments: state.totalComments + 1,
      };
    }),
  addPostComment: (comment) =>
    set((state) => {
      return {
        comments: [...state.comments, comment],
        totalComments: state.totalComments + 1,
      };
    }),
  deletePostReply: (replyId) =>
    set((state) => {
      return {
        replies: state.replies.filter((reply) => reply.id !== replyId),
        totalComments: state.totalComments - 1,
      };
    }),
  deletePostComment: (commentId) =>
    set((state) => {
      return {
        comments: state.comments.filter((comment) => comment.id !== commentId),
        totalComments: state.totalComments - 1,
      };
    }),
  intialActiveReplies: (replies) =>
    set((state) => {
      //   console.log(state);
      const newReplies = [...state.replies, ...replies];
      const uniqueReplies = newReplies.filter(
        (reply, index, self) =>
          index === self.findIndex((r) => r.id === reply.id)
      );
      // console.log(uniqueReplies);
      return {
        replies: uniqueReplies,
        totalComments: state.comments.length + uniqueReplies?.length,
      };
    }),
  // updatePostComment: (comment) =>
  //   set((state) => {
  //     state.deletePostComment(comment.id);
  //     state.addPostComment(comment);
  //     return state;
  //   }),
  // updatePostReply: (reply) =>
  //   set((state) => {
  //     state.deletePostReply(reply.id);
  //     state.addPostReply(reply);
  //     return state;
  //   }),
}));
