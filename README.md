# 📌 Todo System

A simple and efficient **task management system** built with React, Chakra UI, and LocalStorage. This project allows users to create, view, and manage their daily tasks with ease.

---

## 🚀 Features

* **Add Tasks** – Create tasks with name, description, priority, assignee, and due date.
* **View Tasks** – Display tasks in a clean, responsive table.
* **Persistent Storage** – Tasks are stored in browser `localStorage`.
* **Modern UI** – Styled with Chakra UI for a clean and responsive design.

---

## 🛠️ Tech Stack

* **React.js** – Frontend framework
* **Chakra UI** – Component library for styling
* **LocalStorage** – For storing tasks persistently
* **React Icons, and consax-react** – For task action icons

---

## 📂 Project Structure

```
todo-system/
├── component/
|   |
│   ├──Body/ 
|   |
│   ├──Sidebar/
|   |
│   |
|   └──Ui/
|   
└── public/
```

---

## ⚙️ Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Samcodedev/todo-system.git
   cd todo-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open in browser:

   ```
   http://localhost:3000
   ```

---

## 📖 Usage

1. **Add a Task** – Click on the `Add Task` button and fill in the details.
2. **View Tasks** – All tasks will appear in the dashboard table.
3. **Edit a Task** – Use the edit icon to update task details. (work in progress)

---

## 📝 Example Task Object

```json
{
  "id": 1758837310858,
  "name": "Testing Task",
  "description": "Hello just testing",
  "priority": "High",
  "assignee": {
    "value": ["Adison Mango"],
    "items": [
      { "label": "Adison Mango", "value": "Adison Mango" }
    ]
  },
  "date": "Fri Sep 26 2025"
}
```

---

## 🧑‍💻 Author

**Samuel Obanla (Samcodedev)**
🔗 [GitHub](https://github.com/Samcodedev)

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use and modify it.
