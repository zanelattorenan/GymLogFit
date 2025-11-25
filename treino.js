// ---------- Lista suspensa de exercícios prontos ----------
const EXERCISE_TEMPLATES = [
  // Perna / Glúteo
  { id: "agach-livre",   grupo: "Perna / Glúteo", name: "Agachamento livre",           reps: "4x8-12",           url: demoUrlTemplate("Agachamento livre barra alta") },
  { id: "agach-smith",   grupo: "Perna / Glúteo", name: "Agachamento no smith",        reps: "4x10-12",          url: demoUrlTemplate("Agachamento no smith") },
  { id: "bulgaro",       grupo: "Perna / Glúteo", name: "Agachamento búlgaro",         reps: "3x10 cada perna",  url: demoUrlTemplate("Agachamento búlgaro com banco") },
  { id: "avanco",        grupo: "Perna / Glúteo", name: "Avanço com halteres",         reps: "3x10 cada perna",  url: demoUrlTemplate("Avanço com halteres") },
  { id: "leg45",         grupo: "Perna / Glúteo", name: "Leg 45º",                     reps: "4x10",             url: demoUrlTemplate("Leg press 45") },
  { id: "extensora",     grupo: "Perna / Glúteo", name: "Cadeira extensora",           reps: "3-4x12",           url: demoUrlTemplate("Cadeira extensora") },
  { id: "flex-mesa",     grupo: "Perna / Glúteo", name: "Mesa flexora",                reps: "3-4x10-12",        url: demoUrlTemplate("Mesa flexora deitado") },
  { id: "flex-cadeira",  grupo: "Perna / Glúteo", name: "Cadeira flexora",             reps: "3-4x12",           url: demoUrlTemplate("Cadeira flexora sentado") },
  { id: "abdutora",      grupo: "Perna / Glúteo", name: "Cadeira abdutora",            reps: "3x15",             url: demoUrlTemplate("Cadeira abdutora") },
  { id: "adutora",       grupo: "Perna / Glúteo", name: "Adutora máquina",             reps: "3x15",             url: demoUrlTemplate("Cadeira adutora") },
  { id: "elev-pelvica",  grupo: "Perna / Glúteo", name: "Elevação pélvica",            reps: "4x10-12",          url: demoUrlTemplate("Hip thrust elevação pélvica") },
  { id: "pant-maq",      grupo: "Perna / Glúteo", name: "Panturrilha na máquina",      reps: "4x15-20",          url: demoUrlTemplate("Panturrilha em pé máquina") },
  { id: "pant-smith",    grupo: "Perna / Glúteo", name: "Panturrilha no smith",        reps: "4x15-20",          url: demoUrlTemplate("Panturrilha em pé no smith") },

  // Costas / Bíceps
  { id: "pux-frente",    grupo: "Costas / Bíceps", name: "Puxador frente",             reps: "4x10-12",          url: demoUrlTemplate("Puxada frente barra aberta polia alta") },
  { id: "pux-sup",       grupo: "Costas / Bíceps", name: "Puxador frente supinado",    reps: "4x10-12",          url: demoUrlTemplate("Puxada frente pegada supinada") },
  { id: "rem-curv-bar",  grupo: "Costas / Bíceps", name: "Remada curvada barra",       reps: "4x8-10",           url: demoUrlTemplate("Remada curvada barra") },
  { id: "rem-caval",     grupo: "Costas / Bíceps", name: "Remada cavalinho",           reps: "4x10-12",          url: demoUrlTemplate("Remada cavalinho máquina") },
  { id: "rem-baixa",     grupo: "Costas / Bíceps", name: "Remada baixa",               reps: "4x10-12",          url: demoUrlTemplate("Remada baixa polia") },
  { id: "rosca-direta",  grupo: "Costas / Bíceps", name: "Rosca direta barra",         reps: "3-4x8-12",         url: demoUrlTemplate("Rosca direta barra w") },
  { id: "rosca-alt",     grupo: "Costas / Bíceps", name: "Rosca alternada",            reps: "3x10-12",          url: demoUrlTemplate("Rosca alternada halteres") },
  { id: "rosca-martelo", grupo: "Costas / Bíceps", name: "Rosca martelo",              reps: "3x10-12",          url: demoUrlTemplate("Rosca martelo halteres") },

  // Peito / Ombro / Tríceps
  { id: "sup-reto-bar",  grupo: "Peito / Ombro / Tríceps", name: "Supino reto barra",  reps: "4x8-10",           url: demoUrlTemplate("Supino reto barra") },
  { id: "sup-reto-maq",  grupo: "Peito / Ombro / Tríceps", name: "Supino reto máquina",reps: "4x10-12",          url: demoUrlTemplate("Supino reto na máquina") },
  { id: "sup-incl-hal",  grupo: "Peito / Ombro / Tríceps", name: "Supino inclinado halteres", reps: "3-4x8-12", url: demoUrlTemplate("Supino inclinado halteres") },
  { id: "fly-maq",       grupo: "Peito / Ombro / Tríceps", name: "Fly máquina (peck deck)", reps: "3-4x10-12",   url: demoUrlTemplate("Fly peck deck") },
  { id: "desenv-hal",    grupo: "Peito / Ombro / Tríceps", name: "Desenvolvimento com halteres", reps: "3-4x8-12", url: demoUrlTemplate("Desenvolvimento ombro halteres sentado") },
  { id: "ele-lateral",   grupo: "Peito / Ombro / Tríceps", name: "Elevação lateral",   reps: "3-4x12-15",        url: demoUrlTemplate("Elevação lateral ombro halteres") },
  { id: "tric-corda",    grupo: "Peito / Ombro / Tríceps", name: "Tríceps corda polia alta", reps: "3-4x10-12",  url: demoUrlTemplate("Tríceps corda polia alta") },
  { id: "tric-testa",    grupo: "Peito / Ombro / Tríceps", name: "Tríceps testa",      reps: "3x10-12",          url: demoUrlTemplate("Tríceps testa barra w") },
  { id: "merg-banco",    grupo: "Peito / Ombro / Tríceps", name: "Mergulho no banco",  reps: "3x10-15",          url: demoUrlTemplate("Mergulho banco tríceps") },

  // Core / Abdômen
  { id: "abd-supra",     grupo: "Core / Abdômen", name: "Abdominal supra",             reps: "3-4x15-20",        url: demoUrlTemplate("Abdominal supra no solo") },
  { id: "abd-infra",     grupo: "Core / Abdômen", name: "Abdominal infra",             reps: "3-4x15-20",        url: demoUrlTemplate("Abdominal infra no banco") },
  { id: "abd-obliquo",   grupo: "Core / Abdômen", name: "Abdominal oblíquo",           reps: "3-4x20 totais",    url: demoUrlTemplate("Abdominal oblíquo solo") },
  { id: "prancha",       grupo: "Core / Abdômen", name: "Prancha isométrica",          reps: "3x30-40s",         url: demoUrlTemplate("Prancha isométrica abdômen") },
  { id: "prancha-lat",   grupo: "Core / Abdômen", name: "Prancha lateral",             reps: "3x20-30s cada lado", url: demoUrlTemplate("Prancha lateral isométrica") },
];

// Preenche o menu suspenso com exercícios prontos na aba de configuração
function initExerciseTemplates() {
  const sel = document.getElementById("template-select");
  if (!sel) return;

  sel.innerHTML = `<option value="">-- selecione um exercício --</option>`;

  EXERCISE_TEMPLATES.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.id;
    opt.textContent = `${t.grupo} — ${t.name} (${t.reps})`;
    sel.appendChild(opt);
  });
}

// Ao selecionar um exercício pronto, preenche o formulário de configuração
function applyExerciseTemplate() {
  const sel = document.getElementById("template-select");
  if (!sel) return;
  const id = sel.value;
  if (!id) return;

  const t = EXERCISE_TEMPLATES.find(x => x.id === id);
  if (!t) return;

  const nameInput = document.getElementById("cfg-ex-name");
  const repsInput = document.getElementById("cfg-ex-reps");
  const gifInput  = document.getElementById("cfg-ex-gif");

  if (nameInput) nameInput.value = t.name;
  if (repsInput) repsInput.value = t.reps;
  if (gifInput)  gifInput.value  = t.url || "";
}


// Preenche o menu suspenso de alimentos
function populateFoodOptions() {
  const select = document.getElementById("meal-food");
  if (!select) return;

  // Limpa opções
  select.innerHTML = "";

  // Placeholder
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Selecione o alimento";
  placeholder.disabled = true;
  placeholder.selected = true;
  select.appendChild(placeholder);

  // Opções vindas da tabela
  FOOD_ITEMS.forEach((item, idx) => {
    const opt = document.createElement("option");
    opt.value = String(idx); // índice do array
    opt.textContent = `${item.label} (~${item.kcal} kcal)`;
    select.appendChild(opt);
  });

  // Opção para alimento personalizado
  const customOpt = document.createElement("option");
  customOpt.value = "custom";
  customOpt.textContent = "Outro alimento (preencher manualmente)";
  select.appendChild(customOpt);
}

// Quando o usuário troca o alimento no select
function onMealFoodChange() {
  const select = document.getElementById("meal-food");
  const descInput = document.getElementById("meal-desc");
  const kcalInput = document.getElementById("meal-kcal");
  if (!select || !descInput || !kcalInput) return;

  const value = select.value;

  // Nada selecionado
  if (!value) {
    descInput.value = "";
    kcalInput.value = "";
    descInput.readOnly = true;
    return;
  }

  // Opção "Outro alimento"
  if (value === "custom") {
    descInput.value = "";
    kcalInput.value = "";
    descInput.readOnly = false;   // pode digitar o que comeu
    kcalInput.readOnly = false;   // e colocar a kcal manual
    descInput.focus();
    return;
  }

  // Uma opção padrão
  const index = parseInt(value, 10);
  const item = FOOD_ITEMS[index];
  if (!item) return;

  descInput.readOnly = true;      // travamos a descrição para bater com o item
  descInput.value = item.label;
  kcalInput.readOnly = false;     // kcal pode ser ajustada se a porção for diferente
  kcalInput.value = item.kcal;
}

// Inicialização do diário
function initNutritionDiary() {
  // Sempre preenche o menu de alimentos
  populateFoodOptions();

  // Se existir um campo de data, usa para o diário
  const dateInput = document.getElementById("meal-date");
  if (dateInput) {
    dateInput.value = todayISO();
    renderMealsForDate(dateInput.value);
  }
}

    

    // Timer treino de hoje
    let timerInterval = null;
    let timerStart = null;
    let timerAccumulatedMs = 0;

    // Cardio do dia (memória só da tela; salvo ao salvar treino)
    let currentCardioEntries = [];

    // Charts
    let exerciseChart = null;
    let summaryChart = null;

    // ---------- TREINO: TABS INTERNAS ----------

    function switchTreinoTab(tab) {
      const ids = ["view-today", "view-calendar", "view-progress", "view-config"];
      ids.forEach(id => document.getElementById(id).classList.add("hidden"));

      if (tab === "today") {
        document.getElementById("view-today").classList.remove("hidden");
      } else if (tab === "calendar") {
        document.getElementById("view-calendar").classList.remove("hidden");
        renderCalendar();
      } else if (tab === "progress") {
        document.getElementById("view-progress").classList.remove("hidden");
        fillExerciseSelect();
        renderExerciseHistoryChart();
      } else {
        document.getElementById("view-config").classList.remove("hidden");
        renderConfigButtons();
        renderConfigPanel();
      }

      document.getElementById("tab-today").className =
        "px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700";
      document.getElementById("tab-calendar").className =
        "px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700";
      document.getElementById("tab-progress").className =
        "px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700";
      document.getElementById("tab-config").className =
        "px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700";

      document.getElementById("tab-" + tab).className =
        "px-3 py-1 rounded-full bg-primary text-white";
    }

    // ---------- TREINO: TIMER ----------

    function updateTimerDisplay() {
      const totalMs = timerAccumulatedMs + (timerStart ? (Date.now() - timerStart) : 0);
      const totalSec = Math.floor(totalMs / 1000);
      const min = String(Math.floor(totalSec / 60)).padStart(2, "0");
      const sec = String(totalSec % 60).padStart(2, "0");
      document.getElementById("timer-display").textContent = `${min}:${sec}`;
    }

    function startTimer() {
      if (timerStart) return;
      timerStart = Date.now();
      timerInterval = setInterval(updateTimerDisplay, 1000);
    }

    function stopTimer() {
      if (!timerStart) return;
      const now = Date.now();
      timerAccumulatedMs += now - timerStart;
      timerStart = null;
      clearInterval(timerInterval);
      updateTimerDisplay();
      // Joga para o campo de minutos
      const minutes = Math.round(timerAccumulatedMs / 60000);
      document.getElementById("total-time-input").value = minutes;
    }

    function resetTimer() {
      clearInterval(timerInterval);
      timerInterval = null;
      timerStart = null;
      timerAccumulatedMs = 0;
      updateTimerDisplay();
      document.getElementById("total-time-input").value = "";
    }

    // ---------- TREINO: MOOD / HUMOR ----------

    function selectMood(btn) {
      const moodButtons = document.querySelectorAll(".mood-btn");
      moodButtons.forEach(b => b.classList.remove("mood-btn-active"));
      btn.classList.add("mood-btn-active");
      document.getElementById("mood-input").value = btn.dataset.mood || "";
    }

    // ---------- TREINO: CARDIO ----------

    function renderCardioList() {
      const container = document.getElementById("cardio-list");
      if (!currentCardioEntries.length) {
        container.innerHTML =
          "<p class='text-slate-500 dark:text-slate-300 italic'>Nenhum cardio registrado ainda.</p>";
        return;
      }
      container.innerHTML = "";
      currentCardioEntries.forEach((c, idx) => {
        const div = document.createElement("div");
        div.className = "flex justify-between items-center gap-2 border border-slate-200 dark:border-slate-700 rounded px-2 py-1";
        const dist = c.distanceKm ? ` • ${c.distanceKm} km` : "";
        div.innerHTML = `
          <span>${c.type} • ${c.minutes} min${dist} • ${c.intensity}</span>
          <button class="text-[11px] text-red-500" onclick="removeCardioEntry(${idx})">remover</button>
        `;
        container.appendChild(div);
      });
    }

    function addCardioEntry() {
      const type = document.getElementById("cardio-type").value;
      const minutes = parseInt(document.getElementById("cardio-minutes").value) || 0;
      const distance = parseFloat(document.getElementById("cardio-distance").value) || 0;
      const intensity = document.getElementById("cardio-intensity").value;

      if (!minutes) {
        alert("Informe os minutos de cardio.");
        return;
      }
      currentCardioEntries.push({
        type,
        minutes,
        distanceKm: distance > 0 ? distance : null,
        intensity
      });
      document.getElementById("cardio-minutes").value = "";
      document.getElementById("cardio-distance").value = "";
      renderCardioList();
    }

    function removeCardioEntry(index) {
      currentCardioEntries.splice(index, 1);
      renderCardioList();
    }

    // ---------- TREINO: WORKOUTS / EXERCÍCIOS ----------

    function renderWorkoutButtons() {
      const container = document.getElementById("workout-buttons");
      const configContainer = document.getElementById("config-workout-buttons");
      container.innerHTML = "";
      configContainer.innerHTML = "";

      const letters = Object.keys(workouts).sort();
      if (!letters.length) {
        container.innerHTML = "<p class='text-xs text-slate-500 dark:text-slate-300'>Nenhum treino definido.</p>";
        return;
      }

      letters.forEach(letter => {
        const wo = workouts[letter];

        const btn = document.createElement("button");
        btn.className =
          "px-3 py-1 rounded-full text-xs border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700";
        if (selectedWorkout === letter) {
          btn.classList.add("bg-primary", "text-white");
        } else {
          btn.classList.add("bg-slate-50", "dark:bg-slate-800");
        }
        btn.textContent = letter;
        btn.onclick = () => {
          selectedWorkout = letter;
          renderWorkoutButtons();
          renderTodayView();
        };
        container.appendChild(btn);

        const cfgBtn = document.createElement("button");
        cfgBtn.className =
          "px-3 py-1 rounded-full text-xs border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700";
        cfgBtn.textContent = letter;
        cfgBtn.onclick = () => {
          configWorkout = letter;
          renderConfigPanel();
        };
        configContainer.appendChild(cfgBtn);
      });
    }

    // Renderiza botões de treinos também na aba de configuração
    function renderConfigButtons() {
      renderWorkoutButtons();
    }

    function renderTodayView() {
      const container = document.getElementById("exercise-list");
      const btnSave = document.getElementById("save-today-btn");
      showTodayMsg("");

      if (!selectedWorkout || !workouts[selectedWorkout]) {
        container.innerHTML =
          "<p class='text-slate-500 dark:text-slate-300 text-sm italic'>Selecione um treino.</p>";
        btnSave.classList.add("hidden");
        return;
      }

      const workout = workouts[selectedWorkout];
      const today = todayISO();

      // Reseta cardio ao trocar treino/dia
      currentCardioEntries = [];
      renderCardioList();

      // Preencher campos básicos se existir sessão
      const existingSession = sessions.find(
        s => s.date === today && s.workout === selectedWorkout
      );
      if (existingSession) {
        document.getElementById("total-time-input").value =
          existingSession.totalTimeMin ?? "";
        document.getElementById("sleep-input").value =
          existingSession.sleepQuality ?? 0;
        document.getElementById("energy-input").value =
          existingSession.energyLevel ?? 0;
        document.getElementById("mood-input").value =
          existingSession.moodEmoji || "";
        currentCardioEntries = existingSession.cardio || [];
        renderCardioList();

        // Selecionar emoji salvo
        const moodButtons = document.querySelectorAll(".mood-btn");
        moodButtons.forEach(b => {
          if (b.dataset.mood === existingSession.moodEmoji) {
            b.classList.add("mood-btn-active");
          } else {
            b.classList.remove("mood-btn-active");
          }
        });
      } else {
        document.getElementById("total-time-input").value = "";
        document.getElementById("sleep-input").value = 0;
        document.getElementById("energy-input").value = 0;
        document.getElementById("mood-input").value = "";
        const moodButtons = document.querySelectorAll(".mood-btn");
        moodButtons.forEach(b => b.classList.remove("mood-btn-active"));
        currentCardioEntries = [];
        renderCardioList();
      }

      // Último registro por exercício (geral) para exibir "Última carga"
      const html = workout.exercises.map(ex => {
        const name = ex.name;
        const allLogs = logs.filter(l => l.exercise === name)
          .sort((a, b) => b.timestamp - a.timestamp);
        const last = allLogs[0];

        // PR mais recente (caso exista)
        const lastIsPR = last && last.isPR;

        const lastText = last
          ? `Última carga: ${last.weight} kg (${fmtDateBR(last.date)}, Treino ${last.workout})`
          : "Sem histórico ainda";

        const fav = ex.favorite ? "★" : "☆";

        return `
          <div class="border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm space-y-1" data-ex="${name}">
            <div class="flex justify-between items-start gap-2">
              <div>
                <div class="flex items-center gap-2">
                  <button type="button"
                          class="font-semibold underline decoration-dotted"
                          onclick="openGif('${name.replace(/'/g,"\\'")}', '${(ex.gif || "").replace(/'/g,"\\'")}')">
                    ${name}
                  </button>
                  <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700">${ex.reps}</span>
                </div>
                <p class="text-[11px] mt-1 ${lastIsPR ? "text-emerald-500" : "text-slate-500 dark:text-slate-300"}">
                  ${lastText}${lastIsPR ? " • PR 🔥" : ""}
                </p>
              </div>
              <button type="button" class="text-xs" onclick="toggleExerciseFavorite('${selectedWorkout}','${name.replace(/'/g,"\\'")}')">
                ${fav}
              </button>
            </div>
            <div class="grid grid-cols-2 gap-2 text-xs mt-2">
              <div>
                <label class="block mb-1">Carga (kg)</label>
                <input type="number" step="0.5" class="w-full border border-slate-300 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700"
                       value="">
              </div>
              <div>
                <label class="block mb-1">Obs.</label>
                <input type="text" class="w-full border border-slate-300 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700"
                       placeholder="opcional">
              </div>
            </div>
          </div>
        `;
      }).join("");

      container.innerHTML = html;
      btnSave.classList.remove("hidden");
    }

    function toggleExerciseFavorite(workoutLetter, exerciseName) {
      const w = workouts[workoutLetter];
      if (!w) return;
      const ex = w.exercises.find(e => e.name === exerciseName);
      if (!ex) return;
      ex.favorite = !ex.favorite;
      saveJSON(getUserKey(WORKOUTS_KEY_BASE), workouts);
      if (workoutLetter === selectedWorkout) {
        renderTodayView();
      }
      if (workoutLetter === configWorkout) {
        renderConfigPanel();
      }
    }

    function openGif(name, url) {
      if (!url) {
        alert("Nenhum vídeo cadastrado para: " + name + ". Pesquise no YouTube pelo nome do exercício.");
        return;
      }
      window.open(url, "_blank");
    }

    // ---------- TREINO: SALVAR HOJE (LOGS + SESSÃO) ----------

    function saveToday() {
      if (!selectedWorkout) {
        showTodayMsg("Selecione um treino antes de salvar.");
        return;
      }
      const date = todayISO();
      const items = document.querySelectorAll("#exercise-list [data-ex]");
      const newLogs = [];

      // Prepara PR comparando com histórico ANTES de limpar dia
      items.forEach(div => {
        const name = div.dataset.ex;
        const inputs = div.querySelectorAll("input");
        const weight = parseFloat(inputs[0].value.replace(",", ".")) || 0;
        const note = inputs[1].value.trim();
        if (weight > 0 || note) {
          const prevLogsForExercise = logs.filter(l => l.exercise === name);
          const prevMax = prevLogsForExercise.length
            ? Math.max(...prevLogsForExercise.map(l => l.weight || 0))
            : 0;
          const isPR = weight > prevMax && weight > 0;
          newLogs.push({
            date,
            workout: selectedWorkout,
            exercise: name,
            weight,
            note,
            isPR,
            timestamp: Date.now(),
          });
        }
      });

      const totalTimeMin = parseInt(document.getElementById("total-time-input").value) || 0;
      const sleepQuality = parseInt(document.getElementById("sleep-input").value) || 0;
      const energyLevel = parseInt(document.getElementById("energy-input").value) || 0;
      const moodEmoji = document.getElementById("mood-input").value || "";

      const hasSessionInfo =
        totalTimeMin > 0 ||
        sleepQuality > 0 ||
        energyLevel > 0 ||
        moodEmoji ||
        currentCardioEntries.length > 0;

      if (!newLogs.length && !hasSessionInfo) {
        showTodayMsg("Nenhum dado preenchido (carga/obs ou sessão/cardio).");
        return;
      }

      // Remover registros anteriores do mesmo dia+treino (para não duplicar)
      logs = logs.filter(l => !(l.date === date && l.workout === selectedWorkout));
      logs = logs.concat(newLogs);
      saveJSON(getUserKey(LOGS_KEY_BASE), logs);

      // Atualiza sessão do dia
      sessions = sessions.filter(s => !(s.date === date && s.workout === selectedWorkout));
      if (hasSessionInfo) {
        sessions.push({
          date,
          workout: selectedWorkout,
          totalTimeMin: totalTimeMin || null,
          sleepQuality,
          energyLevel,
          moodEmoji,
          cardio: currentCardioEntries.slice(),
          timestamp: Date.now(),
        });
      }
      saveJSON(getUserKey(SESSIONS_KEY_BASE), sessions);

      showTodayMsg(`Treino ${selectedWorkout} salvo.`);
      renderCalendar();
      fillExerciseSelect();
      renderExerciseHistoryChart();
      renderSummaryChart();
    }

    // ---------- TREINO: CALENDÁRIO / RESUMO MENSAL ----------

    function changeMonth(delta) {
      currentMonth.setMonth(currentMonth.getMonth() + delta);
      renderCalendar();
    }

    function renderCalendar() {
      const grid = document.getElementById("calendar-grid");
      const label = document.getElementById("month-label");
      const filter = document.getElementById("calendar-filter").value || "";

      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth(); // 0-11
      const firstDay = new Date(year, month, 1);
      const startWeekDay = firstDay.getDay(); // 0 domingo
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      label.textContent = firstDay.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

      grid.innerHTML = "";

      for (let i = 0; i < startWeekDay; i++) {
        const div = document.createElement("div");
        grid.appendChild(div);
      }

      const today = todayISO();
      const logsByDay = {};
      logs.forEach(l => {
        if (!logsByDay[l.date]) logsByDay[l.date] = new Set();
        logsByDay[l.date].add(l.workout);
      });

      for (let d = 1; d <= daysInMonth; d++) {
        const dayIso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        const div = document.createElement("div");
        div.className =
          "border border-slate-200 dark:border-slate-700 rounded px-1 py-2 text-center cursor-pointer text-xs hover:bg-slate-100 dark:hover:bg-slate-700";
        const dayTrainings = logsByDay[dayIso] ? Array.from(logsByDay[dayIso]) : [];
        let labelWorkout = "";
        if (dayTrainings.length === 1) labelWorkout = dayTrainings[0];
        else if (dayTrainings.length > 1) labelWorkout = "+";

        // filtro
        if (filter && dayTrainings.length && !dayTrainings.includes(filter)) {
          labelWorkout = "";
        }

        if (dayIso === today) {
          div.classList.add("bg-slate-200", "dark:bg-slate-600");
        }

        div.onclick = () => showDayDetails(dayIso);

        div.innerHTML = `
          <div class="font-semibold mb-1">${d}</div>
          <div class="text-xs">${labelWorkout}</div>
        `;
        grid.appendChild(div);
      }

      // resumo do mês
      renderMonthSummary(year, month);
    }

    function showDayDetails(dateIso) {
      lastDayDetailsDate = dateIso;
      const box = document.getElementById("day-details");
      const title = document.getElementById("day-details-title");
      const body = document.getElementById("day-details-body");

      title.textContent = `Detalhes de ${fmtDateBR(dateIso)}`;
      const dayLogs = logs
        .filter(l => l.date === dateIso)
        .sort((a, b) => a.workout.localeCompare(b.workout) || a.exercise.localeCompare(b.exercise));

      const daySessions = sessions.filter(s => s.date === dateIso);

      if (!dayLogs.length && !daySessions.length) {
        body.innerHTML = "<p class='text-xs text-slate-500 dark:text-slate-300 italic'>Nenhum registro neste dia.</p>";
        box.classList.remove("hidden");
        return;
      }

      let html = "";

      daySessions.forEach(s => {
        const cardioText = (s.cardio || []).map(c => {
          const dist = c.distanceKm ? ` • ${c.distanceKm} km` : "";
          return `${c.type} • ${c.minutes} min${dist} • ${c.intensity}`;
        }).join("<br>");
        html += `
          <div class="border border-slate-200 dark:border-slate-700 rounded p-2 mb-2 text-xs">
            <p class="font-semibold mb-1">Treino ${s.workout}</p>
            <p>Tempo de treino: ${s.totalTimeMin ? s.totalTimeMin + " min" : "não informado"}</p>
            <p>Sono: ${s.sleepQuality || 0} • Energia: ${s.energyLevel || 0} • Humor: ${s.moodEmoji || "-"}</p>
            ${cardioText ? `<p class="mt-1">Cardio:<br>${cardioText}</p>` : ""}
          </div>
        `;
      });

      if (dayLogs.length) {
        html += `<div class="border border-slate-200 dark:border-slate-700 rounded p-2 text-xs">
          <p class="font-semibold mb-1">Exercícios</p>
        `;
        dayLogs.forEach(l => {
          html += `
            <p>
              <span class="font-semibold">[${l.workout}] ${l.exercise}</span> •
              ${l.weight} kg
              ${l.note ? " • " + l.note : ""}
              ${l.isPR ? " • PR 🔥" : ""}
            </p>
          `;
        });
        html += "</div>";
      }

      body.innerHTML = html;
      box.classList.remove("hidden");
    }

    function deleteDayLogs() {
      if (!lastDayDetailsDate) return;
      if (!confirm("Excluir todos os registros deste dia?")) return;

      logs = logs.filter(l => l.date !== lastDayDetailsDate);
      sessions = sessions.filter(s => s.date !== lastDayDetailsDate);
      saveJSON(getUserKey(LOGS_KEY_BASE), logs);
      saveJSON(getUserKey(SESSIONS_KEY_BASE), sessions);

      document.getElementById("day-details").classList.add("hidden");
      renderCalendar();
      fillExerciseSelect();
      renderExerciseHistoryChart();
      renderSummaryChart();
    }

    function renderMonthSummary(year, monthIndex) {
      const startIso = `${year}-${String(monthIndex + 1).padStart(2, "0")}-01`;
      const endIso = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(new Date(year, monthIndex + 1, 0).getDate()).padStart(2, "0")}`;

      const monthLogs = logs.filter(l => l.date >= startIso && l.date <= endIso);
      const monthSessions = sessions.filter(s => s.date >= startIso && s.date <= endIso);

      const daysSet = new Set(monthLogs.map(l => l.date).concat(monthSessions.map(s => s.date)));
      const totalDays = daysSet.size;

      const countByWorkout = {};
      monthLogs.forEach(l => {
        countByWorkout[l.workout] = (countByWorkout[l.workout] || 0) + 1;
      });

      let totalMinutes = 0;
      let totalCardioMin = 0;
      monthSessions.forEach(s => {
        totalMinutes += s.totalTimeMin || 0;
        (s.cardio || []).forEach(c => totalCardioMin += c.minutes || 0);
      });

      let html = "";
      html += `<p>Dias com treino: <strong>${totalDays}</strong></p>`;
      const keys = Object.keys(countByWorkout).sort();
      if (keys.length) {
        html += "<p>Treinos realizados:</p><ul class='list-disc list-inside'>";
        keys.forEach(k => {
          html += `<li>Treino ${k}: ${countByWorkout[k]} registros de exercício</li>`;
        });
        html += "</ul>";
      } else {
        html += "<p class='text-slate-500 dark:text-slate-300'>Nenhum treino neste mês.</p>";
      }
      html += `<p class="mt-1">Tempo total registrado: <strong>${totalMinutes}</strong> min (musculação) • <strong>${totalCardioMin}</strong> min (cardio)</p>`;

      document.getElementById("month-summary").innerHTML = html;
    }

    // ---------- TREINO: CONFIGURAR TREINOS ----------

    let configWorkout = null;

    function renderConfigPanel() {
      const panel = document.getElementById("config-panel");
      if (!configWorkout || !workouts[configWorkout]) {
        panel.innerHTML =
          "<p class='text-sm text-slate-500 dark:text-slate-300'>Selecione um treino para editar.</p>";
        return;
      }
      const w = workouts[configWorkout];

      let html = `
        <div class="flex justify-between items-center gap-2 mb-3">
          <div>
            <p class="text-sm font-semibold">Treino ${configWorkout}</p>
            <input id="cfg-name" type="text"
                   class="mt-1 text-xs w-full border border-slate-300 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700"
                   value="${w.nome || ""}" placeholder="Nome do treino (opcional)">
          </div>
          <button class="text-xs text-red-500 underline" onclick="deleteCurrentWorkout()">
            Excluir treino
          </button>
        </div>
      `;

      // Dropdown de exercícios prontos
      html += `
        <div class="text-xs mb-2">
          <label class="block mb-1">Escolher exercício pronto</label>
          <select id="template-select"
                  class="w-full border border-slate-300 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700 text-xs"
                  onchange="applyExerciseTemplate()">
            <option value="">-- selecione um exercício --</option>
          </select>
        </div>
      `;

      html += `
        <div class="border border-dashed border-slate-300 dark:border-slate-600 rounded p-2 mb-3 text-xs space-y-2">
          <p class="font-semibold">Adicionar / editar exercício</p>
          <div class="grid md:grid-cols-3 gap-2">
            <input id="cfg-ex-name" type="text" placeholder="Nome"
                   class="border border-slate-300 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700">
            <input id="cfg-ex-reps" type="text" placeholder="Séries x reps (ex: 4x10-12)"
                   class="border border-slate-300 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700">
            <input id="cfg-ex-gif" type="text" placeholder="URL vídeo/GIF (opcional)"
                   class="border border-slate-300 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700">
          </div>
          <div class="flex justify-end gap-2">
            <button class="text-xs border border-slate-300 dark:border-slate-600 rounded px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700"
                    onclick="clearConfigExerciseForm()">
              Limpar
            </button>
            <button class="text-xs bg-secondary text-white rounded px-3 py-1"
                    onclick="addOrUpdateExercise()">
              Salvar exercício
            </button>
          </div>
        </div>
      `;

      if (!w.exercises || !w.exercises.length) {
        html += `<p class="text-xs text-slate-500 dark:text-slate-300">Nenhum exercício neste treino.</p>`;
      } else {
        html += `<div class="space-y-2 text-xs">`;
        w.exercises.forEach((ex, idx) => {
          html += `
            <div class="border border-slate-200 dark:border-slate-700 rounded p-2 flex justify-between items-center gap-2">
              <div>
                <p class="font-semibold">${ex.name}</p>
                <p>${ex.reps || ""}</p>
                ${ex.gif ? `<p class="text-[11px] text-slate-500 dark:text-slate-300 truncate max-w-xs">Link: ${ex.gif}</p>` : ""}
              </div>
              <div class="flex flex-col items-end gap-1">
                <button class="text-[11px]" onclick="toggleExerciseFavorite('${configWorkout}','${ex.name.replace(/'/g,"\\'")}')">
                  ${ex.favorite ? "★ Favorito" : "☆ Favorito"}
                </button>
                <div class="flex gap-1">
                  <button class="text-[11px] text-blue-500"
                          onclick="loadExerciseIntoForm(${idx})">Editar</button>
                  <button class="text-[11px] text-red-500"
                          onclick="deleteExercise(${idx})">Remover</button>
                </div>
              </div>
            </div>
          `;
        });
        html += `</div>`;
      }

      panel.innerHTML = html;

      // Preenche o select de templates depois que o HTML foi injetado
      initExerciseTemplates();
    }

    let editExerciseIndex = null;

    function clearConfigExerciseForm() {
      document.getElementById("cfg-ex-name").value = "";
      document.getElementById("cfg-ex-reps").value = "";
      document.getElementById("cfg-ex-gif").value = "";
      editExerciseIndex = null;
    }

    function addOrUpdateExercise() {
      if (!configWorkout || !workouts[configWorkout]) return;
      const w = workouts[configWorkout];
      const name = document.getElementById("cfg-ex-name").value.trim();
      const reps = document.getElementById("cfg-ex-reps").value.trim();
      const gif = document.getElementById("cfg-ex-gif").value.trim();

      if (!name) {
        alert("Informe o nome do exercício.");
        return;
      }

      if (!w.exercises) w.exercises = [];

      if (editExerciseIndex !== null) {
        const ex = w.exercises[editExerciseIndex];
        ex.name = name;
        ex.reps = reps;
        ex.gif = gif;
      } else {
        w.exercises.push({ name, reps, gif, favorite: false });
      }
      w.nome = document.getElementById("cfg-name").value.trim() || w.nome;

      saveJSON(getUserKey(WORKOUTS_KEY_BASE), workouts);
      clearConfigExerciseForm();
      renderConfigPanel();
      renderWorkoutButtons();
    }

    function loadExerciseIntoForm(index) {
      if (!configWorkout || !workouts[configWorkout]) return;
      const w = workouts[configWorkout];
      const ex = w.exercises[index];
      document.getElementById("cfg-ex-name").value = ex.name || "";
      document.getElementById("cfg-ex-reps").value = ex.reps || "";
      document.getElementById("cfg-ex-gif").value = ex.gif || "";
      editExerciseIndex = index;
    }

    function deleteExercise(index) {
      if (!configWorkout || !workouts[configWorkout]) return;
      const w = workouts[configWorkout];
      if (!confirm("Remover este exercício do treino?")) return;
      w.exercises.splice(index, 1);
      saveJSON(getUserKey(WORKOUTS_KEY_BASE), workouts);
      renderConfigPanel();
      renderWorkoutButtons();
    }

    function promptAddWorkout() {
      const letter = prompt("Informe a letra do novo treino (A-I):");
      if (!letter) return;
      const l = letter.trim().toUpperCase();
      if (!/^[A-I]$/.test(l)) {
        alert("Apenas uma letra de A a I.");
        return;
      }
      if (workouts[l]) {
        alert("Já existe um treino com essa letra.");
        return;
      }
      const name = prompt("Nome do treino (opcional):") || `Treino ${l}`;
      workouts[l] = { nome: name, exercises: [] };
      saveJSON(getUserKey(WORKOUTS_KEY_BASE), workouts);
      configWorkout = l;
      renderWorkoutButtons();
      renderConfigPanel();
    }

    function deleteCurrentWorkout() {
      if (!configWorkout || !workouts[configWorkout]) return;
      const letter = configWorkout;
      if (!confirm(`Excluir definitivamente o treino ${letter}? Os registros antigos continuam no histórico.`)) {
        return;
      }
      delete workouts[letter];
      saveJSON(getUserKey(WORKOUTS_KEY_BASE), workouts);
      if (selectedWorkout === letter) {
        selectedWorkout = null;
        renderTodayView();
      }
      configWorkout = null;
      renderWorkoutButtons();
      renderConfigPanel();
    }
