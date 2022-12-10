import Express from 'express';
// 引入 User、Recipe Model 方便進行資料庫操作
import User from '../../../common/models/users';
import AutoSaveData from '../../../common/models/autosavedata';
import AutoSaveBlog from '../../../common/models/autosaveblog';
import SavedPost from '../../../common/models/savedposts';
import mongoose from 'mongoose'; 

// API Route
const app = new Express();
const apiRoutes = Express.Router();

// 設定 JSON Web Token 的 secret variable

apiRoutes.get('/surfaceUI/CreatePost/:userId', (req, res) => {
  const authorID = req.params.userId;

  try {
    User.findById(authorID, (err, user) => {
      SavedPost.findById(user.autoSaveContent, (err, savePostList) => {
        AutoSaveBlog.findById(savePostList.firstCreate)
          .populate('feature')
          .exec(function (err, post) {
            if (err) throw new Error(`processing error in request`)
            else res.send({ post })
          })

      })
    })
  } catch (err) {
    res.status(500).send(err)
  }

});


apiRoutes.post('/surfaceUI/CreatePost/:userId/', (req, res) => {
  const authorID = req.params.userId;

  const newSaveData = new AutoSaveData({
    dish_name: req.body.featureData.dishName,
    description: req.body.featureData.description,
    backgroundImg: req.body.featureData.backgroundImg,
    tagList: req.body.featureData.tagList,
    _id: new mongoose.Types.ObjectId(),
  });

  const newAutoSaveBlog = new AutoSaveBlog({
    content: req.body.blogContent,
    feature: new mongoose.Types.ObjectId(),
    _id: new mongoose.Types.ObjectId(),
    createAt: Date.now()
  });

  try {
    User.findById(authorID, (err, user) => {
      SavedPost.findById(user.autoSaveContent, (err, savePostList) => {
        // refresh in first CreatePost
        if (savePostList.firstCreate != undefined) {
          AutoSaveBlog.findById(savePostList.firstCreate, (err, post) => {
            post.content = req.body.blogContent;
            post.save((err) => {
              if (err) throw new Error(`processing error in request`);
              res.send({ success: 'success' });
            });
          });
        } else {
          newSaveData.save((err, data) => {
            if (err) throw new Error(`processing error in request`);
            newAutoSaveBlog.feature = data._id;
            newAutoSaveBlog.save((err, blog) => {
              if (err) throw new Error(`processing error in request`);
              savePostList.firstCreate = blog._id;
              savePostList.postList.unshift(blog._id);
              savePostList.save((err) => {
                if (err) throw new Error(`processing error in request`);
                else {
                  res.status(200).send({ success: 'first blog saved' });
                }
              })
            })
          })
        }
      })

    });
  } catch (error) {
    res.status(500).send(err);
  }
});

apiRoutes.delete('/surfaceUI/CreatePost/:userId/:postId', (req, res) => {
  try {
    AutoSaveBlog.findById(req.params.postId, (err, post) => {
      post.content = [];
      post.save((err) => {
        if (err) throw new Error(`processing error in request`);
        else res.status(200).send('blogContent delete successfully');
      })
    })
  } catch (error) {
    res.status(500).send(err);
  }
});

apiRoutes.get('/surfaceUI/CreatePost/:userId/:postId', (req, res) => {
  try {
    AutoSaveBlog.findById(req.params.postId)
      .populate('feature')
      .exec(function (err, post) {
        if (err) throw new Error(`processing error in request`)
        else res.status(200).send({ post });
      })
  } catch (err) {
    res.status(500).send(err);
  }
});

apiRoutes.post('/surfaceUI/CreatePost/:userId/:postId', (req, res) => {
  try {
    AutoSaveBlog.findById(req.params.postId, (err, blogContent) => {
      const { dishName, description, backgroundImg, tagList } = req.body.featureData;
      if (err) throw new Error(`processing error in request`)
      else {
        blogContent.content = req.body.blogContent;
        blogContent.save((err) => {
          if (err) throw new Error(`processing error in request`);

          AutoSaveData.findById(blogContent.feature, (err, feature) => {
            feature.dish_name = dishName;
            feature.description = description;
            feature.backgroundImg = backgroundImg;
            feature.tagList = tagList;
            feature.save((err) => {
              if (err) throw new Error(`processing error in request`)
              else res.status(200).send({ success: 'auto save successfully' });
            })
          })
        })
      }
    })
  } catch (error) {
    res.status(500).send(err)
  }
});

export default apiRoutes