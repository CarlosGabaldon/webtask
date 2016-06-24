var Bluebird = require('bluebird');
var Request = Bluebird.promisifyAll(require('request'));
var _ = require('lodash');

var API_URL = 'https://api.github.com';
var WEB_URL = 'https://github.com';
var REF = 'refs/heads/master';

/**
 * Automatically add collaborators who star the repo
 *
 * A webtask that can be used as a Github webhook to automatically add
 * collaborators who star the repo.
 *
 * wt create --name add_collaborator --secret GITHUB_TOKEN=<YOUR_TOKEN> --prod https://raw.githubusercontent.com/CarlosGabaldon/webtask/master/add_collaborator.js`
 */
module.exports = function (ctx, cb) {
    var msg;
    var err;

    if (!ctx.body) {
        err = new Error('This webtask must be created with the `--parse` flag (`pb` claim)');
        return cb(err);
    }

    if (!ctx.body.repository) {
        err = new Error('Unexpected payload: Missing repository information.');
        return cb(err);
    }
    var payload = ctx.body;

    var headers = {
        'Authorization': 'Bearer ' + ctx.data.GITHUB_TOKEN,
        'User-Agent': 'Webtask Tagger',
    };

    console.log(payload.sender.login);

    //addCollaborator(payload.sender.login);


    function addCollaborator(userName) {
        var url = API_URL + '/repos/' + payload.repository.full_name + '/collaborators/refs/' + userName;
        console.log(url);

        var options = {
            url: url,
            headers: headers,
        };
        var promise = Request.postAsync(options);

        return promise
            .get(1)
            .then(function (collaborators) {
                return 'Successfully added collaborator `' + userName + '`.';
            });
    }
};
