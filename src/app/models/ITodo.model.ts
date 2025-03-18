export interface ITodoModel{
    idTodo: number;
    title: string;
    description: string;
    status: string;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
    isDeleted: boolean;
}