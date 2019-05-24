Students
========

Student resources

Get students list
-----------------

```shell
  curl -X GET :endpoint:/api/v1/students -H 'Authorization: :auth_token:'
```

```ruby
require 'manabu'
Manabu::Students.new(client).roster
```

Filter students
---------------

Filter students with condition

| Condition              | Description            |
| ---------------------- | ---------------------- |
| enrollment_status      | filter by enrollment status code|

```ruby
  Manabu::Students.new(client).filter(enrollment_status: 'enrolled')
```


Create new student
------------------

| Parameter              | Required | Description            |
| ---------------------- | -------- | ---------------------- |
| name                   | true     | student name           |
| surname                | true     | student surname        |
| name_reading           | false    | name reading           |
| surname_reading        | false    | surname reading        |
| middle_name            | false    | middle name            |
| middle_name_reading    | false    | middle name reading    |
| birth_date             | false    | birth_date             |
| gender                 | false    | gender                 |
| enrollment_status_code | false    | enrollment status code |
| picture                | false    | multipart file field   |

```shell
  curl -X POST :endpoint:/api/v1/students?name=john&surname=doe \
    -H 'Authorization: :auth_token:'
```

```json
// Successful response

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
// Response with error
{
  "error": "param is missing or the value is empty: surname"
}
```

```ruby
require "manabu"

new_user = Manabu::Students.new(client).register(name: 'john', surname: 'Doe')
#or
user = Manabu::Student.new(name: 'john', surname: 'doe')
new_user = Manabu::Students.new(client).register(user)
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

```shell
curl -X PATCH :endpoint:/api/v1/students/1?name=jane \
  -H 'Authorization: :auth_token:'
```

```ruby
  require 'manabu'

  user = Manabu::User.new(id: 1)
  user.set(name: 'jane', surname: 'doe')
```

Get a student picture
---------------------

Get picture file

```shell
  curl ':endpoint:/api/v1/students/:id:/picture'
```

```ruby
  require 'manabu'
  user = Manabu::User.new(id: 1)
  user.picture
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
