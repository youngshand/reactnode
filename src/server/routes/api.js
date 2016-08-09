import express from 'express';
import ApiController from '../controllers/apiController';
import RealApiController from '../controllers/realApiController';
import CacheApiController from '../controllers/cacheApiController';
import ApiUpdaterController from '../controllers/apiUpdaterController';

/* eslint new-cap: 0 */
const router = express.Router();

router.get('/settings/?', ApiController.settings);
router.get('/pages/?', ApiController.pages);
router.get('/pages/:slug/?', ApiController.pageDetail);
router.get('/posts/?', ApiController.posts);
router.get('/posts/:slug/?', ApiController.postDetail);

router.get('/cache/settings/?', CacheApiController.settings);
router.get('/cache/pages/?', CacheApiController.pages);
router.get('/cache/pages/:slug/?', CacheApiController.pageDetail);
router.get('/cache/posts/?', CacheApiController.posts);
router.get('/cache/posts/:slug/?', CacheApiController.postDetail);

/** Update api endpoints */
router.get('/update/?', ApiUpdaterController.update);
// TODO: router.get('/update/{resource}/?', ApiUpdaterController.updateResource);

/** TODO: Real source api endpoints */
router.get('/real/settings/?', RealApiController.settings);
router.get('/real/pages/?', RealApiController.pages);
router.get('/real/posts/?', RealApiController.posts);

export default router;
