
# API service mysql

# 1. db design

#### table `blog_type`
|field|type|note|
|-|-|-|
|id|int|PK, ↑|
|type_name|char|`video`,`life`|
|type_id|int|`1`,`2`|



#### table `blog_article`

|field|type|note|
|-|-|-|
|id|int|PK, ↑|
|article_title|char||
|article_intro|text||
|article_content|text||
|article_type_id|int|同上表`type_id`，用于LEFT JOIN|
|add_time|int|`unix timestamp`|
|view_count|int||
