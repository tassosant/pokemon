export class StorageUtil{

    public static storageSave<T>(key: string, value: T): void{
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    public static storageRead<T>(key: string) : T | undefined{
        const storedValue = sessionStorage.getItem(key);
        try {
            if(storedValue){
                return JSON.parse(storedValue) as T;
            }else{
                return undefined;
            }
            
        } catch (error) {
            // we remove it because if we cannot convert it to JSON it means that we can't read it
            console.log(error);
            sessionStorage.removeItem(key);
            return undefined;
        }
    }
}

