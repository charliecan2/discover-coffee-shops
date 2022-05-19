import { table, getMinifiedRecords } from '../../lib/airtable';

const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_KEY);

export default async function createCoffeeStore(req, res){
  if(req.method = "POST"){

    const { id, name, address, neighborhood, voting, imgUrl } = req.body;

    try {
      if(id) {
        const findCoffeeStoreRecords = await table.select({
          filterByFormula: `id=${id}`
        }).firstPage()
      
        if(findCoffeeStoreRecords.length !== 0) {
          const records = getMinifiedRecords(findCoffeeStoreRecords)

          res.json(records);
        } else {
          // create record
          if(name){
            const createRecords = await table.create(
              [
                {
                  "fields": {
                    id,
                    name,
                    address,
                    neighborhood,
                    voting,
                    imgUrl
                  }
                }
              ]
            )
            const records = getMinifiedRecords(createRecords)
            res.json({ records });
          } else {
            res.status(400);
            res.json({message: "Name is missing"})
          }
        }
      } else {
        res.status(400);
        res.json({message: "Id is missing"})
      }
    } catch(error) {
      console.error("Error in creating or finding store", error);
      res.status(500);
      res.json({message: "Error in creating or finding store", error});
    }
} 
}