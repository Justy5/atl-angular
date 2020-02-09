import {App} from './app';
import * as http from 'http';
import * as os from 'os';

let application:App = new App();

http.createServer(application.app).listen(application.port, function() {
    console.log('Add-on server running at http://' + os.hostname() + ':' + application.port);
    // Enables auto registration/de-registration of add-ons into a host in dev mode
    // application.addon.register();
});