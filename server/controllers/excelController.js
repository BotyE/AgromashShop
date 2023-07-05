const ApiError = require('../middleware/ApiError')
const { Device, Category } = require('../models/models')
const XLSX = require("xlsx"); 

class ExcelController {
    async getAll(req, res, next) {
        try {
            const {file} = req.files
            var wb = XLSX.read(file.data)
            let worksheet = wb.Sheets[wb.SheetNames[0]]
            const data = XLSX.utils.sheet_to_json(worksheet)
            const image = 'avatar.png';
            let arr = []
            for(let i=1; i<data.length-1;i++)
            {
                let nom = data[i]['Номенклатура']
                let price = Math.round(Number(data[i]['Цена']))
                let newCount = Number(data[i]['Количество']) || 0
                if(!price)
                {
                    arr.push(nom)
                    await Category.findOne({where: {name: arr[arr.length-1]}}).then( async category =>{
                        if(!category)
                        {
                            let familyId = 0;
                            let levelId = 0;
                            let familyCategory;
                            if(arr[arr.length-2])
                                familyCategory = await Category.findOne({where: {name: arr[arr.length-2]}})
                            let link = translit(arr[arr.length-1].toLowerCase())
                            if(!familyCategory)
                            {
                                familyId = 0;
                                levelId = 0;
                            }
                            else {
                                familyId = familyCategory.id;
                                levelId = familyCategory.levelId+1;
                            }
                            const newCategory = await Category.create({name: arr[arr.length-1], link, levelId, familyId, img: image})
                        }
                    })
                }
                else {
                    const device = await Device.findOne({where: {name: nom}})
                    if(!device)
                    {
                        const categoryFam = await Category.findOne({where: {name: arr[arr.length-1]}})
                        const newDevice = await Device.create({name: nom, price, categoryId: categoryFam.id, count: newCount, article: '000000', img: image, old_price: 0,description: ""})
                    }
                    else {
                        if(device.price!==price) {
                        device.old_price = device.price;
                        device.price = price;
                        } 
                        if(newCount!==0)
                            device.count = newCount;
                        device.save()
                    }

                    if(!data[i+1]['Цена'])
                    {
                        
                        arr.pop()
                        if(!!arr[arr.length-1] && Number(data[i+1]['Номенклатура'][2]+data[i+1]['Номенклатура'][3])>Number(arr[arr.length-1][2]+arr[arr.length-1][3]))
                            arr.pop()
                    }
                        
                    
                }
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
          }
    }

}

function translit(word){
    var answer = '';
    var converter = {
        'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
        'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
        'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
        'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
        'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
        'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
        'э': 'e',    'ю': 'yu',   'я': 'ya', ' ': ''
    };
 
    for (var i = 0; i < word.length; ++i ) {
        if (converter[word[i]] === undefined){
            answer += word[i];
        } else {
            answer += converter[word[i]];
        }
    }
 
    return answer;
}

module.exports = new ExcelController()