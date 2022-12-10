import Express from 'express';
// 引入 jsonwebtoken 套件 
import jwt from 'jsonwebtoken';
// 引入 User、Recipe Model 方便進行資料庫操作
import User from '../../common/models/users';
import Contributers from '../../common/models/contributers';
import SavedPost from '../../common/models/savedposts';
import Recipes from '../../common/models/landingpagerecipes';
import Comment from '../../common/models/comment';
import PublishedFeatures from '../../common/models/publishedfeatures';
import PublishedPost from '../../common/models/publishedpost';
import PublishedPostList from '../../common/models/publishedpostlist';
import PostCommentList from '../../common/models/postcommentlist';
import PostComment from '../../common/models/postcomment';
import MarkedPostList from '../../common/models/markedpostlist';
import FollowingUserList from '../../common/models/followinguserlist';
import FollowerList from '../../common/models/followerlist';
import BlockedPostList from '../../common/models/blockedpostlist';
import Video from '../../common/models/video';
import { signJWT } from '../authentication/api';
import passport from 'passport';
import bcrypt from "bcrypt";
import jwt_decode from "jwt-decode";
import mongoose from 'mongoose'; // /Blog/
import * as fs from 'fs';
import config from '../config';
// API Route
const app = new Express();
const apiRoutes = Express.Router();

// 設定 JSON Web Token 的 secret variable
app.set('superSecret', config.secret);

// 回傳所有 recipes
// LandingPage before login
apiRoutes.get('/contributers', (req, res) => {
  Contributers.find({}, (err, contributers) => {
    res.status(200).json(contributers);
  });
});

apiRoutes.get('/recipes', (req, res) => {
  Recipes.find({}, (err, recipes) => {
    res.status(200).json(recipes);
  });
});

apiRoutes.get('/comment', (req, res) => {
  Comment.find({}, (err, comment) => {
    res.status(200).json(comment);
  });
});

// 使用者登入 API ，依據使用 email 和 密碼去驗證，若成功則回傳一個認證 token（時效24小時）我們把它存在 cookie 中，方便前後端存取。這邊我們先不考慮太多資訊安全的議題
apiRoutes.post('/login', passport.authenticate('login', { session: false }), signJWT)

apiRoutes.post('/register', (req, res) => {
  const newFollower = new FollowerList({
    _id: new mongoose.Types.ObjectId(),
    followerList: [],
  });

  const newBlockedPostList = new BlockedPostList({
    _id: new mongoose.Types.ObjectId(),
    blockedPostList: [],
  });

  const newMarkedPostList = new MarkedPostList({
    _id: new mongoose.Types.ObjectId(),
    markedPostList: [],
  });

  const newPublishedPostList = new PublishedPostList({
    _id: new mongoose.Types.ObjectId(),
    postList: [],
  });

  const newAutoSaveContent = new SavedPost({
    _id: new mongoose.Types.ObjectId(),
    postList: [],
  });

  const newFollowingUser = new FollowingUserList({
    _id: new mongoose.Types.ObjectId(),
    followingUserList: [],
  })

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    icon: req.body.backgroundImg,
    admin: false,
    description: req.body.description,
    _id: new mongoose.Types.ObjectId()
  })

  const token_payload = {
    username: req.body.username,
    email: req.body.email,
    admin: false,
    description: req.body.description,
    id: user._id
  }

  try {
    User.findOne({ email: req.body.email }, (err, result) => {
      if (result) {
        res.send({ success: false, message: 'Registration failed. Email is already used.' });
      } else {
        newFollower.save((err, follower) => {
          if (err) throw new Error(`processing error in request`);
          newBlockedPostList.save((err, blockedPost) => {
            if (err) throw new Error(`processing error in request`);
            newMarkedPostList.save((err, markedPost) => {
              if (err) throw new Error(`processing error in request`);
              newPublishedPostList.save((err, publishedPostList) => {
                if (err) throw new Error(`processing error in request`);
                newAutoSaveContent.save((err, autoSaveContent) => {
                  if (err) throw new Error(`processing error in request`);
                  newFollowingUser.save((err, followingUser) => {
                    if (err) throw new Error(`processing error in request`);
                    user.follower = follower._id;
                    user.blockedPostList = blockedPost._id;
                    user.markedPost = markedPost._id;
                    user.publishedPostList = publishedPostList._id;
                    user.autoSaveContent = autoSaveContent._id;
                    user.followingUser = followingUser._id;

                    user.save((err) => {
                      if (err) throw new Error(`processing error in request`);

                      const token = jwt.sign({ token_payload }, app.get('superSecret'), {
                        expiresIn: '1m'
                      });

                      const refresh_token = jwt.sign({ token_payload }, app.get('superSecret'), {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                      });

                      res.status(200).send({
                        success: true,
                        token_payload,
                        userIcon: user.icon,
                        token: 'Bearer ' + token,
                        refresh_token
                      });
                    })
                  });
                });
              });
            });
          });
        });
      };
    })
  } catch (error) {
    res.status(500).send(error)
  };
});

apiRoutes.post('/refreshToken', (req, res) => {
  const token = req.cookies["refresh_token"];
  let JwtToken;

  if (token) {
    jwt.verify(token, app.get('superSecret'), () => {
      JwtToken = jwt.sign(jwt_decode(token), app.get('superSecret'), {});
    })

    res.send({ JwtToken: 'Bearer ' + JwtToken })
  } else {
    res.send({ success: 'false' });
  };
});

// 確認認證是否成功
apiRoutes.get('/authenticate', passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = req.headers['authorization'];

  if (token) {
    res.send({ token, success: 'success' })
  } else {
    res.send({ success: 'fail' })
  };
});

apiRoutes.post('/confirmPassword', (req, res) => {
  const confirm_password = req.body.password;

  User.findById(req.body.id, function (err, user) {
    bcrypt.compare(confirm_password, user.password)
      .then(result => {
        if (result == true) res.send({ success: 'true' })
        else res.send({ success: 'false', message: 'Please enter correct password' })
      })
  });
});

apiRoutes.post('/modifyInfo', (req, res) => {
  const username = req.body.username;
  const new_password = req.body.password;
  const email = req.body.email;
  const iconSrc = req.body.iconSrc;
  const description =  req.body.description;

  req.body.modifiedEmail && User.findOne({ email: email }, (err, result) => {
    if (result) {
      res.send({ success: 'failed', message: 'email is already used' })
    }
  });

  if (new_password == '') {
    User.findByIdAndUpdate(req.body.id, { email: email, username: username, icon: iconSrc, description: description }, function (err, user) {
      if (err) res.send({ success: 'failed' })
      else {
        user.email = email;
        user.username = username;
        user.icon = iconSrc;
        user.description = description;

        user.save((err) => {
          if (err) res.send('sth happen')
        });

        const res_user = {
          username: username,
          email: email,
          icon: iconSrc,
          id: user._id,
          description: description,
        }
        res.send({ success: 'true', user: res_user })
      }
    })
  } else {
    User.findById(req.body.id, function (err, user) {
      if (err) res.send({ success: 'failed' })
      else {
        bcrypt.hash(new_password, 10, function (err, hash) {
          if (err) res.send({ success: 'false', message: 'please enter same password' })

          user.username = username;
          user.password = hash;
          user.email = email;
          user.icon = iconSrc;
          user.description = description;
          user.save();

          const res_user = {
            username: user.username,
            email: user.email,
            icon: user.icon,
            isAdmin: user.admin,
            id: user._id,
            description: user.description,
          }

          res.send({ success: 'true', user: res_user })
        })
      }
    })
  };
});

apiRoutes.get('/surfaceUI/Blog/:id', (req, res) => {
  try {
    PublishedPost.findById(req.params.id, (err, blog) => {
      if (err) throw new Error(`processing error in request`);
      else res.status(200).send({ blog });
    })
  } catch (error) {
    res.status(500).send(error)
  }
});

apiRoutes.get('/surfaceUI/:userId/LandingPage/:limit', (req, res) => {
  const limit = parseInt(req.params.limit);

  try {
    PublishedPost.find({})
      .limit(limit * 10)
      .populate('feature')
      .populate('author')
      .exec((err, post) => {
        const sortFun = (post1, post2) => {
          const createAt1 = post1.createAt.getTime();
          const createAt2 = post2.createAt.getTime();

          return -(createAt1 - createAt2)
        };

        post.sort(sortFun);

        const newPostArray = post.slice((limit - 1) * 10, 10);

        if (err) throw new Error(`processing error in request`);
        else {
          res.status(200).send({ post: newPostArray })
        }
      })
  } catch (error) {
    res.status(500).send(error)
  }
});

apiRoutes.post(`/surfaceUI/:userId/PostComment/:postId/`, (req, res) => {
  const newCommentPost = new PostComment({
    comment: req.body.commentContent,
    commenter: new mongoose.Types.ObjectId(),
    _id: new mongoose.Types.ObjectId(),
  });

  try {
    User.findById(req.params.userId, (err, user) => {
      if (err) throw new Error(`processing error in request`);
      newCommentPost.commenter = user._id;
      newCommentPost.save((err, comment) => {
        if (err) throw new Error(`processing error in request`);
        PublishedPost.findById(req.params.postId, (err, post) => {
          if (err) throw new Error(`processing error in request`);
          PostCommentList.findById(post.commentList, (err, commentList) => {
            if (err) throw new Error(`processing error in request`);
            commentList.commentList.push(comment._id);
            commentList.save((err) => {
              if (err) throw new Error(`processing error in request`);
              else res.status(200).send({ commentList })
            })
          })
        })
      })
    })
  } catch (error) {
    res.status(500).send(error)
  }
});

apiRoutes.get(`/surfaceUI/PostComment/:postId/`, (req, res) => {
  try {
    PublishedPost.findById(req.params.postId, (err, post) => {
      PostCommentList.findById(post.commentList, (err, commentList) => {
        if (err) throw new Error(`processing error in request`);
        else res.status(200).send({ commentList: commentList.commentList })
      })
    })
  } catch (error) {
    res.status(500).send('sth happen')
  }
});

apiRoutes.get(`/surfaceUI/PostComment/:postId/:commentId/`, (req, res) => {
  try {
    PostComment.findById(req.params.commentId)
      .populate('commenter')
      .exec((err, comment) => {
        if (err) throw new Error(`processing error in request`);
        else res.status(200).send({ comment: comment })
      });
  } catch (error) {
    res.status(500).send(error)
  }
});

apiRoutes.get(`/surfaceUI/AuthorPost/:userId/:limit`, (req, res) => {
  const limit = parseInt(req.params.limit);

  try {
    User.findById(req.params.userId, (err, user) => {
      PublishedPostList.findById(user.publishedPostList)
        .populate('postList')
        .exec((err, post) => {
          if (err) throw new Error(`processing error in request`);
          else {
            const postList = [...post.postList];
            const returnPostList = postList.slice((limit - 1) * 10, 10)

            if (err) throw new Error(`processing error in request`);
            else {
              res.status(200).send({ post: returnPostList })
            };
          };
        });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

apiRoutes.get(`/surfaceUI/User/:userId`, (req, res) => {
  try {
    User.findById(req.params.userId, (err, user) => {
      if (err) throw new Error(`processing error in request`);
      else res.status(200).send({ user })
    })
  } catch (error) {
    res.status(500).send(error)
  }
});

apiRoutes.get(`/surfaceUI/Feature/:featureId`, (req, res) => {
  try {
    PublishedFeatures.findById(req.params.featureId, (err, features) => {
      if (err) throw new Error(`processing error in request`)
      else res.send({ features })
    })
  } catch (error) {
    res.status(500).send(error)
  }
});

apiRoutes.post('/writeFile/:userId', (req, res) => {
  const content = req.body.content;
  const publisherId = req.params.userId;

  const newVideo = new Video({
    _id: new mongoose.Types.ObjectId(),
    publisher: publisherId,
    video: new mongoose.Types.ObjectId(),
  });

  // 创建一个可写流
  var writerStream = fs.createWriteStream('video.txt');

  // 管道读写操作
  // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
  writerStream.write(content);

  writerStream.on('finish', function () {
    let db = mongoose.connection;
    let bucket = new mongoose.mongo.GridFSBucket(db);

    newVideo.save((err, savedVideo) => {
      const openUploadStream = bucket.openUploadStreamWithId(savedVideo.video, 'video.txt');

      fs.createReadStream('video.txt')
        .pipe(openUploadStream)
    })
  });

  writerStream.end();
  res.send({ saved: 'true' })
});

apiRoutes.get('/video/:videoId', (req, res) => {
  let db = mongoose.connection;
  const gridfsBucket = new mongoose.mongo.GridFSBucket(db.db);

  const readStream = gridfsBucket.openDownloadStream(mongoose.Types.ObjectId(req.params.videoId));
  readStream.pipe(res);
})

apiRoutes.get('/ReelsVideos/:limit', (req, res) => {
  const limit = parseInt(req.params.limit);

  try {
    Video.find({}).limit(10 * limit)
      .exec((err, videos) => {
        if (err) throw new Error(`processing error in request`)
        const videosList = videos.slice((limit - 1) * 10, 10);

        res.send({ videosList })
      });
  } catch (error) {
    res.send('sth happen')
  }
});

apiRoutes.post(`/surfaceUI/:userId/BlockPost/:postId`, (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;

  try {
    User.findById(userId, (err, user) => {
      BlockedPostList.findById(user.blockedPostList, (err, blockedPostList) => {
        blockedPostList.blockedPostList.push(postId);
        blockedPostList.save((err) => {
          if (err) throw new Error(`processing error in request`)
          else res.status(200).send({ success: 'blocked Post' })
        })
      })
    })
  } catch (error) {
    res.status(500).send(error)
  }
});

apiRoutes.get(`/surfaceUI/:userId/BlockPost/`, (req, res) => {
  const userId = req.params.userId;

  try {
    User.findById(userId, (err, user) => {
      BlockedPostList.findById(user.blockedPostList, (err, blockedPostList) => {
        if (err) throw new Error(`processing error in request`)
        else res.status(200).send({ blockedPostList: blockedPostList.blockedPostList })
      })
    })
  } catch (error) {
    res.status(500).send(error);
  }
});

apiRoutes.get(`/surfaceUI/SortUser/`, (req, res) => {
  try {
    User.find({})
      .populate('follower')
      .exec((err, user) => {
        if (err) throw new Error(`processing error in request`);
        const sort_fun = (user1, user2) => {
          const followerNo1 = user1.follower?.followerList?.length || 0;
          const followerNo2 = user2.follower?.followerList?.length || 0;
          return -(followerNo1 - followerNo2)
        };

        user.sort(sort_fun);
        const return_user = user.slice(0, 10);
        res.status(200).send({ user: return_user });
      })
  } catch (error) {
    res.status(500).send(error)
  }
});

apiRoutes.get(`/surfaceUI/SortPost/`, (req, res) => {
  try {
    PublishedPost.find({})
      .populate('feature')
      .exec((err, post) => {
        if (err) throw new Error(`processing error in request`);
        const sort_fun = (post1, post2) => {
          const bookmark1 = post1.bookmarked || 0;
          const bookmark2 = post2.bookmarked || 0;
          return -(bookmark1 - bookmark2)
        };

        post.sort(sort_fun);
        const return_posts = post.slice(0, 10);
        res.status(200).send({ post: return_posts });
      })
  } catch (error) {
    res.status(500).send(error);
  }
});

export default apiRoutes;
