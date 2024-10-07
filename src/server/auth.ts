import { firebaseApp } from '@/config/db';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth as getFirebaseAuth,
  type User as FirebaseUser,
} from 'firebase/auth';
import { createUser, fetchUser, type UserData } from './users';
import type { DataSnapshot } from 'firebase/database';
import { getRoleById } from './roles';
import type { User } from '@/types';

export interface UserCredentials {
  email: string;
  password: string;
}

export function getAuth(): Promise<FirebaseUser | null> {
  return new Promise((resolve) => {
    const auth = getFirebaseAuth(firebaseApp);
    auth.onAuthStateChanged((user) => {
      // console.log('Firebase user:', user);
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
}

export async function registerUserWithEmailAndPassword(userData: UserCredentials) {
  try {
    const auth = getFirebaseAuth(firebaseApp);
    return await createUserWithEmailAndPassword(auth, userData.email, userData.password);
  } catch (error: any) {
    // console.error('registerUserWithEmailAndPassword error:\n\n', error)
    throw new Error(error.message);
  }
}

export async function loginWithEmailAndPassword(userData: UserCredentials) {
  try {
    const auth = getFirebaseAuth(firebaseApp);
    return await signInWithEmailAndPassword(auth, userData.email, userData.password);
  } catch (error: any) {
    // console.error('loginWithEmailAndPassword error:\n\n', error)
    throw new Error(error.message);
  }
}

export async function fetchAuthUser() {
  try {
    const authUser = await getAuth();
    // console.log('authUser', authUser);

    if (!authUser) {
      throw new Error(`Not Authorized`);
    }

    const snapshot = await fetchUser(authUser.uid, true);

    if (!(snapshot as DataSnapshot).exists()) {
      const user: UserData = {
        id: authUser.uid,
        email: authUser.email as string,
      };
      await createUser(user);
    }

    const userSnapshot = await fetchUser(authUser.uid);

    if (!userSnapshot) {
      throw new Error(`User not found`);
    }

    const roleSnapshot = await getRoleById((userSnapshot as User).roleId);

    const user = {
      ...userSnapshot,
      id: authUser.uid,
      role: roleSnapshot.name || '',
    };

    return user;
  } catch (error: any) {
    // console.error('fetchAuthUser error:\n\n', error)
    throw new Error(error.message);
  }
}
