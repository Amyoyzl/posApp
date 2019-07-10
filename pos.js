const data = require('./itemsData')

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
        let item = data.getItemFromData(attr);
        if (item != null) {
            item.count = barcode[attr];
            items.push(item);
        } else {
            items.push({ "id": attr, "count": 0 });
        }
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
            receipt += `${item.name}\t\t\t\t\t${item.price}\t\t\t${item.count}\n`;
            money += item.count * item.price;
        }
    });
    if (!error) {
        receipt += "------------------------------------------------------------\nPrice: " + money;
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