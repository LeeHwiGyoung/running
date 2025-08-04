export const chunksArray = <T>(chunkSize : number , array : T[]) => {
    const chunkArray = [];
    for(let i = 0 ; i < array.length ; i += chunkSize){
        const chunk = array.slice(i , i + chunkSize);
        const chunkIndex = Math.floor(i / chunkSize);
        chunkArray.push({point : chunk , chunkId : chunkIndex });
    }
    return chunkArray;
}