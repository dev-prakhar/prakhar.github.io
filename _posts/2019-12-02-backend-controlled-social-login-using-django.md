---
layout: blogs/post
title: How to get full control of your social logins using Django?
image: /images/blogs/social-logins.jpg
---

## Why do you need this?

While working on a *side-project(shhh!!)*, which had a mobile application as a frontend and django as backend, I wanted to incorporate social logins as well(*who wants to create a new account today?* :astonished:).

Now I wanted a `User` with some extra properties than the existing `User` model that `Django` provides.

I had 2 options to do this:

* Extend the existing `User` Model
* Create a new `User` and had a `one-to-one` mapping with `Django`'s user

I went with the later approach. Reasons for that I'll explain in some other blog post :stuck_out_tongue_winking_eye:

After doing this, I started finding ways to authenticate user using their social media access tokens. While doing that I faced 2 problems:

* Most of the `Django`'s existing libraries for social login, authenticates the `User` model and not a `one-to-one` mapped model(*Obviously!*).
* Every library I could find was actually providing a lot of abstraction layers(which is a good thing) that I didn't want. I wanted full control over my user model.

## What I did?

While I was exploring with [Facebook Devs account](https://developers.facebook.com/), as to how to get user's info using the access token. I stumbled upon [**Facebook's GraphQL API**](https://engineering.fb.com/core-data/graphql-a-data-query-language/).
You simply hit the API with the access token and it fetches the data for you(*That's what APIs do, duh!!*).

{% highlight python %}
response = request.get(url='https://graph.facebook.com/v3.2/me', params={query_params_for_fields_you_want})
{% endhighlight %}

It's that simple. So I thought maybe I could do this for `Google` and all the subsequent social medias as well.

I used python's wonderful package `requests` and started hitting the social media's APIs for user's info. I used the fetched fields as needed for my `User` model and discarded the rest of them.

For achieving this I created:

* a `Class` for every social media that I wanted to authenticate with. Those classes would extend an `Abstract Class` that has method `get_user_info` which is needed to be overridden.

{% highlight python %}
class AbstractSocialMediaAPI:
  class Meta:
      abstract = True

  @classmethod
  def get_user_info(cls, access_token):
      raise NotImplementedError('get_user_info() must be implemented')

class GoogleAPI(AbstractSocialMediaAPI):
  @classmethod
  def get_user_info(cls, access_token):
    """Implementation & Data Transformation"""

class FacebookAPI(AbstractSocialMediaAPI):
  @classmethod
  def get_user_info(cls, access_token):
    """Implementation & Data Transformation"""

class GithubAPI(AbstractSocialMediaAPI):
  @classmethod
  def get_user_info(cls, access_token):
    """Implementation & Data Transformation"""
{% endhighlight %}

* an `APIService` which takes in `access_token` and `auth_source` and delegate the work to the appropriate service based on `auth_source`

{% highlight python %}
class APIService
  SOURCE_TO_SOCIAL_API = {
    'google': GoogleAPI,
    'facebook': FacebookAPI,
    'github': GitHubAPI,
  }

  @classmethod
  def get_user_info(cls, access_token, auth_source):
    api_class = cls.get_api(auth_source)
    if api_class:
        user_info = api_class.get_user_info(access_token)
    return user_info

  @classmethod
  def get_api(cls, auth_source):
    return cls.SOURCE_TO_SOCIAL_API.get(auth_source)
{% endhighlight %}

The code for this was initally embedded as service in my backend application. Later, I realised, why not extract it out in a pip package for all of the world to use?

## What does the package do?

I created a `pip` package, [`social-user-info`](https://pypi.org/project/social-user-info/). All you need is to give the social-media you want to login with, and the access token of the user you want information of.

Currently it supports the following social media:

* Google
* Facebook
* Github

Issues opened for:

* LinkedIn
* Twitter

## How to use this package?

Install the package into your application using `pip`.

{% highlight python %}
from social_user_info.social_user_info import APIService

APIService.get_user_info(access_token={google_access_token}, auth_source='google')
APIService.get_user_info(access_token={google_access_token}, auth_source='facebook')
APIService.get_user_info(access_token={google_access_token}, auth_source='github')
{% endhighlight %}

For a more detailed guide, visit the [project on github](https://github.com/dev-prakhar/social-user-info)

Follow me on [Github](https://github.com/dev-prakhar)

Feel free to reach out to me on my [website](https://prakhar.xyz)