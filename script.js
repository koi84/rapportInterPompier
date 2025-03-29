// URL de ton Webhook Discord
const webhookUrl = 'https://discord.com/api/webhooks/1355597746324902017/tVSP-Rve2qExRjmBLliG4bFCrA7Ek0MuX_CKGm6rlsplZvHPEcPqfPxAuqbUg8KlvItR';

// Fonction pour générer le rapport
function genererRapport() {
    const date = document.getElementById("date").value;
    const heure = document.getElementById("heure").value;
    const pompiers = document.getElementById("pompiers").value;
    const lieu = document.getElementById("lieu").value;
    const type = document.getElementById("type").value;

    if (!date || !heure || !pompiers || !lieu || !type) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    const rapportMessage = {
        content: `🚨 **Rapport d'Intervention** 🚒\n\n` +
                 `📅 **Date** : ${date}\n` +
                 `🕒 **Heure** : ${heure}\n` +
                 `👨‍🚒 **Nom des Pompiers** : ${pompiers}\n` +
                 `📍 **Lieu** : ${lieu}\n` +
                 `🚨 **Type d'Intervention** : ${type}`
    };

    // Envoi du message au webhook Discord
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rapportMessage)
    })
    .then(response => {
        if (!response.ok) {
            console.error('Erreur lors de l\'envoi :', response.statusText);
            throw new Error('Erreur lors de l\'envoi du message');
        }
        return response.json();
    })
    .then(data => {
        console.log("Réponse du Webhook Discord:", data);
        afficherModale("Rapport envoyé avec succès !");

        // Réinitialiser les champs après l'envoi
        document.getElementById("date").value = '';
        document.getElementById("heure").value = '';
        document.getElementById("pompiers").value = '';
        document.getElementById("lieu").value = '';
        document.getElementById("type").value = '';
    });
}

// Fonction pour afficher la modale de confirmation
function afficherModale(message) {
    const modale = document.createElement('div');
    modale.classList.add('modale');
    modale.innerHTML = `
        <div class="modale-content">
            <h2>${message}</h2>
            <button onclick="fermerModale()">Fermer</button>
        </div>
    `;
    document.body.appendChild(modale);
}

// Fonction pour fermer la modale
function fermerModale() {
    const modale = document.querySelector('.modale');
    if (modale) {
        modale.remove();
    }
}
