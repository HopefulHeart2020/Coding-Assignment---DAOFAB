const fs = require('fs');

const get_transaction = (req, res) => {
    const page_num = req.params.number;
    fs.readFile('./data/Parent.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading file' });
        }
        // Parse the JSON data
        const jsonData = JSON.parse(data);
        const transaction_list = jsonData.data.slice((page_num-1)*2, page_num*2);
        res.status(200).json({ data: transaction_list });
    });
};

const get_child=(req, res)=>{
    const parent_id=req.params.pid;
    fs.readFile('./data/Child.json', 'utf8', (err, data)=>{
        if(err){
            console.error(err);
            return res.status(500).json({err: 'Error reading file'});
        }

        const jsonData=JSON.parse(data);
        const child_list=jsonData.data.filter(obj=>obj.parentId==parent_id);
        console.log(child_list)
        res.status(200).json({data: child_list})
    })
}

module.exports = {
    get_transaction,
    get_child
};