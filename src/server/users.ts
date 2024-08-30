import { firebaseDb } from '@/config/db';
import { ref, update, get } from 'firebase/database';
import { type DataSnapshot } from '@firebase/database';
import type { User } from '@/types';

export interface UserData {
  id: string;
  email: string;
  name?: string;
  username?: string;
  avatar?: string | null;
}

export async function createUser({ id, email, name = '', username = '', avatar = null }: UserData) {
  try {
    const registeredAt = Date.now();
    const user = {
      email,
      name,
      username,
      roleId: '-O5IkYOrWfbD6OZAZ7De', // NOTE: default 'employee' role id from FB
      registeredAt,
      avatar,
    };

    const updates: Record<string, any> = {};
    updates[`users/${id}`] = user;

    await update(ref(firebaseDb), updates);
    return await fetchUser(id);
  } catch (error: any) {
    // console.error('createUser error:\n\n', error)
    throw new Error(error.message);
  }
}

export async function fetchUser(
  id: string,
  onlySnapshot: boolean = false,
): Promise<DataSnapshot | User | Error | undefined> {
  try {
    const userRef = ref(firebaseDb, `users/${id}`);
    const userSnapshot = await get(userRef);
    if (onlySnapshot) return userSnapshot;
    return userSnapshot.val() as User;
  } catch (error: any) {
    // console.error('fetchUser error:\n\n', error)
    throw new Error(error.message);
  }
}

export async function fetchUsers() {
  try {
    const usersRef = ref(firebaseDb, 'users');
    const usersSnapshot = await get(usersRef);
    return usersSnapshot.val() as { [id: string]: User };
  } catch (error: any) {
    // console.error('fetchUsers error:\n\n', error)
    throw new Error(error.message);
  }
}

export async function setRoleToUser(userId: string, roleId: string) {
  try {
    const updates: Record<string, any> = {};
    updates[`users/${userId}/roleId`] = roleId;
    await update(ref(firebaseDb), updates);
  } catch (error: any) {
    // console.error('setRoleToUser error:\n\n', error)
    throw new Error(error.message);
  }
}
