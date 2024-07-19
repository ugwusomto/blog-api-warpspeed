
export const formatResponse = (message:string = '', data:object = {}, status:boolean = false) =>{
    const result = {message , status , data};
    if(Object.values(data).length == 0){
        delete result.data;
    }
    return result;
}
   