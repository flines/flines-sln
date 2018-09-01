const path = require('path');
const BootWeb = require('boot-web');

// const EjsTest = require('./EjsTest');
// const RegRouteTest = require('./RegRouteTest');

let web = new BootWeb.Boot();

web.setTemplate('ejs');
web.setTemplateRoot(path.join(__dirname, 'public/'));

// web.use(new BootWeb.BaseAuth());
web.use(new BootWeb.QueryString());
web.use(new BootWeb.Cookie());
web.use(new BootWeb.Session());
web.use(new BootWeb.Static());
web.use(new BootWeb.BodyParser());

//app.use('/users/:name', new RouteTest());
// web.use('/photo/:up', new RegRouteTest());
// web.get('/test/', new EjsTest());

web.listen(3333);
