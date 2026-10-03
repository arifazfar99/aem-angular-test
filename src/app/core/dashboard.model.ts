export interface ChartItem {
    name: string;
    value: number;
}

export interface TableUser {
    firstName: string;
    lastName: string;
    username: string;
}

export interface DashboardData {
    success: boolean;
    chartDonut: ChartItem[];
    chartBar: ChartItem[];
    tableUsers: TableUser[];
}