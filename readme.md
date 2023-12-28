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

## 2. Get Paginated and Filtered Courses

```
 get: https://assignment-4-livid-eight.vercel.app/api/courses

```

for query parameters example

```
?page=2
?limit=10

?sortBy=startDate or( title, price, startDate, endDate, language, durationInWeeks) any field name

?sortOrder=desc or asc

?minPrice=20.00&maxPrice=50.00

?tags=Programming

?startDate=2023-01-01&endDate=2023-12-31

?language=English

?provider=Tech Academy

?durationInWeeks=8

?level=Intermediate

```

```response

{
    "success": true,
    "statusCode": 200,
    "message": "Courses retrieved successfully",
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 50
    },
    "data": [
        {
            "_id": "23245dsfd453242348rFcg",
            "title": "Sample Course",
            "instructor": "Jane Doe",
            "categoryId": "123456789012345678901234",
            "price": 49.99,
            "tags": [
                {
                    "name": "Programming",
                    "isDeleted": false
                },
                {
                    "name": "Web Development",
                    "isDeleted": false
                }
            ],
            "startDate": "2023-01-15",
            "endDate":"2023-03-14",
            "language": "English",
            "provider": "Tech Academy",
            "durationInWeeks": 9,
            "details": {
                "level": "Intermediate",
                "description": "Detailed description of the course",
            }
             "createdBy": {
                    "_id": "adminUserId",
                    "username": "adminUser",
                    "email": "admin@example.com",
                    "role": "admin"
                },
        },
        // more courses
    ]
}
```

## 3. User Login

```
 POST: https://assignment-4-livid-eight.vercel.app/api/auth/login

```

```Request Body:
{
    "username": "john_doe",
    "password": "123456"
}

```

```response
{
    "success": true,
    "statusCode": 200,
    "message": "User login successful",
    "data": {
        "user": {
            "_id": "54321abcde67890fghij",
            "username": "john_doe",
            "email": "john@example.com",
            "role": "user"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
}

```

## 4. Change Password

```
 POST: https://assignment-4-livid-eight.vercel.app/api/auth/change-password

```

```request
{
    "currentPassword": "123456",
    "newPassword": "new123456"
}

response
{
    "success": true,
    "statusCode": 200,
    "message": "Password changed successfully",
    "data": {
        "_id": "54321abcde67890fghij",
        "username": "john_doe",
        "email": "john@example.com",
        "role": "user",
        "createdAt": "2023-01-01T12:00:00.000Z",
        "updatedAt": "2023-01-02T12:30:00.000Z"
    }
}
```

## 5. Create a Course (Only Admin can do this)

```
 POST: https://assignment-4-livid-eight.vercel.app/api/courses

```

```Request Body:
{
    "title": "Introduction to Web Development",
    "instructor": "John Smith",
    "categoryId": "12345abcde67890fghij",
    "price": 49.99,
    "tags": [
        {"name": "Programming", "isDeleted": false},
        {"name": "Web Development", "isDeleted": false}
    ],
    "startDate": "2023-02-01",
    "endDate": "2023-04-01",
    "language": "English",
    "provider": "Tech Academy",
    "durationInWeeks": 8,
    "details": {
        "level": "Beginner",
        "description": "A comprehensive introduction to web development."
    }
}
```

```response
{
    "success": true,
    "statusCode": 201,
    "message": "Course created successfully",
    "data": {
        "_id": "67890fghij54321abcde",
        "title": "Introduction to Web Development",
        "instructor": "John Smith",
        "categoryId": "12345abcde67890fghij",
        "price": 49.99,
        "tags": [
            {"name": "Programming", "isDeleted": false},
            {"name": "Web Development", "isDeleted": false}
        ],
        "startDate": "2023-02-01",
        "endDate": "2023-04-01",
        "language": "English",
        "provider": "Tech Academy",
        "durationInWeeks": 8,
        "details": {
            "level": "Beginner",
            "description": "A comprehensive introduction to web development."
        },
        "createdBy": "adminUserId", // Include an addition during assignment 4
        "createdAt": "2023-01-15T12:00:00.000Z",
        "updatedAt": "2023-01-15T12:00:00.000Z"
    }
}
```
