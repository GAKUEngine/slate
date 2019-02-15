Students
========
The students endpoint [api/v1/students] offers indexing, search, and individual student record 
referencing/lookup and registration.

Obtaining the Roster [Student Index]
------------------------------------
You can obtain a full student roster by simply accessing the api/v1/students endpoint.

> Request

```shell
curl -X GET :endpoint:/api/v1/students -H 'Authorization: :auth_token:'
```

```json
// TODO
```

```ruby
require 'manabu'
Manabu::Students.new(client).roster
```

```cpp
```

> Success

```shell
```

```json
```

```ruby
```

```cpp
```

> Failure

```shell
```

```json
```

```ruby
```

```cpp
```

Obtaining a Filtered Roster [Student Index Filtering]
-----------------------------------------------------
You can filter the roster by a variety of conditions, so that you can obtain small rosters 
of students in specific classes, grades, enrollment status, age ranges, etc.

TODO fill in different conditions available and what kind of data to pass to them

Filter students with condition

| Condition              | Description            |
| ---------------------- | ---------------------- |
| enrollment_status      | filter by enrollment status code|

> Request

```shell
# TODO
```

```json
// TODO
```

```ruby
Manabu::Students.new(client).filter(enrollment_status: 'enrolled')

# TODO more examples
```

```cpp
// TODO
```

> Success

```shell
```

```json
```

```ruby
```

```cpp
```

> Failure

```shell
```

```json
```

```ruby
```

```cpp
```


Create a New Student
------------------
To create a new student you must POST to the /api/v1/students endpoint with at least the following 
required parameters.


| Parameter              | Required | Type | Description            |
| ---------------------- | -------- | ---- |  ---------------------- |
| name                   | *        | string |  student name           |
| name_reading           |          | string |  name reading           |
| surname                | *        | string |  student surname        |
| surname_reading        |          | string |  surname reading        |
| middle_name            |          | string |  middle name            |
| middle_name_reading    |          | string |  middle name reading    |
| birth_date             | *        |        |  birth_date             |
| gender                 |          | stateless bool |  0/false for female, 1/true for male, nil for unknown/other gender                 |
| enrollment_status_code |          | label  |  enrollment status code |
| picture                |          | binary |  multipart file field   |

> Request

```shell
curl -X POST :endpoint:/api/v1/students?name=john&surname=doe \
  -H 'Authorization: :auth_token:'
```

```json
```

```ruby
require "manabu"

new_user = Manabu::Students.new(client).register(name: 'john', surname: 'Doe')
#or
user = Manabu::Student.new(name: 'john', surname: 'doe')
new_user = Manabu::Students.new(client).register(user)
```

```cpp
```

> Success

```shell
{
    "id": 1,
    "name": "john",
    "surname": "doe",
    "middle_name": null,
    "name_reading": "",
    "middle_name_reading": "",
    "surname_reading": "",
    "gender": null,
    "birth_date": null,
    "admitted": null,
    "graduated": null,
    "code": "**-****-00001",
    "serial_id": "00001",
    "foreign_id_code": null,
    "national_registration_code": null,
    "enrollment_status_code": null,
    "picture_file_name": null,
    "picture_content_type": null,
    "picture_file_size": null,
    "picture_updated_at": null,
    "addresses_count": 0,
    "contacts_count": 0,
    "notes_count": 0,
    "courses_count": 0,
    "guardians_count": 0,
    "external_school_records_count": 0,
    "badges_count": 0,
    "primary_address": null,
    "primary_contact": null,
    "class_and_number": null,
    "user_id": null,
    "faculty_id": null,
    "commute_method_type_id": null,
    "scholarship_status_id": 1,
    "created_at": "2019-02-10T17:11:49.016Z",
    "updated_at": "2019-02-10T17:11:49.016Z",
    "extracurricular_activities_count": 0,
    "class_groups_count": 0,
    "enrollment_status": null
}
```

```json
{
    "id": 1,
    "name": "john",
    "surname": "doe",
    "middle_name": null,
    "name_reading": "",
    "middle_name_reading": "",
    "surname_reading": "",
    "gender": null,
    "birth_date": null,
    "admitted": null,
    "graduated": null,
    "code": "**-****-00001",
    "serial_id": "00001",
    "foreign_id_code": null,
    "national_registration_code": null,
    "enrollment_status_code": null,
    "picture_file_name": null,
    "picture_content_type": null,
    "picture_file_size": null,
    "picture_updated_at": null,
    "addresses_count": 0,
    "contacts_count": 0,
    "notes_count": 0,
    "courses_count": 0,
    "guardians_count": 0,
    "external_school_records_count": 0,
    "badges_count": 0,
    "primary_address": null,
    "primary_contact": null,
    "class_and_number": null,
    "user_id": null,
    "faculty_id": null,
    "commute_method_type_id": null,
    "scholarship_status_id": 1,
    "created_at": "2019-02-10T17:11:49.016Z",
    "updated_at": "2019-02-10T17:11:49.016Z",
    "extracurricular_activities_count": 0,
    "class_groups_count": 0,
    "enrollment_status": null
}
```

```ruby
```

```cpp
```

> Failure

```shell
{
  "error": "param is missing or the value is empty: surname"
}
```

```json
{
  "error": "param is missing or the value is empty: surname"
}
```

```ruby
```

```cpp
```

Update a student
----------------

Update student attribute

| Parameter              | Required | Description            |
| ---------------------- | -------- | ---------------------- |
| name                   | false    | student name           |
| surname                | false    | student surname        |
| name_reading           | false    | name reading           |
| surname_reading        | false    | surname reading        |
| middle_name            | false    | middle name            |
| middle_name_reading    | false    | middle name reading    |
| birth_date             | false    | birth_date             |
| gender                 | false    | gender                 |
| enrollment_status_code | false    | enrollment status code |
| picture                | false    | multipart file field   |

> Request

```shell
curl -X PATCH :endpoint:/api/v1/students/1?name=jane \
  -H 'Authorization: :auth_token:'
```

```json
```

```ruby
require 'manabu'

user = Manabu::User.new(id: 1)
user.set(name: 'jane', surname: 'doe')
```

```cpp
```

Get a student picture
---------------------

Get picture file

> Request

```shell
curl ':endpoint:/api/v1/students/:id:/picture'
```

```json
```

```ruby
require 'manabu'
user = Manabu::User.new(id: 1)
user.picture
```

```cpp
```

Set Picture to a student
------------------------

```shell

```

```ruby
require 'manabu'
student = Manabu::Student.new(id: 1)
student.set_picture('path/to/file')
```

Add guardian to а student

```shell
curl -X POST :endpoint:/api/v1/students/:id:/student_guardians?guardian_id=:guardian_id: \
  -H 'Authorization: :auth_token:'
```

```ruby
  require 'manabu'
  student = Manabu::Student.new(client, id: 1)
  guardian = Manabu::Guardian.new(client, id: 1)
  student.add_guardian(guardian)
```

List student guardians
----------------------

```shell
  curl -X POST :endpoint:/api/v1/students/:id:/guardians\
    -H 'Authorization: :auth_token:'
```

```ruby
require 'manabu'
student = Manabu::Student.new(client, id: 1)
student.guardians
```

List student courses
----------------------

```shell
  curl -X POST :endpoint:/api/v1/students/:id:/courses\
    -H 'Authorization: :auth_token:'
```

```ruby
require 'manabu'
student = Manabu::Student.new(client, id: 1)
student.courses
```
