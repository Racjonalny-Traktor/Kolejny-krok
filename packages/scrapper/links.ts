// export const linkToAllRoles = '/sciezki-kariery';


const baseUrl = 'https://mapakarier.org/_next/data/TFB5YHYlWb/miasto-zawodow';

export const role = 'https://mapakarier.org/_next/data/TFB5YHYlWb/miasto-zawodow/zawod/114/k.json?id=114&gender=k';
export const roles = 'https://mapakarier.org/_next/data/TFB5YHYlWb/miasto-zawodow.json';
export const building = 'https://mapakarier.org/_next/data/TFB5YHYlWb/miasto-zawodow/budynek/123/k.json?id=123&gender=k';

export const getLinkToOccupation = (occupationId: number, male?: boolean): string => `https://mapakarier.org/_next/data/TFB5YHYlWb/miasto-zawodow/zawod/${occupationId}/${male ? 'm' : 'k'}.json`;
export const getLinkToBuildingDetails = (buildingId: number, male?: boolean): string => `https://mapakarier.org/_next/data/TFB5YHYlWb/miasto-zawodow/budynek/${buildingId}/${male ? 'm' : 'k'}.json`;

