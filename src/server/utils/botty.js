// @flow
import _ from 'lodash';

/**
 * isBot
 *
 * Returns true if the requesting useragent
 */
export default function isBot(userAgent:string) {
  userAgent = userAgent.toLowerCase();

  // posible bot useragents
  let bots = {
      'Facebook':  userAgent.indexOf('Facebot'.toLowerCase()) !== -1 || userAgent.indexOf('facebookExternalhit'.toLowerCase()) !== -1,
      'Twitter':   userAgent.indexOf('Twitter'.toLowerCase()) !== -1,
      'Google':    userAgent.indexOf('Google'.toLowerCase()) !== -1,
      'DnsQueries':    userAgent.indexOf('DnsQueries'.toLowerCase()) !== -1,
      'Bing':      userAgent.indexOf('bingbot'.toLowerCase()) !== -1,
      'Yahoo':     userAgent.indexOf('Yahoo! Slurp'.toLowerCase()) !== -1,
      '80legs':    userAgent.indexOf('008'.toLowerCase()) !== -1,
      'rogerbot':  userAgent.indexOf('rogerbot'.toLowerCase()) !== -1,
      'Moz':       userAgent.indexOf('rogerbot'.toLowerCase()) !== -1,
      'W3 Validator': (
        userAgent.indexOf('W3C_Validator'.toLowerCase()) !== -1 ||
        userAgent.indexOf('Validator.nu/LV'.toLowerCase()) !== -1 ||
        userAgent.indexOf('W3C-checklink'.toLowerCase()) !== -1 ||
        userAgent.indexOf('W3C-mobileOK/DDC-1.0'.toLowerCase()) !== -1 ||
        userAgent.indexOf('W3C_I18n-Checker/1.0'.toLowerCase()) !== -1 ||
        userAgent.indexOf('FeedValidator/1.3'.toLowerCase()) !== -1 ||
        userAgent.indexOf('Jigsaw/2.3.0 W3C_CSS_Validator_JFouffa/2.0'.toLowerCase()) !== -1 ||
        userAgent.indexOf('W3C_Unicorn/1.0'.toLowerCase()) !== -1
      )
  };

  return _.includes(_.values(bots), true);
}
