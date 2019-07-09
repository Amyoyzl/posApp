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
