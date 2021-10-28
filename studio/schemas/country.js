import { isUniqueAcrossAllDocuments } from './slug'


export default {
    name: "country",
    title: "Country",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
                isUnique: isUniqueAcrossAllDocuments

            }
        }
    ]
};
