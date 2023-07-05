const {Category} = require('../models/models')
const uuid = require('uuid')
const path = require('path');
const fs = require('fs')
const ApiError = require('../middleware/ApiError')

class CategoryController {
    async create(req, res, next) {
        try {
            const {name, link,familyId} = req.body
            const {img} = req.files
            let view = true;
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            let familyCategory = await Category.findOne(
                {
                    id:familyId
                }
            )
            const levelId = familyId != 0 ? familyCategory.levelId+1 : 0;
            const category = await Category.create({name,view, link, levelId, familyId, img: fileName})

            return res.json(category)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async changeOne(req, res, next) {
        try {
            const {id} = req.params
            const {name, link,familyId} = req.body
            if(req.files)
            {
                const {img} = req.files

                let view = true;
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                const familyCategory = await Category.findOne(
                    {
                        where: {id: familyId}
                    },
                )
                const levelId = familyId != 0 ? familyCategory.levelId+1 : 0;
                const category = await Category.findByPk(id)
                category.name = name;
                category.link = link;
                category.levelId = levelId;
                category.familyId = familyId;
                if(category.img != 'avatar.png')
                    {
                        const deleteFile = path.join(__dirname, '..' , 'static', category.img)
                        if (fs.existsSync(deleteFile)) {
                            fs.unlink(deleteFile, (err) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('deleted');
                            })
                        }
                    }
                category.img = fileName
                category.save()
            return res.json(category)
            }
            else {
                const familyCategory = await Category.findOne(
                    {
                        where: {id: familyId}
                    },
                )
                const levelId = familyId != 0 ? familyCategory.levelId+1 : 0;
            const category = await Category.update({name, link, levelId,familyId},
                {
                    where: {id}
                },
            )
            return res.json(category)
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const categories = await Category.findAll({order: [
                ['name', 'ASC'],
            ]})
            return res.json(categories)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const category = await Category.findOne(
                {
                    where: {id}
                },
            )
            return res.json(category)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOne(req, res, next) {
        try {
            const {id} = req.params
            const category = await Category.findByPk(id)
                if(category.img != 'avatar.png')
                    {
                        const deleteFile = path.join(__dirname, '..' , 'static', category.img)
                        if (fs.existsSync(deleteFile)) {
                            fs.unlink(deleteFile, (err) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('deleted');
                            })
                        }
                    }
                category.destroy()
            return res.json(category)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new CategoryController()


// create, deleteOne, updateOne, findAll, findOne,