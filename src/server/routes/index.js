import express from 'express';
import indexController from '../controllers/indexController';
import SitemapGenerator from '../sitemap';

const router = express.Router();

/**
 * A link handler for the sitemap.xml.
 * This loops through api endpoints (pages & products) to build a sitemap
 */
const siteMapGenerator = new SitemapGenerator();
router.get('/sitemap.xml', (req, res) => {
  siteMapGenerator.init(req, res);
});

/* GET home page. */
router.get('/*', indexController);

router.get('/404', () => {
  throw new Error('404');
});

export default router;
