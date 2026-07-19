(function () {
  "use strict";

  var DECKS = {
    gme: { label: "Legacy GME", total: 36, path: "images/gme" },
    explorer: { label: "Legacy Explorer", total: 36, path: "images/explorer" },
  };

  var STORAGE_KEY = "legacy-gme-obr-deck-state-v1";

  var els = {
    cardImg: document.getElementById("card-img"),
    statusText: document.getElementById("status-text"),
    drawBtn: document.getElementById("draw-btn"),
    shuffleBtn: document.getElementById("shuffle-btn"),
    stage: document.querySelector(".card-stage"),
    tabs: Array.prototype.slice.call(document.querySelectorAll(".tab-btn")),
  };

  var activeDeck = "gme";
  var state = loadState();

  function freshDeckState(total) {
    return { order: shuffledOrder(total), pos: 0, current: null, faceUp: false };
  }

  function shuffledOrder(total) {
    var arr = [];
    for (var i = 1; i <= total; i++) arr.push(i);
    for (var j = arr.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var tmp = arr[j];
      arr[j] = arr[k];
      arr[k] = tmp;
    }
    return arr;
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.gme && parsed.explorer) return parsed;
      }
    } catch (e) {
      /* fall through to fresh state */
    }
    return {
      gme: freshDeckState(DECKS.gme.total),
      explorer: freshDeckState(DECKS.explorer.total),
    };
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* storage unavailable, ignore */
    }
  }

  function cardImagePath(deckKey, num) {
    var padded = num < 10 ? "0" + num : "" + num;
    return DECKS[deckKey].path + "/card_" + padded + ".png";
  }

  function backImagePath(deckKey) {
    return DECKS[deckKey].path + "/back.png";
  }

  function render() {
    var deck = DECKS[activeDeck];
    var s = state[activeDeck];
    var remaining = deck.total - s.pos;

    els.tabs.forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.deck === activeDeck);
    });

    if (s.current && s.faceUp) {
      els.cardImg.src = cardImagePath(activeDeck, s.current);
      els.cardImg.alt = deck.label + " card " + s.current;
    } else {
      els.cardImg.src = backImagePath(activeDeck);
      els.cardImg.alt = deck.label + " card back";
    }

    if (remaining <= 0) {
      els.statusText.textContent = "Deck exhausted \u2014 reshuffle to keep drawing";
      els.drawBtn.textContent = "Reshuffle";
    } else {
      var drawnCount = s.pos;
      els.drawBtn.textContent = "Draw Card";
      if (s.current) {
        els.statusText.textContent =
          "Card " + s.current + " \u00b7 drawn " + drawnCount + " of " + deck.total +
          " \u00b7 " + remaining + " remaining";
      } else {
        els.statusText.textContent = "Shuffled \u00b7 " + deck.total + " cards ready";
      }
    }
  }

  function draw() {
    var deck = DECKS[activeDeck];
    var s = state[activeDeck];
    if (s.pos >= deck.total) {
      shuffle();
      return;
    }
    s.current = s.order[s.pos];
    s.pos += 1;
    s.faceUp = true;
    saveState();
    render();
  }

  function shuffle() {
    state[activeDeck] = freshDeckState(DECKS[activeDeck].total);
    saveState();
    render();
  }

  function flip() {
    var s = state[activeDeck];
    if (!s.current) return;
    s.faceUp = !s.faceUp;
    saveState();
    render();
  }

  els.tabs.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeDeck = btn.dataset.deck;
      render();
    });
  });

  els.drawBtn.addEventListener("click", draw);
  els.shuffleBtn.addEventListener("click", shuffle);
  els.stage.addEventListener("click", flip);

  render();
})();
