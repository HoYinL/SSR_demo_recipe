import Express from 'express';
// 引入 User、Recipe Model 方便進行資料庫操作
import User from '../../../common/models/users';
import AutoSaveData from '../../../common/models/autosavedata';
import AutoSaveBlog from '../../../common/models/autosaveblog';
import SavedPost from '../../../common/models/savedposts';

// API Route
const app = new Express();
const apiRoutes = Express.Router();

apiRoutes.get(`/GetSavedFeatures/:postId`, (req, res) => {
    const postId = req.params.postId;

    try {
        AutoSaveBlog.findById(postId)
            .populate('feature')
            .exec(function (err, feature) {
                if (err) throw new Error(`processing error in request`);
                else res.status(200).send({ feature })
            })
    } catch (error) {
        res.status(500).send(error)
    }
});

apiRoutes.delete('/:userId/:postId/', (req, res) => {
    // delete 1. post 2. feature data 3. post list 
    const postId = req.params.postId;
    const userId = req.params.userId;

    try {
        User.findById(userId, (err, user) => {
            if (err) throw new Error(`processing error in request`);
            else SavedPost.findById(user.autoSaveContent, (err, savePost) => {
                if (err) throw new Error(`processing error in request`);
                let filteredList = savePost.postList.filter(id => id != postId)
                savePost.postList = filteredList;
                savePost.save((err) => {
                    if (err) throw new Error(`processing error in request`);
                    else AutoSaveBlog.findByIdAndDelete(postId, (err, post) => {
                        if (err) throw new Error(`processing error in request`);
                        else AutoSaveData.findByIdAndDelete(post.feature, (err, post) => {
                            if (err) throw new Error(`processing error in request`);
                            res.status(200).send({ success: 'saved editing post is deleted successfully!' })
                        })
                    })
                })
            })
        })
    } catch (error) {
        res.status(500).send(error)
    }
});

apiRoutes.get('/GetSavedPosts/:userId/:limit/', (req, res) => {
    const limit = parseInt(req.params.limit);
    const userId = req.params.userId;

    try {
        User.findById(userId, (err, user) => {
            if (err) throw new Error(`processing error in request`);
            SavedPost.findById(user.autoSaveContent, (err, savedPost) => {
                if (err) throw new Error(`processing error in request`);
                const clonePosts = [...savedPost.postList];
                const returnPostList = clonePosts.slice((limit - 1) * 10, 10);
                savedPost.firstCreate = undefined;
                savedPost.save((err) => {
                    if (err) throw new Error(`processing error in request`);
                    else res.status(200).send({ posts: returnPostList });
                })
            });
        });
    } catch (error) {
        res.status(500).send(error);
    };
});

export default apiRoutes