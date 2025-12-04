# Todo List API – Backend

***RESTful API*** สำหรับจัดการ Todos และ Lists
ให้สามารถ เพิ่ม, แก้ไข, ลบ โดยเชื่อมต่อฐานข้อมูลที่ MariaDB <br>
มีการใช้ ***Node.js + Express + MariaDB***
-----

> :memo: **Note:** มีการใช้งาน AI เข้ามาบางส่วนใน Project นี้!

### Features

| Features |                | Description    | Features |                     | Description         |
| -------- | -------------- | -------------- | -------- | ------------------- | ------------------- |
| List     |                |                | Todo     |
| GET      | /api/lists     | ดึงทุกกลุ่ม        | GET      | /api/todos          | ดึงรายการทั้งหมด      |
| POST     | /api/lists     | เพิ่มกลุ่ม         | GET      | /api/todos?list_id= | ดึงรายการเฉพาะกลุ่ม    |
| PUT      | /api/lists/:id | แก้ไขชื่อกลุ่ม      | POSTT    | /api/todos          | เพิ่มรายการ           |
| DELETE   | /api/lists/:id | แก้ไขชื่อกลุ่ม      | PUT      | /api/todos/:id      | แก้ไขงาน            |
|          |                |                 | DELETE   | /api/todos/:id      | ลบงาน              |

> ### Tech Stack in Project
>
> - Node.js
> - Express.js
> - MariaDB
> - Dotenv
> - CORS

### Project Structure *(Backend)*

        todo-api-server/
        │-- config/
        │   |__ db.js
        │-- controllers/
        │   |-- list.controller.js
        │   |__ todo.controller.js
        │-- models/
        │   |__ list.model.js
        │   |__ todo.model.js
        │-- routes/
        │   |__ list.routes.js
        │   |__ todo.routes.js
        │-- server.js
        │-- package.json
        │-- .env
        |__ README.md

## Database Structure
### lists
| Field      | Type               | Note              |
| ---------- | ------------------ | ----------------- |
| id         | INT AUTO_INCREMENT | Primary Key       |
| name       | VARCHAR(255)       |                   |
| created_at | DATETIME           | NOW()             |

### todos
| Field      | Type               | Note                    |
| ---------- | ------------------ | ----------------------- |
| id         | INT AUTO_INCREMENT | Primary Key             |
| title      | VARCHAR(255)       |                         |
| details    | TEXT               |                         |
| list_id    | INT (FK)           |                         |
| due_at     | DATETIME           |                         |
| is_done    | TINYINT            |                         |
| created_at | DATETIME           | NOW()                   |

### FK Constraint
        CONSTRAINT fk_todos_lists
        FOREIGN KEY (list_id)
        REFERENCES lists(id)
        ON DELETE SET NULL

### My Extensions for Develop

1. <a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" target="_blank">Prettier - Code formatter</a>
2. <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank">Live Server</a>
3. <a href="https://marketplace.visualstudio.com/items?itemName=Vue.volar" target="_blank">Vue (Official)</a>
4. <a href="https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight" target="_blank">Color Highlight</a>

### Installation

1.  Clone Project

        git clone <repo-url>
        cd todo-api-server

2.  Install Dependencies

        npm install

3.  Create .env file

        PORT=3000

        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=your_password
        DB_NAME=todo_app

4.  Start Server

        Start Server

5. Server Running

        http://localhost:3000

### API Test Postman

        GET http://localhost:3000/api/todos
        POST http://localhost:3000/api/lists
        PUT http://localhost:3000/api/todos/10
        DELETE http://localhost:3000/api/lists/3

***XD***


### หมายเหตุ

> :warning: โปรเจกต์นี้เป็นส่วนหนึ่งของระบบ Todo List แบบ Full Stack เท่านั้น!
