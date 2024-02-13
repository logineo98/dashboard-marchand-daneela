export const packs = [
    {
        _id: 'first',
        pack_name: 'Pack Gold',
        options: [
            { authorize: true, name: 'Possibilité de répondre aux golds' },
            { authorize: false, name: 'Proposer un itinéraire à vos clients' },
            { authorize: false, name: 'Possibilité de personnalisation de son profil' },
        ],
        lists: [`● 5.000 FCFA/mois`, `● Remise de 25% à partir de 3 mois`, `● Remise de 30% à partir de 6 mois`, `● Remise de 35% à partir de 9 mois`, `● Remise de 40% pour abonnement de 1 an`],
        init_amount: 5000,
        check_name: 'Gold'
    },
    {
        _id: 'second',
        pack_name: 'Pack Diamond',
        options: [
            { authorize: true, name: 'Possibilité de répondre aux golds' },
            { authorize: true, name: 'Proposer un itinéraire à vos clients' },
            { authorize: false, name: 'Possibilité de personnalisation de son profil' },
        ],
        lists: [`● 10.000 FCFA/mois`, `● Remise de 25% à partir de 3 mois`, `● Remise de 30% à partir de 6 mois`, `● Remise de 35% à partir de 9 mois`, `● Remise de 40% pour abonnement de 1 an`],
        init_amount: 10000,
        check_name: 'Diamond'
    },
    {
        _id: 'third',
        pack_name: 'Pack Platinium',
        options: [
            { authorize: true, name: 'Possibilité de répondre aux golds' },
            { authorize: true, name: 'Proposer un itinéraire à vos clients' },
            { authorize: true, name: 'Possibilité de personnalisation de son profil' },
        ],
        lists: [`● 15.000 FCFA/mois`, `● Remise de 25% à partir de 3 mois`, `● Remise de 30% à partir de 6 mois`, `● Remise de 35% à partir de 9 mois`, `● Remise de 40% pour abonnement de 1 an`],
        init_amount: 15000,
        check_name: 'Platinium'
    },
]
