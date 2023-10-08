const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a document
try {
    const studentID = '1023456789'
    const _id = '648ba3adfb78265eac4186a8'
    const firstName = 'Ronald'
    const middleName = 'Nibb'
    const lastName = 'Peñaredondo'
    const adminSignature = '0x6bbf0e87e8fcf4ae81c50ff98a5d21d93d3d6c13b068922983cc5bc22f3aeb57239fd6cfe029cefd89d5c8c6555c5205a1180abda090dd282f6e01f8314267631c'
    const dateGraduated = new Date('2023-09-29T00:00:00.000+00:00')
        //https://en.wikipedia.org/wiki/Year_2038_problem
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

    const getDateNow = () => {
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth()
        const year = date.getFullYear()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        return `${year}-${month + 1}-${day}-${hour}h-${minute}m-${second}s.pdf`
    }
    const translateToFilipino = (date) => {
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

    const pdfName = getDateNow()

    const stream = fs.createWriteStream("uploads/" + pdfName)

    doc.pipe(stream);
    
    doc
      .fontSize(52)
      .font('fonts/cloister-black.woff')
      .text(`${firstName} ${middleName.charAt(0)}. ${lastName}`, 100, 200);
    
    doc
      .fontSize(26)
      .font('Helvetica-Bold')
      .text(course, 74, 300);

    
    const date = translateToFilipino(dateGraduated)

    doc
      .fontSize(22)
      .font('fonts/itc-edwardian-script-2.woff')
      .text(`Nilagdaan sa lungsod ng Las Piñas, Pilipinas ngayong ika - ${date.day} ng ${date.month}`, 150, 400);

    doc
        .fontSize(22)
        .font('fonts/itc-edwardian-script-2.woff')
        .text(`Taon ng ating Panginoon. Dalawang Libo't ${date.year}`, 350, 450);

    
    const distanceMargin = 18;
    
    doc
        .fillAndStroke('#7FB3D5')
        .lineWidth(20)
        .lineJoin('round')
        .rect(
            distanceMargin,
            distanceMargin,
            doc.page.width - distanceMargin * 2,
            doc.page.height - distanceMargin * 2,
        )
        .stroke();
    
        const maxWidth = 150;
        const maxHeight = 100;
        doc.image(
            'BernardoCollege.png',
            doc.page.width / 2 - maxWidth / 2,
            60, 
            {
            fit: [maxWidth, maxHeight],
            align: 'center',
            }
        );

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
