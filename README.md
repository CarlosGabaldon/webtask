# Webtasks

## Add Star Issue - automatically add issue to repo for a github user who stars the repo.

 A webtask that can be used as a Github webhook to automatically add a issue to repo for a github user who stars the repo.

### Setup
```
  wt create --name add_star_issue --secret GITHUB_TOKEN=<YOUR_TOKEN> --prod https://raw.githubusercontent.com/CarlosGabaldon/webtask/master/add_star_issue.js
```
