// ---------- CONSTANTES / KEYS ----------
    const USERS_KEY = "gymlog-users-v1";
    const CURRENT_USER_KEY = "gymlog-current-user-v1";
    const LOGS_KEY_BASE = "gymlog-registros-v2-";
    const WORKOUTS_KEY_BASE = "gymlog-workouts-v2-";
    const SESSIONS_KEY_BASE = "gymlog-sessoes-v1-";
    const NUTRI_PROFILE_KEY_BASE = "gymlog-nutri-profile-v1-";
    const MEALS_KEY_BASE = "gymlog-meals-v1-";
    const THEME_KEY = "gymlog-theme";

    let currentUser = null;
    let logs = [];       // registros por exercício
    let workouts = {};   // definição dos treinos
    let sessions = [];   // sessão por dia+treino
    let nutritionProfile = null;
    let meals = [];
    let selectedWorkout = null;
    let currentMonth = new Date();
    let lastDayDetailsDate = null;
    
    // ---------- FUNÇÕES UTIL ----------

    function todayISO() {
      return new Date().toISOString().slice(0, 10);
    }

    function fmtDateBR(iso) {
      if (!iso) return "";
      const [y, m, d] = iso.split("-");
      return `${d}/${m}/${y}`;
    }

    function loadJSON(key, fallback) {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        return data ?? fallback;
      } catch {
        return fallback;
      }
    }

    function saveJSON(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }

    function getUserKey(base) {
      if (!currentUser) return null;
      return base + currentUser;
    }

    function showLoginMsg(text, isError = true) {
      const el = document.getElementById("login-msg");
      el.textContent = text || "";
      el.classList.remove("text-red-500", "text-emerald-600");
      el.classList.add(isError ? "text-red-500" : "text-emerald-600");
    }

    function showTodayMsg(text) {
      document.getElementById("today-msg").textContent = text || "";
    }

    // ---------- LOGIN / USUÁRIOS ----------

    function loadUsers() {
      return loadJSON(USERS_KEY, {});
    }

    function saveUsers(users) {
      saveJSON(USERS_KEY, users);
    }

    function handleLogin() {
      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value;

      if (!username || !password) {
        showLoginMsg("Preencha usuário e senha.");
        return;
      }
      const users = loadUsers();
      if (!users[username]) {
        showLoginMsg("Usuário não encontrado.");
        return;
      }
      if (users[username].password !== password) {
        showLoginMsg("Senha incorreta.");
        return;
      }
      currentUser = username;
      localStorage.setItem(CURRENT_USER_KEY, currentUser);
      showLoginMsg("");
      enterApp();
    }

    function handleRegister() {
      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value;

      if (!username || !password) {
        showLoginMsg("Preencha usuário e senha para registrar.");
        return;
      }
      if (password.length < 4) {
        showLoginMsg("Senha deve ter pelo menos 4 caracteres.");
        return;
      }
      const users = loadUsers();
      if (users[username]) {
        showLoginMsg("Usuário já existe, faça login.");
        return;
      }
      users[username] = { password };
      saveUsers(users);
      showLoginMsg("Usuário criado, agora faça login.", false);
    }

    function logout() {
      currentUser = null;
      localStorage.removeItem(CURRENT_USER_KEY);
      document.getElementById("app-screen").classList.add("hidden");
      document.getElementById("login-screen").classList.remove("hidden");
    }

    // ---------- INICIALIZAÇÃO APP ----------

    function cloneDefaultWorkouts() {
      // Função placeholder gerando URL "genérica" de demonstração (YouTube search)
      const demoUrl = (nome) =>
        "https://www.youtube.com/results?search_query=" + encodeURIComponent(nome + " exercício academia");

      const DEFAULT_WORKOUTS = {
        A: {
          nome: "Treino A (Perna / Quadríceps / Glúteo)",
          exercises: [
            { name: "Agachamento no smith", reps: "4x10-12", gif: demoUrl("Agachamento no smith"), favorite: false },
            { name: "Leg 45º", reps: "4x10-12", gif: demoUrl("Leg 45"), favorite: false },
            { name: "Afundo com halteres", reps: "3x10 cada perna", gif: demoUrl("Afundo com halteres"), favorite: false },
            { name: "Cadeira extensora", reps: "4x12-15", gif: demoUrl("Cadeira extensora"), favorite: false },
            { name: "Adutora máquina", reps: "4x12-15", gif: demoUrl("Adutora máquina"), favorite: false },
            { name: "Panturrilha em pé", reps: "4x15-20", gif: demoUrl("Panturrilha em pé máquina"), favorite: false },
          ]
        },
        B: {
          nome: "Treino B (Costas / Bíceps)",
          exercises: [
            { name: "Puxada frente barra aberta", reps: "4x10-12", gif: demoUrl("Puxada frente barra aberta"), favorite: false },
            { name: "Remada baixa", reps: "4x10-12", gif: demoUrl("Remada baixa polia"), favorite: false },
            { name: "Remada cavalinho", reps: "4x10-12", gif: demoUrl("Remada cavalinho"), favorite: false },
            { name: "Rosca direta barra", reps: "3x8-10", gif: demoUrl("Rosca direta barra"), favorite: false },
            { name: "Rosca martelo", reps: "3x10-12", gif: demoUrl("Rosca martelo"), favorite: false },
            { name: "Face pull", reps: "3x12-15", gif: demoUrl("Face pull"), favorite: false },
          ]
        },
        C: {
          nome: "Treino C (Posterior / Glúteo)",
          exercises: [
            { name: "Agachamento sumô com halteres", reps: "4x10-12", gif: demoUrl("Agachamento sumô halteres"), favorite: false },
            { name: "Mesa flexora", reps: "4x10-12", gif: demoUrl("Mesa flexora"), favorite: false },
            { name: "Cadeira flexora", reps: "4x10-12", gif: demoUrl("Cadeira flexora"), favorite: false },
            { name: "Elevação pélvica", reps: "4x10-12", gif: demoUrl("Elevação pélvica"), favorite: false },
            { name: "Cadeira abdutora", reps: "4x12-15", gif: demoUrl("Cadeira abdutora"), favorite: false },
          ]
        },
        D: {
          nome: "Treino D (Peito / Ombro / Tríceps)",
          exercises: [
            { name: "Supino reto máquina", reps: "4x10-12", gif: demoUrl("Supino reto máquina"), favorite: false },
            { name: "Supino inclinado máquina", reps: "3x10-12", gif: demoUrl("Supino inclinado máquina"), favorite: false },
            { name: "Fly peck deck", reps: "3x12-15", gif: demoUrl("Fly peck deck"), favorite: false },
            { name: "Tríceps corda", reps: "3x10-12", gif: demoUrl("Tríceps corda"), favorite: false },
            { name: "Elevação lateral", reps: "3x12-15", gif: demoUrl("Elevação lateral halteres"), favorite: false },
          ]
        },
        E: {
          nome: "Treino E (Perna 2 / Glúteo)",
          exercises: [
            { name: "Agachamento livre", reps: "4x8-10", gif: demoUrl("Agachamento livre barra"), favorite: false },
            { name: "Leg 45º", reps: "4x10-12", gif: demoUrl("Leg 45"), favorite: false },
            { name: "Stiff", reps: "4x8-10", gif: demoUrl("Stiff barra"), favorite: false },
            { name: "Mesa flexora", reps: "3x10-12", gif: demoUrl("Mesa flexora"), favorite: false },
            { name: "Elevação pélvica", reps: "3x10-12", gif: demoUrl("Elevação pélvica"), favorite: false },
          ]
        }
      };

      return JSON.parse(JSON.stringify(DEFAULT_WORKOUTS));
    }

    function enterApp() {
      document.getElementById("login-screen").classList.add("hidden");
      document.getElementById("app-screen").classList.remove("hidden");

      document.getElementById("user-label").textContent =
        "Usuário: " + (currentUser || "");

      // carregar dados do usuário
      logs = loadJSON(getUserKey(LOGS_KEY_BASE), []);
      workouts = loadJSON(getUserKey(WORKOUTS_KEY_BASE), null);
      sessions = loadJSON(getUserKey(SESSIONS_KEY_BASE), []);
      nutritionProfile = loadJSON(getUserKey(NUTRI_PROFILE_KEY_BASE), null);
      meals = loadJSON(getUserKey(MEALS_KEY_BASE), []);

      if (!workouts) {
        workouts = cloneDefaultWorkouts();
        saveJSON(getUserKey(WORKOUTS_KEY_BASE), workouts);
      }

      // Hoje
      document.getElementById("today-date").textContent = fmtDateBR(todayISO());

      // Preenche UI inicial
      selectedWorkout = null;
      currentCardioEntries = [];
      renderWorkoutButtons();
      renderTodayView();
      renderCalendar();
      fillExerciseSelect();
      renderConfigButtons();
      renderConfigPanel();
      renderNutritionProfileUI();
      initNutritionDiary();
      renderSummaryChart();

      // Se vier do login, começa na home
      setMainSection("home");
    }

    // ---------- TEMA (DARK / LIGHT) ----------

    function applyTheme(theme) {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
        document.getElementById("theme-icon").textContent = "☀️";
      } else {
        root.classList.remove("dark");
        document.getElementById("theme-icon").textContent = "🌙";
      }
    }

    function initTheme() {
      const stored = localStorage.getItem(THEME_KEY) || "light";
      applyTheme(stored);
    }

    function toggleTheme() {
      const root = document.documentElement;
      const isDark = root.classList.contains("dark");
      const newTheme = isDark ? "light" : "dark";
      localStorage.setItem(THEME_KEY, newTheme);
      applyTheme(newTheme);
    }

    // ---------- NAVEGAÇÃO PRINCIPAL ----------

    function setMainSection(section) {
      const homeView = document.getElementById("home-view");
      const treinoView = document.getElementById("treino-view");
      const aliView = document.getElementById("alimentacao-view");

      homeView.classList.add("hidden");
      treinoView.classList.add("hidden");
      aliView.classList.add("hidden");

      document.getElementById("nav-home").className =
        "px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700";
      document.getElementById("nav-treino").className =
        "px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700";
      document.getElementById("nav-alimentacao").className =
        "px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700";

      if (section === "home") {
        homeView.classList.remove("hidden");
        document.getElementById("nav-home").className =
          "px-3 py-1 rounded-full bg-primary text-white";
      } else if (section === "treino") {
        treinoView.classList.remove("hidden");
        document.getElementById("nav-treino").className =
          "px-3 py-1 rounded-full bg-primary text-white";
      } else {
        aliView.classList.remove("hidden");
        document.getElementById("nav-alimentacao").className =
          "px-3 py-1 rounded-full bg-primary text-white";
      }
    }

    // ---------- MODO FOCO ----------

    function toggleFocusMode() {
      document.body.classList.toggle("focus-mode");
    }

    // ---------- INICIALIZAÇÃO GERAL ----------

    window.addEventListener("load", () => {
      initTheme();
      document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

      const savedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (savedUser) {
        currentUser = savedUser;
        enterApp();
      }
    });
