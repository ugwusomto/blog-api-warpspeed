export interface User{
    id:number;
    firstname:string;
    lastname:string;
    email:string;
    password:string;
    createdAt:string;
    updatedAt:string;
}


export interface Post{
    id:number;
    slug:string;
    title:string;
    content:string;
    status:string;
    creator:User;
    createdAt:string;
    updatedAt:string;
}