const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_KEY);

const table = base('coffee-stores')

console.log({ table })

export default async function createCoffeeStore(req, res){
  console.log({ req })

  if(req.method = "POST"){
    try {
      const findCoffeeStoreRecords = await table.select({
        filterByFormula: `id="0"`
      }).firstPage()

      console.log({findCoffeeStoreRecords})
    
      if(findCoffeeStoreRecords.length !== 0) {
        const records = findCoffeeStoreRecords.map((record) => {
          return {
            ...record.fields,
          }
        })

        res.json(records);
      } else {
        // create record
        res.json({ message: "Create record"});
      }
    } catch(error) {
      console.error("Error finding store", error);
      res.status(500);
      res.json({message: "Error finding store", error});
    }
} 
}