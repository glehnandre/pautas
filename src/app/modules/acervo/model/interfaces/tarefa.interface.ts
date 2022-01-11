export interface Tarefa {
    id: number;
    processBusinessKey: string;
    informationId: string;
    searchableId: string;
    tenantId: number;
    title: string;
    command: string;
    context: string;
    assignee: string;
    assigneeGroup: number;
    startDate: string;
    completedDate: string;
    claimDate: string;
    notes: string;
    completed: boolean;
    priority: boolean;
    cancelable: boolean;
    readOnly: boolean;
    cancellation: null;
    draft: null;
    etags: Array<string>;
    extraInfo: {} | null;
    name?: string;
    mobile?: {};
    restricted?: boolean;
    assigner?: string;
}
