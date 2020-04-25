---
title: Github API First glance
date: 2020-02-07
---

First steps with Github API, looking at the official docs, executing some APIs and discovering what I can do with that.

<!--truncate-->

![Post pic](../images/github.png)

## Motivation

Currently, the company I am working with uses Github as git repository/platform. Code reviews, documentation, merges and other stuff going through there. It's going great.

I am curious about what else we can do using Github API, what pieces of the whole development process we can automate. So, this article is about Github API, what I know, what I learned, what I find useful.

I may use the outcome of this (quick) research not only for this company, but anything else that may help other problems/opportunities that, right now, I can't even imagine.

## Steps

This is the list of things this article/research will cover:

- Step #1: Take a look at their docs (overview)
- Step #2: Understand their authentication processes
- Step #3: Endpoints

## Basics

Docs! Lets see how they explain their API in their documentation and see how easy (or complex) is to understand what we can achieve with it.

Link: https://developer.github.com/v3/guides/getting-started/

This guide has very clear examples of how to call the API, like this one that doesn't require any auth information and reads all public data from any github user using cURL:

```bash
$ curl https://api.github.com/users/ckinan
{
  "login": "ckinan",
  "id": 7999613,
  "node_id": "MDQ6VXNlcjc5OTk2MTM=",
  "avatar_url": "https://avatars1.githubusercontent.com/u/7999613?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/ckinan",
  "html_url": "https://github.com/ckinan",
  "followers_url": "https://api.github.com/users/ckinan/followers",
  "following_url": "https://api.github.com/users/ckinan/following{/other_user}",
  "gists_url": "https://api.github.com/users/ckinan/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/ckinan/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/ckinan/subscriptions",
  "organizations_url": "https://api.github.com/users/ckinan/orgs",
  "repos_url": "https://api.github.com/users/ckinan/repos",
  "events_url": "https://api.github.com/users/ckinan/events{/privacy}",
  "received_events_url": "https://api.github.com/users/ckinan/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Cesar Kina",
  "company": null,
  "blog": "https://ckinan.com/",
  "location": "Lima, Peru",
  "email": null,
  "hireable": null,
  "bio": "software developer",
  "public_repos": 22,
  "public_gists": 1,
  "followers": 3,
  "following": 7,
  "created_at": "2014-06-26T20:18:31Z",
  "updated_at": "2020-02-08T00:08:38Z"
}
```

However, like any other API, it has a limited number of requests that any client can make to the API without being authenticated. Quoting:

> Unauthenticated clients can make 60 requests per hour. To get more requests per hour, we'll need to authenticate. In fact, doing anything interesting with the GitHub API requires authentication.

## Authentication types

Basically, 2 options:

**Option #1**: Using personal access tokens: https://developer.github.com/v3/guides/getting-started/#using-personal-access-tokens

> The easiest and best way to authenticate with the GitHub API is by using Basic Authentication via OAuth tokens. OAuth tokens include personal access tokens.

Examples:

```bash
curl -i -u <your_username>:<your_access_token> https://api.github.com/user/repos
```

Provide privileges to your token to read your repos.

**Option #2**: Using OAuth tokens for apps : https://developer.github.com/v3/guides/getting-started/#using-oauth-tokens-for-apps

> Apps that need to read or write private information using the API on behalf of another user should use OAuth.

## Endpoints

All the endpoints of the API in their documentation have examples of the calls, details of the input parameters and show how the return payload should look like, which is pretty good.

Ref (overview of the API): https://developer.github.com/v3/

Docs give the endpoints paths like this (not the full url).

Example of user repos: `GET /user/repos`

These are just 3 of the endpoints I tried out using a personal access token I've created:

- Get repos
- Get pull request
- List reviews of a pull request

Here more details about each of them:

### Get repos

Endpoint: `GET /user/repos`
Ref: https://developer.github.com/v3/repos/#list-your-repositories

Example:

```bash
$ curl -i -u <your_username>:<your_access_token> https://api.github.com/user/repos
```

### Get pull requests

Endpoint: `GET /repos/:owner/:repo/pulls`
Ref: https://developer.github.com/v3/pulls/#list-pull-requests

```bash
$ curl -i -u <your_username>:<your_access_token> https://api.github.com/repos/ckinan/ckinan.com/pulls?state=all
```

> Parameters are also available, like `state` in the example above to list "Either open, closed, or all to filter by state. Default: open"

### List reviews of a pull request

Endpoint: `GET /repos/:owner/:repo/pulls/:pull_number/reviews`
Ref: https://developer.github.com/v3/pulls/reviews/#list-reviews-on-a-pull-request

```bash
$ curl -i -u <your_username>:<your_access_token> https://api.github.com/repos/ckinan/ckinan.com/pulls/9/reviews
```

This is interesting, because you can see who submitted the review, whether this review refers to a comment only, request changes or approval.

## Final thoughts

Github has a great documentation, at least for a person who is obviously just trying to get used to the API (like me).

For sure, using personal access token is easier to get used to the API. You just need to create one by going to your Settings and include your token in your calls. But, depending on the use case, it may be annoying to ask all users to create another token to make the application working, in that case, OAuth tokens for apps seems to be a better option, so that application can get authorization on behalf of the user who is logging in without explicitly creating a personal access token.

I will have another space to continue this investigation, where I'd like to see more about OAuth tokens for apps, and play with the endpoint to read pull requests.
