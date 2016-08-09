import _ from 'lodash';
import superagent from 'superagent';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import request from 'request';
import SparkPost from 'sparkpost';
import query from '../../shared/utils/query';
import debugCache from '../debug';
import { settingsCache, pageCache } from '../cache';

import { CACHE_API, REAL_API_HOST, REAL_API_PATHNAME_PREFIX } from '../config';

/**
 * Api controller
 * Many of the api controllers methods pipe requests from the cache controller.
 * The purpose of splitting the two is so alterations can be made and debugged
 * seperately from the cache controller.
 */
class ApiController {

  /**
   * Settings are retrieved from cache with no mods
   */
  static settings(req, res) {
    const url = `${CACHE_API}/settings`;
    request(url).pipe(res);
  }

  /**
   * Pages are retrieved from cache with no mods
   */
  static pages(req, res) {
    const url = `${CACHE_API}/pages`;
    request(url).pipe(res);
  }

  /**
   * Page details are retrieved from cache with no mods
   */
  static pageDetail(req, res) {
    const url = `${CACHE_API}/pages/${req.params.slug}`;
    request(url).pipe(res);
  }

  /**
   * Posts are retrieved from cache with no mods
   */
  static posts(req, res) {
    const url = `${CACHE_API}/posts`;
    request(url).pipe(res);
  }

  /**
   * Post details are retrieved from cache with no mods
   */
  static postDetail(req, res) {
    const url = `${CACHE_API}/posts/${req.params.slug}`;
    request(url).pipe(res);
  }

  /**
   * TODO: Handles contact requests
   */
  static async contact(req, res) {
    console.log('apiCon', req)
    let pathname = req.body.pathname;
    const settings = await settingsCache.get();
    // const pages = await pageCache.get();
    const sp = new SparkPost('spark_post_key');

    if (_.endsWith(pathname, '/')) pathname = pathname.slice(0, pathname.length - 1);

    // the client can have multiple contact pages with different subjects and emails
    // this is just a saftey check to ensure we are getting the configurations from
    // the page the user is accessing.
    // const contactPage = _.find(pages, p => p.path === pathname);
    // const subject = _(_.result(contactPage, 'contentModules'))
    //                   .filter(m => m.type === 'contactForm')
    //                   .map(m => m.subjectOptions)
    //                   .flatten()
    //                   .find(e => e.option === req.body.subject)
    // const subjectEmail = _.result(subject, 'email');

    const subjectEmail = _.result(req.body, 'subjectBasedTarget');

    if (subjectEmail) {
      // send sparkport email
      sp.transmissions.send({
        transmissionBody: {
          content: {
            from: 'no-reply@witherhills.beingbui.lt',
            subject: `${settings.site.title} ${req.body.subject.toLowerCase()} contact request`,
            html: ReactDOMServer.renderToString(
              <html>
                <body>
                  <p>You've been contacted via witherhills.beingbui.lt</p>
                  <p><strong>First name:</strong> {req.body.firstName}</p>
                  <p><strong>Last name:</strong> {req.body.lastName}</p>
                  <p><strong>Email:</strong> {req.body.email}</p>
                  <p><strong>Subject:</strong> {req.body.subject}</p>
                  <p><strong>Message:</strong><br /> {req.body.message}</p>
                </body>
              </html>
            )
          },
          recipients: [
            { address: subjectEmail }
          ]
        }
      }, (err2) => {

        if (err2) {
          debugCache.save('Error sending sparkpost contact email', JSON.stringify(err2));
          res.sendStatus(400);
        } else {
          res.sendStatus(200);
        }
      });
    } else {
      debugCache.save('Error retrieving contact email via subject', JSON.stringify(req.body));
      res.sendStatus(400);
    }
  }

  static signups(req, res) {
    superagent.post(`${REAL_API_HOST}${REAL_API_PATHNAME_PREFIX}signup-test`)
      .type('form')
      .send({
        name: req.body.name,
        email: req.body.email,
        agreeTcs: req.body.terms,
        sendOffers: req.body.offers,
        region: req.body.region
      }).end((err2, res2) => {
        if (err2) {
          debugCache.save('Error trying to send signup information', JSON.stringify(err2));
          res.sendStatus(400);
        } else {
          res.send(res2.body);
        }
      });
  }

  static update(req, res) {
    res.sendStatus(200);
  }

  /**
   * Returns query sets from the cache
   */
  static async search(req, res) {
    const dataList = [].concat(
      _.filter(await pageCache.get(), (page) => page.template !== '404'),
      // await articleCache.get(),
      // await productCache.get(),
      // await distributorCache.get(),
    );
    let result;
    if (req.query.q) {
      result = query(dataList, req.query.q);
    } else {
      result = [];
    }
    res.json(result);
  }

}

export default ApiController;
