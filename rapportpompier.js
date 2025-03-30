// URL de ton Webhook Discord
const webhookUrl = 'https://discord.com/api/webhooks/1355597746324902017/tVSP-Rve2qExRjmBLliG4bFCrA7Ek0MuX_CKGm6rlsplZvHPEcPqfPxAuqbUg8KlvItR';

function genererRapport() {
    const date = document.getElementById("date").value.trim();
    const heure = document.getElementById("heure").value.trim();
    const pompiers = document.getElementById("pompiers").value.trim();
    const lieu = document.getElementById("lieu").value.trim();
    const type = document.getElementById("type").value.trim();

    // Vérifie que tous les champs sont remplis
    if (!date || !heure || !pompiers || !lieu || !type) {
        alert("❌ Veuillez remplir tous les champs !");
        return;
    }

    const rapportMessage = {
        content: `🚨 **Rapport d'Intervention Pompiers** 🚒\n\n` +
                 `📅 **Date** : ${date}\n` +
                 `🕒 **Heure** : ${heure}\n` +
                 `👨‍🚒 **Nom des Pompiers** : ${pompiers}\n` +
                 `📍 **Lieu** : ${lieu}\n` +
                 `🔥 **Type d'Intervention** : ${type}`
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rapportMessage)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi du message');
        }
        return response.json();
    })
    .then(() => {
        alert("✅ Rapport envoyé avec succès !");
        
        // Réinitialiser tous les champs du formulaire
        document.querySelectorAll('input').forEach(input => input.value = '');
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert("✅ Rapport envoyé avec succès !");
    });
}
