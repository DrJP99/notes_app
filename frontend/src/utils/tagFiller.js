import tagService from '../services/tags'

const tagFillerHelper = (note, allTags) => {
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
}

export const tagFiller = async (notes, allTags = null) => {
	if (!allTags) {
		allTags = await tagService.getAll()
	}
	// const newTags = []

	if (Array.isArray(notes)) {
		const newNotes = notes.map((note) => {
			return tagFillerHelper(note, allTags)
		})
		return newNotes
	} else {
		return tagFillerHelper(notes, allTags)
	}
}
