// URL de ton Webhook Discord pour EMS
const webhookUrlEMS = 'https://discord.com/api/webhooks/1355597746324902017/tVSP-Rve2qExRjmBLliG4bFCrA7Ek0MuX_CKGm6rlsplZvHPEcPqfPxAuqbUg8KlvItR';

function genererRapportEMS() {
    const gerant = document.getElementById("gerant").value;
    const nom = document.getElementById("nom").value;
    const raison = document.getElementById("raison").value;
    const degats = document.getElementById("degats").value;
    const moyens = document.getElementById("moyens").value;
    const traitement = document.getElementById("traitement").value;
    const couts = document.getElementById("couts").value;

    if (!gerant || !nom || !raison || !degats || !moyens || !traitement || !couts) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    const rapportMessageEMS = {
        content: `🚑 **Rapport d'Intervention EMS**\n\n` +
                 `Gérant de l'Intervention : ${gerant}\n` +
                 `Nom Complet : ${nom}\n` +
                 `Raison d'Intervention : ${raison}\n` +
                 `Dégâts Repérés : ${degats}\n` +
                 `Moyens Utilisés : ${moyens}\n` +
                 `Traitement Conseillé : ${traitement}\n` +
                 `Coûts Demandés : ${couts}`
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
            console.error('Erreur lors de l\'envoi :', response.statusText);
            throw new Error('Erreur lors de l\'envoi du message');
        }
        return response.json();
    })
    .then(data => {
        console.log("Réponse du Webhook Discord EMS:", data);
        alert("Rapport envoyé avec succès !");
        // Réinitialiser les champs après l'envoi
        document.getElementById("gerant").value = '';
        document.getElementById("nom").value = '';
        document.getElementById("raison").value = '';
        document.getElementById("degats").value = '';
        document.getElementById("moyens").value = '';
        document.getElementById("traitement").value = '';
        document.getElementById("couts").value = '';
    });
}
