import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import useApi, { DetailsResult } from '../hooks/useApi';
import { starHalfOutline, sync } from 'ionicons/icons';

interface DetailsPageProps
    extends RouteComponentProps<{
        id:string;
    }> {}


const Details: React.FC<DetailsPageProps> = ({ match }) => {
    const { getDetails } = useApi()
    const [information, setInformation] = useState<DetailsResult | null>(null);

    useIonViewWillEnter(async () => {
     const id =  match.params.id  
     const data = await getDetails(id)
     setInformation(data)
     console.log('🚀~ file: Details.tsx:26 ~ useIonViewWillEnter ~ data', data);
    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref="movies"></IonBackButton>
                    </IonButtons>
                    <IonTitle>{information?.Genre}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {information && (
                    <IonCard>
                <IonCardHeader>
                    <IonCardTitle>{information.Title}</IonCardTitle>
                    <IonCardSubtitle>{information.Year}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonImg src={information.Poster} />
                    <IonItem lines="none">
                        <IonIcon icon={starHalfOutline} slot="start" color="warning"></IonIcon>
                        <IonLabel>{information.imdbRating}</IonLabel>
                    </IonItem>
                </IonCardContent>
                </IonCard>
)}

            </IonContent>
        </IonPage>
    )
}

export default Details;