import { createSlice, current } from "@reduxjs/toolkit";

export const BlogContentSlice = createSlice({
    name: 'BlogContent',
    initialState: {
        blogContent: [],
        modifyProxy: true,
    },
    reducers: {
        addBlogContent: (state, action) => {
            state.blogContent = [...state.blogContent, action.payload];
        },
        clearBlogContent: (state, action) => {
            state.blogContent = [...action.payload];
        }
    }
})

export default BlogContentSlice.reducer;
export const { addBlogContent, clearBlogContent } = BlogContentSlice.actions;