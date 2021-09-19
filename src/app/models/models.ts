export interface Employee {
    id: number;
    name: string;
    age: number;
    job: string;
}

export interface APIParams {
    page: number;
    sortBy: string;
    sortOrder: string;
    searchTerm: string;
}
