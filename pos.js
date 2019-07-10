const data = [
    { "id": "0001", "name": "Coca Cola", "price": 3 },
    { "id": "0002", "name": "Diet Coke", "price": 4 },
    { "id": "0003", "name": "Pepsi-Cola", "price": 5 },
    { "id": "0004", "name": "Mountain Dew", "price": 6 },
    { "id": "0005", "name": "Dr Pepper", "price": 7 },
    { "id": "0006", "name": "Sprite", "price": 8 },
    { "id": "0007", "name": "Diet Pepsi", "price": 9 },
    { "id": "0008", "name": "Diet Mountain Dew", "price": 10 },
    { "id": "0009", "name": "Diet Dr Pepper", "price": 11 },
    { "id": "0010", "name": "Fanta", "price": 12 }
];

function printReceipt(barcodes) {
    let barcode = countBarcodes(barcodes);
    let items = getItems(barcode);
    return getReceipt(items);
}

function countBarcodes(barcodes) {
    let barcode = barcodes.reduce(function(barcodes, barcode) {
        if (barcode in barcodes) barcodes[barcode]++;
        else barcodes[barcode] = 1;
        return barcodes;
    }, {})
    return barcode;
}

function getItems(barcode) {
    let items = [];
    for (let attr in barcode) {
        // 如果barcode在data中未找到，count为0
        let obj = { id: attr, name: attr, count: 0, price: 0 };
        let i;
        for (i = 0; i < data.length; i++) {
            if (attr == data[i].id) {
                obj.count = barcode[attr];
                obj.name = data[i].name;
                obj.price = data[i].price;
                break;
            }
        }
        items.push(obj);
    }
    return items;
}

function getReceipt(items) {
    let receipt = "Receipts\n------------------------------------------------------------\n";
    let error = false;
    let errorMessage = "[ERROR]:";
    let money = 0;
    items.forEach(item => {
        // 出错了
        if (item.count == 0) {
            error = true;
            errorMessage += item.id + ","
        }
        if (!error) {
            receipt += item.name + "\t\t\t\t\t" + item.price + "\t\t\t" + item.count + "\n";
            money += item.count * item.price;
        }
    });
    if (!error) {
        receipt += "------------------------------------------------------------\nPrice: " +
            money;
        return receipt;
    } else {
        errorMessage = errorMessage.substring(0, errorMessage.length - 1) + " are invalid barcodes.";
        return errorMessage;
    }
}

module.exports = {
    printReceipt,
    countBarcodes,
    getItems,
    getReceipt,
}