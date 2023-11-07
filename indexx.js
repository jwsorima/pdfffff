const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path')

// const directory = 'uploads'
// fs.readdirSync(directory, (err, files) => {
//     if(err) throw err;

//     for (const file of files) {
//         fs.unlinkSync(path.join(directory, file), (err) => {
//             if (err) throw err;
//         })
//     }
// })

const dateToFilipino = (date) => {//move these two to other file
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const monthList = [
        'Enero',
        'Pebrero',
        'Marso',
        'Abril',
        'Mayo',
        'Hunyo',
        'Hulyo',
        'Agosto',
        'Setyembre',
        'Oktubre',
        'Nobyembre',
        'Disyembre'
    ]
    const yearList = [
        { num: 2008, word: "Walo"},
        { num: 2009, word: "Siyam"},
        { num: 2010, word: "Sampu"},
        { num: 2011, word: "Labing-isa"},
        { num: 2012, word: "Labindalawa"},
        { num: 2013, word: "Labintatlo"},
        { num: 2014, word: "Labing-apat"},
        { num: 2015, word: "Labinlima"},
        { num: 2016, word: "Labing-anim"},
        { num: 2017, word: "Labinpito"},
        { num: 2018, word: "Labinwalo"},
        { num: 2019, word: "Labinsiyam"},
        { num: 2020, word: "Dalawampu"},
        { num: 2021, word: "Dalawampu't Isa"},
        { num: 2022, word: "Dalawampu't Dalawa" },
        { num: 2023, word: "Dalawampu't Tatlo" },
        { num: 2024, word: "Dalawampu't Apat" },
        { num: 2025, word: "Dalawampu't Lima" },
        { num: 2026, word: "Dalawampu't Anim" },
        { num: 2027, word: "Dalawampu't Pito" },
        { num: 2028, word: "Dalawampu't Walo" },
        { num: 2029, word: "Dalawampu't Siyam" },
        { num: 2030, word: "Tatlumpu" },
        { num: 2031, word: "Tatlumpu't Isa" },
        { num: 2032, word: "Tatlumpu't Dalawa" },
        { num: 2033, word: "Tatlumpu't Tatlo" },
        { num: 2034, word: "Tatlumpu't Apat" },
        { num: 2035, word: "Tatlumpu't Lima" },
        { num: 2036, word: "Tatlumpu't Anim" },
        { num: 2037, word: "Tatlumpu't Pito" },
        { num: 2038, word: "Tatlumpu't Walo" },
        { num: 2039, word: "Tatlumpu't Siyam" },
        { num: 2040, word: "Apatnapu" },
        { num: 2041, word: "Apatnapu't Isa" },
        { num: 2042, word: "Apatnapu't Dalawa" },
        { num: 2043, word: "Apatnapu't Tatlo" },
        { num: 2044, word: "Apatnapu't Apat" },
        { num: 2045, word: "Apatnapu't Lima" },
        { num: 2046, word: "Apatnapu't Anim" },
        { num: 2047, word: "Apatnapu't Pito" },
        { num: 2048, word: "Apatnapu't Walo" },
        { num: 2049, word: "Apatnapu't Siyam" },
        { num: 2050, word: "Limampu" },
        { num: 2051, word: "Limampu't Isa" },
        { num: 2052, word: "Limampu't Dalawa" },
        { num: 2053, word: "Limampu't Tatlo" },
        { num: 2054, word: "Limampu't Apat" },
        { num: 2055, word: "Limampu't Lima" },
        { num: 2056, word: "Limampu't Anim" },
        { num: 2057, word: "Limampu't Pito" },
        { num: 2058, word: "Limampu't Walo" },
        { num: 2059, word: "Limampu't Siyam" },
        { num: 2060, word: "Animnapu" },
        { num: 2061, word: "Animnapu't Isa" },
        { num: 2062, word: "Animnapu't Dalawa" },
        { num: 2063, word: "Animnapu't Tatlo" },
        { num: 2064, word: "Animnapu't Apat" },
        { num: 2065, word: "Animnapu't Lima" },
        { num: 2066, word: "Animnapu't Anim" },
        { num: 2067, word: "Animnapu't Pito" },
        { num: 2068, word: "Animnapu't Walo" },
        { num: 2069, word: "Animnapu't Siyam" },
        { num: 2070, word: "Pitumpu" },
        { num: 2071, word: "Pitumpu't Isa" },
        { num: 2072, word: "Pitumpu't Dalawa" },
        { num: 2073, word: "Pitumpu't Tatlo" },
        { num: 2074, word: "Pitumpu't Apat" },
        { num: 2075, word: "Pitumpu't Lima" },
        { num: 2076, word: "Pitumpu't Anim" },
        { num: 2077, word: "Pitumpu't Pito" },
        { num: 2078, word: "Pitumpu't Walo" },
        { num: 2079, word: "Pitumpu't Siyam" },
        { num: 2080, word: "Walumpu" },
        { num: 2081, word: "Walumpu't Isa" },
        { num: 2082, word: "Walumpu't Dalawa" },
        { num: 2083, word: "Walumpu't Tatlo" },
        { num: 2084, word: "Walumpu't Apat" },
        { num: 2085, word: "Walumpu't Lima" },
        { num: 2086, word: "Walumpu't Anim" },
        { num: 2087, word: "Walumpu't Pito" },
        { num: 2088, word: "Walumpu't Walo" },
        { num: 2089, word: "Walumpu't Siyam" },
        { num: 2090, word: "Siyamnapu" },
        { num: 2091, word: "Siyamnapu't Isa" },
        { num: 2092, word: "Siyamnapu't Dalawa" },
        { num: 2093, word: "Siyamnapu't Tatlo" },
        { num: 2094, word: "Siyamnapu't Apat" },
        { num: 2095, word: "Siyamnapu't Lima" },
        { num: 2096, word: "Siyamnapu't Anim" },
        { num: 2097, word: "Siyamnapu't Pito" },
        { num: 2098, word: "Siyamnapu't Walo" },
        { num: 2099, word: "Siyamnapu't " },
        { num: 2100, word: 'Isangdaan' }
    ]
    const monthFil = monthList[month]
    const yearFil = yearList.find((obj) => obj.num == year)

    return { year: yearFil.word, month: monthFil, day: day, }
}
const dateToEnglish = (date) => {
    const getOrdinalIndicator = (dayOfMonth) => {
        const lastDigit = dayOfMonth % 10
        if(lastDigit == 1) {
            return 'ST'
        } else if(lastDigit == 2) {
            return 'ND'
        } else if(lastDigit == 3) {
            return 'RD'
        } else {
            return 'TH'
        }
    }
    const getMonthText = (date) => {
        return date.toLocaleString('default', { month: 'long' })
    }
    const getYearText = (dateYear) => {
        const numberStrings = [
            'EIGHT',
            'NINE',
            'TEN',
            'ELEVEN',
            'TWELVE',
            'THIRTEEN',
            'FOURTEEN',
            'FIFTEEN',
            'SIXTEEN',
            'SEVENTEEN',
            'EIGHTEEN',
            'NINETEEN',
            'TWENTY',
            'TWENTY ONE',
            'TWENTY TWO',
            'TWENTY THREE',
            'TWENTY FOUR',
            'TWENTY FIVE',
            'TWENTY SIX',
            'TWENTY SEVEN',
            'TWENTY EIGHT',
            'TWENTY NINE',
            'THIRTY',
            'THIRTY ONE',
            'THIRTY TWO',
            'THIRTY THREE',
            'THIRTY FOUR',
            'THIRTY FIVE',
            'THIRTY SIX',
            'THIRTY SEVEN',
            'THIRTY EIGHT',
            'THIRTY NINE',
            'FORTY',
            'FORTY ONE',
            'FORTY TWO',
            'FORTY THREE',
            'FORTY FOUR',
            'FORTY FIVE',
            'FORTY SIX',
            'FORTY SEVEN',
            'FORTY EIGHT',
            'FORTY NINE',
            'FIFTY',
            'FIFTY ONE',
            'FIFTY TWO',
            'FIFTY THREE',
            'FIFTY FOUR',
            'FIFTY FIVE',
            'FIFTY SIX',
            'FIFTY SEVEN',
            'FIFTY EIGHT',
            'FIFTY NINE',
            'SIXTY',
            'SIXTY ONE',
            'SIXTY TWO',
            'SIXTY THREE',
            'SIXTY FOUR',
            'SIXTY FIVE',
            'SIXTY SIX',
            'SIXTY SEVEN',
            'SIXTY EIGHT',
            'SIXTY NINE',
            'SEVENTY',
            'SEVENTY ONE',
            'SEVENTY TWO',
            'SEVENTY THREE',
            'SEVENTY FOUR',
            'SEVENTY FIVE',
            'SEVENTY SIX',
            'SEVENTY SEVEN',
            'SEVENTY EIGHT',
            'SEVENTY NINE',
            'EIGHTY',
            'EIGHTY ONE',
            'EIGHTY TWO',
            'EIGHTY THREE',
            'EIGHTY FOUR',
            'EIGHTY FIVE',
            'EIGHTY SIX',
            'EIGHTY SEVEN',
            'EIGHTY EIGHT',
            'EIGHTY NINE',
            'NINETY',
            'NINETY ONE',
            'NINETY TWO',
            'NINETY THREE',
            'NINETY FOUR',
            'NINETY FIVE',
            'NINETY SIX',
            'NINETY SEVEN',
            'NINETY EIGHT',
            'NINETY NINE',
            'ONE HUNDRED'
        ]
        const yearList = numberStrings.map((text, index) => {
            const year = 2008 + index;
            return { year, yearText: text };
        }) 
        return yearList.find((obj) => obj.year == dateYear).yearText
    }

    const day = date.getDate()
    const year = date.getFullYear()

    const ordinalIndicator = getOrdinalIndicator(day)
    const monthName = getMonthText(date)
    const yearName = getYearText(year)
    return { year: yearName, month: monthName, day: day, ordinalIndicator: ordinalIndicator   }
}

// Create a document
try {
    const studentID = '1023456789'
    const _id = '648ba3adfb78265ea'
    const firstName = 'Ronaldaaaiaodfjall-testafterdashuihrjim9trehim9j0rthev89ujrhtve9ru8mthver8tvu9ehru9etvh'
    const middleName = 'Ni'
    const lastName = 'Peñaredondo'
    const adminSignature = '0x6bbf0e87e8fcf4ae81c50ff98a5d21d93d3d6c13b068922983cc5bc22f3aeb57239fd6cfe029cefd89d5c8c6555c5205a1180abda090dd282f6e01f8314267631c'
    const dateGraduated = new Date('2023-09-29T00:00:00.000+00:00')
        //https://en.wikipedia.org/wiki/Year_2038_problem - not a problem
    const course = 'TWO-YEAR ASSOCIATE IN COMPUTER TECHNOLOGY'

    const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4',//other sizes https://github.com/foliojs/pdfkit/blob/d95b826475dd325fb29ef007a9c1bf7a527e9808/lib/page.coffee#L69
        info: {
            Title: `${firstName} ${middleName}. ${lastName} Diploma`,
            Author: `${adminSignature}-${studentID}-${_id}`,
            Subject: 'Legal document that certifies the completion of a degree program',
            Keywords: 'diploma, degree certificate, graduation certificate'
        },
    });

    doc.registerFont('Bona-Nova-Regular', 'fonts/bona-nova-regular.ttf')
    doc.registerFont('Closter-Black', 'fonts/cloister-black.woff')
    doc.registerFont('ITC-Edwardian-Script', 'fonts/itc-edwardian-script-2.woff')
    doc.registerFont('Roboto-Bold', 'fonts/roboto-bold.ttf')

    const dateFil = dateToFilipino(dateGraduated)
    const dateEng = dateToEnglish(dateGraduated)
    const pdfName = 'test.pdf'

    const stream = fs.createWriteStream("uploads/" + pdfName)

    doc.pipe(stream)

    doc.image
        ('DiplomaEmpty.png', 0,0, {width: doc.page.width, height: doc.page.height})

    let fullNameFontSize = 52
    let fullNameIsCentered = false
    let fullNameWidth = null
    do {
        fullNameWidth = parseFloat(
            doc
                .fontSize(fullNameFontSize)
                .font('Closter-Black')
                .widthOfString(`${firstName} ${middleName.charAt(0)}. ${lastName}`, 60, 175, {align: 'center'})
                .toFixed(2)
        )

        if(fullNameWidth <= 695.55) {
            fullNameIsCentered = true;
        } else {
            fullNameFontSize = parseFloat((fullNameFontSize - 0.1).toFixed(2))
        }
    } while (fullNameIsCentered == false)

    let fullNameY = 175

    const fullNameLineHeight = parseFloat(
        doc
            .fontSize(fullNameFontSize)
            .font('Closter-Black')
            .heightOfString(`${firstName} ${middleName.charAt(0)}. ${lastName}`, 60, 175, {align: 'center'})
            .toFixed(2)
    )
    fullNameY = fullNameY + ((62 - fullNameLineHeight) * 0.5)

    doc
        .fontSize(fullNameFontSize)
        .font('Closter-Black')
        .text(`${firstName} ${middleName.charAt(0)}. ${lastName}`, 68, fullNameY, {align: 'center'})

    doc
        .fontSize(26)
        .font('Helvetica-Bold')
        .text(course, 75, 335, {align: 'center'});

    doc
        .fontSize(22)
        .font('ITC-Edwardian-Script')
        .text(`${dateFil.day} ng ${dateFil.month}`, 573, 417);

    doc
        .fontSize(20)
        .font('ITC-Edwardian-Script')
        .text(`Dalawang Libo't ${dateFil.year}`, 435, 448);


    doc
        .fontSize(4)
        .font('Helvetica')
        .text(dateEng.ordinalIndicator, 488, 441.5)
    doc
        .fontSize(7.5)
        .font('Helvetica')
        .text(dateEng.day, 480, 442.5)

    doc
        .fontSize(8.5)
        .font('Bona-Nova-Regular')
        .text(`DAY OF ${dateEng.month.toUpperCase()}`, 498, 439.5)

    doc
        .fontSize(8.5)
        .font('Bona-Nova-Regular')
        .text(`TWO THOUSAND AND ${dateEng.year}`, 426, 471);

    doc
       .fontSize(10)
       .font('Roboto-Bold')
       .text(`40 — 474104 — 0070, SERIES 2008 <--(placeholder)`, 400, 491) 

    doc
      .scale(0.6)
      .translate(470, -380)
      .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
      .fill('red', 'even-odd')
      .restore();

    doc.end()

} catch (error) {
    console.log("Error: " + error)
}
