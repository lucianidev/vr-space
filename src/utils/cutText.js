export const cutText = (text) => {
    if(text.split(' ').length > 50) return text.slice(0,50);

    return text;
}