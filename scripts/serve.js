const express = require('express');

(function() {
    let app = express();
    app.use(express.static('./docs'));
    app.listen(8080);
}())
