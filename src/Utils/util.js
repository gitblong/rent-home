/**
 * Created by chenqilong on 2018/9/17.
 */

import RouterConfig from '../config/RouteConfig';

exports.parseLocation = (location)=> {
    console.log(location)
    let path = location.pathname;
    let pathName = path.split('/');
    console.log(path.split('/'))
    return pathName;
}

