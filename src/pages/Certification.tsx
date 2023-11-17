import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// my importations
import PageContainer from '../components/common/layout/page_container/PageContainer'
import { page_certification } from '../utils/page_name'

const Certification = () => {

    const [acceptCondition, setAcceptCondition] = useState(false)

    const handleValidate = () => { }

    return (
        <PageContainer page_name={page_certification}>
            <div className='certification_container'>
                {/* description */}
                <div className='certification'>
                    <h1 className='certification_title'>Description</h1>
                    <p className='certification_text'>
                        La certification du marchand permet de crédibiliser le profil de ce dernier auprès des clients. Cette certification est signalée par un badge sur le profil. Pour être éligible à la certification, le marchand doit en faire la demande et répondre à des critères.
                        Il est à noter que le marchand peut perdre son badge s’il enfreint les conditions générales d’utilisation de la plateforme ou ne répond plus aux critères. Le marchand devra faire une nouvelle demande de certification s' il modifie les informations de son profil. <br />
                        Les critères pour être éligible à la certification sont :
                    </p>
                    <ul className='certification_list'>
                        <li className='certification_list_item'>● Avoir souscrit à au moins au forfait GOLD</li>
                        <li className='certification_list_item'>● Un numéro de téléphone vérifié</li>
                        <li className='certification_list_item'>● Une adresse email confirmée</li>
                        <li className='certification_list_item'>● Une adresse physique vérifiée</li>
                        <li className='certification_list_item'>● Une biographie</li>
                        <li className='certification_list_item'>● Une photo de profil</li>
                        <li className='certification_list_item'>● Une photo de couverture</li>
                        <li className='certification_list_item'>● Un site internet à jour</li>
                        <li className='certification_list_item'>● Avoir un taux d'acceptation de 100%</li>
                        <li className='certification_list_item'>● Avoir un taux de résolution des réclamation de 100%</li>
                        <li className='certification_list_item'>● Être conforme aux CGU</li>
                    </ul>
                </div>
                {/* avantage */}
                <div className='certification'>
                    <h1 className='certification_title'>Avantages</h1>
                    <ul className='certification_list'>
                        <li className='certification_list_item'>■ Meilleure visibilité</li>
                        <li className='certification_list_item'>■ Meilleur référencement</li>
                        <li className='certification_list_item'>■ Gage de sérieux auprès des clients</li>
                    </ul>
                </div>
                {/* condition générale */}
                <div className='certification'>
                    <h1 className='certification_title'>Conditions générales d’adhésion</h1>
                    <div className='certification_content_container'>
                        {/* objet */}
                        <div className='certification_content'>
                            <h2 className='certification_content_title'>1. Objet</h2>
                            <p className='certification_text'>
                                Les présentes conditions d'adhésion marchand ont pour objet de définir les conditions dans lesquelles Daneela met à la
                                disposition des marchands, dans le cadre du Service, des outils technologiques permettant à ceux-ci de mettre en vente les Produits.
                            </p>
                        </div>
                        {/* description du service */}
                        <div className='certification_content'>
                            <h2 className='certification_content_title'>2. Description du service</h2>
                            <p className='certification_text'>
                                Le Service est constitué d'un ensemble d'outils permettant aux marchands de se mettre en relation avec des Acheteurs, afin de leur proposer des Produits à la vente, de référencer et de décrire ces Produits, d'accepter les commandes passées par les Acheteurs, de percevoir le prix des Produits achetés et de gérer le service après-vente pour les Produits vendus. <br />
                                Les transactions effectuées via le Service pour les besoins de la vente des Produits sont conclues directement entre l'Acheteur et le marchand. Daneela n'est en aucun cas marchand des Produits proposés par les marchands par l'intermédiaire du Service. <br />
                                Par ailleurs, en cas de non-respect des présentes conditions d'adhésion marchand, Daneela se réserve le droit d'interrompre de manière temporaire ou définitive l'accès au Service au marchand concerné.
                            </p>
                        </div>
                        {/* obligation relative aux transactions */}
                        <div className='certification_content'>
                            <h2 className='certification_content_title'>3. Obligations relatives aux transactions réalisées par l'intermédiaire du service</h2>
                            <h3 className='certification_content_title2'>3.1. Obligations d'ordre général</h3>
                            <p className='certification_text'>
                                Le Vendeur doit s'identifier auprès des Acheteurs comme agissant ou non en qualité de professionnel. Il s'engage expressément à s'identifier comme agissant en qualité de Vendeur professionnel dès lors qu'il effectue des ventes de Produits par l'intermédiaire du Service de manière régulière et à des fins lucratives. <br />
                                Le Vendeur s'engage à respecter la législation applicable en matière d'exercice d'une activité commerciale (notamment immatriculation, obligations comptables, sociales et fiscales). <br />
                                Le Vendeur s'engage également à respecter les lois et règlements qui lui incombent en sa qualité de professionnel eu égard notamment aux Produits qu'il vend sur le Site. <br />
                                Par ailleurs, le Vendeur s'interdit expressément de promouvoir directement ou indirectement, sous quelque forme que ce soit (notamment par l'insertion de liens hypertextes, de tout message dans le descriptif des Produits, de tout imprimé dans les colis expédiés à l'Acheteur, ou encore par l'utilisation de l'adresse URL de son site Internet dans son identifiant ou sur la page Vendeur, ou par l’utilisation d’un carton d’emballage) ses produits ou services, de même que ceux de tout autre personne. <br />
                                Le Vendeur s'engage à mettre en œuvre tous les moyens de façon à satisfaire de manière optimale à ses obligations en délivrant un service de qualité vis-à-vis des Acheteurs. <br />
                                Il s'engage notamment pour cela à répondre aux emails du Service Client et du Service Commercial de Daneela ainsi qu'aux emails des Acheteurs dans un délai de 2 jours ouvrés à compter de leur réception, et ce, en langue française. <br />
                                Tout échange entre le Vendeur et Daneela est strictement confidentiel. Le Vendeur s’engage donc à ne pas divulguer le contenu de ces échanges à un tiers. <br />
                                Le Vendeur s’interdit, et sans que cette liste soit limitative, d’utiliser des visuels ou des noms commerciaux, des pseudonymes ou de tenir des propos ou autres messages qui seraient injurieux, contraires à l‘ordre public ou aux bonnes mœurs, qui porteraient atteinte aux droits de personnes ou aux droits de propriété intellectuelle de tiers, aux lois et règlements et à l’image de marque FNAC. A défaut , Daneela se réserve le droit d'interrompre de manière temporaire ou définitive l'accès au Service au Vendeur concerné. <br />
                            </p>
                            <h3 className='certification_content_title2'>3.2. Obligations relatives aux offres de Produits sur le Site</h3>
                            <p className='certification_text'>
                                Le Vendeur s'engage et garantit qu'il ne vendra que des Produits dont il est propriétaire ou sur lesquels il dispose des droits lui permettant de les vendre. Il garantit qu'ils ne contreviennent en aucune façon aux lois, réglementations en vigueur et normes applicables, obligatoires ou non. Le Vendeur est seul responsable de la mise en vente des Produits qu'il propose sur le Service. <br />
                                Le Vendeur s’interdit notamment de proposer sur le Site sans que cette liste soit limitative : des produits à caractère pornographique et plus généralement portant atteinte aux bonnes mœurs ; les biens incitant à la haine raciale ou objets de discrimination basée sur la race, le sexe, la religion, nationalité, les capacités physiques, ou l’âge ; les objets volés ; les médicaments ou drogues de tous types ; les armes, armes de guerre et munitions ; les animaux vivants ; les boissons alcooliques. <br />
                                Sur le descriptif associé aux offres de Produits qu'il propose sur le Site, le Vendeur s'engage à agir de bonne foi. Il est seul responsable de l'exactitude des mentions y figurant et s'engage à ce qu'elles ne risquent pas d'induire en erreur les Acheteurs potentiels, tant sur les caractéristiques du Produit, les garanties associées, que sur son état ou son prix. Concernant plus particulièrement les Produits d'occasion, le Vendeur devra faire un descriptif précis de l'état du produit. Le Vendeur communique aux Acheteurs toutes les informations leur permettant de connaître les caractéristiques essentielles du Produit (le cas échéant, composition du Produit, accessoires compris, origine, les garanties légales, les modalités de leurs mises en œuvre, ou toutes autres conditions contractuelles etc.). <br />
                                Le Vendeur s'engage en outre à ce que les illustrations / visuels fournis dans le descriptif associé aux offres de Produits qu'il propose (photographie, dessin, etc.) soient conformes aux Produits ainsi illustrés et respectent les droits des tiers et qu’ils ne portent pas atteinte à l‘ordre public ou aux bonnes mœurs. Il garantit Daneela qu'il dispose des droits, en particulier de propriété intellectuelle, afférents à ces illustrations, qui lui permettent de les utiliser afin de présenter les Produits. <br />
                                Daneela pourra supprimer toute information mise en ligne sur le Site par un Vendeur en cas de notification d’un tiers faisant état du caractère illicite de cette information ou d’une violation d’un droit. <br />
                                Le Vendeur devra également préciser dans le descriptif associé aux offres le pays d’expédition des Produits. <br />
                            </p>
                        </div>
                        {/* evaluation des marchands */}
                        <div className='certification_content'>
                            <h2 className='certification_content_title'>4. Evaluation des marchands</h2>
                            <p className='certification_text'>
                                Les marchands répondant à certains critères bénéficient d’une certification qui est sanctionnée par un badge. <br />
                                Les critères pour être éligible à la certification sont :
                            </p>
                            <ul className='certification_list'>
                                <li className='certification_list_item'>● avoir souscrit à au moins au forfait GOLD</li>
                                <li className='certification_list_item'>● Un numéro de téléphone vérifié</li>
                                <li className='certification_list_item'>● Une adresse email confirmée</li>
                                <li className='certification_list_item'>● Une adresse physique vérifiée</li>
                                <li className='certification_list_item'>● Une biographie</li>
                                <li className='certification_list_item'>● Une photo de profil</li>
                                <li className='certification_list_item'>● Une photo de couverture</li>
                                <li className='certification_list_item'>● Un site internet à jour</li>
                                <li className='certification_list_item'>● Avoir un taux d'acceptation de 100%</li>
                                <li className='certification_list_item'>● Avoir un taux de résolution des réclamation de 100%</li>
                                <li className='certification_list_item'>● Être conforme aux CGU</li>
                            </ul>
                            <p className='certification_text'>
                                Daneela met à la disposition des Acheteurs des moyens leur permettant d'évaluer la performance des marchand à l'issue de la confirmation de la réception du Produit commandé, permettant ainsi aux Acheteurs de sélectionner les Produits chez les marchand les plus sérieux et qui respectent le mieux les conditions d'utilisation du Service. <br />
                                En cas de manquement par le marchand à ses obligations, le compte du marchand perdra automatiquement sa certification.
                            </p>
                        </div>
                    </div>
                </div>
                {/* accepter les conditions d'utilisation */}
                <label htmlFor='condition_utilisation' className='condition_utilisation_container'>
                    <input type='checkbox' name='condition_utilisation' id='condition_utilisation' value='true' onChange={e => setAcceptCondition(e.target.checked)} className='condition_utilisation' />
                    J'accepte les conditions d'utilisation de Daneela
                </label>
                {/* valider ou annuler */}
                <div className='validate_cancel_container'>
                    <Link to='/demandes' className='cancel'>Annuler</Link>
                    {acceptCondition && <button className='validate' onClick={handleValidate}>Valider</button>}
                </div>
            </div>
        </PageContainer>
    )
}

export default Certification