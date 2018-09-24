/**
 * Created by chenqilong on 2018/9/17.
 */

import RouterConfig from '../config/RouteConfig';

exports.parseLocation = (location)=> {
    let path = location.pathname;
    let pathName = path.split('/');
    return pathName;
}

