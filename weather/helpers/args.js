const getArgs = (args) => {
    const res = {}
    const [exec, file, ...rest] = args;
    let currentFlag = null;

    rest.forEach((val, index, arr) => {
        if(res[currentFlag] && val.charAt(0) != '-') {
            res[currentFlag].push(arr[index])
        } else {
            currentFlag = val.substring(1);
            if(index == arr.length - 1) {
                res[currentFlag] = true;
            } else {
                res[currentFlag] = [];
            }
        }
    });
    return res;
}

export { getArgs }