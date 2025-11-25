// Lista básica de alimentos
const FOOD_ITEMS = [
  { label: "2 ovos + 1 pão francês", kcal: 320 },
  { label: "2 ovos mexidos", kcal: 160 },
  { label: "1 pão francês", kcal: 150 },
  { label: "100 g frango grelhado", kcal: 165 },
  { label: "150 g frango grelhado", kcal: 250 },
  { label: "100 g carne moída", kcal: 250 },
  { label: "100 g arroz cozido", kcal: 130 },
  { label: "100 g feijão cozido", kcal: 80 },
  { label: "1 banana média", kcal: 90 },
  { label: "1 colher de sopa requeijão", kcal: 60 },
  { label: "1 colher de sopa aveia (~15 g)", kcal: 55 },
  { label: "1 colher de sopa mel", kcal: 60 },
  { label: "1 scoop whey (30 g)", kcal: 110 },
];

// Helper para montar link de demonstração (YouTube) para templates de exercício
const demoUrlTemplate = (nome) =>
  "https://www.youtube.com/results?search_query=" + encodeURIComponent(nome + " exercício academia");

    // ---------- ALIMENTAÇÃO: PERFIL / META ----------

    function saveNutritionProfile() {
      const sex = document.getElementById("nutri-sex").value;
      const age = parseInt(document.getElementById("nutri-age").value) || 0;
      const height = parseInt(document.getElementById("nutri-height").value) || 0;
      const weight = parseFloat(document.getElementById("nutri-weight").value) || 0;
      const activity = parseFloat(document.getElementById("nutri-activity").value) || 1.2;
      const goal = document.getElementById("nutri-goal").value;

      if (!age || !height || !weight) {
        alert("Preencha idade, altura e peso.");
        return;
      }

      // Mifflin-St Jeor
      let tmb;
      if (sex === "M") {
        tmb = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        tmb = 10 * weight + 6.25 * height - 5 * age - 161;
      }
      const tdee = tmb * activity;

      let target = tdee;
      if (goal === "cut") {
        target = tdee * 0.8; // -20%
      } else if (goal === "bulk") {
        target = tdee * 1.1; // +10%
      }

      nutritionProfile = {
        sex, age, height, weight, activity, goal,
        tmb: Math.round(tmb),
        tdee: Math.round(tdee),
        targetKcal: Math.round(target)
      };
      saveJSON(getUserKey(NUTRI_PROFILE_KEY_BASE), nutritionProfile);
      renderNutritionProfileUI();
      initNutritionDiary();
      renderSummaryChart();
    }

    function renderNutritionProfileUI() {
      const box = document.getElementById("nutri-result");
      if (!nutritionProfile) {
        box.innerHTML =
          "<p class='text-sm text-slate-500 dark:text-slate-300'>Nenhum perfil salvo ainda.</p>";
        return;
      }
      const p = nutritionProfile;
      let goalText = "";
      if (p.goal === "cut") goalText = "Emagrecer (déficit)";
      else if (p.goal === "maintain") goalText = "Manter peso";
      else goalText = "Ganhar massa magra (superávit)";

      box.innerHTML = `
        <p>Sexo: <strong>${p.sex}</strong> • Idade: <strong>${p.age}</strong> • Peso: <strong>${p.weight} kg</strong> • Altura: <strong>${p.height} cm</strong></p>
        <p>TMB estimada: <strong>${p.tmb} kcal</strong></p>
        <p>Gasto diário estimado (TDEE): <strong>${p.tdee} kcal</strong></p>
        <p>Objetivo: <strong>${goalText}</strong></p>
        <p class="mt-1 text-emerald-500">Meta diária sugerida: <strong>${p.targetKcal} kcal</strong></p>
      `;

      // Preencher campos com valores salvos
      document.getElementById("nutri-sex").value = p.sex;
      document.getElementById("nutri-age").value = p.age;
      document.getElementById("nutri-height").value = p.height;
      document.getElementById("nutri-weight").value = p.weight;
      document.getElementById("nutri-activity").value = String(p.activity);
      document.getElementById("nutri-goal").value = p.goal;
    }



    function getDayMeals(dateIso) {
      return meals.filter(m => m.date === dateIso);
    }

    function addMeal() {
      const date = document.getElementById("meal-date").value || todayISO();
      const type = document.getElementById("meal-type").value;
      const desc = document.getElementById("meal-desc").value.trim();
      const kcal = parseInt(document.getElementById("meal-kcal").value) || 0;

      if (!kcal || !desc) {
        alert("Informe descrição e kcal estimada.");
        return;
      }

      meals.push({
        date,
        type,
        desc,
        kcal,
        timestamp: Date.now()
      });
      saveJSON(getUserKey(MEALS_KEY_BASE), meals);

      document.getElementById("meal-desc").value = "";
      document.getElementById("meal-kcal").value = "";

      renderMealsForDate(date);
      renderSummaryChart();
    }

    function deleteMeal(index, dateIso) {
      meals.splice(index, 1);
      saveJSON(getUserKey(MEALS_KEY_BASE), meals);
      renderMealsForDate(dateIso);
      renderSummaryChart();
    }

    function renderMealsForDate(dateIso) {
      const listBox = document.getElementById("meal-list");
      const summaryBox = document.getElementById("meal-summary");
      const targetSpan = document.getElementById("nutri-day-target");

      const dayMeals = getDayMeals(dateIso);
      const total = dayMeals.reduce((acc, m) => acc + (m.kcal || 0), 0);
      const target = nutritionProfile ? nutritionProfile.targetKcal : null;

      if (targetSpan) {
        targetSpan.textContent = `Meta diária: ${target ? target + " kcal" : "-- kcal (defina o perfil)"}`;
      }

      let diffText = "";
      if (target) {
        const diff = total - target;
        if (Math.abs(diff) < 20) {
          diffText = "Praticamente na meta.";
        } else if (diff > 0) {
          diffText = `Acima da meta em ${diff.toFixed(0)} kcal.`;
        } else {
          diffText = `Abaixo da meta em ${Math.abs(diff).toFixed(0)} kcal.`;
        }
      }

      summaryBox.innerHTML = `
        <p>Dia: <strong>${fmtDateBR(dateIso)}</strong></p>
        <p>Total ingerido: <strong>${total} kcal</strong></p>
        ${target ? `<p>Meta: <strong>${target} kcal</strong></p><p>${diffText}</p>` : "<p>Defina o perfil para ver a meta.</p>"}
      `;

      if (!dayMeals.length) {
        listBox.innerHTML =
          "<p class='text-xs text-slate-500 dark:text-slate-300 italic'>Nenhuma refeição registrada neste dia.</p>";
        return;
      }

      let html = "";
      dayMeals.forEach((m, idx) => {
        html += `
          <div class="border border-slate-200 dark:border-slate-700 rounded p-2 text-xs flex justify-between items-center gap-2">
            <div>
              <p class="font-semibold">${m.type}</p>
              <p>${m.desc}</p>
              <p>${m.kcal} kcal</p>
            </div>
            <button class="text-[11px] text-red-500"
                    onclick="deleteMeal(${meals.indexOf(m)}, '${dateIso}')">
              remover
            </button>
          </div>
        `;
      });
      listBox.innerHTML = html;
    }

    // ---------- ALIMENTAÇÃO: TABS ----------

    function switchNutriTab(tab) {
      const ids = ["nutri-profile", "nutri-diary", "nutri-summary"];
      ids.forEach(id => document.getElementById(id).classList.add("hidden"));

      if (tab === "profile") {
        document.getElementById("nutri-profile").classList.remove("hidden");
      } else if (tab === "diary") {
        document.getElementById("nutri-diary").classList.remove("hidden");
      } else {
        document.getElementById("nutri-summary").classList.remove("hidden");
        renderSummaryChart();
      }

      document.getElementById("tab-nutri-profile").className =
        "px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700";
      document.getElementById("tab-nutri-diary").className =
        "px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700";
      document.getElementById("tab-nutri-summary").className =
        "px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700";

      document.getElementById("tab-nutri-" + tab).className =
        "px-3 py-1 rounded-full bg-primary text-white";
    }
