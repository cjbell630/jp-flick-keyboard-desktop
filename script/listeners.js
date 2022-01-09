const CLURD = { // TODO rename
    "あ": ["い", "う", "え", "お"],
    "か": ["き", "く", "け", "こ"],
    "さ": ["し", "す", "せ", "そ"],
    "た": ["ち", "つ", "て", "と"],
    "な": ["に", "ぬ", "ね", "の"],
    "は": ["ひ", "ふ", "へ", "ほ"],
    "ま": ["み", "む", "め", "も"],
    "や": ["（", "ゆ", "）", "よ"],
    "ら": ["り", "る", "れ", "ろ"],
    "わ": ["を", "ん", "ー", "～"],
    "、": ["。", "？", "！", "…"]
};
const MAPPINGS = {
    "1": {
        "ArrowUp": "Up",
        "ArrowDown": "Down",
        "ArrowLeft": "Left",
        "ArrowRight": "Right",
        "Numpad7": "あ",
        "Numpad8": "か",
        "Numpad9": "さ",
        "Numpad4": "た",
        "Numpad5": "な",
        "Numpad6": "は",
        "Numpad1": "ま",
        "Numpad2": "や",
        "Numpad3": "ら",
        "Numpad0": "わ",
        "NumpadDecimal": "、",
        "NumpadPlus": "Diacritic"
    }
};
let KEY_STATES = {
    "Up": false,
    "Down": false,
    "Left": false,
    "Right": false,
    "あ": false,
    "か": false,
    "さ": false,
    "た": false,
    "な": false,
    "は": false,
    "ま": false,
    "や": false,
    "ら": false,
    "わ": false,
    "、": false,
    "Diacritic": false
};
let MODE = "1"; //TODO fix

function applySettings() {
    KEY_STATES = {};
    Object.values(MAPPINGS[MODE]).forEach(function (value) {
        KEY_STATES[value] = false;
    });
}

function addListeners() {
    document.addEventListener("keydown", function onEvent(event) {
        if (Object.keys(MAPPINGS[MODE]).includes(event.code)) {
            const intent = MAPPINGS[MODE][event.code];
            KEY_STATES[intent] = true;
        }
    });
    document.addEventListener("keyup", function onEvent(event) {
        console.log("key down"); //TODO remove
        if (Object.keys(MAPPINGS[MODE]).includes(event.code)) {
            console.log("key is known"); //TODO remove
            const intent = MAPPINGS[MODE][event.code];
            if (KEY_STATES[intent]) {
                KEY_STATES[intent] = false;

                if (intent === "Diacritic") { // if diacritic

                } else if (/^\w+$/.test(intent)) { // if direction
                    //TODO make work for other modes
                    let index = {"Up": 1,
                        "Down": 3,
                        "Left": 0,
                        "Right": 2}[intent];
                    let kana = Object.entries(CLURD).map(([key,value]) => ([key,KEY_STATES[key]])).filter(([key,value]) => value).map(([key,value]) => key);
                    console.log(kana);
                    if(kana.length > 0){
                        KEY_STATES[kana[0]] = false;
                        document.getElementById("output").innerText += CLURD[kana[0]][index];
                    }
                } else { // if kana or punct
                    //TODO make work for other modes
                    let index = -1;
                    ["Left","Up", "Right", "Down"].forEach(function(key, i) {
                        if(KEY_STATES[key]){
                            index = i;
                            KEY_STATES[key] = false;
                        }
                    });
                    document.getElementById("output").innerText += index === -1 ? intent : CLURD[intent][index];
                }
            }
        }
    });
}