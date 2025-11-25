// ---------- TREINO: HISTÓRICO / GRÁFICO EXERCÍCIO ----------

    function fillExerciseSelect() {
      const select = document.getElementById("exercise-select");
      if (!select) return;
      const allNames = new Set(logs.map(l => l.exercise));
      const list = Array.from(allNames).sort();
      select.innerHTML = '<option value="">-- selecione --</option>';
      list.forEach(name => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        select.appendChild(opt);
      });
    }

    function renderExerciseHistoryChart() {
      const select = document.getElementById("exercise-select");
      const name = select.value;
      const container = document.getElementById("exercise-history");

      if (!name) {
        container.innerHTML =
          "<p class='text-slate-500 dark:text-slate-300 italic text-sm'>Selecione um exercício.</p>";
        if (exerciseChart) {
          exerciseChart.destroy();
          exerciseChart = null;
        }
        return;
      }

      const hist = logs
        .filter(l => l.exercise === name)
        .sort((a, b) => a.date.localeCompare(b.date) || a.timestamp - b.timestamp);

      if (!hist.length) {
        container.innerHTML =
          `<p class='text-slate-500 dark:text-slate-300 text-sm'>Nenhum registro ainda para "${name}".</p>`;
        if (exerciseChart) {
          exerciseChart.destroy();
          exerciseChart = null;
        }
        return;
      }

      // Agrupa por dia usando maior carga no dia
      const byDate = {};
      hist.forEach(l => {
        if (!byDate[l.date] || l.weight > byDate[l.date].weight) {
          byDate[l.date] = l;
        }
      });
      const dates = Object.keys(byDate).sort();
      const labels = dates.map(fmtDateBR);
      const data = dates.map(d => byDate[d].weight);

      const ctx = document.getElementById("exercise-chart").getContext("2d");
      if (exerciseChart) exerciseChart.destroy();
      exerciseChart = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: "Carga (kg)",
            data,
            borderWidth: 2,
            tension: 0.2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });

      // Lista textual
      let html = "";
      hist.slice().reverse().forEach(l => {
        html += `
          <div class="border border-slate-200 dark:border-slate-700 rounded p-2 text-xs flex justify-between">
            <div>
              <p class="font-semibold">${l.weight} kg ${l.isPR ? "• PR 🔥" : ""}</p>
              ${l.note ? `<p>${l.note}</p>` : ""}
            </div>
            <span class="text-slate-500 dark:text-slate-300">${fmtDateBR(l.date)} (Treino ${l.workout})</span>
          </div>
        `;
      });
      container.innerHTML = html;
    }

    // ---------- RESUMO GERAL (TREINO + ALIMENTAÇÃO) ----------

    function estimateCardioKcal(cardio) {
      if (!cardio || !cardio.length) return 0;
      let total = 0;
      cardio.forEach(c => {
        const min = c.minutes || 0;
        let factor = 6;
        if (c.intensity === "leve") factor = 5;
        else if (c.intensity === "moderado") factor = 8;
        else if (c.intensity === "forte") factor = 11;
        total += min * factor;
      });
      return total;
    }

    function estimateStrengthKcal(totalMinutes) {
      if (!totalMinutes) return 0;
      return totalMinutes * 6; // aproximação
    }

    function renderSummaryChart() {
      const ctx = document.getElementById("summary-chart");
      const box = document.getElementById("summary-extra");
      if (!ctx || !box) return;

      if (!nutritionProfile) {
        box.innerHTML =
          "<p class='text-xs text-slate-500 dark:text-slate-300'>Defina o perfil de alimentação para ver o resumo.</p>";
        if (summaryChart) {
          summaryChart.destroy();
          summaryChart = null;
        }
        return;
      }

      const today = new Date();
      const days = [];
      for (let i = 13; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const iso = d.toISOString().slice(0, 10);
        days.push(iso);
      }

      const labels = days.map(fmtDateBR);
      const intake = [];
      const expend = [];
      const targetArr = [];

      days.forEach(dateIso => {
        const dayMeals = meals.filter(m => m.date === dateIso);
        const totalIn = dayMeals.reduce((acc, m) => acc + (m.kcal || 0), 0);

        const daySessions = sessions.filter(s => s.date === dateIso);
        let totalStrengthMin = 0;
        let totalCardioKcal = 0;
        daySessions.forEach(s => {
          totalStrengthMin += s.totalTimeMin || 0;
          totalCardioKcal += estimateCardioKcal(s.cardio || []);
        });
        const strengthKcal = estimateStrengthKcal(totalStrengthMin);

        const base = nutritionProfile.tdee || nutritionProfile.targetKcal;
        const totalExp = base + strengthKcal + totalCardioKcal;

        intake.push(totalIn);
        expend.push(Math.round(totalExp));
        targetArr.push(nutritionProfile.targetKcal);
      });

      if (summaryChart) summaryChart.destroy();
      summaryChart = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Ingestão (kcal)",
              data: intake,
              borderWidth: 2,
              tension: 0.2
            },
            {
              label: "Gasto estimado (kcal)",
              data: expend,
              borderWidth: 2,
              borderDash: [4, 2],
              tension: 0.2
            },
            {
              label: "Meta (kcal)",
              data: targetArr,
              borderWidth: 1,
              borderDash: [2, 2],
              tension: 0,
            }
          ]
        },
        options: {
          responsive: true,
          interaction: { mode: "index", intersect: false },
          plugins: { legend: { position: "top" } },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });

      box.innerHTML = `
        <p>Meta diária atual: <strong>${nutritionProfile.targetKcal} kcal</strong></p>
        <p class="text-slate-500 dark:text-slate-300">
          Linhas aproximam o comportamento: não substitui acompanhamento profissional,
          mas te dá uma boa noção do balanço calórico junto com o que você fez de treino e cardio.
        </p>
      `;
    }
