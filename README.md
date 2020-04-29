# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_name|string|null: false, unique: true , index: true|
|email|string|null: false , unique: true , index:true|

### Association
- has_many: group_users
- has_many: groups, through: group_users
- has_many: massages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, index: true|

### Association
- has_many: massages
- has_many: group_users
- has_many: users , through : group_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|references|null: false, foreign_key: true|
|users_id|references|null: false, foreign_key: true|
|message|text|null: false|
|image|text||

### Association
- belongs_to: users
- belongs_to: groups
