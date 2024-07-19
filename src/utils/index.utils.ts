import * as bcrypt from 'bcrypt';

export  const hash = async (data: string): Promise<string>  => {
    return bcrypt.hash(data, bcrypt.genSaltSync(10, "a"));
}

export const compareHash = (nonHashedValue:string, hashedValue:string): boolean => {
    return bcrypt.compareSync(nonHashedValue, hashedValue);
}

export const formatResponse = (message:string = '', data:object = {}, status:boolean = false) =>{
    const result = {message , status , data};
    if(Object.values(data).length == 0){
        delete result.data;
    }
    return result;
}
   
export const sluggify = (data:string) => {
    return `${data.replace(/\s+/g, '-')}-${getRandomNumber(6)}`;
}

function getRandomNumber(length:number) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}