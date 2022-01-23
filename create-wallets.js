var bip39 = require("bip39");
var ethers = require("ethers");
var XLSX = require("xlsx");

// init nanoid with custom id
const { customAlphabet } = require("nanoid");
const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 6);

const START = 1;
// const LIMIT = 10;
// const LIMIT = 14500;
const LIMIT = 151;

cols = {
  code_one: "B", // alphanumeric mask for tokenID
  address: "D", // public address of wallet
  token_id: "G", // token ID of blockchain
  code_two: "K", // seed phrase of wallet
};

// init workbook
var wb = XLSX.utils.book_new();
wb.Props = {
  Title: "Polygon Wallets",
  Subject: "CryptoStamp-UAE",
  Author: "BlueNebula",
  CreatedDate: new Date(),
};

wb.SheetNames.push("Wallets");
const dataArr = [["code_1", "Address", "tokenId", "code_2"]];

for (let iter = START; iter < LIMIT; iter++) {
  // generating mnemonic phrase
  const mnemonic = bip39.generateMnemonic();
  // generating wallet from mnemonic phrase
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);

  // generate code_one, alphanumeric mask for tokenID
  const code_one = nanoid();

  // generate row
  row = [code_one, wallet.address, iter, mnemonic];
  // push row into dataArr
  dataArr.push(row);
  console.log(iter, mnemonic);
}

let ws = XLSX.utils.aoa_to_sheet(dataArr);
wb.Sheets["Wallets"] = ws;

XLSX.writeFile(wb, "wallets_post.xlsx");
