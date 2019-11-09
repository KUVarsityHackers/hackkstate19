export interface ISession {
    instructor: IInstructor;
    title: string;
    subject: string;
    price: string;
    id:string | null;
}
export interface IInstructor {
    name: string;
    publickey: string;
}