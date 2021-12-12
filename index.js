const hash = require("crypto-js/sha256");

//==================================CREATE BLOCK ==============================================

class Block {
  constructor(prevHash, data) {
    //nhận vào 2 tham số là hash của block trước và data
    this.prevHash = prevHash;
    this.data = data;
    this.timeStamp = new Date(); //thời gian khởi tạo block
    this.hash = this.calculateHash(); //hash này sẽ mã hóa các prevHash + data + timeStamp
  }

  //khởi tạo method calculateHash
  calculateHash() {
    return hash(
      this.prevHash + JSON.stringify(this.data) + this.timeStamp
    ).toString();
  }
}

//khởi tạo một Block
const block = new Block("", {
  from: "Lam",
  to: "Nam",
  amount: 500,
}); //truyền đối số cho class Block

console.log(block);

//===========================CREATE BLOCK CHAIN=============================================

class blockChain {
  constructor() {
    const genesisBlock = new Block("0000", {
      isGenesis: true,
    });
    this.chain = [genesisBlock];
  }
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(data) {
    const lastBlock = this.getLastBlock();
    const newBlock = new Block(lastBlock.hash, data);

    this.chain.push(newBlock);
  }
}

const lamChain = new blockChain();

lamChain.addBlock({
  //tạo transaction trong block chain
  from: "Dung",
  to: "Tuan",
  amount: 1000,
});

lamChain.addBlock({
  from: "Tinh",
  to: "Thuc",
  amount: 7000,
});

lamChain.addBlock({
  from: "Giao dich tien dien tu vi cua Hung",
  to: "chuyen tien cho Hai",
  amount: 400,
});

console.log(lamChain.chain);
