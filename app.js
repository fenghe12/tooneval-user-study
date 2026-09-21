// ============ ToonEval 五维定义（含逐档锚点，来自 ToonEval_scoring_rules v12） ============
const NODE_DEFINITIONS = [
  {
    id: "S",
    name: { en: "Artistic Style", zh: "绘制风格" },
    question: {
      en: "Does the generated video keep the same visible rendering as the GT: outlines, color blocks, shadow edges, texture, highlights, and material?",
      zh: "生成视频是否保持与 GT 相同的可见绘制方式：轮廓线、色块、阴影边缘、纹理、高光和材质？",
    },
    anchors: {
      5: { en: "All rendering features match the GT.", zh: "对应绘制特征与 GT 一致。" },
      4: { en: "Only local, slight softening.", zh: "仅局部轻微软化。" },
      3: { en: "One major rendering feature changed.", zh: "一项主要绘制特征改变。" },
      2: { en: "Multiple major rendering features changed.", zh: "多数重要绘制特征改变。" },
      1: { en: "The rendering style was replaced (e.g., cartoon turned photoreal).", zh: "画法被替换（如卡通变成写实照片感）。" },
    },
    noHint: {
      en: "Choose No if the rendering style was replaced or multiple major features changed.",
      zh: "若画法被替换或多数重要绘制特征改变，选 No。",
    },
  },
  {
    id: "D",
    name: { en: "Character Design", zh: "角色设计" },
    question: {
      en: "Does the generated video keep the same character design as the GT: face shape, proportions, and the shape and layout of facial features?",
      zh: "生成视频是否保持与 GT 相同的角色设计：脸型、比例、五官形状和布局？",
    },
    anchors: {
      5: { en: "The same design as the GT.", zh: "与 GT 同一设计。" },
      4: { en: "Only slight geometric deviation.", zh: "仅轻微几何偏差。" },
      3: { en: "One major structural change.", zh: "一项主要结构变化。" },
      2: { en: "Multiple obvious structural changes.", zh: "多项结构明显变化。" },
      1: { en: "The character or facial-feature design was replaced.", zh: "角色或五官设计被替换。" },
    },
    noHint: {
      en: "Severe ghosting, a swapped face, or unreadable structure must not count as Yes.",
      zh: "严重重影、替换脸或模糊到无法确认结构时，不能算一致。",
    },
  },
  {
    id: "C",
    name: { en: "Part Configuration", zh: "部件配置" },
    question: {
      en: "Are all parts present with the right count and the same drawing representation as the GT (extra parts, missing parts, wrong count, dot vs line vs flat vs volume)?",
      zh: "部件是否齐全、数量正确、且画法表示与 GT 相同（有没有多画/漏画/数量错/点线色块立体的表示类别改变）？",
    },
    anchors: {
      5: { en: "Presence, count, and drawing representation all confirmed consistent with the GT.", zh: "存在、数量、画法表示均确认与 GT 一致。" },
      4: { en: "All parts present with correct count; only a minor representation detail is questionable.", zh: "部件齐全、数量正确，仅个别表示细节存疑。" },
      3: { en: "One configuration conflict (e.g., a part's drawing representation changed).", zh: "一项配置冲突（如某部件的画法表示类别改变）。" },
      2: { en: "Multiple configuration conflicts.", zh: "多项配置冲突。" },
      1: { en: "Parts added or deleted, or a clear count error (e.g., three fingers, missing eyebrows).", zh: "部件增删或明显数量错误（如三根手指、眉毛缺失）。" },
      u: { en: "Too blurred/occluded to confirm.", zh: "严重模糊或遮挡导致无法确认。" },
    },
    noHint: {
      en: "A part roughly existing is not enough: any add/delete/count/representation conflict is No.",
      zh: "部件大致存在不等于一致：任何增删、数量或表示冲突都是 No。",
    },
  },
  {
    id: "T",
    name: { en: "Temporal Stability", zh: "时序稳定性" },
    question: {
      en: "Within the generated video itself: is it free of unexpected temporal changes such as flickering, ghosting jumps, geometric drift, parts appearing/disappearing, or sudden style shifts?",
      zh: "生成视频自身是否稳定：有没有闪烁、重影跳变、几何漂移、部件异常显隐、画法突变等非预期时间变化？",
    },
    anchors: {
      5: { en: "Stable throughout.", zh: "全片稳定。" },
      4: { en: "Slight local changes only.", zh: "轻微局部变化。" },
      3: { en: "One major temporal problem.", zh: "一项主要时间问题。" },
      2: { en: "Persistent anomalies in multiple regions.", zh: "多区域持续异常。" },
      1: { en: "Severe continuous flickering or structural destruction.", zh: "严重连续的闪烁或结构破坏。" },
    },
    noHint: {
      en: "Judge the generated video on its own: do NOT mark No just because it fails to reproduce the GT motion amplitude.",
      zh: "只评生成视频自身：不要因为没复现 GT 的动作幅度而扣此维度。",
    },
  },
  {
    id: "M",
    name: { en: "Motion Fidelity", zh: "运动保真" },
    question: {
      en: "Does the generated video reproduce the GT motion: motion type, direction, relative timing, and magnitude, over mouth, eyelids, eyebrows, head pose, and body pose?",
      zh: "生成视频是否复现了 GT 的运动：嘴、眼睑、眉毛、头姿、身体姿态的动作类型、方向、相对时序和幅度？",
    },
    anchors: {
      5: { en: "Motion type, direction, relative timing, and magnitude all basically match.", zh: "该动的都动了，怎么动、多大幅度、先后顺序都对。" },
      4: { en: "Mainly consistent; only slight magnitude or phase differences (small timing offsets allowed).", zh: "动作都在，只是幅度略差或慢半拍（正常的小时间偏移可接受）。" },
      3: { en: "Main motion present but one important region missing or clearly off in magnitude.", zh: "主要动作存在，但丢了一个重要区域或幅度差太多。" },
      2: { en: "Only a little motion reproduced, or direction/timing clearly wrong.", zh: "只复现少量动作，或方向乱、顺序反。" },
      1: { en: "GT clearly moves but the generated video is nearly static; or apparent motion is actually ghosting/structural artifacts.", zh: "GT 在动、生成基本不动（假高清）；或动作其实是崩坏伪影在跳。" },
      u: { en: "Unreliable to observe (only when the GT region is also unobservable).", zh: "无法可靠观察（仅当 GT 同区域也不可观察时）。" },
    },
    noHint: {
      en: "GT moves, generated does not (static copy) is the clearest No.",
      zh: "GT 在动而生成几乎不动（静态复制）是最典型的 No。",
    },
  },
];

const TRANSLATIONS = {
  en: {
    languageLabel: "Language / 语言",
    studyTitle: "Human Alignment Study",
    notStarted: "Not started",
    anonymousEvaluation: "Anonymous blinded evaluation",
    setupHeading: "Style consistency of generated talking-avatar videos",
    setupIntro: "You will compare 96 video pairs (left: ground truth, right: generated). The generating method and all automatic scores are concealed. Pair order is randomized.",
    protocolHeading: "Evaluation protocol",
    protocolScope: "Watch the GT (left) and generated (right) videos side by side. Both loop and play in sync.",
    protocolWatch: "Rate the overall quality of the generated video from 1 to 5.",
    protocolNodes: "Label the five dimensions S/D/C/T/M independently using Yes / No / U, based only on what you see.",
    protocolGuide: "Read the scoring guide below the videos for the exact meaning of each dimension and each anchor level.",
    protocolSessions: "You may complete the study in multiple sessions; progress is stored in this browser.",
    protocolExport: "After all pairs are complete, export the result JSON and return the file to the researcher.",
    yes: "Yes", no: "No",
    unobservable: "Unobservable", unobservableShort: "U",
    yesDefinition: "consistent with GT / stable",
    noDefinition: "visible inconsistency or violation",
    unobservableDefinition: "insufficient visible evidence",
    videos: "video pairs", styles: "art styles covered", dimensions: "evaluation dimensions",
    consent: "I consent to the anonymous research use of these ratings.",
    startEvaluation: "Start evaluation", continueEvaluation: "Continue evaluation",
    instructions: "Evaluation instructions",
    instructionScope: "Compare the generated video (right) against the ground truth (left). Judge the five dimensions independently.",
    instructionWatch: "Watch both videos at least once.",
    instructionRate: "Rate the generated video overall from 1 to 5.",
    instructionLabel: "Answer each of the five dimensions independently.",
    instructionEvidence: "Yes = consistent/stable; No = visible violation; U = cannot judge.",
    instructionNoGuess: "Do not guess. A visible violation must be No, not U.",
    toggleGuide: "Scoring guide",
    blinded: "Method and automatic results hidden",
    reference: "Reference", generated: "Generated",
    scenario: "Scenario",
    overallQuality: "Overall quality of the generated video",
    likertPrompt: "How well does the generated video preserve the reference in style, design, and motion?",
    evidentlyBad: "Broken / replaced", excellent: "Indistinguishable quality",
    toonEvalDimensions: "ToonEval dimensions", dimVerdicts: "Dimension-wise judgments",
    rateOverallFirst: "Select the overall rating first",
    anchorsLabel: "Anchor levels",
    replayVideo: "Replay both videos", previous: "Previous",
    saveContinue: "Save and continue", downloadProgressJson: "Export current JSON",
    completeStudy: "Complete study", evaluationComplete: "Evaluation complete",
    downloadJson: "Export result JSON", submitResponses: "Submit responses",
    savedLocally: "Saved in this browser",
    autoSavedAt: (time) => `Auto-saved at ${time}`,
    restoredProgress: (completed, total, time) => `Restored ${completed} / ${total} · last saved ${time}`,
    saveFailed: "Automatic save failed",
    completeOverall: "Select an overall rating",
    completeNodes: "Label all five dimensions",
    videoOf: (current, total) => `Pair ${current} of ${total}`,
    completionSummary: (total) => `${total} video pairs were evaluated. Export the result JSON and return it to the researcher before closing this page.`,
    submitting: "Submitting...", submitted: "Responses submitted.",
    submissionFailed: (message) => `Submission failed: ${message}`,
  },
  zh: {
    languageLabel: "语言 / Language",
    studyTitle: "人评对齐研究",
    notStarted: "尚未开始",
    anonymousEvaluation: "匿名盲评",
    setupHeading: "生成说话数字人视频的风格一致性评估",
    setupIntro: "你将对比 96 组视频（左：真值 GT；右：生成）。生成方法与所有自动评分均已隐藏，顺序随机排列。",
    protocolHeading: "评估流程",
    protocolScope: "左右并排观看 GT 与生成视频，两个视频同步循环播放。",
    protocolWatch: "先对生成视频给出 1–5 的整体质量分。",
    protocolNodes: "仅依据画面可见证据，独立标注 S/D/C/T/M 五个维度：一致 / 不一致 / 不可观察。",
    protocolGuide: "作答前请阅读视频下方的打分指南，了解每个维度与每个分数档的准确定义。",
    protocolSessions: "可分多次完成；进度保存在当前浏览器中。",
    protocolExport: "全部完成后导出结果 JSON 并交回研究者。",
    yes: "一致", no: "不一致",
    unobservable: "不可观察", unobservableShort: "不可观察",
    yesDefinition: "与 GT 一致 / 时序稳定",
    noDefinition: "存在可见的不一致或违例",
    unobservableDefinition: "可见证据不足",
    videos: "组视频", styles: "种艺术风格", dimensions: "个评估维度",
    consent: "我同意将这些匿名评分用于学术研究。",
    startEvaluation: "开始评估", continueEvaluation: "继续评估",
    instructions: "评估说明",
    instructionScope: "将右侧生成视频与左侧 GT 对比，独立判断五个维度。",
    instructionWatch: "两组视频至少各完整看一次。",
    instructionRate: "先对生成视频打 1–5 整体分。",
    instructionLabel: "再独立标注五个维度，一个维度的答案不能代替另一个。",
    instructionEvidence: "一致 = 与 GT 一致或时序稳定；不一致 = 有可见违例；不可观察 = 无法判断。",
    instructionNoGuess: "不要猜。可见的违例必须选不一致，不能选不可观察。",
    toggleGuide: "打分指南",
    blinded: "生成方法与自动评分已隐藏",
    reference: "参考 GT", generated: "生成",
    scenario: "场景",
    overallQuality: "生成视频整体质量",
    likertPrompt: "生成视频在风格、设计与运动上对参考的保持程度如何？",
    evidentlyBad: "崩坏 / 被替换", excellent: "与 GT 难以区分",
    toonEvalDimensions: "ToonEval 评估维度", dimVerdicts: "逐维度判断",
    rateOverallFirst: "请先完成整体评分",
    anchorsLabel: "分数档锚点",
    replayVideo: "重新播放", previous: "上一个",
    saveContinue: "保存并继续", downloadProgressJson: "导出当前进度 JSON",
    completeStudy: "完成评估", evaluationComplete: "评估完成",
    downloadJson: "导出结果 JSON", submitResponses: "提交结果",
    savedLocally: "已保存在当前浏览器",
    autoSavedAt: (time) => `已自动保存 · ${time}`,
    restoredProgress: (completed, total, time) => `已恢复 ${completed} / ${total} · 上次保存 ${time}`,
    saveFailed: "自动保存失败",
    completeOverall: "请选择整体评分",
    completeNodes: "请标注全部五个维度",
    videoOf: (current, total) => `第 ${current} / ${total} 组`,
    completionSummary: (total) => `已完成 ${total} 组视频评估。关闭页面前，请导出结果 JSON 并交回研究者。`,
    submitting: "正在提交……", submitted: "结果已提交。",
    submissionFailed: (message) => `提交失败：${message}`,
  },
};

const state = {
  manifest: null,
  assignment: [],
  ratings: {},
  sessionId: "",
  currentIndex: 0,
  startedAt: null,
  completedAt: null,
  consentedAt: null,
  lastSavedAt: null,
  language: localStorage.getItem("tooneval-alignment:language") || "zh",
  guideOpen: false,
  syncToken: 0,
};

const $ = (selector) => document.querySelector(selector);
const t = (key, ...args) => {
  const value = TRANSLATIONS[state.language]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  return typeof value === "function" ? value(...args) : value;
};

function anonymousCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const values = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(values, (value) => alphabet[value % alphabet.length]).join("");
}

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(items, random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

function randomizedAssignment(trials, sessionId) {
  return shuffle(trials, seededRandom(hashString(sessionId)));
}

function recordKey() {
  return `tooneval-alignment:v1:${state.sessionId}`;
}

function savedRecord() {
  try {
    return JSON.parse(localStorage.getItem(recordKey()) || "null");
  } catch {
    return null;
  }
}

function displayTime(isoValue) {
  const date = isoValue ? new Date(isoValue) : new Date();
  if (Number.isNaN(date.getTime())) return "--:--";
  return new Intl.DateTimeFormat(state.language === "zh" ? "zh-CN" : "en", {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).format(date);
}

function completedCount() {
  return state.assignment.filter((trial) => ratingComplete(trial, state.ratings[trial.trial_id])).length;
}

function persist() {
  if (!state.sessionId || !state.assignment.length) return;
  state.lastSavedAt = new Date().toISOString();
  try {
    localStorage.setItem(recordKey(), JSON.stringify({
      sessionId: state.sessionId,
      assignmentIds: state.assignment.map((trial) => trial.trial_id),
      ratings: state.ratings,
      currentIndex: state.currentIndex,
      startedAt: state.startedAt,
      completedAt: state.completedAt,
      consentedAt: state.consentedAt,
      lastSavedAt: state.lastSavedAt,
      language: state.language,
    }));
    $("#saveState").textContent = t("autoSavedAt", displayTime(state.lastSavedAt));
  } catch {
    $("#saveState").textContent = t("saveFailed");
  }
}

function restoreSavedRecord(saved) {
  if (!saved?.assignmentIds?.length || !state.manifest?.trials?.length) return false;
  const byId = new Map(state.manifest.trials.map((trial) => [trial.trial_id, trial]));
  const assignment = saved.assignmentIds.map((id) => byId.get(id)).filter(Boolean);
  if (!assignment.length) return false;
  state.assignment = assignment;
  state.ratings = saved.ratings || {};
  state.currentIndex = Math.max(0, Math.min(Number(saved.currentIndex) || 0, assignment.length - 1));
  state.startedAt = saved.startedAt || new Date().toISOString();
  state.completedAt = saved.completedAt || null;
  state.consentedAt = saved.consentedAt || null;
  state.lastSavedAt = saved.lastSavedAt || null;
  if (saved.language === "en" || saved.language === "zh") {
    state.language = saved.language;
    localStorage.setItem("tooneval-alignment:language", state.language);
  }
  return true;
}

function currentRating() {
  const trial = state.assignment[state.currentIndex];
  if (!state.ratings[trial.trial_id]) {
    state.ratings[trial.trial_id] = {
      overallQuality: null,
      verdicts: {},
      viewedAt: new Date().toISOString(),
    };
  }
  return state.ratings[trial.trial_id];
}

// ============ 双视频同步播放 ============
function setupSyncedPlayback() {
  const gt = $("#gtVideo");
  const gen = $("#genVideo");
  // 生成侧追 GT：漂移超过 0.15s 就跳齐
  gen.addEventListener("play", () => { if (gt.paused) gt.play().catch(() => {}); });
  gt.addEventListener("play", () => { if (gen.paused) gen.play().catch(() => {}); });
  gt.addEventListener("pause", () => { if (!gen.paused) gen.pause(); });
  gen.addEventListener("pause", () => { if (!gt.paused && !gt.ended) gt.pause(); });
  gt.addEventListener("seeked", () => {
    if (Math.abs(gen.currentTime - gt.currentTime) > 0.15) gen.currentTime = gt.currentTime;
  });
  setInterval(() => {
    if (gt.paused || gen.paused) return;
    if (Math.abs(gen.currentTime - gt.currentTime) > 0.15) gen.currentTime = gt.currentTime;
  }, 500);
}

function renderLikert() {
  const rating = currentRating();
  const scale = $("#likertScale");
  scale.innerHTML = "";
  for (let value = 1; value <= 5; value += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "likert-button";
    button.textContent = String(value);
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", String(rating.overallQuality === value));
    if (rating.overallQuality === value) button.classList.add("selected");
    button.addEventListener("click", () => {
      rating.overallQuality = value;
      renderLikert();
      renderNodes();
      persist();
    });
    scale.appendChild(button);
  }
}

function renderNodes() {
  const trial = state.assignment[state.currentIndex];
  const rating = currentRating();
  const container = $("#nodeList");
  container.innerHTML = "";

  if (!rating.overallQuality) {
    const notice = document.createElement("div");
    notice.className = "rating-notice";
    notice.innerHTML = `<i data-lucide="arrow-up"></i><span>${t("rateOverallFirst")}</span>`;
    container.appendChild(notice);
  }

  NODE_DEFINITIONS.forEach(({ id, name, question, anchors, noHint }) => {
    const row = document.createElement("div");
    row.className = "node-row";
    if (!rating.overallQuality) row.classList.add("awaiting-overall");

    const copy = document.createElement("div");
    const anchorList = Object.entries(anchors)
      .map(([level, text]) => `<li><b>${level === "u" ? "U" : level}</b> ${text[state.language]}</li>`)
      .join("");
    copy.innerHTML = `
      <div class="node-name"><b>${id}</b><span>${name[state.language]}</span></div>
      <div class="node-question">${question[state.language]}</div>
      <details class="node-anchors">
        <summary>${t("anchorsLabel")}</summary>
        <ul>${anchorList}</ul>
        <p class="node-hint">${noHint[state.language]}</p>
      </details>
    `;
    row.appendChild(copy);

    const control = document.createElement("div");
    control.className = "verdict-control";
    [
      ["yes", t("yes")],
      ["no", t("no")],
      ["unobservable", t("unobservableShort")],
    ].forEach(([value, label]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.value = value;
      button.textContent = label;
      if (value === "unobservable") {
        button.title = t("unobservable");
        button.setAttribute("aria-label", t("unobservable"));
      }
      button.disabled = !rating.overallQuality;
      if (rating.verdicts[id] === value) button.classList.add("selected");
      button.addEventListener("click", () => {
        rating.verdicts[id] = value;
        renderNodes();
        persist();
      });
      control.appendChild(button);
    });
    row.appendChild(control);
    container.appendChild(row);
  });

  if (window.lucide) lucide.createIcons();
}

function renderDimensionGuide() {
  const guide = $("#dimensionGuide");
  if (!guide) return;
  guide.innerHTML = "";
  NODE_DEFINITIONS.forEach(({ id, name, question, anchors }) => {
    const item = document.createElement("div");
    item.className = `dimension-guide-item dimension-${id.toLowerCase()}`;
    const anchorList = Object.entries(anchors)
      .map(([level, text]) => `<li><b>${level === "u" ? "U" : level}</b> ${text[state.language]}</li>`)
      .join("");
    item.innerHTML = `
      <div class="dimension-guide-name"><b>${id}</b><span>${name[state.language]}</span></div>
      <p>${question[state.language]}</p>
      <ul>${anchorList}</ul>
    `;
    guide.appendChild(item);
  });
}

function scenarioText(trial) {
  // 不泄露方法名，只给 clip 编号与风格编号
  return `${t("videoOf", state.currentIndex + 1, state.assignment.length)} · ${trial.clip_id} · style ${trial.style_id}`;
}

function renderCurrent() {
  const trial = state.assignment[state.currentIndex];
  $("#sampleIndex").textContent = t("videoOf", state.currentIndex + 1, state.assignment.length);
  $("#samplePrompt").textContent = scenarioText(trial);
  $("#genLabel").textContent = "";
  const gt = $("#gtVideo");
  const gen = $("#genVideo");
  gt.src = trial.gt_video;
  gen.src = trial.gen_video;
  gt.load();
  gen.load();
  // 自动同步播放
  Promise.all([
    new Promise((res) => gt.addEventListener("loadeddata", res, { once: true })),
    new Promise((res) => gen.addEventListener("loadeddata", res, { once: true })),
  ]).then(() => {
    gen.currentTime = 0;
    gt.currentTime = 0;
    gt.play().catch(() => {});
    gen.play().catch(() => {});
  }).catch(() => {});
  $("#previousButton").disabled = state.currentIndex === 0;
  $("#nextButton").innerHTML =
    state.currentIndex === state.assignment.length - 1
      ? `<span>${t("completeStudy")}</span><i data-lucide="check"></i>`
      : `<span>${t("saveContinue")}</span><i data-lucide="arrow-right"></i>`;
  renderLikert();
  renderNodes();
  updateProgress();
  applyTranslations();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function ratingComplete(trial, rating) {
  if (!rating?.overallQuality) return false;
  return NODE_DEFINITIONS.every(({ id }) => Boolean(rating.verdicts[id]));
}

function validateCurrent() {
  const trial = state.assignment[state.currentIndex];
  const rating = currentRating();
  if (!rating.overallQuality) {
    $("#saveState").textContent = t("completeOverall");
    $(".likert-panel").scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  }
  if (!ratingComplete(trial, rating)) {
    $("#saveState").textContent = t("completeNodes");
    $("#nodeList").scrollIntoView({ behavior: "smooth", block: "start" });
    return false;
  }
  return true;
}

function updateProgress() {
  const completed = completedCount();
  const total = state.assignment.length || state.manifest?.trial_total || 96;
  $("#progressLabel").textContent = `${completed} / ${total}`;
  $("#progressFill").style.width = `${total ? (completed / total) * 100 : 0}%`;
}

function resultPayload() {
  const assignments = state.assignment.map((trial, order) => {
    const rating = state.ratings[trial.trial_id] || { overallQuality: null, verdicts: {} };
    return {
      order: order + 1,
      trial_id: trial.trial_id,
      clip_id: trial.clip_id,
      style_id: trial.style_id,
      overall_quality: rating.overallQuality,
      dimension_labels: rating.verdicts,
    };
  });
  const overall = state.assignment
    .map((trial) => state.ratings[trial.trial_id])
    .filter((rating, index) => ratingComplete(state.assignment[index], rating))
    .map((rating) => rating.overallQuality);
  return {
    schema_version: "tooneval-user-study-v1",
    anonymous_session_id: state.sessionId,
    language: state.language,
    started_at: state.startedAt,
    completed_at: state.completedAt || new Date().toISOString(),
    summary: {
      completed_pairs: completedCount(),
      mean_overall_quality: overall.length
        ? Number((overall.reduce((sum, value) => sum + value, 0) / overall.length).toFixed(6))
        : null,
    },
    assignment: assignments,
  };
}

function progressPayload() {
  const payload = resultPayload();
  const answered = payload.assignment.filter(
    (item) => Number.isInteger(item.overall_quality) || Object.keys(item.dimension_labels || {}).length > 0,
  );
  return {
    ...payload,
    export_kind: "in_progress",
    exported_at: new Date().toISOString(),
    completed_at: null,
    progress: {
      completed_pairs: payload.summary.completed_pairs,
      assigned_pairs: state.assignment.length,
      current_pair_order: state.currentIndex + 1,
      included_response_records: answered.length,
    },
    assignment: answered,
  };
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function completeStudy() {
  state.completedAt = state.completedAt || new Date().toISOString();
  persist();
  $("#studyView").hidden = true;
  $("#completeView").hidden = false;
  $("#completionSummary").textContent = t("completionSummary", state.assignment.length);
  const endpoint = window.TOONEVAL_CONFIG?.submissionEndpoint;
  $("#submitResults").hidden = !endpoint;
  updateProgress();
  applyTranslations();
}

async function submitResults() {
  const endpoint = window.TOONEVAL_CONFIG?.submissionEndpoint;
  if (!endpoint) return;
  const button = $("#submitResults");
  button.disabled = true;
  $("#submitStatus").textContent = t("submitting");
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resultPayload()),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    $("#submitStatus").textContent = t("submitted");
  } catch (error) {
    $("#submitStatus").textContent = t("submissionFailed", error.message);
    button.disabled = false;
  }
}

function applyTranslations() {
  document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    element.title = t(element.dataset.i18nTitle);
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.classList.toggle("selected", button.dataset.language === state.language);
  });
  renderDimensionGuide();
  $("#dimensionGuide").hidden = !state.guideOpen;
  const saved = state.sessionId ? savedRecord() : null;
  $("#startButtonLabel").textContent =
    saved?.assignmentIds?.length ? t("continueEvaluation") : t("startEvaluation");
  if (!$("#studyView").hidden && state.assignment.length) {
    $("#sampleIndex").textContent = t("videoOf", state.currentIndex + 1, state.assignment.length);
    $("#samplePrompt").textContent = scenarioText(state.assignment[state.currentIndex]);
    $("#nextButton").innerHTML =
      state.currentIndex === state.assignment.length - 1
        ? `<span>${t("completeStudy")}</span><i data-lucide="check"></i>`
        : `<span>${t("saveContinue")}</span><i data-lucide="arrow-right"></i>`;
  }
  if (!$("#completeView").hidden && state.assignment.length) {
    $("#completionSummary").textContent = t("completionSummary", state.assignment.length);
  }
  if (state.assignment.length && state.lastSavedAt) {
    $("#saveState").textContent = t("autoSavedAt", displayTime(state.lastSavedAt));
  }
  if (window.lucide) lucide.createIcons();
}

async function initialize() {
  state.sessionId =
    localStorage.getItem("tooneval-alignment:session-id") || anonymousCode();
  localStorage.setItem("tooneval-alignment:session-id", state.sessionId);

  const manifestPath = window.TOONEVAL_CONFIG?.trialManifest || "./data/trials.json";
  const response = await fetch(manifestPath);
  if (!response.ok) throw new Error(`Unable to load trial manifest: ${response.status}`);
  state.manifest = await response.json();

  setupSyncedPlayback();

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.language;
      localStorage.setItem("tooneval-alignment:language", state.language);
      applyTranslations();
      if (!$("#studyView").hidden && state.assignment.length) {
        renderLikert();
        renderNodes();
      }
      persist();
    });
  });

  $("#guideToggle").addEventListener("click", () => {
    state.guideOpen = !state.guideOpen;
    applyTranslations();
  });

  $("#setupForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const saved = savedRecord();
    restoreSavedRecord(saved);
    if (!state.assignment.length) {
      state.assignment = randomizedAssignment(state.manifest.trials, state.sessionId);
      state.ratings = {};
      state.currentIndex = 0;
      state.startedAt = new Date().toISOString();
      state.consentedAt = new Date().toISOString();
      state.completedAt = null;
    }
    $("#setupView").hidden = true;
    $("#studyView").hidden = false;
    renderCurrent();
    persist();
  });

  $("#replayButton").addEventListener("click", () => {
    const gt = $("#gtVideo");
    const gen = $("#genVideo");
    gen.currentTime = 0;
    gt.currentTime = 0;
    gt.play().catch(() => {});
    gen.play().catch(() => {});
  });
  $("#previousButton").addEventListener("click", () => {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderCurrent();
      persist();
    }
  });
  $("#ratingForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateCurrent()) return;
    if (state.currentIndex === state.assignment.length - 1) {
      completeStudy();
      return;
    }
    state.currentIndex += 1;
    renderCurrent();
    persist();
  });
  $("#downloadJson").addEventListener("click", () => {
    download(
      `tooneval-response-${state.sessionId}.json`,
      JSON.stringify(resultPayload(), null, 2),
      "application/json",
    );
  });
  $("#downloadProgressJson")?.addEventListener("click", () => {
    persist();
    const payload = progressPayload();
    download(
      `tooneval-progress-${state.sessionId}-${payload.progress.completed_pairs}-of-${payload.progress.assigned_pairs}.json`,
      JSON.stringify(payload, null, 2),
      "application/json",
    );
  });
  $("#submitResults").addEventListener("click", submitResults);
  applyTranslations();

  const saved = savedRecord();
  if (restoreSavedRecord(saved)) {
    $("#setupView").hidden = true;
    if (state.completedAt && completedCount() === state.assignment.length) {
      completeStudy();
    } else {
      $("#studyView").hidden = false;
      renderCurrent();
      $("#saveState").textContent = t(
        "restoredProgress",
        completedCount(),
        state.assignment.length,
        displayTime(state.lastSavedAt),
      );
    }
  } else {
    updateProgress();
  }

  window.addEventListener("pagehide", persist);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") persist();
  });
}

initialize().catch((error) => {
  document.body.innerHTML = `<main><h1>Study unavailable</h1><p>${error.message}</p></main>`;
});
