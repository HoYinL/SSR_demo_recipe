import { configureStore } from '@reduxjs/toolkit';
import loginState from './loginreducer';
import token from "./tokenreducer";
import filter from "./filterreducer";
import paddingBottom from './paddingb_reducer_afterLogin';
import paddingBottomBeforeLogin from './paddingb_reducer_beforeLogin';
import clearState from './clearrevealreducer';
import publishreducer from './publishreducer';
import feature from './featurereducer';
import blogConent from './blogcontentreducer';
import defaultCaption from './defaultcaptionreducer';
import save from './savereducer';
import saveContent from './savecontentreducer';
import publishBlog from './publishblogreducer';
import postedComment from './postcommentreducer';
import blockedPost from './blockedpostreducer';
import reportedPost from './reportedpostreducer';

const store =  configureStore({
  reducer:{
    loginState: loginState,
    token: token,
    filter: filter,
    paddingBottom: paddingBottom,
    paddingBottomBeforeLogin: paddingBottomBeforeLogin,
    clearState: clearState,
    publishreducer: publishreducer,
    feature: feature,
    blogContent: blogConent,
    defaultCaption: defaultCaption,
    save: save,
    saveContent: saveContent,
    publishBlog: publishBlog,
    postedComment: postedComment,
    reportedPost: reportedPost,
    blockedPost: blockedPost
  },
})

export default store