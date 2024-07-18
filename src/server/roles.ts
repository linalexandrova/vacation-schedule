import { firebaseDb } from '@/config/db';
import { ref, update, get, push, remove } from 'firebase/database';

export interface RoleData {
  name: string;
}

export async function createRole({ name }: RoleData) {
  try {
    const dbRef = ref(firebaseDb);
    const roleId = push(dbRef).key;

    const updates: Record<string, any> = {};
    updates[`roles/${roleId}`] = {
      name: name,
    };

    await update(dbRef, updates);
    return await getRoleById(roleId as string);
  } catch (error: any) {
    // console.error('createUser error:\n\n', error)
    throw new Error(error.message);
  }
}

export async function getRoleById(id: string) {
  try {
    const roleRef = ref(firebaseDb, `roles/${id}`);
    const roleSnapshot = await get(roleRef);
    return roleSnapshot.val();
  } catch (error: any) {
    // console.error('getRoleById error:\n\n', error)
    throw new Error(error.message);
  }
}

export async function fetchRoles() {
  try {
    const rolesRef = ref(firebaseDb, 'roles');
    const rolesSnapshot = await get(rolesRef);

    /* Default response from Firebase API:
    {
        '-O1uHHdmQ9jWl-aOE4L0': {
                                    name: 'admin'
                                }
    }

    Use code below for REST API presentation. Object converts to array.

    Response after convertation:
    [
        {
            id: '-O1uHHdmQ9jWl-aOE4L0'
            name: 'admin'
        },
        {
            id: '-O5uGHdbERjTL-jTY3N6'
            name: 'user'
        },
    ]
    */
    /* const roles = []
    for (const [key, value] of Object.entries(rolesSnapshot.val())) {
      roles.push({ ...value!, id: key })
    }
    return roles */

    return rolesSnapshot.val();
  } catch (error: any) {
    // console.error('fetchRoles error:\n\n', error)
    throw new Error(error.message);
  }
}

export async function removeRole(id: string) {
  try {
    const roleRef = ref(firebaseDb, `roles/${id}`);
    await remove(roleRef);
  } catch (error: any) {
    // console.error('removeRole error:\n\n', error)
    throw new Error(error.message);
  }
}
