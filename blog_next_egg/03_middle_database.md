
# API service mysql

# 1. db design

#### table `blog_type`
|field|type|key|
|-|-|-|
|id|int|PK, ↑|
|type_name|char|`video`,`life`|
|type_id|int|`1`,`2`|



#### table `blog_article`

|field|type|key|
|-|-|-|
|id|int|PK, ↑|
|article_title|char||
|article_intro|text||
|article_content|text||
|add_time|int|`unix timestamp`|
|view_count|int||
