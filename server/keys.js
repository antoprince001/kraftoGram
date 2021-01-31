module.exports = {
    MONGOURI: "",
    JWT_SECRET: "",
    rpcURL : "",
    private_key : '',
    account : "",
    abi : [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"index","type":"uint256"}],"name":"Added","type":"event"},{"inputs":[{"internalType":"string","name":"_source","type":"string"},{"internalType":"string","name":"_text","type":"string"},{"internalType":"string","name":"_date","type":"string"}],"name":"addItem","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_person","type":"string"},{"internalType":"uint256","name":"_productId","type":"uint256"},{"internalType":"string","name":"_date","type":"string"},{"internalType":"string","name":"_location","type":"string"}],"name":"addState","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_a","type":"string"},{"internalType":"string","name":"_b","type":"string"}],"name":"concat","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_productId","type":"uint256"}],"name":"searchProduct","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}],
    contractAddress : '0x2A626C0F55f6486c9290c46DA1B04EA39E3bb63e'
}

