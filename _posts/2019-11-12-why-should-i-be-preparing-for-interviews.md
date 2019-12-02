---
layout: blogs/post
title: Why should I be preparing for interviews?
image: /images/blogs/interview.jpg
---

Before you start judging me, just hear me out.

Recently I gave an interview and was rejected (Obviously!). I think I wasn't prepared enough.
But *should I really be preparing for an interview?*

## Let's look at it this way

Do you prepare yourself everyday before you go to work? I don't.
Isn't interview just a way to know if a person can work in the organisation?

Sure, the interviewer wants to know if a person can code if it's a technical position. By all means you should judge a person's technical skills. But asking the candidate to code such problems, which(in a very likely scenario) the person will never encounter as a real world problem.

There are many things that you do while working and **printing the bottom view of a binary search tree when it is rotated at an angle of 30 degrees** isn't one of them.

I have met many professionals in my life that are wonderful, when given a Data Structure/Algorithm problem. But not very bright when it comes to actual development. And I have met many professionals who are not good in Data Structures and Algos but their development is flawless. This doesn't mean that every individual who is good at DS is not good at actual development and every individual who doesn't know DS is brilliant at developing things.

But that's the whole point. This way doesn't tell you if you're going for the right candidate or if you're rejecting a wrong candidate.

## There are many aspects that could be missed

When I'm given a question in an interview, I want it to be something I know(Obviously!) or something that makes me learn new thing. In my opinion, I don't actually learn anything new with DS questions. If I'm not able to get it, I'll just open internet for solution and check it out and I'll not learn anything new because this knowledge will only help me crack interviews.

* What is a BST? -> **Very Important** for any technical individual to know.
* Bottom view of a BST. -> I don't think that's necessary.

I hope my point is getting clearer.

When we write code for solving such problems, we sometimes forget to check for some things:

- Is the code readable? In actual development we never use the variables => a, b, i, j k etc.
- Is the code easily testable? We should never ship anything without writing tests for it
- Are we following the right principles, such as not repeating ourselves or not writing very tightly coupled code etc.?

In my experience, *working* code can be written by anyone but writing *working, testable, maintainable, readable* code is a much bigger challenge.

## The kind of problems I actually faced while working in an organisation

* Geeee, the server is throwing 504s and not able to handle the load, how should we decrease the response time and increase the throughput?
* DB is taking a lot of time to fetch rows, is the table indexed properly, can we use the indexed columns to query the results?
* Mongo is querying itself again if the returned documents are more than a certain limit, how can we avoid that?

and many more. None of which could've been easier for me to solve had I known DS & Algos a little better.

*Judging a person's ability using DS & Algos could've been a great way in the past, but since the inception of many resources which specifically **prepare** an individual for interviews. I think, number of false positives and false negatives are increasing.*

**NOTE**: Everything that's written is my personal opinion. Don't want to offend anybody :-P
