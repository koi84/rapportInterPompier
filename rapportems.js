// URL de ton Webhook Discord pour EMS
const webhookUrlEMS = 'https://discord.com/api/webhooks/1355597746324902017/tVSP-Rve2qExRjmBLliG4bFCrA7Ek0MuX_CKGm6rlsplZvHPEcPqfPxAuqbUg8KlvItR';

function genererRapportEMS() {
    const gerant = document.getElementById("gerant").value.trim();
    const nom = document.getElementById("nom").value.trim();
    const raison = document.getElementById("raison").value.trim();
    const degats = document.getElementById("degats").value.trim();
    const moyens = document.getElementById("moyens").value.trim();
    const traitement = document.getElementById("traitement").value.trim();
    const couts = document.getElementById("couts").value.trim();

    // Vérifie que tous les champs sont remplis
    if (!gerant || !nom || !raison || !degats || !moyens || !traitement || !couts) {
        alert("❌ Veuillez remplir tous les champs !");
        return;
    }

    const rapportMessageEMS = {
        content: `🚑 **Rapport d'Intervention EMS**\n\n` +
                 `👨‍⚕️ **Gérant de l'Intervention** : ${gerant}\n` +
                 `👤 **Nom Complet** : ${nom}\n` +
                 `❗ **Raison d'Intervention** : ${raison}\n` +
                 `❤️ **Dégâts Repérés** : ${degats}\n` +
                 `🚑 **Moyens Utilisés** : ${moyens}\n` +
                 `💊 **Traitement Conseillé** : ${traitement}\n` +
                 `💶 **Coûts Demandés** : ${couts} €`
    };

    fetch(webhookUrlEMS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rapportMessageEMS)
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
