const fs = require('fs');


function calculateSum(arr) {
    return sum = arr.reduce((total, num) => total + num, 0)
}
const get_counter = (req, res) => {
    fs.readFile('./data/Parent.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error reading file' });
        }
        // Parse the JSON data
        const jsonData = JSON.parse(data);
        const list_length = jsonData.data.length;
        res.status(200).json({ data: list_length });
    });
}

const get_transaction = async (req, res) => {
    try {
        const page_num = req.params.number;
        const parentData = await fs.promises.readFile('./data/Parent.json', 'utf8');
        const childData = await fs.promises.readFile('./data/Child.json', 'utf8');
        const jsonDataParent = JSON.parse(parentData);
        const jsonDataChild = JSON.parse(childData);
        const filt_parent = jsonDataParent.data.slice((page_num - 1) * 2, page_num * 2);
        const return_data = filt_parent.map((data) => {
            const child_list = jsonDataChild.data.filter(obj => obj.parentId == data.id);
            const filt_child = child_list.map(obj => obj.paidAmount);
            const totalPaid = calculateSum(filt_child);
            const final_el = {
                ...data,
                "totalPaid": totalPaid,
                "paidChilds": filt_child
            }
            return final_el;
        })
        res.status(200).json({ data: return_data })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading file' });
    }
}

const get_detail = async (req, res) => {
    try {
        const parent_id = req.params.number;
        const parentData = await fs.promises.readFile('./data/Parent.json', 'utf8');
        const childData = await fs.promises.readFile('./data/Child.json', 'utf8');
        const jsonDataParent = JSON.parse(parentData);
        const jsonDataChild = JSON.parse(childData);
        const filt_parent = jsonDataParent.data.find(obj=> obj.id == parent_id);
        const filt_child=jsonDataChild.data.filter(obj=> obj.parentId == parent_id);
        const return_data = filt_child.map((data) => {
            const final_el = {
                ...filt_parent,
                "paidAmount": data.paidAmount
            }
            return final_el;
        })
        res.status(200).json({ data: return_data })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error reading file' });
    }
}

module.exports = {
    get_counter,
    get_transaction,
    get_detail
};