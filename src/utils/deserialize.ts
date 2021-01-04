const deserialize = (field: object, emptyObj: any) => {
    Object.entries(field).forEach(
        ([key, value]: [string, object]) => emptyObj[key] = value
    );
    return emptyObj;
};

export default deserialize;
