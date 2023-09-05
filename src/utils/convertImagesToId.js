export const imagesToId = async (storage, images, id) => {
    const ids = [];
    for (const image of images) {
        const convertedImage = (await storage.createFile("6499546407c2dc5f2d10", id, image)).$id;
        ids.push(convertedImage);
    }

    return ids;
};