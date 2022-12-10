import Express from 'express';
// 引入 jsonwebtoken 套件 
// 引入 User、Recipe Model 方便進行資料庫操作
import User from '../../../common/models/users';
import PublishedFeatures from '../../../common/models/publishedfeatures';
import PublishedPost from '../../../common/models/publishedpost';
import PublishedPostList from '../../../common/models/publishedpostlist';
import PostCommentList from '../../../common/models/postcommentlist';
import mongoose from 'mongoose'; // /Blog/

// API Route
const app = new Express();
const apiRoutes = Express.Router();

// 設定 JSON Web Token 的 secret variable

apiRoutes.post('/PostPublishedPost/:userId', (req, res) => {
  const authorID = req.params.userId;

  const newPublishedFeatures = new PublishedFeatures({
    dish_name: req.body.featureData.dishName,
    description: req.body.featureData.description,
    backgroundImg: req.body.featureData.backgroundImg,
    tagList: req.body.featureData.tagList,
    _id: new mongoose.Types.ObjectId(),
  });

  const newPublishedPost = new PublishedPost({
    content: req.body.blogContent,
    author: authorID,
    comment: new mongoose.Types.ObjectId(),
    feature: new mongoose.Types.ObjectId(),
    _id: new mongoose.Types.ObjectId(),
    createAt: Date.now(),
    bookmarked: 0,
  });

  const newCommentList = new PostCommentList({
    commentList: [],
    _id: new mongoose.Types.ObjectId(),
  });

  try {
    User.findById(authorID, (err, user) => {
      PublishedPostList.findById(user.publishedPostList, (err, publishedPostList) => {
        newCommentList.save((err, commentList) => {
          newPublishedFeatures.save((err, feature) => {
            if (err) throw new Error(`processing error in request`);
            newPublishedPost.feature = feature._id;
            newPublishedPost.commentList = commentList._id;
            newPublishedPost.save((err, blog) => {
              if (err) throw new Error(`processing error in request`);
              publishedPostList.postList.unshift(blog._id);
              publishedPostList.save((err) => {
                if (err) throw new Error(`processing error in request`);
                else {
                  res.status(200).send({ success: 'blog is successfully published' });
                };
              });
            });
          });
        });
      });
    });
  } catch (error) {
    res.status(500).send(error);
  };
});

apiRoutes.get('/GetPublishedPost/:userId/:limit', (req, res) => {
  const limit = parseInt(req.params.limit);

  try {
    User.findById(req.params.userId, (err, user) => {
      if (err) throw new Error(`processing error in request`);
      if (user.publishedPostList != undefined) {
        PublishedPostList.findById(user.publishedPostList, (err, publishedPost) => {
          if (err) throw new Error(`processing error in request`);
          const list = publishedPost.postList;
          const returnList = list.slice((limit - 1) * 10, 10);

          res.status(200).send({ posts: returnList });
        })
      }
    })
  } catch (error) {
    res.status(500).send(error);
  }
});

apiRoutes.get(`/GetPublishedPostFeatures/:postId/`, (req, res) => {
  const postId = req.params.postId;

  try {
    PublishedPost.findById(postId)
      .populate('feature')
      .exec(function (err, feature) {
        if (err) throw new Error(`processing error in request`);
        else res.status(200).send({ feature });
      })
  } catch (error) {
    res.status(500).send(error);
  }
});


apiRoutes.delete('/DeletePublishedPost/:userId/:postId/', (req, res) => {
  // delete 1. post 2. feature data 3. post list 
  const postId = req.params.postId;
  const userId = req.params.userId;

  try {
    User.findById(userId, (err, user) => {
      if (err) throw new Error(`processing error in request`);
      else PublishedPostList.findById(user.publishedPostList, (err, publishedPostList) => {
        if (err) throw new Error(`processing error in request`);
        const postList = [...publishedPostList.postList];
        postList.splice(postList.indexOf(postId), 1);
        publishedPostList.postList = postList;
        publishedPostList.save((err) => {
          if (err) throw new Error(`processing error in request`);
          else PublishedPost.findByIdAndDelete(postId, (err, post) => {
            if (err) throw new Error(`processing error in request`);
            else PublishedFeatures.findByIdAndDelete(post.feature, (err, post) => {
              if (err) throw new Error(`processing error in request`);
              res.status(200).send({ success: 'saved editing post is deleted successfully!' })
            })
          })
        })
      })
    })
  } catch (error) {
    res.status(500).send(error);
  }
});

export default apiRoutes