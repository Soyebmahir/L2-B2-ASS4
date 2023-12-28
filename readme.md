# Course Review

- Requirement Analysis: [click here](https://docs.google.com/document/d/1e9IsrlrDxMM7Y5-lInUfd6JUDeffNTVa_uf-X77LaOg/edit?usp=sharing)

## Clone Repository

```
https://github.com/Porgramming-Hero-web-course/l2b2a4-course-review-with-auth-Soyebmahir
```

# credential

# Admin

{
"username": "soyeb",
"password": "123456"
}

# user

{
"username": "john_doe",
"password": "new123456"
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

## 6. Create a Category (Only Admin can do this)

```
 Put: https://assignment-4-livid-eight.vercel.app/api/categories

```

```Request Body:
{
    "name": "Web Development"
}
```

```response
{
    "success": true,
    "statusCode": 201,
    "message": "Category created successfully",
    "data": {
        "_id": "12345abcde67890fghij",
        "name": "Web Development",
        "createdBy": "adminUserId",
        "createdAt": "2023-01-15T12:00:00.000Z",
        "updatedAt": "2023-01-15T12:00:00.000Z"
    }
}
```

## 7. Get All Categories

```
 GET: https://assignment-4-livid-eight.vercel.app/api/courses/:courseId/reviews

```

```response
{
    "success": true,
    "statusCode": 200,
    "message": "Categories retrieved successfully",
    "data": {
        "categories": [
            {
                "_id": "12345abcde67890fghij",
                "name": "Web Development",
                "createdBy": {  // Include an addition during assignment 4
                    "_id": "adminUserId",
                    "username": "adminUser",
                    "email": "admin@example.com",
                    "role": "admin"
                },
                "createdAt": "2023-01-15T12:00:00.000Z",
                "updatedAt": "2023-01-15T12:00:00.000Z"
            },
            // ... other categories
        ]
    }
}
```

## 8. Create a Review (Only the user can do this)

```
 POST: https://assignment-4-livid-eight.vercel.app/api/reviews

```

```reqest
{
    "courseId": "67890fghij54321abcde",
    "rating": 4,
    "review": "Great course, very informative and well-structured."
}

```

```response
{
    "courseId": "67890fghij54321abcde",
    "rating": 4,
    "review": "Great course, very informative and well-structured."
}
```

## 9\*\*. Update a Course (Only Admin can do this)

```
 PUT: https://assignment-4-livid-eight.vercel.app/api/courses/:courseId

```

```reqest
{
    "price": 59.99,
    "tags": [
        {"name": "Programming", "isDeleted": false},
        {"name": "Web Development", "isDeleted": false},
        {"name": "JavaScript", "isDeleted": false}
    ],
    "details": {
        "level": "Intermediate",
        "description": "A comprehensive course on web development with a focus on JavaScript."
    }
}
```

```response
{
    "success": true,
    "statusCode": 200,
    "message": "Course updated successfully",
    "data": {
        "_id": "67890fghij54321abcde",
        "title": "Introduction to Web Development",
        "instructor": "John Smith",
        "categoryId": "12345abcde67890fghij",
        "price": 59.99,
        "tags": [
            {"name": "Programming", "isDeleted": false},
            {"name": "Web Development", "isDeleted": false},
            {"name": "JavaScript", "isDeleted": false}
        ],
        "startDate": "2023-02-01",
        "endDate": "2023-04-01",
        "language": "English",
        "provider": "Tech Academy",
        "durationInWeeks": 8,
        "details": {
            "level": "Intermediate",
            "description": "A comprehensive course on web development with a focus on JavaScript."
        },
        "createdBy": {   // Include an addition during assignment 4
            "_id": "adminUserId",
            "username": "adminUser",
            "email": "admin@example.com",
            "role": "admin"
        },
        "createdAt": "2023-01-15T12:00:00.000Z",
        "updatedAt": "2023-01-16T12:30:00.000Z"
    }
}
```

## 10\*\*. Get Course by ID with Reviews

````
 GET: https://assignment-4-livid-eight.vercel.app/api/courses/:courseId/reviews



```response
{
    "success": true,
    "statusCode": 200,
    "message": "Course with reviews retrieved successfully",
    "data": {
        "course": {
            "_id": "67890fghij54321abcde",
            "title": "Introduction to Web Development",
            "instructor": "John Smith",
            "categoryId": "12345abcde67890fghij",
            "price": 59.99,
            "tags": [
                {"name": "Programming", "isDeleted": false},
                {"name": "Web Development", "isDeleted": false},
                {"name": "JavaScript", "isDeleted": false}
            ],
            "startDate": "2023-02-01",
            "endDate": "2023-04-01",
            "language": "English",
            "provider": "Tech Academy",
            "durationInWeeks": 8,
            "details": {
                "level": "Intermediate",
                "description": "A comprehensive course on web development with a focus on JavaScript."
            },
            "createdBy": {   // Include an addition during assignment 4
                "_id": "adminUserId",
                "username": "adminUser",
                "email": "admin@example.com",
                "role": "admin"
            },
            "createdAt": "2023-01-15T12:00:00.000Z",
            "updatedAt": "2023-01-16T12:30:00.000Z"
        },
        "reviews": [
            {
                "_id": "98765fghij43210lkji",
                "courseId": "67890fghij54321abcde",
                "rating": 4,
                "review": "Great course, very informative and well-structured.",
                "createdBy": {    // Include an addition during assignment 4
                    "_id": "userid",
                    "username": "username",
                    "email": "user@example.com",
                    "role": "user"
                },
                "createdAt": "2023-01-15T12:00:00.000Z",
                "updatedAt": "2023-01-15T12:00:00.000Z"
            },
            // ... other reviews
        ]
    }
}
````

## 11**. Get the Best Course Based on Average Review (Rating)**

```
 GET: https://assignment-4-livid-eight.vercel.app/api/course/best

```

```response
{
    "success": true,
    "statusCode": 200,
    "message": "Best course retrieved successfully",
    "data": {
        "course": {
            "_id": "23245dsfd453242348rFcg",
            "title": "Best Book Title",
            "instructor": "New Instructor",
            "categoryId": "123456789012345678901234",
            "price": 59.99,
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
            "startDate": "2023-02-01",
            "endDate":"2023-03-14",
            "language": "Spanish",
            "provider": "Code Masters",
            "durationInWeeks": 6,
            "details": {
                "level": "Intermediate",
                "description": "Detailed description of the course"
            },
            "createdBy": {
                "_id": "userid",
                "username": "username",
                "email": "user@example.com",
                "role": "user"
            },
            "createdAt": "2023-01-15T12:00:00.000Z",
            "updatedAt": "2023-01-15T12:00:00.000Z"
        },
        "averageRating": 4.8,
        "reviewCount": 50
    }
}
```
