# About

An API designed for the Tonewood Data Project. Built using Node.js and Postgresql, deployed on Heroku. The API performs basic CRUD operations with protected endpoints via login.

## API endpoint

https://test-tonewood-api.herokuapp.com/

## Live Link to Client

<https://test-tonewood-app.kevinrobinsondeveloper.now.sh>

## Prerequisites

Buvie requires Node.js v6.0+ to run.

## Installing

Buvie requires Node.js v6.0+ to run.
Install the dependencies and devDependencies and start the server.

```
npm install
```

## Running the tests

To run front-end or back-end tests, simply run `npm test` in the terminal.

## Schema

### tw_users

```js
{
    user_name: String,
    full_name: String,
    password: String,
    email: String,
    date_created: Date
}
```

### tonewoods

```js
{
  common_name: String,
  genus: String,
  species: String,
  hardness: String,
  user_id: Number,
  date_created: Date
}
```

### submissions

```js
{
  tw_id: Number,
  user_id: Number,
  date_created: Date,
  hardness: String,
  user_id: Number,
  new_tw_name: String,
  density: Number,
  e_long: Number,
  e_cross: Number,
  velocity_sound_long: Number,
  radiation_ratio: Number,
  sample_length: Number,
  sample_width: Number,
  sample_thickness: Number,
  sample_weight: Number,
  peak_hz_long_grain: Number,
  peak_hz_cross_grain: Number,
  comments: String,
}
```

## API Overview

```text
/api
.
├── /auth
│   └── POST
│       └──/login
├── /users
│   └── GET
│   └── GET /:id
│   └── POST
│       └── /
├── /woods
│   └── GET
│       ├── /
│       ├── /:entry_id
│       └── /:entry_id/submissions
│   └── POST
│       └── /profilePicture/:id
├── /submissions
│   └── GET
│       ├── /
│       └── /:submission_id
│   └── POST
│       └── /

```

### POST `/api/auth/login`

```js
// req.body
{
  username: String,
  password: String
}

// res.body
{
  payload: { user_id },
  authToken: String
}
```

### GET `/api/users?sort:{STRING}`

```js
// req.query
{
  ?
}

// res.body
[
  {
    id: Number,
    user_name: String,
    full_name: String,
    password: String,
    email: String,
    date_created: Date
  }
]
```

### POST `/api/users/`

```js
// req.body
{
  email: String,
  full_name: String,
  user_name: String,
  password: String
}

// res.body
{
    id: Number,
  full_name: String,
  user_name: String,
  email: String,
  date_created: Date
}
```

### GET `/api/woods/`

```js
// res.body
[
  {
    {
        id: Number,
        genus: String,
        species: String,
        common_name: String,
        date_created: Date,
        hardness: String,
        user: {
            id: 5,
            user_name: String,
            full_name: String,
            email: String,
            date_created: Date
        },
        number_of_submissions: Number
  }
]
```

### GET `/api/woods/:entry_id`

```js


// req.params
{
  entry_id: entry_id
}

// res.body
{
        id: Number,
        genus: String,
        species: String,
        common_name: String,
        date_created: Date,
        hardness: String,
        user: {
            id: 5,
            user_name: String,
            full_name: String,
            email: String,
            date_created: Date
        },
        number_of_submissions: Number
}

```

### GET `/api/woods/:entry_id/submissions`

```js


// req.params
{
  entry_id: entry_id
}

// res.body
[
    {
            id: Number,
            date_created:Date,
            user_id: Number,
            tw_id: Number,
            density: Number,
            e_long: Number,
            e_cross: Number,
            velocity_sound_long: Number,
            radiation_ratio: Number,
            sample_length: Number,
            sample_width: Number,
            sample_thickness: Number,
            sample_weight: Number,
            peak_hz_long_grain: Number,
            peak_hz_cross_grain: Number,
            comments: xss(sub.comments),
            user: {
                id: 5,
                user_name: String,
                full_name: String,
                email: String,
                date_created: Date
        }
    }
]

```

### GET `/api/submissions?sort:{String}`

```js


// req.query
{
    ?
}

// res.body
[
    {
            id: Number,
            date_created:Date,
            user_id: Number,
            tw_id: Number,
            density: Number,
            e_long: Number,
            e_cross: Number,
            velocity_sound_long: Number,
            radiation_ratio: Number,
            sample_length: Number,
            sample_width: Number,
            sample_thickness: Number,
            sample_weight: Number,
            peak_hz_long_grain: Number,
            peak_hz_cross_grain: Number,
            comments: String,
            user: {
                id: 5,
                user_name: String,
                full_name: String,
                email: String,
                date_created: Date
        }
    }
]

```

### GET `/api/submissions?submission_id`

```js


// req.params
{
    submission_id: submission_id
}

// res.body
{
        id: Number,
        date_created:Date,
        user_id: Number,
        tw_id: Number,
        density: Number,
        e_long: Number,
        e_cross: Number,
        velocity_sound_long: Number,
        radiation_ratio: Number,
        sample_length: Number,
        sample_width: Number,
        sample_thickness: Number,
        sample_weight: Number,
        peak_hz_long_grain: Number,
        peak_hz_cross_grain: Number,
        comments: String,
        user: {
            id: 5,
            user_name: String,
            full_name: String,
            email: String,
            date_created: Date
    }
}

```

### POST `/api/submissions`

```js


// req.body
{
        user_id: Number,
        tw_id: Number,
        density: Number,
        e_long: Number,
        e_cross: Number,
        velocity_sound_long: Number,
        radiation_ratio: Number,
        sample_length: Number,
        sample_width: Number,
        sample_thickness: Number,
        sample_weight: Number,
        peak_hz_long_grain: Number,
        peak_hz_cross_grain: Number,
        comments: String,
}

// res.body

{
        id: Number,
        date_created:Date,
        user_id: Number,
        tw_id: Number,
        density: Number,
        e_long: Number,
        e_cross: Number,
        velocity_sound_long: Number,
        radiation_ratio: Number,
        sample_length: Number,
        sample_width: Number,
        sample_thickness: Number,
        sample_weight: Number,
        peak_hz_long_grain: Number,
        peak_hz_cross_grain: Number,
        comments: String,
        user: {
            id: 5,
            user_name: String,
            full_name: String,
            email: String,
            date_created: Date
    }
}


```