# Webtasks

## Add Star Issue

 A webtask that can be used as a Github webhook to automatically add a issue to repo for a github user who stars the repo.

### Installation instructions:
```
  1. Install the webtask cli: `npm install -g wt-cli`
  2. Create a webtask profile: `wt init`
  3. Create a Github API token with `repo` access from: https://github.com/settings/tokens/new
  4. Generate the webhook url, substituting <YOUR_TOKEN> with the one from step #3:
    wt create --name add_star_issue --secret GITHUB_TOKEN=<YOUR_TOKEN> --prod https://raw.githubusercontent.com/CarlosGabaldon/webtask/master/add_star_issue.js
  5. Install the webhook with the default settings on your repo by subsituting <USERNAME> and <REPO>, at: https://github.com/<USERNAME>/<REPO>/settings/hooks/new
  6. Optionally inspect any errors using the cli: `wt logs`

```

## Demo

 1. Visit: https://github.com/CarlosGabaldon/reggie/issues
 2. Click on the "Star" button on the top right of the Github page.
 3. Refresh the page and notices that a new issue with you Github username has been added to the list.
