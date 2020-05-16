const keys = document.querySelectorAll(".piano__key");
const headingCharacters = document.querySelectorAll(".header__char");
const songList = document.querySelectorAll(".song");
const meter = document.querySelector(".meter");
const allowAudio = document.querySelector(".allowAudio");
const oscillatorOption = document.querySelector("#oscillatorOption");
let mouseDown = false;

let synth = new Tone.Synth({
    oscillator: {
        type: "sine"
    },
    envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1
    }
}).toMaster();

allowAudio.addEventListener("click", () => {
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }
});

oscillatorOption.addEventListener("change", function () {
    synth = new Tone.Synth({
        oscillator: {
            type: this.selectedOptions[0].value
        },
        envelope: {
            attack: 0.005,
            decay: 0.1,
            sustain: 0.3,
            release: 1
        }
    }).toMaster();
})

const pNotes = {
    C: [{ C1: "C1"}, {C2: "C2"}, {C3: "C3"}, {C4: "C4"}, {C5: "C5"}],
    D: [{ D1: "D1"}, {D2: "D2"}, {D3: "D3"}, {D4: "D4"}, {D5: "E5"}],
    E: [{ E1: "E1"}, {E2: "E2"}, {E3: "E3"}, {E4: "E4"}, {E5: "E5"}],
    F: [{ F1: "F1"}, {F2: "F2"}, {F3: "F3"}, {F4: "F4"}, {F5: "E5"}],
    G: [{ G1: "G1"}, {G2: "G2"}, {G3: "G3"}, {G4: "G4"}, {G5: "E5"}],
    A: [{ A1: "A1"}, {A2: "A2"}, {A3: "A3"}, {A4: "A4"}, {A5: "E5"}],
    B: [{ B1: "B1"}, {B2: "B2"}, {B3: "B3"}, {B4: "B4"}, {B5: "E5"}]
}

keys.forEach(key => {
    key.addEventListener("mousedown", function (e) {
        mouseDown = true;
        // Play the note
        synth.triggerAttack(this.dataset.note, "+0", 1)
        
        // Get the note frequency
        const noteFreq = Tone.Frequency(this.dataset.note).toMidi();
        meter.style.height = meter.offsetHeight  + (noteFreq * parseInt(this.dataset.note[this.dataset.note.length - 1])) + "px";
        meter.style.width = meter.offsetWidth + (noteFreq * parseInt(this.dataset.note[this.dataset.note.length - 1])) + "px";

        this.style.transform = "translateY(5px)";

        setTimeout(() => {
            this.removeAttribute("style");
            meter.removeAttribute("style")
        }, 200);
    });

    key.addEventListener("mouseover", function (e) {
        if (mouseDown) {
            // Play the note
            synth.triggerAttack(this.dataset.note, "+0", 1)

            // Get the note frequency
            const noteFreq = Tone.Frequency(this.dataset.note).toMidi();
            meter.style.height = meter.offsetHeight + (noteFreq * parseInt(this.dataset.note[this.dataset.note.length - 1])) + "px";
            meter.style.width = meter.offsetWidth + (noteFreq * parseInt(this.dataset.note[this.dataset.note.length - 1])) + "px";

            this.style.transform = "translateY(5px)";

            setTimeout(() => {
                this.removeAttribute("style");
                meter.removeAttribute("style")
            }, 200);
        }
    });

    key.addEventListener("touchmove", function (e) {
        const noteToPress = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
        if (mouseDown && noteToPress.dataset.note) {
            synth.triggerRelease();
            // Play the note
            synth.triggerAttack(noteToPress.dataset.note, "+0", 1)

            // Get the note frequency
            const noteFreq = Tone.Frequency(noteToPress.dataset.note).toMidi();
            meter.style.height = meter.offsetHeight + (noteFreq * parseInt(noteToPress.dataset.note[noteToPress.dataset.note.length - 1])) + "px";
            meter.style.width = meter.offsetWidth + (noteFreq * parseInt(noteToPress.dataset.note[noteToPress.dataset.note.length - 1])) + "px";

            noteToPress.style.transform = "translateY(5px)";
            noteToPress.style.opacity = "0.5";

            setTimeout(() => {
                noteToPress.removeAttribute("style");
                meter.removeAttribute("style")
            }, 200);
        }
    });

    // Mobiles
    key.addEventListener("touchstart", function () {
        mouseDown = true;
        // Play the note
        synth.triggerAttack(this.dataset.note, "+0", 1)

        // Get the note frequency
        const noteFreq = Tone.Frequency(this.dataset.note).toMidi();
        meter.style.height = meter.offsetHeight + (noteFreq * parseInt(this.dataset.note[this.dataset.note.length - 1])) + "px";
        meter.style.width = meter.offsetWidth + (noteFreq * parseInt(this.dataset.note[this.dataset.note.length - 1])) + "px";

        setTimeout(() => {
            this.removeAttribute("style");
            meter.removeAttribute("style")
        }, 200);
    });

    key.addEventListener("touchend", function () {
        // Release note when mouse is lifted
        synth.triggerRelease();
        mouseDown = false;
    })

    key.addEventListener("mouseup", function () {
        // Release note when mouse is lifted
        mouseDown = false;
        synth.triggerRelease();
    })
});

songList.forEach(song => {
    song.addEventListener("click", function () {
        Tone.Transport.stop();
        Tone.Transport.cancel();
        playSongSequence(songs[this.dataset.song]);
    });
});


// Play "Mary had a little lamb" automatically
const songs = {
    maryLittleLamb: [
        note("E", 4), note("D", 4), note("C", 4), note("D", 4), note("E", 4), note("E", 4), note("E", 4),
        note("D", 4), note("D", 4), note("D", 4), note("E", 4), note("G", 4), note("G", 4),
        note("E", 4), note("D", 4), note("C", 4), note("D", 4), note("E", 4), note("E", 4), note("E", 4),
        note("E", 4), note("D", 4), note("D", 4), note("E", 4), note("D", 4), note("C", 4)
    ],
    yankeeDoodle: [
        note("C", 4), note("C", 4), note("D", 4), note("E", 4), note("C", 4), note("E", 4), note("D", 4),
        note("C", 4), note("C", 4), note("D", 4), note("E", 4), note("C", 4), note("B", 3),
        note("G", 3), note("C", 4), note("C", 4), note("D", 4), note("E", 4), note("F", 4), note("E", 4), note("D", 4), note("C", 4), note("B", 3), note("G", 3), note("A", 3), note("B", 3), note("C", 4), note("C", 4)
    ],
    twinkleStar: [
        note("G", 3), note("G", 3), note("D", 4), note("D", 4), note("E", 4), note("E", 4), note("D", 4), note("C", 4), note("C", 4), note("B", 3), note("B", 3), note("A", 3), note("A", 3), note("G", 3), note("D", 4), note("D", 4), note("C", 4), note("C", 4), note("B", 3), note("B", 3), note("A", 3), note("D", 4), note("D", 4), note("C", 4), note("C", 4), note("B", 3), note("B", 3), note("A", 3), note("G", 3), note("G", 3), note("D", 4), note("D", 4), note("E", 4), note("E", 4), note("D", 4), note("C", 4), note("C", 4), note("B", 3), note("B", 3), note("A", 3), note("A", 3), note("G", 3)
    ]
};

function note(letter, number) {
    const noteList = pNotes[letter];

    return noteList.filter(note => note[`${letter}${number.toString()}`])[0][`${letter}${number.toString()}`];
}

function toggleNoteDisplay(note) {
    const noteEl = document.querySelector(`div[data-note='${note}'`);
    noteEl.style.transform = "translateY(5px)";
    noteEl.style.opacity = "0.5";

    setTimeout(() => {
        noteEl.removeAttribute('style');
    }, 400)
}

function toggleHeadingCharDisplay() {
    const char = headingCharacters[Math.floor(Math.random() * headingCharacters.length)];
    char.style.transform = "translateY(-10px)";
    char.style.opacity = "0.5";

    setTimeout(() => {
        char.removeAttribute('style');
    }, 800)
}

function removeNoteDisplay() {
    keys.forEach(key => {
        key.removeAttribute('style');
    });
}

function removeCharDisplay() {
    headingCharacters.forEach(char => {
        char.removeAttribute("style");
    })
}

function playSongSequence(songNotes) {
    let seq = new Tone.Sequence(function (time, note) {
        removeNoteDisplay();
        toggleNoteDisplay(note);
        removeCharDisplay();
        toggleHeadingCharDisplay();

        // Get the note frequency
        const noteFreq = Tone.Frequency(note).toMidi();
        meter.style.height = meter.offsetHeight + (noteFreq * parseInt(note[note.length - 1])) + "px";
        meter.style.width = meter.offsetWidth + (noteFreq * parseInt(note[note.length - 1])) + "px";

        setTimeout(() => meter.removeAttribute("style"), 200);

        synth.triggerAttackRelease(note, "8n", time);
    }, songNotes, "4n");


    seq.start(0);
    seq.loop = 1;

    // When should the loop begin again after?
    // seq.loopEnd = "8m";

    Tone.Transport.start();
}