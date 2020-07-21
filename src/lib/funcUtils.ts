const tagsArray: string[] = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div',
    'i', 'strong',
    'ol', 'ul', 'li',
    'a',
    'blockquote'
];
const tagsArrayLength = tagsArray.length;
const tags: string[] = [];
for (let i = 0; i < tagsArrayLength; i ++) {
    tags.push('<' + tagsArray[i] + '>');
    tags.push('</' + tagsArray[i] + '>');
}
tags.push('&nbsp;');
const tagsLength = tags.length;

export const removeTagsFromEditorData = (editorData: string) => {

    let str = editorData;
    for (let i = 0; i < tagsLength; i++) {
        const search = tags[i];
        const replaceWith = ' ';
        str = str.split(search).join(replaceWith);
    }

    return str;
};