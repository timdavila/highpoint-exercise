import { Photo } from './Photo';

const apiBaseURL = 'https://collectionapi.metmuseum.org';
const pageSize = 20; // We could make this a user facing option given more time

async function fetchObjectData(objectIDs: number[]) {
    const results = [];
    for (const objectID of objectIDs) {
        const res = await fetch(`${apiBaseURL}/public/collection/v1/objects/${objectID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const body = await res.json();
        const object: Photo = {
            id: objectID,
            url: body.primaryImageSmall || body.primaryImage,
            title: body.title || 'No title available',
            accessionYear: body.accessionYear,
            isPublicDomain: body.isPublicDomain,
            department: body.department,
            objectName: body.objectName,
            culture: body.culture,
            period: body.period,
            artistDisplayName: body.artistDisplayName,
            medium: body.medium,
            classification: body.classification,
            objectURL: body.objectURL
        }
        results.push(object);
    }
    return results;
}
export async function list(page: number = 0, departmentId?: string) {
    try {
        const url = new URL(`${apiBaseURL}/public/collection/v1/objects`);
        if (departmentId) {
            url.searchParams.append('departmentIds', departmentId);
        }
        const res = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const body = await res.json();
        if (body.objectIDs) {
            const objectIDs = body.objectIDs.slice(page * pageSize, (page + 1) * pageSize);
            const objectData = await fetchObjectData(objectIDs);
            return objectData;
        } else {
            console.error('Error fetching object data');
            return [];
        }
    } catch (err: Error | unknown) {
        if (err instanceof Error) {
            console.error("Error fetching collections");
            return [];
        } else {
            console.error('Unknown error', err);
            return [];
        }
    }
}

export async function fetchDepartments() {
    try {
        const res = await fetch(`${apiBaseURL}/public/collection/v1/departments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const body = await res.json();
        console.log(body.departments);
        return body.departments;
    } catch (err: Error | unknown) {
        if (err instanceof Error) {
            console.error("Error fetching departments");
            return [];
        } else {
            console.error('Unknown error', err);
            return [];
        }
    }
}