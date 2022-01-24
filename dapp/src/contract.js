import Web3 from "web3";
import abi from "./abi";

const web3 = new Web3(window.ethereum);

const erc20Contract = new web3.eth.Contract(
    abi,
    '0xd6801a1DfFCd0a410336Ef88DeF4320D6DF1883e'
);

export default erc20Contract;