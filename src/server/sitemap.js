import { pageCache, postCache } from './cache';
import _ from 'lodash';
// import builder from 'xmlbuilder';

class SitemapGenerator {
  constructor(){
    this.url = null;
    this.routes = null;
  }

  async init(req, res){
    const pages = await pageCache.get();
    const posts = await postCache.get();

    this.url = `${req.protocol}://${req.get('host')}/`;

    this.routes = this.getRoutes(pages);
    this.postRoutes = this.getRoutes(posts);

    const xmlStr = this.constructXML();

    if(xmlStr){
      res.set('Content-Type', 'text/xml');
      res.status(200).send(xmlStr);
    }else{
      res.status(500);
    }

  }

  getRoutes(object){
    let routeObject = [];
    _.each(object, (element) => {
      routeObject.push(element.slug);
    })

    return routeObject;
  }

  constructXML() {
    // let xml = builder.create('urlset').att('xmlns', 'http://www.google.com/schemas/sitemap/0.90');
    // _.each(this.routes, (route) => {
    //   try{
    //     let r = xml.ele('url')
    //             .ele('loc', this.url + route).up()
    //             .ele('changefreq', 'weekly').up()
    //             .ele('priority', 0.5)
    //   }catch(e){
    //     console.log(e);
    //   }
    // });
    //
    // return xml.end({ pretty: true});
  }
}
export default SitemapGenerator;