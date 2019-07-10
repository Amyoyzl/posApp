const pos = require('../pos')

it('should get a receipt when invoke printReceipt given barcodes', () => {
    // given
    const barcodes = ['0001', '0003', '0005', '0003'];
    // when
    const receipt = pos.printReceipt(barcodes);
    //then
    expect(receipt).toBe("Receipts\n------------------------------------------------------------\nCoca Cola\t\t\t\t\t3\t\t\t1\nPepsi-Cola\t\t\t\t\t5\t\t\t2\nDr Pepper\t\t\t\t\t7\t\t\t1\n------------------------------------------------------------\nPrice: 20");
})

it('should get a error message when invoke printReceipt given invalid barcodes', () => {
    // given
    const barcodes = ['0000', '0003', '0011', '0002'];
    // when
    const receipt = pos.printReceipt(barcodes);
    //then
    expect(receipt).toBe("[ERROR]:0000,0011 are invalid barcodes.");
})

it('should return a object when invoke countBarcodes given a barcodes array', () => {
    // given
    const barcodes = ['0001', '0003', '0005', '0003'];
    // when
    const barcode = pos.countBarcodes(barcodes);
    const expectObject = { "0001": 1, "0003": 2, "0005": 1 };
    //then
    expect(barcode).toEqual(expectObject);
})

it('should return a object array when invoke getItems given a barcode object', () => {
    // given
    const barcode = { '0001': 1, '0003': 2, '0005': 1 };
    // when
    const items = pos.getItems(barcode);
    const expectItems = [
        { "count": 1, "id": "0001", "name": "Coca Cola", "price": 3 },
        { "count": 2, "id": "0003", "name": "Pepsi-Cola", "price": 5 },
        { "count": 1, "id": "0005", "name": "Dr Pepper", "price": 7 }
    ];
    //then
    expect(items).toEqual(expectItems);
})

it('should return a object array when invoke getReceipt given a barcode object', () => {
    // given
    const items = [
        { "count": 1, "id": "0001", "name": "Coca Cola", "price": 3 },
        { "count": 2, "id": "0003", "name": "Pepsi-Cola", "price": 5 },
        { "count": 1, "id": "0005", "name": "Dr Pepper", "price": 7 }
    ];
    // when
    const receipte = pos.getReceipt(items);
    const expectReceipt = "Receipts\n------------------------------------------------------------\n" +
        "Coca Cola\t\t\t\t\t3\t\t\t1\n" +
        "Pepsi-Cola\t\t\t\t\t5\t\t\t2\n" +
        "Dr Pepper\t\t\t\t\t7\t\t\t1\n" +
        "------------------------------------------------------------\nPrice: 20";
    //then
    expect(receipte).toBe(expectReceipt);
})