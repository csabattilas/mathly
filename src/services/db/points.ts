import { firebaseDb } from '../firebase'
import {
    doc,
    getDoc,
    setDoc,
    collection,
    DocumentData,
    QueryDocumentSnapshot,
    SnapshotOptions,
} from 'firebase/firestore'

export interface Points extends DocumentData {
    points: number
}

const pointsConverter = {
    toFirestore(points: Points): Points {
        return { points: points.points }
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Points {
        const data = snapshot.data(options) as Points
        return { points: data.points }
    },
}

/**
 * Interface representing a user document in Firestore.
 */

const COLLECTION_NAME = 'users'

export const updatePoints = async (userId: string, points: number) => {
    await setDoc(getDocRef(userId), {
        points,
    })
}

export const getCurrentPoints = async (userId: string) => {
    const docSnap = await getDoc(getDocRef(userId))

    if (docSnap.exists()) {
        console.log('exists')
        return docSnap.data()?.points
    } else {
        console.log('doesnt')
        await updatePoints(userId, 0)
        return 0
    }
}

const getDocRef = (userId: string) => {
    return doc(firebaseDb, COLLECTION_NAME, userId).withConverter(
        pointsConverter
    )
}
