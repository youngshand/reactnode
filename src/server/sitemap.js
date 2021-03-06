// @flow
import each from 'lodash/each';
import builder from 'xmlbuilder';

class SitemapGenerator {

  postRoutes:?Object[];
  routes:?Object[];
  url:?string;

  constructor(){
    this.url = null;
    this.routes = null;
  }

  async init(req:Object, res:Object){
    const pages = null;
    const posts = null;

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

  getRoutes(object:?Object){
    let routeObject = [];
    each(object, (element) => {
      routeObject.push(element.slug);
    })

    return routeObject;
  }

  constructXML() {
    let xml = builder.create('urlset').att('xmlns', 'http://www.google.com/schemas/sitemap/0.90');
    each(this.routes, (route) => {
      try{
        xml.ele('url')
          .ele('loc', this.url + route).up()
          .ele('changefreq', 'weekly').up()
          .ele('priority', 0.5)
      }catch(e){
        console.log(e);
      }
    });

    return xml.end({ pretty: true});
  }
}
export default SitemapGenerator;
