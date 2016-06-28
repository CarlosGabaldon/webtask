var Bluebird = require('bluebird');
var Request = Bluebird.promisifyAll(require('request'));
var _ = require('lodash');
var API_URL = 'https://api.github.com';

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
        'User-Agent': 'Webtask star collaborator',
    };

    addStarIssue(payload.sender.login);


    function addStarIssue(userName) {
        var url = API_URL + '/repos/' + payload.repository.full_name + '/issues'

        var options = {
            url: url,
            headers: headers,
            json: true,
            body: {
                title: userName + ' starred the repo, reach out to see if they would like to contribute.',
            },
        };

        var promise = Request.postAsync(options);

        return promise
            .get(1)
            .then(function (collaborators) {
                return 'Successfully added issue for user  `' + userName + '`.';
            });
    }
};
