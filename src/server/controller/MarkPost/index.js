import Express from 'express';
// 引入 User、Recipe Model 方便進行資料庫操作
import User from '../../../common/models/users';
import PublishedPost from '../../../common/models/publishedpost';
import MarkedPostList from '../../../common/models/markedpostlist';

// API Route
const apiRoutes = Express.Router();

apiRoutes.post('/PostMarkedPost/:userId/:postId', (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;

    try {
        User.findById(userId, (err, user) => {
            PublishedPost.findById(postId, (err, post) => {
                post.bookmarked = post.bookmarked == undefined? 1: ++post.bookmarked;
                post.save((err) => {
                    if (err) throw new Error(`processing error in request`);
                    else {
                        MarkedPostList.findById(user.markedPost, (err, markedPostList) => {
                            markedPostList.markedPostList.unshift(post._id);
                            markedPostList.save((err) => {
                                if (err) throw new Error(`processing error in request`);
                                else res.status(200).send({ status: 'new post is marked' });
                            });
                        });
                    };
                });
            });
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

apiRoutes.delete('/DeleteMarkedPost/:userId/DeleteBookMark/:postId', (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;

    try {
        User.findById(userId, (err, user) => {
            PublishedPost.findById(postId, (err, post) => {
                post.bookmarked -= 1;
                post.save((err) => {
                    if (err) throw new Error(`processing error in request`);
                    else {
                        MarkedPostList.findById(user.markedPost, (err, markedPostList) => {
                            const postList = [...markedPostList.markedPostList];
                            postList.splice(postList.indexOf(postId), 1);

                            markedPostList.markedPostList = postList;
                            markedPostList.save((err) => {
                                if (err) throw new Error(`processing error in request`);
                                else res.status(200).send({ status: 'post is unmarked' })
                            });
                        });
                    };
                });
            });
        });
    } catch (error) {
        res.status(500).send(error);
    };
});

apiRoutes.get('/GetMarkedPostId/:userId/', (req, res) => {
    const userId = req.params.userId;

    try {
        User.findById(userId, (err, user) => {
            MarkedPostList.findById(user.markedPost, (err, markedPostList) => {
                if (err) throw new Error(`processing error in request`);
                else res.status(200).send({ postList: markedPostList.markedPostList });
            })
        })
    } catch (error) {
        res.status(500).send(error);
    };
});

apiRoutes.get('/GetMarkedPost/:userId/:limit', (req, res) => {
    const limit = parseInt(req.params.limit);
    const userId = req.params.userId;

    try {
        User.findById(userId, (err, user) => {
            MarkedPostList.findById(user.markedPost)
                .populate('markedPostList')
                .exec((err, markedPostList) => {
                    const clonePostList = [...markedPostList.markedPostList];
                    const returnPostList = clonePostList.slice((limit - 1) * 10, 10);

                    if (err) throw new Error(`processing error in request`);
                    else res.status(200).send({ postList: returnPostList })
                });
        });
    } catch (error) {
        res.status(500).send(error);
    };
});

export default apiRoutes