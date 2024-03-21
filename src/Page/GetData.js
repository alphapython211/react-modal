import data from "./Data";

const GetData = async (page) => {
    const pageSize = 5;
    const startIndex =
        (page - 1) * pageSize;
    const endIndex =
        startIndex + pageSize;
    const slicedData =
        data.slice(startIndex, endIndex);

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(
                {
                    data: slicedData,
                    totalPages: Math.ceil(data.length / pageSize)
                });
        }, 1000);
    });
};

export default GetData;