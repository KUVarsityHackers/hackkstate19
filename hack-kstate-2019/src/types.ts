export interface ISession {
    instructor: IInstructor;
    title: string;
    subject: string;
    price: string;
}
export interface IInstructor {
    name: string;
    id: string | null;
    publickey?: string;
}