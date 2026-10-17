// StudyBloom — Student Productivity Dashboard
// ES6+: let/const, arrow functions, template literals, async/await, classes,
// destructuring, spread operator, array methods, and localStorage.

const STORAGE_KEY = "studyBloomTasks";
const QUOTE_API = "https://dummyjson.com/quotes/random";

class TaskItem {
  constructor({ id = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`), title, course = "", dueDate, priority = "Medium", completed = false, createdAt = new Date().toISOString() }) {
    this.id = id;
    this.title = title.trim();
    this.course = course.trim() || "Personal";
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
    this.createdAt = createdAt;
  }
}

class DashboardApp {
  constructor() {
    this.tasks = this.loadTasks();
    this.currentFilter = "all";
    this.editingId = null;
    this.toastTimeout = null;
    this.cacheElements();
    this.bindEvents();
    this.render();
    this.setTodayLabel();
    this.fetchQuote();
  }

  cacheElements() {
    this.taskList = document.querySelector("#taskList");
    this.emptyState = document.querySelector("#emptyState");
    this.taskDialog = document.querySelector("#taskDialog");
    this.taskForm = document.querySelector("#taskForm");
    this.searchInput = document.querySelector("#searchInput");
    this.priorityFilter = document.querySelector("#priorityFilter");
    this.toast = document.querySelector("#toast");
  }

  loadTasks() {
    try {
      const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return savedTasks.map((task) => new TaskItem(task));
    } catch (error) {
      console.error("Tidak bisa membaca localStorage:", error);
      return [];
    }
  }

  saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
  }

  bindEvents() {
    document.querySelector("#addTaskBtn").addEventListener("click", () => this.openDialog());
    document.querySelector("#emptyAddBtn").addEventListener("click", () => this.openDialog());
    document.querySelector("#closeDialogBtn").addEventListener("click", () => this.closeDialog());
    document.querySelector("#cancelDialogBtn").addEventListener("click", () => this.closeDialog());
    this.taskForm.addEventListener("submit", (event) => this.handleSubmit(event));
    this.searchInput.addEventListener("input", () => this.renderTasks());
    this.priorityFilter.addEventListener("change", () => this.renderTasks());
    document.querySelector("#newQuoteBtn").addEventListener("click", () => this.fetchQuote());

    document.querySelectorAll(".nav-item").forEach((button) => {
      button.addEventListener("click", () => {
        this.currentFilter = button.dataset.filter;
        document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item === button));
        const titles = { all: "Upcoming Tasks", active: "My Tasks", completed: "Completed Tasks" };
        document.querySelector("#listTitle").innerHTML = `${titles[this.currentFilter]} <span>✧</span>`;
        this.renderTasks();
      });
    });

    // Event delegation: controls work for dynamically rendered task rows.
    this.taskList.addEventListener("click", (event) => {
      const actionButton = event.target.closest("[data-action]");
      if (!actionButton) return;
      const { action, id } = actionButton.dataset;
      if (action === "edit") this.openDialog(id);
      if (action === "delete") this.deleteTask(id);
    });
    this.taskList.addEventListener("change", (event) => {
      const checkbox = event.target.closest("[data-action='toggle']");
      if (checkbox) this.toggleTask(checkbox.dataset.id, checkbox.checked);
    });
    this.taskDialog.addEventListener("click", (event) => {
      if (event.target === this.taskDialog) this.closeDialog();
    });
  }

  setTodayLabel() {
    const formattedDate = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());
    document.querySelector("#todayLabel").textContent = formattedDate.toUpperCase();
  }

  openDialog(id = null) {
    this.editingId = id;
    this.taskForm.reset();
    const existingTask = this.tasks.find((task) => task.id === id);
    document.querySelector("#dialogTitle").innerHTML = existingTask ? 'Edit your task <span>✿</span>' : 'Add a task <span>✿</span>';
    if (existingTask) {
      const { title, course, dueDate, priority } = existingTask;
      document.querySelector("#taskTitle").value = title;
      document.querySelector("#taskCourse").value = course === "Personal" ? "" : course;
      document.querySelector("#taskDue").value = dueDate;
      document.querySelector("#taskPriority").value = priority;
    } else {
      document.querySelector("#taskDue").value = new Date().toISOString().slice(0, 10);
      document.querySelector("#taskPriority").value = "Medium";
    }
    this.taskDialog.showModal();
    document.querySelector("#taskTitle").focus();
  }

  closeDialog() {
    this.taskDialog.close();
    this.editingId = null;
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(this.taskForm);
    const { title, course, dueDate, priority } = Object.fromEntries(formData.entries());
    if (!title.trim() || !dueDate) return;

    if (this.editingId) {
      this.tasks = this.tasks.map((task) => task.id === this.editingId
        ? new TaskItem({ ...task, title, course, dueDate, priority })
        : task);
      this.showToast("Task updated! Keep blooming 🌷");
    } else {
      const newTask = new TaskItem({ title, course, dueDate, priority });
      this.tasks = [newTask, ...this.tasks];
      this.showToast("New task added. You’ve got this! ♡");
    }
    this.saveTasks();
    this.closeDialog();
    this.render();
  }

  deleteTask(id) {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) return;
    const confirmed = window.confirm(`Hapus tugas "${task.title}"?`);
    if (!confirmed) return;
    this.tasks = this.tasks.filter((item) => item.id !== id);
    this.saveTasks();
    this.render();
    this.showToast("Task deleted.");
  }

  toggleTask(id, completed) {
    this.tasks = this.tasks.map((task) => task.id === id ? new TaskItem({ ...task, completed }) : task);
    this.saveTasks();
    this.render();
    this.showToast(completed ? "Task completed! So proud of you ✿" : "Task moved back to in progress.");
  }

  getVisibleTasks() {
    const query = this.searchInput.value.trim().toLowerCase();
    const priority = this.priorityFilter.value;
    return this.tasks
      .filter(({ title, course, completed }) => {
        const matchesFilter = this.currentFilter === "all"
          || (this.currentFilter === "active" && !completed)
          || (this.currentFilter === "completed" && completed);
        return matchesFilter && `${title} ${course}`.toLowerCase().includes(query);
      })
      .filter((task) => priority === "all" || task.priority === priority)
      .sort((a, b) => a.completed - b.completed || a.dueDate.localeCompare(b.dueDate));
  }

  render() {
    this.renderStats();
    this.renderTasks();
  }

  renderStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(({ completed }) => completed).length;
    const active = total - completed;
    document.querySelector("#totalCount").textContent = total;
    document.querySelector("#activeCount").textContent = active;
    document.querySelector("#completedCount").textContent = completed;
    const totalWidth = total ? `${Math.min(100, (total / Math.max(total, 10)) * 100)}%` : "0%";
    const activeWidth = total ? `${(active / total) * 100}%` : "0%";
    const completedWidth = total ? `${(completed / total) * 100}%` : "0%";
    document.querySelector(".stat-total .stat-line span").style.width = totalWidth;
    document.querySelector(".stat-progress .stat-line span").style.width = activeWidth;
    document.querySelector(".stat-done .stat-line span").style.width = completedWidth;
  }

  renderTasks() {
    const visibleTasks = this.getVisibleTasks();
    this.taskList.innerHTML = visibleTasks.map((task) => this.taskTemplate(task)).join("");
    this.emptyState.classList.toggle("hidden", visibleTasks.length > 0);
    this.taskList.classList.toggle("hidden", visibleTasks.length === 0);
    document.querySelector("#listCount").textContent = `Showing ${visibleTasks.length} ${visibleTasks.length === 1 ? "task" : "tasks"}`;
  }

  taskTemplate({ id, title, course, dueDate, priority, completed }) {
    const readableDate = new Date(`${dueDate}T00:00:00`).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    const isOverdue = !completed && dueDate < new Date().toISOString().slice(0, 10);
    return `
      <article class="task-row ${completed ? "is-complete" : ""}">
        <input class="task-check" type="checkbox" data-action="toggle" data-id="${id}" aria-label="Tandai ${this.escapeHTML(title)} selesai" ${completed ? "checked" : ""}>
        <div class="task-info">
          <p class="task-name">${this.escapeHTML(title)}</p>
          <div class="task-meta"><span class="course-chip">${this.escapeHTML(course)}</span><span>♡ ${completed ? "Completed" : "Keep going"}</span></div>
        </div>
        <span class="priority ${priority}">${priority}</span>
        <span class="due-date ${isOverdue ? "overdue" : ""}">${isOverdue ? "Overdue · " : ""}${readableDate}</span>
        <div class="task-actions">
          <button class="icon-btn" data-action="edit" data-id="${id}" title="Edit task" aria-label="Edit ${this.escapeHTML(title)}">✎</button>
          <button class="icon-btn delete" data-action="delete" data-id="${id}" title="Delete task" aria-label="Hapus ${this.escapeHTML(title)}">⌫</button>
        </div>
      </article>`;
  }

  escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  async fetchQuote() {
    const quoteText = document.querySelector("#quoteText");
    const quoteAuthor = document.querySelector("#quoteAuthor");
    const refreshButton = document.querySelector("#newQuoteBtn");
    refreshButton.disabled = true;
    quoteAuthor.textContent = "Finding a little inspiration...";
    try {
      const response = await fetch(QUOTE_API);
      if (!response.ok) throw new Error("API request failed");
      let quoteData = await response.json();
      const { quote, author } = quoteData;
      quoteText.textContent = quote;
      quoteAuthor.textContent = `— ${author}`;
    } catch (error) {
      console.warn("Kutipan API tidak tersedia:", error);
      quoteText.textContent = "Small steps every day lead to beautiful results.";
      quoteAuthor.textContent = "— Your StudyBloom reminder";
    } finally {
      refreshButton.disabled = false;
    }
  }

  showToast(message) {
    this.toast.textContent = message;
    this.toast.classList.add("show");
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => this.toast.classList.remove("show"), 2600);
  }
}

// Three or more arrow functions are used throughout the app.
const startStudyBloom = () => new DashboardApp();
document.addEventListener("DOMContentLoaded", startStudyBloom);
