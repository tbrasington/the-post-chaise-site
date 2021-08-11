import S from '@sanity/desk-tool/structure-builder';

export default () =>
	S.list()
		.title('Content')
		.items([
			S.listItem()
				.title('Site Metadata')
        .child(S.editor().schemaType('site_metadata').documentId('site_metadata')),
        ...S.documentTypeListItems().filter((listItem) => ![ 'site_metadata' ].includes(listItem.getId()))
		]);
