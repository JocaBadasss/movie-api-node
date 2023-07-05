const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class MovieControllers {
  async create(req, res) {
    const { title, description, rating, tags } = req.body
    const { user_id } = req.params

    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
    })

    const tagsInsert = tags.map((tag) => {
      return {
        user_id,
        note_id,
        name: tag,
      }
    })

    await knex("movie_tags").insert(tagsInsert)

    return res.json()
  }

  async show(req, res) {
    const { id } = req.params

    const notes = await knex("movie_notes").where({ id }).first()

    const tags = await knex("movie_tags").where({ note_id: id }).orderBy("name")

    return res.json({
      ...notes,
      tags,
    })
  }

  async delete(req, res) {
    const { id } = req.params

    await knex("movie_notes").where({ id }).delete()

    return res.json()
  }

  async index(req, res) {
    const { user_id, title, tags } = req.query

    let notes

    if (tags) {
      const filteredTags = tags.split(',').map(t => t.trim())
      
      notes = await knex("movie_tags")
        .select([
          "movie_notes.id",
          "movie_notes.title",
          "movie_notes.user_id"
        ])
        .whereLike("movie_notes.title", `%${title}%`)
        .where("movie_notes.user_id", user_id)
        .whereIn("name", filteredTags)
        .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id")
        .orderBy("title")

    } else {
      notes = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }


    const userTags = await knex("movie_tags").where({ user_id })


    const noteWithTags = await notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    })



    return res.json(noteWithTags)
  }
}

module.exports = MovieControllers
