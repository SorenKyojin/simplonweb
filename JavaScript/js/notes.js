const notes = [10, 15, 8, 12, 14, 9, 16, 11, 13, 7];
let somme = 0;
let meilleureNote = notes[0];
for (const note of notes) {
    somme += note;
    if (note > meilleureNote) {
        meilleureNote = note;
    }
}
const moyenne = somme / notes.length;
document.getElementById("somme").textContent = somme;
document.getElementById("moyenne").textContent = moyenne;
document.getElementById("meilleure-note").textContent = meilleureNote;