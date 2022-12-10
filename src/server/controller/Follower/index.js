import Express from 'express';
// 引入 User、Recipe Model 方便進行資料庫操作
import User from '../../../common/models/users';
import FollowingUserList from '../../../common/models/followinguserlist';
import FollowerList from '../../../common/models/followerlist';

// API Route
const app = new Express();
const apiRoutes = Express.Router();

apiRoutes.get('/:userId/FollowUser/:followUserId', (req, res) => {
    const userId = req.params.userId;

    try {
        User.findById(userId, (err, user) => {
            FollowingUserList.findById(user.followingUser, (err, followingUserList) => {
                if (err) throw new Error(`processing error in request`);
                else res.status(200).send(followingUserList);
            })
        });
    } catch (error) {
        res.status(500).send(error);
    }
})

apiRoutes.post('/:userId/FollowUser/:followUserId', (req, res) => {
    const userId = req.params.userId;
    const followUserId = req.params.followUserId;

    try {
        User.findById(userId, (err, user) => {
            FollowingUserList.findById(user.followingUser, (err, followingUserList) => {
                followingUserList.followingUserList.push(followUserId);
                followingUserList.save((err) => {
                    if (err) throw new Error(`processing error in request`);
                    else res.status(200).send({ success: 'Follow user successfully' })
                })
            })
        })
    } catch (error) {
        res.status(500).send(error)
    }
});

apiRoutes.post('/:userId/Follower/:followerId', (req, res) => {
    const userId = req.params.userId;
    const followerId = req.params.followerId;

    try {
        User.findById(followerId, (err, follower) => {
            FollowerList.findById(follower.follower, (err, follower) => {
                follower.followerList.push(userId);
                follower.save((err) => {
                    if (err) throw new Error(`processing error in request`);
                    else res.status(200).send({ success: 'new Follow is added' });
                })
            })
        })
    } catch (error) {
        res.status(500).send(error)
    }
});

apiRoutes.delete('/:userId/FollowUser/:followUserId', (req, res) => {
    const userId = req.params.userId;
    const followUserId = req.params.followUserId;

    try {
        User.findById(userId, (err, user) => {
            FollowingUserList.findById(user.followingUser, (err, followingUserList) => {
                const newFollowingUserList = [...followingUserList.followingUserList];
                newFollowingUserList.splice(newFollowingUserList.indexOf(followUserId), 1);
                followingUserList.followingUserList = newFollowingUserList;

                followingUserList.save((err) => {
                    if (err) throw new Error(`processing error in request`);
                    else res.status(200).send({ success: 'Follower unfollowed' })
                })
            })
        })
    } catch (error) {
        res.status(500).send(error);
    }
});

apiRoutes.delete('/:userId/Follower/:followerId', (req, res) => {
    const userId = req.params.userId;
    const followerId = req.params.followerId;

    try {
        User.findById(followerId, (err, follower) => {
            FollowerList.findById(follower.follower, (err, followerList) => {
                const newFollowerList = [...followerList.followerList];
                newFollowerList.splice(newFollowerList.indexOf(userId), 1);
                followerList.followerList = newFollowerList;

                followerList.save((err) => {
                    if (err) throw new Error(`processing error in request`);
                    else res.status(200).send({ success: 'A Follower unfollowed' })
                })
            })
        })
    } catch (error) {
        res.status(500).send(error)
    }
});

apiRoutes.get('/:userId/FollowingUser/:limit', (req, res) => {
    const userId = req.params.userId;
    const limit = parseInt(req.params.limit);

    try {
        User.findById(userId, (err, user) => {
            FollowingUserList.findById(user.followingUser, (err, followingUserList) => {
                if (err) throw new Error(`processing error in request`);
                else {
                    const return_followingUserList = [...followingUserList.followingUserList];

                    return_followingUserList.slice((limit - 1) * 10, 10);
                    res.status(200).send({ followingUserList: return_followingUserList });
                };
            })
        });
    } catch (error) {
        res.status(500).send(error)
    };
});

apiRoutes.get('/:userId/GetFollowerNumber/', (req, res) => {
    const userId = req.params.userId;

    try {
        User.findById(userId, (err, user) => {
            FollowerList.findById(user.follower, (err, followerList) => {
                if (err) throw new Error(`processing error in request`);
                else {
                    let returnNumber = followerList.followerList.length;

                    if(returnNumber / 1000 > 1 && returnNumber / 1000000 < 1){
                        returnNumber = `${returnNumber / 1000 + (returnNumber % 1000).toFixed(1)} K followers`;
                    } else if (returnNumber / 1000 > 1 && returnNumber / 1000000 > 1){
                        returnNumber = `${returnNumber / 1000000 + (returnNumber % 1000000).toFixed(1)} M followers`;
                    } else if (returnNumber != 0 && returnNumber != 1){
                        returnNumber = `${returnNumber} followers`
                    } else {
                        returnNumber = `${returnNumber} follower`
                    }

                    res.send({followerNumber: returnNumber});
                }
            })
        });
    } catch (error) {
        res.status(500).send(error)
    };
});

export default apiRoutes