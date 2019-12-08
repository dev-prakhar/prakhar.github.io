---
layout: blogs/post
title: How mongo made us deal with an invisible bug?
image: /images/blogs/bug/bug.jpg
tags: featured
---

We use MongoDB in one of our high throughput microservice which is responsible for accounting of riders.
This microservice helps us in determining how much money we should give the riders.

## Conception of the bug
***

Documents that are used in the mentioned microservice is fetched from `MongoDB`. We needed to alter/insert some documents and we decided that we would write a `JS` script and run the script in the `Mongo shell`. That would alter/insert the documents.

We wrote a `JS script` and executed it in the mongo shell and the bug started showing itself.

## Detection & Resolution of bug
***

Detection & Resolution of bug happened in 3 phases.

### Phase 1

*We were unable to fetch the documents that we inserted.*

* We tried fetching all the inserted documents via API. But the API started breaking.
* The above mentioned microservice uses `Java` as it's backend language. We made classes of different types of documents stored in `mongo`. When we fetch any document, it tries to map that document in the specified class.
* We inserted a single type of document and it failed while mapping itself to the mentioned class.
* After we delved deeper into the issue. We opened the `mongo shell` and started looking at our newly inserted documents. We noticed some wierd migration has happened.
* We had a field, let's say `fieldName`. In code we defined, this field as type `long`.
{% highlight java %}
Long fieldName;
{% endhighlight %}
* It used to look like this in the document
{% highlight javascript %}
fieldName: 1212245
{% endhighlight %}
* But After migration, this field was turned into an object
{% highlight javascript %}
fieldName: {
  "floatApprox": 1212245
}
{% endhighlight %}
* Then we fixed this issue and **Phase 1** was resolved.

### Phase 2

*We didn't alter the documents properly* *(Okay, this one is on us :stuck_out_tongue:)*

* We had to alter the documents by changing some timestamps. Basically we had to set the ending timestamps of all the documents to current time.
* We changed the end time of all the documents but we didn't touch the start time. So after alteration, documents' start time was greater than the end time. That's why the money calculation broke.
* We fixed this, and the **Phase 2** was resolved

### Phase 3

*Mongo Shell, why don't you show the truth?* :expressionless:

* After we resolved the above issues. We thought that everything must run properly now
* After sometime, we started receiving some noise that, riders still haven't received their due.
* We tried finding the issue. We opened our `mongo shell` yet again and checked for the newly inserted documents, everything seemed fine.
* Then we tried to replicate the issue on `local` as well, we created the same document(via API) that was causing issue.
* The production machine was giving empty response, whereas `local` machine was producing the right results with same set of documents.
* We were scratching our heads :tired_face: and thinking every possible thing that could've gone wrong :thinking:
* Then our colleague and a great mentor, @balaaagi gave us the most interesting insight.
  * The documents that we created using APIs are working fine, but when we create documents using `mongo shell`, for some reason, they return empty response.
* This made us realise that the problem occured due to the script that we executed in `mongo shell`.
* We created the same document on `local` using `mongo shell` and voila :sunglasses:, we started getting empty response on `local` as well.
* This was the document that was shown in the `mongo_shell`
![Mongo Shell](/images/blogs/bug/mongo_shell.png)
* Whereas, this was the original document. Thanks to [Robo 3T](https://robomongo.org/)
![Robo 3T](/images/blogs/bug/robo_3t.png)
* All the newly inserted documents, converted the `integer/long` values into `float` values. We were filtering the documents using some of these fields, but due to the values being `float`, documents were not getting filtered.
* Hence, **The Empty Response**

* We quickly wrote a small `JS` script to fix these and finally **Phase 3** was resolved.

Riders got their money and everyone lived happily ever after.*(Hopefully!)*

## Implicit Conversion
***

How did this conversion happen while insertion?

* We copied the old documents into new and saved them without mentioning the data type.
* We did this:
{% highlight javascript %}
oldConfig = // fetch old config
newConfig = oldConfig
// do some modification to new config
db.{collection_name}.save(newConfig)
{% endhighlight %}
* We should've done this:
{% highlight javascript %}
oldConfig = // fetch old config
newConfig = oldConfig
// do some modification to new config
newConfig.fieldName = NumberLong(newConfig.fieldName); // Changing data types as required
db.{collection_name}.save(newConfig)
{% endhighlight %}

**Learning: MongoDB, by default, treats every number as float, unless stated otherwise**

Stack overflow: [Mongo Inserts Float](https://stackoverflow.com/questions/8218484/mongodb-inserts-float-when-trying-to-insert-integer)

Follow me on [Github](https://github.com/dev-prakhar)

Feel free to reach out to me on my [website](https://www.prakhar.xyz/#contact)

Let me know, what do you think about the content in the comments below :nerd_face:
