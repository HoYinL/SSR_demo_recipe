import Express from 'express';
import PublishedFeatures from '../../../common/models/publishedfeatures';
import PublishedPost from '../../../common/models/publishedpost';

// API Route
const app = new Express();
const apiRoutes = Express.Router();

apiRoutes.get('/surfaceUI/EditPublishedPost/:userId/:postId', (req, res) => {
  const postId = req.params.postId;

    PublishedPost.findById(postId)
      .populate('feature')
      .exec(function (err, post) {
        if (err) res.send('sth happen')
        else res.send({ post })
      })
  });
  
  apiRoutes.post('/surfaceUI/EditPublishedPost/:userId/:postId', (req, res) => {
    const postId = req.params.postId;

    try {
      PublishedPost.findById(postId, (err, publishPost) => {
        const { dishName, description, backgroundImg, tagList } = req.body.featureData;
        if (err) res.send('sth happen')
        else {
          publishPost.content = req.body.blogContent;
          publishPost.save((err) => {
            PublishedFeatures.findById(publishPost.feature, (err, feature) => {
              feature.dish_name = dishName;
              feature.description = description;
              feature.backgroundImg = backgroundImg;
              feature.tagList = tagList;
              feature.save((err) => {
                if (err) res.send({ success: 'something wrong' })
                else res.send({ success: 'updated successfully' });
              })
            })
          })
        }
      })
    } catch (error) {
      res.send('sth happen')
    }
  });
  
  
  apiRoutes.delete('/surfaceUI/EditPublishedPost/:userId/:postId', (req, res) => {
    const postId = req.params.postId;

    PublishedPost.findById(postId, (err, publishPost) => {
      publishPost.content = [];
      publishPost.save((err) => {
        if (err) res.send({ success: 'something wrong' })
        else res.send({ success: 'updated successfully' });
      })
    })
  });

  export default apiRoutes