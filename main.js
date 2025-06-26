const form = document.getElementById('todo-form');
const input = document.getElementById('task');
const list = document.getElementById('todo-list');
const clearBtn = document.getElementById('clear-completed');
const themeToggleBtn = document.getElementById('theme-toggle');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let darkMode = localStorage.getItem('darkMode') === 'true';

// Initialize theme
if (darkMode) {
    document.body.classList.add('dark');
    themeToggleBtn.textContent = '☀️';
} else {
    themeToggleBtn.textContent = '🌙';
}

// Render todos from localStorage
function renderTodos() {
    list.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', todo.completed);
        if (todo.completed && darkMode) li.classList.add('dark');
        li.innerHTML = `
            <span class="text">${todo.text}</span>
            <button class="delete-btn" aria-label="Supprimer tâche">✖</button>
        `;

        // Toggle complete on clicking text
        li.querySelector('.text').addEventListener('click', () => {
            todos[index].completed = !todos[index].completed;
            saveTodos();
            renderTodos();
        });

        // Delete task on clicking delete button
        li.querySelector('.delete-btn').addEventListener('click', () => {
            if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            }
        });

        list.appendChild(li);
    });
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add new todo
form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === '') {
        alert("Veuillez entrer une tâche valide !");
        return;
    }
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
    input.value = '';
});

// Clear completed todos
clearBtn.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
});

// Theme toggle
themeToggleBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
    themeToggleBtn.textContent = darkMode ? '☀️' : '🌙';
});

// Initial render
renderTodos();
