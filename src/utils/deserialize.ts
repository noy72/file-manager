const deserialize = (obj: object, Cls: any) => {
    const cls = new Cls();
    Object.entries(obj).forEach(
        ([key, value]: [string, object]) => cls[key] = value
    );
    return cls;
};

export default deserialize;
