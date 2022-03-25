const {getCurrentDate, slugifyURL} = require('../globals/helpers')

module.exports = function(data){
    // TODO: validate parameters before mapping to model
    this.title = data.title
    this.desc = data.desc
    this.body = data.body
    this.postDate = getCurrentDate()
    this.slug = slugifyURL(this.title)
}
