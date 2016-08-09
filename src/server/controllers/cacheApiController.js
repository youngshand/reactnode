import { settingsCache, pageCache, postCache } from '../cache';

class CacheApiController {

  static async settings(req, res) {
    const settingsList = await settingsCache.get();
    res.status(200).json(settingsList);
  }

  static async pages(req, res) {
    const pageList = await pageCache.get();
    res.status(200).json(pageList);
  }

  static async pageDetail(req, res) {
    const page = await pageCache.find('slug', req.params.slug);
    res.status(200).json(page);
  }

  static async posts(req, res) {
    const postList = await postCache.get();
    res.status(200).json(postList);
  }

  static async postDetail(req, res) {
    const post = await postCache.find('slug', req.params.slug);
    res.status(200).json(post);
  }

}

export default CacheApiController;
