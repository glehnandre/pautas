export interface ITask {
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
    extraInfo: {
        [key: string]: string;
    } | null;
    etags: Array<string>;
    name?: string;
    restricted?: boolean;
    assigner?: string;
    mobile?: {
        type: string;
        entry: string;
    } | null;
}

export interface ITaskTag {
    id: string;
    name: string;
    color: string;
    type: string;
    tasks: Array<string>;
}

export interface SetNotesTaskCommand {
    taskId: number;
    notes: string;
}
