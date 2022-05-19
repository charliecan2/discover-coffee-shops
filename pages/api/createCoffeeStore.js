const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_KEY);

const table = base('coffee-stores')

console.log({ table })

export default async function createCoffeeStore(req, res){
  console.log({ req })

  if(req.method = "POST"){
    try {
      const findCoffeeStoreRecords = await table.select({
        filterByFormula: `id="1"`
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
        const createRecords = await table.create(
          [
            {
              "fields": {
                id: "1",
                name: "My Favorite Coffee Store",
                address: "101 North Street",
                neighborhood: "Some Neighborhood",
                voting: 200,
                imgUrl: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmVlJTIwc2hvcHxlbnwwfHwwfHw%3D&w=1000&q=80"
              }
            }
          ]
        )

        const records = createRecords.map((record) => {
          return {
            ...record.fields,
          }
        })

        res.json({ records });
      }
    } catch(error) {
      console.error("Error finding store", error);
      res.status(500);
      res.json({message: "Error finding store", error});
    }
} 
}