const eleves = [
  { nom: "Awa", note: 14 },
  { nom: "Moussa", note: 9 },
  { nom: "Fatou", note: 17 },
  { nom: "Ali", note: 11 },
];

// 1. Afficher chaque élève sous la forme « Awa : 14/20 »
for (const eleve of eleves) {
    console.log(`${eleve.nom} : ${eleve.note}/20`);
}

// 2. Avec filter(), afficher la liste des admis (note de 10 ou plus)
const admis = eleves.filter(eleve => eleve.note >= 10);
console.log("Admis :", admis.map(eleve => eleve.nom).join(", "));

// 3. Trouver l’élève qui a la meilleure note
let meilleurEleve = eleves[0];
for (const eleve of eleves) {
    if (eleve.note > meilleurEleve.note) {
        meilleurEleve = eleve;
    }
}
console.log("Meilleure note :", `${meilleurEleve.nom} (${meilleurEleve.note})`);

// 4. Afficher les élèves classés de la meilleure à la moins bonne note, sans modifier le tableau élèves
const elevesTries = [...eleves].sort((a, b) => b.note - a.note);
console.log("Classement :", elevesTries.map(eleve => `${eleve.nom} (${eleve.note})`).join(", "));