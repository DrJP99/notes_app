import tagService from '../services/tags'

export const tagFiller = async (notes) => {
	const allTags = await tagService.getAll()
	// const newTags = []

	const newNotes = notes.map((note) => {
		if (note.tags[0] !== null) {
			const newTagObjects = note.tags.map((tag) => {
				const selectedTag = allTags.findIndex((t) => {
					return t.tag_id === tag
				})
				return { ...allTags[selectedTag] }
			})

			return { ...note, tags: newTagObjects }
		} else {
			return { ...note, tags: null }
		}
	})

	return newNotes
}
