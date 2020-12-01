module.exports = {
    MONGOURI: "mongodb+srv://Hema:L0uF0dvrx81udHpb@cluster0.vm6pv.mongodb.net/test?retryWrites=true&w=majority",
    JWT_SECRET: "aweuiwowfwbfjqqgvytryrtyuodnsfhvwh",
    rpcURL : "https://kovan.infura.io/v3/16497e91567d468facb98a99c27db479",
    private_key : 'a1dd85b68f449a7acbed0f91d9cc586b7b943a9d057ddf6f5327f13204f69e64',
    account : "0x9aa49368F973F32a1d8E9C8D9F58fd203C625BEe",
    abi : [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"index","type":"uint256"}],"name":"Added","type":"event"},{"inputs":[{"internalType":"string","name":"_source","type":"string"},{"internalType":"string","name":"_text","type":"string"},{"internalType":"string","name":"_date","type":"string"}],"name":"addItem","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_person","type":"string"},{"internalType":"uint256","name":"_productId","type":"uint256"},{"internalType":"string","name":"_date","type":"string"},{"internalType":"string","name":"_location","type":"string"}],"name":"addState","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_a","type":"string"},{"internalType":"string","name":"_b","type":"string"}],"name":"concat","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_productId","type":"uint256"}],"name":"searchProduct","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}],
    contractAddress : '0x2A626C0F55f6486c9290c46DA1B04EA39E3bb63e'
}

//sendgrid api key
//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