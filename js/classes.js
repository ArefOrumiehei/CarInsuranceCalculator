// creat calculate insurance
class Insurance{
    constructor(model , year , level){
        this.model = model ,
        this.year = year ,
        this.level = level
    }

    // calculate the model of cars
    calculateModel(info){
    let price
    let basePrice = 1500000

    // set multiple of models
    let model = info

    switch (model) {
        case '1':
            price = basePrice * 1.20
            break;

        case '2':
            price = basePrice * 1.50
            break;

        case '3':
            price = basePrice * 1.70
            break;
    }
    return price
}

// calculate years discount
    calculateYear(price , year){
    // get now persian date and convert to english numbers
    let nowDate = new Date().toLocaleDateString('fa-IR') 
    let nowYear = nowDate.slice(0 , 4)
    
    let max = html.convertNums(nowYear)
    let years = max - year
    
    // calculating 
    price = price - ((years - 4)/ 100) * price
    return price
}

// calculate level 
    calculateLevel(price , level){
    if(level === 'basic'){
        price = price * 1.20
    }else{
        price = price * 1.45
    }
    return price
}
}



// creat HTMLUI object
class HTMLUI{
    // creat <option> tag for show years
    displayYear(){
    // get now persian date and convert to english numbers
    let nowDate = new Date().toLocaleDateString('fa-IR') 
    let nowYear = nowDate.slice(0 , 4)
    
    let max = html.convertNums(nowYear)
    let min = max - 25

    // make <option> tag 
    for (let i = max ; i >= min ; i--) {
        let option = document.createElement('option')
        option.value = i
        option.innerText = i

        yearField.appendChild(option)
        }
    }


  // creat other proto for convert year
    convertNums(nowYear){
    // convert persian numbers to english numbers
    var
    persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
    arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
    fixNumbers = function (str)
    {
        if(typeof str === 'string')
        {
            for(var i=0; i<10; i++)
            {
                str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
            }
        }
        return str;
    };

    let nowYearENG = fixNumbers(nowYear)
    return nowYearENG
    }

  // make error for null fields
    errorAlert(err){
    let div = document.createElement('div')
    div.classList = 'error'
    div.innerText = err

    form.insertBefore(div , document.querySelector('.form-group'))

    setTimeout(() => {
        form.insertBefore(div , document.querySelector('.form-group')).remove()
    }, 3000);
    }
}




// validate fields 
function validateCalculate(e){
    e.preventDefault()

    // define and accses to fields
    let model = document.querySelector('#make').value
    const year = document.querySelector('#year').value
    let level = document.querySelector('input[name="level"]:checked').value

    
    // validate fields
    if (model === '' || year === '' || level === '') {
        html.errorAlert('لطفا تمامی مقادیر را انتخاب کنید')
        }else{
        let resultDiv = document.querySelector('#result div')
        if(resultDiv !== null){
            resultDiv.remove()
        }
    }


    // calculate fields
    let insurance = new Insurance(model , year , level)
    let priceModel = insurance.calculateModel(insurance.model)
    let priceYear = insurance.calculateYear(priceModel , insurance.year)
    let priceLevel = insurance.calculateLevel(priceYear , insurance.level)
    const price = priceLevel

    // show result and gif 
    let result = document.querySelector('#result')
    let div = document.createElement('div')

    // rename the model and level
    switch (model) {
        case '1':
            model = 'پراید'
            break;

        case '2':
            model = 'اپتیما'
            break;

        case '3':
            model = 'پورشه'
            break;
    }

    if(level === 'basic'){
        level = 'ساده'
    }else{
        level = 'کامل'
    }

    div.innerHTML = `
    <p class="header">خلاصه فاکتور</p>
    <p>مدل خودرو : ${model}</p>
    <p>سال ساخت : ${year}</p>
    <p>نوع بیمه : ${level}</p>
    <p>قیمت نهایی : ${price}</p>
    `

    // show gif 
    const spinner = document.querySelector('#loading img')
    spinner.style.display = 'block'

    setTimeout(() => {
        spinner.style.display = 'none'
        result.appendChild(div)
    }, 700);
}