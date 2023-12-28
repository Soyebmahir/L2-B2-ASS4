# Course Review

- Requirement Analysis: [click here](https://docs.google.com/document/d/1e9IsrlrDxMM7Y5-lInUfd6JUDeffNTVa_uf-X77LaOg/edit?usp=sharing)

## Clone Repository

```
https://github.com/Porgramming-Hero-web-course/l2b2a4-course-review-with-auth-Soyebmahir
```

# Admin

{
"username": "soyeb",
"password": "123456"
}

#### Requirements

- Node.js v.18+
- TypeScript v.4.5+

## Installation

```bash
npm install
```

## Quick start

```
npm run start:dev
```

# API

## 1. User Registration

```
 POST: https://assignment-4-livid-eight.vercel.app/auth/register

```

```Request Body:
{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "123456",
    "role": "user"
}
```

```response
{
    "success": true,
    "statusCode": 201,
    "message": "User registered successfully",
    "data": {
        "_id": "54321abcde67890fghij",
        "username": "john_doe",
        "email": "john@example.com",
        "role": "user",
        "createdAt": "2023-01-01T12:00:00.000Z",
        "updatedAt": "2023-01-01T12:00:00.000Z"
    }
}
```
