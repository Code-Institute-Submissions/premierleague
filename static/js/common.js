function createGroup(dimension, teamName, attribute) {
    return dimension.group().reduceSum(function (d) {
        if (d["team"]== teamName){
            return d[attribute];
        } else {
            return 0
        }
    });
}
