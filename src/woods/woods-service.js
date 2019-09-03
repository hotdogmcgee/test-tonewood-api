const xss = require('xss')
const Treeize = require('treeize')

//why is userFields used in thingful server?
const WoodsService = {
    getAllWoods(db) {
        return db
        .from('tonewoods AS tw')
        .select(
            'tw.id',
            'tw.genus',
            'tw.species',
            'tw.common_name',
            'tw.date_created',
            ...userFields
        )
        .leftJoin(
            'tw_users AS usr',
            'tw.user_id',
            'usr.id'
        )
        .groupBy('tw.id', 'usr.id')
    },

    getById(db, id) {
      return WoodsService.getAllWoods(db)
        .where('tw.id', id)
        .first()
    },

    insertWood(knex, newWood) {
        return knex
          .insert(newWood)
          .into('tonewoods')
          .returning('*')
          .then(rows => {
            return rows[0]
          })
    },

    serializeWoods(woods) {
        return woods.map(this.serializeWood)
      },
      serializeWood(wood) {
        const woodTree = new Treeize()
    
        // Some light hackiness to allow for the fact that `treeize`
        // only accepts arrays of objects, and we want to use a single
        // object.
        const woodData = woodTree.grow([ wood ]).getData()[0]
    
        return {
          id: woodData.id,
          genus: xss(woodData.genus),
          species: xss(woodData.species),
          common_name: xss(woodData.common_name),
          date_created: woodData.date_created,
          user: woodData.user || {},
        }
      },
    
    }
    
    const userFields = [
      'usr.id AS user:id',
      'usr.user_name AS user:user_name',
      'usr.full_name AS user:full_name',
      'usr.nickname AS user:nickname',
      'usr.date_created AS user:date_created',
      'usr.date_modified AS user:date_modified',
    ]
    
    module.exports = WoodsService