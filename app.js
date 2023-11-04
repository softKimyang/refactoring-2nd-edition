import plays from './ch01/data/plays.js'
import invoices from './ch01/data/invoices.js'
import htmlStatement from './ch01/statement.js'


const invoice = invoices[0];
const htmlTags = htmlStatement(invoice, plays);



console.log(htmlTags);